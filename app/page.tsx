'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calculator, 
  ShieldAlert, 
  Baby, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Calendar, 
  MessageCircle, 
  FileText, 
  Users, 
  ChevronRight,
  TrendingUp,
  Stethoscope,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { calculateBelarusFamilyBenefits } from '@/lib/calculations/benefits';
import { MOCK_ARTICLES } from '@/lib/supabase/mock-data';

export default function HomePage() {
  const { isMobileLayout, user } = useApp();

  // Quick Home Calculator state
  const [childCount, setChildCount] = useState<number>(2);
  const [calcResult, setCalcResult] = useState(() => 
    calculateBelarusFamilyBenefits({
      region: 'г. Минск',
      children_count: 2,
      child_order: 2,
      family_status: 'full',
      has_child_under_3: true,
      has_child_disability: false,
      employment_status: 'employed'
    })
  );

  const handleQuickCalc = (count: number) => {
    setChildCount(count);
    const res = calculateBelarusFamilyBenefits({
      region: 'г. Минск',
      children_count: count,
      child_order: count,
      family_status: count >= 3 ? 'large_family' : 'full',
      has_child_under_3: true,
      has_child_disability: false,
      employment_status: 'employed'
    });
    setCalcResult(res);
  };

  // -------------------------------------------------------------
  // MOBILE APP INTERFACE (MATCHES REFERENCE IMAGES 1 & 2)
  // -------------------------------------------------------------
  if (isMobileLayout) {
    return (
      <div className="space-y-4 pt-2 pb-6">
        {/* User Greeting Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#34785D] shrink-0 shadow-xs">
              <img 
                src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"} 
                alt="Профиль" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#283D38]">
                Добрый день, {user ? user.full_name.split(' ')[0] : 'Анна'}!
              </h2>
              <p className="text-xs text-[#6B7C77] flex items-center gap-1 font-medium">
                <span>Пусть каждый день приносит радость!</span>
                <span className="text-xs">💚</span>
              </p>
            </div>
          </div>
          <Image 
            src="/images/botanical-branch.svg" 
            alt="Орнамент" 
            width={32} 
            height={32} 
            className="opacity-40"
          />
        </div>

        {/* Two Highlight Cards (Мои выплаты & SOS-поддержка) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Мои выплаты */}
          <Link
            href="/benefits"
            className="p-3.5 rounded-2xl bg-[#FDF0EC] border border-[#F8DDD4] shadow-xs active:scale-95 transition-transform flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-[#E58A7D] flex items-center justify-center shadow-xs mb-3">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#283D38] block leading-tight">Мои выплаты</span>
              <span className="text-[11px] text-[#6B7C77]">Проверить статус</span>
            </div>
          </Link>

          {/* Card 2: SOS-поддержка */}
          <Link
            href="/psychology"
            className="p-3.5 rounded-2xl bg-[#EAF4ED] border border-[#D5E8D8] shadow-xs active:scale-95 transition-transform flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-[#34785D] flex items-center justify-center shadow-xs mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#283D38] block leading-tight">SOS-поддержка</span>
              <span className="text-[11px] text-[#6B7C77]">Психолог / 24/7</span>
            </div>
          </Link>
        </div>

        {/* Quick Actions (Round Buttons) */}
        <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-soft">
          <h3 className="text-xs font-bold text-[#283D38] uppercase tracking-wider mb-3">
            Быстрые действия
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <Link href="/benefits" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#E58A7D] flex items-center justify-center mb-1.5 group-active:scale-95 transition-transform shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-[#283D38] leading-tight">Калькулятор<br/>пособий</span>
            </Link>

            <Link href="/health" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FB] text-[#2F6D9E] flex items-center justify-center mb-1.5 group-active:scale-95 transition-transform shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-[#283D38] leading-tight">Запись<br/>к врачу</span>
            </Link>

            <Link href="/infrastructure" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#F2EFF9] text-[#7A5BA3] flex items-center justify-center mb-1.5 group-active:scale-95 transition-transform shadow-xs">
                <Baby className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-[#283D38] leading-tight">Детские<br/>сады</span>
            </Link>

            <Link href="/infrastructure" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF4ED] text-[#34785D] flex items-center justify-center mb-1.5 group-active:scale-95 transition-transform shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-[#283D38] leading-tight">Карта<br/>доступности</span>
            </Link>
          </div>
        </div>

        {/* Feature Banner: Календарь осознанного родительства */}
        <Link
          href="/health"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F0E4D7] to-[#E9DACB] p-4 border border-[#DFD1C2] shadow-soft flex items-center justify-between group active:scale-[0.98] transition-transform block"
        >
          <div className="space-y-1 z-10 max-w-[62%]">
            <span className="text-[10px] font-bold text-[#34785D] uppercase tracking-wider bg-white/70 px-2 py-0.5 rounded-full inline-block">
              Здоровое поколение
            </span>
            <h3 className="text-sm font-bold text-[#283D38] leading-snug">
              Календарь осознанного родительства
            </h3>
            <p className="text-[11px] text-[#5A6D67] leading-tight">
              Все этапы беременности и развития малыша →
            </p>
          </div>
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-white">
            <img 
              src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=400&q=80" 
              alt="Беременность" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Interactive Quick Calculator Card on Mobile */}
        <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FDF0EC] text-[#E58A7D] flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#283D38]">Примерный размер пособий</span>
            </div>
            <div className="flex items-center gap-1 bg-[#F8F1E8] p-0.5 rounded-full text-[11px]">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => handleQuickCalc(num)}
                  className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                    childCount === num ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
                  }`}
                >
                  {num} реб.
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#F8F1E8] rounded-2xl p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7C77]">Единовременное пособие:</span>
              <span className="font-bold text-[#283D38]">{calcResult.lump_sum_total_byn.toLocaleString('ru-RU')} BYN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7C77]">Пособие по уходу до 3 лет:</span>
              <span className="font-bold text-[#34785D]">{calcResult.monthly_total_byn.toLocaleString('ru-RU')} BYN/мес</span>
            </div>
            {childCount >= 3 && (
              <div className="flex items-center justify-between pt-1 border-t border-[#E5D7C7]">
                <span className="text-[#D96B5D] font-medium">Семейный капитал:</span>
                <span className="font-bold text-[#D96B5D]">31 426 BYN</span>
              </div>
            )}
          </div>

          <Link
            href="/benefits"
            className="w-full py-2 bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Полный расчёт с учетом всех льгот</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Lifecycle Stepper (Ваш семейный маршрут) */}
        <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[#283D38] uppercase tracking-wider flex items-center gap-1.5">
              <span>Ваш семейный маршрут</span>
            </h3>
            <span className="text-[11px] text-[#34785D] font-semibold">2 из 5 шагов</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#E5EFE3] text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#34785D] shrink-0" />
              <div className="flex-1">
                <span className="font-semibold text-[#283D38] block">Планирование беременности</span>
                <span className="text-[10px] text-[#5A6D67]">Шаг 1 пройден успешно</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#FDF0EC] text-xs border border-[#F9DCD5]">
              <div className="w-4 h-4 rounded-full bg-[#E58A7D] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                2
              </div>
              <div className="flex-1">
                <span className="font-bold text-[#D96B5D] block">Рождение ребёнка</span>
                <span className="text-[10px] text-[#6B7C77]">В процессе: оформление документов</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6B7C77]" />
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#F8F1E8] text-xs opacity-75">
              <div className="w-4 h-4 rounded-full bg-[#D3C7BC] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                3
              </div>
              <span className="font-medium text-[#283D38]">Пособия и выплаты ФСЗН</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#F8F1E8] text-xs opacity-75">
              <div className="w-4 h-4 rounded-full bg-[#D3C7BC] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                4
              </div>
              <span className="font-medium text-[#283D38]">Очередь в детский сад</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DESKTOP WEB PORTAL INTERFACE (MATCHES REFERENCE IMAGE 1)
  // -------------------------------------------------------------
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Subtitle, Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EFE3] text-[#34785D] text-xs font-semibold border border-[#D5E5D2]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Национальный проект поддержки семей Беларуси</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#283D38] tracking-tight leading-[1.12]">
                Вместе <br />
                <span className="text-[#34785D]">для счастливого</span> <br />
                детства
              </h1>

              <p className="text-lg text-[#556862] leading-relaxed max-w-xl">
                Единая цифровая экосистема поддержки материнства, детства и семьи в Республике Беларусь. Объединяем пособия, медицинское сопровождение, психологическую помощь и социальную инфраструктуру в один клик.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/benefits"
                  className="px-7 py-4 rounded-full bg-[#E58A7D] hover:bg-[#D96B5D] text-white font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 group"
                >
                  <span>Начать пользоваться</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/about"
                  className="px-7 py-4 rounded-full bg-white hover:bg-[#F8F1E8] text-[#283D38] border border-[#E2D2C0] font-semibold text-base transition-all shadow-xs"
                >
                  Узнать больше о проекте
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#6B7C77] border-t border-[#EAE0D4]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#34785D]" />
                  <span>Официальные нормативы РБ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34785D]" />
                  <span>Конфиденциально и бесплатно</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mother & Child Photography + Script Annotation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85" 
                  alt="Мать и ребенок" 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating handwritten note (matching reference design) */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-[#F0E4D7] transform rotate-1">
                  <span className="font-handwritten text-lg text-[#34785D] font-bold block">
                    Счастливые семьи —
                  </span>
                  <span className="font-handwritten text-lg text-[#E58A7D] font-bold block -mt-1 text-right">
                    сильная Беларусь ♡
                  </span>
                </div>
              </div>

              {/* Decorative botanical element behind */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-30 pointer-events-none">
                <Image src="/images/botanical-branch.svg" alt="" width={128} height={128} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Primary Module Cards (Section 6 & Reference Image 1) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Навигатор льгот и субсидий (Peach/Coral #FDF0EC) */}
          <Link
            href="/benefits"
            className="p-7 rounded-3xl bg-[#FDF0EC] border border-[#F9DCD5] shadow-sm hover:shadow-card card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#E58A7D] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#283D38] mb-2 leading-tight">
                Навигатор льгот и субсидий
              </h3>
              <p className="text-sm text-[#556862] leading-relaxed">
                Расчёт пособий, государственный калькулятор, персональные чек-листы и оформление документов.
              </p>
            </div>
            <div className="pt-6 flex items-center text-[#E58A7D] font-bold text-sm">
              <span>Рассчитать выплаты</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Семейный щит (Mint #EAF4ED) */}
          <Link
            href="/psychology"
            className="p-7 rounded-3xl bg-[#EAF4ED] border border-[#D5E8D8] shadow-sm hover:shadow-card card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#34785D] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#283D38] mb-2 leading-tight">
                Семейный щит
              </h3>
              <p className="text-sm text-[#556862] leading-relaxed">
                Психологическая помощь родителям, онлайн-медиация для пар и круглосуточный кризисный SOS-чат.
              </p>
            </div>
            <div className="pt-6 flex items-center text-[#34785D] font-bold text-sm">
              <span>Получить поддержку</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Здоровое поколение (Soft Blue #EBF3FB) */}
          <Link
            href="/health"
            className="p-7 rounded-3xl bg-[#EBF3FB] border border-[#D5E5F5] shadow-sm hover:shadow-card card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#2F6D9E] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#283D38] mb-2 leading-tight">
                Здоровое поколение
              </h3>
              <p className="text-sm text-[#556862] leading-relaxed">
                Планирование беременности, интерактивный календарь по неделям, скрининги и консультации врачей.
              </p>
            </div>
            <div className="pt-6 flex items-center text-[#2F6D9E] font-bold text-sm">
              <span>Открыть календарь</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Социальный гид (Lilac #F2EFF9) */}
          <Link
            href="/infrastructure"
            className="p-7 rounded-3xl bg-[#F2EFF9] border border-[#E3DCF2] shadow-sm hover:shadow-card card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#7A5BA3] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#283D38] mb-2 leading-tight">
                Социальный гид
              </h3>
              <p className="text-sm text-[#556862] leading-relaxed">
                Детские сады со свободными местами, поликлиники, учреждения и карта доступной городской среды.
              </p>
            </div>
            <div className="pt-6 flex items-center text-[#7A5BA3] font-bold text-sm">
              <span>Интерактивная карта</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Family Route Stepper & Quick Calculator */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#FFFDF9] rounded-4xl p-8 lg:p-12 border border-[#F0E4D7] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Lifecycle Stepper */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                Семейная траектория
              </span>
              <h2 className="text-3xl font-extrabold text-[#283D38] leading-tight">
                Ваш семейный маршрут от планирования до школы
              </h2>
              <p className="text-sm text-[#556862] leading-relaxed">
                Платформа автоматически подсказывает, какие пособия оформить, в какие сроки пройти обследования и когда встать в очередь детского сада.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#E5EFE3] border border-[#D5E8D8]">
                  <div className="w-8 h-8 rounded-full bg-[#34785D] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#283D38]">1. Планирование и ведение беременности</h4>
                    <p className="text-xs text-[#556862]">Постановка на учет до 12 недель (+437,80 BYN) и скрининги.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FDF0EC] border border-[#F9DCD5]">
                  <div className="w-8 h-8 rounded-full bg-[#E58A7D] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#283D38]">2. Рождение ребёнка и первые выплаты</h4>
                    <p className="text-xs text-[#556862]">Получение свидетельства в ЗАГСе и единовременного пособия от 4 378 до 6 129 BYN.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F1E8] border border-[#EFE5D9]">
                  <div className="w-8 h-8 rounded-full bg-[#D3C7BC] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#283D38]">3. Ежемесячное сопровождение до 3 лет</h4>
                    <p className="text-xs text-[#556862]">Выплаты по уходу (845 – 966 BYN/мес) и запись в детский сад через «Одно окно».</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Quick Calculator Widget */}
            <div className="lg:col-span-6 bg-[#F8F1E8] rounded-3xl p-6 lg:p-8 border border-[#E9DACB]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2D2C0]">
                <div>
                  <h3 className="text-lg font-bold text-[#283D38]">Экспресс-калькулятор выплат</h3>
                  <p className="text-xs text-[#6B7C77]">Выберите количество детей в семье:</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-full shadow-xs">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleQuickCalc(num)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        childCount === num
                          ? 'bg-[#34785D] text-white shadow-xs'
                          : 'text-[#6B7C77] hover:text-[#283D38]'
                      }`}
                    >
                      {num === 1 ? '1-й ребёнок' : num === 2 ? '2-й ребёнок' : '3+ (Многодетная)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculator Output Display */}
              <div className="mt-6 space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#E8DCD0] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6B7C77] block">Единовременное пособие при рождении:</span>
                    <span className="text-2xl font-black text-[#283D38]">
                      {calcResult.lump_sum_total_byn.toLocaleString('ru-RU')} BYN
                    </span>
                  </div>
                  <span className="text-xs bg-[#E5EFE3] text-[#34785D] font-bold px-3 py-1 rounded-full">
                    Выплачивается сразу
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#E8DCD0] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6B7C77] block">Ежемесячное пособие по уходу до 3 лет:</span>
                    <span className="text-2xl font-black text-[#34785D]">
                      {calcResult.monthly_total_byn.toLocaleString('ru-RU')} BYN/мес
                    </span>
                  </div>
                  <span className="text-xs bg-[#EAF4ED] text-[#34785D] font-bold px-3 py-1 rounded-full">
                    Каждый месяц
                  </span>
                </div>

                {childCount >= 3 && (
                  <div className="bg-[#FDF0EC] rounded-2xl p-4 border border-[#F9DCD5] shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#D96B5D] block font-semibold">Семейный капитал:</span>
                      <span className="text-2xl font-black text-[#E58A7D]">
                        31 426,00 BYN
                      </span>
                    </div>
                    <span className="text-xs bg-[#E58A7D] text-white font-bold px-3 py-1 rounded-full">
                      Безналичные средства
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2D2C0] flex items-center justify-between">
                <span className="text-[11px] text-[#6B7C77] max-w-xs">
                  * Расчёт основан на Законе РБ № 7-З и актуальных размерах БПМ/СЗП на 2026 год.
                </span>
                <Link
                  href="/benefits"
                  className="px-5 py-2.5 rounded-full bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>Подробный расчёт</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Support Statistics of Belarus */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#245B49] to-[#34785D] rounded-4xl p-8 lg:p-12 text-white shadow-float relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <span className="text-4xl lg:text-5xl font-black text-[#F8F1E8]">100+</span>
              <p className="text-xs lg:text-sm text-[#DCE7E3]">Видов государственной поддержки и льгот для семей</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl lg:text-5xl font-black text-[#F8F1E8]">2 400+</span>
              <p className="text-xs lg:text-sm text-[#DCE7E3]">Детских садов и школ в интерактивном каталоге</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl lg:text-5xl font-black text-[#F8F1E8]">120 000+</span>
              <p className="text-xs lg:text-sm text-[#DCE7E3]">Семей Беларуси уже получили семейный капитал</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl lg:text-5xl font-black text-[#F8F1E8]">450+</span>
              <p className="text-xs lg:text-sm text-[#DCE7E3]">Врачей, психологов и медиаторов на связи</p>
            </div>
          </div>
        </div>
      </section>

      {/* Useful Articles & Advice */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">Полезные материалы и гиды</h2>
            <p className="text-sm text-[#556862] mt-1">Проверенные статьи экспертов, врачей и юристов Беларуси</p>
          </div>
          <Link href="/about" className="text-sm font-bold text-[#34785D] hover:underline flex items-center gap-1">
            <span>Все материалы</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_ARTICLES.slice(0, 3).map((art) => (
            <Link
              key={art.id}
              href={`/about#${art.slug}`}
              className="bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#F0E4D7] shadow-sm hover:shadow-card card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={art.image_url}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#34785D]">
                    {art.target_age_group === 'pregnancy' ? 'Беременность' : 'Семья'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-base text-[#283D38] group-hover:text-[#34785D] transition-colors leading-snug line-clamp-2 mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#556862] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F8F1E8] flex items-center justify-between text-xs text-[#6B7C77]">
                <span>{art.author_name}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {art.reading_time_minutes} мин
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

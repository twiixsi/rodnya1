'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  User, 
  ArrowRight, 
  Wallet, 
  Heart, 
  Plus, 
  MapPin, 
  Menu, 
  Bell, 
  Home, 
  LayoutGrid, 
  MessageSquare, 
  Calculator,
  X,
  Stethoscope,
  Info,
  ChevronRight,
  ChevronDown,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Users,
  FileText,
  PhoneCall,
  Laptop,
  Smartphone,
  Eye,
  Building,
  GraduationCap
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function HomePage() {
  const { user, setIsDownloadModalOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Express calculator state (1, 2, 3+ children)
  const [calcChildrenCount, setCalcChildrenCount] = useState<1 | 2 | 3>(1);
  
  // Pregnancy calendar trimester tab
  const [activeTrimester, setActiveTrimester] = useState<1 | 2 | 3>(2);

  // =========================================================================
  // ОФИЦИАЛЬНЫЕ КОНСТАНТЫ МИНТРУДА РБ (период с 01.11.2026 по 31.01.2027)
  // =========================================================================
  const BPM = 530.37; // Актуальный БПМ
  const SZP = 3022.00; // Актуальная средняя зарплата

  // Belarusian benefit amounts calculated based on Law of RB № 7-Z and Ministry of Labour data
  const benefitData = {
    1: {
      title: 'Первый ребёнок',
      lumpSumBirth: '5 303,70 BYN', // 10 БПМ (10 * 530.37)
      prenatalCheckup: '530,37 BYN', // 100% БПМ (1 * 530.37)
      lumpSumTotal: '5 834,07 BYN', // 5 303.70 + 530.37
      monthlyAllowance: '1 057,70 BYN / мес', // 35% СЗП (0.35 * 3022.00)
      familyCapital: '—',
      totalThreeYears: '~43 911 BYN', // 5 834.07 + (1 057.70 * 36) = 43 911.27 BYN
      legalBasis: 'Статьи 9, 10, 13 Закона РБ № 7-З',
      specialBonus: 'Бесплатное питание детям до 2 лет при доходе ниже БПМ'
    },
    2: {
      title: 'Второй ребёнок',
      lumpSumBirth: '7 425,18 BYN', // 14 БПМ (14 * 530.37)
      prenatalCheckup: '530,37 BYN', // 100% БПМ (1 * 530.37)
      lumpSumTotal: '7 955,55 BYN', // 7 425.18 + 530.37
      monthlyAllowance: '1 208,80 BYN / мес', // 40% СЗП (0.40 * 3022.00)
      familyCapital: '—',
      totalThreeYears: '~51 472 BYN', // 7 955.55 + (1 208.80 * 36) = 51 472.35 BYN
      legalBasis: 'Статьи 10, 13 Закона РБ № 7-З',
      specialBonus: 'Льготная очередь в детский сад + скидка 30% на питание'
    },
    3: {
      title: 'Третий и последующие (Многодетная семья)',
      lumpSumBirth: '7 425,18 BYN', // 14 БПМ (14 * 530.37)
      prenatalCheckup: '530,37 BYN', // 100% БПМ (1 * 530.37)
      lumpSumTotal: '7 955,55 BYN', // 7 425.18 + 530.37
      monthlyAllowance: '1 473,99 BYN / мес', // 40% СЗП (1 208.80) + 50% БПМ на старшего ребенка (265.19)
      familyCapital: '31 480 BYN', // Депозит «Семейный капитал»
      totalThreeYears: '~92 544 BYN + жильё', // 7 955.55 + (1 473.99 * 36) = 61 019.19 BYN
      legalBasis: 'Указ Президента РБ № 572, Закон РБ № 7-З',
      specialBonus: 'Субсидия на жильё до 100% + Семейный капитал + скидка 50% на садик'
    }
  };

  const currentBenefit = benefitData[calcChildrenCount];

  // =========================================================================
  // КОМПОНЕНТ МОБИЛЬНОГО ИНТЕРФЕЙСА (ИСПОЛЬЗУЕТСЯ НА ТЕЛЕФОНАХ И В ДЕМО-РАМКЕ ПК)
  // =========================================================================
  const renderMobileInterface = (isInsideSimulator = false) => (
    <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-24'} shadow-sm px-4 pt-3 space-y-4 font-sans text-[#283D38]`}>
      
      {/* 1. Шапка мобильного приложения: Логотип, бургер-меню, колокольчик */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 drop-shadow-2xs"
            >
              <path 
                d="M32 58 C13 42, 3 29, 3 18 C3 7, 12 2, 21 2 C27 2, 30 6, 32 10 C34 6, 37 2, 43 2 C52 2, 61 7, 61 18 C61 29, 51 42, 32 58 Z" 
                stroke="#E58A7D" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none"
              />
              <circle cx="22" cy="20" r="5" stroke="#34785D" strokeWidth="3" fill="#FFFDF9" />
              <path d="M12 38 C12 29, 18 27, 22 27 C26 27, 32 29, 32 38" stroke="#34785D" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="42" cy="18" r="5" stroke="#245B49" strokeWidth="3" fill="#FFFDF9" />
              <path d="M32 38 C32 28, 38 26, 42 26 C46 26, 52 28, 52 38" stroke="#245B49" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="32" cy="28" r="3.6" stroke="#E58A7D" strokeWidth="2.6" fill="#FFFDF9" />
              <path d="M25 44 C25 37, 28 35, 32 35 C36 35, 39 37, 39 44" stroke="#E58A7D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[#283D38] tracking-tight">Родные люди</span>
        </Link>

        <div className="flex items-center gap-3 text-[#283D38]">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 hover:text-[#34785D] transition-colors"
            title="Меню"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/notifications" className="relative p-1 hover:text-[#34785D] transition-colors" title="Уведомления">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FFF9F5]" />
          </Link>
        </div>
      </div>

      {/* 2. Блок приветствия: Аватар Анны слева, теплый текст справа, веточка на фоне */}
      <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-2xs flex items-center justify-between relative overflow-hidden">
        <div className="flex items-center gap-3.5 z-10 min-w-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#E5EFE3]">
            <img 
              src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"} 
              alt="Анна" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#283D38] truncate">
              Добрый день, Анна!
            </h2>
            <p className="text-xs text-[#6B7C77] mt-0.5 font-medium">
              Пусть каждый день приносит радость! ♡
            </p>
          </div>
        </div>
        
        <div className="w-14 h-14 opacity-35 shrink-0 pointer-events-none">
          <Image src="/images/botanical-branch.svg" alt="" width={56} height={56} />
        </div>
      </div>

      {/* 3. Две главные карточки строго в один ряд (grid-cols-2) */}
      <div className="grid grid-cols-2 gap-3">
        {/* «Мои выплаты» (нежно-розовая bg-[#FEECEB]) */}
        <Link
          href="/benefits"
          className="p-4 rounded-3xl bg-[#FEECEB] border border-[#F8DDD4] shadow-2xs flex flex-col justify-between h-36 active:scale-98 transition-transform"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs">
            <Wallet className="w-5 h-5 text-[#E58A7D]" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#283D38] block leading-tight">Мои выплаты</span>
            <span className="text-[11px] text-[#6B7C77] block mt-0.5">Проверить статус</span>
          </div>
          <div>
            <span className="text-[#E58A7D] font-bold text-base leading-none">→</span>
          </div>
        </Link>

        {/* «SOS-поддержка» (нежно-зеленая bg-[#EAF5F0]) */}
        <Link
          href="/psychology"
          className="p-4 rounded-3xl bg-[#EAF5F0] border border-[#D5E8D8] shadow-2xs flex flex-col justify-between h-36 active:scale-98 transition-transform"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs">
            <Heart className="w-5 h-5 text-[#34785D] fill-[#34785D]/20" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#283D38] block leading-tight">SOS-поддержка</span>
            <span className="text-[11px] text-[#6B7C77] block mt-0.5">Психолог / 24/7</span>
          </div>
          <div>
            <span className="text-[#34785D] font-bold text-base leading-none">→</span>
          </div>
        </Link>
      </div>

      {/* 4. Быстрые действия: 4 круглые иконки в один ряд (grid-cols-4) */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-sm font-bold text-[#283D38]">
          Быстрые действия
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center">
          {/* 1. Калькулятор пособий */}
          <Link href="/benefits" className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#FDEEE9] text-[#E07955] flex items-center justify-center mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#283D38] leading-tight">
              Калькулятор<br/>пособий
            </span>
          </Link>

          {/* 2. Запись к врачу */}
          <Link href="/health" className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#EAF2FA] text-[#2F6D9E] flex items-center justify-center mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#283D38] leading-tight">
              Запись<br/>к врачу
            </span>
          </Link>

          {/* 3. Детские сады */}
          <Link href="/infrastructure" className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#FDEEE9] text-[#D96B5D] flex items-center justify-center mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#283D38] leading-tight">
              Детские<br/>сады
            </span>
          </Link>

          {/* 4. Карта доступной среды */}
          <Link href="/infrastructure" className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#EBF1FA] text-[#3E6BB3] flex items-center justify-center mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#283D38] leading-tight">
              Карта<br/>доступной<br/>среды
            </span>
          </Link>
        </div>
      </div>

      {/* 5. Карточка «Календарь осознанного родительства» с фото kalendarosozn.jpg справа */}
      <Link
        href="/health"
        className="relative overflow-hidden rounded-3xl bg-[#F8EDE6] p-4 border border-[#EEDCD3] shadow-soft flex items-center justify-between group active:scale-[0.98] transition-transform block mt-1"
      >
        <div className="space-y-1.5 z-10 max-w-[58%]">
          <h3 className="text-base font-extrabold text-[#1E3029] leading-snug">
            Календарь осознанного родительства
          </h3>
          <p className="text-xs text-[#6B7C77] leading-tight">
            Все этапы беременности и развития малыша
          </p>
          <div className="pt-1">
            <span className="text-sm font-bold text-[#283D38] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Подробнее</span>
              <span>→</span>
            </span>
          </div>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-white/80 bg-white">
          <img 
            src="/images/kalendarosozn.jpg" 
            alt="Календарь осознанного родительства" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="absolute -bottom-2 -left-2 w-20 h-20 opacity-30 pointer-events-none">
          <Image src="/images/botanical-branch.svg" alt="" width={80} height={80} />
        </div>
      </Link>

      {/* 6. Мобильный экспресс-виджет выплат РБ */}
      <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#E58A7D]" />
            <h4 className="text-xs font-bold text-[#283D38] uppercase tracking-wide">
              Калькулятор пособий РБ
            </h4>
          </div>
          <span className="text-[10px] text-[#6B7C77] font-semibold">2026/2027</span>
        </div>

        <div className="grid grid-cols-3 gap-1 bg-[#F5ECE1] p-1 rounded-2xl text-[11px] font-semibold text-center">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setCalcChildrenCount(num as 1 | 2 | 3)}
              className={`py-1.5 rounded-xl transition-all ${calcChildrenCount === num ? 'bg-white text-[#34785D] font-bold shadow-2xs' : 'text-[#6B7C77]'}`}
            >
              {num === 3 ? '3+ детей' : `${num} ребёнок`}
            </button>
          ))}
        </div>

        <div className="bg-[#FDF9F4] rounded-2xl p-3 border border-[#F0E4D7] space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#6B7C77]">При рождении (разово):</span>
            <span className="font-bold text-[#283D38]">{currentBenefit.lumpSumTotal}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6B7C77]">Пособие до 3 лет:</span>
            <span className="font-bold text-[#34785D]">{currentBenefit.monthlyAllowance}</span>
          </div>
          {calcChildrenCount === 3 && (
            <div className="flex justify-between items-center pt-1 border-t border-[#F0E4D7]">
              <span className="text-[#6B7C77] font-semibold">Семейный капитал:</span>
              <span className="font-black text-[#8E5B4B]">{currentBenefit.familyCapital}</span>
            </div>
          )}
        </div>

        <Link
          href="/benefits"
          className="w-full py-2 rounded-xl bg-[#34785D] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#2A634D] transition-colors"
        >
          <span>Полный расчёт и чек-лист</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 7. Мобильный виджет «Моя семья» */}
      <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#34785D]" />
            <h4 className="text-xs font-bold text-[#283D38]">Моя семья</h4>
          </div>
          <Link href="/dashboard" className="text-[11px] text-[#34785D] font-bold">
            Редактировать
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#34785D]/30 shadow-2xs">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Мама" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-bold text-[#283D38] mt-1">Мама</span>
            <span className="text-[9px] text-[#6B7C77]">32 года</span>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 shadow-2xs">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Папа" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-bold text-[#283D38] mt-1">Папа</span>
            <span className="text-[9px] text-[#6B7C77]">34 года</span>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-300 shadow-2xs">
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=150&q=80" alt="Аня" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-bold text-[#283D38] mt-1">Анечка</span>
            <span className="text-[9px] text-[#6B7C77]">3 года</span>
          </div>

          <button 
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex flex-col items-center shrink-0"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#C4B2A0] flex items-center justify-center text-[#6B7C77] hover:border-[#34785D] hover:text-[#34785D] transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#6B7C77] mt-1">Добавить</span>
            <span className="text-[9px] text-transparent">—</span>
          </button>
        </div>
      </div>

      {/* 8. Ваш семейный маршрут (мобильный вид) */}
      <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#F0E4D7] shadow-2xs space-y-3">
        <h4 className="text-xs font-bold text-[#283D38]">Ваш семейный маршрут</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#EAF5F0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#34785D]" />
              <span className="font-semibold text-[#283D38]">Планирование и учёт</span>
            </div>
            <span className="text-[10px] text-[#34785D] font-bold">Пройдено</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#FDF0EC]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E58A7D]" />
              <span className="font-semibold text-[#283D38]">Рождение и пособия</span>
            </div>
            <span className="text-[10px] text-[#E58A7D] font-bold">В процессе</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#F5ECE1]">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-[#6B7C77]" />
              <span className="font-semibold text-[#283D38]">Очередь в детский сад</span>
            </div>
            <span className="text-[10px] text-[#6B7C77] font-semibold">С 3 лет</span>
          </div>
        </div>
      </div>

      {/* 9. Баннер установки приложения на телефон */}
      <div className="p-4 rounded-3xl bg-linear-to-r from-[#283D38] to-[#34785D] text-white flex items-center justify-between shadow-md">
        <div className="space-y-1 max-w-[70%]">
          <span className="text-xs font-bold block">Приложение «Родные люди»</span>
          <span className="text-[10px] text-white/80 block">Добавьте на главный экран для быстрого доступа без интернета</span>
        </div>
        <button
          onClick={() => setIsDownloadModalOpen(true)}
          className="px-3 py-1.5 rounded-full bg-white text-[#283D38] text-[11px] font-bold hover:bg-[#F8F1E8] transition-colors shrink-0 shadow-xs"
        >
          Установить
        </button>
      </div>

      {/* 10. Фиксированное нижнее меню (Bottom Navigation) */}
      <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
        {/* Главная (активная, зеленая) */}
        <Link href="/" className="flex flex-col items-center justify-center text-[#34785D] font-bold">
          <Home className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[10px] mt-1">Главная</span>
        </Link>

        {/* Сервисы */}
        <Link href="/benefits" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Сервисы</span>
        </Link>

        {/* Сообщения (с красным бейджем '1') */}
        <Link href="/chats" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] relative transition-colors">
          <div className="relative">
            <MessageSquare className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              1
            </span>
          </div>
          <span className="text-[10px] mt-1 font-medium">Сообщения</span>
        </Link>

        {/* Профиль */}
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Профиль</span>
        </Link>
      </nav>

    </div>
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen text-[#283D38] font-sans antialiased selection:bg-[#34785D] selection:text-white">

      {/* ========================================================================= */}
      {/* 1. ДЕСКТОПНЫЙ РЕЖИМ (ПОРТАЛ)                                             */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Верхняя панель (Header): Логотип «Родные люди», слоган, РБ и Войти */}
          <header className="flex items-center justify-between pb-1">
            {/* Слева: Логотип-сердце со слоганом (чистый векторный SVG) */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 select-none" title="Родные люди — Главная">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105 shrink-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-10 h-10 drop-shadow-2xs"
                >
                  {/* Контур сердца */}
                  <path 
                    d="M32 58 C13 42, 3 29, 3 18 C3 7, 12 2, 21 2 C27 2, 30 6, 32 10 C34 6, 37 2, 43 2 C52 2, 61 7, 61 18 C61 29, 51 42, 32 58 Z" 
                    stroke="#E58A7D" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                  {/* Силуэт мамы (слева) */}
                  <circle cx="22" cy="20" r="5" stroke="#34785D" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M12 38 C12 29, 18 27, 22 27 C26 27, 32 29, 32 38" stroke="#34785D" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Силуэт папы (справа) */}
                  <circle cx="42" cy="18" r="5" stroke="#245B49" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M32 38 C32 28, 38 26, 42 26 C46 26, 52 28, 52 38" stroke="#245B49" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Силуэт ребенка (по центру) */}
                  <circle cx="32" cy="28" r="3.6" stroke="#E58A7D" strokeWidth="2.6" fill="#FFFDF9" />
                  <path d="M25 44 C25 37, 28 35, 32 35 C36 35, 39 37, 39 44" stroke="#E58A7D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tracking-tight text-[#283D38] font-sans">
                  Родные люди
                </span>
                <span className="h-5 w-px bg-[#D6C7B8] inline-block" />
                <span className="font-handwritten text-lg text-[#6B7C77] italic tracking-wide">
                  Забота. Поддержка. Будущее.
                </span>
              </div>
            </Link>

            {/* По центру: Статус «Республика Беларусь» с флагом страны */}
            <div className="flex items-center gap-2 font-medium text-xs text-[#556862] bg-[#F5EFE9]/80 px-3.5 py-1.5 rounded-full border border-[#E8DDD1] shadow-2xs">
              <span>Республика Беларусь</span>
              <svg className="w-5 h-3.5 rounded-xs shadow-2xs shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="4" width="32" height="16" fill="#C8232A" rx="1"/>
                <rect x="12" y="20" width="32" height="8" fill="#438C5B" rx="1"/>
                <rect x="4" y="4" width="8" height="24" fill="#FFFFFF" rx="1"/>
                <path d="M8 8 L10 10 L8 12 L6 10 Z" fill="#C8232A"/>
                <path d="M8 14 L10 16 L8 18 L6 16 Z" fill="#C8232A"/>
                <path d="M8 20 L10 22 L8 24 L6 22 Z" fill="#C8232A"/>
                <rect x="4" y="4" width="40" height="24" stroke="#D8C8B8" strokeWidth="1" rx="1" fill="none"/>
              </svg>
            </div>

            {/* Справа: кнопка Скачать + Войти / Профиль */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#245B49] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                title="Скачать приложение (APK / PWA)"
              >
                <Download className="w-3.5 h-3.5 text-[#34785D]" />
                <span>Скачать</span>
              </button>

              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors shadow-2xs"
                >
                  <span>{user.full_name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7C77]" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-bold text-xs transition-colors shadow-2xs"
                >
                  Войти
                </Link>
              )}
            </div>
          </header>

          {/* Горизонтальное меню навигации (Белая округлая капсула) */}
          <div className="bg-white rounded-full border border-[#EFE5DB] shadow-xs px-8 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-7 xl:gap-9 text-sm">
              <Link 
                href="/" 
                className="font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]"
              >
                Главная
              </Link>
              <Link href="/benefits" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Льготы и субсидии
              </Link>
              <Link href="/health" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Здоровье
              </Link>
              <Link href="/psychology" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Психология
              </Link>
              <Link href="/infrastructure" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Инфраструктура
              </Link>
              <Link href="/about" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                О проекте
              </Link>
            </nav>

            {/* Поиск и Личный кабинет */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-[#6B7C77] hover:text-[#283D38] p-1 transition-colors"
                title="Поиск"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href={user ? "/dashboard" : "/login"}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E0D4C8] bg-white hover:bg-[#F8F1E8] text-xs font-semibold text-[#283D38] shadow-2xs transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#6B7C77]" />
                <span>Личный кабинет</span>
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ГЛАВНЫЙ БАННЕР (rounded-[40px], левая половина текст, правая — фото)    */}
          {/* КАРТИНКА ПОЛНОСТЬЮ РАСТЯНУТА НА ВСЮ ПРАВУЮ ПОЛОВИНУ БЕЗ ВНУТРЕННИХ РАМОК  */}
          {/* ========================================================================= */}
          <section className="bg-[#FFFDF9] rounded-[40px] border border-[#F0E4D7] shadow-soft overflow-hidden grid grid-cols-2 min-h-[460px] relative">
            
            {/* ЛЕВАЯ ПОЛОВИНА: Крупный жирный заголовок, описание, кнопка */}
            <div className="p-10 lg:p-14 xl:p-16 flex flex-col justify-center space-y-6 z-10">
              <h1 className="text-4xl lg:text-5xl xl:text-[54px] font-black text-[#1E3029] tracking-tight leading-[1.12]">
                Вместе<br />
                для счастливого<br />
                детства
              </h1>

              <p className="text-base text-[#52635D] leading-relaxed max-w-md">
                Единая цифровая экосистема поддержки материнства и детства в Республике Беларусь
              </p>

              <div className="pt-2">
                <Link
                  href="/benefits"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D47466] hover:bg-[#C56557] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Узнать больше</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ПРАВАЯ ПОЛОВИНА: Фотография мамы с ребенком на всю ширину и высоту без полей */}
            <div className="relative w-full h-full min-h-[460px] overflow-hidden">
              <img 
                src="/images/glavnaya.jpg" 
                alt="Вместе для счастливого детства — Минск" 
                className="absolute inset-0 w-full h-full object-cover object-center rounded-r-[40px]"
              />

              {/* Каллиграфическая надпись поверх картинки в правом верхнем углу */}
              <div className="absolute top-8 right-8 text-right select-none pointer-events-none drop-shadow-md z-10">
                <span className="font-handwritten text-2xl lg:text-3xl text-[#8E5B4B] font-bold block leading-tight">
                  Счастливые семьи
                </span>
                <span className="font-handwritten text-2xl lg:text-3xl text-[#8E5B4B] font-bold block leading-tight">
                  — сильная Беларусь
                </span>
                <span className="font-handwritten text-xl lg:text-2xl text-[#8E5B4B] font-bold block text-right pr-2">
                  ♡
                </span>
              </div>

              {/* Аккуратный ботанический эскиз в нижнем правом углу */}
              <div className="absolute bottom-3 right-4 w-28 h-28 opacity-40 pointer-events-none z-10">
                <Image src="/images/botanical-branch.svg" alt="" width={112} height={112} />
              </div>
            </div>
          </section>

          {/* НИЖНЯЯ СЕТКА МОДУЛЕЙ: 4 карточки в один ряд строго по шаблону primerglavPC.jpg */}
          <section className="grid grid-cols-4 gap-5 pt-1">
            {/* Модуль 1: Навигатор льгот и субсидий (персиковый фон) */}
            <Link 
              href="/benefits" 
              className="p-6 rounded-[28px] bg-[#FCEEE9] border border-[#F6DDD5] shadow-xs hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E58A7D] text-white flex items-center justify-center shadow-xs">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#283D38] leading-tight mb-2">
                    Навигатор льгот<br />и субсидий
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Расчёт пособий, калькулятор, чек-листы, оформление документов
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-[#E58A7D] font-bold text-lg group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Модуль 2: Семейный щит (мятный фон) */}
            <Link 
              href="/psychology" 
              className="p-6 rounded-[28px] bg-[#EBF4EE] border border-[#DCECE1] shadow-xs hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#34785D] text-white flex items-center justify-center shadow-xs">
                  <Heart className="w-6 h-6 text-white fill-white/20" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#283D38] leading-tight mb-2">
                    Семейный щит
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Психологическая помощь, онлайн-медиация, круглосуточный SOS-чат
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-[#34785D] font-bold text-lg group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Модуль 3: Здоровое поколение (голубой фон) */}
            <Link 
              href="/health" 
              className="p-6 rounded-[28px] bg-[#EBF3FB] border border-[#DAE8F6] shadow-xs hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2F6D9E] text-white flex items-center justify-center shadow-xs">
                  <Plus className="w-6 h-6 text-white stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#283D38] leading-tight mb-2">
                    Здоровое поколение
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Планирование беременности, консультации врачей, календарь здоровья
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-[#2F6D9E] font-bold text-lg group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Модуль 4: Социальный гид (лавандовый фон) */}
            <Link 
              href="/infrastructure" 
              className="p-6 rounded-[28px] bg-[#F3EDF9] border border-[#E6DCF2] shadow-xs hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#8667AC] text-white flex items-center justify-center shadow-xs">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#283D38] leading-tight mb-2">
                    Социальный гид
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Детские сады, доступная среда, полезные учреждения рядом
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-[#8667AC] font-bold text-lg group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </div>
            </Link>
          </section>


          {/* ========================================================================= */}
          {/* ВОССТАНОВЛЕННЫЙ БЛОК: ЭКСПРЕСС-КАЛЬКУЛЯТОР ДЕТСКИХ ПОСОБИЙ В БЕЛАРУСИ     */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-[36px] border border-[#F0E4D7] shadow-soft p-8 lg:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F5ECE1] pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0EC] text-[#E58A7D] text-xs font-bold mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Государственная поддержка семей • Закон РБ № 7-З</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
                  Экспресс-калькулятор детских пособий Республики Беларусь
                </h2>
                <p className="text-sm text-[#6B7C77] mt-1 max-w-2xl leading-relaxed">
                  Мгновенный официальный расчёт единовременных и ежемесячных выплат на детей в соответствии с законодательством Республики Беларусь на 2026/2027 год.
                </p>
              </div>

              {/* Переключатель: 1, 2, 3+ ребенка */}
              <div className="flex items-center gap-1.5 bg-[#F5ECE1] p-1.5 rounded-2xl self-start md:self-center shrink-0">
                {[
                  { count: 1, label: '1 ребёнок' },
                  { count: 2, label: '2 ребёнка' },
                  { count: 3, label: '3+ (Многодетная)' },
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setCalcChildrenCount(item.count as 1 | 2 | 3)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      calcChildrenCount === item.count
                        ? 'bg-[#34785D] text-white shadow-xs'
                        : 'text-[#556862] hover:text-[#1E3029]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Карточки с суммами пособий */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Пособие 1: Разовые выплаты */}
              <div className="p-6 rounded-3xl bg-[#FDF9F6] border border-[#F3E7DC] space-y-3">
                <span className="text-xs font-bold text-[#6B7C77] uppercase tracking-wider block">
                  Единовременно при рождении
                </span>
                <div className="text-3xl font-black text-[#283D38]">
                  {currentBenefit.lumpSumTotal}
                </div>
                <div className="text-xs text-[#556862] space-y-1 pt-1 border-t border-[#EFE5DB]">
                  <div className="flex justify-between">
                    <span>Пособие в связи с рождением:</span>
                    <span className="font-semibold text-[#283D38]">{currentBenefit.lumpSumBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Учёт до 12 недель (100% БПМ):</span>
                    <span className="font-semibold text-[#283D38]">{currentBenefit.prenatalCheckup}</span>
                  </div>
                  {calcChildrenCount === 3 && (
                    <div className="flex justify-between text-[#8E5B4B] font-bold pt-1 border-t border-[#EFE5DB]">
                      <span>Семейный капитал:</span>
                      <span>31 480 BYN</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Пособие 2: Ежемесячно до 3 лет */}
              <div className="p-6 rounded-3xl bg-[#F0F8F4] border border-[#D7EBDC] space-y-3">
                <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider block">
                  Ежемесячно по уходу до 3 лет
                </span>
                <div className="text-3xl font-black text-[#34785D]">
                  {currentBenefit.monthlyAllowance}
                </div>
                <div className="text-xs text-[#556862] space-y-1 pt-1 border-t border-[#D7EBDC]">
                  <div className="flex justify-between">
                    <span>Расчёт от средней зарплаты:</span>
                    <span className="font-semibold text-[#283D38]">
                      {calcChildrenCount === 1 ? '35% СЗП (1 057,70 BYN)' : '40% СЗП (1 208,80 BYN)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Выплата на старших детей:</span>
                    <span className="font-semibold text-[#283D38]">
                      {calcChildrenCount === 3 
                        ? '+ 265,19 BYN (50% БПМ)' 
                        : calcChildrenCount === 2 
                          ? 'По праву семьи' 
                          : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Пособие 3: Семейный капитал и бонусы */}
              <div className="p-6 rounded-3xl bg-[#FFF5F2] border border-[#F9DFD8] space-y-3">
                <span className="text-xs font-bold text-[#E58A7D] uppercase tracking-wider block">
                  {calcChildrenCount === 3 ? 'Семейный капитал (депозит)' : 'Итоговая господдержка за 3 года'}
                </span>
                <div className="text-3xl font-black text-[#8E5B4B]">
                  {calcChildrenCount === 3 ? currentBenefit.familyCapital : currentBenefit.totalThreeYears}
                </div>
                <div className="text-xs text-[#556862] pt-1 border-t border-[#F9DFD8]">
                  <span className="block font-medium text-[#283D38]">{currentBenefit.specialBonus}</span>
                </div>
              </div>
            </div>

            {/* Подвал калькулятора с правовой базой и кнопкой подробностей */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 bg-[#FAF4ED] p-4 rounded-2xl border border-[#EDE0D2]">
              <div className="flex items-center gap-2 text-xs text-[#6B7C77]">
                <ShieldCheck className="w-4 h-4 text-[#34785D] shrink-0" />
                <span>Правовая гарантия: <strong className="text-[#283D38]">{currentBenefit.legalBasis}</strong>. Выплаты гарантированы из средств ФСЗН РБ.</span>
              </div>

              <Link
                href="/benefits"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#34785D] hover:text-[#235843] transition-colors shrink-0"
              >
                <span>Перейти в полный интерактивный Навигатор пособий</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* ВОССТАНОВЛЕННЫЙ БЛОК: 5 ШАГОВ СЕМЕЙНОГО МАРШРУТА                          */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-[36px] border border-[#F0E4D7] shadow-soft p-8 lg:p-10 space-y-7">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-handwritten text-2xl text-[#8E5B4B] block mb-1">
                  С заботой о каждом этапе ♡
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
                  Ваш семейный маршрут
                </h2>
                <p className="text-sm text-[#6B7C77] mt-1">
                  Пошаговая цифровая траектория семьи от планирования беременности до школы
                </p>
              </div>

              <span className="text-xs font-bold text-[#34785D] bg-[#EAF5F0] px-3 py-1.5 rounded-full border border-[#D5E8D8]">
                Автоматическое ведение семьи
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Шаг 1: Планирование */}
              <div className="p-5 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] space-y-3 relative hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#E58A7D] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <span className="text-[11px] font-bold text-[#34785D] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Пройдено</span>
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#283D38]">
                  Планирование беременности
                </h3>
                <p className="text-xs text-[#6B7C77] leading-relaxed">
                  Анализы, консультация врача, постановка на учёт до 12 недель.
                </p>
              </div>

              {/* Шаг 2: Рождение */}
              <div className="p-5 rounded-2xl bg-[#F0F8F4] border border-[#D7EBDC] space-y-3 relative ring-2 ring-[#34785D]/30 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#34785D] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span className="text-[11px] font-bold text-[#E58A7D] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                    В процессе
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#283D38]">
                  Рождение ребёнка
                </h3>
                <p className="text-xs text-[#6B7C77] leading-relaxed">
                  Роддом, регистрация в ЗАГСе, получение свидетельства и СНИЛС.
                </p>
              </div>

              {/* Шаг 3: Пособия */}
              <div className="p-5 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] space-y-3 relative hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#E58A7D] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7C77]">
                    Доступно
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#283D38]">
                  Пособия и льготы
                </h3>
                <p className="text-xs text-[#6B7C77] leading-relaxed">
                  Подача заявления «Одно окно», выплаты до 3 лет, семейный капитал.
                </p>
              </div>

              {/* Шаг 4: Детский сад */}
              <div className="p-5 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] space-y-3 relative hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#2F6D9E] text-white flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7C77]">
                    С 2–3 лет
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#283D38]">
                  Детский сад
                </h3>
                <p className="text-xs text-[#6B7C77] leading-relaxed">
                  Электронная очередь в садик, медицинская карта, ясли по району.
                </p>
              </div>

              {/* Шаг 5: Школа */}
              <div className="p-5 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] space-y-3 relative hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#8667AC] text-white flex items-center justify-center font-bold text-xs">
                    5
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7C77]">
                    С 6 лет
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#283D38]">
                  Школа и развитие
                </h3>
                <p className="text-xs text-[#6B7C77] leading-relaxed">
                  Закрепление по микрорайону, кружки, секции и центры творчества.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-handwritten text-xl text-[#8E5B4B] font-bold">
                Всё лучшее впереди ♡
              </span>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* ВОССТАНОВЛЕННЫЙ БЛОК: КАЛЕНДАРЬ ОСОЗНАННОГО РОДИТЕЛЬСТВА (ДЕТАЛЬНЫЙ ВИД)  */}
          {/* ========================================================================= */}
          <section className="bg-[#FFFDF9] rounded-[36px] border border-[#F0E4D7] shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-10 relative">
            {/* Левая часть: Картинка kalendarosozn.jpg в стильной рамке */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white aspect-4/3 lg:aspect-square">
                <img 
                  src="/images/kalendarosozn.jpg" 
                  alt="Календарь осознанного родительства" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-md border border-[#F0E4D7] text-xs">
                  <span className="font-bold text-[#283D38] block">Минздрав РБ • 28 неделя</span>
                  <span className="text-[#6B7C77] block text-[11px]">Плановый скрининг и рекомендации по питанию</span>
                </div>
              </div>
            </div>

            {/* Правая часть: Описание и переключатели триместров */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FB] text-[#2F6D9E] text-xs font-bold">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Здоровье матери и малыша</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#283D38]">
                  Календарь осознанного родительства
                </h2>
                <p className="text-sm text-[#556862] leading-relaxed">
                  Интерактивный медицинский навигатор, сопровождающий женщину с первых недель ожидания малыша до его первых уверенных шагов. Все рекомендации согласованы с протоколами Минздрава РБ.
                </p>
              </div>

              {/* Переключатель триместров */}
              <div className="grid grid-cols-3 gap-2 bg-[#F5ECE1] p-1.5 rounded-2xl text-xs font-bold text-center">
                {[
                  { id: 1, title: '1 триместр', desc: '1–13 недели' },
                  { id: 2, title: '2 триместр', desc: '14–27 недели' },
                  { id: 3, title: '3 триместр', desc: '28–40 недели' },
                ].map((trim) => (
                  <button
                    key={trim.id}
                    onClick={() => setActiveTrimester(trim.id as 1 | 2 | 3)}
                    className={`p-2 rounded-xl transition-all ${
                      activeTrimester === trim.id
                        ? 'bg-white text-[#34785D] shadow-xs'
                        : 'text-[#6B7C77] hover:text-[#283D38]'
                    }`}
                  >
                    <span className="block">{trim.title}</span>
                    <span className="text-[10px] font-normal opacity-80">{trim.desc}</span>
                  </button>
                ))}
              </div>

              {/* Подсказки выбранного триместра */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FDF9F6] border border-[#F3E7DC] space-y-1">
                  <span className="font-bold text-[#283D38] block">🩺 Врачи и скрининги:</span>
                  <span className="text-[#6B7C77] block text-[11px]">
                    {activeTrimester === 1 && 'Акушер-гинеколог, терапевт, ЭКГ, скрининг I триместра.'}
                    {activeTrimester === 2 && 'Второй УЗИ-скрининг (20 нед), глюкозотолерантный тест.'}
                    {activeTrimester === 3 && 'КТГ плода, подготовка к роддому, обменная карта.'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDF9F6] border border-[#F3E7DC] space-y-1">
                  <span className="font-bold text-[#283D38] block">🥗 Питание и образ жизни:</span>
                  <span className="text-[#6B7C77] block text-[11px]">
                    {activeTrimester === 1 && 'Фолиевая кислота 400 мкг, йодид калия, дробное питание.'}
                    {activeTrimester === 2 && 'Белковое питание, профилактика анемии, прогулки 5 км.'}
                    {activeTrimester === 3 && 'Контроль водного баланса, упражнения дыхания, отдых.'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/health"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#34785D] hover:bg-[#2A634D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Открыть полный календарь здоровья семьи</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* ВОССТАНОВЛЕННЫЙ БЛОК: «МОЯ СЕМЬЯ» И «ЦИФРОВАЯ ПАПКА ДОКУМЕНТОВ»          */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Виджет «Моя семья» */}
            <div className="bg-white rounded-[36px] border border-[#F0E4D7] shadow-soft p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF5F0] text-[#34785D] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#283D38]">Моя семья: Семья Ивановых</h3>
                    <p className="text-xs text-[#6B7C77]">г. Минск • 2 взрослых, 1 ребёнок</p>
                  </div>
                </div>

                <Link href="/dashboard" className="text-xs text-[#34785D] font-bold hover:underline">
                  Личный кабинет →
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#34785D] shadow-xs mb-2">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Анна" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-[#283D38]">Анна</span>
                  <span className="text-[11px] text-[#6B7C77]">Мама, 32 года</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs mb-2">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Максим" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-[#283D38]">Максим</span>
                  <span className="text-[11px] text-[#6B7C77]">Папа, 34 года</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7] flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E58A7D] shadow-xs mb-2">
                    <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=200&q=80" alt="Анечка" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-[#283D38]">Анечка</span>
                  <span className="text-[11px] text-[#6B7C77]">Дочь, 3 года</span>
                </div>

                <button 
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="p-3 rounded-2xl border-2 border-dashed border-[#DFCFC0] hover:border-[#34785D] hover:bg-[#F0F8F4] transition-all flex flex-col items-center justify-center text-[#6B7C77] hover:text-[#34785D] group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5ECE1] group-hover:bg-[#34785D] group-hover:text-white flex items-center justify-center transition-colors mb-1">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold">Добавить</span>
                  <span className="text-[10px]">члена семьи</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#EAF5F0] text-[#34785D] font-medium">✓ Полная семья</span>
                <span className="px-3 py-1 rounded-full bg-[#FDF0EC] text-[#E58A7D] font-medium">✓ Пособие до 3 лет: Назначено</span>
                <span className="px-3 py-1 rounded-full bg-[#EAF3FA] text-[#2F6D9E] font-medium">✓ Детсад №152: Очередь №12</span>
              </div>
            </div>

            {/* Виджет «Цифровая папка документов» */}
            <div className="bg-white rounded-[36px] border border-[#F0E4D7] shadow-soft p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] text-[#E58A7D] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#283D38]">Цифровые документы семьи</h3>
                    <p className="text-xs text-[#6B7C77]">Защищённое хранилище и подача заявлений</p>
                  </div>
                </div>

                <Link href="/dashboard" className="text-xs text-[#34785D] font-bold hover:underline">
                  Все документы →
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#34785D]" />
                    <div>
                      <span className="font-bold text-[#283D38] block">Паспорт гражданина Республики Беларусь</span>
                      <span className="text-[11px] text-[#6B7C77]">Серия МР • Действителен до 2032 г.</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#34785D] bg-[#EAF5F0] px-2.5 py-1 rounded-full">Проверен</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#2F6D9E]" />
                    <div>
                      <span className="font-bold text-[#283D38]">Свидетельство о рождении ребёнка</span>
                      <span className="text-[11px] text-[#6B7C77]">Запись ЗАГС г. Минска № 4128</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#34785D] bg-[#EAF5F0] px-2.5 py-1 rounded-full">Загружено</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF9F6] border border-[#F0E4D7]">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-4 h-4 text-[#E58A7D]" />
                    <div>
                      <span className="font-bold text-[#283D38]">Заявление на пособие по уходу до 3 лет</span>
                      <span className="text-[11px] text-[#6B7C77]">Решение комиссии УСЗН от 14.04.2026</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#E58A7D] bg-[#FDF0EC] px-2.5 py-1 rounded-full">Выплачивается</span>
                </div>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* ВОССТАНОВЛЕННЫЙ БЛОК: БАННЕР ДОВЕРИЯ И МУЛЬТИПЛАТФОРМЕННОСТИ              */}
          {/* ========================================================================= */}
          <section className="bg-linear-to-r from-[#F6EEE3] via-[#FDF9F4] to-[#F2E8DC] rounded-[36px] border border-[#E9DACB] p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="font-handwritten text-3xl text-[#8E5B4B] font-bold block">
                Родные люди рядом ♡
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#1E3029] leading-tight">
                Забота о семье сегодня —<br />процветающая Беларусь завтра
              </h2>
              <p className="text-sm text-[#556862] leading-relaxed max-w-xl">
                Проект создан для поддержки белорусских семей, повышения рождаемости и обеспечения равного доступа к медицинским, социальным и юридическим благам страны.
              </p>

              {/* Бейджи мультиплатформенности */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E0D4C8] shadow-2xs text-xs font-bold text-[#283D38]">
                  <Smartphone className="w-4 h-4 text-[#34785D]" />
                  <span>iOS Приложение</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E0D4C8] shadow-2xs text-xs font-bold text-[#283D38]">
                  <Download className="w-4 h-4 text-[#34785D]" />
                  <span>Android Приложение (APK)</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E0D4C8] shadow-2xs text-xs font-bold text-[#283D38]">
                  <Laptop className="w-4 h-4 text-[#2F6D9E]" />
                  <span>Веб-портал (Браузер)</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#34785D] text-white shadow-2xs text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Доступно на всех устройствах</span>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
              <Image src="/images/botanical-branch.svg" alt="" width={300} height={300} className="w-full h-full object-contain object-right" />
            </div>
          </section>


          {/* ПОДВАЛ ДЕСКТОПНОГО ПОРТАЛА */}
          <footer className="pt-8 pb-12 border-t border-[#EFE5DB] text-xs text-[#6B7C77] space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/logo-icon.svg" alt="Родные люди" width={28} height={28} />
                <span className="font-bold text-[#283D38] text-base">Родные люди</span>
                <span className="text-[#A49484]">|</span>
                <span className="font-medium">Республиканская экосистема поддержки семьи</span>
              </div>

              <div className="flex items-center gap-6">
                <Link href="/about" className="hover:text-[#283D38] transition-colors">О проекте «100 идей»</Link>
                <Link href="/benefits" className="hover:text-[#283D38] transition-colors">Калькулятор льгот</Link>
                <Link href="/health" className="hover:text-[#283D38] transition-colors">Здоровье</Link>
                <Link href="/psychology" className="hover:text-[#283D38] transition-colors">SOS-помощь 24/7</Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-[#8C9C96] border-t border-[#F5ECE1] pt-4">
              <span>© 2026–2027 «Родные люди». Проект разработан для Республиканского конкурса «100 идей для Беларуси».</span>
              <div className="flex items-center gap-2">
                <span className="text-base">🌾</span>
                <span>Сделано с любовью к родной Беларуси</span>
              </div>
            </div>
          </footer>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. НАСТОЯЩИЙ МОБИЛЬНЫЙ ИНТЕРФЕЙС ДЛЯ СМАРТФОНОВ (VIEWPORT МЕНЬШЕ MD)     */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {renderMobileInterface(false)}
      </div>


      {/* ========================================================================= */}
      {/* МОДАЛЬНОЕ ОКНО ПОИСКА (ДЛЯ ДЕСКТОПА)                                     */}
      {/* ========================================================================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#F0E4D7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#283D38]">
                <Search className="w-4 h-4 text-[#34785D]" />
                <span>Поиск по экосистеме «Родные люди»</span>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Например: калькулятор пособий, очередь в детский сад, прививки..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs text-[#283D38] outline-hidden focus:border-[#34785D]"
            />

            <div className="pt-2 text-xs space-y-2">
              <span className="text-[11px] font-bold text-[#6B7C77] uppercase tracking-wider block">Популярные запросы:</span>
              <div className="flex flex-wrap gap-2">
                {['Расчёт пособия до 3 лет', 'Семейный капитал 31 480 BYN', 'Запись к педиатру', 'Детский сад «Одно окно»'].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(q)}
                    className="px-3 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#34785D] text-[11px] font-medium transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* МОБИЛЬНАЯ ШТОРКА (DRAWER МЕНЮ)                                           */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-[85%] max-w-sm bg-[#FFFDF9] h-full shadow-2xl flex flex-col p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2">
                <Image src="/logo-icon.svg" alt="" width={28} height={28} />
                <span className="font-bold text-[#283D38] text-base">Родные люди</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-1.5 flex-1">
              <span className="text-[10px] font-bold text-[#6B7C77] uppercase tracking-wider block px-2 mb-1">
                Разделы экосистемы
              </span>
              {[
                { label: 'Главная', href: '/', icon: Home, color: '#34785D' },
                { label: 'Льготы и субсидии', href: '/benefits', icon: Calculator, color: '#E58A7D' },
                { label: 'Здоровое поколение', href: '/health', icon: Plus, color: '#2F6D9E' },
                { label: 'Семейный щит', href: '/psychology', icon: Heart, color: '#34785D' },
                { label: 'Социальный гид', href: '/infrastructure', icon: MapPin, color: '#8667AC' },
                { label: 'О проекте «100 идей»', href: '/about', icon: Info, color: '#6B7C77' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F8F1E8] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-[#283D38]">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5B5A3]" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#F0E4D7] space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#34785D] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Установить приложение</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

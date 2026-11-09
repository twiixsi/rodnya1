'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  Building, 
  ArrowLeft, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Users, 
  ChevronDown, 
  Search, 
  User, 
  Home, 
  LayoutGrid, 
  MessageSquare, 
  FileText, 
  Laptop, 
  Smartphone,
  ExternalLink,
  Info,
  Download
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function AboutPage() {
  const { user, setIsDownloadModalOpen } = useApp();

  // Активная статья в базе знаний (для интерактивного раскрытия подробностей)
  const [expandedArticle, setExpandedArticle] = useState<string | null>('dekret-guide');

  // =============================================================================
  // ДЕКОРАТИВНЫЕ ВЕКТОРНЫЕ ВЕТОЧКИ (ДЛЯ ДЕСКТОПА)
  // =============================================================================
  const BotanicalBranchLeft = () => (
    <div className="fixed top-24 left-0 w-36 lg:w-44 h-auto pointer-events-none opacity-30 select-none z-0 hidden md:block">
      <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#A9937E]">
        <path d="M15 370 C25 290, 45 180, 135 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 275 C25 250, 15 250, 18 225 C40 225, 48 250, 42 275 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 240 C75 230, 90 240, 85 260 C65 260, 55 245, 55 240 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 185 C65 160, 45 160, 50 140 C72 140, 85 160, 78 185 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M95 150 C115 140, 125 150, 120 170 C100 170, 95 155, 95 150 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M115 95 C110 70, 95 65, 102 45 C122 50, 125 75, 115 95 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M135 25 C132 10, 145 5, 152 18 C150 30, 138 35, 135 25 Z" fill="#D9D2C7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );

  const BotanicalBranchRight = () => (
    <div className="fixed top-24 right-0 w-36 lg:w-44 h-auto pointer-events-none opacity-30 select-none z-0 hidden md:block scale-x-[-1]">
      <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#A9937E]">
        <path d="M15 370 C25 290, 45 180, 135 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 275 C25 250, 15 250, 18 225 C40 225, 48 250, 42 275 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 240 C75 230, 90 240, 85 260 C65 260, 55 245, 55 240 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 185 C65 160, 45 160, 50 140 C72 140, 85 160, 78 185 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M95 150 C115 140, 125 150, 120 170 C100 170, 95 155, 95 150 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M115 95 C110 70, 95 65, 102 45 C122 50, 125 75, 115 95 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M135 25 C132 10, 145 5, 152 18 C150 30, 138 35, 135 25 Z" fill="#D9D2C7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );

  // =============================================================================
  // РЕНДЕР МОБИЛЬНОЙ ВЕРСИИ (PWA СМАРТФОН)
  // =============================================================================
  const renderMobileContent = (isInsideSimulator = false) => (
    <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-28'} pt-6 px-4 space-y-6 font-sans text-[#283D38] overflow-y-auto`}>
      
      {/* 1. Верхняя мобильная шапка со стрелочкой назад */}
      <div className="flex items-center gap-3">
        <Link 
          href="/" 
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#1E3029] hover:bg-[#F0E4D7] transition-colors -ml-1 cursor-pointer shrink-0"
          title="На главную"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-[#1E3029] tracking-tight">
            О проекте
          </h1>
          <p className="text-xs text-[#6B7C77] truncate">
            Экосистема поддержки семьи «Родные люди»
          </p>
        </div>
      </div>

      {/* 2. Мобильный конкурсный Hero-баннер */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1C5A3E] via-[#208253] to-[#2E8E5E] text-white p-5.5 shadow-md space-y-3.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold text-white shadow-2xs">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>«100 идей для Беларуси — 2027»</span>
        </div>

        <h2 className="text-2xl font-black tracking-tight leading-snug">
          Цифровая экосистема «Родные люди»
        </h2>

        <p className="text-xs text-emerald-100 leading-relaxed font-normal">
          Инновационная национальная платформа всесторонней поддержки материнства, детства и семьи в Республике Беларусь.
        </p>

        <div className="pt-1">
          <span 
            className="text-xl text-[#FCD8D4] font-semibold italic block"
            style={{ fontFamily: 'Caveat, cursive, sans-serif' }}
          >
            Счастливые семьи — сильная Беларусь ♡
          </span>
        </div>
      </div>

      {/* 3. КАРТОЧКИ ЭКОСИСТЕМЫ (ВЕРТИКАЛЬНАЯ СТОПКА НА СМАРТФОНЕ) */}
      <div className="space-y-3.5">
        <div>
          <span className="text-[11px] font-extrabold text-[#208253] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
            МИССИЯ И КОНЦЕПЦИЯ
          </span>
          <h2 className="text-xl font-extrabold text-[#1E3029] mt-2">
            Зачем создана экосистема «Родные люди»?
          </h2>
          <p className="text-xs text-[#556862] mt-1 leading-relaxed">
            Вместо разрозненных сайтов ведомств и очередей — единый цифровой помощник:
          </p>
        </div>

        {/* Стопка из трех полноразмерных карточек (w-full) */}
        <div className="space-y-3 pt-1">
          {/* Карточка 1 */}
          <div className="w-full p-4.5 rounded-[24px] bg-[#F8F1E8] border border-[#E9DACB] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#208253] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                1
              </div>
              <h3 className="font-extrabold text-sm text-[#1E3029]">
                Декрет без бюрократии
              </h3>
            </div>
            <p className="text-xs text-[#556862] leading-relaxed">
              Автоматический расчёт всех 10+ видов государственных пособий по актуальным нормам БПМ и СЗП, пошаговые инструкции оформления документов в ЗАГСе, ФСЗН и службе «Одно окно».
            </p>
          </div>

          {/* Карточка 2 */}
          <div className="w-full p-4.5 rounded-[24px] bg-[#F8F1E8] border border-[#E9DACB] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E58A7D] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                2
              </div>
              <h3 className="font-extrabold text-sm text-[#1E3029]">
                Забота о здоровье и детях
              </h3>
            </div>
            <p className="text-xs text-[#556862] leading-relaxed">
              Неделя за неделей календарь беременности Минздрава РБ, чек-лист сумки в роддом, график вакцинации по Национальному календарю прививок и онлайн-запись к профильным врачам.
            </p>
          </div>

          {/* Карточка 3 */}
          <div className="w-full p-4.5 rounded-[24px] bg-[#F8F1E8] border border-[#E9DACB] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2F6D9E] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                3
              </div>
              <h3 className="font-extrabold text-sm text-[#1E3029]">
                Психологическая опора
              </h3>
            </div>
            <p className="text-xs text-[#556862] leading-relaxed">
              Круглосуточная экстренная кнопка SOS, республиканские горячие линии помощи семье, онлайн-медиация для пар и преодоление послеродового выгорания.
            </p>
          </div>
        </div>
      </div>

      {/* 4. ЧИСТЫЙ ПОШАГОВЫЙ ПЛАН: ДЕКРЕТ БЕЗ БЮРОКРАТИИ (БЕЗ СИМВОЛОВ РАЗМЕТКИ) */}
      <div className="bg-white rounded-[28px] p-5 border border-orange-100/50 shadow-2xs space-y-4">
        <div>
          <span className="text-[10px] font-extrabold text-[#208253] uppercase tracking-wider bg-[#EAF5F0] px-2.5 py-0.5 rounded-full">
            ПОШАГОВЫЙ ПЛАН ВЫПЛАТ И ДОКУМЕНТОВ РБ
          </span>
          <h3 className="text-lg font-extrabold text-[#1E3029] mt-2">
            Декрет без бюрократии: пошаговый гид
          </h3>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Официальный порядок оформления выплат и документов в Республике Беларусь
          </p>
        </div>

        <div className="space-y-4 pt-1">
          {/* Шаг 1 */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE0D2] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#208253] text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <strong className="text-slate-800 font-bold text-xs">
                Шаг 1. Регистрация рождения в ЗАГС или службе «Одно окно»
              </strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              При выписке из роддома выдается медицинская справка о рождении. С этой справкой и паспортами родителей обратитесь в ЗАГС или службу «Одно окно» по месту жительства для получения свидетельства о рождении и справки для назначения госпособий.
            </p>
          </div>

          {/* Шаг 2 */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE0D2] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#208253] text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <strong className="text-slate-800 font-bold text-xs">
                Шаг 2. Единовременные пособия при рождении
              </strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Заявление подается по месту работы (или в управление соцзащиты для незанятых). Выплачивается:
              <br />• 10 БПМ (5 303,70 BYN) — на 1-го ребенка;
              <br />• 14 БПМ (7 425,18 BYN) — на 2-го и последующих детей;
              <br />• 100% БПМ (530,37 BYN) — за постановку на учет до 12 недель.
            </p>
          </div>

          {/* Шаг 3 */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE0D2] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#208253] text-white text-[10px] font-bold flex items-center justify-center">3</span>
              <strong className="text-slate-800 font-bold text-xs">
                Шаг 3. Ежемесячные выплаты по уходу до 3 лет
              </strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Назначаются со дня предоставления отпуска по уходу за ребенком. Размер исчисляется из среднемесячной зарплаты работников по республике:
              <br />• 35% СЗП (1 057,70 BYN/мес) — на 1-го ребенка;
              <br />• 40% СЗП (1 208,80 BYN/мес) — на 2-го и последующих.
            </p>
          </div>

          {/* Шаг 4 */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE0D2] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#208253] text-white text-[10px] font-bold flex items-center justify-center">4</span>
              <strong className="text-slate-800 font-bold text-xs">
                Шаг 4. Постановка на учет в детский сад через «Одно окно»
              </strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Подать заявление в службу «Одно окно» районной администрации можно сразу после получения свидетельства о рождении ребенка для гарантии места в детском саду.
            </p>
          </div>
        </div>
      </div>

      {/* 5. ВЗАИМОДЕЙСТВИЕ С ГОСОРГАНАМИ РЕСПУБЛИКИ БЕЛАРУСЬ */}
      <div className="space-y-3">
        <div>
          <span className="text-[11px] font-extrabold text-[#2F6D9E] uppercase tracking-wider bg-[#EAF3FA] px-3 py-1 rounded-full">
            ГОСУДАРСТВЕННЫЕ СТАНДАРТЫ
          </span>
          <h3 className="text-xl font-extrabold text-[#1E3029] mt-2">
            Взаимодействие с госорганами
          </h3>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Интеграция с информационными системами Беларуси
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#208253] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#1E3029]">
                Министерство труда и социальной защиты
              </h4>
              <p className="text-[11px] text-[#556862] mt-0.5 leading-relaxed">
                Интеграция с базами данных госпособий, ФСЗН и реестром семейного капитала.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#2F6D9E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#1E3029]">
                Министерство здравоохранения
              </h4>
              <p className="text-[11px] text-[#556862] mt-0.5 leading-relaxed">
                Клинические протоколы женских консультаций, скрининги и календарь прививок.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#7A5BA3] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#1E3029]">
                Министерство образования
              </h4>
              <p className="text-[11px] text-[#556862] mt-0.5 leading-relaxed">
                Электронная очередь в детские сады и школы через службу «Одно окно».
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Нижнее мобильное меню (Bottom Nav PWA) */}
      <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
        <Link href="/" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Главная</span>
        </Link>

        <Link href="/health" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Сервисы</span>
        </Link>

        <Link href="/chats" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] relative transition-colors">
          <div className="relative">
            <MessageSquare className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              1
            </span>
          </div>
          <span className="text-[10px] mt-1 font-medium">Сообщения</span>
        </Link>

        <Link href="/about" className="flex flex-col items-center justify-center text-[#208253] font-bold">
          <User className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[10px] mt-1">О проекте</span>
        </Link>
      </nav>

    </div>
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen text-[#283D38] font-sans antialiased selection:bg-[#208253] selection:text-white relative">
      
      {/* Боковые декоративные растительные веточки десктопа */}
      <BotanicalBranchLeft />
      <BotanicalBranchRight />

      {/* ========================================================================= */}
      {/* ДЕСКТОПНЫЙ ВЕБ-ПОРТАЛ                                                     */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        
        {/* СКВОЗНОЙ ГЛОБАЛЬНЫЙ ЛОГОТИП И ЕДИНЫЙ HEADER */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 relative z-10 space-y-4">
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

          {/* Горизонтальное меню навигации */}
          <div className="bg-white rounded-full border border-[#EFE5DB] shadow-xs px-8 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-7 xl:gap-9 text-sm">
              <Link href="/" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
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
              <Link 
                href="/about" 
                className="font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]"
              >
                О проекте
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-[#6B7C77] hover:text-[#283D38] p-1 transition-colors" title="Поиск">
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
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ ДЕСКТОПА */}
        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-12">
          
          {/* 1. КОНКУРСНЫЙ HERO-БАННЕР «100 ИДЕЙ ДЛЯ БЕЛАРУСИ» */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1C5A3E] via-[#208253] to-[#2E8E5E] text-white p-8 lg:p-12 shadow-sm">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-white shadow-2xs">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Конкурс молодежных инициатив «100 идей для Беларуси — 2027»</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                Цифровая экосистема «Родные люди»
              </h1>

              <p className="text-sm lg:text-base text-emerald-100 leading-relaxed font-normal max-w-2xl">
                Инновационная национальная платформа поддержки материнства, детства и семьи в Республике Беларусь. Объединяет государственные сервисы, медицину, социальные гарантии и психологическую опору в едином цифровом окне.
              </p>

              <div className="pt-2">
                <span 
                  className="text-3xl text-[#FCD8D4] font-semibold italic block"
                  style={{ fontFamily: 'Caveat, cursive, sans-serif' }}
                >
                  Счастливые семьи — сильная Беларусь ♡
                </span>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-80 h-80 opacity-10 pointer-events-none">
              <Heart className="w-full h-full text-white" />
            </div>
          </div>

          {/* 2. РАЗДЕЛ «ЗАЧЕМ СОЗДАНА ЭКОСИСТЕМА «РОДНЫЕ ЛЮДИ»?» (КАРТОЧКИ В ОДИН РЯД) */}
          <section className="bg-white rounded-[32px] p-8 lg:p-10 border border-orange-100/50 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#208253] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                Миссия и концепция
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1E3029] mt-2 tracking-tight">
                Зачем создана экосистема «Родные люди»?
              </h2>
              <p className="text-sm text-[#556862] mt-1 leading-relaxed max-w-4xl">
                Вместо разрозненных десятков сайтов ведомств и очередей в инстанциях — единый удобный цифровой помощник, сопровождающий человека на всех этапах жизненного цикла семьи:
              </p>
            </div>

            {/* Карточки преимуществ строго в один горизонтальный ряд на ПК: grid grid-cols-3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Карточка 1 */}
              <div className="p-6 rounded-[28px] bg-[#F8F1E8] border border-[#E9DACB] flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#208253] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                    1
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1E3029]">
                    Декрет без бюрократии
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Автоматический расчёт всех 10+ видов пособий по нормам БПМ и СЗП, интерактивные пошаговые чек-листы для быстрого оформления документов в ЗАГСе, ФСЗН и исполкомах.
                  </p>
                </div>
              </div>

              {/* Карточка 2 */}
              <div className="p-6 rounded-[28px] bg-[#F8F1E8] border border-[#E9DACB] flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E58A7D] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                    2
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1E3029]">
                    Забота о здоровье и детях
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Неделя за неделей календарь беременности Минздрава РБ, подготовка к родам, напоминания о прививках, запись к врачам и интерактивная карта детсадов со свободными местами.
                  </p>
                </div>
              </div>

              {/* Карточка 3 */}
              <div className="p-6 rounded-[28px] bg-[#F8F1E8] border border-[#E9DACB] flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2F6D9E] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                    3
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1E3029]">
                    Психологическая опора
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    Круглосуточная экстренная кнопка SOS, республиканские горячие линии помощи семье, онлайн-медиация для пар и преодоление послеродового выгорания.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ОЧИЩЕННЫЙ ПОШАГОВЫЙ ГИД: ДЕКРЕТ БЕЗ БЮРОКРАТИИ (БЕЗ СЫРЫХ СИМВОЛОВ ###) */}
          <section className="bg-white rounded-[32px] p-8 lg:p-10 border border-orange-100/50 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E4D7] pb-4">
              <div>
                <span className="text-xs font-bold text-[#208253] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                  ПОШАГОВЫЙ ПРАКТИЧЕСКИЙ ГИД
                </span>
                <h2 className="text-2xl font-extrabold text-[#1E3029] mt-2">
                  Декрет без бюрократии: пошаговый гид оформления выплат и документов в РБ
                </h2>
              </div>
              <span className="text-xs text-[#8C9C96] shrink-0 font-medium">
                Нормы Минтруда РБ (Ноябрь 2026)
              </span>
            </div>

            <p className="text-sm text-[#556862] leading-relaxed">
              Оформление государственной поддержки семьи в Республике Беларусь выстроено по принципу «Одно окно». Ниже представлен чистый регламент действий для молодых родителей:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Шаг 1 */}
              <div className="bg-[#FAF5EF] rounded-[24px] p-6 border border-[#EFE5DB] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#208253] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
                    1
                  </span>
                  <strong className="text-slate-800 font-bold text-base block">
                    Шаг 1. Регистрация в органах ЗАГС или службе «Одно окно»
                  </strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  При выписке из роддома родителям выдается медицинская справка о рождении. С этой справкой и паспортами обоих родителей обратитесь в отдел ЗАГС или службу «Одно окно» по месту жительства. Вам выдадут гербовое свидетельство о рождении и специальную справку для назначения единовременных пособий.
                </p>
              </div>

              {/* Шаг 2 */}
              <div className="bg-[#FAF5EF] rounded-[24px] p-6 border border-[#EFE5DB] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#208253] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
                    2
                  </span>
                  <strong className="text-slate-800 font-bold text-base block">
                    Шаг 2. Единовременные государственные пособия
                  </strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  Подаются по месту работы матери или отца (или в управление соцзащиты):
                  <br />• <strong>10 БПМ (5 303,70 BYN)</strong> — в связи с рождением первого ребенка;
                  <br />• <strong>14 БПМ (7 425,18 BYN)</strong> — на второго и последующих детей;
                  <br />• <strong>100% БПМ (530,37 BYN)</strong> — женщинам, ставшим на учет до 12 недель;
                  <br />• Дополнительно <strong>2 БПМ (+1 060,74 BYN)</strong> на каждого при рождении двойни.
                </p>
              </div>

              {/* Шаг 3 */}
              <div className="bg-[#FAF5EF] rounded-[24px] p-6 border border-[#EFE5DB] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#208253] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
                    3
                  </span>
                  <strong className="text-slate-800 font-bold text-base block">
                    Шаг 3. Ежемесячные выплаты по уходу за ребенком до 3 лет
                  </strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  Назначаются со дня предоставления отпуска по уходу за ребенком. Размер привязан к среднемесячной зарплате работников в республике (СЗП = 3 022,00 BYN):
                  <br />• <strong>35% СЗП (1 057,70 BYN/мес)</strong> — на первого ребенка;
                  <br />• <strong>40% СЗП (1 208,80 BYN/мес)</strong> — на второго и последующих детей;
                  <br />• <strong>45% СЗП (1 359,90 BYN/мес)</strong> — на ребенка-инвалида до 3 лет;
                  <br />• <strong>50% БПМ (265,19 BYN/мес)</strong> — пособие на старших детей от 3 до 18 лет.
                </p>
              </div>

              {/* Шаг 4 */}
              <div className="bg-[#FAF5EF] rounded-[24px] p-6 border border-[#EFE5DB] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#208253] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
                    4
                  </span>
                  <strong className="text-slate-800 font-bold text-base block">
                    Шаг 4. Очередь в детский сад через «Одно окно»
                  </strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  Подайте заявление в службу «Одно окно» районной администрации сразу после получения свидетельства о рождении ребенка. Это гарантирует своевременное бронирование места в ближайшем государственном детском саду вашего микрорайона к моменту завершения декрета.
                </p>
              </div>
            </div>
          </section>

          {/* 4. ВЗАИМОДЕЙСТВИЕ С ГОСУДАРСТВЕННЫМИ ОРГАНАМИ РЕСПУБЛИКИ БЕЛАРУСЬ */}
          <section className="bg-white rounded-[32px] p-8 lg:p-10 border border-orange-100/50 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#208253] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                Архитектура интеграций
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E3029] mt-2">
                Взаимодействие с государственными органами Беларуси
              </h2>
              <p className="text-sm text-[#556862] mt-1 leading-relaxed">
                Платформа спроектирована для безопасного обмена данными и регламентированного взаимодействия с государственными системами:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-4">
                <Building className="w-6 h-6 text-[#208253] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1E3029]">
                    Министерство труда и социальной защиты Республики Беларусь
                  </h4>
                  <p className="text-[#556862] leading-relaxed">
                    Интеграция с реестрами выплат госпособий, базами данных ФСЗН и системой учета семейного капитала для многодетных семей.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-4">
                <Building className="w-6 h-6 text-[#2F6D9E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1E3029]">
                    Министерство здравоохранения Республики Беларусь
                  </h4>
                  <p className="text-[#556862] leading-relaxed">
                    Клинические протоколы ведения беременности, скрининги РНПЦ «Мать и дитя» и Национальный календарь прививок.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-4">
                <Building className="w-6 h-6 text-[#7A5BA3] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1E3029]">
                    Министерство образования Республики Беларусь
                  </h4>
                  <p className="text-[#556862] leading-relaxed">
                    Единая электронная очередь в детские сады и школы Беларуси, интерактивный мониторинг свободных мест в группах.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-4">
                <Building className="w-6 h-6 text-[#E58A7D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1E3029]">
                    Кризисные центры и ТЦСОН во всех районах Беларуси
                  </h4>
                  <p className="text-[#556862] leading-relaxed">
                    Круглосуточная маршрутизация экстренной помощи, анонимные консультации психологов и безопасные «кризисные комнаты».
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Подвал десктопного портала */}
          <footer className="pt-8 pb-10 border-t border-[#EFE5DB] text-xs text-[#6B7C77] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#283D38]">Родные люди</span>
              <span>• Цифровая экосистема поддержки семьи в Республике Беларусь</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Heart className="w-3.5 h-3.5 text-[#E58A7D]" />
              <span>Конкурс «100 идей для Беларуси»</span>
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. НАСТОЯЩИЙ МОБИЛЬНЫЙ ВИД ДЛЯ СМАРТФОНОВ (block md:hidden)               */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {renderMobileContent(false)}
      </div>

    </div>
  );
}

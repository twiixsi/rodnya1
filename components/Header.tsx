'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { 
  Search, 
  User, 
  ChevronDown, 
  X,
  Download
} from 'lucide-react';

// =============================================================================
// ЕДИНЫЙ ИЗОЛИРОВАННЫЙ БЛОК БРЕНДОВОГО ЛОГОТИПА
// (Сердце с силуэтом семьи + фиксированные шрифты пиксель-в-пиксель)
// =============================================================================
export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3.5 group shrink-0 select-none ${className}`}
      title="Родные люди — Главная"
    >
      {/* Точная векторная иконка: сердце с силуэтом семьи (мама, папа, ребенок) чистым кодом SVG */}
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
          {/* Мама (слева) */}
          <circle cx="22" cy="20" r="5" stroke="#34785D" strokeWidth="3" fill="#FFFDF9" />
          <path d="M12 38 C12 29, 18 27, 22 27 C26 27, 32 29, 32 38" stroke="#34785D" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Папа (справа) */}
          <circle cx="42" cy="18" r="5" stroke="#245B49" strokeWidth="3" fill="#FFFDF9" />
          <path d="M32 38 C32 28, 38 26, 42 26 C46 26, 52 28, 52 38" stroke="#245B49" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Ребенок (по центру) */}
          <circle cx="32" cy="28" r="3.6" stroke="#E58A7D" strokeWidth="2.6" fill="#FFFDF9" />
          <path d="M25 44 C25 37, 28 35, 32 35 C36 35, 39 37, 39 44" stroke="#E58A7D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Название и пастельный слоган со строгими классами шрифтов */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#283D38] font-sans">
          Родные люди
        </span>
        <span className="hidden sm:inline-block h-5 w-px bg-[#D6C7B8]" />
        <span className="hidden sm:inline-block font-handwritten text-base sm:text-lg text-[#6B7C77] italic tracking-wide">
          Забота. Поддержка. Будущее.
        </span>
      </div>
    </Link>
  );
}

// =============================================================================
// ЕДИНЫЙ КОМПОНЕНТ ШАПКИ ПОРТАЛА (ДЛЯ ВСЕХ СТРАНИЦ)
// =============================================================================
export interface HeaderProps {
  desktopViewMode?: 'desktop' | 'mobile-sim';
  onToggleViewMode?: () => void;
  className?: string;
}

export function Header({ desktopViewMode, onToggleViewMode, className = '' }: HeaderProps) {
  const pathname = usePathname();
  const { user, setIsDownloadModalOpen } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Льготы и субсидии', href: '/benefits' },
    { label: 'Здоровье', href: '/health' },
    { label: 'Психология', href: '/psychology' },
    { label: 'Инфраструктура', href: '/infrastructure' },
    { label: 'О проекте', href: '/about' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className={`max-w-7xl mx-auto px-6 pt-6 pb-2 relative z-20 space-y-4 ${className}`}>
      {/* 1. Верхний микробар: Логотип + Государственный статус + Авторизация + Кнопка Скачать */}
      <header className="flex items-center justify-between pb-1">
        {/* Слева: Изолированный брендовый логотип-сердце со слоганом */}
        <BrandLogo />

        {/* По центру: Статус «Республика Беларусь» с гербом/флагом страны */}
        <div className="hidden md:flex items-center gap-2 font-medium text-xs text-[#556862] bg-[#F5EFE9]/80 px-3.5 py-1.5 rounded-full border border-[#E8DDD1] shadow-2xs">
          <span>🏛️ Республика Беларусь</span>
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

        {/* Правая часть: кнопка Скачать + Войти / Профиль */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#245B49] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            title="Скачать полноценное приложение экосистемы «Родные люди» (APK / PWA)"
          >
            <Download className="w-3.5 h-3.5 text-[#34785D]" />
            <span className="hidden sm:inline">Скачать</span>
            <span className="sm:hidden">APK</span>
          </button>

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors shadow-2xs"
            >
              <span>{user.full_name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7C77]" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 sm:px-5 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-bold text-xs transition-colors shadow-2xs"
            >
              Войти
            </Link>
          )}
        </div>
      </header>

      {/* 2. Горизонтальное меню навигации (белая скругленная плашка с горизонтальной прокруткой для планшетов и телефонов) */}
      <div className="bg-white rounded-full border border-[#EFE5DB] shadow-xs px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 overflow-hidden">
        <nav className="flex items-center gap-4 sm:gap-7 xl:gap-9 text-xs sm:text-sm overflow-x-auto no-scrollbar scroll-smooth">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]'
                    : 'text-[#556862] hover:text-[#1E3029] font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-[#6B7C77] hover:text-[#283D38] p-1.5 transition-colors cursor-pointer" 
            title="Поиск по экосистеме"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link
            href={user ? "/dashboard" : "/login"}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[#E0D4C8] bg-white hover:bg-[#F8F1E8] text-xs font-semibold text-[#283D38] shadow-2xs transition-colors whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5 text-[#6B7C77]" />
            <span>Личный кабинет</span>
          </Link>
        </div>
      </div>

      {/* Модальное окно быстрого поиска по экосистеме */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-orange-100/50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3029]">
                <Search className="w-4 h-4 text-[#208253]" />
                <span>Поиск по экосистеме «Родные люди»</span>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="w-7 h-7 rounded-full bg-[#FAF3EC] text-[#556862] hover:bg-[#F0E4D7] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите запрос: например, пособие до 3 лет, прививки, педиатр..."
                autoFocus
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF5EF] border border-[#E9DACB] text-sm text-[#283D38] focus:outline-none focus:ring-2 focus:ring-[#208253]/30"
              />
            </div>

            <div className="pt-2 text-xs text-[#6B7C77] space-y-2">
              <span className="font-semibold block text-[#1E3029]">Популярные разделы:</span>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/benefits" 
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1 rounded-full bg-[#FAF5EF] hover:bg-[#EAE0D5] text-[#283D38] transition-colors"
                >
                  Калькулятор пособий
                </Link>
                <Link 
                  href="/health" 
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1 rounded-full bg-[#FAF5EF] hover:bg-[#EAE0D5] text-[#283D38] transition-colors"
                >
                  Календарь беременности
                </Link>
                <Link 
                  href="/psychology" 
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1 rounded-full bg-[#FAF5EF] hover:bg-[#EAE0D5] text-[#283D38] transition-colors"
                >
                  SOS кризисная помощь
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

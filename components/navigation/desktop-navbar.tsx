'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { 
  Bell, 
  Search, 
  User, 
  MapPin, 
  ChevronDown, 
  Sparkles,
  Bot,
  HeartHandshake,
  LogOut,
  Users,
  FileText,
  LayoutDashboard,
  ShieldAlert,
  Download,
  Smartphone
} from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function DesktopNavbar() {
  const pathname = usePathname();
  const { user, isDemoUser, logout, unreadNotificationsCount, notifications, markNotificationAsRead, setIsDownloadModalOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Льготы и субсидии', href: '/benefits' },
    { label: 'Здоровье', href: '/health' },
    { label: 'Психология', href: '/psychology' },
    { label: 'Инфраструктура', href: '/infrastructure' },
    { label: 'О проекте', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F1E8]/90 backdrop-blur-md pt-2 pb-3">
      {/* Upper micro-bar matching primerglavPC.jpg: Brand logo + Tagline | State symbol + Flag + Login button */}
      <div className="max-w-7xl mx-auto px-6 pb-2.5 flex items-center justify-between">
        {/* Left: Brand Icon + 'Родные люди' | 'Забота. Поддержка. Будущее.' */}
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

        {/* Right: State symbol + Республика Беларусь + Flag + Login */}
        <div className="flex items-center gap-5 text-xs text-[#556862]">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-base">🌾</span>
            <span className="hidden sm:inline">Республика Беларусь</span>
            <Image 
              src="/images/belarus-flag-pin.svg" 
              alt="Флаг Беларуси" 
              width={20} 
              height={14} 
              className="rounded-xs shadow-2xs"
            />
          </div>

          {/* Mode switch */}
          <ModeToggle />

          {/* Download App Button */}
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#245B49] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            title="Скачать приложение экосистемы «Родные люди» (APK / PWA)"
          >
            <Download className="w-3.5 h-3.5 text-[#34785D]" />
            <span>Скачать</span>
          </button>

          {/* Login or user quick button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="px-4 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>{user.full_name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#6B7C77]" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#F0E4D7] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#F0E4D7]">
                    <span className="font-bold text-xs text-[#283D38] block truncate">{user.full_name}</span>
                    <span className="text-[10px] text-[#6B7C77] block truncate">{user.email}</span>
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2 text-xs text-[#283D38] hover:bg-[#F8F1E8]">
                    Личный кабинет
                  </Link>
                  <Link href="/family" className="block px-4 py-2 text-xs text-[#283D38] hover:bg-[#F8F1E8]">
                    Моя семья
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 border-t border-[#F0E4D7] mt-1"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors shadow-2xs"
            >
              Войти
            </Link>
          )}
        </div>
      </div>

      {/* Main Floating Capsule Navigation Bar matching primerglavPC.jpg */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-xs px-6 py-2.5 flex items-center justify-between">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 xl:gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 font-medium transition-all relative ${
                    isActive
                      ? 'text-[#1E3029] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1E3029]'
                      : 'text-[#556862] hover:text-[#1E3029]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search icon & 'Личный кабинет' Pill Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-1.5 text-[#6B7C77] hover:text-[#283D38] transition-colors"
              title="Поиск"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href={user ? "/dashboard" : "/login"}
              className="px-4 py-2 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors flex items-center gap-2 shadow-2xs"
            >
              <User className="w-3.5 h-3.5 text-[#6B7C77]" />
              <span>Личный кабинет</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#F0E4D7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#283D38]">
                <Search className="w-4 h-4 text-[#34785D]" />
                <span>Поиск по экосистеме «Родные люди»</span>
              </div>
              <button 
                onClick={() => setShowSearchModal(false)}
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
                {['Расчёт пособия до 3 лет', 'Семейный капитал 31 426 BYN', 'Запись к педиатру', 'Детский сад «Одно окно»'].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(q);
                    }}
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
    </header>
  );
}

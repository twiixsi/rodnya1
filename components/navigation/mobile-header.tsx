'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bell, 
  Menu, 
  X, 
  Calculator, 
  Heart, 
  Stethoscope, 
  MapPin, 
  Users, 
  FileText, 
  Bot, 
  Info, 
  Download, 
  ShieldAlert,
  ChevronRight,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { ModeToggle } from './mode-toggle';

export function MobileHeader() {
  const { unreadNotificationsCount, user, isDemoUser, logout, setIsDownloadModalOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuSections = [
    { label: 'Главная', href: '/', icon: Users, color: '#34785D', desc: 'Обзор экосистемы' },
    { label: 'Навигатор льгот и субсидий', href: '/benefits', icon: Calculator, color: '#E58A7D', desc: 'Калькулятор пособий и чек-листы' },
    { label: 'Здоровое поколение', href: '/health', icon: Stethoscope, color: '#2F6D9E', desc: 'Врачи, прививки и беременность' },
    { label: 'Семейный щит', href: '/psychology', icon: Heart, color: '#34785D', desc: 'Круглосуточный SOS-чат и медиация' },
    { label: 'Социальный гид', href: '/infrastructure', icon: MapPin, color: '#7A5BA3', desc: 'Детсады, магазины, кружки' },
    { label: 'Моя семья и календарь', href: '/family', icon: Users, color: '#34785D', desc: 'Профили детей и события' },
    { label: 'Мои документы', href: '/documents', icon: FileText, color: '#2F6D9E', desc: 'Цифровая папка семьи' },
    { label: 'Умный ИИ-помощник', href: '/assistant', icon: Bot, color: '#34785D', desc: 'Консультации по законам РБ' },
    { label: 'О проекте «100 идей»', href: '/about', icon: Info, color: '#6B7C77', desc: 'Цели, команда и конкурс' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E4D7] px-4 py-2">
        {/* Dynamic Island & System bar simulation */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#283D38] px-1 pb-1 opacity-80">
          <span>9:41</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Brand matching reference design: Logo + Родные люди */}
          <Link href="/" className="flex items-center gap-2.5">
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
            <div>
              <h1 className="text-base font-bold text-[#283D38] tracking-tight leading-none">Родные люди</h1>
              <p className="font-handwritten text-[11px] text-[#6B7C77] leading-tight">Забота. Поддержка. Будущее.</p>
            </div>
          </Link>

          {/* Right Header Actions: Menu hamburger + Bell notification */}
          <div className="flex items-center gap-2">
            {/* Notifications Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-2xl bg-[#F8F1E8] text-[#283D38] hover:bg-[#F0E4D7] transition-colors"
              title="Уведомления"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-2xl bg-[#F8F1E8] text-[#283D38] hover:bg-[#F0E4D7] transition-colors"
              title="Меню разделов"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-[85%] max-w-sm bg-[#FFFDF9] h-full shadow-2xl flex flex-col p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2">
                <Image src="/logo-icon.svg" alt="" width={28} height={28} />
                <span className="font-bold text-[#283D38] text-base">Родные люди</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Card in Drawer */}
            <div className="py-3.5 border-b border-[#F0E4D7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#34785D] shrink-0">
                  <img
                    src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
                    alt="Профиль"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#283D38]">
                    {user ? user.full_name : 'Гость платформы'}
                  </h3>
                  <span className="text-[11px] text-[#6B7C77]">
                    {user ? user.region || 'г. Минск' : 'Авторизуйтесь для сохранения'}
                  </span>
                </div>
              </div>
              <ModeToggle />
            </div>

            {/* Navigation Sections */}
            <div className="py-4 space-y-1.5 flex-1">
              <span className="text-[10px] font-bold text-[#6B7C77] uppercase tracking-wider block px-2 mb-1">
                Разделы экосистемы
              </span>
              {menuSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F1E8] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                        style={{ backgroundColor: `${sec.color}15`, color: sec.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[#283D38] block group-hover:text-[#34785D]">
                          {sec.label}
                        </span>
                        <span className="text-[10px] text-[#6B7C77]">
                          {sec.desc}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5B5A3] group-hover:text-[#34785D]" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#F0E4D7] space-y-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#34785D] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Установить приложение</span>
              </button>

              {user ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 px-3 rounded-2xl bg-[#F8F1E8] text-[#8C9C96] hover:text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Выйти из профиля</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2 px-3 rounded-2xl bg-[#34785D] text-white text-xs font-bold text-center block shadow-xs"
                >
                  Войти в личный кабинет
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
  HeartHandshake
} from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function DesktopNavbar() {
  const pathname = usePathname();
  const { user, unreadNotificationsCount, notifications, markNotificationAsRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('г. Минск');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Льготы и субсидии', href: '/benefits' },
    { label: 'Здоровье', href: '/health' },
    { label: 'Психология', href: '/psychology' },
    { label: 'Инфраструктура', href: '/infrastructure' },
    { label: 'Помощник', href: '/assistant', icon: Bot, isHighlight: true },
    { label: 'О проекте', href: '/about' },
  ];

  const regions = [
    'г. Минск',
    'Минская область',
    'Брестская область',
    'Гродненская область',
    'Витебская область',
    'Гомельская область',
    'Могилевская область'
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E4D7] shadow-xs">
      {/* Top micro-bar: State context & Device switcher */}
      <div className="bg-[#F8F1E8] border-b border-[#EFE5D9] px-6 py-1.5 text-xs text-[#6B7C77]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium text-[#283D38]">
              <Image 
                src="/images/belarus-flag-pin.svg" 
                alt="Флаг Республики Беларусь" 
                width={18} 
                height={12} 
                className="rounded-xs shadow-xs"
              />
              <span>Республика Беларусь</span>
            </div>
            <span className="text-[#C5B5A3]">•</span>
            <span className="hidden md:inline">Конкурс молодежных инициатив «100 идей для Беларуси — 2027»</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Region selector */}
            <div className="relative">
              <button 
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="flex items-center gap-1 font-medium text-[#34785D] hover:text-[#245B49] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedRegion}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showRegionDropdown && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-[#F0E4D7] py-1 z-50">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => {
                        setSelectedRegion(reg);
                        setShowRegionDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F8F1E8] transition-colors ${
                        selectedRegion === reg ? 'font-semibold text-[#34785D]' : 'text-[#283D38]'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mode switch */}
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Main portal navigation bar */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Logo & Slogan */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 transition-transform group-hover:scale-105">
            <Image 
              src="/logo-icon.svg" 
              alt="Родныя" 
              width={44} 
              height={44} 
              priority 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#283D38] font-sans">Родныя</span>
              <span className="hidden xl:inline text-xs bg-[#E5EFE3] text-[#34785D] px-2 py-0.5 rounded-full font-semibold">
                Господдержка
              </span>
            </div>
            <span className="font-handwritten text-sm text-[#6B7C77] -mt-0.5">
              Забота. Поддержка. Будущее.
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#34785D] text-white shadow-xs font-semibold'
                    : link.isHighlight
                    ? 'bg-[#E5EFF8] text-[#235882] hover:bg-[#D5E5F5]'
                    : 'text-[#283D38] hover:bg-[#F8F1E8] hover:text-[#34785D]'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.label}</span>
                {link.isHighlight && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Search button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="p-2.5 rounded-xl text-[#6B7C77] hover:text-[#283D38] hover:bg-[#F8F1E8] transition-colors relative"
            title="Поиск по экосистеме"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications button & popup */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl text-[#6B7C77] hover:text-[#283D38] hover:bg-[#F8F1E8] transition-colors relative"
              title="Центр уведомлений"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-[#E58A7D] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs animate-bounce">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#F0E4D7] p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#34785D]" />
                    <span className="font-bold text-sm text-[#283D38]">Уведомления</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-xs bg-[#E58A7D] text-white px-2 py-0.5 rounded-full font-semibold">
                        +{unreadNotificationsCount}
                      </span>
                    )}
                  </div>
                  <Link 
                    href="/notifications" 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#34785D] font-medium hover:underline"
                  >
                    Все уведомления →
                  </Link>
                </div>

                <div className="divide-y divide-[#F8F1E8] max-h-72 overflow-y-auto mt-2">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`py-2.5 px-2 rounded-xl transition-colors cursor-pointer ${
                        !n.is_read ? 'bg-[#FDF9F5]' : 'hover:bg-[#F8F1E8]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-xs font-semibold ${!n.is_read ? 'text-[#34785D]' : 'text-[#283D38]'}`}>
                          {n.title}
                        </span>
                        {!n.is_read && <span className="w-2 h-2 rounded-full bg-[#E58A7D] shrink-0 mt-1" />}
                      </div>
                      <p className="text-[11px] text-[#6B7C77] line-clamp-2 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Cabinet Button */}
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-[#F8F1E8] hover:bg-[#F0E4D7] border border-[#E9DACB] transition-all group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#34785D]/10 shrink-0 border border-[#34785D]/20">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-[#34785D] m-2" />
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#283D38] group-hover:text-[#34785D] transition-colors leading-tight">
                  {user.full_name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-[#6B7C77]">
                  {user.role === 'admin' ? 'Администратор' : 'Личный кабинет'}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-[#34785D] text-white text-sm font-semibold hover:bg-[#245B49] transition-all shadow-xs flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Войти</span>
            </Link>
          )}
        </div>
      </div>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4 z-50">
          <div className="bg-[#FFFDF9] rounded-2xl w-full max-w-xl p-5 shadow-2xl border border-[#F0E4D7]">
            <div className="flex items-center gap-3 border-b border-[#F0E4D7] pb-3">
              <Search className="w-5 h-5 text-[#34785D]" />
              <input
                type="text"
                autoFocus
                placeholder="Поиск пособий, законов, детсадов, врачей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base bg-transparent outline-hidden text-[#283D38] placeholder-[#9EACA6]"
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-xs bg-[#F0E4D7] hover:bg-[#E5D7C7] px-2 py-1 rounded-md text-[#6B7C77]"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm text-[#283D38]">
              <span className="text-xs font-semibold text-[#6B7C77] uppercase tracking-wider">
                Быстрые переходы:
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  href="/benefits"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-xl bg-[#FDF0EC] hover:bg-[#F9E2DB] text-[#283D38] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  👶 <span>Калькулятор детских пособий</span>
                </Link>
                <Link
                  href="/psychology"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-xl bg-[#EAF4ED] hover:bg-[#DFEDE2] text-[#283D38] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  🛡️ <span>Экстренный SOS & Психолог</span>
                </Link>
                <Link
                  href="/health"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-xl bg-[#EBF3FB] hover:bg-[#DFEDFA] text-[#283D38] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  🩺 <span>Календарь беременности</span>
                </Link>
                <Link
                  href="/infrastructure"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-xl bg-[#F2EFF9] hover:bg-[#E8E1F5] text-[#283D38] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  📍 <span>Карта детских садов Минска</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

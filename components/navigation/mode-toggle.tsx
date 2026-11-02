'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { Monitor, Smartphone, SlidersHorizontal, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function ModeToggle() {
  const { viewMode, setViewMode, user, switchUserRole } = useApp();

  return (
    <div className="flex items-center gap-2 bg-[#F0E4D7]/80 backdrop-blur-sm p-1 rounded-full border border-[#DFD1C2] text-xs">
      <div className="flex items-center rounded-full bg-[#FFFDF9] p-0.5 shadow-sm">
        <button
          onClick={() => setViewMode('auto')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all ${
            viewMode === 'auto'
              ? 'bg-[#34785D] text-white shadow-xs'
              : 'text-[#6B7C77] hover:text-[#283D38]'
          }`}
          title="Автоматический адаптивный режим"
        >
          Авто
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            viewMode === 'desktop'
              ? 'bg-[#34785D] text-white shadow-xs'
              : 'text-[#6B7C77] hover:text-[#283D38]'
          }`}
          title="Принудительный режим веб-портала (ПК)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Портал</span>
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            viewMode === 'mobile'
              ? 'bg-[#34785D] text-white shadow-xs'
              : 'text-[#6B7C77] hover:text-[#283D38]'
          }`}
          title="Принудительный режим мобильного приложения (PWA)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PWA Мобильный</span>
        </button>
      </div>

      {/* Role Switcher for Demo / Contest Jury */}
      <div className="hidden xl:flex items-center gap-1 pl-1 pr-2 text-[11px] text-[#6B7C77]">
        <span className="opacity-75">Демо-роль:</span>
        <button
          onClick={() => switchUserRole(user?.role === 'admin' ? 'user' : 'admin')}
          className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
            user?.role === 'admin'
              ? 'bg-[#245B49] text-white'
              : 'bg-white/60 hover:bg-white text-[#283D38]'
          }`}
        >
          {user?.role === 'admin' ? 'Админ (Минтруд)' : 'Мама (Анна)'}
        </button>
        {user?.role === 'admin' && (
          <Link
            href="/admin"
            className="flex items-center gap-1 px-2 py-0.5 bg-[#E58A7D] text-white rounded-md font-semibold hover:bg-[#D56E5F]"
          >
            <ShieldAlert className="w-3 h-3" />
            В панель
          </Link>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, HeartHandshake, ShieldAlert } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { ModeToggle } from './mode-toggle';

export function MobileHeader() {
  const { unreadNotificationsCount, user } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E4D7] px-4 py-2.5">
      {/* Micro system status simulation */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#283D38] px-1 pb-1.5 opacity-80">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0">
            <Image 
              src="/logo-icon.svg" 
              alt="Родныя" 
              width={32} 
              height={32} 
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#283D38] tracking-tight leading-none">Родныя</h1>
            <p className="font-handwritten text-[11px] text-[#6B7C77] leading-tight">Забота. Поддержка.</p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Quick SOS button */}
          <Link
            href="/psychology"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF0EC] text-[#D96B5D] border border-[#F6D2C9] text-xs font-bold shadow-xs active:scale-95 transition-transform"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-full bg-[#F8F1E8] text-[#283D38] hover:bg-[#F0E4D7] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

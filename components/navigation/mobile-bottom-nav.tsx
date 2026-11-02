'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, MessageSquare, Users, User } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { conversations } = useApp();

  const totalUnreadMessages = conversations.reduce((acc, curr) => acc + curr.unread_count, 0);

  const navItems = [
    { label: 'Главная', href: '/', icon: Home },
    { label: 'Сервисы', href: '/benefits', icon: LayoutGrid },
    { label: 'Чаты', href: '/chats', icon: MessageSquare, badge: totalUnreadMessages },
    { label: 'Семья', href: '/family', icon: Users },
    { label: 'Профиль', href: '/dashboard', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#F0E4D7] px-2 py-1.5 safe-bottom shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative active:scale-90 ${
                isActive
                  ? 'text-[#34785D] font-bold'
                  : 'text-[#8C9C96] hover:text-[#283D38]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#34785D]' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#34785D] absolute -bottom-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  Calculator, 
  MessageSquare, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { NotificationItem } from '@/types';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, unreadNotificationsCount } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifs = notifications.filter(n => filterType === 'all' || n.type === filterType);

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'benefit': return <Calculator className="w-5 h-5 text-[#E58A7D]" />;
      case 'medical': return <Calendar className="w-5 h-5 text-[#34785D]" />;
      case 'chat': return <MessageSquare className="w-5 h-5 text-[#2F6D9E]" />;
      default: return <Info className="w-5 h-5 text-[#7A5BA3]" />;
    }
  };

  return (
    <div className="space-y-6 pt-4 pb-12 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#283D38]">Центр уведомлений</h1>
            {unreadNotificationsCount > 0 && (
              <span className="text-xs bg-[#E58A7D] text-white px-2.5 py-0.5 rounded-full font-bold">
                {unreadNotificationsCount} новых
              </span>
            )}
          </div>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Статусы начисления пособий, записи к врачам и ответы специалистов
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2 rounded-xl bg-[#E5EFE3] hover:bg-[#D5E5D2] text-[#34785D] text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Прочитать все</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'all', label: 'Все' },
          { id: 'benefit', label: 'Пособия' },
          { id: 'medical', label: 'Здоровье' },
          { id: 'chat', label: 'Сообщения' },
          { id: 'news', label: 'Новости' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
              filterType === f.id
                ? 'bg-[#34785D] text-white shadow-xs'
                : 'bg-[#FFFDF9] border border-[#F0E4D7] text-[#6B7C77] hover:bg-[#F8F1E8]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
              !n.is_read
                ? 'bg-[#FFFDF9] border-[#34785D] shadow-sm'
                : 'bg-[#F8F1E8] border-[#E9DACB] opacity-80'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-[#E9DACB] shadow-xs">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-sm font-bold ${!n.is_read ? 'text-[#34785D]' : 'text-[#283D38]'}`}>
                  {n.title}
                </h3>
                <span className="text-[10px] text-[#8C9C96] shrink-0">
                  {new Date(n.created_at).toLocaleDateString('ru-RU')}
                </span>
              </div>

              <p className="text-xs text-[#556862] leading-relaxed">
                {n.message}
              </p>

              {n.action_url && (
                <div className="pt-1">
                  <Link
                    href={n.action_url}
                    className="text-xs font-bold text-[#34785D] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Перейти к разделу</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

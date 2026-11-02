'use client';

import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Users, 
  Baby, 
  Calendar, 
  FileText, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Heart, 
  Calculator,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { MOCK_ARTICLES } from '@/lib/supabase/mock-data';

export default function DashboardPage() {
  const { 
    isMobileLayout, 
    user, 
    childrenList, 
    documents, 
    events, 
    notifications, 
    completedChecklistItems,
    favorites,
    institutions 
  } = useApp();

  const favoriteInstitutions = institutions.filter(inst => favorites.includes(inst.id));

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Profile Header Hero */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-2 border-[#34785D] shadow-sm shrink-0">
              <img
                src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
                alt={user?.full_name || 'Профиль'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#283D38]">
                  {user?.full_name || 'Анна Иванова'}
                </h1>
                <span className="text-xs bg-[#E5EFE3] text-[#34785D] font-bold px-2.5 py-0.5 rounded-full">
                  {user?.role === 'admin' ? 'Администратор' : 'Семья с детьми'}
                </span>
              </div>
              <p className="text-xs text-[#6B7C77]">
                {user?.email} • {user?.region}
              </p>
              <div className="pt-1 flex items-center gap-3 text-xs text-[#556862]">
                <span>Детей: <b>{childrenList.length}</b></span>
                <span>•</span>
                <span>Документов: <b>{documents.length}</b></span>
                <span>•</span>
                <span>Событий: <b>{events.filter(e => !e.is_completed).length}</b></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/family"
              className="px-4 py-2 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-xs font-semibold text-[#283D38] transition-colors"
            >
              Управление семьёй
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-colors"
              >
                Панель управления
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Main Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Widgets & Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Children Cards */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
                <Baby className="w-5 h-5 text-[#34785D]" />
                <span>Мои дети</span>
              </h2>
              <Link href="/family" className="text-xs font-semibold text-[#34785D] hover:underline">
                Семейный профиль →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {childrenList.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white shrink-0">
                    <img src={ch.photo_url || "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=200&q=80"} alt={ch.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38]">{ch.name}</h3>
                    <span className="text-[11px] text-[#6B7C77] block">Д/Р: {new Date(ch.birth_date).toLocaleDateString('ru-RU')}</span>
                    {ch.notes && <span className="text-[10px] text-[#556862] line-clamp-1 italic">{ch.notes}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Family Events */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#34785D]" />
                <span>Ближайшие события</span>
              </h2>
              <Link href="/family" className="text-xs font-semibold text-[#34785D] hover:underline">
                Весь календарь →
              </Link>
            </div>

            <div className="space-y-2.5">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="p-3.5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#283D38] block">{ev.title}</span>
                    <span className="text-[11px] text-[#6B7C77]">{ev.child_name && `${ev.child_name} • `}{ev.location}</span>
                  </div>
                  <span className="font-bold text-[#34785D] bg-white px-2.5 py-1 rounded-full border border-[#E9DACB] shrink-0">
                    {new Date(ev.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklists Progress */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-3">
            <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#34785D]" />
              <span>Прогресс чек-листа «Декрет без бюрократии»</span>
            </h2>
            <div className="p-4 rounded-2xl bg-[#E5EFE3] text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#34785D]">
                <span>Выполнено {completedChecklistItems.length} шагов</span>
                <Link href="/benefits" className="hover:underline">Продолжить оформление →</Link>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                <div 
                  className="h-full bg-[#34785D] rounded-full"
                  style={{ width: `${Math.min(100, completedChecklistItems.length * 20)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Documents, Notifications, Favorites (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Documents Safe */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#34785D]" />
                <span>Цифровая папка</span>
              </h2>
              <Link href="/documents" className="text-xs font-semibold text-[#34785D] hover:underline">
                Все ({documents.length}) →
              </Link>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="p-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center justify-between text-xs">
                  <span className="font-medium text-[#283D38] line-clamp-1">{doc.title}</span>
                  <span className="text-[10px] font-bold text-[#34785D] bg-[#E5EFE3] px-2 py-0.5 rounded-full shrink-0">
                    {doc.status === 'active' ? 'Проверено' : 'В обработке'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Institutions */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#E58A7D]" />
                <span>Избранные сады и поликлиники</span>
              </h2>
              <Link href="/infrastructure" className="text-xs font-semibold text-[#34785D] hover:underline">
                На карту →
              </Link>
            </div>

            <div className="space-y-2">
              {favoriteInstitutions.length > 0 ? (
                favoriteInstitutions.map((inst) => (
                  <div key={inst.id} className="p-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs">
                    <span className="font-bold text-[#283D38] block">{inst.name}</span>
                    <span className="text-[11px] text-[#6B7C77]">{inst.address}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#6B7C77] p-2">Пока нет сохранённых учреждений.</p>
              )}
            </div>
          </div>

          {/* Quick Assistant Callout */}
          <Link
            href="/assistant"
            className="p-5 rounded-3xl bg-gradient-to-br from-[#34785D] to-[#245B49] text-white shadow-card flex items-center justify-between group block"
          >
            <div>
              <span className="text-xs font-semibold text-[#DCE7E3] block">Есть вопрос по законам или выплатам?</span>
              <h3 className="font-bold text-base mt-0.5">Спросить у Умного помощника</h3>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
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
  ArrowRight, 
  LogOut, 
  LogIn, 
  Edit3, 
  Plus, 
  Download, 
  Smartphone, 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { MOCK_ARTICLES } from '@/lib/supabase/mock-data';

const BELARUS_REGIONS = [
  'г. Минск',
  'Брестская область',
  'Витебская область',
  'Гомельская область',
  'Гродненская область',
  'Минская область',
  'Могилёвская область'
];

export default function DashboardPage() {
  const { 
    isMobileLayout, 
    user, 
    isDemoUser, 
    logout, 
    switchUserRole, 
    updateUserProfile, 
    childrenList, 
    addChild, 
    documents, 
    events, 
    notifications, 
    completedChecklistItems, 
    favorites, 
    institutions, 
    setIsDownloadModalOpen 
  } = useApp();

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  // Profile edit form state
  const [editName, setEditName] = useState(user?.full_name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editRegion, setEditRegion] = useState(user?.region || 'г. Минск');

  // Quick child form state
  const [newChildName, setNewChildName] = useState('');
  const [newChildBirthDate, setNewChildBirthDate] = useState('');
  const [newChildGender, setNewChildGender] = useState<'male' | 'female'>('female');
  const [newChildNotes, setNewChildNotes] = useState('');

  const favoriteInstitutions = institutions.filter(inst => favorites.includes(inst.id));

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      full_name: editName.trim(),
      phone: editPhone.trim(),
      region: editRegion
    });
    setShowEditProfileModal(false);
  };

  const handleAddChildSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName || !newChildBirthDate) return;
    await addChild({
      name: newChildName.trim(),
      birth_date: newChildBirthDate,
      gender: newChildGender,
      notes: newChildNotes.trim() || undefined
    });
    setShowAddChildModal(false);
    setNewChildName('');
    setNewChildBirthDate('');
    setNewChildNotes('');
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="bg-[#FFFDF9] rounded-4xl p-8 sm:p-12 border border-[#F0E4D7] shadow-card max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F8F1E8] text-[#34785D] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#283D38]">Вы вышли из аккаунта</h1>
            <p className="text-xs text-[#6B7C77] leading-relaxed">
              Вы вышли из сессии. Войдите со своей учётной записью или зарегистрируйтесь, чтобы получить персональный доступ к сервисам поддержки семьи.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Войти в аккаунт</span>
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#283D38] border border-[#E9DACB] text-xs font-bold hover:bg-[#F8F1E8] transition-all flex items-center justify-center gap-2"
            >
              <span>Регистрация нового пользователя</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Profile Header Hero */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-2 border-[#34785D] shadow-sm shrink-0 bg-[#E5EFE3] flex items-center justify-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-[#34785D]" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#283D38]">
                  {user.full_name}
                </h1>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : user.role === 'doctor'
                    ? 'bg-emerald-100 text-emerald-800'
                    : user.role === 'kindergarten_admin'
                    ? 'bg-orange-100 text-orange-800'
                    : user.role === 'hobby_admin'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-[#E5EFE3] text-[#34785D]'
                }`}>
                  {user.role === 'admin' && '🛡️ Главный администратор портала'}
                  {user.role === 'doctor' && '👨‍⚕️ Врач-педиатр'}
                  {user.role === 'kindergarten_admin' && '🏛️ Администратор детского сада'}
                  {user.role === 'hobby_admin' && '🎨 Администратор кружков и секций'}
                  {user.role === 'specialist' && '💼 Специалист'}
                  {(!user.role || user.role === 'user') && '👨‍👩‍👧 Семейный профиль'}
                </span>
              </div>
              <p className="text-xs text-[#6B7C77]">
                {user.email} • {user.region} {user.phone ? `• ${user.phone}` : ''}
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setEditName(user.full_name);
                setEditPhone(user.phone || '');
                setEditRegion(user.region);
                setShowEditProfileModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-xs font-semibold text-[#283D38] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#34785D]" />
              <span>Редактировать</span>
            </button>

            <Link
              href="/family"
              className="px-4 py-2 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-xs font-semibold text-[#283D38] transition-colors"
            >
              Семья и дети
            </Link>

            {user.role === 'doctor' && (
              <Link
                href="/doctor"
                className="px-4 py-2 rounded-xl bg-[#1F6E54] text-white text-xs font-bold hover:bg-[#185742] transition-colors shadow-2xs"
              >
                Кабинет врача →
              </Link>
            )}

            {user.role === 'kindergarten_admin' && (
              <Link
                href="/kindergarten-admin"
                className="px-4 py-2 rounded-xl bg-[#D44A3A] text-white text-xs font-bold hover:bg-[#b8382a] transition-colors shadow-2xs"
              >
                Панель детсада →
              </Link>
            )}

            {user.role === 'hobby_admin' && (
              <Link
                href="/hobby-admin"
                className="px-4 py-2 rounded-xl bg-[#2A67B1] text-white text-xs font-bold hover:bg-[#1e5291] transition-colors shadow-2xs"
              >
                Панель кружков →
              </Link>
            )}

            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-colors shadow-2xs"
              >
                Панель администратора
              </Link>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Выйти из этого аккаунта"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Dedicated Banner */}
      {user.role === 'doctor' && (
        <div className="bg-[#EAF4ED] border border-[#CDE0C7] rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-sm text-[#1F6E54] block">👨‍⚕️ Рабочее место врача активировано</span>
            <span className="text-[#556862]">Вам доступны онлайн-чаты с пациентами, электронные медицинские карты и подтверждение приёмов.</span>
          </div>
          <Link
            href="/doctor"
            className="px-5 py-2.5 rounded-2xl bg-[#1F6E54] hover:bg-[#185742] text-white font-bold text-xs shrink-0 text-center shadow-xs"
          >
            Перейти в кабинет врача
          </Link>
        </div>
      )}

      {user.role === 'kindergarten_admin' && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-sm text-[#D44A3A] block">🏛️ Рабочее место администратора детского сада</span>
            <span className="text-[#556862]">Вам доступны электронные заявления родителей из службы «Одно окно», распределение свободных мест и связь с заявителями.</span>
          </div>
          <Link
            href="/kindergarten-admin"
            className="px-5 py-2.5 rounded-2xl bg-[#D44A3A] hover:bg-[#b8382a] text-white font-bold text-xs shrink-0 text-center shadow-xs"
          >
            Перейти в панель детсада
          </Link>
        </div>
      )}

      {user.role === 'hobby_admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-sm text-[#2A67B1] block">🎨 Рабочее место руководителя кружков и секций</span>
            <span className="text-[#556862]">Вам доступен список записавшихся детей, управление набором в группы и чаты с родителями.</span>
          </div>
          <Link
            href="/hobby-admin"
            className="px-5 py-2.5 rounded-2xl bg-[#2A67B1] hover:bg-[#1e5291] text-white font-bold text-xs shrink-0 text-center shadow-xs"
          >
            Перейти в панель кружков
          </Link>
        </div>
      )}

      {/* Mobile App Download Promo Banner */}
      <div className="bg-linear-to-r from-[#245B49] to-[#34785D] rounded-3xl p-6 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/20 text-white uppercase font-bold px-2 py-0.5 rounded-full">
              Мобильное приложение
            </span>
            <span className="text-xs text-white/80 font-medium">Android APK + iOS PWA</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">Установите «Родныя» на свой смартфон</h3>
          <p className="text-xs text-white/80 max-w-xl">
            Скачайте готовый установочный файл приложения или добавьте портал на главный экран телефона для мгновенного доступа в декрете.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#245B49] hover:bg-[#F8F1E8] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#34785D]" />
            <span>Скачать приложение</span>
          </button>
          <Link
            href="/download"
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          >
            Подробнее →
          </Link>
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddChildModal(true)}
                  className="text-xs font-bold text-[#34785D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить</span>
                </button>
                <Link href="/family" className="text-xs font-semibold text-[#6B7C77] hover:underline">
                  Все →
                </Link>
              </div>
            </div>

            {childrenList.length === 0 ? (
              <div className="text-center p-6 bg-[#F8F1E8] rounded-2xl border border-dashed border-[#DFD1C2] space-y-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-[#34785D] shadow-2xs">
                  <Baby className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#283D38]">Дети ещё не внесены</h3>
                  <p className="text-xs text-[#6B7C77] mt-1 max-w-sm mx-auto">
                    Добавьте ребёнка, чтобы система автоматически рассчитала положенные пособия по Закону № 7-З и сформировала календарь прививок.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddChildModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Внести первого ребёнка</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {childrenList.map((ch) => (
                  <div key={ch.id} className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white shrink-0 bg-[#E5EFE3] flex items-center justify-center">
                      {ch.photo_url ? (
                        <img src={ch.photo_url} alt={ch.name} className="w-full h-full object-cover" />
                      ) : (
                        <Baby className="w-6 h-6 text-[#34785D]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#283D38]">{ch.name}</h3>
                      <span className="text-[11px] text-[#6B7C77] block">Д/Р: {new Date(ch.birth_date).toLocaleDateString('ru-RU')}</span>
                      {ch.notes && <span className="text-[10px] text-[#556862] line-clamp-1 italic">{ch.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
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

            {events.length === 0 ? (
              <div className="text-center p-5 bg-[#F8F1E8] rounded-2xl border border-dashed border-[#DFD1C2] space-y-2">
                <p className="text-xs text-[#6B7C77]">Нет запланированных визитов к врачу или событий.</p>
                <Link href="/family" className="inline-block text-xs font-bold text-[#34785D] hover:underline">
                  + Запланировать событие в семейном календаре
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {events.slice(0, 3).map((ev) => (
                  <div key={ev.id} className="p-3.5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#283D38] block">{ev.title}</span>
                      <span className="text-[11px] text-[#6B7C77]">{ev.child_name && `${ev.child_name} • `}{ev.location || 'Медицинский центр'}</span>
                    </div>
                    <span className="font-bold text-[#34785D] bg-white px-2.5 py-1 rounded-full border border-[#E9DACB] shrink-0">
                      {new Date(ev.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
                  className="h-full bg-[#34785D] rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(15, completedChecklistItems.length * 20))}%` }}
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

            {documents.length === 0 ? (
              <div className="text-center p-5 bg-[#F8F1E8] rounded-2xl border border-dashed border-[#DFD1C2] space-y-2">
                <p className="text-xs text-[#6B7C77]">Ваша цифровая папка пуста.</p>
                <Link href="/documents" className="inline-block text-xs font-bold text-[#34785D] hover:underline">
                  + Добавить первый документ
                </Link>
              </div>
            ) : (
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
            )}
          </div>

          {/* Quick Notifications */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h2 className="font-bold text-base text-[#283D38] flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#34785D]" />
                <span>Уведомления</span>
              </h2>
              <Link href="/notifications" className="text-xs font-semibold text-[#34785D] hover:underline">
                Все →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {notifications.slice(0, 2).map((n) => (
                <div key={n.id} className="p-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] space-y-1">
                  <span className="font-bold text-[#283D38] block">{n.title}</span>
                  <p className="text-[11px] text-[#6B7C77] line-clamp-2">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: EDIT PROFILE */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h3 className="font-extrabold text-base text-[#283D38]">Редактирование профиля</h3>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="p-1 rounded-full text-[#6B7C77] hover:bg-[#F8F1E8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#283D38] block">Полное имя (ФИО)</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#283D38] block">Контактный телефон</label>
                <input
                  type="tel"
                  placeholder="+375 (29) 123-45-67"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#283D38] block">Регион проживания</label>
                <select
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                >
                  {BELARUS_REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F8F1E8] text-[#283D38] font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QUICK ADD CHILD */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h3 className="font-extrabold text-base text-[#283D38] flex items-center gap-2">
                <Baby className="w-5 h-5 text-[#34785D]" />
                <span>Добавление ребёнка</span>
              </h3>
              <button
                onClick={() => setShowAddChildModal(false)}
                className="p-1 rounded-full text-[#6B7C77] hover:bg-[#F8F1E8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChildSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#283D38] block">Имя ребёнка</label>
                <input
                  type="text"
                  required
                  placeholder="Михаил"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#283D38] block">Дата рождения</label>
                  <input
                    type="date"
                    required
                    value={newChildBirthDate}
                    onChange={(e) => setNewChildBirthDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#283D38] block">Пол</label>
                  <select
                    value={newChildGender}
                    onChange={(e) => setNewChildGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                  >
                    <option value="female">Девочка</option>
                    <option value="male">Мальчик</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#283D38] block">Особые отметки / заметки (необязательно)</label>
                <textarea
                  rows={2}
                  placeholder="Аллергия на цитрусовые, группа в детсаду № 14..."
                  value={newChildNotes}
                  onChange={(e) => setNewChildNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38]"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddChildModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F8F1E8] text-[#283D38] font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

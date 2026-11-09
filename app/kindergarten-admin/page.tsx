'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Phone, 
  Plus, 
  Search, 
  MessageSquare,
  Baby,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/layout/footer';

interface KindergartenApplication {
  id: string;
  appNumber: string;
  childName: string;
  birthDate: string;
  parentName: string;
  phone: string;
  groupType: 'nursery' | 'junior' | 'middle';
  submissionDate: string;
  status: 'pending' | 'approved' | 'docs_requested' | 'rejected';
  hasPoolPriority: boolean;
  notes?: string;
}

export default function KindergartenAdminPage() {
  const { user } = useApp();

  // Free spots state
  const [spotsNursery, setSpotsNursery] = useState<number>(2);
  const [spotsGarden, setSpotsGarden] = useState<number>(3);
  const [saveSpotsSuccess, setSaveSpotsSuccess] = useState<boolean>(false);

  // Applications list state
  const [applications, setApplications] = useState<KindergartenApplication[]>([
    {
      id: 'app-01',
      appNumber: '20024-5M0228',
      childName: 'Иванова Анна Дмитриевна',
      birthDate: '12.04.2023',
      parentName: 'Иванова Анна Сергеевна',
      phone: '+375 (29) 678-43-21',
      groupType: 'nursery',
      submissionDate: '25.08.2024',
      status: 'pending',
      hasPoolPriority: true,
      notes: 'Пакет документов подтверждён через службу «Одно окно» Партизанского района г. Минска.'
    },
    {
      id: 'app-02',
      appNumber: '20024-5M0312',
      childName: 'Смирнов Артём Павлович',
      birthDate: '18.06.2022',
      parentName: 'Смирнова Елена Викторовна',
      phone: '+375 (29) 334-12-89',
      groupType: 'junior',
      submissionDate: '01.09.2024',
      status: 'approved',
      hasPoolPriority: true,
      notes: 'Выделено место в 1-й младшей группе. Зачисление на 01.09.2025.'
    },
    {
      id: 'app-03',
      appNumber: '20024-5M0419',
      childName: 'Кузнецова Мария Андреевна',
      birthDate: '05.11.2023',
      parentName: 'Кузнецов Андрей Игоревич',
      phone: '+375 (33) 980-55-43',
      groupType: 'nursery',
      submissionDate: '15.10.2024',
      status: 'docs_requested',
      hasPoolPriority: false,
      notes: 'Ожидается медицинская справка формы 1 здр/у-10 из поликлиники.'
    }
  ]);

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleUpdateStatus = (appId: string, newStatus: KindergartenApplication['status']) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const handleSaveSpots = () => {
    setSaveSpotsSuccess(true);
    setTimeout(() => setSaveSpotsSuccess(false), 2500);
  };

  const filteredApps = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = !searchFilter.trim() || (
      app.childName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.appNumber.toLowerCase().includes(searchFilter.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF4EC] text-[#283D38] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-6">
          {/* Kindergarten Admin Top Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE2D5] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D44A3A] text-white flex items-center justify-center shadow-xs shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#D44A3A] text-[11px] font-bold">
                    Панель заведующего дошкольным учреждением
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700">Служба «Одно окно» онлайн</span>
                </div>
                <h1 className="text-2xl font-black text-[#1E3029] mt-1">
                  Детский ясли-сад № 162 г. Минска
                </h1>
                <p className="text-xs text-[#556862]">
                  ул. Передовая, 14 • Партизанский район • Администратор: {user?.full_name || 'Ковалёва Т.В.'}
                </p>
              </div>
            </div>

            {/* Quick Spots Controller */}
            <div className="bg-[#FAF4EC] p-4 rounded-2xl border border-[#EDE2D5] flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-[#6B7C77] uppercase font-bold block">Свободно в яслях:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      onClick={() => setSpotsNursery(Math.max(0, spotsNursery - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EDE2D5] font-bold text-xs"
                    >
                      −
                    </button>
                    <span className="text-lg font-black text-[#1E3029] w-6 text-center">{spotsNursery}</span>
                    <button 
                      onClick={() => setSpotsNursery(spotsNursery + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EDE2D5] font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="h-8 w-px bg-[#E0D4C8]" />

                <div>
                  <span className="text-[10px] text-[#6B7C77] uppercase font-bold block">Свободно в саду:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      onClick={() => setSpotsGarden(Math.max(0, spotsGarden - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EDE2D5] font-bold text-xs"
                    >
                      −
                    </button>
                    <span className="text-lg font-black text-[#1E3029] w-6 text-center">{spotsGarden}</span>
                    <button 
                      onClick={() => setSpotsGarden(spotsGarden + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EDE2D5] font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveSpots}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#208253] hover:bg-[#186842] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {saveSpotsSuccess ? '✓ Обновлено на карте' : 'Сохранить на карте'}
              </button>
            </div>
          </div>

          {/* Applications Management Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE2D5] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE2D5]">
              <div>
                <h3 className="font-bold text-base text-[#1E3029]">
                  Электронные заявления родителей на зачисление (Служба «Одно окно»)
                </h3>
                <p className="text-xs text-[#556862]">
                  Обработка обращений родителей и распределение мест в возрастных группах
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
                {[
                  { id: 'all', label: 'Все заявки' },
                  { id: 'pending', label: 'На рассмотрении' },
                  { id: 'approved', label: 'Одобренные' },
                  { id: 'docs_requested', label: 'Запрос документов' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-[#D44A3A] text-white shadow-xs font-bold'
                        : 'bg-[#F5EEE6] text-[#556862] hover:bg-[#EAE0D5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div 
                  key={app.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FBF7F0] border border-[#EDE2D5] space-y-3 transition-all hover:border-[#D5C6B7]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE5DB] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1E3029]">{app.childName}</span>
                      <span className="text-[11px] text-[#6B7C77]">({app.birthDate} г.р.)</span>
                      {app.hasPoolPriority && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5EFE3] text-[#208253]">
                          ✓ Бассейн
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#6B7C77]">Заявление № <b>{app.appNumber}</b></span>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        app.status === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : app.status === 'docs_requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status === 'approved' && '✓ Место выделено'}
                        {app.status === 'pending' && '⏳ На рассмотрении'}
                        {app.status === 'docs_requested' && '⚠️ Запрошены справки'}
                        {app.status === 'rejected' && 'Отклонено'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#556862]">
                    <div>
                      <span className="text-[10px] text-[#8C9C96] block uppercase font-bold">Родитель:</span>
                      <span className="font-semibold text-[#1E3029]">{app.parentName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C9C96] block uppercase font-bold">Телефон:</span>
                      <a href={`tel:${app.phone}`} className="font-semibold text-[#1F6E54] hover:underline">
                        {app.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C9C96] block uppercase font-bold">Группа:</span>
                      <span className="font-semibold text-[#1E3029]">
                        {app.groupType === 'nursery' ? 'Ясельная (1.5-3 года)' : 'Младшая (3-4 года)'}
                      </span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="p-2.5 rounded-xl bg-white border border-[#EDE2D5] text-xs text-[#556862]">
                      <b>Служебная отметка:</b> {app.notes}
                    </div>
                  )}

                  {/* Actions for Kindergarten Admin */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EFE5DB]">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/chats?parentPhone=${encodeURIComponent(app.phone)}&parentName=${encodeURIComponent(app.parentName)}`}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF4EC] border border-[#EDE2D5] text-xs font-semibold text-[#1E3029] flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#34785D]" />
                        <span>Написать родителю</span>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'docs_requested')}
                        className="px-3 py-1.5 rounded-xl bg-[#FAF4EC] hover:bg-[#EDE4D8] text-xs font-semibold text-[#7A5B3E] transition-colors cursor-pointer"
                      >
                        Запросить справку
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition-colors cursor-pointer"
                      >
                        Отклонить
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'approved')}
                        className="px-4 py-1.5 rounded-xl bg-[#208253] hover:bg-[#186842] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Выделить место</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

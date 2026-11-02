'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Plus, 
  Eye, 
  AlertCircle,
  Building,
  TrendingUp,
  Settings,
  Activity,
  History
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  CartesianGrid 
} from 'recharts';
import { useApp } from '@/lib/context/app-context';

export default function AdminPage() {
  const { 
    user, 
    benefits, 
    updateBenefitAmount, 
    institutions, 
    moderationProposals, 
    approveProposal, 
    rejectProposal,
    switchUserRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stats' | 'benefits' | 'institutions' | 'moderation' | 'audit'>('stats');

  // Edit benefit amount modal
  const [editingBenefit, setEditingBenefit] = useState<{ id: string; title: string; amount: number } | null>(null);

  // Statistics Chart Data
  const statsData = [
    { month: 'Май', users: 1420, calculations: 3100 },
    { month: 'Июн', users: 2180, calculations: 4890 },
    { month: 'Июл', users: 3200, calculations: 6700 },
    { month: 'Авг', users: 4950, calculations: 10400 },
    { month: 'Сен', users: 7100, calculations: 15300 },
    { month: 'Окт', users: 10240, calculations: 23400 },
  ];

  const servicePopularity = [
    { name: 'Калькулятор пособий', requests: 14200 },
    { name: 'Карта детсадов', requests: 9800 },
    { name: 'Календарь беременности', requests: 7600 },
    { name: 'Семейный щит (SOS)', requests: 4300 },
    { name: 'Умный помощник AI', requests: 8900 },
  ];

  // Audit Logs mock
  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', admin: 'Администратор (Минтруд)', action: 'Обновление норматива БПМ до 437.80 BYN', time: 'Сегодня, 10:14' },
    { id: 'log-2', admin: 'Администратор (Минтруд)', action: 'Одобрение объекта доступности «ТРЦ Дана Молл»', time: 'Вчера, 16:30' },
    { id: 'log-3', admin: 'Администратор (Минтруд)', action: 'Добавление детского ясли-сада № 152 в реестр', time: '29 окт, 12:00' },
  ]);

  const handleSaveBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBenefit) {
      updateBenefitAmount(editingBenefit.id, editingBenefit.amount);
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          admin: user?.full_name || 'Администратор',
          action: `Изменение суммы выплаты «${editingBenefit.title}» на ${editingBenefit.amount} BYN`,
          time: 'Только что'
        },
        ...prev
      ]);
      setEditingBenefit(null);
    }
  };

  return (
    <div className="space-y-8 pt-4 pb-12 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#245B49] text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#283D38]">
                Панель управления экосистемой «Родныя»
              </h1>
              <span className="text-xs bg-[#245B49] text-white px-2.5 py-0.5 rounded-full font-bold">
                Госадминистрирование
              </span>
            </div>
            <p className="text-xs text-[#6B7C77]">
              Управление государственными выплатами, базой учреждений, модерацией и аналитикой
            </p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#F8F1E8] p-1.5 rounded-2xl text-xs font-semibold">
          {[
            { id: 'stats', label: 'Аналитика', icon: BarChart3 },
            { id: 'benefits', label: 'Пособия РБ', icon: FileText },
            { id: 'institutions', label: 'Учреждения', icon: Building },
            { id: 'moderation', label: `Модерация (${moderationProposals.filter(p => p.status === 'pending').length})`, icon: Activity },
            { id: 'audit', label: 'Журнал аудита', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#245B49] text-white shadow-xs'
                    : 'text-[#6B7C77] hover:text-[#283D38]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Stats & Analytics */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#FFFDF9] border border-[#F0E4D7] shadow-soft">
              <span className="text-xs text-[#6B7C77] block font-medium">Пользователей системы:</span>
              <span className="text-3xl font-black text-[#283D38] mt-1 block">10 240</span>
              <span className="text-[11px] text-[#34785D] font-bold mt-1 block">↑ +24% за месяц</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFDF9] border border-[#F0E4D7] shadow-soft">
              <span className="text-xs text-[#6B7C77] block font-medium">Расчётов пособий:</span>
              <span className="text-3xl font-black text-[#34785D] mt-1 block">23 400</span>
              <span className="text-[11px] text-[#34785D] font-bold mt-1 block">В среднем 750 в день</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFDF9] border border-[#F0E4D7] shadow-soft">
              <span className="text-xs text-[#6B7C77] block font-medium">Учреждений в каталоге:</span>
              <span className="text-3xl font-black text-[#2F6D9E] mt-1 block">2 480</span>
              <span className="text-[11px] text-[#2F6D9E] font-bold mt-1 block">Вся Беларусь</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFDF9] border border-[#F0E4D7] shadow-soft">
              <span className="text-xs text-[#6B7C77] block font-medium">Заявок на модерацию:</span>
              <span className="text-3xl font-black text-[#E58A7D] mt-1 block">
                {moderationProposals.filter(p => p.status === 'pending').length}
              </span>
              <span className="text-[11px] text-[#D96B5D] font-bold mt-1 block">Требуют внимания</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
              <h3 className="font-bold text-base text-[#283D38]">Динамика использования платформы (2026)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0E4D7" />
                    <XAxis dataKey="month" stroke="#8C9C96" fontSize={12} />
                    <YAxis stroke="#8C9C96" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="calculations" stroke="#34785D" strokeWidth={3} name="Расчёты" />
                    <Line type="monotone" dataKey="users" stroke="#E58A7D" strokeWidth={2} name="Новые семьи" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
              <h3 className="font-bold text-base text-[#283D38]">Популярность модулей</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicePopularity} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0E4D7" />
                    <XAxis type="number" stroke="#8C9C96" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="#8C9C96" fontSize={10} width={110} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#34785D" radius={[0, 8, 8, 0]} name="Обращений" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Benefits */}
      {activeTab === 'benefits' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
            <h3 className="font-bold text-base text-[#283D38]">Реестр государственных выплат и нормативов</h3>
            <span className="text-xs text-[#6B7C77]">Изменение сумм мгновенно обновляет калькулятор</span>
          </div>

          <div className="divide-y divide-[#F0E4D7]">
            {benefits.map((b) => (
              <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[10px] bg-[#E5EFE3] text-[#34785D] px-2 py-0.5 rounded-md">
                      {b.code}
                    </span>
                    <h4 className="font-bold text-sm text-[#283D38]">{b.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#6B7C77]">{b.short_description}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="font-black text-sm text-[#34785D] block">
                      {b.base_amount_byn.toLocaleString('ru-RU')} BYN
                    </span>
                    <span className="text-[10px] text-[#8C9C96]">{b.payment_period}</span>
                  </div>

                  <button
                    onClick={() => setEditingBenefit({ id: b.id, title: b.title, amount: b.base_amount_byn })}
                    className="p-2 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-[#283D38] transition-colors"
                    title="Редактировать сумму"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Institutions */}
      {activeTab === 'institutions' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
            <h3 className="font-bold text-base text-[#283D38]">Реестр учреждений ({institutions.length})</h3>
            <button
              onClick={() => alert('Форма добавления нового детсада или поликлиники с привязкой координат')}
              className="px-3.5 py-1.5 rounded-xl bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить учреждение</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {institutions.map((inst) => (
              <div key={inst.id} className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#283D38]">{inst.name}</h4>
                  <span className="text-[11px] text-[#6B7C77]">{inst.address}, {inst.city}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#34785D] bg-white px-2 py-0.5 rounded-md border border-[#E9DACB] block">
                    Мест: {inst.free_spots ?? 0}
                  </span>
                  <span className="text-[10px] text-[#8C9C96] mt-0.5 block">{inst.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Moderation Proposals */}
      {activeTab === 'moderation' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
            <h3 className="font-bold text-base text-[#283D38]">
              Пользовательские предложения по доступной среде ({moderationProposals.length})
            </h3>
            <span className="text-xs text-[#6B7C77]">Проверка объектов перед публикацией на карте</span>
          </div>

          <div className="space-y-3">
            {moderationProposals.map((prop) => (
              <div
                key={prop.id}
                className="p-5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#34785D] bg-[#E5EFE3] px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {prop.feature_type === 'mother_child_room' ? 'Комната матери и ребёнка' : 'Пандус / Подъёмник'}
                    </span>
                    <h4 className="font-bold text-base text-[#283D38] mt-1">{prop.facility_name}</h4>
                    <span className="text-[11px] text-[#6B7C77]">{prop.address}, {prop.city}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      prop.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : prop.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {prop.status === 'pending' ? 'На модерации' : prop.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                  </span>
                </div>

                <p className="text-xs text-[#556862] leading-relaxed bg-white p-3 rounded-xl border border-[#E9DACB]">
                  «{prop.description}»
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#8C9C96]">
                    Заявитель: {prop.user_name} • {new Date(prop.created_at).toLocaleDateString('ru-RU')}
                  </span>

                  {prop.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveProposal(prop.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#34785D] text-white font-bold hover:bg-[#245B49] transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Одобрить и добавить</span>
                      </button>

                      <button
                        onClick={() => rejectProposal(prop.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Отклонить</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Audit Log */}
      {activeTab === 'audit' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <h3 className="font-bold text-base text-[#283D38] border-b border-[#F0E4D7] pb-3">
            Журнал действий администраторов (Audit Trail)
          </h3>

          <div className="divide-y divide-[#F0E4D7] text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-semibold text-[#283D38] block">{log.action}</span>
                  <span className="text-[11px] text-[#6B7C77]">{log.admin}</span>
                </div>
                <span className="text-[11px] text-[#8C9C96] shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Benefit Modal */}
      {editingBenefit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
              <h3 className="font-bold text-base text-[#283D38]">Изменение размера пособия</h3>
              <button
                onClick={() => setEditingBenefit(null)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBenefit} className="space-y-3 text-xs">
              <div>
                <span className="text-[#6B7C77] block text-[11px]">Выплата:</span>
                <span className="font-bold text-[#283D38]">{editingBenefit.title}</span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Новый размер (в белорусских рублях BYN):</label>
                <input
                  type="number"
                  step="0.10"
                  required
                  value={editingBenefit.amount}
                  onChange={(e) => setEditingBenefit({ ...editingBenefit, amount: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-sm font-bold text-[#34785D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Сохранить и применить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

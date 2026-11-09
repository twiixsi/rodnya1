'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search, 
  MessageSquare, 
  Calendar,
  Sparkles,
  Phone,
  Check
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/layout/footer';

interface HobbyStudent {
  id: string;
  childName: string;
  childAge: string;
  parentName: string;
  parentPhone: string;
  sectionName: string;
  schedule: string;
  status: 'enrolled' | 'waiting_list';
  enrolledDate: string;
}

export default function HobbyAdminPage() {
  const { user } = useApp();

  const [sections, setSections] = useState([
    { id: 'sec-1', name: 'Lego-робототехника WeDo', ageRange: '4-8 лет', maxSpots: 12, filledSpots: 9, isOpen: true },
    { id: 'sec-2', name: 'Детская хореография и ритмика', ageRange: '3-6 лет', maxSpots: 15, filledSpots: 14, isOpen: true },
    { id: 'sec-3', name: 'Грудничковое и детское плавание', ageRange: '2-5 лет', maxSpots: 10, filledSpots: 10, isOpen: false },
    { id: 'sec-4', name: 'Шахматная школа «Белая ладья»', ageRange: '5-10 лет', maxSpots: 12, filledSpots: 8, isOpen: true },
  ]);

  const [students, setStudents] = useState<HobbyStudent[]>([
    {
      id: 'st-01',
      childName: 'Иванова Анна (3 года)',
      childAge: '3 года',
      parentName: 'Анна Иванова',
      parentPhone: '+375 (29) 678-43-21',
      sectionName: 'Детская хореография и ритмика',
      schedule: 'Вт, Чт 17:00 - 18:00',
      status: 'enrolled',
      enrolledDate: '01.09.2026'
    },
    {
      id: 'st-02',
      childName: 'Смирнов Дмитрий (6 лет)',
      childAge: '6 лет',
      parentName: 'Смирнов Андрей',
      parentPhone: '+375 (29) 112-99-44',
      sectionName: 'Lego-робототехника WeDo',
      schedule: 'Ср, Сб 11:00 - 12:30',
      status: 'enrolled',
      enrolledDate: '10.09.2026'
    },
    {
      id: 'st-03',
      childName: 'Ковалёв Максим (4 года)',
      childAge: '4 года',
      parentName: 'Елена Ковалёва',
      parentPhone: '+375 (29) 700-44-11',
      sectionName: 'Грудничковое и детское плавание',
      schedule: 'Сб, Вс 10:00 - 11:00',
      status: 'waiting_list',
      enrolledDate: '15.10.2026'
    }
  ]);

  const [selectedSectionFilter, setSelectedSectionFilter] = useState('all');

  const toggleSectionEnrollment = (secId: string) => {
    setSections(prev => prev.map(s => s.id === secId ? { ...s, isOpen: !s.isOpen } : s));
  };

  const filteredStudents = students.filter(st => {
    if (selectedSectionFilter === 'all') return true;
    return st.sectionName === selectedSectionFilter;
  });

  return (
    <div className="min-h-screen bg-[#FAF4EC] text-[#283D38] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-6">
          {/* Top Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE2D5] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2A67B1] text-white flex items-center justify-center shadow-xs shrink-0">
                <Palette className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2A67B1] text-[11px] font-bold">
                    Панель администратора кружков и секций
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700">На связи на карте Беларуси</span>
                </div>
                <h1 className="text-2xl font-black text-[#1E3029] mt-1">
                  Дворец творчества детей и молодёжи
                </h1>
                <p className="text-xs text-[#556862]">
                  ул. Народная, 18 • г. Минск • Руководитель: {user?.full_name || 'Смирнов А.П.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/chats"
                className="px-4 py-2.5 rounded-2xl bg-[#2A67B1] hover:bg-[#1E5291] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Открыть сообщения с родителями</span>
              </Link>
            </div>
          </div>

          {/* Sections Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map(sec => (
              <div key={sec.id} className="bg-white p-5 rounded-3xl border border-[#EDE2D5] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6B7C77] bg-[#FAF4EC] px-2.5 py-0.5 rounded-full">
                    {sec.ageRange}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sec.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {sec.isOpen ? 'Набор открыт' : 'Набор закрыт'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#1E3029]">{sec.name}</h3>
                <div className="flex items-center justify-between text-xs text-[#556862] pt-1">
                  <span>Занято мест:</span>
                  <span className="font-bold text-[#1E3029]">{sec.filledSpots} из {sec.maxSpots}</span>
                </div>
                <div className="w-full bg-[#F0E6DA] h-2 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-[#2A67B1] h-full rounded-full transition-all" 
                    style={{ width: `${(sec.filledSpots / sec.maxSpots) * 100}%` }}
                  />
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => toggleSectionEnrollment(sec.id)}
                    className="w-full py-1.5 rounded-xl border border-[#EDE2D5] hover:bg-[#FAF4EC] text-[11px] font-semibold text-[#556862] transition-colors cursor-pointer"
                  >
                    {sec.isOpen ? 'Приостановить набор' : 'Открыть набор в группу'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enrolled Students Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE2D5] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE2D5]">
              <div>
                <h3 className="font-bold text-base text-[#1E3029]">
                  Записавшиеся дети и связь с родителями
                </h3>
                <p className="text-xs text-[#556862]">
                  Родители, записавшиеся через интерактивную карту экосистемы «Родные люди»
                </p>
              </div>

              <select
                value={selectedSectionFilter}
                onChange={(e) => setSelectedSectionFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FAF4EC] border border-[#EDE2D5] text-xs font-semibold text-[#1E3029]"
              >
                <option value="all">Все секции</option>
                {sections.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredStudents.map(student => (
                <div 
                  key={student.id} 
                  className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#EDE2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1E3029]">{student.childName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        student.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.status === 'enrolled' ? 'Зачислен' : 'Лист ожидания'}
                      </span>
                    </div>
                    <span className="text-[#2A67B1] font-bold block">{student.sectionName}</span>
                    <span className="text-[#6B7C77] text-[11px] block">
                      Расписание: {student.schedule} • Родитель: {student.parentName} ({student.parentPhone})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/chats?parentPhone=${encodeURIComponent(student.parentPhone)}&parentName=${encodeURIComponent(student.parentName)}`}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF4EC] border border-[#EDE2D5] text-xs font-bold text-[#1E3029] flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#2A67B1]" />
                      <span>Написать родителю</span>
                    </Link>
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

'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Baby, 
  Calendar as CalendarIcon, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Heart, 
  Sparkles,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { FamilyEvent, Child } from '@/types';

export default function FamilyPage() {
  const { 
    isMobileLayout, 
    childrenList, 
    addChild, 
    events, 
    addEvent, 
    toggleEventCompleted,
    familyMembers 
  } = useApp();

  const [activeAgeTab, setActiveAgeTab] = useState<'0-1' | '1-3' | '3-6' | '6-12'>('1-3');
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // New child form
  const [newChild, setNewChild] = useState({
    name: '',
    birth_date: '',
    gender: 'female' as 'male' | 'female',
    notes: ''
  });

  // New event form
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'medical' as any,
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    child_name: childrenList[0]?.name || 'Ребёнок',
    location: '',
    notes: ''
  });

  const handleAddChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addChild(newChild);
    setShowAddChildModal(false);
    setNewChild({ name: '', birth_date: '', gender: 'female', notes: '' });
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      ...newEvent,
      is_completed: false
    });
    setShowAddEventModal(false);
    setNewEvent({
      title: '',
      category: 'medical',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      child_name: childrenList[0]?.name || 'Ребёнок',
      location: '',
      notes: ''
    });
  };

  // Age Development guides data
  const developmentGuides = {
    '0-1': {
      title: 'Первый год жизни: нежность и безопасность',
      milestones: [
        '3 месяца: уверенно держит головку, улыбается и «гулит»',
        '6 месяцев: переворачивается со спинки на животик, пробует первый прикорм',
        '9 месяцев: сидит без поддержки, лепечет слоги (ма-ма, ба-ба)',
        '12 месяцев: делает первые самостоятельные шаги, пьет из чашки'
      ],
      games: 'Погремушки, тактильные книжки-шуршалки, массаж-песенки, прятки с платочком («Ку-ку»).',
      safety: 'Заглушки на розетки, фиксаторы выдвижных ящиков, блокираторы углов, автокресло 0+.'
    },
    '1-3': {
      title: 'Раннее детство: познание мира и первые слова',
      milestones: [
        '1.5 года: словарный запас 20–30 слов, активно использует ложку',
        '2 года: простые фразы из 2 слов («мама, дай сок»), бегает и прыгает',
        '2.5 года: узнает и называет цвета, начинает осваивать горшок',
        '3 года: «Я сам!», задает вопросы, играет в сюжетные игры'
      ],
      games: 'Крупный конструктор (Lego Duplo), сортеры, рисование пальчиковыми красками, лепка из теста.',
      safety: 'Замки на окнах («защита от детей»), безопасное хранение бытовой химии и лекарств.'
    },
    '3-6': {
      title: 'Дошкольный возраст: социализация и фантазия',
      milestones: [
        '4 года: знает стихи наизусть, играет со сверстниками по правилам',
        '5 лет: считает до 10, одевается самостоятельно, катается на самокате',
        '6 лет: психологическая готовность к 1 классу школы, связная грамотная речь'
      ],
      games: 'Ролевые игры (доктор, магазин), пазлы, настольные игры, чтение сказок на ночь.',
      safety: 'Обучение правилам дорожного движения («светофор»), знание имени родителей и домашнего адреса.'
    },
    '6-12': {
      title: 'Младший школьный возраст: самостоятельность',
      milestones: [
        '7 лет: уверенная учебная мотивация, навыки чтения и письма',
        '9–10 лет: развитие критического мышления, кружки по интересам',
        '11–12 лет: формирование личных границ, подростковые увлечения'
      ],
      games: 'Шахматы, спортивные секции, робототехника, квизы и познавательные энциклопедии.',
      safety: 'Цифровая гигиена в интернете, правила общения с незнакомыми людьми на улице.'
    }
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE3] text-[#34785D] text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Модуль «Уже родители»</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
              Семейный кабинет и календарь заботы
            </h1>
            <p className="text-sm text-[#556862] mt-1 max-w-2xl leading-relaxed">
              Управление профилями детей, график вакцинации и плановых осмотров врачей, а также возрастные гиды развития.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddChildModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#E58A7D] hover:bg-[#D96B5D] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Добавить ребёнка</span>
            </button>

            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Событие в календарь</span>
            </button>
          </div>
        </div>
      </div>

      {/* Children & Family Members Overview (Matches Reference Image 2 Widget) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Children Profiles & Family Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-3">
              <h3 className="font-bold text-base text-[#283D38]">Дети в семье ({childrenList.length})</h3>
              <button
                onClick={() => setShowAddChildModal(true)}
                className="text-xs font-bold text-[#34785D] hover:underline"
              >
                + Добавить
              </button>
            </div>

            <div className="space-y-3">
              {childrenList.map((ch) => {
                const birth = new Date(ch.birth_date);
                const ageYears = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                
                return (
                  <div
                    key={ch.id}
                    className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center gap-4 shadow-xs"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-xs shrink-0">
                      <img
                        src={ch.photo_url || "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80"}
                        alt={ch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-[#283D38]">{ch.name}</h4>
                        <span className="text-[11px] font-bold text-[#34785D] bg-[#E5EFE3] px-2 py-0.5 rounded-full">
                          {ageYears > 0 ? `${ageYears} года` : 'до 1 года'}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7C77] block">
                        Д/Р: {new Date(ch.birth_date).toLocaleDateString('ru-RU')}
                      </span>
                      {ch.notes && (
                        <p className="text-[11px] text-[#556862] line-clamp-1 italic">
                          {ch.notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family Composition Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-3">
            <h3 className="font-bold text-base text-[#283D38]">Члены семьи</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {familyMembers.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-[#F8F1E8] border border-[#E9DACB]">
                  <span className="font-bold text-[#283D38] block">{m.full_name}</span>
                  <span className="text-[11px] text-[#6B7C77]">{m.age} лет</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Family Calendar */}
        <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#34785D]" />
              <h3 className="font-bold text-lg text-[#283D38]">Семейный календарь событий</h3>
            </div>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="text-xs font-bold text-[#34785D] hover:underline"
            >
              + Запланировать
            </button>
          </div>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => toggleEventCompleted(ev.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  ev.is_completed
                    ? 'bg-[#E5EFE3]/40 border-[#CDE0C7] opacity-60'
                    : 'bg-[#F8F1E8] hover:bg-[#F0E4D7] border-[#E9DACB]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    ev.is_completed
                      ? 'bg-[#34785D] border-[#34785D] text-white'
                      : 'border-[#C5B5A3] bg-white'
                  }`}
                >
                  {ev.is_completed && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`text-sm font-bold ${ev.is_completed ? 'line-through text-[#6B7C77]' : 'text-[#283D38]'}`}>
                      {ev.title}
                    </h4>
                    <span className="text-xs font-semibold text-[#34785D] bg-white px-2.5 py-0.5 rounded-full border border-[#E2D2C0] shrink-0">
                      {new Date(ev.date).toLocaleDateString('ru-RU')} {ev.time && `в ${ev.time}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#6B7C77]">
                    {ev.child_name && <span>Для: <b>{ev.child_name}</b></span>}
                    {ev.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#34785D]" />
                        <span>{ev.location}</span>
                      </span>
                    )}
                  </div>

                  {ev.notes && (
                    <p className="text-xs text-[#556862] pt-1 italic">
                      {ev.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age Development Guides Section */}
      <section className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-10 border border-[#F0E4D7] shadow-card space-y-6">
        <div className="border-b border-[#F0E4D7] pb-4">
          <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
            Педагогический навигатор
          </span>
          <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
            Развитие ребёнка по возрастам
          </h2>
          <p className="text-sm text-[#556862] mt-1">
            Ключевые этапы взросления, развивающие игры и рекомендации безопасности от белорусских педагогов и педиатров.
          </p>
        </div>

        {/* Age Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
          {[
            { id: '0-1', label: '0–1 год (Младенчество)' },
            { id: '1-3', label: '1–3 года (Раннее детство)' },
            { id: '3-6', label: '3–6 лет (Дошкольный возраст)' },
            { id: '6-12', label: '6–12 лет (Школьный возраст)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAgeTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl shrink-0 transition-all ${
                activeAgeTab === tab.id
                  ? 'bg-[#34785D] text-white shadow-xs'
                  : 'bg-[#F8F1E8] text-[#6B7C77] hover:bg-[#F0E4D7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Age Content Card */}
        <div className="bg-[#F8F1E8] rounded-3xl p-6 lg:p-8 border border-[#E9DACB] space-y-6">
          <h3 className="text-xl font-bold text-[#283D38]">
            {developmentGuides[activeAgeTab].title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Milestones */}
            <div className="bg-white rounded-2xl p-5 border border-[#E9DACB] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider block">
                Ключевые навыки (вехи):
              </span>
              <ul className="space-y-2 text-xs text-[#556862]">
                {developmentGuides[activeAgeTab].milestones.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#34785D] font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Games */}
            <div className="bg-white rounded-2xl p-5 border border-[#E9DACB] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#E58A7D] uppercase tracking-wider block">
                Развивающие игры:
              </span>
              <p className="text-xs text-[#556862] leading-relaxed">
                {developmentGuides[activeAgeTab].games}
              </p>
            </div>

            {/* Safety */}
            <div className="bg-white rounded-2xl p-5 border border-[#E9DACB] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#245B49] uppercase tracking-wider block">
                Безопасность дома и на улице:
              </span>
              <p className="text-xs text-[#556862] leading-relaxed">
                {developmentGuides[activeAgeTab].safety}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Child Modal */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
              <h3 className="font-bold text-base text-[#283D38]">Добавить профиль ребёнка</h3>
              <button
                onClick={() => setShowAddChildModal(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddChildSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Имя ребёнка:</label>
                <input
                  type="text"
                  required
                  placeholder="Например: София или Артем"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Дата рождения:</label>
                <input
                  type="date"
                  required
                  value={newChild.birth_date}
                  onChange={(e) => setNewChild({ ...newChild, birth_date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Пол:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewChild({ ...newChild, gender: 'female' })}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      newChild.gender === 'female' ? 'bg-[#FDF0EC] border-[#E58A7D] text-[#D96B5D]' : 'bg-[#F8F1E8] text-[#6B7C77]'
                    }`}
                  >
                    Девочка
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewChild({ ...newChild, gender: 'male' })}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      newChild.gender === 'male' ? 'bg-[#EBF3FB] border-[#2F6D9E] text-[#2F6D9E]' : 'bg-[#F8F1E8] text-[#6B7C77]'
                    }`}
                  >
                    Мальчик
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Заметки (аллергии, группа детсада):</label>
                <textarea
                  rows={2}
                  placeholder="Особенности здоровья, поликлиника прикрепления..."
                  value={newChild.notes}
                  onChange={(e) => setNewChild({ ...newChild, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Сохранить профиль
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
              <h3 className="font-bold text-base text-[#283D38]">Запланировать событие</h3>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Название события:</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Осмотр педиатра или Прививка КПК"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Дата:</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Время:</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Место проведения (поликлиника/центр):</label>
                <input
                  type="text"
                  placeholder="2-я детская поликлиника, каб. 112"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Добавить в календарь
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

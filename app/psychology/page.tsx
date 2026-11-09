'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldAlert, 
  Heart, 
  MessageSquare, 
  Calendar, 
  Star, 
  ChevronDown, 
  ChevronLeft, 
  ArrowLeft, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  User, 
  Search, 
  Building, 
  Video, 
  X, 
  Home, 
  LayoutGrid,
  ShieldCheck,
  Send,
  Laptop,
  Smartphone,
  Download
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

// =============================================================================
// БАЗА СПЕЦИАЛИСТОВ: СТРОГО СЕМЕЙНЫЕ И ПЕРИНАТАЛЬНЫЕ ПСИХОЛОГИ И МЕДИАТОРЫ
// (Никаких педиатров и логопедов)
// =============================================================================
interface PsychologySpecialist {
  id: string;
  fullName: string;
  shortName: string;
  roleTitle: string;
  association: string;
  education: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  bioDesktop: string;
  bioMobile: string;
  availableSlots: string[];
  specialtyType: 'psychologist' | 'mediator';
}

const PSYCHOLOGY_SPECIALISTS: PsychologySpecialist[] = [
  {
    id: 'psy-01',
    fullName: 'Елена Михайловна Ковалёва',
    shortName: 'Е. М. Ковалёва',
    roleTitle: 'Перинатальный и семейный психолог',
    association: 'Член Белорусской ассоциации психотерапевтов (БАП)',
    education: 'БГПУ им. М. Танка, факультет социально-педагогических технологий',
    experienceYears: 12,
    rating: 5.0,
    reviewsCount: 64,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bioDesktop: 'Бережно сопровождаю женщин во время беременности, помогаю преодолеть послеродовую депрессию, тревожность, эмоциональное выгорание и кризисы первого года родительства.',
    bioMobile: 'Бережно сопровождаю женщин во время беременности, помогаю преодолеть послеродовую депрессию и кризисы родительства.',
    availableSlots: ['Завтра, 14:00', 'Завтра, 18:30', 'Пт, 11:00'],
    specialtyType: 'psychologist'
  },
  {
    id: 'psy-02',
    fullName: 'Ольга Николаевна Савицкая',
    shortName: 'О. Н. Савицкая',
    roleTitle: 'Семейный медиатор и юрист',
    association: 'Включена в реестр медиаторов Министерства юстиции Республики Беларусь',
    education: 'Белорусский государственный университет (БГУ, Юридический факультет)',
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 52,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bioDesktop: 'Мирное разрешение семейных разногласий, согласование порядка воспитания детей, справедливое распределение обязанностей и семейного бюджета без обращения в суд.',
    bioMobile: 'Мирное разрешение семейных разногласий, согласование порядка воспитания детей и бюджета без суда.',
    availableSlots: ['Чт, 15:00', 'Пт, 17:00', 'Сб, 12:00'],
    specialtyType: 'mediator'
  }
];

// =============================================================================
// МЕТОДИКИ ИНТЕРАКТИВНОЙ МЕДИАЦИИ (3 ТАБА)
// =============================================================================
interface ExerciseStep {
  stepNumber: number;
  stepTitle: string;
  insteadText?: string;
  sayText: string;
}

interface MediationExercise {
  id: string;
  desktopTabTitle: string;
  mobileTabTitle: string;
  headerTitle: string;
  subtitle: string;
  steps: ExerciseStep[];
}

const MEDIATION_EXERCISES: MediationExercise[] = [
  {
    id: 'listen',
    desktopTabTitle: 'Учимся слушать без обвинений',
    mobileTabTitle: 'Учимся слушать',
    headerTitle: 'Учимся слушать без обвинений',
    subtitle: 'Техника «Я-сообщений» для снижения напряжения в споре',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Шаг 1. Опишите факт без оценки',
        insteadText: 'Вместо: "Ты никогда не помогаешь с ребёнком!"',
        sayText: 'Скажите: "Когда я весь вечер одна укладываю спать малыша..."'
      },
      {
        stepNumber: 2,
        stepTitle: 'Шаг 2. Назовите своё чувство',
        sayText: '"...я чувствую сильную усталость и бессилие..."'
      },
      {
        stepNumber: 3,
        stepTitle: 'Шаг 3. Сформулируйте конкретную просьбу',
        sayText: '"...пожалуйста, помоги мне искупать его сегодня в 20:00".'
      }
    ]
  },
  {
    id: 'chores',
    desktopTabTitle: 'Распределение семейных обязанностей',
    mobileTabTitle: 'Обязанности',
    headerTitle: 'Распределение семейных обязанностей',
    subtitle: 'Прозрачный баланс быта между родителями без взаимных претензий',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Шаг 1. Составьте общий список рутины',
        insteadText: 'Вместо: "Я тут всё тащу одна, а ты только отдыхаешь!"',
        sayText: 'Скажите: "Давай выпишем все ежедневные задачи: готовку, купание, прогулки и поликлинику."'
      },
      {
        stepNumber: 2,
        stepTitle: 'Шаг 2. Разделите зоны ответственности',
        sayText: '"...закрепим 2–3 задачи, за которые каждый отвечает полностью без напоминаний..."'
      },
      {
        stepNumber: 3,
        stepTitle: 'Шаг 3. Введите родительский час отдыха',
        sayText: '"...давай договоримся о 2 часах личного времени в неделю для каждого из нас".'
      }
    ]
  },
  {
    id: 'budget',
    desktopTabTitle: 'Семейный бюджет и финансовые цели',
    mobileTabTitle: 'Бюджет',
    headerTitle: 'Семейный бюджет и финансовые цели',
    subtitle: 'Обсуждение расходов и накоплений без страха и взаимных упрёков',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Шаг 1. Определите обязательные расходы',
        insteadText: 'Вместо: "Куда уходят все деньги, почему мы ничего не откладываем?!"',
        sayText: 'Скажите: "Давай посчитаем постоянные траты на квартиру, питание малыша и подгузники..."'
      },
      {
        stepNumber: 2,
        stepTitle: 'Шаг 2. Выделите личные средства без отчётов',
        sayText: '"...у каждого из нас должна быть сумма на личные радости, за которую не нужно отчитываться..."'
      },
      {
        stepNumber: 3,
        stepTitle: 'Шаг 3. Создайте семейную подушку безопасности',
        sayText: '"...давай откладывать фиксированные 10% дохода в неприкосновенный резерв на 3 месяца".'
      }
    ]
  }
];

export default function PsychologyPage() {
  const { user, addDoctorAppointment, setIsDownloadModalOpen } = useApp();

  // Активный таб упражнений медиации: 0, 1 или 2
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const currentExercise = MEDIATION_EXERCISES[activeExerciseIndex] || MEDIATION_EXERCISES[0];

  // Стейты SOS модального окна кризисной помощи
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [isAnonymousChatActive, setIsAnonymousChatActive] = useState<boolean>(false);
  const [chatMessageInput, setChatMessageInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Здравствуйте! Вы подключились к анонимной кризисной психологической линии «Родные люди». Напишите, что вас сейчас тревожит. Мы рядом и готовы выслушать.',
      time: 'Сейчас'
    }
  ]);

  // Стейты записи к специалисту
  const [selectedSpecialist, setSelectedSpecialist] = useState<PsychologySpecialist | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationFormat, setConsultationFormat] = useState<'online' | 'in_person'>('online');
  const [appointmentTopic, setAppointmentTopic] = useState<string>('');
  const [bookingToastSuccess, setBookingToastSuccess] = useState<boolean>(false);

  // Обработчик отправки сообщения в анонимный чат
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageInput.trim()) return;

    const userText = chatMessageInput.trim();
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time: 'Сейчас' }
    ]);
    setChatMessageInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Спасибо, что поделились. Помните: ваши чувства абсолютно нормальны, вы не виноваты в усталости. Давайте разберем, что можно сделать прямо сейчас, чтобы облегчить ваше состояние.',
          time: 'Сейчас'
        }
      ]);
    }, 1000);
  };

  // Обработчик записи к специалисту
  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpecialist) return;

    addDoctorAppointment({
      specialist_id: selectedSpecialist.id,
      doctor_name: selectedSpecialist.fullName,
      specialty_label: selectedSpecialist.roleTitle,
      institution_name: consultationFormat === 'online'
        ? 'Онлайн-консультация «Родные люди» (Психологическая помощь)'
        : 'Центр семейной медиации и психологической поддержки г. Минска',
      child_name: user?.full_name ? `${user.full_name} (Семья)` : 'Анна (Индивидуальная консультация)',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: selectedSlot || '14:00',
      type: consultationFormat,
      notes: appointmentTopic || 'Консультация по вопросам семейных отношений'
    });

    setSelectedSpecialist(null);
    setBookingToastSuccess(true);
    setTimeout(() => setBookingToastSuccess(false), 4000);
  };

  // =============================================================================
  // ДЕКОРАТИВНЫЕ ВЕКТОРНЫЕ ВЕТОЧКИ (ДЛЯ ДЕСКТОПА)
  // =============================================================================
  const BotanicalBranchLeft = () => (
    <div className="fixed top-24 left-0 w-36 lg:w-44 h-auto pointer-events-none opacity-30 select-none z-0 hidden md:block">
      <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#A9937E]">
        <path d="M15 370 C25 290, 45 180, 135 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 275 C25 250, 15 250, 18 225 C40 225, 48 250, 42 275 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 240 C75 230, 90 240, 85 260 C65 260, 55 245, 55 240 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 185 C65 160, 45 160, 50 140 C72 140, 85 160, 78 185 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M95 150 C115 140, 125 150, 120 170 C100 170, 95 155, 95 150 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M115 95 C110 70, 95 65, 102 45 C122 50, 125 75, 115 95 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M135 25 C132 10, 145 5, 152 18 C150 30, 138 35, 135 25 Z" fill="#D9D2C7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );

  const BotanicalBranchRight = () => (
    <div className="fixed top-24 right-0 w-36 lg:w-44 h-auto pointer-events-none opacity-30 select-none z-0 hidden md:block scale-x-[-1]">
      <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#A9937E]">
        <path d="M15 370 C25 290, 45 180, 135 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 275 C25 250, 15 250, 18 225 C40 225, 48 250, 42 275 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 240 C75 230, 90 240, 85 260 C65 260, 55 245, 55 240 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 185 C65 160, 45 160, 50 140 C72 140, 85 160, 78 185 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M95 150 C115 140, 125 150, 120 170 C100 170, 95 155, 95 150 Z" fill="#EAE5DC" stroke="currentColor" strokeWidth="1.5" />
        <path d="M115 95 C110 70, 95 65, 102 45 C122 50, 125 75, 115 95 Z" fill="#E2DDD5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M135 25 C132 10, 145 5, 152 18 C150 30, 138 35, 135 25 Z" fill="#D9D2C7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );

  // =============================================================================
  // РЕНДЕР МОБИЛЬНОЙ ВЕРСИИ (СТРОГО ПО МАКЕТУ sosTel.jpg)
  // =============================================================================
  const renderMobileContent = (isInsideSimulator = false) => (
    <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-24'} shadow-sm px-4 pt-3 space-y-4 font-sans text-[#283D38] overflow-hidden`}>
      
      {/* Декоративная веточка в правом верхнем углу (по sosTel.jpg) */}
      <div className="absolute top-1 right-2 w-20 h-28 pointer-events-none opacity-25 select-none">
        <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9C8673]">
          <path d="M85 5 C60 50, 40 90, 10 145" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M65 40 C78 30, 85 35, 82 45 C72 45, 68 42, 65 40 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
          <path d="M50 70 C35 60, 32 68, 38 75 C48 75, 52 70, 50 70 Z" fill="#EAE5DE" stroke="currentColor" strokeWidth="1" />
          <path d="M35 100 C48 90, 55 95, 52 105 C42 105, 38 102, 35 100 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
          <path d="M85 5 C88 0, 95 2, 92 8 C88 12, 85 8, 85 5 Z" fill="#D2C9BE" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* 1. Верхняя панель со стрелочкой возврата: ← Психология */}
      <div className="flex items-center gap-3 pt-2">
        <Link 
          href="/" 
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#1E3029] hover:bg-[#F0E4D7] transition-colors -ml-1 cursor-pointer"
          title="На главную"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </Link>
        <h1 className="text-2xl font-extrabold text-[#1E3029] tracking-tight">
          Психология
        </h1>
      </div>

      {/* 2. НЕЖНО-ЗЕЛЕНЫЙ ВЕРХНИЙ БАННЕР (по sosTel.jpg) */}
      <div className="bg-[#D7EFE6]/70 rounded-[28px] p-5 border border-[#C5E5D8] space-y-3.5 relative overflow-hidden shadow-2xs">
        
        {/* Бейдж: Семейный щит • Психологическая опора */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#C5DEC8] text-[#208253] text-[11px] font-bold shadow-2xs">
          <ShieldAlert className="w-3.5 h-3.5 text-[#208253]" />
          <span>Семейный щит • Психологическая опора</span>
        </div>

        {/* Заголовок и описание */}
        <div>
          <h2 className="text-2xl font-black text-[#1E3029] tracking-tight leading-tight">
            Поддержка, когда это нужно
          </h2>
          <p className="text-xs text-[#445851] mt-1.5 leading-relaxed font-normal">
            Бесплатная конфиденциальная психологическая помощь и сопровождение семей в кризисных ситуациях.
          </p>
        </div>

        {/* Большая оранжево-розовая кнопка: SOS — Экстренная помощь */}
        <div className="space-y-1.5 pt-1">
          <button
            onClick={() => setShowSosModal(true)}
            className="w-full py-3.5 px-5 rounded-full bg-[#D77468] hover:bg-[#c96256] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
            <span>SOS — Экстренная помощь</span>
          </button>
          <span className="text-[11px] text-[#556862] text-center font-medium block">
            Круглосуточный анонимный чат
          </span>
        </div>

        {/* Надпись от руки: Вы не одни ♡ */}
        <div className="pt-1">
          <span 
            className="text-2xl text-[#C96054] font-semibold italic block"
            style={{ fontFamily: 'Caveat, cursive, sans-serif' }}
          >
            Вы не одни ♡
          </span>
        </div>
      </div>

      {/* 3. РАЗДЕЛ: УПРАЖНЕНИЯ ДЛЯ ГАРМОНИИ (по sosTel.jpg) */}
      <div className="space-y-3 pt-1">
        <div>
          <h3 className="text-xl font-extrabold text-[#1E3029] tracking-tight">
            Упражнения для гармонии
          </h3>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Практические методики медиаторов
          </p>
        </div>

        {/* Мобильные табы медиации */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
          {MEDIATION_EXERCISES.map((ex, idx) => {
            const isActive = activeExerciseIndex === idx;
            return (
              <button
                key={ex.id}
                onClick={() => setActiveExerciseIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#208253] text-white shadow-2xs'
                    : 'bg-[#EDE2D4]/70 text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                {ex.mobileTabTitle}
              </button>
            );
          })}
        </div>

        {/* Подложка контента с шагами упражнения */}
        <div className="bg-[#F4ECE3] rounded-[24px] p-4.5 border border-[#E8DACB] space-y-3">
          <div>
            <h4 className="text-base font-extrabold text-[#1E3029]">
              {currentExercise.headerTitle}
            </h4>
            <p className="text-[11px] text-[#6B7C77] mt-0.5">
              {currentExercise.subtitle}
            </p>
          </div>

          {/* ШАГИ УПРАЖНЕНИЯ: ВЕРТИКАЛЬНАЯ СТОПКА (ОДИН ПОД ДРУГИМ, СТРОГО ПО sosTel.jpg) */}
          <div className="space-y-3 pt-1">
            {currentExercise.steps.map((st) => (
              <div 
                key={st.stepNumber}
                className="bg-white rounded-2xl p-4 border border-[#EDE0D2] shadow-2xs space-y-2"
              >
                <h5 className="font-extrabold text-xs text-[#1E3029]">
                  {st.stepTitle}
                </h5>

                <div className="bg-[#FDF7F4] rounded-xl p-3 text-[11px] space-y-1">
                  {st.insteadText && (
                    <p className="text-[#8E5B4B] font-medium leading-relaxed">
                      {st.insteadText}
                    </p>
                  )}
                  <p className="text-[#283D38] font-bold leading-relaxed">
                    {st.sayText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. СПЕЦИАЛИСТЫ НА ТЕЛЕФОНЕ (Елена Ковалёва и Ольга Савицкая) */}
      <div className="space-y-3 pt-2">
        <div>
          <h3 className="text-xl font-extrabold text-[#1E3029] tracking-tight">
            Семейные специалисты
          </h3>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Психологическая и медиативная поддержка семей в Беларуси
          </p>
        </div>

        <div className="space-y-3.5">
          {PSYCHOLOGY_SPECIALISTS.map((spec) => (
            <div 
              key={spec.id}
              className="bg-white rounded-[24px] p-4.5 shadow-2xs border border-orange-100/50 space-y-3"
            >
              <div className="flex items-start gap-3">
                <img 
                  src={spec.avatarUrl} 
                  alt={spec.shortName}
                  className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-orange-100/50 shadow-2xs" 
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-amber-600">{spec.rating}</span>
                      <span className="text-[#8C9C96]">({spec.reviewsCount})</span>
                    </div>
                    <span className="font-extrabold text-xs text-[#1E3029] truncate">
                      {spec.shortName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#556862] block mt-0.5 font-semibold">
                    {spec.roleTitle}
                  </span>
                  <span className="text-[10px] text-[#8C9C96] block truncate">
                    {spec.association}
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF4ED] rounded-xl p-3 text-[11px] text-[#445550] leading-relaxed border border-[#EFE5DB]">
                {spec.bioMobile}
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#6B7C77] block mb-1.5">
                  Свободные окна:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {spec.availableSlots.map((slot, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setSelectedSpecialist(spec);
                        setSelectedSlot(slot);
                      }}
                      className="bg-[#EBF3FC] text-[#2F6D9E] hover:bg-[#d9ebfb] px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedSpecialist(spec);
                    setSelectedSlot(spec.availableSlots[0]);
                  }}
                  className="bg-[#208253] hover:bg-[#186641] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 flex-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Записаться</span>
                </button>

                <button
                  onClick={() => {
                    setShowSosModal(true);
                    setIsAnonymousChatActive(true);
                  }}
                  title="Экспресс-чат со специалистом"
                  className="w-10 h-10 rounded-xl border border-[#D5E8D8] bg-[#F4FAF7] hover:bg-[#e4f3eb] text-[#208253] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Нижнее мобильное меню (Bottom Nav PWA) */}
      <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
        <Link href="/" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Главная</span>
        </Link>

        <Link href="/health" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Сервисы</span>
        </Link>

        <Link href="/chats" className="flex flex-col items-center justify-center text-[#208253] font-bold relative transition-colors">
          <div className="relative">
            <MessageSquare className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              1
            </span>
          </div>
          <span className="text-[10px] mt-1">Сообщения</span>
        </Link>

        <Link href="/dashboard" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Профиль</span>
        </Link>
      </nav>

    </div>
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen text-[#283D38] font-sans antialiased selection:bg-[#208253] selection:text-white relative">
      
      {/* Декоративные веточки по бокам экрана десктопа */}
      <BotanicalBranchLeft />
      <BotanicalBranchRight />

      {/* ========================================================================= */}
      {/* ДЕСКТОПНЫЙ ВЕБ-ПОРТАЛ                                                     */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        
        {/* Шапка портала */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 relative z-10 space-y-4">
          <header className="flex items-center justify-between pb-1">
            {/* Слева: Логотип-сердце со слоганом (чистый векторный SVG) */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 select-none" title="Родные люди — Главная">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105 shrink-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-10 h-10 drop-shadow-2xs"
                >
                  {/* Контур сердца */}
                  <path 
                    d="M32 58 C13 42, 3 29, 3 18 C3 7, 12 2, 21 2 C27 2, 30 6, 32 10 C34 6, 37 2, 43 2 C52 2, 61 7, 61 18 C61 29, 51 42, 32 58 Z" 
                    stroke="#E58A7D" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                  {/* Силуэт мамы (слева) */}
                  <circle cx="22" cy="20" r="5" stroke="#34785D" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M12 38 C12 29, 18 27, 22 27 C26 27, 32 29, 32 38" stroke="#34785D" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Силуэт папы (справа) */}
                  <circle cx="42" cy="18" r="5" stroke="#245B49" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M32 38 C32 28, 38 26, 42 26 C46 26, 52 28, 52 38" stroke="#245B49" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Силуэт ребенка (по центру) */}
                  <circle cx="32" cy="28" r="3.6" stroke="#E58A7D" strokeWidth="2.6" fill="#FFFDF9" />
                  <path d="M25 44 C25 37, 28 35, 32 35 C36 35, 39 37, 39 44" stroke="#E58A7D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tracking-tight text-[#283D38] font-sans">
                  Родные люди
                </span>
                <span className="h-5 w-px bg-[#D6C7B8] inline-block" />
                <span className="font-handwritten text-lg text-[#6B7C77] italic tracking-wide">
                  Забота. Поддержка. Будущее.
                </span>
              </div>
            </Link>

            {/* По центру: Статус «Республика Беларусь» с флагом страны */}
            <div className="flex items-center gap-2 font-medium text-xs text-[#556862] bg-[#F5EFE9]/80 px-3.5 py-1.5 rounded-full border border-[#E8DDD1] shadow-2xs">
              <span>Республика Беларусь</span>
              <svg className="w-5 h-3.5 rounded-xs shadow-2xs shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="4" width="32" height="16" fill="#C8232A" rx="1"/>
                <rect x="12" y="20" width="32" height="8" fill="#438C5B" rx="1"/>
                <rect x="4" y="4" width="8" height="24" fill="#FFFFFF" rx="1"/>
                <path d="M8 8 L10 10 L8 12 L6 10 Z" fill="#C8232A"/>
                <path d="M8 14 L10 16 L8 18 L6 16 Z" fill="#C8232A"/>
                <path d="M8 20 L10 22 L8 24 L6 22 Z" fill="#C8232A"/>
                <rect x="4" y="4" width="40" height="24" stroke="#D8C8B8" strokeWidth="1" rx="1" fill="none"/>
              </svg>
            </div>

            {/* Справа: кнопка Скачать + Войти / Профиль */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#d5e7d2] text-[#245B49] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                title="Скачать приложение (APK / PWA)"
              >
                <Download className="w-3.5 h-3.5 text-[#34785D]" />
                <span>Скачать</span>
              </button>

              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-xs transition-colors shadow-2xs"
                >
                  <span>{user.full_name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7C77]" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-1.5 rounded-full border border-[#D5C6B7] bg-white hover:bg-[#F8F1E8] text-[#283D38] font-bold text-xs transition-colors shadow-2xs"
                >
                  Войти
                </Link>
              )}
            </div>
          </header>

          {/* Горизонтальное меню навигации */}
          <div className="bg-white rounded-full border border-[#EFE5DB] shadow-xs px-8 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-7 xl:gap-9 text-sm">
              <Link href="/" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Главная
              </Link>
              <Link href="/benefits" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Льготы и субсидии
              </Link>
              <Link href="/health" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Здоровье
              </Link>
              <Link 
                href="/psychology" 
                className="font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]"
              >
                Психология
              </Link>
              <Link href="/infrastructure" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                Инфраструктура
              </Link>
              <Link href="/about" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
                О проекте
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-[#6B7C77] hover:text-[#283D38] p-1 transition-colors" title="Поиск">
                <Search className="w-4 h-4" />
              </button>

              <Link
                href={user ? "/dashboard" : "/login"}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E0D4C8] bg-white hover:bg-[#F8F1E8] text-xs font-semibold text-[#283D38] shadow-2xs transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#6B7C77]" />
                <span>Личный кабинет</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ ДЕСКТОПА */}
        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-10">
          
          {/* 1. ВЕРХНИЙ БАННЕР (rounded-[32px] p-8 lg:p-10, СТРОГО ПО sosPC.jpg) */}
          <div className="relative overflow-hidden rounded-[32px] p-8 lg:p-10 border border-[#CDE5D7] bg-[#D7EFE6]/60 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Левая часть: заголовок, описание и надпись от руки */}
              <div className="md:col-span-8 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-[#C5DEC8] text-[#208253] text-xs font-bold shadow-2xs">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#208253]" />
                  <span>Семейный щит • Психологическая опора</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-black text-[#1E3029] tracking-tight">
                  Поддержка, когда это нужно
                </h1>

                <p className="text-sm text-[#445851] max-w-2xl leading-relaxed">
                  Бесплатная конфиденциальная психологическая помощь, сопровождение семей в кризисных ситуациях, упражнения для пар и проверенные специалисты Республики Беларусь.
                </p>

                {/* Надпись от руки: Вы не одни ♡ */}
                <div className="pt-2">
                  <span 
                    className="text-3xl text-[#C96054] font-semibold italic block"
                    style={{ fontFamily: 'Caveat, cursive, sans-serif' }}
                  >
                    Вы не одни ♡
                  </span>
                </div>
              </div>

              {/* Правая часть: SOS карточка / кнопка */}
              <div className="md:col-span-4 flex flex-col items-center justify-center space-y-2.5">
                <button
                  onClick={() => setShowSosModal(true)}
                  className="w-full max-w-sm py-4 px-8 rounded-full bg-[#D77468] hover:bg-[#c96256] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
                  <span>SOS — Экстренная помощь</span>
                </button>

                <p className="text-xs text-[#556862] text-center font-medium max-w-xs">
                  Круглосуточный анонимный кризисный чат и горячие линии
                </p>
              </div>

            </div>
          </div>

          {/* 2. РАЗДЕЛ «ИНТЕРАКТИВНАЯ МЕДИАЦИЯ» (СТРОГО ПО sosPC.jpg) */}
          <section className="space-y-4">
            <div>
              <span className="bg-[#E2F0E8] text-[#208253] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                ИНТЕРАКТИВНАЯ МЕДИАЦИЯ
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1E3029] tracking-tight mt-2">
                Упражнения для семейной гармонии
              </h2>
              <p className="text-sm text-[#6B7C77] mt-1">
                Практические методики медиаторов для разрешения разногласий без ссор и обид.
              </p>
            </div>

            {/* Три горизонтальных таба */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {MEDIATION_EXERCISES.map((ex, idx) => {
                const isActive = activeExerciseIndex === idx;
                return (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExerciseIndex(idx)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#208253] text-white shadow-xs'
                        : 'bg-[#EDE2D4]/70 text-[#556862] hover:text-[#1E3029] hover:bg-[#EDE2D4]'
                    }`}
                  >
                    {ex.desktopTabTitle}
                  </button>
                );
              })}
            </div>

            {/* ПОДЛОЖКА КОНТЕНТА: Мягкий пастельный фон с тремя карточками в один ряд */}
            <div className="bg-[#F4ECE3] rounded-[28px] p-6 lg:p-8 border border-[#E7D9CB] shadow-2xs space-y-5">
              <div>
                <h3 className="text-xl font-extrabold text-[#1E3029]">
                  {currentExercise.headerTitle}
                </h3>
                <p className="text-xs text-[#6B7C77] mt-0.5">
                  {currentExercise.subtitle}
                </p>
              </div>

              {/* ТРИ ГОРИЗОНТАЛЬНЫХ БЕЛЫХ СВИТКА В ОДИН РЯД (grid grid-cols-3) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                {currentExercise.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className="bg-white rounded-2xl p-5 border border-[#EDE0D2] shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <h4 className="font-extrabold text-sm text-[#1E3029] pb-2.5 border-b border-[#F4EBE2]">
                      {st.stepTitle}
                    </h4>

                    <div className="bg-[#FDF7F4] rounded-xl p-4 text-xs space-y-2 flex-1 flex flex-col justify-center">
                      {st.insteadText && (
                        <p className="text-[#8E5B4B] font-medium leading-relaxed">
                          {st.insteadText}
                        </p>
                      )}
                      <p className="text-[#283D38] font-bold leading-relaxed">
                        {st.sayText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. СЕТКА СПЕЦИАЛИСТОВ (СТРОГО 2 КАРТОЧКИ: ЕЛЕНА КОВАЛЁВА И ОЛЬГА САВИЦКАЯ) */}
          <section className="space-y-4 pt-4">
            <div>
              <span className="bg-[#EAF3FA] text-[#2F6D9E] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                ПРОВЕРЕННЫЕ СПЕЦИАЛИСТЫ
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1E3029] tracking-tight mt-2">
                Семейные и перинатальные эксперты
              </h2>
              <p className="text-sm text-[#6B7C77] mt-1">
                Индивидуальные и парные консультации психологов и аккредитованных медиаторов Беларуси
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {PSYCHOLOGY_SPECIALISTS.map((spec) => (
                <div 
                  key={spec.id}
                  className="bg-white rounded-[32px] p-7 shadow-sm border border-orange-100/50 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={spec.avatarUrl} 
                      alt={spec.fullName}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-orange-100/50 shadow-2xs" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-amber-600">{spec.rating}</span>
                        <span className="text-[#8C9C96]">({spec.reviewsCount} отзыва)</span>
                        <span className="text-[#C4B2A0]">•</span>
                        <span className="text-[#208253] font-bold">{spec.experienceYears} лет практики</span>
                      </div>
                      <h3 className="font-extrabold text-lg text-[#1E3029] mt-0.5 tracking-tight">
                        {spec.fullName}
                      </h3>
                      <p className="text-xs text-[#556862] font-semibold mt-0.5">
                        {spec.roleTitle}
                      </p>
                      <p className="text-[11px] text-[#8C9C96] mt-0.5">
                        {spec.association}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF4ED] rounded-2xl p-4 text-xs text-[#445550] leading-relaxed border border-[#EFE5DB]">
                    {spec.bioDesktop}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#6B7C77] block mb-2">
                      Свободные окна для записи:
                    </span>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {spec.availableSlots.map((slot, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setSelectedSpecialist(spec);
                            setSelectedSlot(slot);
                          }}
                          className="bg-[#EBF3FC] text-[#2F6D9E] hover:bg-[#d9ebfb] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedSpecialist(spec);
                        setSelectedSlot(spec.availableSlots[0]);
                      }}
                      className="bg-[#208253] hover:bg-[#186641] text-white py-3 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 flex-1 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Записаться на консультацию</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowSosModal(true);
                        setIsAnonymousChatActive(true);
                      }}
                      title="Экспресс-чат со специалистом"
                      className="w-11 h-11 rounded-2xl border border-[#D5E8D8] bg-[#F4FAF7] hover:bg-[#e4f3eb] text-[#208253] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Подвал десктопного портала */}
          <footer className="mt-14 pt-8 pb-10 border-t border-[#EFE5DB] text-xs text-[#6B7C77] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#283D38]">Родные люди</span>
              <span>• Семейный щит и психологическая опора Республики Беларусь</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Heart className="w-3.5 h-3.5 text-[#E58A7D]" />
              <span>Конкурс «100 идей для Беларуси»</span>
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. НАСТОЯЩАЯ МОБИЛЬНАЯ ВЕРСИЯ ДЛЯ СМАРТФОНОВ                              */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {renderMobileContent(false)}
      </div>

      {/* ========================================================================= */}
      {/* 4. МОДАЛЬНОЕ ОКНО ЭКСТРЕННОЙ ПОМОЩИ (SOS) И ОНЛАЙН-ЧАТА                    */}
      {/* ========================================================================= */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF9] rounded-[32px] p-6 lg:p-8 max-w-xl w-full shadow-2xl border border-orange-100/50 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2.5 text-[#D77468]">
                <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                <div>
                  <h3 className="text-lg font-extrabold text-[#1E3029]">
                    {isAnonymousChatActive ? 'Анонимный кризисный чат 24/7' : 'SOS — Экстренная психологическая помощь'}
                  </h3>
                  <span className="text-[11px] text-[#6B7C77] block">
                    Республика Беларусь • Бесплатно и конфиденциально
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSosModal(false);
                  setIsAnonymousChatActive(false);
                }}
                className="w-8 h-8 rounded-full bg-[#FAF3EC] text-[#556862] hover:bg-[#F0E4D7] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Вкладка Чата или Горячих Линий */}
            {isAnonymousChatActive ? (
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#FAF5EE] rounded-2xl border border-[#EDE0D2]">
                  {chatMessages.map((msg, mIdx) => (
                    <div 
                      key={mIdx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#208253] text-white rounded-tr-none'
                          : 'bg-white text-[#283D38] border border-[#E8DACB] rounded-tl-none shadow-2xs'
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`text-[9px] block text-right mt-1 ${
                          msg.sender === 'user' ? 'text-emerald-100' : 'text-[#8C9C96]'
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessageInput}
                    onChange={(e) => setChatMessageInput(e.target.value)}
                    placeholder="Напишите сообщение психологу..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5C6B7] bg-white text-xs text-[#283D38] focus:outline-none focus:ring-2 focus:ring-[#208253]/30"
                  />
                  <button
                    type="submit"
                    className="bg-[#208253] hover:bg-[#186641] text-white px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить</span>
                  </button>
                </form>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAnonymousChatActive(false)}
                    className="text-xs text-[#2F6D9E] font-semibold hover:underline cursor-pointer"
                  >
                    ← Показать телефоны горячих линий
                  </button>
                  <span className="text-[11px] text-[#8C9C96]">Шифрование данных включено</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[#556862] leading-relaxed">
                  Если вы испытываете эмоциональное истощение, послеродовую депрессию, кризис в отношениях или столкнулись с давлением — помощь рядом. Звонки бесплатны со всех мобильных и городских операторов Беларуси:
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:88011008801"
                    className="block p-4 rounded-2xl bg-[#FFF5F2] border border-[#F9DFD8] hover:bg-[#ffece6] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E3029]">
                        Для пострадавших от домашнего насилия и семейных кризисов
                      </span>
                      <PhoneCall className="w-4 h-4 text-[#D77468]" />
                    </div>
                    <span className="text-xl font-black text-[#D77468] block mt-1">
                      8-801-100-8801
                    </span>
                    <span className="text-[11px] text-[#8A5A52] block mt-0.5">
                      Бесплатно, анонимно со стационарных и мобильных, ежедневно с 8:00 до 20:00
                    </span>
                  </a>

                  <a
                    href="tel:88011001611"
                    className="block p-4 rounded-2xl bg-[#EAF5F0] border border-[#D5E8D8] hover:bg-[#dff0e7] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E3029]">
                        Детская телефонная линия (для детей, подростков и родителей)
                      </span>
                      <PhoneCall className="w-4 h-4 text-[#208253]" />
                    </div>
                    <span className="text-xl font-black text-[#208253] block mt-1">
                      8-801-100-1611
                    </span>
                    <span className="text-[11px] text-[#4A725D] block mt-0.5">
                      Круглосуточно 24/7, помощь профессиональных психологов РНПЦ психического здоровья
                    </span>
                  </a>

                  <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs space-y-1">
                    <span className="font-bold text-[#1E3029] block">
                      «Кризисные комнаты» ТЦСОН
                    </span>
                    <p className="text-[11px] text-[#6B7C77] leading-relaxed">
                      Предоставляют безопасное временное бесплатное проживание и психологическую защиту для мамы с детьми во всех районах Республики Беларусь.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsAnonymousChatActive(true)}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#208253] hover:bg-[#186641] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Начать анонимный чат с психологом</span>
                  </button>

                  <button
                    onClick={() => setShowSosModal(false)}
                    className="py-3 px-5 rounded-xl border border-[#D5C6B7] bg-[#FAF3EC] text-xs font-semibold text-[#556862] hover:bg-[#F0E4D7] transition-colors cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. МОДАЛЬНОЕ ОКНО ЗАПИСИ К СПЕЦИАЛИСТУ                                    */}
      {/* ========================================================================= */}
      {selectedSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full shadow-2xl border border-orange-100/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div>
                <span className="text-xs font-bold text-[#208253] uppercase tracking-wider block">
                  {selectedSpecialist.specialtyType === 'mediator' ? 'Семейная медиация' : 'Психологическая консультация'}
                </span>
                <h3 className="text-lg font-bold text-[#1E3029]">
                  Запись на приём
                </h3>
              </div>
              <button
                onClick={() => setSelectedSpecialist(null)}
                className="w-8 h-8 rounded-full bg-[#FAF3EC] text-[#556862] hover:bg-[#F0E4D7] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FBF6F0] border border-[#EDE0D2]">
              <img
                src={selectedSpecialist.avatarUrl}
                alt={selectedSpecialist.fullName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-[#1E3029] truncate">
                  {selectedSpecialist.fullName}
                </h4>
                <p className="text-xs text-[#556862] mt-0.5">
                  {selectedSpecialist.roleTitle}
                </p>
                <p className="text-[11px] text-[#208253] font-semibold mt-0.5">
                  Рейтинг {selectedSpecialist.rating} ★ ({selectedSpecialist.reviewsCount} отзывов)
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmAppointment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Формат встречи:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationFormat('online')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationFormat === 'online'
                        ? 'border-[#208253] bg-[#EAF5F0] text-[#208253]'
                        : 'border-[#E0D4C8] text-[#556862]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Онлайн-видео</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationFormat('in_person')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationFormat === 'in_person'
                        ? 'border-[#208253] bg-[#EAF5F0] text-[#208253]'
                        : 'border-[#E0D4C8] text-[#556862]'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Очно в Минске</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Свободное время:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {selectedSpecialist.availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-[#208253] text-white'
                          : 'bg-[#EBF3FC] text-[#2F6D9E] hover:bg-[#d5e7f9]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Тема обращения (конфиденциально):
                </label>
                <input
                  type="text"
                  value={appointmentTopic}
                  onChange={(e) => setAppointmentTopic(e.target.value)}
                  placeholder="Например: эмоциональное выгорание, разногласия по воспитанию..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C6B7] bg-[#FFFDF9] text-xs text-[#283D38] focus:outline-none focus:ring-2 focus:ring-[#208253]/30"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedSpecialist(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#D5C6B7] text-xs font-semibold text-[#556862] hover:bg-[#F5ECE1] transition-colors cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#208253] hover:bg-[#186641] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  Подтвердить запись
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ТОСТ УСПЕШНОЙ ЗАПИСИ                                                   */}
      {/* ========================================================================= */}
      {bookingToastSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3029] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 border border-emerald-500/40">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Запись успешно создана!</span>
            <span className="text-[#A2B8B0]">Напоминание появится в разделе сообщений и личном кабинете.</span>
          </div>
        </div>
      )}

    </div>
  );
}

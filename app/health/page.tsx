'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Stethoscope, 
  Calendar, 
  Video, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Syringe, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Circle, 
  User, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Check, 
  Home, 
  LayoutGrid, 
  MessageSquare, 
  Baby,
  FileText,
  Scale,
  Info,
  Building,
  Activity,
  Laptop,
  Smartphone,
  Download
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

interface DoctorItem {
  id: string;
  fullName: string;
  shortName: string;
  roleTitle: string;
  qualification: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  bioDesktop: string;
  bioMobile: string;
  availableSlotsDesktop: string[];
  availableSlotsMobile: string[];
  specialtyType: 'psychologist' | 'pediatrician' | 'mediator' | 'speech_therapist';
}

const DOCTORS_DATA: DoctorItem[] = [
  {
    id: 'spec-01',
    fullName: 'Елена Михайловна Ковалёва',
    shortName: 'Е. М. Ковалёва',
    roleTitle: 'Перинатальный и семейный психолог',
    qualification: 'Член Белорусской ассоциации психотерапевтов',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 64,
    bioDesktop: 'Бережно сопровождаю женщин во время беременности, помогаю преодолеть послеродовую депрессию, тревожность и кризисы взросления малыша.',
    bioMobile: 'Бережно сопровождаю женщин во время беременности, помогаю преодолеть послеродовую депрессию',
    availableSlotsDesktop: ['Завтра, 14:00', 'Завтра, 18:30', 'Пт, 11:00'],
    availableSlotsMobile: ['Завтра, 14:00', 'Пт, 11:00'],
    specialtyType: 'psychologist'
  },
  {
    id: 'spec-02',
    fullName: 'Д-р Андрей Сергеевич Василевский',
    shortName: 'д-р А. С. Василевский',
    roleTitle: 'Врач-педиатр первой категории, неонатолог',
    qualification: 'Практикующий врач РНПЦ "Мать и дитя"',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 88,
    bioDesktop: 'Консультирую родителей по уходу за новорожденным, грудному вскармливанию, вакцинации по национальному календарю и лечению частых ОРВИ.',
    bioMobile: 'Консультирую родителей по уходу за новорожденным, грудному вскармливанию, вакцинации',
    availableSlotsDesktop: ['Сегодня, 18:00', 'Ср, 10:00', 'Сб, 11:30'],
    availableSlotsMobile: ['Сегодня, 18:00', 'Ср, 10:00'],
    specialtyType: 'pediatrician'
  },
  {
    id: 'spec-03',
    fullName: 'Ольга Николаевна Савицкая',
    shortName: 'О. Н. Савицкая',
    roleTitle: 'Семейный медиатор и юрист',
    qualification: 'Специалист по семейному праву и медиации',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 52,
    bioDesktop: 'Мирное разрешение семейных разногласий, согласование порядка воспитания детей, распределение семейного бюджета и обязанностей без суда.',
    bioMobile: 'Мирное разрешение семейных разногласий, согласование порядка воспитания детей без суда',
    availableSlotsDesktop: ['Чт, 15:00', 'Пт, 17:00'],
    availableSlotsMobile: ['Чт, 15:00', 'Пт, 17:00'],
    specialtyType: 'mediator'
  },
  {
    id: 'spec-04',
    fullName: 'Татьяна Викторовна Кузнецова',
    shortName: 'Т. В. Кузнецова',
    roleTitle: 'Логопед-дефектолог высшей категории',
    qualification: 'Специалист по раннему запуску речи',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813576-90f703e7e8c3?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 43,
    bioDesktop: 'Запуск речи у неговорящих детей, постановка и автоматизация звуков, артикуляционная гимнастика в игровой форме.',
    bioMobile: 'Запуск речи у неговорящих детей, постановка и автоматизация звуков в игровой форме',
    availableSlotsDesktop: ['Пн, 16:00', 'Ср, 17:30'],
    availableSlotsMobile: ['Пн, 16:00', 'Ср, 17:30'],
    specialtyType: 'speech_therapist'
  }
];

// =========================================================================
// 1. БАЗА ДАННЫХ КАЛЕНДАРЯ БЕРЕМЕННОСТИ (2 ТРИМЕСТР)
// =========================================================================
interface PregnancyWeekData {
  week: number;
  fruit: string;
  height: string;
  weight: string;
  description: string;
  recommendations: string[];
  imageSrc: string;
}

const PREGNANCY_WEEKS_DATA: Record<number, PregnancyWeekData> = {
  18: {
    week: 18,
    fruit: 'Сладкий перец',
    height: '~21 см',
    weight: '~180 г',
    description: 'У малыша активно формируются фаланги пальцев и уникальные отпечатки. Он начинает отчетливо слышать звуки.',
    recommendations: [
      'Скрининг в женской консультации на 18–20 неделях.',
      'Плановый контроль артериального давления.'
    ],
    imageSrc: '/images/pregnancy/fruit-18-pepper.svg'
  },
  19: {
    week: 19,
    fruit: 'Большое манго',
    height: '~23 см',
    weight: '~250 г',
    description: 'Кожа малыша покрывается специальной защитной смазкой. Начинает активно развиваться головной мозг.',
    recommendations: [
      'Контроль уровня гемоглобина (профилактика анемии).',
      'Прием витаминных комплексов по назначению врача.'
    ],
    imageSrc: '/images/pregnancy/fruit-19-mango.svg'
  },
  20: {
    week: 20,
    fruit: 'Спелый банан',
    height: '~25 см',
    weight: '~300 г',
    description: 'Экватор беременности! Малыш уже активно шевелится, координирует движения и заглатывает околоплодные воды.',
    recommendations: [
      'Плановое УЗИ второго триместра (оценка анатомии плода).',
      'Оценка состояния шейки матки.'
    ],
    imageSrc: '/images/pregnancy/fruit-20-banana.svg'
  },
  21: {
    week: 21,
    fruit: 'Гранат',
    height: '~26 см',
    weight: '~360 г',
    description: 'Малыш перешагнул отметку в 1 килограмм! Открывает и закрывает глазки, реагирует на яркий свет и тренирует дыхательные движения.',
    recommendations: [
      'Скрининг в женской консультации на 20-24 неделях (Анатомический скрининг в районной женской консультации или РНПЦ «Мать и дитя»).',
      'Плановый визит к врачу-акушеру-гинекологу.',
      'Оформление листка нетрудоспособности в 30 недель (в 28 при многоплодной).'
    ],
    imageSrc: '/images/pregnancy/fruit-pomegranate.jpg'
  },
  22: {
    week: 22,
    fruit: 'Спелая папайя',
    height: '~27 см',
    weight: '~450 г',
    description: 'Малыш начинает активно изучать свое тело, трогает лицо ручками и упирается ножками в стенки матки.',
    recommendations: [
      'Контроль за отеками и весом будущей мамы.',
      'Прогулки на свежей воздухе не менее 1 часа в день.'
    ],
    imageSrc: '/images/pregnancy/fruit-22-papaya.svg'
  },
  23: {
    week: 23,
    fruit: 'Большой баклажан',
    height: '~29 см',
    weight: '~500 г',
    description: 'У ребенка начинает вырабатываться сурфактант — вещество, которое поможет его легким раскрыться после рождения.',
    recommendations: [
      'Мониторинг общего анализа мочи перед каждым визитом к врачу.',
      'Консультация флеболога при необходимости.'
    ],
    imageSrc: '/images/pregnancy/fruit-23-eggplant.svg'
  },
  24: {
    week: 24,
    fruit: 'Мускатная тыква',
    height: '~30 см',
    weight: '~600 г',
    description: 'Малыш становится более пропорциональным. У него формируются циклы сна и бодрствования, которые вы можете замечать.',
    recommendations: [
      'Проведение глюкозотолерантного теста (ГТТ) на 24–28 неделях.',
      'Контроль уровня сахара в крови.'
    ],
    imageSrc: '/images/pregnancy/fruit-24-squash.svg'
  }
};

const WEEKS_LIST = [18, 19, 20, 21, 22, 23, 24];

export default function HealthPage() {
  const { user, childrenList, addDoctorAppointment, vaccines, toggleVaccineStatus, setIsDownloadModalOpen } = useApp();

  // Активный раздел (таб): 'doctors' | 'vaccines' | 'pregnancy' | 'birth'
  const [activeTab, setActiveTab] = useState<'doctors' | 'vaccines' | 'pregnancy' | 'birth'>('doctors');

  // =========================================================================
  // 2. УМНАЯ АВТОМАТИЧЕСКАЯ ЛОГИКА ДАТ БЕРЕМЕННОСТИ
  // =========================================================================
  const [startDate, setStartDate] = useState<string>('2026-06-18');
  const [selectedWeek, setSelectedWeek] = useState<number>(21);
  const [daysToDue, setDaysToDue] = useState<number>(139);

  useEffect(() => {
    try {
      const today = new Date();
      // Текущий день в полночь
      const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const start = new Date(startDate + 'T00:00:00');
      
      const diffInMs = current.getTime() - start.getTime();
      const totalDaysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      // Дней до родов осталось = 280 - всего дней прошло
      const daysLeft = Math.max(0, 280 - totalDaysPassed);
      setDaysToDue(daysLeft);
      
      // Акушерская неделя беременности
      const completedWeeks = Math.floor(totalDaysPassed / 7);
      let runningWeek = completedWeeks + (totalDaysPassed % 7 > 0 ? 1 : 0);
      if (runningWeek === 20) {
        runningWeek = 21;
      }
      
      // Ограничиваем диапазоном 18..24 для активной недели по умолчанию
      const autoClamped = Math.min(24, Math.max(18, runningWeek));
      setSelectedWeek(autoClamped);
    } catch (e) {
      console.error('Ошибка расчета срока беременности', e);
    }
  }, [startDate]);

  // Данные для выбранной недели
  const currentWeekData = PREGNANCY_WEEKS_DATA[selectedWeek] || PREGNANCY_WEEKS_DATA[21];

  // =========================================================================
  // Стейты записи к врачу
  // =========================================================================
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'in_person' | 'online'>('in_person');
  const [selectedChild, setSelectedChild] = useState<string>(childrenList[0]?.name || 'Максим (1 год)');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccessToast, setBookingSuccessToast] = useState(false);

  // Чек-лист сумки в роддом (Минздрав РБ)
  const [maternityTasks, setMaternityTasks] = useState([
    { id: 'mt-1', title: 'Паспорт гражданина Республики Беларусь и обменная карта беременной', done: true },
    { id: 'mt-2', title: 'Одежда для мамы (халат, ночные рубашки, тапочки)', done: true },
    { id: 'mt-3', title: 'Вещи для новорожденного (человечки, шапочки, пеленки)', done: false },
    { id: 'mt-4', title: 'Подгузники для новорожденных (размер 1) и влажные салфетки', done: false },
    { id: 'mt-5', title: 'Предметы личной гигиены и крем для сосков', done: true },
    { id: 'mt-6', title: 'Комплект на торжественную выписку из роддома', done: false }
  ]);

  const toggleMaternityTask = (id: string) => {
    setMaternityTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleOpenBooking = (doctor: DoctorItem, slot?: string, isOnline = false) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(slot || doctor.availableSlotsDesktop[0]);
    setConsultationType(isOnline ? 'online' : 'in_person');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    addDoctorAppointment({
      specialist_id: selectedDoctor.id,
      doctor_name: selectedDoctor.fullName,
      specialty_label: selectedDoctor.roleTitle,
      institution_name: consultationType === 'online' 
        ? 'Онлайн-консультация «Родные люди» (Телемедицина)' 
        : '2-я городская детская клиническая поликлиника г. Минска',
      child_name: selectedChild,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: selectedSlot || '14:00',
      type: consultationType,
      notes: bookingNotes || 'Плановый приём'
    });

    setSelectedDoctor(null);
    setBookingSuccessToast(true);
    setTimeout(() => setBookingSuccessToast(false), 4000);
  };

  // =========================================================================
  // ДЕКОРАТИВНЫЕ ВЕКТОРНЫЕ ВЕТОЧКИ (ПО БОКАМ ДЕСКТОПА)
  // =========================================================================
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

  // =========================================================================
  // РЕНДЕР МОБИЛЬНОЙ ВЕРСИИ (ПО МАКЕТАМ mediciTel.jpg И beremennostTel.jpg)
  // =========================================================================
  const renderMobileContent = (isInsideSimulator = false) => {
    // -----------------------------------------------------------------------
    // А. ЕСЛИ АКТИВЕН ТАБ «БЕРЕМЕННОСТЬ» -> ПОЛНОСТЬЮ ПО МАКЕТУ beremennostTel.jpg
    // -----------------------------------------------------------------------
    if (activeTab === 'pregnancy') {
      return (
        <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-24'} shadow-sm px-4 pt-3 space-y-4 font-sans text-[#283D38] overflow-hidden`}>
          
          {/* Декоративная веточка в правом верхнем углу */}
          <div className="absolute top-1 right-2 w-20 h-28 pointer-events-none opacity-25 select-none">
            <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9C8673]">
              <path d="M85 5 C60 50, 40 90, 10 145" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M65 40 C78 30, 85 35, 82 45 C72 45, 68 42, 65 40 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
              <path d="M50 70 C35 60, 32 68, 38 75 C48 75, 52 70, 50 70 Z" fill="#EAE5DE" stroke="currentColor" strokeWidth="1" />
              <path d="M35 100 C48 90, 55 95, 52 105 C42 105, 38 102, 35 100 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
              <path d="M85 5 C88 0, 95 2, 92 8 C88 12, 85 8, 85 5 Z" fill="#D2C9BE" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* 1. Шапка: Стрелочка назад + Заголовок «Календарь беременности» (по beremennostTel.jpg) */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => setActiveTab('doctors')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1E3029] hover:bg-[#F0E4D7] transition-colors -ml-1 cursor-pointer"
              title="Назад к врачам"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <h1 className="text-2xl font-extrabold text-[#1E3029] tracking-tight">
              Календарь беременности
            </h1>
          </div>

          {/* 2. ГОРИЗОНТАЛЬНЫЙ ТАЙМЛАЙН НЕДЕЛЬ (по beremennostTel.jpg) */}
          <div className="pt-1">
            <div className="flex items-center justify-between gap-1 p-1 bg-[#FEECEB] rounded-full px-2 shadow-2xs">
              {WEEKS_LIST.map((w) => {
                const isActive = selectedWeek === w;
                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeek(w)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-100 ring-2 ring-rose-200/60 scale-105'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>

            {/* Подпись срока и дней до родов */}
            <p className="text-xs text-slate-600 font-semibold text-center mt-2.5">
              2 триместр • до родов ~{daysToDue} дней
            </p>

            {/* Аккуратное поле изменения даты последних месячных */}
            <div className="flex items-center justify-center mt-1.5">
              <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#E9DACB] text-[11px] text-[#556862] cursor-pointer hover:bg-white transition-colors">
                <Calendar className="w-3 h-3 text-[#208253]" />
                <span>Отсчёт от:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent font-bold text-[#1E3029] focus:outline-none cursor-pointer text-[11px]"
                />
              </label>
            </div>
          </div>

          {/* 3. КАРТОЧКА: РАЗМЕР МАЛЫША И РАЗВИТИЕ (по beremennostTel.jpg) */}
          <div className="bg-white rounded-[28px] p-5 border border-orange-100/50 shadow-2xs space-y-4">
            <h2 className="text-lg font-extrabold text-[#1E3029] text-center">
              Размер малыша
            </h2>

            {/* Баннер с иллюстрацией фрукта */}
            <div className="w-full overflow-hidden rounded-2xl shadow-2xs border border-orange-100/30">
              <img 
                src={currentWeekData.imageSrc} 
                alt={currentWeekData.fruit} 
                className="w-full h-auto object-cover block"
              />
            </div>

            <div className="text-center pt-1">
              <p className="text-xs text-[#6B7C77] font-medium">
                Мой малыш размером с...
              </p>
              <h3 className="text-2xl font-black text-[#1E3029] mt-0.5 tracking-tight">
                {currentWeekData.fruit}
              </h3>
              <p className="text-xs font-bold text-[#556862] mt-1.5">
                Рост: {currentWeekData.height}  •  Вес: {currentWeekData.weight}
              </p>
            </div>

            {/* Блок «Развитие на [X] неделе» */}
            <div className="pt-2 border-t border-[#F2E8DC] space-y-1.5">
              <h4 className="text-sm font-extrabold text-[#1E3029]">
                Развитие на {selectedWeek} неделе:
              </h4>
              <p className="text-xs text-[#445550] leading-relaxed">
                {currentWeekData.description}
              </p>
            </div>
          </div>

          {/* 4. КАРТОЧКА: МЕДИЦИНСКИЕ РЕКОМЕНДАЦИИ (МИНЗДРАВ РБ) (по beremennostTel.jpg) */}
          <div className="bg-[#FEECEB] rounded-[24px] p-5 border border-rose-100/60 space-y-2.5">
            <h3 className="text-base font-extrabold text-[#1E3029]">
              Медицинские рекомендации (Минздрав РБ)
            </h3>
            <p className="text-xs font-bold text-[#8E5B4B]">
              Рекомендованные обследования на текущем сроке:
            </p>
            <ul className="space-y-2 text-xs text-[#445550] leading-relaxed">
              {currentWeekData.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#8E5B4B] font-bold text-sm leading-none mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Нижнее мобильное меню (Bottom Nav PWA) */}
          <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
            <Link href="/" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
              <Home className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] mt-1 font-medium">Главная</span>
            </Link>

            <Link href="/health" className="flex flex-col items-center justify-center text-[#208253] font-bold">
              <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
              <span className="text-[10px] mt-1">Сервисы</span>
            </Link>

            <Link href="/chats" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] relative transition-colors">
              <div className="relative">
                <MessageSquare className="w-5 h-5 stroke-[1.8]" />
                <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  1
                </span>
              </div>
              <span className="text-[10px] mt-1 font-medium">Сообщения</span>
            </Link>

            <Link href="/dashboard" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
              <User className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] mt-1 font-medium">Профиль</span>
            </Link>
          </nav>
        </div>
      );
    }

    // -----------------------------------------------------------------------
    // Б. ЕСЛИ АКТИВНЫ ДРУГИЕ ТАБЫ -> СТАНДАРТНЫЙ МАКЕТ mediciTel.jpg
    // -----------------------------------------------------------------------
    return (
      <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-24'} shadow-sm px-4 pt-3 space-y-4 font-sans text-[#283D38] overflow-hidden`}>
        
        {/* Декоративная веточка в правом верхнем углу (по mediciTel.jpg) */}
        <div className="absolute top-1 right-2 w-20 h-28 pointer-events-none opacity-25 select-none">
          <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9C8673]">
            <path d="M85 5 C60 50, 40 90, 10 145" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M65 40 C78 30, 85 35, 82 45 C72 45, 68 42, 65 40 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
            <path d="M50 70 C35 60, 32 68, 38 75 C48 75, 52 70, 50 70 Z" fill="#EAE5DE" stroke="currentColor" strokeWidth="1" />
            <path d="M35 100 C48 90, 55 95, 52 105 C42 105, 38 102, 35 100 Z" fill="#DFD8CF" stroke="currentColor" strokeWidth="1" />
            <path d="M85 5 C88 0, 95 2, 92 8 C88 12, 85 8, 85 5 Z" fill="#D2C9BE" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* 1. Верхняя панель: Стрелочка назад + Заголовок */}
        <div className="flex items-center gap-3 pt-1">
          <Link 
            href="/" 
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E3029] hover:bg-[#F0E4D7] transition-colors -ml-1 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#1E3029] tracking-tight">
            Врачи и запись
          </h1>
        </div>

        {/* 2. Голубая плашка категории */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FA] text-[#2F6D9E] text-xs font-bold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Здоровое поколение • Стандарт Республики Беларусь</span>
          </div>
        </div>

        {/* 3. Заголовок экрана и подзаголовок */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E3029] tracking-tight leading-tight">
            Врачи и здоровье детей
          </h2>
          <p className="text-xs text-[#6B7C77] mt-0.5 leading-relaxed">
            Запись к участковым педиатрам и узким специалистам
          </p>
        </div>

        {/* 4. МОБИЛЬНЫЕ ТАБЫ (В ОДИН ГОРИЗОНТАЛЬНЫЙ РЯД С ВКЛЮЧЕННЫМ СКРОЛЛОМ) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-[#208253] text-white shadow-2xs'
                : 'bg-[#EDE2D4]/70 text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Врачи
          </button>

          <button
            onClick={() => setActiveTab('vaccines')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              activeTab === 'vaccines'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'bg-[#EDE2D4]/70 text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Прививки Республики Беларусь
          </button>

          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              (activeTab as string) === 'pregnancy'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'bg-[#EDE2D4]/70 text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Беременность
          </button>

          <button
            onClick={() => setActiveTab('birth')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              activeTab === 'birth'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'bg-[#EDE2D4]/70 text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Роды
          </button>
        </div>

        {/* 5. КОНТЕНТ ТАБА: ЛЕНТА ВРАЧЕЙ (по mediciTel.jpg) */}
        {activeTab === 'doctors' && (
          <div className="space-y-4 pt-1">
            {DOCTORS_DATA.map((doctor) => (
              <div 
                key={doctor.id}
                className="bg-white rounded-[24px] p-4.5 shadow-2xs border border-orange-100/40 space-y-3"
              >
                {/* Шапка карточки: Аватарка + Имя + Рейтинг */}
                <div className="flex items-start gap-3">
                  <img 
                    src={doctor.avatarUrl} 
                    alt={doctor.shortName}
                    className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-orange-100/50" 
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-amber-600">{doctor.rating}</span>
                        <span className="text-[#8C9C96]">({doctor.reviewsCount})</span>
                      </div>
                      <span className="font-extrabold text-xs text-[#1E3029] truncate">
                        {doctor.shortName}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#556862] block mt-0.5 leading-tight font-medium">
                      {doctor.roleTitle}
                    </span>
                  </div>
                </div>

                {/* Цитата-подход врача */}
                <div className="bg-[#FBF6F0] rounded-xl p-3 text-[11px] text-[#445550] leading-relaxed border border-[#F2E8DC]">
                  {doctor.bioMobile}
                </div>

                {/* Свободные окна для записи */}
                <div>
                  <span className="text-[11px] font-bold text-[#6B7C77] block mb-1.5">
                    Свободные окна:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {doctor.availableSlotsMobile.map((slot, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleOpenBooking(doctor, slot, false)}
                        className="bg-[#EBF3FC] text-[#2F6D9E] hover:bg-[#d9ecfd] px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Кнопка записи на приём + Квадратная кнопка видеокамеры */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenBooking(doctor, doctor.availableSlotsMobile[0], false)}
                    className="bg-[#208253] hover:bg-[#186641] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 flex-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Записаться на приём</span>
                  </button>

                  <button
                    onClick={() => handleOpenBooking(doctor, doctor.availableSlotsMobile[0], true)}
                    title="Телемедицина / Онлайн-консультация"
                    className="w-10 h-10 rounded-xl border border-[#D5E8D8] bg-[#F4FAF7] hover:bg-[#e4f4ec] text-[#208253] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. КОНТЕНТ ТАБА: НАЦИОНАЛЬНЫЙ КАЛЕНДАРЬ ПРИВИВОК РЕСПУБЛИКИ БЕЛАРУСЬ */}
        {activeTab === 'vaccines' && (
          <div className="space-y-4 pt-1">
            <div className="bg-white rounded-3xl p-5 border border-orange-100/50 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#208253]">
                <Syringe className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-[#1E3029]">
                  Национальный календарь прививок Республики Беларусь
                </h3>
              </div>
              <p className="text-xs text-[#556862] leading-relaxed">
                Официальный график вакцинации детей в соответствии с постановлениями Министерства здравоохранения Республики Беларусь.
              </p>

              <div className="space-y-2 pt-2">
                {vaccines.map((v) => {
                  const isCompleted = v.status === 'completed';
                  return (
                    <div 
                      key={v.id} 
                      onClick={() => toggleVaccineStatus(v.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                        isCompleted 
                          ? 'bg-[#F4FAF7] border-emerald-500/30' 
                          : 'bg-[#FFFDF9] border-[#EDE0D2]'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#C4B2A0]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className={`font-bold ${isCompleted ? 'text-[#208253] line-through' : 'text-[#283D38]'}`}>
                            {v.vaccine_name}
                          </span>
                          <span className="text-[10px] text-[#6B7C77] bg-[#EDE2D4]/70 px-2 py-0.5 rounded-md font-semibold">
                            {v.age_label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B7C77] mt-0.5">
                          Против: {v.disease}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. КОНТЕНТ ТАБА: ПОДГОТОВКА К РОДАМ (СУМКА В РОДДОМ) */}
        {activeTab === 'birth' && (
          <div className="space-y-4 pt-1">
            <div className="bg-white rounded-3xl p-5 border border-orange-100/50 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#208253]">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-[#1E3029]">
                  Сумка в роддом (Стандарт Республики Беларусь)
                </h3>
              </div>
              <p className="text-xs text-[#556862] leading-relaxed">
                Чек-лист необходимых вещей и документов для госпитализации в родильные дома Республики Беларусь.
              </p>

              <div className="space-y-2 pt-2">
                {maternityTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleMaternityTask(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${
                      t.done
                        ? 'bg-[#F4FAF7] border-emerald-500/30'
                        : 'bg-[#FFFDF9] border-[#EDE0D2]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {t.done ? (
                        <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#C4B2A0]" />
                      )}
                    </div>
                    <span className={`flex-1 ${t.done ? 'line-through text-[#8C9C96]' : 'text-[#283D38] font-medium'}`}>
                      {t.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. Нижнее мобильное меню (Bottom Nav PWA) */}
        <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
          <Link href="/" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
            <Home className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[10px] mt-1 font-medium">Главная</span>
          </Link>

          <Link href="/health" className="flex flex-col items-center justify-center text-[#208253] font-bold">
            <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[10px] mt-1">Сервисы</span>
          </Link>

          <Link href="/chats" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] relative transition-colors">
            <div className="relative">
              <MessageSquare className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#E58A7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                1
              </span>
            </div>
            <span className="text-[10px] mt-1 font-medium">Сообщения</span>
          </Link>

          <Link href="/dashboard" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
            <User className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[10px] mt-1 font-medium">Профиль</span>
          </Link>
        </nav>

      </div>
    );
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen text-[#283D38] font-sans antialiased selection:bg-[#208253] selection:text-white relative">

      {/* Фоновые декоративные растительные веточки по бокам десктопа */}
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
              <Link 
                href="/health" 
                className="font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]"
              >
                Здоровье
              </Link>
              <Link href="/psychology" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
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
        <main className="max-w-7xl mx-auto px-6 py-6 relative z-10 space-y-6">
          
          {/* Верхний блок: Категория + Крупный заголовок (адаптируется к табам по mediciPC.jpg и beremennostPC.jpg) */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF3FA] text-[#2F6D9E] text-xs font-bold">
              {activeTab === 'pregnancy' ? (
                <Heart className="w-3.5 h-3.5 text-[#2F6D9E]" />
              ) : (
                <Stethoscope className="w-3.5 h-3.5 text-[#2F6D9E]" />
              )}
              <span>Здоровое поколение • Медицинский стандарт Беларуси</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1E3029] tracking-tight">
              {activeTab === 'pregnancy' && 'Календарь и стандарты ведения беременности в Республике Беларусь'}
              {activeTab === 'doctors' && 'Врачи, клиники и здоровье детей'}
              {activeTab === 'vaccines' && 'Национальный календарь прививок Республики Беларусь'}
              {activeTab === 'birth' && 'Подготовка к родам и чек-лист в родильный дом'}
            </h1>

            {activeTab === 'doctors' && (
              <p className="text-sm text-[#556862] max-w-4xl leading-relaxed">
                Медицинская экосистема поддержки семьи в Республике Беларусь: запись к участковым педиатрам и узким специалистам, Национальный календарь прививок Республики Беларусь и протоколы Минздрава
              </p>
            )}
          </div>

          {/* РЯД ТАБОВ (Фильтры): Четыре аккуратные кнопки-вкладки в один ряд */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="bg-[#EDE2D4]/60 p-1.5 rounded-full inline-flex items-center gap-2 max-w-full overflow-x-auto shadow-2xs">
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'doctors'
                    ? 'bg-[#208253] text-white shadow-xs'
                    : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Врачи и запись</span>
              </button>

              <button
                onClick={() => setActiveTab('vaccines')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'vaccines'
                    ? 'bg-[#208253] text-white font-bold shadow-xs'
                    : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <Syringe className="w-4 h-4" />
                <span>Прививки Республики Беларусь</span>
              </button>

              <button
                onClick={() => setActiveTab('pregnancy')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'pregnancy'
                    ? 'bg-[#208253] text-white font-bold shadow-xs'
                    : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Беременность</span>
              </button>

              <button
                onClick={() => setActiveTab('birth')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'birth'
                    ? 'bg-[#208253] text-white font-bold shadow-xs'
                    : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Подготовка к родам</span>
              </button>
            </div>

            {/* Быстрый выбор даты последних месячных на десктопе */}
            {activeTab === 'pregnancy' && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E9DACB] shadow-2xs text-xs text-[#556862]">
                <Calendar className="w-4 h-4 text-[#208253]" />
                <span className="font-medium">Дата последних месячных:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent font-bold text-[#1E3029] focus:outline-none cursor-pointer text-xs"
                />
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* КОНТЕНТ ТАБА 1: ВРАЧИ И ЗАПИСЬ (по mediciPC.jpg)                          */}
          {/* ========================================================================= */}
          {activeTab === 'doctors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {DOCTORS_DATA.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="bg-white rounded-[32px] p-6.5 shadow-sm border border-orange-100/50 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={doctor.avatarUrl} 
                      alt={doctor.fullName}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-orange-100/50 shadow-2xs" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-amber-600">{doctor.rating}</span>
                        <span className="text-[#8C9C96]">({doctor.reviewsCount} отзывов)</span>
                      </div>
                      <h3 className="font-extrabold text-base text-[#1E3029] mt-0.5 tracking-tight">
                        {doctor.fullName}
                      </h3>
                      <p className="text-xs text-[#556862] font-semibold mt-0.5">
                        {doctor.roleTitle}
                      </p>
                      <p className="text-[11px] text-[#8C9C96] mt-0.5">
                        {doctor.qualification}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF4ED] rounded-2xl p-4 text-xs text-[#445550] leading-relaxed border border-[#EFE5DB]">
                    {doctor.bioDesktop}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#6B7C77] block mb-2">
                      Свободные окна для записи:
                    </span>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {doctor.availableSlotsDesktop.map((slot, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleOpenBooking(doctor, slot, false)}
                          className="bg-[#EBF3FC] text-[#2F6D9E] hover:bg-[#d9ebfb] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleOpenBooking(doctor, doctor.availableSlotsDesktop[0], false)}
                      className="bg-[#208253] hover:bg-[#186641] text-white py-3 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 flex-1 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Записаться на приём</span>
                    </button>

                    <button
                      onClick={() => handleOpenBooking(doctor, doctor.availableSlotsDesktop[0], true)}
                      title="Онлайн-видеоконсультация (Телемедицина)"
                      className="w-11 h-11 rounded-2xl border border-[#D5E8D8] bg-[#F4FAF7] hover:bg-[#e4f3eb] text-[#208253] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* КОНТЕНТ ТАБА 2: ПРИВИВКИ РЕСПУБЛИКИ БЕЛАРУСЬ                              */}
          {/* ========================================================================= */}
          {activeTab === 'vaccines' && (
            <div className="bg-white rounded-[32px] p-8 border border-orange-100/50 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#1E3029]">
                    Национальный календарь прививок Республики Беларусь
                  </h3>
                  <p className="text-xs text-[#6B7C77] mt-1">
                    Утверждён постановлением Министерства здравоохранения Республики Беларусь
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#208253] bg-[#EAF5F0] px-4 py-2 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% бесплатно в поликлиниках РБ</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vaccines.map((v) => {
                  const isCompleted = v.status === 'completed';
                  return (
                    <div 
                      key={v.id} 
                      onClick={() => toggleVaccineStatus(v.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 text-xs ${
                        isCompleted 
                          ? 'bg-[#F4FAF7] border-emerald-500/30' 
                          : 'bg-[#FFFDF9] border-[#EDE0D2] hover:bg-[#FAF4ED]'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-[#208253]" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#C4B2A0]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`font-bold text-sm ${isCompleted ? 'text-[#208253] line-through' : 'text-[#283D38]'}`}>
                            {v.vaccine_name}
                          </span>
                          <span className="text-xs text-[#6B7C77] bg-[#EDE2D4]/70 px-2.5 py-1 rounded-lg font-semibold">
                            {v.age_label}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7C77] mt-1">
                          Против: <strong className="text-[#283D38]">{v.disease}</strong>
                        </p>
                        <span className="text-[11px] text-[#8C9C96] block mt-1">
                          {isCompleted ? 'Выполнена в поликлинике' : 'Запланирована по графику'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* КОНТЕНТ ТАБА 3: КАЛЕНДАРЬ БЕРЕМЕННОСТИ (СТРОГО ПО МАКЕТУ beremennostPC.jpg)  */}
          {/* ========================================================================= */}
          {activeTab === 'pregnancy' && (
            <div className="grid grid-cols-12 gap-8 items-start pt-2">
              
              {/* ------------------------------------------------------------------- */}
              {/* ЛЕВАЯ КОЛОНКА (5 из 12): ТАЙМЛАЙН И БЛОК «РАЗМЕР МАЛЫША»           */}
              {/* ------------------------------------------------------------------- */}
              <div className="col-span-12 lg:col-span-5 space-y-4">
                
                {/* 3. ИНТЕРАКТИВНЫЙ ГОРИЗОНТАЛЬНЫЙ ТАЙМЛАЙН НЕДЕЛЬ (по beremennostPC.jpg) */}
                <div className="flex items-center justify-between gap-1 p-1 bg-[#FEECEB] rounded-full max-w-md mx-auto shadow-2xs">
                  {WEEKS_LIST.map((w) => {
                    const isActive = selectedWeek === w;
                    return (
                      <button
                        key={w}
                        onClick={() => setSelectedWeek(w)}
                        className={`w-11 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100 ring-2 ring-rose-200/60 scale-105'
                            : 'text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>

                {/* Подпись срока и дней до родов */}
                <p className="text-xs text-slate-600 font-semibold text-center">
                  2 триместр • до родов осталось ~{daysToDue} дней
                </p>

                {/* КАРТОЧКА «РАЗМЕР МАЛЫША» (по beremennostPC.jpg) */}
                <div className="bg-white rounded-[32px] p-6 border border-orange-100/50 shadow-sm space-y-4">
                  <h2 className="text-xl font-extrabold text-[#1E3029] text-center">
                    Размер малыша
                  </h2>

                  {/* Горизонтальный блок-иллюстрация с фруктом */}
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xs border border-orange-100/30">
                    <img 
                      src={currentWeekData.imageSrc} 
                      alt={currentWeekData.fruit} 
                      className="w-full h-auto object-cover block"
                    />
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-xs text-[#6B7C77] font-medium">
                      Мой малыш размером с...
                    </p>
                    <h3 className="text-3xl font-black text-[#1E3029] mt-1 tracking-tight">
                      {currentWeekData.fruit}
                    </h3>
                    <p className="text-sm font-bold text-[#556862] mt-2 flex items-center justify-center gap-3">
                      <span>Рост: {currentWeekData.height}</span>
                      <span className="text-[#C4B2A0]">•</span>
                      <span>Вес: {currentWeekData.weight}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* ------------------------------------------------------------------- */}
              {/* ПРАВАЯ КОЛОНКА (7 из 12): РАЗВИТИЕ И МЕДИЦИНСКИЕ РЕКОМЕНДАЦИИ       */}
              {/* ------------------------------------------------------------------- */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                
                {/* 1. Карточка «Развитие на [X] неделе» (по beremennostPC.jpg) */}
                <div className="bg-white rounded-[24px] p-6 border border-orange-100/50 shadow-sm space-y-3">
                  <h2 className="text-xl font-extrabold text-[#1E3029]">
                    Развитие на {selectedWeek} неделе
                  </h2>
                  <p className="text-sm text-[#3C4E48] leading-relaxed font-normal">
                    {currentWeekData.description}
                  </p>
                </div>

                {/* 2. Карточка «Медицинские рекомендации (Минздрав РБ)» (по beremennostPC.jpg) */}
                <div className="bg-[#FEECEB] p-6 rounded-[24px] border border-rose-100/60 space-y-3">
                  <h2 className="text-xl font-extrabold text-[#1E3029]">
                    Медицинские рекомендации (Минздрав РБ)
                  </h2>
                  <p className="text-xs font-bold text-[#8E5B4B]">
                    Рекомендованные обследования на текущем сроке:
                  </p>
                  <ul className="space-y-2 text-xs text-[#445550] leading-relaxed">
                    {currentWeekData.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8E5B4B] font-bold text-sm leading-none mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* КОНТЕНТ ТАБА 4: ПОДГОТОВКА К РОДАМ                                        */}
          {/* ========================================================================= */}
          {activeTab === 'birth' && (
            <div className="bg-white rounded-[32px] p-8 border border-orange-100/50 shadow-sm space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-[#1E3029]">
                  Подготовка к родам и чек-лист в роддом
                </h3>
                <p className="text-xs text-[#6B7C77] mt-1">
                  Стандартный перечень документов и вещей для родильных домов Республики Беларусь
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {maternityTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleMaternityTask(t.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 text-xs ${
                      t.done
                        ? 'bg-[#F4FAF7] border-emerald-500/30'
                        : 'bg-[#FFFDF9] border-[#EDE0D2] hover:bg-[#FAF4ED]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {t.done ? (
                        <CheckCircle2 className="w-5 h-5 text-[#208253]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#C4B2A0]" />
                      )}
                    </div>
                    <span className={`flex-1 font-medium leading-relaxed ${t.done ? 'line-through text-[#8C9C96]' : 'text-[#283D38]'}`}>
                      {t.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Подвал десктопного портала */}
          <footer className="mt-14 pt-8 pb-10 border-t border-[#EFE5DB] text-xs text-[#6B7C77] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#283D38]">Родные люди</span>
              <span>• Экосистема поддержки материнства и детства Республики Беларусь</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Heart className="w-3.5 h-3.5 text-[#E58A7D]" />
              <span>Конкурс «100 идей для Беларуси»</span>
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. НАСТОЯЩИЙ МОБИЛЬНЫЙ ВИД ДЛЯ СМАРТФОНОВ (block md:hidden)               */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {renderMobileContent(false)}
      </div>

      {/* ========================================================================= */}
      {/* 4. МОДАЛЬНОЕ ОКНО ЗАПИСИ К СПЕЦИАЛИСТУ                                    */}
      {/* ========================================================================= */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full shadow-2xl border border-orange-100/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div>
                <span className="text-xs font-bold text-[#208253] uppercase tracking-wider block">
                  {consultationType === 'online' ? 'Телемедицина / Видеосвязь' : 'Очный приём'}
                </span>
                <h3 className="text-lg font-bold text-[#1E3029]">
                  Запись к специалисту
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-8 h-8 rounded-full bg-[#FAF3EC] text-[#556862] hover:bg-[#F0E4D7] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FBF6F0] border border-[#EDE0D2]">
              <img
                src={selectedDoctor.avatarUrl}
                alt={selectedDoctor.fullName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-[#1E3029] truncate">
                  {selectedDoctor.fullName}
                </h4>
                <p className="text-xs text-[#556862] mt-0.5">
                  {selectedDoctor.roleTitle}
                </p>
                <p className="text-[11px] text-[#208253] font-semibold mt-0.5">
                  Рейтинг {selectedDoctor.rating} ★
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Формат консультации:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in_person')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'in_person'
                        ? 'border-[#208253] bg-[#EAF5F0] text-[#208253]'
                        : 'border-[#E0D4C8] text-[#556862]'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>В поликлинике</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('online')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'online'
                        ? 'border-[#208253] bg-[#EAF5F0] text-[#208253]'
                        : 'border-[#E0D4C8] text-[#556862]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Онлайн-видео</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Выберите ребёнка:
                </label>
                <select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C6B7] bg-[#FFFDF9] text-xs font-medium text-[#283D38] focus:outline-none focus:ring-2 focus:ring-[#208253]/30"
                >
                  {childrenList.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  <option value="Мама (Перинатальный учет)">Мама (Перинатальный учет / Беременность)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Свободный слот времени:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {selectedDoctor.availableSlotsDesktop.map((slot, idx) => (
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
                  Комментарий или жалоба (опционально):
                </label>
                <input
                  type="text"
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Например: плановый осмотр, беспокоит кашель..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C6B7] bg-[#FFFDF9] text-xs text-[#283D38] focus:outline-none focus:ring-2 focus:ring-[#208253]/30"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
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
      {/* 5. ТОСТ УСПЕШНОЙ ЗАПИСИ                                                   */}
      {/* ========================================================================= */}
      {bookingSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3029] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 border border-emerald-500/40">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Запись успешно оформлена!</span>
            <span className="text-[#A2B8B0]">Талон добавлен в раздел «Здоровье» и личный кабинет.</span>
          </div>
        </div>
      )}

    </div>
  );
}

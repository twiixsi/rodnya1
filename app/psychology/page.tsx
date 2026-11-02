'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldAlert, 
  HeartHandshake, 
  PhoneCall, 
  Users, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  Star,
  ShieldCheck,
  ChevronRight,
  Send,
  Heart
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { MOCK_SPECIALISTS } from '@/lib/supabase/mock-data';

export default function PsychologyPage() {
  const { isMobileLayout, user } = useApp();

  // SOS modal state
  const [showSosModal, setShowSosModal] = useState(false);

  // Online Mediation active exercise tab
  const [activeExercise, setActiveExercise] = useState<number>(0);

  // Booking specialist state
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTopic, setBookingTopic] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const exercises = [
    {
      title: 'Учимся слушать без обвинений',
      subtitle: 'Техника «Я-сообщений» для снижения напряжения в споре',
      steps: [
        {
          label: 'Шаг 1. Опишите факт без оценки',
          example: 'Вместо: «Ты никогда не помогаешь с ребёнком!»\nСкажите: «Когда я весь вечер одна укладываю спать малыша...»'
        },
        {
          label: 'Шаг 2. Назовите своё чувство',
          example: '«...я чувствую сильную усталость и бессилие...»'
        },
        {
          label: 'Шаг 3. Сформулируйте конкретную просьбу',
          example: '«...пожалуйста, помоги мне искупать его сегодня в 20:00».'
        }
      ]
    },
    {
      title: 'Распределение семейных обязанностей',
      subtitle: 'Прозрачный баланс быта между родителями',
      steps: [
        {
          label: 'Шаг 1. Составьте общий список рутины',
          example: 'Уборка, готовка, покупка подгузников, поликлиника, укладывание спать, прогулки.'
        },
        {
          label: 'Шаг 2. Разделите зоны ответственности',
          example: 'Каждый партнер берет на себя 2–3 задачи, за которые отвечает полностью без напоминаний.'
        },
        {
          label: 'Шаг 3. Введите «родительский выходной»',
          example: 'Хотя бы 2 часа в неделю, когда каждый родитель может побыть наедине с собой.'
        }
      ]
    },
    {
      title: 'Семейный бюджет и финансовые цели',
      subtitle: 'Обсуждение расходов без ссор и обид',
      steps: [
        {
          label: 'Шаг 1. Определите обязательные расходы',
          example: 'Коммунальные платежи, детское питание, подгузники, медицинские расходы.'
        },
        {
          label: 'Шаг 2. Личные средства каждого супруга',
          example: 'У каждого должна быть сумма на личные радости без необходимости отчитываться.'
        },
        {
          label: 'Шаг 3. Семейная подушка безопасности',
          example: 'Постепенное накопление резерва на 3–6 месяцев расходов.'
        }
      ]
    }
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedSpecialist(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header Banner (Matches Reference Image 2 - Screen 2) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#EAF4ED] border border-[#D5E8D8] p-6 lg:p-10 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[#34785D] text-xs font-bold shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-[#E58A7D]" />
              <span>Семейный щит • Психологическая опора</span>
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-extrabold text-[#283D38] tracking-tight">
              Поддержка, когда это нужно
            </h1>

            <p className="text-sm text-[#556862] max-w-xl leading-relaxed">
              Бесплатная конфиденциальная психологическая помощь, сопровождение семей в кризисных ситуациях, упражнения для пар и проверенные специалисты Республики Беларусь.
            </p>

            {/* Handwritten Note */}
            <div className="pt-2">
              <span className="font-handwritten text-2xl text-[#E58A7D] font-bold">
                Вы не одни ♡
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-center gap-3">
            {/* Big Prominent SOS Button */}
            <button
              onClick={() => setShowSosModal(true)}
              className="w-full py-4 px-6 rounded-2xl bg-[#E58A7D] hover:bg-[#D96B5D] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95 animate-pulse"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>SOS — Экстренная помощь</span>
            </button>

            <span className="text-[11px] text-[#6B7C77] text-center">
              Круглосуточный анонимный кризисный чат и горячие линии
            </span>
          </div>
        </div>
      </div>

      {/* SOS Support Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 lg:p-8 border border-[#F0E4D7] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div className="flex items-center gap-2 text-[#E58A7D]">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="text-lg font-bold text-[#283D38]">Экстренная кризисная помощь</h3>
              </div>
              <button
                onClick={() => setShowSosModal(false)}
                className="w-8 h-8 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#556862] leading-relaxed">
              Если вы или ваши дети находитесь в сложной жизненной ситуации, испытываете эмоциональное истощение или столкнулись с домашним насилием — помощь рядом. Звонки бесплатны со всех телефонов Беларуси:
            </p>

            {/* Hotlines */}
            <div className="space-y-3">
              <a
                href="tel:88011008801"
                className="block p-4 rounded-2xl bg-[#FDF0EC] border border-[#F8DDD4] hover:bg-[#F9DCD5] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#283D38]">Для пострадавших от домашнего насилия</span>
                  <PhoneCall className="w-4 h-4 text-[#E58A7D]" />
                </div>
                <span className="text-lg font-black text-[#D96B5D] block mt-1">8-801-100-8801</span>
                <span className="text-[11px] text-[#8A5A52]">Бесплатно, анонимно, ежедневно с 8:00 до 20:00</span>
              </a>

              <a
                href="tel:88011001611"
                className="block p-4 rounded-2xl bg-[#EAF4ED] border border-[#D5E8D8] hover:bg-[#DFEDE2] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#283D38]">Детская телефонная линия (для детей и родителей)</span>
                  <PhoneCall className="w-4 h-4 text-[#34785D]" />
                </div>
                <span className="text-lg font-black text-[#34785D] block mt-1">8-801-100-1611</span>
                <span className="text-[11px] text-[#4A725D]">Круглосуточно 24/7, помощь профессиональных психологов</span>
              </a>

              <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs space-y-1">
                <span className="font-bold text-[#283D38] block">«Кризисные комнаты» ТЦСОН</span>
                <p className="text-[11px] text-[#6B7C77]">
                  Предоставляют безопасное временное бесплатное проживание для мамы с детьми в каждом районе Беларуси.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSosModal(false)}
                className="px-5 py-2.5 rounded-full bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-colors"
              >
                Понятно, закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Online Mediation Section */}
      <section className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-10 border border-[#F0E4D7] shadow-card space-y-6">
        <div>
          <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
            Интерактивная медиация
          </span>
          <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
            Упражнения для семейной гармонии
          </h2>
          <p className="text-sm text-[#556862] mt-1">
            Практические методики медиаторов для разрешения разногласий без ссор и обид.
          </p>
        </div>

        {/* Exercise Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#F0E4D7] pb-3">
          {exercises.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExercise(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeExercise === idx
                  ? 'bg-[#34785D] text-white shadow-xs'
                  : 'bg-[#F8F1E8] text-[#6B7C77] hover:text-[#283D38]'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>

        {/* Active Exercise Steps */}
        <div className="bg-[#F8F1E8] rounded-3xl p-6 space-y-4">
          <div className="border-b border-[#E5D7C7] pb-3">
            <h3 className="font-bold text-base text-[#283D38]">{exercises[activeExercise].title}</h3>
            <p className="text-xs text-[#6B7C77]">{exercises[activeExercise].subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exercises[activeExercise].steps.map((st, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#E9DACB] shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#34785D] block">{st.label}</span>
                <p className="text-xs text-[#556862] whitespace-pre-line leading-relaxed font-mono bg-[#FAF6F0] p-2.5 rounded-xl border border-[#F0E4D7]">
                  {st.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Catalog & Booking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#283D38]">
              Консультации специалистов
            </h2>
            <p className="text-sm text-[#556862] mt-1">
              Проверенные психологи, семейные медиаторы и логопеды Республики Беларусь
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SPECIALISTS.map((spec) => (
            <div
              key={spec.id}
              className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#D5E8D8] shrink-0 shadow-xs">
                    <img src={spec.avatar_url} alt={spec.full_name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#283D38]">{spec.full_name}</h3>
                      {spec.is_online && (
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" title="Онлайн" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#34785D] block">{spec.role_title}</span>
                    <div className="flex items-center gap-2 text-xs text-[#6B7C77] mt-1">
                      <span className="flex items-center text-amber-500 font-bold">
                        ★ {spec.rating}
                      </span>
                      <span>•</span>
                      <span>Стаж: {spec.experience_years} лет</span>
                      <span>•</span>
                      <span>{spec.reviews_count} отзывов</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#556862] mt-3 leading-relaxed">
                  {spec.bio}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-[#F8F1E8] text-[11px] text-[#6B7C77] space-y-0.5">
                  <span className="font-semibold text-[#283D38] block">{spec.qualification}</span>
                  <span>{spec.education}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E4D7] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#6B7C77] block text-[10px]">Ближайшая запись:</span>
                  <span className="font-semibold text-[#283D38]">{spec.available_slots[0]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/chats"
                    className="p-2.5 rounded-xl bg-[#F0E4D7] hover:bg-[#E5D7C7] text-[#283D38] transition-colors"
                    title="Написать в чат"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setSelectedSpecialist(spec.full_name)}
                    className="px-4 py-2 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold transition-colors"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedSpecialist && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
              <h3 className="font-bold text-base text-[#283D38]">Запись на онлайн-консультацию</h3>
              <button
                onClick={() => setSelectedSpecialist(null)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#34785D] mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-[#283D38]">Заявка успешно отправлена!</h4>
                <p className="text-xs text-[#6B7C77]">
                  Специалист {selectedSpecialist} свяжется с вами через диалоги платформы для подтверждения времени.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3 text-xs">
                <div>
                  <span className="text-[#6B7C77] block text-[11px]">Выбранный специалист:</span>
                  <span className="font-bold text-sm text-[#34785D]">{selectedSpecialist}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Желаемая дата и время:</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Краткая тема обращения (конфиденциально):</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Например: преодоление послеродовой тревожности, распределение обязанностей..."
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38] outline-hidden focus:border-[#34785D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Подтвердить запись
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

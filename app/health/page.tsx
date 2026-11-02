'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Baby, 
  Calendar, 
  Stethoscope, 
  Activity, 
  Heart, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Apple,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { calculatePregnancyStatus, getWeekDetails } from '@/lib/calculations/pregnancy';

export default function HealthPage() {
  const { isMobileLayout, user } = useApp();

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'calendar' | 'planning' | 'consultation'>('calendar');

  // LMP Date (defaults to 20 weeks ago for rich instant demonstration)
  const defaultLmp = new Date(Date.now() - 20 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [lmpDate, setLmpDate] = useState<string>(defaultLmp);

  const pregStatus = calculatePregnancyStatus(lmpDate);

  // Manual week selector for browsing full pregnancy calendar
  const [selectedWeek, setSelectedWeek] = useState<number>(pregStatus.currentWeek);
  const currentWeekInfo = getWeekDetails(selectedWeek);

  // Ask doctor form state
  const [doctorCategory, setDoctorCategory] = useState('pediatrics');
  const [doctorQuestion, setDoctorQuestion] = useState('');
  const [questionSent, setQuestionSent] = useState(false);

  // Pre-conception planning checklist
  const [planningTasks, setPlanningTasks] = useState([
    { id: 'pt-1', title: 'Приём фолиевой кислоты (400 мкг) за 3 месяца до зачатия', done: true },
    { id: 'pt-2', title: 'Консультация врача-акушера-гинеколога и мазок на онкоцитологию', done: true },
    { id: 'pt-3', title: 'Анализ крови на антитела к краснухе, токсоплазмозу и ЦМВ (TORCH)', done: false },
    { id: 'pt-4', title: 'Определение уровня ферритина, железа и витамина D', done: false },
    { id: 'pt-5', title: 'Санация полости рта у стоматолога', done: true },
    { id: 'pt-6', title: 'Консультация терапевта и ЭКГ', done: false }
  ]);

  const togglePlanningTask = (id: string) => {
    setPlanningTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setDoctorQuestion('');
    }, 3000);
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header Banner (Matches Reference Image 2 - Screen 3) */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FB] text-[#2F6D9E] text-xs font-bold mb-2">
              <Baby className="w-3.5 h-3.5" />
              <span>Здоровое поколение • Здоровье мамы и малыша</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
              Календарь беременности и детского здоровья
            </h1>
            <p className="text-sm text-[#556862] mt-1 max-w-2xl leading-relaxed">
              Медицинское сопровождение по стандартам Министерства здравоохранения Республики Беларусь: клинические протоколы, сроки скринингов, анализы и советы педиатров.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7C77] hidden sm:inline">Дата последних месячных (LMP):</span>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => {
                setLmpDate(e.target.value);
                const s = calculatePregnancyStatus(e.target.value);
                setSelectedWeek(s.currentWeek);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-xs font-semibold text-[#283D38] outline-hidden"
            />
          </div>
        </div>

        {/* Mobile Tabs */}
        {isMobileLayout && (
          <div className="grid grid-cols-3 gap-1 bg-[#F8F1E8] p-1 rounded-2xl mt-4 text-xs font-semibold">
            <button
              onClick={() => setMobileTab('calendar')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'calendar' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Календарь
            </button>
            <button
              onClick={() => setMobileTab('planning')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'planning' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Подготовка
            </button>
            <button
              onClick={() => setMobileTab('consultation')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'consultation' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Врачу
            </button>
          </div>
        )}
      </div>

      {/* Main Pregnancy Tracker Section */}
      {(!isMobileLayout || mobileTab === 'calendar') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Progress Ring, Week Selector, Fruit Comparison */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-4">
              <div>
                <span className="text-xs font-bold text-[#2F6D9E] uppercase tracking-wider block">
                  Текущий срок
                </span>
                <h2 className="text-2xl font-black text-[#283D38]">
                  {pregStatus.currentWeek} недель ({pregStatus.trimester}-й триместр)
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B7C77] block">ПДР:</span>
                <span className="text-xs font-bold text-[#34785D]">
                  {new Date(pregStatus.estimatedDueDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B7C77]">
                <span>Прогресс: {pregStatus.progressPercent}%</span>
                <span>Осталось: ~{pregStatus.daysLeft} дней</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#E5EFE3] overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#34785D] to-[#E58A7D] transition-all duration-500"
                  style={{ width: `${pregStatus.progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8C9C96] pt-1">
                <span>1 триместр</span>
                <span>2 триместр</span>
                <span>3 триместр (30 нед. декрет)</span>
              </div>
            </div>

            {/* Baby Size Card with Fruit Comparison (Matching reference) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EBF3FB] to-[#F2EFF9] border border-[#D5E5F5] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#2F6D9E] uppercase tracking-wider block">
                  Размер малыша на {selectedWeek} неделе:
                </span>
                <h3 className="text-xl font-extrabold text-[#283D38]">
                  {currentWeekInfo.baby_size_fruit}
                </h3>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#556862] pt-1">
                  <span>Длина: ~{currentWeekInfo.baby_length_cm} см</span>
                  <span>•</span>
                  <span>Вес: ~{currentWeekInfo.baby_weight_g} г</span>
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-3xl shrink-0">
                🍎
              </div>
            </div>

            {/* Week Stepper Carousel */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#283D38] block">
                Просмотр календаря по неделям:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeek(w)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      selectedWeek === w
                        ? 'bg-[#34785D] text-white shadow-xs'
                        : w === pregStatus.currentWeek
                        ? 'bg-[#E58A7D] text-white'
                        : 'bg-[#F8F1E8] text-[#6B7C77] hover:bg-[#F0E4D7]'
                    }`}
                  >
                    {w} нед.
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Medical Details & Recommended Screenings */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft space-y-6">
              <div className="border-b border-[#F0E4D7] pb-4">
                <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider block">
                  Неделя {selectedWeek} • Руководство акушера
                </span>
                <h3 className="text-xl font-bold text-[#283D38] mt-1">
                  Что происходит с мамой и ребёнком
                </h3>
              </div>

              {/* Baby Development */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#2F6D9E] uppercase tracking-wider flex items-center gap-1.5">
                  <Baby className="w-4 h-4" />
                  <span>Развитие малыша</span>
                </h4>
                <p className="text-xs text-[#556862] leading-relaxed bg-[#F8F1E8] p-4 rounded-2xl border border-[#E9DACB]">
                  {currentWeekInfo.baby_description}
                </p>
              </div>

              {/* Mother Body Changes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#E58A7D] uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  <span>Самочувствие и организм будущей мамы</span>
                </h4>
                <p className="text-xs text-[#556862] leading-relaxed bg-[#F8F1E8] p-4 rounded-2xl border border-[#E9DACB]">
                  {currentWeekInfo.mother_description}
                </p>
              </div>

              {/* Recommended Screenings (Official protocol of Belarus) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#34785D] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Обязательные обследования и анализы (Минздрав РБ)</span>
                </h4>

                <div className="space-y-2">
                  {currentWeekInfo.screenings_recommended.map((scr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#E5EFE3]/70 border border-[#CDE0C7] flex items-center gap-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#34785D] shrink-0" />
                      <span className="font-semibold text-[#283D38]">{scr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tips */}
              <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#F3E2CB] space-y-1.5 text-xs">
                <span className="font-bold text-[#D96B5D] block">Совет недели от экспертов «Родныя»:</span>
                <ul className="list-disc list-inside space-y-1 text-[#556862]">
                  {currentWeekInfo.tips.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-conception Planning Checklist Section */}
      {(!isMobileLayout || mobileTab === 'planning') && (
        <section className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-10 border border-[#F0E4D7] shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0E4D7] pb-6">
            <div>
              <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                Осознанное родительство
              </span>
              <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
                Чек-лист подготовки к беременности
              </h2>
              <p className="text-sm text-[#556862] mt-1">
                Комплекс медицинских и профилактических шагов для будущих родителей.
              </p>
            </div>
            <div className="text-xs font-bold text-[#34785D] bg-[#E5EFE3] px-4 py-2 rounded-2xl">
              Выполнено: {planningTasks.filter(t => t.done).length} из {planningTasks.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {planningTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => togglePlanningTask(t.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  t.done
                    ? 'bg-[#E5EFE3]/50 border-[#C7DCBF]'
                    : 'bg-[#F8F1E8] hover:bg-[#F0E4D7] border-[#E9DACB]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    t.done
                      ? 'bg-[#34785D] border-[#34785D] text-white'
                      : 'border-[#C5B5A3] bg-white'
                  }`}
                >
                  {t.done && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium leading-relaxed ${t.done ? 'line-through text-[#6B7C77]' : 'text-[#283D38]'}`}>
                  {t.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ask a Doctor / Pediatrician Consultation Form */}
      {(!isMobileLayout || mobileTab === 'consultation') && (
        <section className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-10 border border-[#F0E4D7] shadow-card space-y-6">
          <div className="border-b border-[#F0E4D7] pb-4">
            <span className="text-xs font-bold text-[#2F6D9E] uppercase tracking-wider bg-[#EBF3FB] px-3 py-1 rounded-full">
              Прямая связь со специалистом
            </span>
            <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
              Задайте вопрос врачу-педиатру или неонатологу
            </h2>
            <p className="text-sm text-[#556862] mt-1">
              Квалифицированные разъяснения по грудному вскармливанию, вакцинации и раннему развитию.
            </p>
          </div>

          {questionSent ? (
            <div className="p-8 text-center bg-[#E5EFE3] rounded-3xl space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#34785D] mx-auto animate-bounce" />
              <h3 className="font-bold text-base text-[#283D38]">Ваш вопрос успешно отправлен!</h3>
              <p className="text-xs text-[#556862] max-w-md mx-auto">
                Врач-консультант подготовит квалифицированный ответ в течение 2 часов. Уведомление появится в вашем личном кабинете.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendQuestion} className="space-y-4 max-w-2xl text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#283D38]">Категория вопроса:</label>
                <select
                  value={doctorCategory}
                  onChange={(e) => setDoctorCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38] font-medium"
                >
                  <option value="pediatrics">Педиатрия и уход за новорожденным</option>
                  <option value="lactation">Грудное вскармливание и прикорм</option>
                  <option value="pregnancy">Акушерство и ведение беременности</option>
                  <option value="vaccines">Вакцинопрофилактика по календарю РБ</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#283D38]">Опишите ваш вопрос:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Опишите возраст ребёнка, симптомы, вопросы по режиму или питанию..."
                  value={doctorQuestion}
                  onChange={(e) => setDoctorQuestion(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38] outline-hidden focus:border-[#34785D]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-2 text-[#6B7C77] text-[11px]">
                <Info className="w-4 h-4 text-[#34785D] shrink-0 mt-0.5" />
                <span>
                  Обратите внимание: онлайн-консультация носит информационный характер и не заменяет очный осмотр врача или вызов скорой помощи по номеру 103 при неотложных состояниях.
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Отправить вопрос врачу
              </button>
            </form>
          )}
        </section>
      )}
    </div>
  );
}

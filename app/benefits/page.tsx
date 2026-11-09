'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Wallet, 
  Home, 
  ShieldCheck, 
  Scale,
  CheckCircle2, 
  Circle,
  Laptop, 
  Smartphone, 
  Search, 
  User, 
  X, 
  Check, 
  LayoutGrid, 
  MessageSquare, 
  Send,
  Sparkles,
  ShieldAlert,
  Heart,
  Download
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

// =========================================================================
// ТОЧНЫЕ ГОСУДАРСТВЕННЫЕ КОНСТАНТЫ МИНТРУДА РБ (01.11.2026 - 31.01.2027)
// =========================================================================
const BPM = 530.37; // Бюджет прожиточного минимума в среднем на душу населения (BYN)
const SZP = 3022.00; // Средняя заработная плата по республике для расчета детских пособий (BYN)

interface PaymentParams {
  childOrder: '1' | '2' | '3+';
  earlyRegistration: 'yes' | 'no';
  olderChildren: 'none' | 'standard' | 'disabled';
  disabilityStatus: 'none' | 'disability';
  motherEmployment: 'leave' | 'working';
  isTwins: boolean;
  isLowIncomeOrSingle: boolean;
}

interface PaymentResults {
  lumpSum: number;
  baseMonthly: number;
  olderChildrenMonthly: number;
  monthlyTotal: number;
  twinsBonus: number;
  hasFreeFoodAndGASP: boolean;
  hasFamilyCapital: boolean;
  familyCapitalAmount: number;
}

// =========================================================================
// СТРОГАЯ МАТЕМАТИЧЕСКАЯ ФУНКЦИЯ РАСЧЕТА (БЕЗ ОКРУГЛЕНИЙ «НА ГЛАЗ»)
// =========================================================================
function calculatePayments(params: PaymentParams): PaymentResults {
  const {
    childOrder,
    earlyRegistration,
    olderChildren,
    disabilityStatus,
    motherEmployment,
    isTwins,
    isLowIncomeOrSingle,
  } = params;

  // 1. ЕДИНОВРЕМЕННЫЕ ПОСОБИЯ (при рождении):
  //    - При рождении ПЕРВОГО ребенка (10 БПМ) = 5303.70 BYN
  //    - При рождении ВТОРОГО и последующих детей (14 БПМ) = 7425.18 BYN
  let lumpSum = childOrder === '1' ? 10 * BPM : 14 * BPM;

  //    - Пособие женщинам, ставшим на учет до 12 недель (100% БПМ) = 530.37 BYN
  if (earlyRegistration === 'yes') {
    lumpSum += 1 * BPM;
  }

  //    - Дополнительная выплата при рождении двойни/тройни (на каждого ребенка выплачивается +2 БПМ)
  //      Для двойни (2 ребенка): 2 * 2 * BPM = 2121.48 BYN (по 1060.74 BYN на каждого)
  let twinsBonus = 0;
  if (isTwins) {
    twinsBonus = 2 * (2 * BPM);
    lumpSum += twinsBonus;
  }

  // 2. ЕЖЕМЕСЯЧНЫЕ ПОСОБИЯ (до 3 лет):
  //    - На первого ребенка (35% СЗП) = 1057.70 BYN
  //    - На второго и последующих детей (40% СЗП) = 1208.80 BYN
  //    - На ребенка-инвалида до 3 лет (45% СЗП) = 1359.90 BYN
  let baseMonthly = 0;
  if (disabilityStatus === 'disability') {
    baseMonthly = 0.45 * SZP; // 1359.90 BYN
  } else if (childOrder === '1') {
    baseMonthly = 0.35 * SZP; // 1057.70 BYN
  } else {
    baseMonthly = 0.40 * SZP; // 1208.80 BYN
  }

  // Если Занятость = Работа более 0.5 ставки или открыто ИП -> базовое пособие делится строго на 2 (-50%)
  if (motherEmployment === 'working') {
    baseMonthly = baseMonthly * 0.5;
  }

  // 3. ЕЖЕМЕСЯЧНЫЕ ПОСОБИЯ НА СТАРШИХ ДЕТЕЙ (от 3 до 18 лет):
  //    - Семьям, воспитывающим ребенка до 3 лет (50% БПМ) = 265.19 BYN
  //    - На ребенка-инвалида старше 3 лет (70% БПМ) = 371.26 BYN
  let olderChildrenMonthly = 0;
  if (olderChildren === 'standard') {
    olderChildrenMonthly = 0.50 * BPM; // 265.185 -> 265.19 BYN
  } else if (olderChildren === 'disabled') {
    olderChildrenMonthly = 0.70 * BPM; // 371.259 -> 371.26 BYN
  }

  const monthlyTotal = baseMonthly + olderChildrenMonthly;

  // 4. ДОПОЛНИТЕЛЬНЫЕ СОЦИАЛЬНЫЕ ФАКТОРЫ РБ:
  //    - Неполная семья (одинокий родитель) или доход ниже БПМ (530.37 BYN)
  //    - 3-й ребенок в семье -> Назначение Семейного капитала (31 480.00 BYN)
  const hasFreeFoodAndGASP = isLowIncomeOrSingle;
  const hasFamilyCapital = childOrder === '3+';
  const familyCapitalAmount = 31480.00;

  return {
    lumpSum,
    baseMonthly,
    olderChildrenMonthly,
    monthlyTotal,
    twinsBonus,
    hasFreeFoodAndGASP,
    hasFamilyCapital,
    familyCapitalAmount,
  };
}

export default function BenefitsPage() {
  const { user, setIsDownloadModalOpen } = useApp();

  // Filter tabs: 'all' | 'birth' | 'under3'
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'birth' | 'under3'>('all');

  // Form input states
  const [childOrder, setChildOrder] = useState<'1' | '2' | '3+'>('1');
  const [earlyRegistration, setEarlyRegistration] = useState<'yes' | 'no'>('yes');
  const [olderChildren, setOlderChildren] = useState<'none' | 'standard' | 'disabled'>('none');
  const [disabilityStatus, setDisabilityStatus] = useState<'none' | 'disability'>('none');
  const [motherEmployment, setMotherEmployment] = useState<'leave' | 'working'>('leave');
  const [isTwins, setIsTwins] = useState(false);
  const [isLowIncomeOrSingle, setIsLowIncomeOrSingle] = useState(false);

  // Calculation display state
  const [isCalculated, setIsCalculated] = useState(true);

  // Accordion state for official laws (Указ № 572 open by default)
  const [openLawId, setOpenLawId] = useState<string | null>('law-2');

  // Interactive tracker popup modal state
  const [activeTrackerModal, setActiveTrackerModal] = useState<{
    id: string;
    title: string;
    color: string;
    steps: { id: string; text: string }[];
  } | null>(null);

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'p-1': true,
    'p-2': true,
    'b-1': true,
  });

  // Lawyer question modal state
  const [isLawyerModalOpen, setIsLawyerModalOpen] = useState(false);
  const [lawyerQuestion, setLawyerQuestion] = useState('');
  const [isQuestionSent, setIsQuestionSent] = useState(false);

  // Dynamic calculation execution
  const calc = calculatePayments({
    childOrder,
    earlyRegistration,
    olderChildren,
    disabilityStatus,
    motherEmployment,
    isTwins,
    isLowIncomeOrSingle,
  });

  const formattedLumpSum = calc.lumpSum.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' BYN';

  const formattedMonthly = calc.monthlyTotal.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' BYN';

  const trackerData = {
    pregnancy: {
      id: 'pregnancy',
      title: 'Оформление пособия по беременности и родам',
      color: '#208253',
      steps: [
        { id: 'p-1', text: 'Постановка на медицинский учет в женской консультации до 12-недельного срока беременности' },
        { id: 'p-2', text: 'Прохождение планового скрининга и оформление листка нетрудоспособности на 30-й неделе' },
        { id: 'p-3', text: 'Предоставление больничного листа и заявления нанимателю или в учебное заведение' },
        { id: 'p-4', text: 'Издание нанимателем официального приказа о предоставлении отпуска по беременности и родам' },
        { id: 'p-5', text: 'Начисление и выплата единовременного пособия в день ближайшей выплаты заработной платы' },
      ],
    },
    birth: {
      id: 'birth',
      title: 'Единовременное пособие при рождении ребенка',
      color: '#E07955',
      steps: [
        { id: 'b-1', text: 'Регистрация рождения ребенка в органах ЗАГС и получение свидетельства о рождении' },
        { id: 'b-2', text: 'Получение в ЗАГСе специальной справки для назначения государственного пособия' },
        { id: 'b-3', text: 'Подача заявления по месту работы либо в службу «Одно окно» исполкома в течение 6 месяцев' },
        { id: 'b-4', text: 'Зачисление выплаты (10 БПМ — 5303.70 BYN на первого или 14 БПМ — 7425.18 BYN на второго и последующих)' },
      ],
    },
    under3: {
      id: 'under3',
      title: 'Пособие по уходу за ребенком до 3 лет',
      color: '#2F6D9E',
      steps: [
        { id: 'u-1', text: 'Оформление у нанимателя приказа о предоставлении отпуска по уходу за ребенком до 3 лет' },
        { id: 'u-2', text: 'Сбор свидетельств о рождении всех несовершеннолетних детей в семье' },
        { id: 'u-3', text: 'Получение справки о неполучении аналогичного пособия вторым родителем' },
        { id: 'u-4', text: 'Открытие базового социального расчетного счета в уполномоченном банке Республики Беларусь' },
        { id: 'u-5', text: 'Подача заявления в комиссию по назначению пособий по месту работы' },
        { id: 'u-6', text: 'Ежемесячное получение государственной выплаты на социальный счет' },
      ],
    },
    capital: {
      id: 'capital',
      title: 'Назначение семейного капитала',
      color: '#C75C50',
      steps: [
        { id: 'c-1', text: 'Проверка права семьи: рождение или усыновление третьего (или последующего) ребенка' },
        { id: 'c-2', text: 'Сбор паспортов родителей и свидетельств о рождении всех несовершеннолетних детей' },
        { id: 'c-3', text: 'Оформление удостоверения многодетной семьи в органах социальной защиты' },
        { id: 'c-4', text: 'Подача заявления в службу «Одно окно» районного исполнительного комитета' },
        { id: 'c-5', text: 'Получение решения исполкома о назначении семейного капитала (в течение 30 дней)' },
        { id: 'c-6', text: 'Открытие депозитного счета в ОАО «АСБ Беларусбанк» на сумму 31 480 BYN' },
        { id: 'c-7', text: 'Получение государственного сертификата и права на досрочное распоряжение средствами' },
      ],
    },
  };

  const toggleStep = (stepId: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const toggleAccordion = (id: string) => {
    setOpenLawId(openLawId === id ? null : id);
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lawyerQuestion.trim()) return;
    setIsQuestionSent(true);
    setTimeout(() => {
      setIsQuestionSent(false);
      setLawyerQuestion('');
      setIsLawyerModalOpen(false);
    }, 2000);
  };

  // Progress computation for modal
  const currentSteps = activeTrackerModal?.steps || [];
  const completedCount = currentSteps.filter(s => checkedSteps[s.id]).length;
  const totalCount = currentSteps.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // =========================================================================
  // РЕНДЕР МОБИЛЬНОГО ИНТЕРФЕЙСА (ДЛЯ ТЕЛЕФОНОВ И ДЕМО-СИМУЛЯТОРА НА ПК)
  // =========================================================================
  const renderMobileContent = (isInsideSimulator = false) => (
    <div className={`w-full max-w-md mx-auto bg-[#FFF9F5] flex flex-col relative ${isInsideSimulator ? 'min-h-full pb-20' : 'min-h-screen pb-24'} shadow-sm px-4 pt-3 space-y-4 font-sans text-[#283D38]`}>
      
      {/* 1. Мобильная шапка: Кнопка назад + Заголовок + векторный колосок */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <Link href="/" className="inline-flex items-center gap-2 text-base font-bold text-[#1E3029] hover:text-[#208253] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#1E3029]" />
          <span>Льготы и субсидии</span>
        </Link>

        <div className="w-8 h-8 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#208253]">
          <Heart className="w-4 h-4" />
        </div>
      </div>

      {/* 2. Калькулятор пособий (Мобильный вид) */}
      <div className="bg-white rounded-[32px] p-5 border border-orange-100/50 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E3029]">Калькулятор пособий</h2>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Рассчитайте размер пособий, которые положены вашей семье
          </p>
        </div>

        {/* Табы-фильтры */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#F5ECE1] p-1 rounded-2xl text-xs font-semibold text-center">
          <button
            onClick={() => setActiveFilterTab('all')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeFilterTab === 'all'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Все пособия
          </button>
          <button
            onClick={() => setActiveFilterTab('birth')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeFilterTab === 'birth'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            Рождение
          </button>
          <button
            onClick={() => setActiveFilterTab('under3')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeFilterTab === 'under3'
                ? 'bg-[#208253] text-white shadow-2xs font-bold'
                : 'text-[#6B7C77] hover:text-[#1E3029]'
            }`}
          >
            До 3 лет
          </button>
        </div>

        {/* Поля ввода (селекты) */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#283D38] mb-1">Каким по счету родится ребенок?</label>
            <div className="relative">
              <select
                value={childOrder}
                onChange={(e) => setChildOrder(e.target.value as '1' | '2' | '3+')}
                className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-3.5 py-2.5 text-xs text-[#283D38] appearance-none font-medium focus:outline-hidden focus:border-[#208253] cursor-pointer"
              >
                <option value="1">1-й ребёнок</option>
                <option value="2">2-й ребёнок</option>
                <option value="3+">3-й и последующие</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#283D38] mb-1">Встали на учет в ЖК до 12 недель?</label>
            <div className="relative">
              <select
                value={earlyRegistration}
                onChange={(e) => setEarlyRegistration(e.target.value as 'yes' | 'no')}
                className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-3.5 py-2.5 text-xs text-[#283D38] appearance-none font-medium focus:outline-hidden focus:border-[#208253] cursor-pointer"
              >
                <option value="yes">Да</option>
                <option value="no">Нет</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#283D38] mb-1">Есть старшие дети от 3 до 18 лет?</label>
            <div className="relative">
              <select
                value={olderChildren}
                onChange={(e) => setOlderChildren(e.target.value as 'none' | 'standard' | 'disabled')}
                className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-3.5 py-2.5 text-xs text-[#283D38] appearance-none font-medium focus:outline-hidden focus:border-[#208253] cursor-pointer"
              >
                <option value="none">Нет</option>
                <option value="standard">Да (50% БПМ: + 265.19 BYN)</option>
                <option value="disabled">Да, ребенок-инвалид (70% БПМ: + 371.26 BYN)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#283D38] mb-1">Особый статус новорожденного</label>
            <div className="relative">
              <select
                value={disabilityStatus}
                onChange={(e) => setDisabilityStatus(e.target.value as 'none' | 'disability')}
                className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-3.5 py-2.5 text-xs text-[#283D38] appearance-none font-medium focus:outline-hidden focus:border-[#208253] cursor-pointer"
              >
                <option value="none">Нет</option>
                <option value="disability">Ребенок-инвалид (45% СЗП: 1359.90 BYN)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#283D38] mb-1">Занятость мамы в декрете</label>
            <div className="relative">
              <select
                value={motherEmployment}
                onChange={(e) => setMotherEmployment(e.target.value as 'leave' | 'working')}
                className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-3.5 py-2.5 text-xs text-[#283D38] appearance-none font-medium focus:outline-hidden focus:border-[#208253] cursor-pointer"
              >
                <option value="leave">Полный декрет (100% выплат)</option>
                <option value="working">Работа более чем на 0.5 ставки или открыто ИП</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Дополнительные чекбоксы Минтруда РБ */}
          <div className="space-y-2 pt-1">
            <div
              onClick={() => setIsTwins(!isTwins)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                isTwins
                  ? 'bg-[#F4FAF7] border-emerald-500/40 text-[#1E3029]'
                  : 'bg-[#FFFDF9] border-[#E8DACB] hover:bg-[#FAF4ED] text-[#283D38]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isTwins ? (
                  <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#C4B2A0]" />
                )}
              </div>
              <div>
                <span className="font-semibold block leading-tight text-[11px]">Родилась двойня/многоплодные роды</span>
                <span className="text-[10px] text-[#6B7C77] block mt-0.5">
                  +2 БПМ (+1 060.74 BYN) на каждого ребенка
                </span>
              </div>
            </div>

            <div
              onClick={() => setIsLowIncomeOrSingle(!isLowIncomeOrSingle)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                isLowIncomeOrSingle
                  ? 'bg-[#F4FAF7] border-emerald-500/40 text-[#1E3029]'
                  : 'bg-[#FFFDF9] border-[#E8DACB] hover:bg-[#FAF4ED] text-[#283D38]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isLowIncomeOrSingle ? (
                  <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#C4B2A0]" />
                )}
              </div>
              <div>
                <span className="font-semibold block leading-tight text-[11px]">Неполная семья или доход ниже БПМ ({BPM} BYN)</span>
                <span className="text-[10px] text-[#6B7C77] block mt-0.5">
                  Бесплатное детское питание до 2 лет и ГАСП
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Большая зеленая кнопка «Рассчитать» */}
        <button
          onClick={handleCalculate}
          className="w-full bg-[#208253] hover:bg-[#1a6b43] text-white py-3.5 rounded-xl font-bold transition mt-6 text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Рассчитать</span>
        </button>

        {/* Нежно-розовая плашка результатов (строго под кнопкой) */}
        {isCalculated && (
          <div className="bg-[#FEECEB] p-4.5 rounded-[24px] mt-6 border border-rose-100/50 space-y-2.5 text-xs">
            {(activeFilterTab === 'all' || activeFilterTab === 'birth') && (
              <div className="flex justify-between items-center text-[#283D38]">
                <span className="text-[#556862] text-[11px]">Итого единовременно при рождении:</span>
                <span className="font-extrabold text-sm text-[#283D38]">{formattedLumpSum}</span>
              </div>
            )}

            {(activeFilterTab === 'all' || activeFilterTab === 'under3') && (
              <div className="flex justify-between items-center text-[#283D38]">
                <span className="text-[#556862] text-[11px]">Итого ежемесячно (до 3 лет):</span>
                <span className="font-extrabold text-sm text-[#208253]">{formattedMonthly}</span>
              </div>
            )}

            {/* Семейный капитал при рождении 3-го ребенка */}
            {calc.hasFamilyCapital && (activeFilterTab === 'all' || activeFilterTab === 'birth') && (
              <div className="flex justify-between items-center text-[#8E5B4B] pt-2 border-t border-rose-200/60 pb-0.5">
                <span className="text-[11px] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C75C50]" />
                  <span>+ Семейный капитал:</span>
                </span>
                <span className="font-extrabold text-xs text-[#C75C50]">
                  31 480.00 BYN
                </span>
              </div>
            )}

            {/* Статус бесплатного питания и ГАСП */}
            {calc.hasFreeFoodAndGASP && (
              <div className="mt-1 p-2.5 bg-white/80 rounded-xl border border-rose-200/70 flex items-center gap-2 text-[11px] text-[#8E5B4B] font-bold">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C75C50] shrink-0" />
                <span>Право на бесплатное детское питание до 2 лет и ГАСП</span>
              </div>
            )}

            {/* Мелкий пастельный текст динамических подсказок */}
            <div className="pt-2 border-t border-rose-200/50 space-y-1 text-[11px] text-[#7A5B53]">
              {isTwins && (
                <p>• Доплата при рождении двойни (+2 БПМ: +1 060.74 BYN на каждого)</p>
              )}
              {olderChildren === 'standard' && (
                <p>• Включена выплата на старшего ребенка (265.19 BYN)</p>
              )}
              {olderChildren === 'disabled' && (
                <p>• Включена выплата на ребенка-инвалида старше 3 лет (371.26 BYN)</p>
              )}
              {earlyRegistration === 'yes' && (
                <p>• Включено пособие за постановку на учет до 12 недель (530.37 BYN)</p>
              )}
              {motherEmployment === 'working' && (
                <p className="text-[#B94A48] font-medium">
                  • Внимание: пособие до 3 лет снижено на 50%, так как выбрана занятость (Работа/ИП)
                </p>
              )}
              {childOrder === '3+' && (
                <p className="font-semibold text-[#8E5B4B]">
                  • Семья получает сертификат на Семейный капитал (31 480.00 BYN)
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Блок «Декрет без бюрократии» (Мобильный вид) */}
      <div className="space-y-3 pt-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E3029]">Декрет без бюрократии</h2>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Пошаговые инструкции и чек-листы по сбору документов
          </p>
        </div>

        <div className="space-y-2.5">
          <div
            onClick={() => setActiveTrackerModal(trackerData.pregnancy)}
            className="p-4 rounded-2xl bg-[#EAF5F0] border border-[#D5E8D8] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#208253] shadow-2xs shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#283D38] leading-tight">
                  Оформление пособия по беременности и родам
                </h3>
                <span className="text-[11px] text-[#6B7C77] block mt-0.5">5 шагов</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#208253]" />
          </div>

          <div
            onClick={() => setActiveTrackerModal(trackerData.birth)}
            className="p-4 rounded-2xl bg-[#FEECEB] border border-[#F8DDD4] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E07955] shadow-2xs shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#283D38] leading-tight">
                  Единовременное пособие при рождении ребенка
                </h3>
                <span className="text-[11px] text-[#6B7C77] block mt-0.5">4 шага</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#E07955]" />
          </div>

          <div
            onClick={() => setActiveTrackerModal(trackerData.under3)}
            className="p-4 rounded-2xl bg-[#EBF3FC] border border-[#D5E5F7] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2F6D9E] shadow-2xs shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#283D38] leading-tight">
                  Пособие по уходу за ребенком до 3 лет
                </h3>
                <span className="text-[11px] text-[#6B7C77] block mt-0.5">6 шагов</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2F6D9E]" />
          </div>

          <div
            onClick={() => setActiveTrackerModal(trackerData.capital)}
            className="p-4 rounded-2xl bg-[#FCEEE9] border border-[#F6DDD5] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C75C50] shadow-2xs shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#283D38] leading-tight">
                  Назначение семейного капитала
                </h3>
                <span className="text-[11px] text-[#6B7C77] block mt-0.5">7 шагов</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C75C50]" />
          </div>
        </div>
      </div>

      {/* 4. Официальные нормативы в РБ (Мобильный вид) */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#F0E4D7] space-y-2.5 text-xs mt-3">
        <span className="font-bold text-[11px] text-[#6B7C77] uppercase tracking-wider block">
          Официальные нормативы в РБ (ноябрь 2026)
        </span>
        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#EDE0D2] flex justify-between items-center">
            <div>
              <span className="text-[11px] text-[#6B7C77] block">Базовый норматив (БПМ):</span>
              <strong className="text-base font-bold text-[#283D38]">{BPM} BYN</strong>
            </div>
            <ShieldCheck className="w-5 h-5 text-[#208253]" />
          </div>
          <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#EDE0D2] flex justify-between items-center">
            <div>
              <span className="text-[11px] text-[#6B7C77] block">Средняя зарплата (СЗП):</span>
              <strong className="text-base font-bold text-[#208253]">{SZP} BYN</strong>
            </div>
            <Scale className="w-5 h-5 text-[#2F6D9E]" />
          </div>
        </div>
      </div>

      {/* 5. Законы и документы (Мобильный вид) */}
      <div id="laws-mobile-section" className="space-y-3 pt-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E3029]">Законы и документы</h2>
          <p className="text-xs text-[#6B7C77] mt-0.5">
            Нормативно-правовые акты и законы Республики Беларусь о поддержке семей
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Закон 1 */}
          <div className="bg-white rounded-2xl border border-[#F0E4D7] overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('law-1')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F6EBE2] text-[#8E5B4B] flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#283D38] leading-tight">
                  Закон РБ "О государственных пособиях семьям, воспитывающим детей"
                </span>
              </div>
              {openLawId === 'law-1' ? <ChevronUp className="w-4 h-4 text-[#6B7C77]" /> : <ChevronDown className="w-4 h-4 text-[#6B7C77]" />}
            </button>
            {openLawId === 'law-1' && (
              <div className="p-4 pt-0 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1]">
                Устанавливает государственные пособия семьям: 10 БПМ ({ (10 * BPM).toFixed(2) } BYN) и 14 БПМ ({ (14 * BPM).toFixed(2) } BYN) при рождении, надбавки за двойню по 2 БПМ ({ (2 * BPM).toFixed(2) } BYN), пособие до 3 лет и выплаты на детей старше 3 лет.
              </div>
            )}
          </div>

          {/* Закон 2: Указ № 572 (ОТКРЫТ ПО УМОЛЧАНИЮ) */}
          <div className={`rounded-2xl transition-all shadow-2xs overflow-hidden ${
            openLawId === 'law-2'
              ? 'bg-[#F4FAF7] border border-emerald-500/30'
              : 'bg-white border border-[#F0E4D7]'
          }`}>
            <button
              onClick={() => toggleAccordion('law-2')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FEECEB] text-[#C75C50] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#283D38] leading-tight">
                  Указ Президента РБ № 572 "О семейном капитале"
                </span>
              </div>
              {openLawId === 'law-2' ? <ChevronUp className="w-4 h-4 text-[#6B7C77]" /> : <ChevronDown className="w-4 h-4 text-[#6B7C77]" />}
            </button>
            {openLawId === 'law-2' && (
              <div className="p-4 pt-0 text-xs text-[#556862] leading-relaxed border-t border-emerald-500/20">
                Регулирует порядок и условия назначения семейного капитала при рождении (усыновлении) третьего или последующих детей (31 480.00 BYN), порядок досрочного использования средств на жилье, медицину и образование.
              </div>
            )}
          </div>

          {/* Закон 3 */}
          <div className="bg-white rounded-2xl border border-[#F0E4D7] overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('law-3')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F6EBE2] text-[#8E5B4B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#283D38] leading-tight">
                  Кодекс РБ о браке и семье
                </span>
              </div>
              {openLawId === 'law-3' ? <ChevronUp className="w-4 h-4 text-[#6B7C77]" /> : <ChevronDown className="w-4 h-4 text-[#6B7C77]" />}
            </button>
            {openLawId === 'law-3' && (
              <div className="p-4 pt-0 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1]">
                Определяет основы правового регулирования брачно-семейных отношений, взаимные права и обязанности родителей и детей, гарантии охраны материнства и детства.
              </div>
            )}
          </div>

          {/* Закон 4 */}
          <div className="bg-white rounded-2xl border border-[#F0E4D7] overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('law-4')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EAF2FA] text-[#2F6D9E] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#283D38] leading-tight">
                  Постановление Совета Министров РБ № 104
                </span>
              </div>
              {openLawId === 'law-4' ? <ChevronUp className="w-4 h-4 text-[#6B7C77]" /> : <ChevronDown className="w-4 h-4 text-[#6B7C77]" />}
            </button>
            {openLawId === 'law-4' && (
              <div className="p-4 pt-0 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1]">
                Утверждает порядок оказания государственной адресной социальной помощи (ГАСП) семьям, предоставления бесплатного питания детям первых двух лет жизни.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Карточка «Юридическая помощь» */}
      <div className="bg-[#FAF4ED] rounded-3xl p-5 border border-[#EDE0D2] shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#1E3029]">Юридическая помощь</h3>
        <p className="text-xs text-[#556862] leading-relaxed">
          Вы можете получить бесплатную консультацию по вопросам семейного законодательства и льгот у наших специалистов
        </p>
        <ol className="text-xs text-[#556862] space-y-1.5 list-decimal pl-4">
          <li>Ознакомьтесь с интересующим вас законом в списке выше.</li>
          <li>Если у вас остались вопросы, задайте их юристу в онлайн-чате.</li>
          <li>Ответ поступит в течение 15 минут в личный кабинет.</li>
        </ol>
        <button
          onClick={() => setIsLawyerModalOpen(true)}
          className="w-full bg-[#1D8E54] hover:bg-[#177343] text-white py-3 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
        >
          <span>Задать вопрос юристу</span>
        </button>
      </div>

      {/* 7. Нижнее мобильное меню (Bottom Nav) */}
      <nav className={`${isInsideSimulator ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#EFE5DB] h-16 flex justify-around items-center z-50 px-2 shadow-lg rounded-b-[40px]`}>
        <Link href="/" className="flex flex-col items-center justify-center text-[#8C9C96] hover:text-[#283D38] transition-colors">
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-1 font-medium">Главная</span>
        </Link>

        {/* Сервисы (активная вкладка) */}
        <Link href="/benefits" className="flex flex-col items-center justify-center text-[#208253] font-bold">
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

  return (
    <div className="bg-[#FFF9F5] min-h-screen text-[#283D38] font-sans antialiased selection:bg-[#208253] selection:text-white">

      {/* ========================================================================= */}
      {/* 1. ДЕСКТОПНЫЙ ВЕБ-ПОРТАЛ (ПОКАЗЫВАЕТСЯ НА ЭКРАНАХ MD И ВЫШЕ)                */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        
        {/* Шапка портала (Header): Логотип «Родные люди», флаг РБ, Войти, Навигация */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 space-y-6">
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
              <Link 
                href="/benefits" 
                className="font-bold text-[#1E3029] relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E3029]"
              >
                Льготы и субсидии
              </Link>
              <Link href="/health" className="text-[#556862] hover:text-[#1E3029] font-medium transition-colors">
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

        {/* ========================================================================= */}
        {/* АДАПТИВНАЯ СТРУКТУРА НА ПК: 12-КОЛОНОЧНАЯ СЕТКА (7 из 12 + 5 из 12)       */}
        {/* ========================================================================= */}
        <div className="hidden md:grid grid-cols-12 gap-8 max-w-7xl mx-auto px-6 py-10 items-start">
          
          {/* ЛЕВАЯ КОЛОНКА (7 из 12): Калькулятор пособий */}
          <div className="col-span-7 bg-white rounded-[32px] p-6 shadow-sm border border-orange-100/50 space-y-6">
            
            <div>
              <h1 className="text-3xl font-extrabold text-[#1E3029] tracking-tight">
                Калькулятор пособий
              </h1>
              <p className="text-sm text-[#6B7C77] mt-1.5 leading-relaxed">
                Рассчитайте размер пособий, которые положены вашей семье
              </p>
            </div>

            {/* Табы-фильтры в один ряд: [Все пособия] (активный), [Рождение], [До 3 лет] */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilterTab('all')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilterTab === 'all'
                    ? 'bg-[#208253] text-white shadow-xs'
                    : 'bg-[#F5ECE1] text-[#6B7C77] hover:text-[#1E3029]'
                }`}
              >
                Все пособия
              </button>

              <button
                onClick={() => setActiveFilterTab('birth')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilterTab === 'birth'
                    ? 'bg-[#208253] text-white shadow-xs'
                    : 'bg-[#F5ECE1] text-[#6B7C77] hover:text-[#1E3029]'
                }`}
              >
                Рождение
              </button>

              <button
                onClick={() => setActiveFilterTab('under3')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilterTab === 'under3'
                    ? 'bg-[#208253] text-white shadow-xs'
                    : 'bg-[#F5ECE1] text-[#6B7C77] hover:text-[#1E3029]'
                }`}
              >
                До 3 лет
              </button>
            </div>

            {/* Поля ввода в виде красивых двухколоночных сеток (grid grid-cols-1 md:grid-cols-2 gap-4 mb-4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              
              {/* Поле 1: «Каким по счету родится ребенок?» */}
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Каким по счету родится ребенок?
                </label>
                <div className="relative">
                  <select
                    value={childOrder}
                    onChange={(e) => setChildOrder(e.target.value as '1' | '2' | '3+')}
                    className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-4 py-3 text-xs text-[#283D38] font-semibold appearance-none focus:outline-hidden focus:border-[#208253] cursor-pointer shadow-2xs"
                  >
                    <option value="1">1-й ребёнок</option>
                    <option value="2">2-й ребёнок</option>
                    <option value="3+">3-й и последующие</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Поле 2: «Встали на учет в ЖК до 12 недель?» */}
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Встали на учет в ЖК до 12 недель?
                </label>
                <div className="relative">
                  <select
                    value={earlyRegistration}
                    onChange={(e) => setEarlyRegistration(e.target.value as 'yes' | 'no')}
                    className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-4 py-3 text-xs text-[#283D38] font-semibold appearance-none focus:outline-hidden focus:border-[#208253] cursor-pointer shadow-2xs"
                  >
                    <option value="yes">Да</option>
                    <option value="no">Нет</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Поле 3: «Есть старшие дети от 3 до 18 лет?» */}
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Есть старшие дети от 3 до 18 лет?
                </label>
                <div className="relative">
                  <select
                    value={olderChildren}
                    onChange={(e) => setOlderChildren(e.target.value as 'none' | 'standard' | 'disabled')}
                    className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-4 py-3 text-xs text-[#283D38] font-semibold appearance-none focus:outline-hidden focus:border-[#208253] cursor-pointer shadow-2xs"
                  >
                    <option value="none">Нет</option>
                    <option value="standard">Да (50% БПМ: + 265.19 BYN)</option>
                    <option value="disabled">Да, ребенок-инвалид (70% БПМ: + 371.26 BYN)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Поле 4: «Особый статус новорожденного» */}
              <div>
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Особый статус новорожденного
                </label>
                <div className="relative">
                  <select
                    value={disabilityStatus}
                    onChange={(e) => setDisabilityStatus(e.target.value as 'none' | 'disability')}
                    className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-4 py-3 text-xs text-[#283D38] font-semibold appearance-none focus:outline-hidden focus:border-[#208253] cursor-pointer shadow-2xs"
                  >
                    <option value="none">Нет</option>
                    <option value="disability">Ребенок-инвалид (45% СЗП: 1359.90 BYN)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Поле 5: «Занятость мамы в декрете» (на всю ширину сетки) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#283D38] mb-1.5">
                  Занятость мамы в декрете
                </label>
                <div className="relative">
                  <select
                    value={motherEmployment}
                    onChange={(e) => setMotherEmployment(e.target.value as 'leave' | 'working')}
                    className="w-full bg-[#FFFDF9] border border-[#E8DACB] rounded-xl px-4 py-3 text-xs text-[#283D38] font-semibold appearance-none focus:outline-hidden focus:border-[#208253] cursor-pointer shadow-2xs"
                  >
                    <option value="leave">Полный декрет (100% выплат)</option>
                    <option value="working">Работа более чем на 0.5 ставки или открыто ИП (снижение на 50%)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C9C96] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Дополнительные чекбоксы социальных факторов */}
            <div className="space-y-2.5 pt-1">
              {/* Чекбокс 1: Родилась двойня */}
              <div
                onClick={() => setIsTwins(!isTwins)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                  isTwins
                    ? 'bg-[#F4FAF7] border-emerald-500/40 text-[#1E3029]'
                    : 'bg-[#FFFDF9] border-[#E8DACB] hover:bg-[#FAF4ED] text-[#283D38]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isTwins ? (
                    <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#C4B2A0]" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-semibold block leading-tight">Родилась двойня/многоплодные роды</span>
                  <span className="text-[11px] text-[#6B7C77] block mt-0.5">
                    Дополнительная выплата +2 БПМ (+1 060.74 BYN) на каждого ребенка
                  </span>
                </div>
              </div>

              {/* Чекбокс 2: Неполная семья или низкий доход */}
              <div
                onClick={() => setIsLowIncomeOrSingle(!isLowIncomeOrSingle)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                  isLowIncomeOrSingle
                    ? 'bg-[#F4FAF7] border-emerald-500/40 text-[#1E3029]'
                    : 'bg-[#FFFDF9] border-[#E8DACB] hover:bg-[#FAF4ED] text-[#283D38]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isLowIncomeOrSingle ? (
                    <CheckCircle2 className="w-4 h-4 text-[#208253]" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#C4B2A0]" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-semibold block leading-tight">
                    Неполная семья (одинокий родитель) или доход ниже БПМ ({BPM} BYN) на члена семьи
                  </span>
                  <span className="text-[11px] text-[#6B7C77] block mt-0.5">
                    Право на бесплатное детское питание до 2 лет и ГАСП
                  </span>
                </div>
              </div>
            </div>

            {/* Большая зеленая кнопка «Рассчитать» на всю ширину */}
            <button
              onClick={handleCalculate}
              className="w-full bg-[#208253] hover:bg-[#1a6b43] text-white py-3.5 rounded-xl font-bold transition mt-6 cursor-pointer text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <span>Рассчитать</span>
            </button>

            {/* Оформление плашки результатов (Строго под кнопкой) */}
            {isCalculated && (
              <div className="bg-[#FEECEB] p-6 rounded-[24px] mt-6 border border-rose-100/50 space-y-3.5 animate-in fade-in duration-300">
                
                {/* Строки с результатами выстроены по flex-оболочке (текст слева, жирная сумма справа) */}
                <div className="space-y-3">
                  {(activeFilterTab === 'all' || activeFilterTab === 'birth') && (
                    <div className="flex justify-between items-center text-[#283D38] pb-1">
                      <span className="text-[#556862] text-xs font-medium">
                        Итого единовременно при рождении:
                      </span>
                      <span className="font-extrabold text-lg text-[#283D38]">
                        {formattedLumpSum}
                      </span>
                    </div>
                  )}

                  {(activeFilterTab === 'all' || activeFilterTab === 'under3') && (
                    <div className="flex justify-between items-center text-[#283D38] pb-1">
                      <span className="text-[#556862] text-xs font-medium">
                        Итого ежемесячно (до 3 лет):
                      </span>
                      <span className="font-extrabold text-lg text-[#208253]">
                        {formattedMonthly}
                      </span>
                    </div>
                  )}

                  {/* Если это 3-й ребенок в семье -> выводи строку: "+ Назначение Семейного капитала — 31 480.00 BYN" */}
                  {calc.hasFamilyCapital && (activeFilterTab === 'all' || activeFilterTab === 'birth') && (
                    <div className="flex justify-between items-center text-[#8E5B4B] pt-2 border-t border-rose-200/60 pb-1">
                      <span className="text-xs font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#C75C50]" />
                        <span>+ Назначение Семейного капитала:</span>
                      </span>
                      <span className="font-extrabold text-base text-[#C75C50]">
                        31 480.00 BYN
                      </span>
                    </div>
                  )}

                  {/* Если семья неполная или доход ниже БПМ -> выводи статус "Право на бесплатное детское питание до 2 лет и ГАСП" */}
                  {calc.hasFreeFoodAndGASP && (
                    <div className="mt-2 p-3 bg-white/80 rounded-2xl border border-rose-200/70 flex items-center gap-2.5 text-xs text-[#8E5B4B] font-bold">
                      <ShieldAlert className="w-4 h-4 text-[#C75C50] shrink-0" />
                      <span>Право на бесплатное детское питание до 2 лет и ГАСП</span>
                    </div>
                  )}
                </div>

                {/* Снизу мелкий пастельный текст динамических подсказок */}
                <div className="pt-3 border-t border-rose-200/50 space-y-1.5 text-xs text-[#7A5B53] font-medium leading-relaxed">
                  {isTwins && (
                    <p>• Включена доплата при рождении двойни (+2 БПМ: +1 060.74 BYN на каждого ребенка)</p>
                  )}
                  {olderChildren === 'standard' && (
                    <p>• Включена выплата на старшего ребенка от 3 до 18 лет (50% БПМ: 265.19 BYN)</p>
                  )}
                  {olderChildren === 'disabled' && (
                    <p>• Включена выплата на ребенка-инвалида старше 3 лет (70% БПМ: 371.26 BYN)</p>
                  )}
                  {earlyRegistration === 'yes' && (
                    <p>• Включено пособие за постановку на учет до 12 недель (100% БПМ: 530.37 BYN)</p>
                  )}
                  {motherEmployment === 'working' && (
                    <p className="text-[#B94A48] font-bold">
                      • Внимание: размер пособия до 3 лет снижен на 50%, так как выбрана занятость (Работа/ИП)
                    </p>
                  )}
                  {childOrder === '3+' && (
                    <p className="font-semibold text-[#8E5B4B]">
                      • При рождении 3-го и последующих детей семья получает сертификат на Семейный капитал (31 480.00 BYN)
                    </p>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* ПРАВАЯ КОЛОНКА (5 из 12): Декрет без бюрократии */}
          <div className="col-span-5 space-y-6">
            
            <div>
              <h2 className="text-3xl font-extrabold text-[#1E3029] tracking-tight">
                Декрет без бюрократии
              </h2>
              <p className="text-sm text-[#6B7C77] mt-1.5 leading-relaxed">
                Пошаговые инструкции и чек-листы по сбору документов
              </p>
            </div>

            <div className="space-y-4">
              {/* 1. Пособие по беременности и родам */}
              <div 
                onClick={() => setActiveTrackerModal(trackerData.pregnancy)}
                className="bg-[#EAF5F0] border border-[#D5E8D8] rounded-[24px] p-5 flex items-center justify-between hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#208253] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38] leading-snug">
                      Оформление пособия<br />по беременности и родам
                    </h3>
                    <span className="text-xs text-[#6B7C77] mt-1 block">5 шагов</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#208253] group-hover:translate-x-1 transition-transform" />
              </div>

              {/* 2. Единовременное пособие при рождении */}
              <div 
                onClick={() => setActiveTrackerModal(trackerData.birth)}
                className="bg-[#FEECEB] border border-[#F8DDD4] rounded-[24px] p-5 flex items-center justify-between hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#E07955] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38] leading-snug">
                      Единовременное пособие<br />при рождении ребенка
                    </h3>
                    <span className="text-xs text-[#6B7C77] mt-1 block">4 шага</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#E07955] group-hover:translate-x-1 transition-transform" />
              </div>

              {/* 3. Пособие по уходу до 3 лет */}
              <div 
                onClick={() => setActiveTrackerModal(trackerData.under3)}
                className="bg-[#EBF3FC] border border-[#D5E5F7] rounded-[24px] p-5 flex items-center justify-between hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#2F6D9E] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38] leading-snug">
                      Пособие по уходу<br />до 3 лет
                    </h3>
                    <span className="text-xs text-[#6B7C77] mt-1 block">6 шагов</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#2F6D9E] group-hover:translate-x-1 transition-transform" />
              </div>

              {/* 4. Назначение семейного капитала */}
              <div 
                onClick={() => setActiveTrackerModal(trackerData.capital)}
                className="bg-[#FCEEE9] border border-[#F6DDD5] rounded-[24px] p-5 flex items-center justify-between hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#C75C50] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38] leading-snug">
                      Назначение семейного капитала
                    </h3>
                    <span className="text-xs text-[#6B7C77] mt-1 block">7 шагов</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#C75C50] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* СРЕДНЯЯ ЧАСТЬ: ОФИЦИАЛЬНЫЕ НОРМАТИВЫ В РБ (ГОРИЗОНТАЛЬНАЯ ПЛАШКА)         */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-white rounded-[28px] p-6 lg:p-8 border border-[#F0E4D7] shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#208253]" />
              <h3 className="text-base font-extrabold text-[#1E3029]">
                Официальные нормативы в Республике Беларусь (ноябрь 2026)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-[#FAF4ED] border border-[#EDE0D2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B7C77] block font-medium">Базовый норматив (БПМ в среднем на душу населения):</span>
                  <strong className="text-2xl font-black text-[#283D38] block mt-1">{BPM} BYN</strong>
                  <span className="text-[11px] text-[#8C9C96] block mt-1">Постановление Министерства труда и социальной защиты РБ</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F0] text-[#208253] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF4ED] border border-[#EDE0D2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B7C77] block font-medium">Средняя зарплата (СЗП работников в республике):</span>
                  <strong className="text-2xl font-black text-[#208253] block mt-1">{SZP} BYN</strong>
                  <span className="text-[11px] text-[#8C9C96] block mt-1">Официальная база расчета выплат на детей в возрасте до 3 лет</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] text-[#2F6D9E] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <Scale className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* НИЖНЯЯ ЧАСТЬ: ЗАКОНЫ И ДОКУМЕНТЫ + ЮРИДИЧЕСКАЯ ПОМОЩЬ                     */}
        {/* ========================================================================= */}
        <div id="desktop-laws-section" className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-[#1E3029] tracking-tight">
              Законы и документы
            </h2>
            <p className="text-sm text-[#6B7C77] mt-1">
              Нормативно-правовые акты и законы Республики Беларусь о поддержке семей
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* ЛЕВАЯ КОЛОНКА (8 из 12): Список из 4 законов */}
            <div className="col-span-12 lg:col-span-8 space-y-3.5">
              
              {/* 1. Закон РБ "О государственных пособиях семьям, воспитывающим детей" */}
              <div className="bg-white rounded-3xl border border-[#F0E4D7] shadow-xs overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('law-1')}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F6EBE2] text-[#8E5B4B] flex items-center justify-center shrink-0 shadow-2xs">
                      <Scale className="w-6 h-6" />
                    </div>
                    <span className="text-base font-bold text-[#283D38]">
                      Закон РБ "О государственных пособиях семьям, воспитывающим детей"
                    </span>
                  </div>
                  {openLawId === 'law-1' ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7C77]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7C77]" />
                  )}
                </button>

                {openLawId === 'law-1' && (
                  <div className="p-6 pt-2 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1] bg-[#FFFDF9] space-y-2">
                    <p>• <strong>Статья 9:</strong> Пособие женщинам, ставшим на учет в организациях здравоохранения до 12-недельного срока — 100% БПМ ({BPM} BYN).</p>
                    <p>• <strong>Статья 10:</strong> Единовременное пособие в связи с рождением первого ребенка — 10 БПМ ({ (10 * BPM).toFixed(2) } BYN), второго и последующих детей — 14 БПМ ({ (14 * BPM).toFixed(2) } BYN).</p>
                    <p>• <strong>Статья 11:</strong> Семьям при рождении двойни/тройни выплачивается единовременная надбавка на приобретение детских вещей — 2 БПМ ({ (2 * BPM).toFixed(2) } BYN) на каждого ребенка.</p>
                    <p>• <strong>Статья 13:</strong> Пособие по уходу за ребенком в возрасте до 3 лет — 35% ({ (0.35 * SZP).toFixed(2) } BYN), 40% ({ (0.40 * SZP).toFixed(2) } BYN) и 45% ({ (0.45 * SZP).toFixed(2) } BYN) среднемесячной зарплаты.</p>
                    <p>• <strong>Статья 14:</strong> Пособие на детей старше 3 лет — 50% БПМ ({ (0.50 * BPM).toFixed(2) } BYN), на ребенка-инвалида — 70% БПМ ({ (0.70 * BPM).toFixed(2) } BYN).</p>
                  </div>
                )}
              </div>

              {/* 2. Указ Президента РБ № 572 "О семейном капитале" (ОТКРЫТ ПО УМОЛЧАНИЮ) */}
              <div className={`rounded-3xl shadow-xs overflow-hidden transition-all ${
                openLawId === 'law-2'
                  ? 'bg-[#F4FAF7] border border-emerald-500/30'
                  : 'bg-white border border-[#F0E4D7]'
              }`}>
                <button
                  onClick={() => toggleAccordion('law-2')}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FEECEB] text-[#C75C50] flex items-center justify-center shrink-0 shadow-2xs">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-base font-bold text-[#283D38]">
                      Указ Президента РБ № 572 "О семейном капитале"
                    </span>
                  </div>
                  {openLawId === 'law-2' ? (
                    <ChevronUp className="w-5 h-5 text-[#208253]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7C77]" />
                  )}
                </button>

                {openLawId === 'law-2' && (
                  <div className="p-6 pt-1 text-xs text-[#556862] leading-relaxed border-t border-emerald-500/20 space-y-2">
                    <p>
                      Регулирует порядок и условия назначения семейного капитала при рождении (усыновлении) третьего или последующих детей, порядок и направления досрочного использования средств семейного капитала на улучшение жилищных условий, получение образования, медицинские услуги.
                    </p>
                    <p className="font-semibold text-[#208253]">
                      Текущий размер семейного капитала составляет 31 480.00 BYN (депозитный счет в ОАО «АСБ Беларусбанк»).
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Кодекс РБ о браке и семье */}
              <div className="bg-white rounded-3xl border border-[#F0E4D7] shadow-xs overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('law-3')}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F6EBE2] text-[#8E5B4B] flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-base font-bold text-[#283D38]">
                      Кодекс РБ о браке и семье
                    </span>
                  </div>
                  {openLawId === 'law-3' ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7C77]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7C77]" />
                  )}
                </button>

                {openLawId === 'law-3' && (
                  <div className="p-6 pt-2 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1] bg-[#FFFDF9]">
                    Определяет основы правового регулирования брачно-семейных отношений, взаимные права и обязанности родителей и детей, гарантии охраны материнства, отцовства и детства, порядок усыновления и защиты законных интересов несовершеннолетних граждан Республики Беларусь.
                  </div>
                )}
              </div>

              {/* 4. Постановление Совета Министров РБ № 104 */}
              <div className="bg-white rounded-3xl border border-[#F0E4D7] shadow-xs overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('law-4')}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2FA] text-[#2F6D9E] flex items-center justify-center shrink-0 shadow-2xs">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-base font-bold text-[#283D38]">
                      Постановление Совета Министров РБ № 104
                    </span>
                  </div>
                  {openLawId === 'law-4' ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7C77]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7C77]" />
                  )}
                </button>

                {openLawId === 'law-4' && (
                  <div className="p-6 pt-2 text-xs text-[#556862] leading-relaxed border-t border-[#F5ECE1] bg-[#FFFDF9]">
                    Утверждает порядок оказания государственной адресной социальной помощи (ГАСП) семьям, предоставления бесплатных продуктов питания детям первых двух лет жизни, возмещения затрат на приобретение подгузников и единовременных социальных выплат.
                  </div>
                )}
              </div>

            </div>

            {/* ПРАВАЯ КОЛОНКА (4 из 12): Юридическая помощь */}
            <div className="col-span-12 lg:col-span-4 bg-[#FAF4ED] rounded-[32px] p-7 border border-[#EDE0D2] shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-[#1E3029] tracking-tight">
                  Юридическая помощь
                </h3>
                <p className="text-xs text-[#556862] mt-2 leading-relaxed">
                  Вы можете получить бесплатную консультацию по вопросам семейного законодательства и льгот у наших специалистов
                </p>

                <ol className="text-xs text-[#556862] mt-5 space-y-3.5 list-decimal pl-4 leading-relaxed font-medium">
                  <li>Ознакомьтесь с интересующим вас законом в списке слева.</li>
                  <li>Если у вас остались вопросы, задайте их юристу в онлайн-чате.</li>
                  <li>Ответ поступит в течение 15 минут в личный кабинет.</li>
                </ol>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsLawyerModalOpen(true)}
                  className="w-full bg-[#1D8E54] hover:bg-[#177343] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Задать вопрос юристу</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Подвал десктопного портала */}
        <footer className="max-w-7xl mx-auto px-6 mt-14 pt-8 pb-10 border-t border-[#EFE5DB] text-xs text-[#6B7C77] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#283D38]">Родные люди</span>
            <span>• Экосистема поддержки материнства и детства Республики Беларусь</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <Heart className="w-3.5 h-3.5 text-[#E58A7D]" />
            <span>Конкурс «100 идей для Беларуси»</span>
          </div>
        </footer>

      </div>

      {/* ========================================================================= */}
      {/* 2. НАСТОЯЩИЙ МОБИЛЬНЫЙ ИНТЕРФЕЙС (VIEWPORT МЕНЬШЕ MD)                    */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {renderMobileContent(false)}
      </div>

      {/* ========================================================================= */}
      {/* ИНТЕРАКТИВНОЕ МОДАЛЬНОЕ ОКНО ЧЕК-ЛИСТА (ДЕКРЕТНЫЙ ТРЕКЕР С ПРОГРЕСС-БАРОМ)*/}
      {/* ========================================================================= */}
      {activeTrackerModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#F0E4D7] space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 shadow-xs"
                  style={{ backgroundColor: activeTrackerModal.color }}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#1E3029] leading-snug">
                    {activeTrackerModal.title}
                  </h3>
                  <span className="text-xs text-[#6B7C77] block mt-0.5">
                    Интерактивный чек-лист по сбору документов
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTrackerModal(null)}
                className="w-8 h-8 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-sm shrink-0 hover:bg-[#e2d4c5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Анимированный прогресс-бар */}
            <div className="bg-white rounded-2xl p-4 border border-[#EFE5DB] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#283D38]">
                  Выполнено {completedCount} из {totalCount} шагов ({progressPercent}%)
                </span>
                <span className="text-[11px] font-semibold text-[#208253]">
                  {progressPercent === 100 ? 'Готово к подаче' : 'В процессе'}
                </span>
              </div>
              <div className="w-full bg-[#EFE5DB] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#208253] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Список шагов с круглыми интерактивными чек-боксами */}
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {activeTrackerModal.steps.map((step, idx) => {
                const isChecked = !!checkedSteps[step.id];
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${
                      isChecked
                        ? 'bg-[#F4FAF7] border-emerald-500/30'
                        : 'bg-white border-[#EFE5DB] hover:bg-[#FAF4ED]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-[#208253]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#C4B2A0]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`block transition-colors ${
                        isChecked
                          ? 'text-[#8C9C96] line-through'
                          : 'text-[#283D38] font-medium'
                      }`}>
                        {idx + 1}. {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#F0E4D7] flex items-center justify-between">
              <span className="text-[11px] text-[#6B7C77]">
                Нажимайте на шаги, чтобы отмечать галочками
              </span>
              <button
                onClick={() => setActiveTrackerModal(null)}
                className="px-5 py-2 rounded-xl bg-[#208253] text-white text-xs font-bold hover:bg-[#1a6b43] transition-colors shadow-2xs cursor-pointer"
              >
                Сохранить
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* МОДАЛЬНОЕ ОКНО «ЗАДАТЬ ВОПРОС ЮРИСТУ»                                     */}
      {/* ========================================================================= */}
      {isLawyerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#F0E4D7] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#1D8E54]" />
                <h3 className="font-extrabold text-base text-[#1E3029]">
                  Бесплатная юридическая консультация
                </h3>
              </div>
              <button
                onClick={() => setIsLawyerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-sm hover:bg-[#e2d4c5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B7C77] leading-relaxed">
              Задайте вопрос специалисту по выплатам, декретному отпуску или семейному капиталу в Республике Беларусь.
            </p>

            <form onSubmit={handleSendQuestion} className="space-y-3">
              <textarea
                required
                rows={4}
                value={lawyerQuestion}
                onChange={(e) => setLawyerQuestion(e.target.value)}
                placeholder="Опишите вашу ситуацию (например: назначение пособия при увольнении, оформление льготной очереди в садик...)"
                className="w-full p-3.5 bg-white border border-[#E8DACB] rounded-2xl text-xs text-[#283D38] outline-hidden focus:border-[#1D8E54] resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#6B7C77]">
                  Ответ поступит в личный кабинет
                </span>

                <button
                  type="submit"
                  disabled={isQuestionSent}
                  className="px-5 py-2.5 rounded-xl bg-[#1D8E54] text-white text-xs font-bold hover:bg-[#177343] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isQuestionSent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Отправлено!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Отправить</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

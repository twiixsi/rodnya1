'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Info,
  Calendar,
  Check,
  ChevronDown,
  Building,
  UserCheck
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { calculateBelarusFamilyBenefits, BELARUS_ECONOMIC_CONSTANTS } from '@/lib/calculations/benefits';
import { BenefitCalculationInput } from '@/types';
import { MOCK_CHECKLISTS } from '@/lib/supabase/mock-data';

export default function BenefitsPage() {
  const { isMobileLayout, completedChecklistItems, toggleChecklistItem, benefits } = useApp();

  // Mobile sub-tab state
  const [mobileTab, setMobileTab] = useState<'calc' | 'benefits' | 'checklist'>('calc');

  // Calculator inputs
  const [inputs, setInputs] = useState<BenefitCalculationInput>({
    region: 'г. Минск',
    children_count: 2,
    child_order: 2,
    family_status: 'full',
    has_child_under_3: true,
    has_child_disability: false,
    employment_status: 'employed',
    average_monthly_income_per_capita: 850,
    housing_queue_needed: true
  });

  const [activeChecklistId, setActiveChecklistId] = useState<string>('chk-01');

  // Calculation results
  const result = calculateBelarusFamilyBenefits(inputs);

  const activeChecklist = MOCK_CHECKLISTS.find(c => c.id === activeChecklistId) || MOCK_CHECKLISTS[0];

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0EC] text-[#E58A7D] text-xs font-bold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Навигатор государственных выплат</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
              Калькулятор государственной поддержки семей РБ
            </h1>
            <p className="text-sm text-[#556862] mt-1 max-w-2xl leading-relaxed">
              Интерактивный расчёт пособий при рождении, выплат по уходу до 3 лет, семейного капитала и льгот в Республике Беларусь в соответствии с актуальным законодательством.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="p-3 bg-[#F8F1E8] rounded-2xl border border-[#E9DACB] text-xs">
              <span className="text-[#6B7C77] block text-[10px]">Базовый норматив (БПМ):</span>
              <span className="font-bold text-[#283D38]">{BELARUS_ECONOMIC_CONSTANTS.BPM} BYN</span>
            </div>
            <div className="p-3 bg-[#F8F1E8] rounded-2xl border border-[#E9DACB] text-xs">
              <span className="text-[#6B7C77] block text-[10px]">Средняя зарплата (СЗП):</span>
              <span className="font-bold text-[#283D38]">{BELARUS_ECONOMIC_CONSTANTS.SZP} BYN</span>
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        {isMobileLayout && (
          <div className="grid grid-cols-3 gap-1 bg-[#F8F1E8] p-1 rounded-2xl mt-4 text-xs font-semibold">
            <button
              onClick={() => setMobileTab('calc')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'calc' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Калькулятор
            </button>
            <button
              onClick={() => setMobileTab('benefits')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'benefits' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Все льготы
            </button>
            <button
              onClick={() => setMobileTab('checklist')}
              className={`py-2 rounded-xl transition-all ${
                mobileTab === 'checklist' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Чек-лист
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Calculator Form & Real-time Calculation Results */}
      {(!isMobileLayout || mobileTab === 'calc') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (5 cols on Desktop) */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 lg:p-7 border border-[#F0E4D7] shadow-soft space-y-5">
            <h2 className="text-base font-bold text-[#283D38] flex items-center gap-2 border-b border-[#F0E4D7] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#34785D] text-white flex items-center justify-center text-xs">1</span>
              <span>Параметры вашей семьи</span>
            </h2>

            {/* Region */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283D38]">Регион проживания:</label>
              <select
                value={inputs.region}
                onChange={(e) => setInputs({ ...inputs, region: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-xs font-medium text-[#283D38] outline-hidden focus:border-[#34785D]"
              >
                <option value="г. Минск">г. Минск</option>
                <option value="Минская область">Минская область</option>
                <option value="Брестская область">Брестская область</option>
                <option value="Гродненская область">Гродненская область</option>
                <option value="Витебская область">Витебская область</option>
                <option value="Гомельская область">Гомельская область</option>
                <option value="Могилевская область">Могилевская область</option>
              </select>
            </div>

            {/* Children Count & Child Order */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#283D38]">Всего детей:</label>
                <select
                  value={inputs.children_count}
                  onChange={(e) => setInputs({ ...inputs, children_count: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-xs font-medium text-[#283D38] outline-hidden focus:border-[#34785D]"
                >
                  <option value={1}>1 ребёнок</option>
                  <option value={2}>2 детей</option>
                  <option value={3}>3 детей (Многодетная)</option>
                  <option value={4}>4 и более детей</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#283D38]">Какой по счёту:</label>
                <select
                  value={inputs.child_order}
                  onChange={(e) => setInputs({ ...inputs, child_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-xs font-medium text-[#283D38] outline-hidden focus:border-[#34785D]"
                >
                  <option value={1}>1-й ребёнок</option>
                  <option value={2}>2-й ребёнок</option>
                  <option value={3}>3-й ребёнок</option>
                  <option value={4}>4-й и последующие</option>
                </select>
              </div>
            </div>

            {/* Family Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283D38]">Состав семьи:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { value: 'full', label: 'Полная семья' },
                  { value: 'single_mother', label: 'Одинокая мама' },
                  { value: 'large_family', label: 'Многодетная' },
                  { value: 'foster', label: 'Опекунская' }
                ].map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setInputs({ ...inputs, family_status: s.value as any })}
                    className={`py-2 px-3 rounded-xl border font-medium text-left transition-all ${
                      inputs.family_status === s.value
                        ? 'bg-[#E5EFE3] border-[#34785D] text-[#34785D] font-bold'
                        : 'bg-[#F8F1E8] border-transparent text-[#283D38]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes: Child under 3 & Disability */}
            <div className="space-y-2 pt-2 border-t border-[#F0E4D7]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#283D38]">
                <input
                  type="checkbox"
                  checked={inputs.has_child_under_3}
                  onChange={(e) => setInputs({ ...inputs, has_child_under_3: e.target.checked })}
                  className="w-4 h-4 rounded-md text-[#34785D] accent-[#34785D]"
                />
                <span className="font-medium">В семье есть ребёнок в возрасте до 3 лет</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#283D38]">
                <input
                  type="checkbox"
                  checked={inputs.has_child_disability}
                  onChange={(e) => setInputs({ ...inputs, has_child_disability: e.target.checked })}
                  className="w-4 h-4 rounded-md text-[#34785D] accent-[#34785D]"
                />
                <span className="font-medium">Ребёнок имеет статус инвалидности (45% СЗП)</span>
              </label>
            </div>

            {/* Income per capita */}
            <div className="space-y-1.5 pt-2 border-t border-[#F0E4D7]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#283D38]">Среднедушевой доход на члена семьи:</label>
                <span className="text-xs font-bold text-[#34785D]">{inputs.average_monthly_income_per_capita} BYN</span>
              </div>
              <input
                type="range"
                min={200}
                max={2500}
                step={25}
                value={inputs.average_monthly_income_per_capita}
                onChange={(e) => setInputs({ ...inputs, average_monthly_income_per_capita: Number(e.target.value) })}
                className="w-full accent-[#34785D]"
              />
              <span className="text-[10px] text-[#6B7C77] block">
                Если доход ниже 437,80 BYN (1 БПМ), положено бесплатное питание «Беллакт» и ГАСП.
              </span>
            </div>
          </div>

          {/* Right Column: Calculation Results (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Result Banner */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0E4D7] pb-4">
                <div>
                  <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider block">
                    Результаты расчёта
                  </span>
                  <h3 className="text-lg font-bold text-[#283D38]">Потенциально доступные выплаты</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E5EFE3] text-[#34785D] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Total Numbers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FDF0EC] rounded-2xl p-5 border border-[#F8DDD4]">
                  <span className="text-xs font-semibold text-[#6B7C77] block">
                    Единовременные выплаты:
                  </span>
                  <span className="text-3xl font-black text-[#D96B5D] block mt-1">
                    {result.lump_sum_total_byn.toLocaleString('ru-RU')} BYN
                  </span>
                  <span className="text-[11px] text-[#8A5A52] mt-1 block">
                    Включая пособие при рождении и учет до 12 нед.
                  </span>
                </div>

                <div className="bg-[#EAF4ED] rounded-2xl p-5 border border-[#D5E8D8]">
                  <span className="text-xs font-semibold text-[#6B7C77] block">
                    Ежемесячно до 3 лет:
                  </span>
                  <span className="text-3xl font-black text-[#34785D] block mt-1">
                    {result.monthly_total_byn.toLocaleString('ru-RU')} BYN
                  </span>
                  <span className="text-[11px] text-[#4A725D] mt-1 block">
                    Выплачивается каждый месяц по месту работы
                  </span>
                </div>
              </div>

              {/* Family Capital Highlight if eligible */}
              {result.family_capital_byn > 0 && (
                <div className="bg-gradient-to-r from-[#F0E4D7] to-[#E9DACB] rounded-2xl p-5 border border-[#DFD1C2] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#245B49] uppercase tracking-wider block">
                      Программа Президента РБ
                    </span>
                    <h4 className="text-base font-bold text-[#283D38]">Семейный капитал</h4>
                    <p className="text-xs text-[#556862]">31 426 BYN безналичных средств на депозит в ОАО «АСБ Беларусбанк»</p>
                  </div>
                  <span className="text-xl font-black text-[#34785D] shrink-0">
                    31 426 BYN
                  </span>
                </div>
              )}

              {/* Breakdown List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#283D38] uppercase tracking-wider">
                  Детализированный перечень мер:
                </h4>

                <div className="divide-y divide-[#F0E4D7]">
                  {result.matched_benefits.map((item, idx) => (
                    <div key={idx} className="py-3.5 space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold text-[#283D38]">{item.benefit.title}</span>
                        <span className="text-xs font-black text-[#34785D] shrink-0">
                          {item.amount_byn.toLocaleString('ru-RU')} BYN
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7C77] leading-relaxed">{item.note}</p>
                      <div className="flex items-center gap-2 pt-1 text-[10px] text-[#8C9C96]">
                        <span>Орган: {item.benefit.official_authority}</span>
                        <span>•</span>
                        <span>Срок: {item.benefit.processing_days}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Disclaimer Notice */}
              <div className="p-3.5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-2.5 text-xs text-[#6B7C77]">
                <Info className="w-4 h-4 text-[#34785D] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  Данный расчёт носит предварительный информационный характер и не заменяет официального решения уполномоченного органа (комиссии по назначению пособий или УТЗСН). Окончательный размер пособия определяется при предоставлении оригиналов документов.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section: «Декрет без бюрократии» (Interactive Checklist) */}
      {(!isMobileLayout || mobileTab === 'checklist') && (
        <section className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-10 border border-[#F0E4D7] shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0E4D7] pb-6">
            <div>
              <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
                Пошаговый помощник
              </span>
              <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
                Декрет без бюрократии
              </h2>
              <p className="text-sm text-[#556862] mt-1">
                Интерактивный чек-лист с отметками выполнения для спокойного оформления всех процедур.
              </p>
            </div>

            {/* Checklist Tabs */}
            <div className="flex items-center gap-2 bg-[#F8F1E8] p-1 rounded-2xl text-xs font-semibold">
              {MOCK_CHECKLISTS.map((chk) => (
                <button
                  key={chk.id}
                  onClick={() => setActiveChecklistId(chk.id)}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    activeChecklistId === chk.id
                      ? 'bg-[#34785D] text-white shadow-xs'
                      : 'text-[#6B7C77] hover:text-[#283D38]'
                  }`}
                >
                  {chk.title}
                </button>
              ))}
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {activeChecklist.items.map((item) => {
              const isChecked = completedChecklistItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-[#E5EFE3]/50 border-[#C7DCBF]'
                      : 'bg-[#FFFDF9] hover:bg-[#F8F1E8] border-[#F0E4D7]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      isChecked
                        ? 'bg-[#34785D] border-[#34785D] text-white'
                        : 'border-[#C5B5A3] bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-[#6B7C77]' : 'text-[#283D38]'}`}>
                        {item.title}
                      </h4>
                      {item.institution_to_visit && (
                        <span className="text-[11px] bg-[#F0E4D7] text-[#283D38] px-2.5 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#34785D]" />
                          <span>{item.institution_to_visit}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#556862] leading-relaxed">
                      {item.description}
                    </p>

                    {item.official_link && (
                      <div className="pt-1">
                        <a
                          href={item.official_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-[#34785D] font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Официальный бланк заявления</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Section: Comprehensive Benefits Catalog */}
      {(!isMobileLayout || mobileTab === 'benefits') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#283D38]">
              Полный каталог государственных пособий Республики Беларусь
            </h2>
            <span className="text-xs text-[#6B7C77]">
              Обновлено: {new Date().toLocaleDateString('ru-RU')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div
                key={b.id}
                className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-2 py-0.5 rounded-md">
                      {b.code}
                    </span>
                    <span className="text-xs font-bold text-[#283D38]">
                      {b.base_amount_byn.toLocaleString('ru-RU')} BYN
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#283D38] leading-snug mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#556862] leading-relaxed">
                    {b.short_description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#F0E4D7] text-xs">
                  <div>
                    <span className="font-semibold text-[#283D38] block text-[11px]">Кому положено:</span>
                    <span className="text-[#6B7C77] text-[11px]">{b.target_group}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#6B7C77]">Срок: {b.processing_days}</span>
                    <a
                      href={b.official_source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#34785D] hover:underline flex items-center gap-1"
                    >
                      <span>Источник</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

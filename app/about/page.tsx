'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Users, 
  Building, 
  ExternalLink, 
  ArrowRight,
  BookOpen,
  Award,
  Heart
} from 'lucide-react';
import { MOCK_ARTICLES } from '@/lib/supabase/mock-data';

export default function AboutPage() {
  return (
    <div className="space-y-12 pt-4 pb-16 max-w-5xl mx-auto">
      {/* Contest Banner Hero */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#245B49] to-[#34785D] text-white p-8 lg:p-12 shadow-float">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-[#F8F1E8]">
            <Award className="w-3.5 h-3.5" />
            <span>Конкурс молодежных инициатив «100 идей для Беларуси — 2027»</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
            Цифровая экосистема «Родныя»
          </h1>

          <p className="text-sm lg:text-base text-[#DCE7E3] leading-relaxed">
            Инновационная национальная платформа поддержки материнства, детства и семьи в Республике Беларусь. Объединяет государственные сервисы, медицину, социальные гарантии и психологическую опору в едином цифровом окне.
          </p>

          <div className="pt-2">
            <span className="font-handwritten text-2xl text-[#E58A7D] font-bold">
              Счастливые семьи — сильная Беларусь ♡
            </span>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-80 h-80 opacity-15 pointer-events-none">
          <Image src="/logo-icon.svg" alt="" width={320} height={320} />
        </div>
      </div>

      {/* Project Mission & Tasks */}
      <section className="bg-[#FFFDF9] rounded-4xl p-8 lg:p-10 border border-[#F0E4D7] shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
            Миссия и концепция
          </span>
          <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
            Зачем создана экосистема «Родныя»?
          </h2>
          <p className="text-sm text-[#556862] mt-1 leading-relaxed">
            Вместо разрозненных десятков сайтов ведомств и очередей в инстанциях — единый удобный цифровой помощник, сопровождающий человека на всех этапах жизненного цикла семьи:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-[#F8F1E8] border border-[#E9DACB] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#34785D] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-base text-[#283D38]">Декрет без бюрократии</h3>
            <p className="text-xs text-[#556862] leading-relaxed">
              Автоматический расчёт всех 10+ видов пособий по нормам БПМ и СЗП, интерактивные пошаговые чек-листы для быстрого оформления документов в ЗАГСе, ФСЗН и исполкомах.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#F8F1E8] border border-[#E9DACB] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#E58A7D] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-base text-[#283D38]">Забота о здоровье и детях</h3>
            <p className="text-xs text-[#556862] leading-relaxed">
              Неделя за неделей календарь беременности Минздрава РБ, подготовка к родам, напоминания о прививках, запись к врачам и интерактивная карта детсадов со свободными местами.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#F8F1E8] border border-[#E9DACB] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6D9E] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-base text-[#283D38]">Психологическая опора</h3>
            <p className="text-xs text-[#556862] leading-relaxed">
              Круглосуточная экстренная кнопка SOS, республиканские горячие линии помощи семье, онлайн-медиация для пар и преодоление послеродового выгорания.
            </p>
          </div>
        </div>
      </section>

      {/* External Integration Architecture (Section 22 of TZ) */}
      <section className="bg-[#FFFDF9] rounded-4xl p-8 lg:p-10 border border-[#F0E4D7] shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full">
            Архитектура интеграций
          </span>
          <h2 className="text-2xl font-extrabold text-[#283D38] mt-2">
            Взаимодействие с государственными органами
          </h2>
          <p className="text-sm text-[#556862] mt-1 leading-relaxed">
            В соответствии с техническим заданием, платформа спроектирована для взаимодействия со следующими государственными автоматизированными системами:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#34785D] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#283D38]">Министерство труда и социальной защиты Республики Беларусь</h4>
              <p className="text-[#556862] mt-0.5">Интеграция с реестрами выплат и базой данных семейного капитала.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#2F6D9E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#283D38]">Министерство здравоохранения Республики Беларусь</h4>
              <p className="text-[#556862] mt-0.5">Клинические протоколы, графики скринингов и электронная медицинская карта.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#7A5BA3] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#283D38]">Министерство образования Республики Беларусь</h4>
              <p className="text-[#556862] mt-0.5">Единая электронная очередь в детские сады и школы Беларуси.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#E58A7D] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#283D38]">Кризисные центры и территориальные центры соцобслуживания (ТЦСОН)</h4>
              <p className="text-[#556862] mt-0.5">Круглосуточная маршрутизация экстренной помощи и кризисных комнат.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Articles & Knowledge Base */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#283D38]">База знаний и статьи</h2>
          <p className="text-sm text-[#556862] mt-1">Официальные разъяснения законодательства и медицинские гиды</p>
        </div>

        <div className="space-y-6">
          {MOCK_ARTICLES.map((art) => (
            <div
              key={art.id}
              id={art.slug}
              className="bg-[#FFFDF9] rounded-4xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E4D7] pb-3">
                <span className="text-xs font-bold text-[#34785D] uppercase tracking-wider bg-[#E5EFE3] px-3 py-1 rounded-full w-fit">
                  {art.author_name} ({art.author_title})
                </span>
                <span className="text-xs text-[#8C9C96]">
                  Опубликовано: {new Date(art.published_at).toLocaleDateString('ru-RU')}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#283D38] leading-tight">
                {art.title}
              </h3>

              <div className="text-xs text-[#556862] leading-relaxed whitespace-pre-line space-y-2">
                {art.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Download, ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function Footer() {
  const { isMobileLayout, setIsDownloadModalOpen } = useApp();

  return (
    <footer className={`bg-[#F0E4D7] border-t border-[#E5D7C7] text-[#283D38] ${isMobileLayout ? 'pb-20' : ''}`}>
      {/* Upper footer band */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Idea */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 select-none">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-10 h-10 drop-shadow-2xs"
                >
                  <path 
                    d="M32 58 C13 42, 3 29, 3 18 C3 7, 12 2, 21 2 C27 2, 30 6, 32 10 C34 6, 37 2, 43 2 C52 2, 61 7, 61 18 C61 29, 51 42, 32 58 Z" 
                    stroke="#E58A7D" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                  <circle cx="22" cy="20" r="5" stroke="#34785D" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M12 38 C12 29, 18 27, 22 27 C26 27, 32 29, 32 38" stroke="#34785D" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <circle cx="42" cy="18" r="5" stroke="#245B49" strokeWidth="3" fill="#FFFDF9" />
                  <path d="M32 38 C32 28, 38 26, 42 26 C46 26, 52 28, 52 38" stroke="#245B49" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <circle cx="32" cy="28" r="3.6" stroke="#E58A7D" strokeWidth="2.6" fill="#FFFDF9" />
                  <path d="M25 44 C25 37, 28 35, 32 35 C36 35, 39 37, 39 44" stroke="#E58A7D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#283D38]">Родные люди</span>
                <p className="font-handwritten text-base text-[#6B7C77]">Забота. Поддержка. Будущее.</p>
              </div>
            </Link>

            <p className="text-sm text-[#556862] leading-relaxed max-w-md">
              Единая цифровая экосистема комплексной поддержки материнства, детства и семьи в Республике Беларусь. Объединяет государственные пособия, здравоохранение, социальные сервисы и психологическую помощь.
            </p>

            <div className="pt-2">
              <span className="font-handwritten text-xl text-[#34785D] block">
                Счастливые семьи — сильная Беларусь ♡
              </span>
            </div>

            {/* PWA App Install Callout */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E2D2C0] shadow-xs flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#34785D] text-white flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#283D38]">Установите приложение «Родные люди»</h4>
                  <p className="text-[11px] text-[#6B7C77]">Android APK (4.8 МБ) + iOS PWA</p>
                </div>
              </div>
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-[#34785D] text-white text-xs font-semibold hover:bg-[#245B49] transition-colors shrink-0 cursor-pointer"
              >
                Скачать / Установить
              </button>
            </div>
          </div>

          {/* Col 2: Сервисы экосистемы */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#283D38] uppercase tracking-wider">Сервисы</h4>
            <ul className="space-y-2 text-sm text-[#556862]">
              <li>
                <Link href="/benefits" className="hover:text-[#34785D] transition-colors">
                  Калькулятор пособий
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:text-[#34785D] transition-colors">
                  Календарь беременности
                </Link>
              </li>
              <li>
                <Link href="/psychology" className="hover:text-[#34785D] transition-colors">
                  Семейный щит & SOS
                </Link>
              </li>
              <li>
                <Link href="/infrastructure" className="hover:text-[#34785D] transition-colors">
                  Социальный гид (Карта)
                </Link>
              </li>
              <li>
                <Link href="/family" className="hover:text-[#34785D] transition-colors">
                  Семейный календарь
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-[#34785D] transition-colors">
                  Цифровая папка семьи
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Официальные ведомства РБ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#283D38] uppercase tracking-wider">Официальные источники</h4>
            <ul className="space-y-2 text-sm text-[#556862]">
              <li>
                <a href="https://mintrud.gov.by" target="_blank" rel="noopener noreferrer" className="hover:text-[#34785D] flex items-center gap-1 transition-colors">
                  <span>Минтруда и соцзащиты РБ</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://minzdrav.gov.by" target="_blank" rel="noopener noreferrer" className="hover:text-[#34785D] flex items-center gap-1 transition-colors">
                  <span>Минздрав Беларуси</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://ssf.gov.by" target="_blank" rel="noopener noreferrer" className="hover:text-[#34785D] flex items-center gap-1 transition-colors">
                  <span>Фонд соцзащиты (ФСЗН)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://edu.gov.by" target="_blank" rel="noopener noreferrer" className="hover:text-[#34785D] flex items-center gap-1 transition-colors">
                  <span>Минобразования РБ</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://belarusbank.by" target="_blank" rel="noopener noreferrer" className="hover:text-[#34785D] flex items-center gap-1 transition-colors">
                  <span>АСБ Беларусбанк (Капитал)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Экстренная помощь & Горячие линии */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E58A7D] uppercase tracking-wider flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Экстренные линии</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/70 border border-[#E5D7C7]">
                <span className="font-bold text-[#283D38] block">8-801-100-8801</span>
                <span className="text-[#6B7C77] text-[11px]">Горячая линия по предотвращению домашнего насилия</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-[#E5D7C7]">
                <span className="font-bold text-[#283D38] block">8-801-100-1611</span>
                <span className="text-[#6B7C77] text-[11px]">Детская телефонная линия (круглосуточно)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-[#E5D7C7]">
                <span className="font-bold text-[#283D38] block">103</span>
                <span className="text-[#6B7C77] text-[11px]">Скорая медицинская помощь</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Contest copyright */}
      <div className="border-t border-[#E2D2C0] bg-[#E8DDD0] py-4 text-xs text-[#6B7C77]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#34785D]" />
            <span>
              Проект разработан в рамках республиканского конкурса «100 идей для Беларуси — 2027».
            </span>
          </div>
          <p className="text-[11px]">
            © 2026–2027 Цифровая экосистема «Родныя». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

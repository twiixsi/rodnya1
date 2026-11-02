'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WifiOff, PhoneCall, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-20 h-20 rounded-full bg-[#F0E4D7] flex items-center justify-center text-[#34785D] mb-6">
        <WifiOff className="w-10 h-10" />
      </div>

      <div className="relative w-12 h-12 mb-3">
        <Image src="/logo-icon.svg" alt="Родныя" width={48} height={48} />
      </div>

      <h1 className="text-2xl font-bold text-[#283D38] mb-2">
        Вы находитесь в автономном режиме
      </h1>
      <p className="text-sm text-[#6B7C77] max-w-md mb-8">
        Подключение к интернету временно недоступно. Экстренные телефоны помощи семье и ранее сохраненные документы продолжают работать офлайн.
      </p>

      {/* Offline Emergency Hotlines */}
      <div className="w-full max-w-sm bg-[#FFFDF9] rounded-2xl p-5 border border-[#F0E4D7] shadow-sm mb-8 text-left space-y-3">
        <div className="flex items-center gap-2 text-[#E58A7D] font-bold text-xs uppercase tracking-wider">
          <PhoneCall className="w-4 h-4" />
          <span>Экстренная связь без интернета:</span>
        </div>

        <div className="space-y-2 text-xs">
          <a href="tel:88011008801" className="block p-2.5 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] transition-colors">
            <span className="font-bold text-[#283D38] block">8-801-100-8801</span>
            <span className="text-[#6B7C77] text-[11px]">Горячая линия по предотвращению домашнего насилия</span>
          </a>
          <a href="tel:88011001611" className="block p-2.5 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] transition-colors">
            <span className="font-bold text-[#283D38] block">8-801-100-1611</span>
            <span className="text-[#6B7C77] text-[11px]">Детская телефонная линия (24/7)</span>
          </a>
          <a href="tel:103" className="block p-2.5 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] transition-colors">
            <span className="font-bold text-[#283D38] block">103</span>
            <span className="text-[#6B7C77] text-[11px]">Скорая медицинская помощь</span>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34785D] text-white text-xs font-semibold hover:bg-[#245B49] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Попробовать снова</span>
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F0E4D7] text-[#283D38] text-xs font-semibold hover:bg-[#E5D7C7] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
}

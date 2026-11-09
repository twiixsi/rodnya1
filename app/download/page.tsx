'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Download, 
  Smartphone, 
  Apple, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  ArrowLeft,
  Bell,
  Heart,
  Calendar,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function DownloadPage() {
  const { canInstallPWA, triggerPWAInstall } = useApp();

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7C77] hover:text-[#34785D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться на главную</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-[#FFFDF9] rounded-4xl p-8 lg:p-12 border border-[#F0E4D7] shadow-soft relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EFE3] text-[#34785D] text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Официальное мобильное приложение экосистемы «Родныя»</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#283D38] leading-tight">
              Вся поддержка семьи прямо в вашем смартфоне
            </h1>

            <p className="text-sm sm:text-base text-[#556862] leading-relaxed">
              Установите приложение «Родныя», чтобы рассчитывать государственные пособия Республики Беларусь, вести календарь здоровья ребёнка, хранить электронные документы и получать экстренную помощь в один клик.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/downloads/rodnya.apk"
                download="rodnya.apk"
                className="px-6 py-4 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span>Скачать APK для Android (rodnya.apk)</span>
              </a>

              <button
                onClick={triggerPWAInstall}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-[#F8F1E8] text-[#283D38] border border-[#E9DACB] font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-[#34785D]" />
                <span>Установить через браузер (PWA)</span>
              </button>
            </div>

            {/* Zero/Clean Account Assurance */}
            <div className="p-4 rounded-2xl bg-[#EAF4ED] border border-[#CDE0C7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#204E3C] block">✓ Полноценный рабочий продукт (не демо!)</span>
                <span className="text-[#556862] text-[11px] block">
                  После установки или регистрации создаётся абсолютно чистый, нулевой семейный кабинет для ваших личных данных.
                </span>
              </div>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl bg-[#208253] hover:bg-[#186842] text-white font-bold text-xs shrink-0 text-center transition-colors shadow-2xs"
              >
                Создать чистый аккаунт
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#6B7C77]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#34785D]" />
                Безопасно и без рекламы
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Lock className="w-4 h-4 text-[#34785D]" />
                Шифрование данных РБ
              </span>
            </div>
          </div>

          {/* Right: Phone Mockup Simulation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-72 rounded-[40px] border-[6px] border-[#283D38] bg-[#F8F1E8] shadow-2xl p-3 relative overflow-hidden">
              {/* Speaker & camera pill */}
              <div className="w-24 h-4 bg-[#283D38] rounded-full mx-auto mb-3" />

              {/* Screen preview */}
              <div className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#E9DACB] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
                  <div className="flex items-center gap-2">
                    <Image src="/logo-icon.svg" alt="Родныя" width={28} height={28} />
                    <span className="font-bold text-sm text-[#283D38]">Родныя</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <div className="p-3 bg-[#E5EFE3] rounded-2xl text-[11px] font-bold text-[#34785D]">
                  👋 Приветствуем в приложении! Все сервисы поддержки работают автономно.
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#F8F1E8] flex items-center gap-2 text-xs">
                    <Heart className="w-4 h-4 text-[#E58A7D]" />
                    <span className="font-semibold text-[#283D38]">Калькулятор пособий</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F1E8] flex items-center gap-2 text-xs">
                    <Calendar className="w-4 h-4 text-[#34785D]" />
                    <span className="font-semibold text-[#283D38]">График прививок и осмотров</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F1E8] flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-[#2F6D9E]" />
                    <span className="font-semibold text-[#283D38]">Цифровые документы</span>
                  </div>
                </div>

                <div className="w-full py-2 bg-[#34785D] text-white rounded-xl text-center text-xs font-bold">
                  Установлено на телефоне
                </div>
              </div>

              {/* Bottom bar */}
              <div className="w-24 h-1 bg-[#283D38]/30 rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Installation Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Android APK Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E5EFE3] text-[#34785D] flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#283D38]">Android (APK-файл)</h3>
          <p className="text-xs text-[#6B7C77] leading-relaxed">
            Прямая установка файла <b>rodnya.apk</b> на любой смартфон с Android 8.0 и выше (Samsung, Xiaomi, Huawei, Honor).
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#556862]">
            <li>Нажмите <b>«Скачать rodnya.apk»</b>.</li>
            <li>Откройте загруженный файл в шторке.</li>
            <li>Подтвердите установку из браузера.</li>
            <li>Готово! Приложение появится на экране.</li>
          </ol>
          <a
            href="/downloads/rodnya.apk"
            download="rodnya.apk"
            className="w-full py-2.5 rounded-xl bg-[#34785D] text-white text-xs font-bold hover:bg-[#245B49] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Скачать rodnya.apk</span>
          </a>
        </div>

        {/* PWA 1-Click Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E5EFF8] text-[#2F6D9E] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#283D38]">Браузерная установка (PWA)</h3>
          <p className="text-xs text-[#6B7C77] leading-relaxed">
            Быстрая установка в 1 клик для Google Chrome, Edge и Samsung Internet. Не требует разрешений сторонних источников.
          </p>
          <ul className="space-y-1.5 text-xs text-[#556862]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34785D] shrink-0" />
              <span>Создаёт официальный WebAPK</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34785D] shrink-0" />
              <span>Работает без интернета через кэш</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34785D] shrink-0" />
              <span>Автоматически обновляется</span>
            </li>
          </ul>
          <button
            onClick={triggerPWAInstall}
            className="w-full py-2.5 rounded-xl bg-[#2F6D9E] text-white text-xs font-bold hover:bg-[#245B82] transition-colors"
          >
            Установить в 1 клик
          </button>
        </div>

        {/* Apple iOS Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#F0E4D7] shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#E58A7D] flex items-center justify-center">
            <Apple className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#283D38]">Apple iPhone (Safari)</h3>
          <p className="text-xs text-[#6B7C77] leading-relaxed">
            Установка на iPhone и iPad через браузер Safari с добавлением полноценной иконки на домашний экран.
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#556862]">
            <li>Откройте сайт в <b>Safari</b>.</li>
            <li>Нажмите значок <b>«Поделиться»</b>.</li>
            <li>Выберите <b>«На экран "Домой"»</b>.</li>
            <li>Нажмите <b>«Добавить»</b>.</li>
          </ol>
          <div className="p-2.5 bg-[#F8F1E8] rounded-xl text-[11px] text-[#6B7C77] text-center font-medium">
            Иконка появится рядом с вашими остальными приложениями.
          </div>
        </div>
      </div>
    </div>
  );
}

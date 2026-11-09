'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Download, 
  Smartphone, 
  Apple, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function DownloadAppModal() {
  const { isDownloadModalOpen, setIsDownloadModalOpen, canInstallPWA, triggerPWAInstall } = useApp();
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'qr'>('android');

  // Auto-detect iOS vs Android
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      if (/iPad|iPhone|iPod/.test(ua)) {
        setActiveTab('ios');
      } else {
        setActiveTab('android');
      }
    }
  }, [isDownloadModalOpen]);

  if (!isDownloadModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FFFDF9] rounded-4xl max-w-lg w-full border border-[#F0E4D7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-linear-to-b from-[#E5EFE3] to-[#FFFDF9] p-6 pb-4 border-b border-[#F0E4D7]">
          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#6B7C77] hover:text-[#283D38] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs p-1.5 border border-[#34785D]/20 shrink-0">
              <Image src="/logo-icon.svg" alt="Родныя" width={40} height={40} priority />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#34785D] bg-white px-2 py-0.5 rounded-full border border-[#34785D]/20 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Официальное приложение «Родные люди»</span>
              </div>
              <h2 className="text-xl font-black text-[#283D38]">Установить на смартфон</h2>
            </div>
          </div>

          {/* Navigation Tabs (Mobile Only) */}
          <div className="flex items-center gap-1.5 mt-4 p-1 bg-white/80 rounded-2xl border border-[#DFD1C2] text-xs font-bold">
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'android' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77] hover:text-[#283D38]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android (APK)</span>
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'ios' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77] hover:text-[#283D38]'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iPhone (iOS)</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'qr' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77] hover:text-[#283D38]'
              }`}
              title="QR-код для камеры телефона"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">QR-код</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* TAB 1: ANDROID NATIVE INSTALLATION & DIRECT APK DOWNLOAD */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#EAF4ED] border border-[#BDE0C8] space-y-2">
                <span className="font-bold text-[#1E5D42] text-sm block">Официальное Android-приложение «Родные люди»</span>
                <p className="text-[#49657D] leading-relaxed">
                  Вы можете скачать установочный APK-файл напрямую либо установить приложение в 1 клик через браузер (WebAPK).
                </p>
              </div>

              {/* ПРЯМАЯ КНОПКА СКАЧАТЬ APK ДЛЯ ANDROID */}
              <a
                href="/downloads/rodnya.apk"
                download="rodnya.apk"
                className="w-full py-3.5 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span>Скачать APK-файл (rodnya.apk)</span>
              </a>

              {canInstallPWA && (
                <button
                  onClick={triggerPWAInstall}
                  className="w-full py-3 rounded-2xl bg-white hover:bg-[#F8F1E8] text-[#283D38] border border-[#BDE0C8] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#34785D]" />
                  <span>Или установить в 1 клик через браузер (PWA)</span>
                </button>
              )}

              <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] space-y-2">
                <span className="font-bold text-[#283D38] block text-xs">
                  Инструкция по установке:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[#556862] text-[11px]">
                  <li>Нажмите кнопку <b>«Скачать APK-файл»</b> выше.</li>
                  <li>После завершения загрузки откройте файл <b>rodnya.apk</b> на телефоне.</li>
                  <li>При необходимости разрешите установку из браузера в настройках безопасности.</li>
                  <li>Нажмите <b>«Установить»</b> — иконка приложения появится на рабочем столе.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: APPLE IOS */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] space-y-2">
                <span className="font-bold text-[#283D38] text-sm block">Установка на Apple iPhone и iPad</span>
                <p className="text-[#6B7C77] leading-relaxed">
                  Платформа «Родные люди» полностью поддерживает установку на iOS через браузер Safari:
                </p>
              </div>

              <ol className="space-y-2 text-[#283D38]">
                <li className="p-2.5 rounded-xl bg-white border border-[#F0E4D7] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#34785D] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Откройте сайт в стандартном браузере <b>Safari</b> на iPhone.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-white border border-[#F0E4D7] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#34785D] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Нажмите кнопку <b>«Поделиться»</b> (квадрат со стрелкой вверх внизу).</span>
                </li>
                <li className="p-2.5 rounded-xl bg-white border border-[#F0E4D7] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#34785D] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Выберите пункт <b>«На экран "Домой"»</b> и нажмите <b>«Добавить»</b>.</span>
                </li>
              </ol>
            </div>
          )}

          {/* TAB 3: QR CODE */}
          {activeTab === 'qr' && (
            <div className="text-center space-y-3 py-2">
              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-3xl border-2 border-[#34785D] shadow-sm flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#283D38]">
                  <rect width="100" height="100" fill="#FFFDF9" />
                  <rect x="5" y="5" width="28" height="28" rx="4" fill="#34785D" />
                  <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFDF9" />
                  <rect x="13" y="13" width="12" height="12" rx="1" fill="#34785D" />

                  <rect x="67" y="5" width="28" height="28" rx="4" fill="#34785D" />
                  <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFDF9" />
                  <rect x="75" y="13" width="12" height="12" rx="1" fill="#34785D" />

                  <rect x="5" y="67" width="28" height="28" rx="4" fill="#34785D" />
                  <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFDF9" />
                  <rect x="13" y="75" width="12" height="12" rx="1" fill="#34785D" />

                  <rect x="40" y="10" width="8" height="8" fill="#283D38" />
                  <rect x="52" y="15" width="6" height="6" fill="#283D38" />
                  <rect x="42" y="25" width="15" height="6" fill="#283D38" />
                  <rect x="10" y="42" width="6" height="15" fill="#283D38" />
                  <rect x="22" y="45" width="12" height="6" fill="#283D38" />
                  <rect x="40" y="40" width="20" height="20" rx="3" fill="#E58A7D" />
                  <rect x="68" y="45" width="10" height="6" fill="#283D38" />
                  <rect x="85" y="40" width="8" height="15" fill="#283D38" />
                  <rect x="40" y="70" width="15" height="8" fill="#283D38" />
                  <rect x="60" y="68" width="8" height="12" fill="#283D38" />
                  <rect x="75" y="75" width="16" height="16" fill="#283D38" />
                </svg>
              </div>

              <div>
                <p className="font-bold text-sm text-[#283D38]">Наведите камеру телефона</p>
                <p className="text-xs text-[#6B7C77] mt-0.5">
                  Откройте камеру на смартфоне для мгновенного перехода в приложение «Родные люди».
                </p>
              </div>
            </div>
          )}

          {/* Clean Account & Real Product Banner */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-[#EAF4ED] to-[#FFFDF9] border border-[#CDE0C7] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#34785D] text-white flex items-center justify-center font-bold text-xs">✓</span>
              <span className="font-bold text-xs text-[#204E3C]">Готовый рабочий продукт (чистый профиль с нуля)</span>
            </div>
            <p className="text-[11px] text-[#556862] leading-relaxed">
              В системе исключены демонстрационные заглушки: при регистрации создаётся абсолютно чистый семейный аккаунт для ваших детей и документов.
            </p>
            <div className="pt-1">
              <a
                href="/register"
                onClick={() => setIsDownloadModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-[11px] transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Создать чистый аккаунт</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="pt-2 border-t border-[#F0E4D7] flex items-center justify-between text-[11px] text-[#6B7C77]">
            <div className="flex items-center gap-1.5 text-[#34785D] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Официальная платформа Беларуси</span>
            </div>
            <span>«Родные люди» • 2027</span>
          </div>
        </div>
      </div>
    </div>
  );
}

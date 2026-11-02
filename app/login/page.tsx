'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function LoginPage() {
  const router = useRouter();
  const { switchUserRole, user } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleDemoLogin = (role: 'user' | 'admin' | 'specialist') => {
    switchUserRole(role);
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFFDF9] rounded-4xl p-6 sm:p-10 border border-[#F0E4D7] shadow-card max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 mx-auto mb-2">
            <Image src="/logo-icon.svg" alt="Родныя" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-black text-[#283D38]">Вход в систему «Родныя»</h1>
          <p className="text-xs text-[#6B7C77]">
            Единая экосистема поддержки семьи Республики Беларусь
          </p>
        </div>

        {/* Demo Fast Login for Contest Jury / Judges */}
        <div className="p-4 rounded-2xl bg-[#E5EFE3] border border-[#CDE0C7] space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#34785D]">
            <Sparkles className="w-4 h-4" />
            <span>Быстрый вход для жюри конкурса:</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-left transition-colors border border-[#CDE0C7] flex items-center justify-between"
            >
              <span>👩 Мама двоих детей (Анна)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#34785D]" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-left transition-colors border border-[#CDE0C7] flex items-center justify-between"
            >
              <span>🏛️ Администратор (Минтруд РБ)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#34785D]" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('specialist')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F8F1E8] text-[#283D38] font-semibold text-left transition-colors border border-[#CDE0C7] flex items-center justify-between"
            >
              <span>🩺 Врач-психолог (Елена)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#34785D]" />
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#283D38]">Электронная почта:</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="anna@example.by"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#283D38]">Пароль:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Войти в личный кабинет</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#6B7C77]">
          <span>Нет учётной записи? </span>
          <Link href="/register" className="font-bold text-[#34785D] hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}

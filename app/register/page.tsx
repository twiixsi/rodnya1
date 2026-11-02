'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных.');
      return;
    }

    setUser({
      id: `usr-${Date.now()}`,
      email,
      full_name: name,
      role: 'user',
      region: 'г. Минск',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      created_at: new Date().toISOString()
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFFDF9] rounded-4xl p-6 sm:p-10 border border-[#F0E4D7] shadow-card max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 mx-auto mb-2">
            <Image src="/logo-icon.svg" alt="Родныя" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-black text-[#283D38]">Регистрация в «Родныя»</h1>
          <p className="text-xs text-[#6B7C77]">
            Создайте защищённый семейный кабинет для получения пособий и сервисов
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#283D38]">Ваше полное имя:</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Анна Иванова"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#283D38]">Электронная почта:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                placeholder="Не менее 8 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded-md text-[#34785D] accent-[#34785D] mt-0.5"
            />
            <span className="text-[11px] text-[#6B7C77] leading-relaxed">
              Я даю согласие на обработку персональных данных в соответствии с Законом Республики Беларусь «О защите персональных данных».
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>Зарегистрироваться</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#6B7C77]">
          <span>Уже есть аккаунт? </span>
          <Link href="/login" className="font-bold text-[#34785D] hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

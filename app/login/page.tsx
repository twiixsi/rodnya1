'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, Sparkles, LogOut, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const { user, isDemoUser, isSupabaseConnected, switchUserRole, logout, setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSupabaseConfigured && supabase) {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setErrorMsg(
            error.message === 'Invalid login credentials'
              ? 'Неверный адрес электронной почты или пароль'
              : error.message
          );
          setLoading(false);
          return;
        }

        // Successfully authenticated via Supabase!
        router.push('/dashboard');
      } catch (err: any) {
        setErrorMsg(err.message || 'Ошибка подключения к базе данных');
        setLoading(false);
      }
    } else {
      // Fallback if keys are not set
      setUser({
        id: `usr-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        role: 'user',
        region: 'г. Минск',
        created_at: new Date().toISOString()
      });
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFFDF9] rounded-4xl p-6 sm:p-10 border border-[#F0E4D7] shadow-card max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <svg 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-12 h-12 drop-shadow-2xs"
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
          <h1 className="text-2xl font-black text-[#283D38]">Вход в систему «Родные люди»</h1>
          <p className="text-xs text-[#6B7C77]">
            Единая экосистема поддержки семьи Республики Беларусь
          </p>
        </div>

        {/* Current Active Account Card with Logout option */}
        {user && (
          <div className="p-4 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 truncate">
              <span className="text-[10px] text-[#8C9C96] block uppercase tracking-wider font-semibold">
                Сейчас выполнен вход:
              </span>
              <span className="font-bold text-[#283D38] block truncate">{user.full_name}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md inline-block ${
                isDemoUser ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isDemoUser ? 'Тестовый демо-аккаунт' : 'Supabase пользователь'}
              </span>
            </div>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors flex items-center gap-1 shrink-0"
              title="Выйти из этого аккаунта"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
          </div>
        )}

        {/* Error message if login failed */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Standard Supabase Login Form */}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38] outline-hidden focus:border-[#34785D]"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38] outline-hidden focus:border-[#34785D]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{loading ? 'Вход в систему...' : 'Войти в личный кабинет'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-1 text-xs text-[#6B7C77]">
          <span>Нет учётной записи? </span>
          <Link href="/register" className="font-bold text-[#34785D] hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}

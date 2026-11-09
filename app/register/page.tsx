'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, Mail, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const BELARUS_REGIONS = [
  'г. Минск',
  'Брестская область',
  'Витебская область',
  'Гомельская область',
  'Гродненская область',
  'Минская область',
  'Могилёвская область'
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, startCleanAccount } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('г. Минск');
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!agree) {
      setErrorMsg('Пожалуйста, подтвердите согласие на обработку персональных данных.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Пароль должен содержать не менее 6 символов.');
      return;
    }

    if (isSupabaseConfigured && supabase) {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: name.trim(),
              region: region,
            }
          }
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          // Create empty profile row in Supabase 'profiles' table
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: email.trim(),
              full_name: name.trim(),
              role: 'user', // Default role for parents. Can be changed to 'admin' / 'specialist' via Supabase Table Editor!
              region: region,
              created_at: new Date().toISOString()
            });
          } catch (e) {
            console.log('Profile upsert note:', e);
          }

          if (data.session) {
            // Direct login (when email confirmation is turned off in Supabase)
            startCleanAccount(name.trim(), email.trim(), region);
            router.push('/dashboard');
          } else {
            // Email confirmation is required in Supabase settings
            setSuccessMsg(
              `Регистрация прошла успешно! Если в вашем проекте Supabase включено подтверждение почты, перейдите по ссылке из письма, отправленного на ${email}. Затем войдите в аккаунт.`
            );
            setLoading(false);
          }
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Ошибка регистрации в базе данных');
        setLoading(false);
      }
    } else {
      // Local fallback when Supabase keys are not set
      startCleanAccount(name.trim(), email.trim(), region);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFFDF9] rounded-4xl p-6 sm:p-10 border border-[#F0E4D7] shadow-card max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 mx-auto mb-2">
            <Image src="/logo-icon.svg" alt="Родныя" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-black text-[#283D38]">Регистрация в экосистеме «Родныя»</h1>
          <p className="text-xs text-[#6B7C77]">
            Создайте личный семейный кабинет для получения мер государственной поддержки и сопровождения
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Учётная запись создана!</span>
            </div>
            <p>{successMsg}</p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-bold text-[#34785D] hover:underline"
              >
                <span>Перейти ко входу</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#283D38] block">Ваше полное имя (ФИО)</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иванова Екатерина Сергеевна"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#283D38] block">Регион проживания (РБ)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38] transition-colors appearance-none cursor-pointer"
              >
                {BELARUS_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#283D38] block">Электронная почта</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ekaterina@mail.by"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#283D38] block">Пароль (не менее 6 символов)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] focus:outline-hidden focus:border-[#34785D] text-[#283D38] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 rounded-sm border-[#DFD1C2] text-[#34785D] focus:ring-[#34785D]"
            />
            <label htmlFor="agree" className="text-[11px] text-[#6B7C77] leading-tight">
              Я подтверждаю согласие на обработку персональных данных в соответствии с Законом Республики Беларусь № 99-З «О защите персональных данных».
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold transition-all shadow-xs flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>Регистрация в базе данных...</span>
            ) : (
              <>
                <span>Создать семейный профиль</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-[#6B7C77] pt-2 border-t border-[#F0E4D7]">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="font-bold text-[#34785D] hover:underline">
            Войти в систему
          </Link>
        </div>

        <div className="p-3 bg-[#E5EFE3] rounded-2xl text-[11px] text-[#34785D] flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Ваш профиль создаётся пустым — вы сможете самостоятельно внести сведения о детях и документы.</span>
        </div>
      </div>
    </div>
  );
}

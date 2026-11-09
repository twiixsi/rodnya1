'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  MessageSquare, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Send, 
  Baby, 
  Search, 
  Phone, 
  ShieldCheck,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/layout/footer';

interface PatientChat {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  avatar: string;
  diagnosis: string;
  allergies?: string;
}

export default function DoctorPage() {
  const { user, doctorAppointments } = useApp();

  const [activeTab, setActiveTab] = useState<'chats' | 'appointments' | 'cards'>('chats');
  
  // Patient chats state
  const [patientChats, setPatientChats] = useState<PatientChat[]>([
    {
      id: 'chat-01',
      parentName: 'Анна Иванова',
      childName: 'Анечка (3 года)',
      childAge: '3 года',
      lastMessage: 'Добрый день, доктор! Подскажите, нужно ли делать ревакцинацию АКДС перед походом в сад?',
      lastTime: '14:20',
      unreadCount: 1,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      diagnosis: 'Плановый осмотр перед детским садом',
      allergies: 'Цитрусовые (легкая сыпь)'
    },
    {
      id: 'chat-02',
      parentName: 'Екатерина Мороз',
      childName: 'Максим (1 год)',
      childAge: '1 год',
      lastMessage: 'Спасибо огромное за выписанный рецепт на молочную кухню!',
      lastTime: 'Вчера',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      diagnosis: 'Наблюдение первого года жизни'
    },
    {
      id: 'chat-03',
      parentName: 'Ольга Васильева',
      childName: 'Дмитрий (5 лет)',
      childAge: '5 лет',
      lastMessage: 'Справка для бассейна в детский комплекс «Олимпик» готова?',
      lastTime: '08.11',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      diagnosis: 'Оформление справки в бассейн'
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>('chat-01');
  const [messages, setMessages] = useState<{ [chatId: string]: { sender: 'doctor' | 'patient'; text: string; time: string }[] }>({
    'chat-01': [
      { sender: 'patient', text: 'Здравствуйте, доктор! Мы готовимся к поступлению в детский ясли-сад № 162.', time: '14:15' },
      { sender: 'patient', text: 'Подскажите, пожалуйста, нужно ли делать ревакцинацию АКДС перед походом в сад?', time: '14:20' }
    ],
    'chat-02': [
      { sender: 'patient', text: 'Спасибо огромное за выписанный рецепт на молочную кухню «Беллакт»!', time: 'Вчера 16:40' },
      { sender: 'doctor', text: 'Пожалуйста! Смеси можно получить в фирменном магазине по паспорту.', time: 'Вчера 17:05' }
    ],
    'chat-03': [
      { sender: 'patient', text: 'Справка для бассейна в детский комплекс «Олимпик» готова?', time: '08.11 11:20' }
    ]
  });

  const [replyText, setReplyText] = useState('');

  const activeChat = patientChats.find(c => c.id === selectedChatId) || patientChats[0];
  const currentMessages = messages[selectedChatId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: 'doctor' as const,
      text: replyText.trim(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg]
    }));

    setPatientChats(prev => prev.map(c => c.id === selectedChatId ? { ...c, unreadCount: 0, lastMessage: replyText.trim() } : c));
    setReplyText('');
  };

  return (
    <div className="min-h-screen bg-[#FAF4EC] text-[#283D38] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-6">
          {/* Doctor Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE2D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1F6E54] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E5EFE3] text-[#1F6E54] text-[11px] font-bold">
                    Медицинский модуль • Врач-педиатр РБ
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700">Приём онлайн</span>
                </div>
                <h1 className="text-2xl font-black text-[#1E3029] mt-1">
                  Кабинет врача: {user?.full_name || 'Д-р Василевский А.С.'}
                </h1>
                <p className="text-xs text-[#556862]">
                  1-я Городская детская клиническая поликлиника г. Минска • Педиатрический участок № 4
                </p>
              </div>
            </div>

            {/* Quick Tabs Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F5EEE6] rounded-2xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('chats')}
                className={`py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'chats' ? 'bg-[#1F6E54] text-white shadow-xs' : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Чаты с пациентами</span>
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'appointments' ? 'bg-[#1F6E54] text-white shadow-xs' : 'text-[#556862] hover:text-[#1E3029]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Записи на приём</span>
              </button>
            </div>
          </div>

          {/* TAB 1: CHATS WITH PATIENTS */}
          {activeTab === 'chats' && (
            <div className="bg-white rounded-3xl border border-[#EDE2D5] shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
              
              {/* Left Column: Patient List (5 cols) */}
              <div className="md:col-span-5 border-r border-[#EDE2D5] flex flex-col">
                <div className="p-4 border-b border-[#EDE2D5] bg-[#FAF4EC]/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#1E3029]">Обращения родителей</h3>
                    <p className="text-[11px] text-[#6B7C77]">Вопросы по здоровью детей и справкам</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#1F6E54] bg-[#E5EFE3] px-2.5 py-0.5 rounded-full">
                    3 диалога
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-[#F5EEE6]">
                  {patientChats.map((chat) => {
                    const isSelected = chat.id === selectedChatId;
                    return (
                      <div
                        key={chat.id}
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          setPatientChats(prev => prev.map(c => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
                        }}
                        className={`p-4 transition-colors cursor-pointer flex items-start gap-3 ${
                          isSelected ? 'bg-[#EAF4ED]' : 'hover:bg-[#FAF4EC]'
                        }`}
                      >
                        <img 
                          src={chat.avatar} 
                          alt={chat.parentName} 
                          className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-[#D5E8D8]" 
                        />
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-[#1E3029] truncate">{chat.parentName}</h4>
                            <span className="text-[10px] text-[#8C9C96]">{chat.lastTime}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#1F6E54] block truncate">
                            {chat.childName}
                          </span>
                          <p className="text-xs text-[#556862] truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-[#1F6E54] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Chat Window (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between bg-[#FAF6F0]/40">
                {/* Chat Top Header */}
                <div className="p-4 border-b border-[#EDE2D5] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeChat.avatar} 
                      alt={activeChat.parentName} 
                      className="w-10 h-10 rounded-2xl object-cover shrink-0 border border-[#D5E8D8]" 
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#1E3029]">{activeChat.parentName}</h3>
                      <span className="text-[11px] text-[#1F6E54] font-medium block">
                        Пациент: <b>{activeChat.childName}</b> • {activeChat.diagnosis}
                      </span>
                    </div>
                  </div>

                  {activeChat.allergies && (
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-xl border border-amber-200">
                      ⚠️ Аллергия: {activeChat.allergies}
                    </span>
                  )}
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {currentMessages.map((msg, idx) => {
                    const isDoctor = msg.sender === 'doctor';
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}
                      >
                        <div 
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isDoctor 
                              ? 'bg-[#1F6E54] text-white rounded-br-xs shadow-xs' 
                              : 'bg-white text-[#1E3029] border border-[#EDE2D5] rounded-bl-xs shadow-2xs'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className={`text-[9px] block text-right mt-1 ${isDoctor ? 'text-emerald-100' : 'text-[#8C9C96]'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#EDE2D5] flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Напишите ответ или медицинскую рекомендацию родителю..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F8F1E8] border border-[#E8DDD1] text-xs text-[#1E3029] placeholder-[#8C9C96] outline-hidden focus:border-[#1F6E54]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-2xl bg-[#1F6E54] hover:bg-[#185742] text-white transition-colors shadow-xs cursor-pointer"
                    title="Отправить сообщение"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-3xl p-6 border border-[#EDE2D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE2D5]">
                <h3 className="font-bold text-base text-[#1E3029]">График онлайн-записей пациентов</h3>
                <span className="text-xs font-semibold text-[#1F6E54]">Регистратура поликлиники № 1</span>
              </div>

              <div className="space-y-3">
                {[
                  { time: '09:00', child: 'Иванова Анна (3 года)', parent: 'Анна Иванова', purpose: 'Оформление справки в ясли-сад № 162', status: 'confirmed' },
                  { time: '10:30', child: 'Козлов Михаил (1.5 года)', parent: 'Мария Козлова', purpose: 'Плановый осмотр и прививка КПК', status: 'confirmed' },
                  { time: '11:45', child: 'Новикова Полина (4 года)', parent: 'Сергей Новиков', purpose: 'Направление к логопеду', status: 'pending' },
                  { time: '14:00', child: 'Смирнов Артём (6 лет)', parent: 'Ольга Смирнова', purpose: 'Справка в бассейн «Олимпик»', status: 'confirmed' },
                ].map((apt, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EDE2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E8DDD1] flex flex-col items-center justify-center font-bold text-[#1F6E54]">
                        <Clock className="w-4 h-4 mb-0.5" />
                        <span className="text-xs">{apt.time}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-[#1E3029] block">{apt.child}</span>
                        <span className="text-[#6B7C77] text-[11px] block">Родитель: {apt.parent}</span>
                        <span className="text-[#1F6E54] font-medium block">Цель: {apt.purpose}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        Запись подтверждена
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

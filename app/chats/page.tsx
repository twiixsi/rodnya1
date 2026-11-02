'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Check, 
  CheckCheck, 
  User, 
  Phone, 
  Video,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export default function ChatsPage() {
  const { conversations, messages, sendMessage, user } = useApp();

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv-01');
  const [inputMsg, setInputMsg] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = messages.filter(m => m.conversation_id === activeConvId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendMessage(activeConvId, inputMsg);
    setInputMsg('');
  };

  return (
    <div className="pt-4 pb-12 max-w-5xl mx-auto">
      <div className="bg-[#FFFDF9] rounded-4xl border border-[#F0E4D7] shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        {/* Left: Conversations List (5 cols) */}
        <div className="md:col-span-5 border-r border-[#F0E4D7] flex flex-col">
          <div className="p-5 border-b border-[#F0E4D7] bg-[#F8F1E8]/50">
            <h1 className="text-lg font-bold text-[#283D38]">Диалоги со специалистами</h1>
            <p className="text-xs text-[#6B7C77]">Конфиденциальные консультации врачей и психологов</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#F8F1E8]">
            {conversations.map((c) => {
              const isSelected = c.id === activeConvId;

              return (
                <div
                  key={c.id}
                  onClick={() => setActiveConvId(c.id)}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'bg-[#E5EFE3]' : 'hover:bg-[#F8F1E8]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#D5E8D8] shrink-0">
                    <img src={c.specialist_avatar} alt={c.specialist_name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#283D38] truncate">{c.specialist_name}</h4>
                      <span className="text-[10px] text-[#8C9C96]">
                        {new Date(c.last_message_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#34785D] font-semibold block">{c.specialist_role}</span>
                    <p className="text-[11px] text-[#6B7C77] truncate">{c.last_message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (7 cols) */}
        <div className="md:col-span-7 flex flex-col h-full bg-[#FAF6F0]/40">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#F0E4D7] bg-[#FFFDF9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D5E8D8] shrink-0">
                    <img src={activeConv.specialist_avatar} alt={activeConv.specialist_name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38]">{activeConv.specialist_name}</h3>
                    <span className="text-[11px] text-[#34785D] flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{activeConv.specialist_role} • В сети</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#6B7C77]">
                  <button 
                    onClick={() => alert('Видеоконсультация доступна по расписанию сессии')}
                    className="p-2 rounded-xl hover:bg-[#F0E4D7] transition-colors" 
                    title="Видеосвязь"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert('Телефонный звонок через защищенный канал')}
                    className="p-2 rounded-xl hover:bg-[#F0E4D7] transition-colors" 
                    title="Звонок"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.is_from_user ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 shadow-xs ${
                        msg.is_from_user
                          ? 'bg-[#34785D] text-white rounded-br-xs'
                          : 'bg-white text-[#283D38] border border-[#E9DACB] rounded-bl-xs'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div className={`text-[9px] text-right flex items-center justify-end gap-1 ${
                        msg.is_from_user ? 'text-white/70' : 'text-[#8C9C96]'
                      }`}>
                        <span>
                          {new Date(msg.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.is_from_user && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-[#FFFDF9] border-t border-[#F0E4D7]">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Прикрепление медицинских выписок или анализов')}
                    className="p-2.5 rounded-xl hover:bg-[#F8F1E8] text-[#6B7C77]"
                    title="Прикрепить файл"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Напишите ваше сообщение специалисту..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-xs text-[#283D38] outline-hidden focus:border-[#34785D]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMsg.trim()}
                    className="p-2.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white disabled:opacity-50 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#6B7C77]">
              Выберите диалог слева
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  HelpCircle, 
  Info,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { askAssistant, AssistantResponse } from '@/lib/assistant/knowledge';

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  sourceUrl?: string;
  relatedAction?: {
    label: string;
    href: string;
  };
  suggestedFollowUps?: string[];
  timestamp: string;
}

export default function AssistantPage() {
  const { isMobileLayout } = useApp();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Здравствуйте! 👋\nЯ — цифровой помощник экосистемы **«Родныя»**.\n\nЗадайте мне любой вопрос о государственной поддержке семей, детских пособиях, беременности, детских садах или психологической помощи в Республике Беларусь.`,
      source: 'Цифровая экосистема «Родныя» (Законодательство РБ)',
      sourceUrl: 'https://mintrud.gov.by',
      suggestedFollowUps: [
        'Какие выплаты положены при рождении второго ребёнка?',
        'Как оформить семейный капитал?',
        'Как встать на очередь в детский сад?',
        'Куда обратиться за экстренной помощью?'
      ],
      timestamp: '10:00'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputText;
    if (!q.trim()) return;

    const userMsg: MessageItem = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response: AssistantResponse = askAssistant(q);
      const assistantMsg: MessageItem = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        source: response.source,
        sourceUrl: response.sourceUrl,
        relatedAction: response.relatedAction,
        suggestedFollowUps: response.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-4 pt-4 pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-3xl p-5 lg:p-6 border border-[#F0E4D7] shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34785D] to-[#245B49] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#283D38]">Умный помощник «Родныя»</h1>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-xs text-[#6B7C77]">
              Ваш персональный консультант по законодательству и сервисам РБ
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'reset-1',
                sender: 'assistant',
                text: 'Диалог обновлен. Чем я могу помочь вам сейчас?',
                timestamp: '10:00',
                suggestedFollowUps: [
                  'Какие выплаты положены при рождении второго ребёнка?',
                  'Как оформить семейный капитал?'
                ]
              }
            ]);
          }}
          className="p-2 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-[#6B7C77] text-xs transition-colors flex items-center gap-1"
          title="Сбросить диалог"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Новый диалог</span>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#FFFDF9] rounded-4xl border border-[#F0E4D7] shadow-card flex flex-col h-[580px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-xs leading-relaxed space-y-2 shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#34785D] text-white rounded-br-xs'
                    : 'bg-[#F8F1E8] text-[#283D38] rounded-bl-xs border border-[#E9DACB]'
                }`}
              >
                {/* Message Text with simple markdown formatting */}
                <div className="whitespace-pre-line space-y-1">
                  {m.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Related Action Link Button */}
                {m.relatedAction && (
                  <div className="pt-2">
                    <Link
                      href={m.relatedAction.href}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFDF9] text-[#34785D] font-bold shadow-xs hover:bg-[#F0E4D7] transition-colors"
                    >
                      <span>{m.relatedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Official Source Footnote */}
                {m.source && (
                  <div className="pt-2 border-t border-[#E2D2C0] flex items-center justify-between text-[10px] text-[#6B7C77]">
                    <span>Источник: {m.source}</span>
                    {m.sourceUrl && (
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-0.5 text-[#34785D] font-semibold"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                )}

                <div className={`text-[9px] text-right ${m.sender === 'user' ? 'text-white/70' : 'text-[#8C9C96]'}`}>
                  {m.timestamp}
                </div>
              </div>

              {/* Suggested Follow-up Questions Pills */}
              {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
                  {m.suggestedFollowUps.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSendMessage(q)}
                      className="px-3 py-1.5 rounded-full bg-[#E5EFE3] hover:bg-[#D5E5D2] text-[#34785D] text-[11px] font-semibold transition-colors text-left"
                    >
                      {q} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] w-24">
              <span className="w-2 h-2 rounded-full bg-[#34785D] animate-ping" />
              <span className="text-xs text-[#6B7C77]">Печатает...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 lg:p-4 bg-[#FFFDF9] border-t border-[#F0E4D7]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Задайте вопрос о пособиях, садиках, беременности..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs text-[#283D38] placeholder-[#8C9C96] outline-hidden focus:border-[#34785D]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

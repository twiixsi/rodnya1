'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Child,
  FamilyMember,
  Benefit,
  Institution,
  Specialist,
  UserDocument,
  FamilyEvent,
  NotificationItem,
  Conversation,
  ChatMessage,
  ModerationProposal
} from '@/types';
import {
  INITIAL_USER,
  INITIAL_CHILDREN,
  INITIAL_FAMILY_MEMBERS,
  MOCK_BENEFITS,
  MOCK_INSTITUTIONS,
  MOCK_SPECIALISTS,
  MOCK_DOCUMENTS,
  MOCK_EVENTS,
  MOCK_NOTIFICATIONS,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES
} from '@/lib/supabase/mock-data';

export type ViewMode = 'auto' | 'desktop' | 'mobile';

interface AppContextType {
  // Device mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMobileLayout: boolean;

  // User & Auth
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  switchUserRole: (role: 'user' | 'admin' | 'specialist') => void;

  // Family & Children
  childrenList: Child[];
  addChild: (child: Omit<Child, 'id' | 'user_id'>) => void;
  familyMembers: FamilyMember[];

  // Institutions & Favorites
  institutions: Institution[];
  favorites: string[];
  toggleFavorite: (institutionId: string) => void;
  addInstitutionProposal: (proposal: Omit<ModerationProposal, 'id' | 'user_id' | 'user_name' | 'status' | 'created_at'>) => void;
  moderationProposals: ModerationProposal[];
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;

  // Checklists
  completedChecklistItems: string[];
  toggleChecklistItem: (itemId: string) => void;

  // Documents
  documents: UserDocument[];
  addDocument: (doc: Omit<UserDocument, 'id' | 'user_id' | 'uploaded_at'>) => void;
  removeDocument: (id: string) => void;

  // Calendar
  events: FamilyEvent[];
  addEvent: (event: Omit<FamilyEvent, 'id' | 'user_id'>) => void;
  toggleEventCompleted: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Chat
  conversations: Conversation[];
  messages: ChatMessage[];
  sendMessage: (conversationId: string, content: string) => void;

  // Benefits
  benefits: Benefit[];
  updateBenefitAmount: (benefitId: string, newAmount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('auto');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Core entities
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [institutions, setInstitutions] = useState<Institution[]>(MOCK_INSTITUTIONS);
  const [favorites, setFavorites] = useState<string[]>(['inst-01', 'inst-05']);
  const [completedChecklistItems, setCompletedChecklistItems] = useState<string[]>(['ci-01', 'ci-04', 'ci-05']);
  const [documents, setDocuments] = useState<UserDocument[]>(MOCK_DOCUMENTS);
  const [events, setEvents] = useState<FamilyEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [benefits, setBenefits] = useState<Benefit[]>(MOCK_BENEFITS);

  // Moderation proposals
  const [moderationProposals, setModerationProposals] = useState<ModerationProposal[]>([
    {
      id: 'prop-01',
      user_id: 'usr-bel-001',
      user_name: 'Анна Иванова',
      facility_name: 'Центральный детский парк им. Горького',
      category: 'accessible_space',
      address: 'ул. Фрунзе, 2',
      city: 'г. Минск',
      feature_type: 'mother_child_room',
      description: 'Открыта новая тёплая комната матери и ребёнка с пеленальным столиком и умывальником возле колеса обозрения.',
      status: 'pending',
      created_at: '2026-10-30T11:20:00Z'
    }
  ]);

  // Handle responsive screen resize
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const isMobileLayout = viewMode === 'mobile' ? true : viewMode === 'desktop' ? false : isMobileScreen;

  // Actions
  const switchUserRole = (role: 'user' | 'admin' | 'specialist') => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-001',
        email: 'admin@rodnya.by',
        full_name: 'Администратор портала (Министерство труда и соцзащиты)',
        role: 'admin',
        region: 'г. Минск',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        created_at: '2026-01-01T08:00:00Z'
      });
    } else if (role === 'specialist') {
      setUser({
        id: 'usr-spec-001',
        email: 'kovaleva@rodnya.by',
        full_name: 'Елена Михайловна Ковалёва',
        role: 'specialist',
        region: 'г. Минск',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        created_at: '2026-02-01T08:00:00Z'
      });
    } else {
      setUser(INITIAL_USER);
    }
  };

  const addChild = (newChild: Omit<Child, 'id' | 'user_id'>) => {
    const child: Child = {
      ...newChild,
      id: `ch-${Date.now()}`,
      user_id: user?.id || 'usr-bel-001'
    };
    setChildrenList(prev => [...prev, child]);
  };

  const toggleFavorite = (instId: string) => {
    setFavorites(prev => 
      prev.includes(instId) ? prev.filter(id => id !== instId) : [...prev, instId]
    );
  };

  const toggleChecklistItem = (itemId: string) => {
    setCompletedChecklistItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const addDocument = (doc: Omit<UserDocument, 'id' | 'user_id' | 'uploaded_at'>) => {
    const newDoc: UserDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      user_id: user?.id || 'usr-bel-001',
      uploaded_at: new Date().toISOString()
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const addEvent = (event: Omit<FamilyEvent, 'id' | 'user_id'>) => {
    const newEvent: FamilyEvent = {
      ...event,
      id: `ev-${Date.now()}`,
      user_id: user?.id || 'usr-bel-001'
    };
    setEvents(prev => [...prev, newEvent].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const toggleEventCompleted = (id: string) => {
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, is_completed: !ev.is_completed } : ev));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.is_read).length;

  const sendMessage = (conversationId: string, content: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: user?.id || 'usr-bel-001',
      sender_name: user?.full_name || 'Анна',
      is_from_user: true,
      content,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);

    // Update conversation last message
    setConversations(prev => prev.map(c => 
      c.id === conversationId ? {
        ...c,
        last_message: content,
        last_message_at: new Date().toISOString()
      } : c
    ));

    // Simulated specialist auto-reply after 1.5 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: 'spec-01',
        sender_name: 'Елена Ковалёва (Психолог)',
        sender_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        is_from_user: false,
        content: `Спасибо за ваше сообщение! Я ознакомилась с деталями. Вы поступаете абсолютно правильно, сохраняйте спокойный доверительный контакт. Если возникнут дополнительные вопросы, напишите мне здесь.`,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const addInstitutionProposal = (proposal: Omit<ModerationProposal, 'id' | 'user_id' | 'user_name' | 'status' | 'created_at'>) => {
    const newProp: ModerationProposal = {
      ...proposal,
      id: `prop-${Date.now()}`,
      user_id: user?.id || 'usr-bel-001',
      user_name: user?.full_name || 'Пользователь платформы',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setModerationProposals(prev => [newProp, ...prev]);
  };

  const approveProposal = (propId: string) => {
    setModerationProposals(prev => prev.map(p => p.id === propId ? { ...p, status: 'approved' } : p));
  };

  const rejectProposal = (propId: string) => {
    setModerationProposals(prev => prev.map(p => p.id === propId ? { ...p, status: 'rejected' } : p));
  };

  const updateBenefitAmount = (benefitId: string, newAmount: number) => {
    setBenefits(prev => prev.map(b => b.id === benefitId ? { ...b, base_amount_byn: newAmount, last_updated_date: new Date().toISOString().split('T')[0] } : b));
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        isMobileLayout,
        user,
        setUser,
        switchUserRole,
        childrenList,
        addChild,
        familyMembers,
        institutions,
        favorites,
        toggleFavorite,
        completedChecklistItems,
        toggleChecklistItem,
        documents,
        addDocument,
        removeDocument,
        events,
        addEvent,
        toggleEventCompleted,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        conversations,
        messages,
        sendMessage,
        benefits,
        updateBenefitAmount,
        moderationProposals,
        addInstitutionProposal,
        approveProposal,
        rejectProposal
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

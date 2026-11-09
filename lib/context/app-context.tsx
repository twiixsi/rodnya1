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
  ModerationProposal,
  VaccineItem,
  DoctorAppointment,
  KindergartenQueueApplication
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
  MOCK_MESSAGES,
  MOCK_VACCINES,
  MOCK_KINDERGARTEN_APPLICATIONS,
  MOCK_DOCTOR_APPOINTMENTS
} from '@/lib/supabase/mock-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export type ViewMode = 'auto' | 'desktop' | 'mobile';

export const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-001',
  email: 'admin@rodnya.by',
  full_name: 'Администратор портала (Минтруд)',
  role: 'admin',
  region: 'г. Минск',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  created_at: '2026-01-01T08:00:00Z'
};

export const DEMO_SPECIALIST: UserProfile = {
  id: 'usr-spec-001',
  email: 'kovaleva@rodnya.by',
  full_name: 'Елена Михайловна Ковалёва',
  role: 'specialist',
  region: 'г. Минск',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  created_at: '2026-02-01T08:00:00Z'
};

interface AppContextType {
  // Device mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMobileLayout: boolean;

  // Supabase state
  isSupabaseConnected: boolean;

  // User & Auth
  user: UserProfile | null;
  isDemoUser: boolean;
  setUser: (user: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  switchUserRole: (role: 'user' | 'admin' | 'specialist') => void;
  logout: () => Promise<void>;

  // Family & Children
  childrenList: Child[];
  addChild: (child: Omit<Child, 'id' | 'user_id'>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
  familyMembers: FamilyMember[];

  // Institutions & Favorites
  institutions: Institution[];
  favorites: string[];
  toggleFavorite: (institutionId: string) => Promise<void>;
  addInstitutionProposal: (proposal: Omit<ModerationProposal, 'id' | 'user_id' | 'user_name' | 'status' | 'created_at'>) => void;
  moderationProposals: ModerationProposal[];
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;

  // Checklists
  completedChecklistItems: string[];
  toggleChecklistItem: (itemId: string) => void;

  // Documents
  documents: UserDocument[];
  addDocument: (doc: Omit<UserDocument, 'id' | 'user_id' | 'uploaded_at'>) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;

  // Calendar
  events: FamilyEvent[];
  addEvent: (event: Omit<FamilyEvent, 'id' | 'user_id'>) => Promise<void>;
  toggleEventCompleted: (id: string) => Promise<void>;

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

  // Vaccines (Национальный календарь прививок РБ)
  vaccines: VaccineItem[];
  toggleVaccineStatus: (id: string) => void;

  // Kindergarten queue
  kindergartenApplications: KindergartenQueueApplication[];

  // Doctor appointments
  doctorAppointments: DoctorAppointment[];
  addDoctorAppointment: (appointment: Omit<DoctorAppointment, 'id' | 'status'>) => void;

  // App Install / Download Modal
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;
  canInstallPWA: boolean;
  triggerPWAInstall: () => Promise<void>;
  startCleanAccount: (userName?: string, userEmail?: string, region?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('auto');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // User & Auth state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  // Core entities (defaults to empty arrays for real authenticated users)
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>(MOCK_INSTITUTIONS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedChecklistItems, setCompletedChecklistItems] = useState<string[]>([]);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [events, setEvents] = useState<FamilyEvent[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [benefits, setBenefits] = useState<Benefit[]>(MOCK_BENEFITS);
  const [vaccines, setVaccines] = useState<VaccineItem[]>(MOCK_VACCINES);
  const [kindergartenApplications, setKindergartenApplications] = useState<KindergartenQueueApplication[]>(MOCK_KINDERGARTEN_APPLICATIONS);
  const [doctorAppointments, setDoctorAppointments] = useState<DoctorAppointment[]>(MOCK_DOCTOR_APPOINTMENTS);

  // App install & download modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);

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

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPWA(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const triggerPWAInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setCanInstallPWA(false);
          setDeferredPrompt(null);
          setIsDownloadModalOpen(false);
        }
      } catch (err) {
        console.error('PWA install prompt error:', err);
        setIsDownloadModalOpen(true);
      }
    } else {
      // Открываем модальное окно с пошаговыми инструкциями для устройства пользователя
      setIsDownloadModalOpen(true);
    }
  };

  const toggleVaccineStatus = (id: string) => {
    setVaccines(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'completed' ? 'scheduled' : 'completed';
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  const addDoctorAppointment = (appointment: Omit<DoctorAppointment, 'id' | 'status'>) => {
    const newApt: DoctorAppointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'confirmed'
    };
    setDoctorAppointments(prev => [newApt, ...prev]);

    // Автоматически добавляем запись в календарь семьи
    addEvent({
      title: `Приём врача: ${newApt.doctor_name}`,
      category: 'medical',
      date: newApt.date,
      time: newApt.time,
      child_name: newApt.child_name,
      location: newApt.institution_name,
      notes: newApt.notes || 'Запись через модуль «Здоровое поколение»',
      is_completed: false
    });

    // Уведомление для пользователя
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        user_id: user?.id || 'usr-bel-001',
        title: 'Запись к врачу успешно подтверждена',
        message: `Вы записаны к доктору ${newApt.doctor_name} на ${newApt.date} в ${newApt.time}.`,
        type: 'medical',
        action_url: '/health',
        is_read: false,
        created_at: new Date().toISOString()
      },
      ...prev
    ]);
  };

  // Helper to load mock data for demo roles
  const loadDemoData = (role: 'user' | 'admin' | 'specialist') => {
    setIsDemoUser(true);
    setChildrenList(INITIAL_CHILDREN);
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    setDocuments(MOCK_DOCUMENTS);
    setEvents(MOCK_EVENTS);
    setFavorites(['inst-01', 'inst-05']);
    setCompletedChecklistItems(['ci-01', 'ci-04', 'ci-05']);
    setNotifications(MOCK_NOTIFICATIONS);

    if (role === 'admin') {
      setUser(DEMO_ADMIN);
    } else if (role === 'specialist') {
      setUser(DEMO_SPECIALIST);
    } else {
      setUser(INITIAL_USER);
    }
  };

  // Helper to fetch real user's private data from Supabase
  const loadSupabaseUserData = async (userId: string) => {
    try {
      // 1. Fetch user children
      const { data: dbChildren } = await supabase
        .from('children')
        .select('*')
        .eq('user_id', userId);
      setChildrenList(dbChildren || []);

      // 2. Fetch user documents
      const { data: dbDocs } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId);
      setDocuments(dbDocs || []);

      // 3. Fetch user events
      const { data: dbEvents } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', userId);
      if (dbEvents) {
        setEvents(dbEvents.map((e: any) => ({
          ...e,
          date: e.event_date || e.date
        })));
      } else {
        setEvents([]);
      }

      // 4. Fetch family members
      const { data: dbMembers } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', userId);
      setFamilyMembers(dbMembers || []);

      // 5. Fetch user favorites
      const { data: dbFavs } = await supabase
        .from('user_favorites')
        .select('institution_id')
        .eq('user_id', userId);
      setFavorites(dbFavs?.map((f: any) => f.institution_id) || []);

      // 6. Fetch user checklists
      const { data: dbChecklists } = await supabase
        .from('user_checklists')
        .select('completed_items')
        .eq('user_id', userId);
      if (dbChecklists && dbChecklists.length > 0) {
        const allCompleted = dbChecklists.flatMap((c: any) => c.completed_items || []);
        setCompletedChecklistItems(allCompleted);
      } else {
        setCompletedChecklistItems([]);
      }

      // 7. Fetch user notifications
      const { data: dbNotifs } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId);
      if (dbNotifs && dbNotifs.length > 0) {
        setNotifications(dbNotifs);
      } else {
        // Welcome notification for a new registered user
        setNotifications([{
          id: `notif-welcome-${Date.now()}`,
          user_id: userId,
          title: 'Добро пожаловать в «Родныя»!',
          message: 'Ваш семейный профиль успешно создан. Добавьте информацию о ваших детях и запланируйте важные события.',
          type: 'system',
          is_read: false,
          created_at: new Date().toISOString()
        }]);
      }
    } catch (err) {
      console.error('Error fetching user data from Supabase:', err);
    }
  };

  // Supabase Auth Sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedDemo = localStorage.getItem('rodnya_demo_user');

    if (isSupabaseConfigured && supabase) {
      // Check active Supabase session
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          setIsDemoUser(false);
          try {
            // Read profile from DB (including dynamic role assigned in Supabase)
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const currentUser: UserProfile = profile || {
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
              role: (profile?.role as any) || 'user',
              region: profile?.region || 'г. Минск',
              created_at: session.user.created_at || new Date().toISOString()
            };

            setUser(currentUser);
            // Load their real children, docs, events (empty on new register)
            await loadSupabaseUserData(session.user.id);
          } catch {
            const fallbackUser: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
              role: 'user',
              region: 'г. Минск',
              created_at: session.user.created_at || new Date().toISOString()
            };
            setUser(fallbackUser);
            await loadSupabaseUserData(session.user.id);
          }
        } else {
          // No active Supabase session: Clean unauthenticated guest by default
          // Clear any legacy demo user from localStorage
          if (savedDemo === 'user') {
            localStorage.removeItem('rodnya_demo_user');
          }
          setUser(null);
          setIsDemoUser(false);
          setChildrenList([]);
          setDocuments([]);
          setEvents([]);
          setNotifications([]);
        }
      });

      // Listen for Supabase auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setIsDemoUser(false);
          localStorage.removeItem('rodnya_demo_user');
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const currentUser: UserProfile = profile || {
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
              role: (profile?.role as any) || 'user',
              region: profile?.region || 'г. Минск',
              created_at: session.user.created_at || new Date().toISOString()
            };

            setUser(currentUser);
            await loadSupabaseUserData(session.user.id);
          } catch {
            const fallbackUser: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
              role: 'user',
              region: 'г. Минск',
              created_at: session.user.created_at || new Date().toISOString()
            };
            setUser(fallbackUser);
            await loadSupabaseUserData(session.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsDemoUser(false);
          setChildrenList([]);
          setDocuments([]);
          setEvents([]);
          setNotifications([]);
          localStorage.setItem('rodnya_demo_user', 'none');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Default: clean unauthenticated guest (not logged in)
      if (savedDemo === 'user') {
        localStorage.removeItem('rodnya_demo_user');
      }
      setUser(null);
      setIsDemoUser(false);
      setChildrenList([]);
      setDocuments([]);
      setEvents([]);
      setNotifications([]);
    }
  }, []);

  const isMobileLayout = viewMode === 'mobile' ? true : viewMode === 'desktop' ? false : isMobileScreen;

  // Actions
  const startCleanAccount = (userName = 'Новый пользователь', userEmail = 'user@rodnya.by', region = 'г. Минск') => {
    localStorage.setItem('rodnya_demo_user', 'clean');
    setIsDemoUser(false);
    setUser({
      id: `usr-fresh-${Date.now()}`,
      email: userEmail,
      full_name: userName,
      role: 'user',
      region: region,
      created_at: new Date().toISOString()
    });
    setChildrenList([]);
    setFamilyMembers([]);
    setDocuments([]);
    setEvents([]);
    setFavorites([]);
    setCompletedChecklistItems([]);
    setNotifications([{
      id: `notif-welcome-${Date.now()}`,
      user_id: `usr-fresh-${Date.now()}`,
      title: 'Добро пожаловать в «Родные люди»!',
      message: 'Ваш чистый рабочий кабинет создан. Добавьте членов семьи и ваших детей для персонального расчёта пособий и отслеживания детских садов.',
      type: 'system',
      is_read: false,
      created_at: new Date().toISOString()
    }]);
  };

  const switchUserRole = (role: 'user' | 'admin' | 'specialist') => {
    localStorage.setItem('rodnya_demo_user', role);
    loadDemoData(role);
  };

  const logout = async () => {
    localStorage.setItem('rodnya_demo_user', 'none');
    setUser(null);
    setIsDemoUser(false);
    setChildrenList([]);
    setDocuments([]);
    setEvents([]);
    setFamilyMembers([]);
    setFavorites([]);
    setNotifications([]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error signing out from Supabase:', err);
      }
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);

    if (isSupabaseConfigured && supabase && !isDemoUser) {
      try {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
      } catch (e) {
        console.error('Error updating user profile in DB:', e);
      }
    }
  };

  const addChild = async (newChild: Omit<Child, 'id' | 'user_id'>) => {
    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        const { data, error } = await supabase
          .from('children')
          .insert({
            user_id: user.id,
            name: newChild.name,
            birth_date: newChild.birth_date,
            gender: newChild.gender,
            notes: newChild.notes || null,
            photo_url: newChild.photo_url || null
          })
          .select()
          .single();

        if (data && !error) {
          setChildrenList(prev => [...prev, data]);
          return;
        }
      } catch (e) {
        console.error('Error inserting child to DB:', e);
      }
    }

    // Local / demo fallback
    const child: Child = {
      id: `child-${Date.now()}`,
      user_id: user?.id || 'usr-local',
      ...newChild
    };
    setChildrenList(prev => [...prev, child]);
  };

  const deleteChild = async (id: string) => {
    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        await supabase
          .from('children')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error deleting child from DB:', e);
      }
    }
    setChildrenList(prev => prev.filter(c => c.id !== id));
  };

  const toggleFavorite = async (institutionId: string) => {
    const isFav = favorites.includes(institutionId);
    const updated = isFav
      ? favorites.filter((id) => id !== institutionId)
      : [...favorites, institutionId];
    setFavorites(updated);

    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        if (isFav) {
          await supabase
            .from('user_favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('institution_id', institutionId);
        } else {
          await supabase
            .from('user_favorites')
            .insert({ user_id: user.id, institution_id: institutionId });
        }
      } catch (e) {
        console.error('Error updating favorite in DB:', e);
      }
    }
  };

  const addInstitutionProposal = (proposal: Omit<ModerationProposal, 'id' | 'user_id' | 'user_name' | 'status' | 'created_at'>) => {
    const newProposal: ModerationProposal = {
      id: `prop-${Date.now()}`,
      user_id: user?.id || 'anon',
      user_name: user?.full_name || 'Анонимный родитель',
      status: 'pending',
      created_at: new Date().toISOString(),
      ...proposal
    };
    setModerationProposals(prev => [newProposal, ...prev]);
  };

  const approveProposal = (proposalId: string) => {
    setModerationProposals(prev =>
      prev.map(p => p.id === proposalId ? { ...p, status: 'approved' } : p)
    );
  };

  const rejectProposal = (proposalId: string) => {
    setModerationProposals(prev =>
      prev.map(p => p.id === proposalId ? { ...p, status: 'rejected' } : p)
    );
  };

  const toggleChecklistItem = (itemId: string) => {
    setCompletedChecklistItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const addDocument = async (newDoc: Omit<UserDocument, 'id' | 'user_id' | 'uploaded_at'>) => {
    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        const { data, error } = await supabase
          .from('documents')
          .insert({
            user_id: user.id,
            title: newDoc.title,
            category: newDoc.category,
            file_name: newDoc.file_name,
            file_size_formatted: newDoc.file_size_formatted || '1.2 МБ',
            file_url: newDoc.file_url || '#',
            status: newDoc.status || 'active',
            expires_at: newDoc.expires_at || null
          })
          .select()
          .single();

        if (data && !error) {
          setDocuments(prev => [data, ...prev]);
          return;
        }
      } catch (e) {
        console.error('Error inserting document to DB:', e);
      }
    }

    const doc: UserDocument = {
      id: `doc-${Date.now()}`,
      user_id: user?.id || 'usr-local',
      uploaded_at: new Date().toISOString(),
      ...newDoc
    };
    setDocuments(prev => [doc, ...prev]);
  };

  const removeDocument = async (id: string) => {
    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        await supabase
          .from('documents')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error removing document from DB:', e);
      }
    }
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const addEvent = async (newEvent: Omit<FamilyEvent, 'id' | 'user_id'>) => {
    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        const { data, error } = await supabase
          .from('user_events')
          .insert({
            user_id: user.id,
            title: newEvent.title,
            category: newEvent.category,
            event_date: newEvent.date,
            time: newEvent.time || null,
            child_name: newEvent.child_name || null,
            location: newEvent.location || null,
            notes: newEvent.notes || null,
            is_completed: false
          })
          .select()
          .single();

        if (data && !error) {
          setEvents(prev => [...prev, { ...data, date: data.event_date }]);
          return;
        }
      } catch (e) {
        console.error('Error inserting event to DB:', e);
      }
    }

    const ev: FamilyEvent = {
      id: `ev-${Date.now()}`,
      user_id: user?.id || 'usr-local',
      ...newEvent
    };
    setEvents(prev => [...prev, ev]);
  };

  const toggleEventCompleted = async (id: string) => {
    const current = events.find(e => e.id === id);
    if (!current) return;
    const newStatus = !current.is_completed;

    if (isSupabaseConfigured && supabase && user && !isDemoUser) {
      try {
        await supabase
          .from('user_events')
          .update({ is_completed: newStatus })
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error updating event in DB:', e);
      }
    }

    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, is_completed: newStatus } : e))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.is_read).length;

  const sendMessage = (conversationId: string, content: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: user?.id || 'anon',
      sender_name: user?.full_name || 'Я',
      sender_avatar: user?.avatar_url,
      is_from_user: true,
      content,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: 'spec-ai',
        sender_name: 'Помощник «Родныя»',
        is_from_user: false,
        content: `Спасибо за ваш вопрос! Данные зафиксированы. Если вопрос касается государственных пособий (Закон № 7-З), выплата назначается в течение 10 рабочих дней с момента подачи заявления.`,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const updateBenefitAmount = (benefitId: string, newAmount: number) => {
    setBenefits(prev =>
      prev.map(b => b.id === benefitId ? { ...b, base_amount_byn: newAmount } : b)
    );
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        isMobileLayout,
        isSupabaseConnected: isSupabaseConfigured,
        user,
        isDemoUser,
        setUser,
        updateUserProfile,
        switchUserRole,
        logout,
        childrenList,
        addChild,
        deleteChild,
        familyMembers,
        institutions,
        favorites,
        toggleFavorite,
        addInstitutionProposal,
        moderationProposals,
        approveProposal,
        rejectProposal,
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
        vaccines,
        toggleVaccineStatus,
        kindergartenApplications,
        doctorAppointments,
        addDoctorAppointment,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        canInstallPWA,
        triggerPWAInstall,
        startCleanAccount
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

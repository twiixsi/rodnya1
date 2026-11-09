'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Heart, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Baby, 
  Star, 
  Info,
  Calendar,
  ChevronDown,
  ChevronUp,
  Check,
  Send,
  X,
  Users,
  Compass,
  FileText,
  Building,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Institution } from '@/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/layout/footer';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(() => import('@/components/maps/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] rounded-3xl bg-[#F0E6DA] flex flex-col items-center justify-center text-[#556862] gap-3">
      <div className="w-10 h-10 border-4 border-[#34785D] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-bold">Загрузка реальной карты Республики Беларусь...</span>
    </div>
  ),
});

export default function InfrastructurePage() {
  const { 
    institutions: initialInstitutions, 
    favorites, 
    toggleFavorite, 
    addInstitutionProposal, 
    childrenList,
    user,
    setIsDownloadModalOpen
  } = useApp();

  // Institutions state (live Supabase + fallback to initial)
  const [institutionsList, setInstitutionsList] = useState<Institution[]>(initialInstitutions);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(false);
  const [selectedInst, setSelectedInst] = useState<Institution>(initialInstitutions[0]);
  
  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Queue Accordion State
  const [isQueueExpanded, setIsQueueExpanded] = useState<boolean>(false);

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyChildName, setApplyChildName] = useState<string>(childrenList[0]?.name || 'Иванова Анна Дмитриевна');
  const [applyPhone, setApplyPhone] = useState<string>('+375 (29) 678-43-21');
  const [applyNotes, setApplyNotes] = useState<string>('Прошу рассмотреть постановку в группу раннего возраста на осень 2026 года.');
  const [applySubmitted, setApplySubmitted] = useState<boolean>(false);

  // Proposal modal state
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [proposalForm, setProposalForm] = useState({
    facility_name: '',
    category: 'kindergarten',
    address: '',
    city: 'г. Минск',
    feature_type: 'mother_child_room' as any,
    description: ''
  });
  const [proposalSubmitted, setProposalSubmitted] = useState<boolean>(false);

  // Toast for calendar / favorite
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Fetch real institutions from Supabase table 'institutions' if connected
  useEffect(() => {
    async function loadInstitutionsFromDatabase() {
      if (isSupabaseConfigured && supabase) {
        setIsDbLoading(true);
        try {
          const { data, error } = await supabase
            .from('institutions')
            .select('*')
            .order('name');

          if (data && data.length > 0 && !error) {
            const formatted: Institution[] = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              type: item.type,
              address: item.address,
              city: item.city || 'г. Минск',
              district: item.district || 'Центральный район',
              region: item.region || 'г. Минск',
              coordinates: [
                item.latitude || item.coordinates?.[0] || 53.8965,
                item.longitude || item.coordinates?.[1] || 27.6080
              ],
              phone: item.phone || '+375 (17) 307-45-12',
              work_hours: item.work_hours || 'Пн-Пт 07:00 - 19:00',
              description: item.description || '',
              image_url: item.image_url || '/images/institutions/kindergarten-162.avif',
              free_spots: item.free_spots ?? 5,
              free_spots_nursery: item.free_spots_nursery ?? 2,
              free_spots_garden: item.free_spots_garden ?? 3,
              age_range: item.age_range || 'от 1.5 до 6 лет',
              groups_info: item.groups_info || '14 групп, 16 в группе',
              specialties: Array.isArray(item.specialties) 
                ? item.specialties 
                : Array.isArray(item.tags) 
                ? item.tags 
                : ['Группы и бассейн', 'Услуги и питание'],
              tags: Array.isArray(item.tags) ? item.tags : ['Бассейн', 'Логопед'],
              has_ramp: Boolean(item.has_ramp),
              has_elevator: Boolean(item.has_elevator),
              has_mother_child_room: Boolean(item.has_mother_child_room),
              rating: Number(item.rating || 4.9),
              reviews_count: Number(item.reviews_count || 50),
              badge_text: item.badge_text || '',
              website_url: item.website_url,
              has_online_admin: Boolean(item.has_online_admin),
              admin_name: item.admin_name,
              admin_role: item.admin_role,
              admin_id: item.admin_id
            }));

            setInstitutionsList(formatted);
            // Default to kindergarten 162 or first
            const defaultItem = formatted.find(i => 
              i.id === '00000000-0000-0000-0000-000000000162' || 
              i.id === 'inst-162' ||
              i.name.includes('162')
            ) || formatted[0];
            setSelectedInst(defaultItem);
          }
        } catch (err) {
          console.error('Supabase load note:', err);
        } finally {
          setIsDbLoading(false);
        }
      }
    }

    loadInstitutionsFromDatabase();
  }, []);

  // Filter institutions by Category and Search query
  const filteredInstitutions = institutionsList.filter((inst) => {
    let matchesCategory = true;
    if (selectedCategory === 'kindergarten') {
      matchesCategory = inst.type === 'kindergarten';
    } else if (selectedCategory === 'medical') {
      matchesCategory = inst.type === 'polyclinic';
    } else if (selectedCategory === 'development') {
      matchesCategory = inst.type === 'development_center';
    } else if (selectedCategory === 'hobby') {
      matchesCategory = inst.type === 'hobby_club';
    } else if (selectedCategory === 'one_window') {
      matchesCategory = inst.type === 'one_window';
    } else if (selectedCategory === 'leisure') {
      matchesCategory = inst.type === 'leisure_food' || inst.type === 'maternity_store';
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      inst.name.toLowerCase().includes(q) ||
      inst.address.toLowerCase().includes(q) ||
      inst.description.toLowerCase().includes(q) ||
      (inst.specialties && inst.specialties.some(s => s.toLowerCase().includes(q))) ||
      (inst.tags && inst.tags.some(t => t.toLowerCase().includes(q)))
    );

    return matchesCategory && matchesSearch;
  });

  // Recommended institutions (matching the list from infrastr.jpg)
  const recommendedInstitutions = institutionsList.filter(inst => 
    inst.id === '00000000-0000-0000-0000-000000000001' ||
    inst.id === '00000000-0000-0000-0000-000000000002' ||
    inst.id === '00000000-0000-0000-0000-000000000003' ||
    inst.id === '00000000-0000-0000-0000-000000000006' ||
    inst.id === '00000000-0000-0000-0000-000000000004' ||
    inst.id === 'inst-polyclinic-1' || 
    inst.id === 'inst-hobby-sections' || 
    inst.id === 'inst-polyclinic-pediatric' ||
    inst.id === 'inst-buslik' ||
    inst.id === 'inst-development-genius'
  );

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('kindergarten_applications').insert({
          child_name: applyChildName,
          parent_name: user?.full_name || 'Анна Сергеевна Иванова',
          parent_phone: applyPhone,
          target_institution_id: selectedInst.id.includes('-') && selectedInst.id.length === 36 ? selectedInst.id : null,
          target_institution_name: selectedInst.name,
          application_number: `BY-2026-${Math.floor(1000 + Math.random() * 9000)}-OKNO`,
          group_type: 'nursery',
          notes: applyNotes
        });
      } catch (err) {
        console.warn('Supabase application insert note:', err);
      }
    }

    setTimeout(() => {
      setApplySubmitted(false);
      setIsApplyModalOpen(false);
      showToast(`Заявление в «${selectedInst.name}» успешно направлено в службу «Одно окно»!`);
    }, 1800);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInstitutionProposal(proposalForm);
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalSubmitted(false);
      setShowProposalModal(false);
      showToast('Объект отправлен на модерацию в реестр Беларуси.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF4EC] text-[#283D38] relative selection:bg-[#34785D] selection:text-white flex flex-col justify-between">
      {/* Botanical branch decorative watermarks on left and right borders matching infrastr.jpg */}
      <div 
        className="pointer-events-none absolute left-0 top-36 bottom-20 w-24 sm:w-32 opacity-25 hidden md:block bg-repeat-y bg-contain"
        style={{ backgroundImage: `url('/images/botanical-branch.svg')` }}
      />
      <div 
        className="pointer-events-none absolute right-0 top-36 bottom-20 w-24 sm:w-32 opacity-25 hidden md:block bg-repeat-y bg-contain scale-x-[-1]"
        style={{ backgroundImage: `url('/images/botanical-branch.svg')` }}
      />

      {/* 1. Global Header from Header.tsx */}
      <div>
        <Header />

        {/* 2. Main Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-6 relative z-10">
          
          {/* Page Heading & Subtitle matching infrastr.jpg */}
          <div className="space-y-1.5 pt-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E3029]">
              Детские сады, клиники, магазины и центры развития
            </h1>
            <p className="text-xs sm:text-sm text-[#556862] max-w-3xl leading-relaxed">
              Карта учреждений Республики Беларусь, свободные места и льготы по поддержке семей
            </p>
          </div>

          {/* Filter Pills Carousel matching infrastr.jpg */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold select-none">
            {[
              { id: 'all', label: 'Все' },
              { id: 'kindergarten', label: 'Детские сады и ясли' },
              { id: 'medical', label: 'Медицинские учреждения' },
              { id: 'development', label: 'Развивающие центры' },
              { id: 'hobby', label: 'Кружки и секции' },
              { id: 'one_window', label: 'Услуги «Одно Окно»' },
              { id: 'leisure', label: 'Досуг и питание' },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1E3029] text-white shadow-xs font-bold'
                      : 'bg-[#EDE4DA] hover:bg-[#E2D6C7] text-[#4F605A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search bar matching infrastr.jpg: Oval capsule input */}
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 text-[#8C9C96] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#E8DDD1] text-xs text-[#1E3029] placeholder-[#8C9C96] outline-hidden focus:border-[#34785D] shadow-2xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C9C96] hover:text-[#1E3029]"
              >
                ✕
              </button>
            )}
          </div>

          {/* 3. Middle Double-Card Widget matching infrastr.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Card: Electronic Kindergarten Queue (Служба «Одно окно») */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-[#1E3029]">
                      Электронная очередь в детский сад – Служба «Одно окно»
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsQueueExpanded(!isQueueExpanded)}
                    className="p-1 rounded-full text-[#6B7C77] hover:bg-[#F8F1E8] transition-colors cursor-pointer"
                    title={isQueueExpanded ? 'Свернуть детали' : 'Развернуть детали заявки'}
                  >
                    {isQueueExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Subtext from infrastr.jpg */}
                <div className="space-y-1.5 text-xs text-[#556862]">
                  <p className="font-medium text-[#283D38]">
                    Приоритетное заявление (EK227-8-1); • <span className="text-[#34785D] font-bold">Статус заявки: 20024-5M0228</span>
                  </p>
                  <div className="flex items-start gap-2 pt-1 text-[11px] sm:text-xs">
                    <span className="w-4 h-4 rounded-full bg-[#E5EFE3] text-[#34785D] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      i
                    </span>
                    <p className="leading-relaxed">
                      <b>Статус:</b> На рассмотрении в администрации района - Служба «Одно окно» от 25.08.2024.<br />
                      Подтверждены условия, пакет документов проверен отделом образования и передан в исполнение.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expandable details */}
              {isQueueExpanded && (
                <div className="mt-4 pt-4 border-t border-[#F0E4D7] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FBF7F0] p-3 rounded-2xl animate-in fade-in duration-200">
                  <div>
                    <span className="text-[10px] text-[#6B7C77] block uppercase font-bold">Заявитель:</span>
                    <span className="font-semibold text-[#1E3029]">{user?.full_name || 'Анна Иванова'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7C77] block uppercase font-bold">Ребёнок:</span>
                    <span className="font-semibold text-[#1E3029]">Иванова Анна (2023 г.р.)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7C77] block uppercase font-bold">План зачисления:</span>
                    <span className="font-semibold text-[#208253]">Сентябрь 2026 г.</span>
                  </div>
                  <div className="sm:col-span-3 pt-1 text-[11px] text-[#6B7C77]">
                    Выбранные учреждения: <b>Детский ясли-сад № 162</b> (приоритет 1), <b>Детский ясли-сад № 152</b> (приоритет 2).
                  </div>
                </div>
              )}
            </div>

            {/* Right Card: Current Queue Position matching infrastr.jpg */}
            <div className="lg:col-span-4 bg-[#F3ECE2] rounded-3xl p-5 border border-[#DFD2C2] shadow-xs flex flex-col justify-center items-center text-center">
              <span className="text-xs font-semibold text-[#5E6D67]">
                Текущая позиция в очереди
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#204E3C] my-1 tracking-tight">
                № 14
              </span>
              <span className="text-xs text-[#5E6D67] font-medium">
                из 113 в возрастной категории
              </span>
              <span className="text-[11px] text-[#7E8D87] mt-1 font-medium">
                Дата подачи заявки: 2024 г.
              </span>
            </div>
          </div>

          {/* 4. Main 2-Column Content: Left Real Map (65%) | Right Cards (35%) matching infrastr.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Real Interactive Map */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-3 border border-[#EDE2D5] shadow-xs">
              <div className="h-[520px] lg:h-[620px] w-full">
                <LeafletMap
                  institutions={filteredInstitutions}
                  selectedInstitution={selectedInst}
                  onSelectInstitution={(inst) => setSelectedInst(inst)}
                />
              </div>

              {/* Bottom map status & propose object link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 px-2 text-xs text-[#556862]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>Показано учреждений на карте: <b>{filteredInstitutions.length}</b></span>
                </div>

                <button
                  onClick={() => setShowProposalModal(true)}
                  className="font-bold text-[#208253] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Предложить новый детский сад или клинику</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Selected Card + Recommended Institutions List matching infrastr.jpg */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* TOP RIGHT: Selected Institution Card matching infrastr.jpg */}
              {selectedInst && (
                <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE2D5] shadow-xs space-y-3">
                  
                  {/* Photo at Top (.avif format) */}
                  <div className="relative h-48 w-full bg-[#EDE2D5] overflow-hidden">
                    <img
                      src={selectedInst.image_url}
                      alt={selectedInst.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="eager"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={() => {
                        toggleFavorite(selectedInst.id);
                        showToast(favorites.includes(selectedInst.id) ? 'Удалено из избранного' : 'Добавлено в избранное');
                      }}
                      className={`absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs transition-colors shadow-xs ${
                        favorites.includes(selectedInst.id)
                          ? 'text-[#D96B5D]'
                          : 'text-[#8C9C96] hover:text-[#1E3029]'
                      }`}
                      title="Добавить в избранное"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(selectedInst.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Free spots pill */}
                    {selectedInst.free_spots !== undefined && selectedInst.free_spots > 0 && (
                      <div className="absolute bottom-3 left-3 bg-[#208253] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                        Свободных мест: {selectedInst.free_spots}
                      </div>
                    )}
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 pt-1 space-y-3">
                    
                    {/* Badge and Rating */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#556862] bg-[#F5EEE6] px-3 py-1 rounded-full">
                        {selectedInst.type === 'kindergarten' && 'Детский ясли-сад'}
                        {selectedInst.type === 'polyclinic' && 'Медицинское учреждение'}
                        {selectedInst.type === 'development_center' && 'Развивающий центр'}
                        {selectedInst.type === 'hobby_club' && 'Кружки и секции'}
                        {selectedInst.type === 'one_window' && 'Служба «Одно окно»'}
                        {selectedInst.type === 'maternity_store' && 'Магазин для мам и малышей'}
                        {selectedInst.type === 'leisure_food' && 'Досуг и питание'}
                        {selectedInst.type === 'family_center' && 'Семейный центр'}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{selectedInst.rating}</span>
                        <span className="text-[#8C9C96] font-normal text-[11px]">({selectedInst.reviews_count})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-extrabold text-lg text-[#1E3029] leading-tight">
                      {selectedInst.name}
                    </h2>

                    {/* Description */}
                    <p className="text-xs text-[#556862] leading-relaxed">
                      {selectedInst.description}
                    </p>

                    {/* Badges from infrastr.jpg: "Группы и бассейн", "Услуги и питание" */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {(selectedInst.specialties || ['Группы и бассейн', 'Услуги и питание']).map((badge, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            idx === 0 
                              ? 'bg-[#EBF5EE] text-[#208253]' 
                              : 'bg-[#F7EFE6] text-[#7A5B3E]'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Specs / Contact list with icons */}
                    <div className="space-y-2 pt-2 text-xs text-[#556862] border-t border-[#F0E4D7]">
                      {/* Groups and Capacity */}
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#34785D] shrink-0" />
                        <span className="font-medium text-[#1E3029]">
                          {selectedInst.groups_info || '14 групп, 16 в группе'}
                        </span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#34785D] shrink-0" />
                        <a 
                          href={`tel:${selectedInst.phone}`} 
                          className="font-bold text-[#1E3029] hover:underline"
                        >
                          {selectedInst.phone}
                        </a>
                      </div>

                      {/* Work Hours */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#34785D] shrink-0" />
                        <span>{selectedInst.work_hours}</span>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2 pt-0.5 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-[#34785D] shrink-0 mt-0.5" />
                        <span>{selectedInst.address}, {selectedInst.city}</span>
                      </div>
                    </div>

                    {/* Online Administrator Status Block (Проверка наличия администратора учреждения на портале) */}
                    {selectedInst.has_online_admin ? (
                      <div className="p-3.5 rounded-2xl bg-[#EAF4ED] border border-[#BDE0C8] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E5D42]">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Администратор онлайн на сайте</span>
                          </span>
                          <span className="text-[10px] font-semibold text-[#34785D] bg-white px-2 py-0.5 rounded-full border border-[#BDE0C8]">
                            {selectedInst.admin_role === 'kindergarten_admin' 
                              ? '🏛️ Заведующая детсадом' 
                              : selectedInst.admin_role === 'hobby_admin'
                              ? '🎨 Руководитель секции'
                              : selectedInst.admin_role === 'doctor'
                              ? '👨‍⚕️ Врач учреждения'
                              : 'Администратор'}
                          </span>
                        </div>

                        <div className="text-xs text-[#283D38]">
                          <span className="font-bold block text-[#1E3029]">{selectedInst.admin_name}</span>
                          <span className="text-[11px] text-[#556862] leading-tight block pt-0.5">
                            {selectedInst.type === 'kindergarten'
                              ? 'Принимает электронные очереди, заверяет документы и отвечает родителям в чате.'
                              : selectedInst.type === 'hobby_club'
                              ? 'Записывает детей в кружки, формирует группы и ведёт онлайн-консультации.'
                              : 'Отвечает на вопросы и консультирует родителей онлайн.'}
                          </span>
                        </div>

                        <Link
                          href={`/chats?institutionId=${selectedInst.id}&adminName=${encodeURIComponent(selectedInst.admin_name || 'Администратор')}&org=${encodeURIComponent(selectedInst.name)}&adminRole=${encodeURIComponent(selectedInst.admin_role || '')}`}
                          className="w-full py-2.5 rounded-xl bg-[#208253] hover:bg-[#186842] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Написать администратору ({selectedInst.type === 'kindergarten' ? 'Детсад' : selectedInst.type === 'hobby_club' ? 'Кружок' : 'Организация'})</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="p-3 rounded-2xl bg-[#F8F3EC] border border-[#E9DACB] space-y-1.5 text-xs text-[#6B7C77]">
                        <div className="flex items-center gap-1.5 text-[#7A5B3E] font-bold text-[11px]">
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          <span>Администратор не подключен к порталу</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          По данному учреждению запись ведётся по официальному городскому телефону <a href={`tel:${selectedInst.phone}`} className="font-bold text-[#1E3029] underline">{selectedInst.phone}</a> или через службу «Одно окно».
                        </p>
                      </div>
                    )}

                    {/* Action Buttons: Green Primary Button + Calendar Icon button matching infrastr.jpg */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="flex-1 py-3 rounded-2xl bg-[#208253] hover:bg-[#186842] active:scale-[0.99] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Подать заявку</span>
                      </button>

                      <button
                        onClick={() => {
                          showToast(`Напоминание о «${selectedInst.name}» добавлено в ваш семейный календарь.`);
                        }}
                        className="p-3 rounded-2xl bg-[#F5EEE6] hover:bg-[#EAE0D5] text-[#1E3029] transition-colors cursor-pointer"
                        title="Добавить в календарь семьи"
                      >
                        <Calendar className="w-4 h-4 text-[#556862]" />
                      </button>

                      {selectedInst.website_url && (
                        <a
                          href={selectedInst.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-[#F5EEE6] hover:bg-[#EAE0D5] text-[#1E3029] transition-colors cursor-pointer"
                          title="Официальный сайт учреждения"
                        >
                          <ExternalLink className="w-4 h-4 text-[#556862]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* BOTTOM RIGHT: Recommended Institutions matching infrastr.jpg */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-[#6B7C77] uppercase tracking-wider">
                  РЕКОМЕНДОВАННЫЕ УЧРЕЖДЕНИЯ:
                </h3>

                <div className="space-y-2">
                  {recommendedInstitutions.map((item) => {
                    const isSelected = selectedInst?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedInst(item)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF4ED] border-[#34785D] shadow-xs'
                            : 'bg-[#F8F3EC] hover:bg-[#EFE8DD] border-[#EFE5DB]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-0.5 min-w-0">
                            <span className="font-bold text-xs text-[#1E3029] block truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-[#6B7C77] block truncate">
                              {item.address}
                            </span>
                          </div>

                          {item.free_spots !== undefined && item.free_spots > 0 && (
                            <span className="text-[10px] bg-[#208253] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                              {item.free_spots} мест
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 5. Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3029] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#438C5B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal 1: Подать заявку в учреждение */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-4xl max-w-md w-full p-6 sm:p-8 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div>
                <h3 className="font-bold text-base text-[#1E3029]">
                  Подача заявки в «{selectedInst.name}»
                </h3>
                <p className="text-[11px] text-[#6B7C77]">
                  Служба «Одно окно» • {selectedInst.district || 'г. Минск'}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#1E3029] flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {applySubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#208253] mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-[#1E3029]">Заявление успешно зарегистрировано!</h4>
                <p className="text-xs text-[#6B7C77] max-w-sm mx-auto">
                  Номер входящего обращения: <b>BY-2026-162-OKNO</b>. Статус отслеживается в вашем личном кабинете.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Ребёнок для зачисления:</label>
                  <select
                    value={applyChildName}
                    onChange={(e) => setApplyChildName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  >
                    {childrenList.length > 0 ? (
                      childrenList.map((ch) => (
                        <option key={ch.id} value={ch.name}>
                          {ch.name} ({ch.birth_date})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Иванова Анна Дмитриевна">Иванова Анна Дмитриевна (2023 г.р.)</option>
                        <option value="Иванов Максим Дмитриевич">Иванов Максим Дмитриевич (2025 г.р.)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Контактный телефон родителя:</label>
                  <input
                    type="text"
                    required
                    value={applyPhone}
                    onChange={(e) => setApplyPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Комментарий или льгота (многодетная семья / РНПЦ):</label>
                  <textarea
                    rows={3}
                    value={applyNotes}
                    onChange={(e) => setApplyNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#208253] hover:bg-[#186842] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Отправить электронное заявление
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Предложить объект в экосистему */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-4xl max-w-lg w-full p-6 sm:p-8 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div>
                <h3 className="font-bold text-base text-[#1E3029]">Предложить учреждение или объект</h3>
                <p className="text-[11px] text-[#6B7C77]">
                  Добавьте детский сад, клинику или развивающий центр в реестр Республики Беларусь
                </p>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#1E3029] flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {proposalSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#208253] mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-[#1E3029]">Спасибо за вашу инициативу!</h4>
                <p className="text-xs text-[#6B7C77] max-w-sm mx-auto">
                  Объект направлен на модерацию. После подтверждения он появится на карте экосистемы «Родные люди».
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Название объекта:</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Детский сад № 200 или Центр «Лесенка»"
                    value={proposalForm.facility_name}
                    onChange={(e) => setProposalForm({ ...proposalForm, facility_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#1E3029]">Город / Населённый пункт:</label>
                    <input
                      type="text"
                      required
                      value={proposalForm.city}
                      onChange={(e) => setProposalForm({ ...proposalForm, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#1E3029]">Категория:</label>
                    <select
                      value={proposalForm.category}
                      onChange={(e) => setProposalForm({ ...proposalForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                    >
                      <option value="kindergarten">Детский сад / ясли</option>
                      <option value="polyclinic">Поликлиника / клиника</option>
                      <option value="development_center">Развивающий центр</option>
                      <option value="hobby_club">Кружки и секции</option>
                      <option value="maternity_store">Магазин для мам и малышей</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Точный адрес:</label>
                  <input
                    type="text"
                    required
                    placeholder="Улица, номер дома, корпус"
                    value={proposalForm.address}
                    onChange={(e) => setProposalForm({ ...proposalForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1E3029]">Описание удобств и секций:</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Наличие бассейна, пандуса, развивающих занятий, логопеда..."
                    value={proposalForm.description}
                    onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#1E3029]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#208253] hover:bg-[#186842] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Отправить объект на модерацию
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

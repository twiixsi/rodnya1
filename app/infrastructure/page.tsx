'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  Heart, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Baby, 
  Accessibility, 
  Building,
  Star,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Institution } from '@/types';

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/maps/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-3xl bg-[#F0E4D7] flex items-center justify-center text-[#6B7C77] text-sm font-semibold">
      Загрузка интерактивной карты Беларуси...
    </div>
  ),
});

export default function InfrastructurePage() {
  const { isMobileLayout, institutions, favorites, toggleFavorite, addInstitutionProposal } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyAccessible, setOnlyAccessible] = useState<boolean>(false);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(institutions[0] || null);

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

  // Filter institutions
  const filteredInstitutions = institutions.filter((inst) => {
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    const matchesSearch = 
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAccess = !onlyAccessible || (inst.has_ramp || inst.has_mother_child_room);

    return matchesType && matchesSearch && matchesAccess;
  });

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInstitutionProposal(proposalForm);
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalSubmitted(false);
      setShowProposalModal(false);
      setProposalForm({
        facility_name: '',
        category: 'kindergarten',
        address: '',
        city: 'г. Минск',
        feature_type: 'mother_child_room',
        description: ''
      });
    }, 2500);
  };

  return (
    <div className="space-y-6 pt-4 pb-12">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2EFF9] text-[#7A5BA3] text-xs font-bold mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Социальный гид • Инфраструктура для семей</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
              Интерактивная карта учреждений и доступной среды
            </h1>
            <p className="text-sm text-[#556862] mt-1 max-w-2xl leading-relaxed">
              Поиск детских садов со свободными местами, детских поликлиник, кризисных центров и мест с доступной средой для колясок в Минске и регионах Беларуси.
            </p>
          </div>

          <button
            onClick={() => setShowProposalModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Предложить объект доступности</span>
          </button>
        </div>

        {/* Filter Controls (Matches Reference Image 2 - Screen 4) */}
        <div className="mt-6 pt-6 border-t border-[#F0E4D7] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по адресу, названию сада, району..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs text-[#283D38] placeholder-[#8C9C96] outline-hidden focus:border-[#34785D]"
              />
            </div>

            {/* Filter Pills */}
            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
              {[
                { id: 'all', label: 'Все объекты' },
                { id: 'kindergarten', label: 'Детские сады' },
                { id: 'polyclinic', label: 'Поликлиники' },
                { id: 'crisis_center', label: 'Кризисные службы' },
                { id: 'family_center', label: 'Семейные центры' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedType(pill.id)}
                  className={`px-3 py-2 rounded-xl shrink-0 transition-all ${
                    selectedType === pill.id
                      ? 'bg-[#34785D] text-white shadow-xs'
                      : 'bg-[#F8F1E8] text-[#6B7C77] hover:bg-[#F0E4D7]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick toggle: Accessible for strollers */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#283D38]">
              <input
                type="checkbox"
                checked={onlyAccessible}
                onChange={(e) => setOnlyAccessible(e.target.checked)}
                className="w-4 h-4 rounded-md text-[#34785D] accent-[#34785D]"
              />
              <Accessibility className="w-3.5 h-3.5 text-[#34785D]" />
              <span>Только с пандусами и комнатами матери и ребёнка</span>
            </label>
            <span className="text-[#8C9C96]">Найдено объектов: {filteredInstitutions.length}</span>
          </div>
        </div>
      </div>

      {/* Map + Selected Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Leaflet Map (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-[#FFFDF9] rounded-3xl p-3 border border-[#F0E4D7] shadow-soft">
          <div className="h-[460px] lg:h-[580px] w-full">
            <LeafletMap
              institutions={filteredInstitutions}
              selectedInstitution={selectedInst}
              onSelectInstitution={(inst) => setSelectedInst(inst)}
            />
          </div>
        </div>

        {/* Right: Selected Institution Card / Detail View (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedInst ? (
            <div className="bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#F0E4D7] shadow-soft space-y-4">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={selectedInst.image_url}
                  alt={selectedInst.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(selectedInst.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                    favorites.includes(selectedInst.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-[#283D38] hover:bg-white'
                  }`}
                  title="Добавить в избранное"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(selectedInst.id) ? 'fill-current' : ''}`} />
                </button>

                {selectedInst.free_spots !== undefined && selectedInst.free_spots > 0 && (
                  <div className="absolute bottom-3 left-3 bg-[#34785D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                    Свободные места: {selectedInst.free_spots} (Есть места)
                  </div>
                )}
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#7A5BA3] uppercase tracking-wider bg-[#F2EFF9] px-2 py-0.5 rounded-md">
                    {selectedInst.type === 'kindergarten' ? 'Детский сад' : selectedInst.type === 'polyclinic' ? 'Детская поликлиника' : 'Социальный центр'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedInst.rating}</span>
                    <span className="text-[#8C9C96] font-normal text-[11px]">({selectedInst.reviews_count})</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-[#283D38] leading-tight">
                  {selectedInst.name}
                </h3>

                <p className="text-xs text-[#556862] leading-relaxed">
                  {selectedInst.description}
                </p>

                {/* Badges for Accessibility */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  {selectedInst.has_ramp && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#E5EFE3] text-[#34785D] font-semibold flex items-center gap-1">
                      <Accessibility className="w-3 h-3" />
                      <span>Пандус</span>
                    </span>
                  )}
                  {selectedInst.has_mother_child_room && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#FDF0EC] text-[#E58A7D] font-semibold flex items-center gap-1">
                      <Baby className="w-3 h-3" />
                      <span>Комната матери</span>
                    </span>
                  )}
                  {selectedInst.has_elevator && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#EBF3FB] text-[#2F6D9E] font-semibold">
                      Лифт
                    </span>
                  )}
                </div>

                {/* Contact & Hours */}
                <div className="p-3.5 rounded-2xl bg-[#F8F1E8] space-y-2 text-xs text-[#556862]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#34785D] shrink-0 mt-0.5" />
                    <span>{selectedInst.address}, {selectedInst.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#34785D] shrink-0" />
                    <a href={`tel:${selectedInst.phone}`} className="font-semibold text-[#283D38] hover:underline">
                      {selectedInst.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#34785D] shrink-0" />
                    <span>{selectedInst.work_hours}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`tel:${selectedInst.phone}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Позвонить</span>
                  </a>

                  {selectedInst.website_url && (
                    <a
                      href={selectedInst.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 rounded-xl bg-[#F0E4D7] hover:bg-[#E5D7C7] text-[#283D38] text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#FFFDF9] rounded-3xl border border-[#F0E4D7] text-[#6B7C77] text-xs">
              Выберите учреждение на карте, чтобы увидеть подробную информацию.
            </div>
          )}

          {/* Quick List of Nearby Kindergartens (Matching Reference Screen 4) */}
          <div className="bg-[#FFFDF9] rounded-3xl p-5 border border-[#F0E4D7] shadow-soft space-y-3">
            <h4 className="text-xs font-bold text-[#283D38] uppercase tracking-wider">
              Ближайшие учреждения
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {filteredInstitutions.slice(0, 4).map((inst) => (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInst(inst)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    selectedInst?.id === inst.id
                      ? 'bg-[#E5EFE3] border-[#34785D]'
                      : 'bg-[#F8F1E8] hover:bg-[#F0E4D7] border-transparent'
                  }`}
                >
                  <div>
                    <span className="font-bold text-[#283D38] block">{inst.name}</span>
                    <span className="text-[11px] text-[#6B7C77]">{inst.address}</span>
                  </div>
                  {inst.free_spots !== undefined && inst.free_spots > 0 && (
                    <span className="text-[10px] bg-[#34785D] text-white px-2 py-0.5 rounded-full font-bold">
                      {inst.free_spots} мест
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Proposal Modal for Accessible Environment */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 lg:p-8 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D7]">
              <div>
                <h3 className="font-bold text-base text-[#283D38]">Предложить объект доступной среды</h3>
                <p className="text-[11px] text-[#6B7C77]">Помогите другим родителям: расскажите о пандусах и комнатах матери и ребёнка</p>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {proposalSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#34785D] mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-[#283D38]">Спасибо за вашу инициативу!</h4>
                <p className="text-xs text-[#6B7C77] max-w-sm mx-auto">
                  Объект направлен на модерацию. После подтверждения он появится на карте экосистемы «Родныя».
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Название заведения / парка / центра:</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: ТРЦ «Дана Молл» или Детский парк"
                    value={proposalForm.facility_name}
                    onChange={(e) => setProposalForm({ ...proposalForm, facility_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#283D38]">Город:</label>
                    <input
                      type="text"
                      required
                      value={proposalForm.city}
                      onChange={(e) => setProposalForm({ ...proposalForm, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#283D38]">Тип объекта:</label>
                    <select
                      value={proposalForm.feature_type}
                      onChange={(e) => setProposalForm({ ...proposalForm, feature_type: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                    >
                      <option value="mother_child_room">Комната матери и ребёнка</option>
                      <option value="ramp">Удобный пандус для колясок</option>
                      <option value="elevator">Лифт / подъёмник</option>
                      <option value="safe_playground">Безопасная детская площадка</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Точный адрес:</label>
                  <input
                    type="text"
                    required
                    placeholder="Улица, номер дома, ориентир"
                    value={proposalForm.address}
                    onChange={(e) => setProposalForm({ ...proposalForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#283D38]">Описание удобств:</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Наличие пеленального столика, горячей воды, просторный вход..."
                    value={proposalForm.description}
                    onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
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

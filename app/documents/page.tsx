'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search,
  Filter,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { UserDocument } from '@/types';

export default function DocumentsPage() {
  const { isMobileLayout, documents, addDocument, removeDocument } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'in_process' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload form state
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<UserDocument['category']>('birth_certificate');
  const [fileName, setFileName] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesFilter = activeFilter === 'all' || doc.status === activeFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({
      title: docTitle,
      category: docCategory,
      file_name: fileName || `${docTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      file_size_formatted: '1.4 МБ',
      file_url: '#',
      status: 'in_process'
    });
    setShowUploadModal(false);
    setDocTitle('');
    setFileName('');
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header Banner (Matches Reference Image 2 - Screen 5) */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 lg:p-8 border border-[#F0E4D7] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFF8] text-[#2F6D9E] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Защищённое хранилище • Цифровая папка семьи</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#283D38]">
              Мои документы
            </h1>
            <p className="text-sm text-[#556862] mt-1 max-w-2xl leading-relaxed">
              Электронный сейф для свидетельств о рождении, справок о составе семьи, заявлений на государственные пособия и семейный капитал.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Загрузить документ</span>
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="mt-6 pt-6 border-t border-[#F0E4D7] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8C9C96] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по названию документа..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F1E8] border border-[#E9DACB] text-xs text-[#283D38] placeholder-[#8C9C96] outline-hidden focus:border-[#34785D]"
            />
          </div>

          {/* Filter Tabs (Matches reference [Все] [В обработке] [Полученные]) */}
          <div className="md:col-span-6 flex items-center gap-2 bg-[#F8F1E8] p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeFilter === 'all' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Все ({documents.length})
            </button>
            <button
              onClick={() => setActiveFilter('in_process')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeFilter === 'in_process' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              В обработке
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeFilter === 'active' ? 'bg-[#34785D] text-white shadow-xs' : 'text-[#6B7C77]'
              }`}
            >
              Полученные
            </button>
          </div>
        </div>
      </div>

      {/* Document Cards List */}
      {filteredDocs.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-4xl p-10 text-center border border-dashed border-[#DFD1C2] space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#F8F1E8] text-[#34785D] flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#283D38]">Документы ещё не добавлены</h3>
          <p className="text-xs text-[#6B7C77] max-w-sm mx-auto">
            Загрузите свидетельство о рождении, удостоверение многодетной семьи или справки для безопасного хранения в цифровой папке.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            + Загрузить первый документ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#FFFDF9] rounded-3xl p-5 border border-[#F0E4D7] shadow-soft space-y-4 flex flex-col justify-between group hover:border-[#34785D] transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#F8F1E8] text-[#34785D] flex items-center justify-center shrink-0 border border-[#E9DACB]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#283D38] leading-tight">
                      {doc.title}
                    </h3>
                    <span className="text-[11px] text-[#6B7C77] block mt-0.5">
                      {doc.file_name} • {doc.file_size_formatted}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                    doc.status === 'active'
                      ? 'bg-[#E5EFE3] text-[#34785D]'
                      : 'bg-[#FDF0EC] text-[#D96B5D]'
                  }`}
                >
                  {doc.status === 'active' ? 'Проверено' : 'В обработке'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0E4D7] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#8C9C96]">
                Загружено: {new Date(doc.uploaded_at).toLocaleDateString('ru-RU')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Просмотр документа «${doc.title}» в защищённом режиме.`)}
                  className="px-3 py-1.5 rounded-xl bg-[#F8F1E8] hover:bg-[#F0E4D7] text-[#283D38] font-semibold transition-colors flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Открыть</span>
                </button>

                <button
                  onClick={() => removeDocument(doc.id)}
                  className="p-1.5 rounded-xl hover:bg-red-50 text-[#8C9C96] hover:text-red-500 transition-colors"
                  title="Удалить документ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 border border-[#F0E4D7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D7]">
              <h3 className="font-bold text-base text-[#283D38]">Загрузить документ в папку семьи</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-7 h-7 rounded-full bg-[#F0E4D7] text-[#283D38] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Название документа:</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Свидетельство о рождении Максима"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Категория:</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#F8F1E8] border border-[#E9DACB] text-[#283D38]"
                >
                  <option value="birth_certificate">Свидетельство о рождении</option>
                  <option value="passport">Паспорт</option>
                  <option value="family_certificate">Справка о составе семьи</option>
                  <option value="benefit_application">Заявление на пособие</option>
                  <option value="maternity_capital">Семейный капитал</option>
                  <option value="medical">Медицинская выписка / карта</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283D38]">Выберите файл (PDF, JPG, PNG):</label>
                <div className="border-2 border-dashed border-[#C5B5A3] rounded-2xl p-6 text-center bg-[#F8F1E8] hover:bg-[#F0E4D7] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[#34785D] mx-auto mb-2" />
                  <span className="text-xs font-semibold text-[#283D38] block">Нажмите для выбора файла</span>
                  <span className="text-[10px] text-[#8C9C96]">Максимальный размер: 15 МБ</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#34785D] hover:bg-[#245B49] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Сохранить в хранилище
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

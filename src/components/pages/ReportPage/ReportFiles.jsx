import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import {
  Printer,
  FolderClosed,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  FileText,
  CalendarCheck,
  SearchX,
  Share2
} from 'lucide-react';

export default function ReportFiles({ records = [], selectedRecord, onSelect, onOpen, onPrint }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isOpenFiles = searchParams.get('filesOpen') === 'true';
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const toggleOpenFiles = () => {
    setSearchParams(prev => {
      prev.set('filesOpen', String(!isOpenFiles));
      return prev;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    if (!/\d/.test(dateStr)) return 0;

    const cleaned = String(dateStr).trim();

    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(cleaned)) {
      return new Date(cleaned).getTime();
    }

    const parts = cleaned.split(/[\/\-]/);
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const d = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    }

    return 0;
  };

  const sortedRecords = useMemo(() => {
    if (!sortConfig.key) return records;

    const sorted = [...records].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        const aTime = parseDate(aVal);
        const bTime = parseDate(bVal);
        return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
      }

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [records, sortConfig]);

  const columns = [
    { key: 'child', label: 'اسم الطفل' },
    { key: 'father', label: 'اسم الأب' },
    { key: 'service', label: 'الخدمة' },
    { key: 'date', label: 'التاريخ' },
  ];

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <span className="flex flex-col items-center ml-1 text-white/30 ">
          <ArrowUp size={8} className="-mb-1" />
          <ArrowDown size={8} />
        </span>
      );
    }
    return (
      <span className="flex flex-col items-center ml-1">
        <ArrowUp
          size={8}
          className={`-mb-1 transition-colors ${sortConfig.direction === 'asc' ? 'text-(--main-color)' : 'text-white/30'}`}
        />
        <ArrowDown
          size={8}
          className={`transition-colors ${sortConfig.direction === 'desc' ? 'text-(--main-color)' : 'text-white/30'}`}
        />
      </span>
    );
  };

  return (
    <div className="mt-6 animate-in fade-in duration-300">
      {/* Files Section Header */}
      <div
        onClick={toggleOpenFiles}
        className="flex items-center justify-between h-[38.4px] bg-[#171717] border-2 border-(--main-color) rounded-[4px] cursor-pointer transition-all"
      >
        <div className="flex-1 px-3 text-center truncate flex items-center justify-center gap-2">
          <span className="text-sm text-center text-white font-bold">
            الملفات
          </span>
        </div>
        <div className="h-full aspect-square flex items-center justify-center">
          <ChevronDown
            className={`w-4 h-4 text-(--main-color) transition-transform ${isOpenFiles ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpenFiles && (
        <div className="mt-4 max-h-[420px] overflow-y-auto flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300 px-1">

          {/* Table */}
          <div className="w-full border border-(--main-color)/30 rounded-md overflow-hidden bg-[#171717]">

            {/* Header Row */}
            <div className="grid grid-cols-4 bg-(--main-color)/10 border-b border-(--main-color)/30">
              {columns.map((col, idx) => (
                <button
                  key={col.key}
                  type="button"
                  onClick={() => handleSort(col.key)}
                  className={`flex items-center justify-center gap-1 p-2 text-center cursor-pointer hover:bg-(--main-color)/20 transition-colors ${idx !== columns.length - 1 ? 'border-l border-(--main-color)/20' : ''
                    }`}
                >
                  <span className="text-[9px] font-bold text-(--main-color) truncate">
                    {col.label}
                  </span>
                  <SortIcon columnKey={col.key} />
                </button>
              ))}
            </div>

            {/* Data Rows */}
            {sortedRecords.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2 px-3">
                <SearchX size={28} className="text-white/20" />
                <p className="text-white/40 text-[11px] text-center">لا توجد نتائج مطابقة للبحث</p>
                <p className="text-white/30 text-[10px] text-center">جرب تغيير معايير البحث</p>
              </div>
            ) : (
              sortedRecords.map((record) => {
                const isSelected = selectedRecord?.id === record.id;
                return (
                  <div
                    key={record.id}
                    onClick={() => onSelect(record)}
                    className={`grid grid-cols-4 cursor-pointer transition-all ${isSelected
                      ? 'bg-(--main-color)/15 border-b border-(--main-color)/40'
                      : 'hover:bg-white/5 border-b border-[#292929] last:border-b-0'
                      }`}
                  >
                    <div className={`p-2 flex items-center justify-center border-l border-[#292929]/60 ${isSelected ? 'border-l-(--main-color)/30' : ''
                      }`}>
                      <p className={`text-[9px] font-bold text-center truncate ${isSelected ? 'text-(--main-color)' : 'text-[#eee]'
                        }`}>
                        {record.child}
                      </p>
                    </div>

                    <div className={`p-2 flex items-center justify-center border-l border-[#292929]/60 ${isSelected ? 'border-l-(--main-color)/30' : ''
                      }`}>
                      <p className={`text-[9px] font-bold text-center truncate ${isSelected ? 'text-(--main-color)' : 'text-[#eee]'
                        }`}>
                        {record.father}
                      </p>
                    </div>

                    <div className={`p-2 flex items-center justify-center border-l border-[#292929]/60 ${isSelected ? 'border-l-(--main-color)/30' : ''
                      }`}>
                      <p className={`text-[9px] font-bold text-center truncate ${isSelected ? 'text-(--main-color)' : 'text-[#eee]'
                        }`}>
                        {record.service}
                      </p>
                    </div>

                    <div className="p-2 flex items-center justify-center">
                      <p className={`text-[9px] font-bold text-center truncate ${isSelected ? 'text-(--main-color)' : 'text-[#eee]'
                        }`}>
                        {record.date}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!selectedRecord && sortedRecords.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 py-2">
              <div className="w-1 h-1 rounded-full bg-(--main-color)/60"></div>
              <p className="text-white/40 text-[10px]">اختر سجلًا من الجدول</p>
              <div className="w-1 h-1 rounded-full bg-(--main-color)/60"></div>
            </div>
          )}

          {selectedRecord && (
            <div className="flex items-center gap-2 bg-(--main-color)/10 border border-(--main-color)/30 rounded-md px-3 py-2 animate-in fade-in duration-200">
              <FileText size={14} className="text-(--main-color) flex-shrink-0" />
              <p className="text-white text-[11px] font-bold truncate flex-1">
                {selectedRecord.child} - {selectedRecord.father}
              </p>
              <span className="text-[9px] text-(--main-color) bg-(--main-color)/15 px-1.5 py-0.5 rounded-full flex-shrink-0">
                مختار
              </span>
            </div>
          )}

          {selectedRecord && (
            <div className="grid grid-cols-5 w-full gap-1.5 mt-2 animate-in fade-in duration-200">

              {/* 1️⃣ افتح */}
              <button
                onClick={onOpen}
                className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[6px] items-center justify-center transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-(--main-color)/40"
              >
                <FileText size={24} className="text-(--main-color)" />
                <span className="text-white text-[10px] font-bold">افتح</span>
              </button>

              {/* 2️⃣ طباعة */}
              <button
                onClick={onPrint}
                className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[6px] items-center justify-center transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-(--main-color)/40"
              >
                <Printer size={24} className="text-(--main-color)" />
                <span className="text-white text-[10px] font-bold">اطبع</span>
              </button>

              {/* 3️⃣ اشحن */}
              <button
                onClick={() => navigate(`/report-shipping/${selectedRecord.id}`)}
                className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[6px] items-center justify-center transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-(--main-color)/40"
              >
                <FolderClosed size={24} className="text-(--main-color)" />
                <span className="text-white text-[10px] font-bold">اشحن</span>
              </button>

              {/* 4️⃣ ارسل */}
              <button
                onClick={() => navigate(`/report-sending/${selectedRecord.id}`)}
                className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[6px] items-center justify-center transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-(--main-color)/40"
              >
                <Share2 size={24} className="text-(--main-color)" />
                <span className="text-white text-[10px] font-bold">ارسل</span>
              </button>

              {/* 5️⃣ احجز - ✨ اتعدل من ?step=3 لـ ?s=payment&svc=1 */}
              <button
                onClick={() => navigate('/reservations?s=payment&svc=1')}
                className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[6px] items-center justify-center transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-(--main-color)/40"
              >
                <CalendarCheck size={24} className="text-(--main-color)" />
                <span className="text-white text-[10px] font-bold">احجز</span>
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import CustomSelect from '../../Common/CustomSelect';
import CustomDate from '../../Common/CustomDate';
import { Search, RotateCcw } from 'lucide-react';

// ✨ Component موحّد للـ Text Input بنفس شكل الـ Select
const SearchTextInput = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center h-[38.4px] bg-[#171717] border border-(--main-color)/30 focus-within:border-(--main-color) rounded-[4px] transition-all">
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none border-none px-3 text-sm text-white placeholder:text-(--main-color) text-right w-full"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default function ReportSearch({ filters, setFilters, onReset, totalResults, totalRecords }) {
  const [isOpen, setIsOpen] = useState(false);
  // ✨ Local filters للحفاظ على الأداء (مش يفلتر مع كل حرف)
  const [localFilters, setLocalFilters] = useState(filters);

  // ✨ Options
  const serviceOptions = [
    { id: 1, label: "إيكو", value: "إيكو" },
    { id: 2, label: "كشف", value: "كشف" },
    { id: 3, label: "متابعة", value: "متابعة" },
  ];

  const branchOptions = [
    { id: 1, label: "طنطا", value: "طنطا" },
    { id: 2, label: "المنصورة", value: "المنصورة" },
    { id: 3, label: "القاهرة", value: "القاهرة" },
  ];

  const governateOptions = [
    { id: 1, label: "الغربية", value: "الغربية" },
    { id: 2, label: "الدقهلية", value: "الدقهلية" },
    { id: 3, label: "القاهرة", value: "القاهرة" },
  ];

  // ✨ تحديث local filter
  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  // ✨ تطبيق الفلتر
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(localFilters);
    console.log("Searching with filters:", localFilters);
  };

  // ✨ إعادة تعيين
  const handleReset = () => {
    const empty = {
      child_name: "",
      father_name: "",
      service: "",
      service_date: "",
      branch: "",
      hospital_nurserry: "",
      phone: "",
      governate: "",
    };
    setLocalFilters(empty);
    onReset();
  };

  // ✨ هل فيه فلاتر مطبقة؟
  const hasActiveFilters = Object.values(filters).some(v => v !== "");

  return (
    <form onSubmit={handleSearch}>
      {/* Search Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between h-[38.4px] mt-6 bg-[#171717] border-2 border-(--main-color) rounded-[4px] cursor-pointer group focus-within:border-(--main-color) transition-all"
      >
        <div className="flex-1 px-3 text-center truncate flex items-center justify-center gap-2">
          <span className="text-sm text-center text-white font-bold">
            البحث
          </span>
          {hasActiveFilters && (
            <span className="text-[10px] bg-(--main-color) text-black font-bold px-1.5 py-0.5 rounded-full">
              {totalResults}/{totalRecords}
            </span>
          )}
        </div>

        <div className="h-full aspect-square flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1742382414/icons_fouady_6_kyj440.png"
            alt="chevron down"
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Filter Grid */}
      {isOpen && (
        <div className="grid max-h-[450px] overflow-y-auto grid-cols-2 mt-4 gap-[7px] items-center animate-in fade-in duration-300">

          {/* اسم الطفل */}
          <SearchTextInput
            placeholder="اسم الطفل"
            value={localFilters.child_name}
            onChange={(v) => updateLocalFilter('child_name', v)}
          />

          {/* اسم الأب */}
          <SearchTextInput
            placeholder="اسم الأب"
            value={localFilters.father_name}
            onChange={(v) => updateLocalFilter('father_name', v)}
          />

          {/* الخدمة */}
          <CustomSelect
            placeholder="الخدمة"
            value={localFilters.service}
            onChange={(v) => updateLocalFilter('service', v)}
            options={serviceOptions}
          />

          {/* التاريخ */}
          <CustomDate
            placeholder="تاريخ الخدمة"
            value={localFilters.service_date}
            onChange={(v) => updateLocalFilter('service_date', v)}
          />

          {/* المحافظة */}
          <CustomSelect
            placeholder="المحافظة"
            value={localFilters.governate}
            onChange={(v) => updateLocalFilter('governate', v)}
            options={governateOptions}
          />

          {/* الفرع */}
          <CustomSelect
            placeholder="الفرع"
            value={localFilters.branch}
            onChange={(v) => updateLocalFilter('branch', v)}
            options={branchOptions}
          />

          {/* المستشفى/الحضانة */}
          <SearchTextInput
            placeholder="المستشفي / الحضانة"
            value={localFilters.hospital_nurserry}
            onChange={(v) => updateLocalFilter('hospital_nurserry', v)}
          />

          {/* التليفون */}
          <SearchTextInput
            placeholder="التليفون"
            type="tel"
            value={localFilters.phone}
            onChange={(v) => updateLocalFilter('phone', v)}
          />

          {/* ✨ الأزرار */}
          <div className="col-span-2 grid grid-cols-2 gap-2 mt-2">
            {/* زرار البحث */}
            <button
              type="submit"
              className="h-[38.4px] bg-(--main-color) text-black font-bold text-[13px] rounded-[4px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <Search size={16} />
              بحث
            </button>

            {/* زرار إعادة التعيين */}
            <button
              type="button"
              onClick={handleReset}
              className="h-[38.4px] bg-[#232323] border border-(--main-color)/40 text-white font-bold text-[13px] rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#2e2e2e] active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={16} className="text-(--main-color)" />
              مسح
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
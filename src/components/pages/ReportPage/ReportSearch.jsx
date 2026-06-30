// src/components/pages/ReportPage/ReportSearch.jsx
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDate from "../../Common/CustomDate";
import CustomSelect from "../../Common/CustomSelect";

// ✨ Search Text Input
const SearchTextInput = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center h-[40px] bg-[#171717] border border-(--main-color)/30 focus-within:border-(--main-color) rounded-[6px] transition-all">
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none border-none px-3 text-[13px] text-white placeholder:text-(--main-color)/70 w-full"
        />
      </div>
    </div>
  );
};

export default function ReportSearch({
  filters,
  setFilters,
  onReset,
  totalResults,
  totalRecords,
}) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const serviceOptions = [
    { id: 1, label: isEn ? "Echo" : "إيكو", value: "إيكو" },
    { id: 2, label: isEn ? "Check-up" : "كشف", value: "كشف" },
    { id: 3, label: isEn ? "Follow-up" : "متابعة", value: "متابعة" },
  ];

  const branchOptions = [
    { id: 1, label: isEn ? "Tanta" : "طنطا", value: "طنطا" },
    { id: 2, label: isEn ? "Mansoura" : "المنصورة", value: "المنصورة" },
    { id: 3, label: isEn ? "Cairo" : "القاهرة", value: "القاهرة" },
  ];

  const governateOptions = [
    { id: 1, label: isEn ? "Gharbia" : "الغربية", value: "الغربية" },
    { id: 2, label: isEn ? "Dakahlia" : "الدقهلية", value: "الدقهلية" },
    { id: 3, label: isEn ? "Cairo" : "القاهرة", value: "القاهرة" },
  ];

  const updateLocalFilter = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(localFilters);
  };

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

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <form onSubmit={handleSearch}>
      {/* Search Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between h-[40px] mt-6 bg-[#171717] border-2 border-(--main-color) rounded-[6px] cursor-pointer group focus-within:border-(--main-color) transition-all"
      >
        <div className="flex-1 px-3 text-center truncate flex items-center justify-center gap-2">
          <span className="text-[14px] text-center text-white font-bold">
            {t("reports.searchTitle")}
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
            alt="chevron"
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Filter Grid */}
      {isOpen && (
        <div className="grid max-h-[450px] overflow-y-auto grid-cols-2 mt-4 gap-2 items-center animate-in fade-in duration-300">
          <SearchTextInput
            placeholder={t("reports.filters.childName")}
            value={localFilters.child_name}
            onChange={(v) => updateLocalFilter("child_name", v)}
          />
          <SearchTextInput
            placeholder={t("reports.filters.fatherName")}
            value={localFilters.father_name}
            onChange={(v) => updateLocalFilter("father_name", v)}
          />
          <CustomSelect
            placeholder={t("reports.filters.service")}
            value={localFilters.service}
            onChange={(v) => updateLocalFilter("service", v)}
            options={serviceOptions}
          />
          <CustomDate
            placeholder={t("reports.filters.serviceDate")}
            value={localFilters.service_date}
            onChange={(v) => updateLocalFilter("service_date", v)}
          />
          <CustomSelect
            placeholder={t("reports.filters.governate")}
            value={localFilters.governate}
            onChange={(v) => updateLocalFilter("governate", v)}
            options={governateOptions}
          />
          <CustomSelect
            placeholder={t("reports.filters.branch")}
            value={localFilters.branch}
            onChange={(v) => updateLocalFilter("branch", v)}
            options={branchOptions}
          />
          <SearchTextInput
            placeholder={t("reports.filters.hospitalNursery")}
            value={localFilters.hospital_nurserry}
            onChange={(v) => updateLocalFilter("hospital_nurserry", v)}
          />
          <SearchTextInput
            placeholder={t("reports.filters.phone")}
            type="tel"
            value={localFilters.phone}
            onChange={(v) => updateLocalFilter("phone", v)}
          />

          {/* Actions */}
          <div className="col-span-2 grid grid-cols-2 gap-2 mt-2">
            <button
              type="submit"
              className="h-[40px] bg-(--main-color) text-black font-bold text-[13px] rounded-[6px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <Search size={16} />
              {t("reports.searchBtn")}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="h-[40px] bg-[#232323] border border-(--main-color)/40 text-white font-bold text-[13px] rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#2e2e2e] active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={16} className="text-(--main-color)" />
              {t("reports.resetBtn")}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

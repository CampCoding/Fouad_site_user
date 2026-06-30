// src/pages/ReportPage/ReportPage.jsx
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReportFiles from "../../components/pages/ReportPage/ReportFiles";
import ReportSearch from "../../components/pages/ReportPage/ReportSearch";
import { useReport } from "../../context/ReportContext";

// ✨ Service Map (translatable)
export const SERVICE_MAP = {
  echo: { ar: "إيكو", en: "Echo" },
  checkup: { ar: "كشف", en: "Check-up" },
  followup: { ar: "متابعة", en: "Follow-up" },
};

export default function ReportPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { selectedRecord, setSelectedRecord } = useReport();

  const [filters, setFilters] = useState({
    child_name: "",
    father_name: "",
    service: "",
    service_date: "",
    branch: "",
    hospital_nurserry: "",
    phone: "",
    governate: "",
  });

  // ✨ Records - data زي ما المستخدم دخلها (مفيش en/ar تبادل)
  // الـ service بس بنخزن الـ key، والـ label بيتترجم في الـ UI
  const records = [
    {
      id: 1,
      child: "أحمد علي",
      father: "علي محمد",
      service: "echo",
      date: "12-5-2025",
      phone: "01012345678",
      branch: "طنطا",
      governate: "الغربية",
      hospital_nurserry: "مستشفى طنطا",
    },
    {
      id: 2,
      child: "محمد حسن",
      father: "حسن أحمد",
      service: "checkup",
      date: "15-3-2025",
      phone: "01198765432",
      branch: "المنصورة",
      governate: "الدقهلية",
      hospital_nurserry: "مستشفى المنصورة",
    },
    {
      id: 3,
      child: "علي محمود",
      father: "محمود سعد",
      service: "followup",
      date: "20-4-2025",
      phone: "01234567890",
      branch: "طنطا",
      governate: "الغربية",
      hospital_nurserry: "حضانة الأطفال",
    },
    {
      id: 4,
      child: "يوسف أحمد",
      father: "أحمد يوسف",
      service: "echo",
      date: "5-6-2025",
      phone: "01156789012",
      branch: "القاهرة",
      governate: "القاهرة",
      hospital_nurserry: "مستشفى القاهرة",
    },
    {
      id: 5,
      child: "كريم سامي",
      father: "سامي كريم",
      service: "checkup",
      date: "10-7-2025",
      phone: "01087654321",
      branch: "طنطا",
      governate: "الغربية",
      hospital_nurserry: "مستشفى الجامعة",
    },
    {
      id: 6,
      child: "حمزة محمد",
      father: "محمد حمزة",
      service: "followup",
      date: "25-2-2025",
      phone: "01298765432",
      branch: "المنصورة",
      governate: "الدقهلية",
      hospital_nurserry: "حضانة المنصورة",
    },
    {
      id: 7,
      child: "زياد علي",
      father: "علي زياد",
      service: "echo",
      date: "8-8-2025",
      phone: "01112345678",
      branch: "القاهرة",
      governate: "القاهرة",
      hospital_nurserry: "مستشفى الأطفال",
    },
    {
      id: 8,
      child: "آدم خالد",
      father: "خالد آدم",
      service: "checkup",
      date: "30-1-2025",
      phone: "01023456789",
      branch: "طنطا",
      governate: "الغربية",
      hospital_nurserry: "مستشفى طنطا",
    },
  ];

  // ✨ Helper: get service label by current lang
  const getServiceLabel = (key) => {
    const svc = SERVICE_MAP[key];
    if (!svc) return key;
    return isEn ? svc.en : svc.ar;
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (
        filters.child_name &&
        !record.child
          ?.toLowerCase()
          .includes(filters.child_name.toLowerCase().trim())
      )
        return false;
      if (
        filters.father_name &&
        !record.father
          ?.toLowerCase()
          .includes(filters.father_name.toLowerCase().trim())
      )
        return false;
      if (filters.phone && !record.phone?.includes(filters.phone.trim()))
        return false;
      if (
        filters.hospital_nurserry &&
        !record.hospital_nurserry
          ?.toLowerCase()
          .includes(filters.hospital_nurserry.toLowerCase().trim())
      )
        return false;

      if (filters.service && record.service !== filters.service) return false;
      if (filters.branch && record.branch !== filters.branch) return false;
      if (filters.governate && record.governate !== filters.governate)
        return false;

      if (filters.service_date) {
        const [year, month, day] = filters.service_date.split("-");
        const formattedFilterDate = `${parseInt(day)}-${parseInt(month)}-${year}`;
        if (record.date !== formattedFilterDate) return false;
      }

      return true;
    });
  }, [records, filters]);

  const handleOpen = () => {
    if (!selectedRecord) {
      toast.error(
        isEn ? "Please select a file first" : "يرجى اختيار ملف أولاً",
      );
      return;
    }
    window.open(`https://example.com/report/${selectedRecord.id}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetFilters = () => {
    setFilters({
      child_name: "",
      father_name: "",
      service: "",
      service_date: "",
      branch: "",
      hospital_nurserry: "",
      phone: "",
      governate: "",
    });
    setSelectedRecord(null);
  };

  return (
    <div className="pb-10">
      {/* Page Title Card */}
      <div className="card mt-10">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png"
          className="object-contain"
          width={40}
          height={40}
          alt="report icon"
        />
        <p className="font-bold text-[15px] cursor-pointer text-[#eee]">
          {t("reports.title")}
        </p>
      </div>

      <ReportSearch
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        totalResults={filteredRecords.length}
        totalRecords={records.length}
      />

      <ReportFiles
        records={filteredRecords}
        selectedRecord={selectedRecord}
        onSelect={setSelectedRecord}
        onOpen={handleOpen}
        onPrint={handlePrint}
        getServiceLabel={getServiceLabel}
      />
    </div>
  );
}

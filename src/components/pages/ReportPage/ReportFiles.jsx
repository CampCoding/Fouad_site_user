// src/components/pages/ReportPage/ReportFiles.jsx
import {
  ArrowDown,
  ArrowUp,
  CalendarCheck,
  ChevronDown,
  FileText,
  FolderClosed,
  Printer,
  SearchX,
  Share2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

export default function ReportFiles({
  records = [],
  selectedRecord,
  onSelect,
  onOpen,
  onPrint,
  getServiceLabel,
}) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isOpenFiles = searchParams.get("filesOpen") === "true";
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const toggleOpenFiles = () => {
    setSearchParams((prev) => {
      prev.set("filesOpen", String(!isOpenFiles));
      return prev;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    if (!/\d/.test(dateStr)) return 0;
    const cleaned = String(dateStr).trim();
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(cleaned))
      return new Date(cleaned).getTime();
    const parts = cleaned.split(/[\/\-]/);
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const d = new Date(
        `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      );
      return isNaN(d.getTime()) ? 0 : d.getTime();
    }
    return 0;
  };

  const sortedRecords = useMemo(() => {
    if (!sortConfig.key) return records;

    const sorted = [...records].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "service") {
        aVal = getServiceLabel(aVal);
        bVal = getServiceLabel(bVal);
      }

      if (sortConfig.key === "date") {
        const aTime = parseDate(aVal);
        const bTime = parseDate(bVal);
        return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [records, sortConfig, getServiceLabel]);

  // ✨ Columns مع min-width لكل عمود
  const columns = [
    {
      key: "child",
      labelKey: "reports.cols.child",
      minWidth: "min-w-[140px]",
    },
    {
      key: "father",
      labelKey: "reports.cols.father",
      minWidth: "min-w-[140px]",
    },
    {
      key: "service",
      labelKey: "reports.cols.service",
      minWidth: "min-w-[110px]",
    },
    {
      key: "date",
      labelKey: "reports.cols.date",
      minWidth: "min-w-[110px]",
    },
  ];

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <span className="flex flex-col items-center text-white/30">
          <ArrowUp size={9} className="-mb-1" />
          <ArrowDown size={9} />
        </span>
      );
    }
    return (
      <span className="flex flex-col items-center">
        <ArrowUp
          size={9}
          className={`-mb-1 transition-colors ${
            sortConfig.direction === "asc"
              ? "text-(--main-color)"
              : "text-white/30"
          }`}
        />
        <ArrowDown
          size={9}
          className={`transition-colors ${
            sortConfig.direction === "desc"
              ? "text-(--main-color)"
              : "text-white/30"
          }`}
        />
      </span>
    );
  };

  const actions = [
    {
      key: "open",
      icon: FileText,
      label: t("reports.actions.open"),
      onClick: onOpen,
    },
    {
      key: "print",
      icon: Printer,
      label: t("reports.actions.print"),
      onClick: onPrint,
    },
    {
      key: "ship",
      icon: FolderClosed,
      label: t("reports.actions.ship"),
      onClick: () => navigate(`/report-shipping/${selectedRecord?.id}`),
    },
    {
      key: "send",
      icon: Share2,
      label: t("reports.actions.send"),
      onClick: () => navigate(`/report-sending/${selectedRecord?.id}`),
    },
    {
      key: "book",
      icon: CalendarCheck,
      label: t("reports.actions.book"),
      onClick: () => navigate("/reservations?s=payment&svc=1"),
    },
  ];

  const getCellValue = (record, key) => {
    if (key === "service") return getServiceLabel(record.service);
    return record[key];
  };

  return (
    <div className="mt-6 animate-in fade-in duration-300">
      {/* Files Toggle */}
      <div
        onClick={toggleOpenFiles}
        className="flex items-center justify-between h-[40px] bg-[#171717] border-2 border-(--main-color) rounded-[6px] cursor-pointer transition-all"
      >
        <div className="flex-1 px-3 text-center truncate flex items-center justify-center gap-2">
          <span className="text-[14px] text-center text-white font-bold">
            {t("reports.filesTitle")}
          </span>
        </div>
        <div className="h-full aspect-square flex items-center justify-center">
          <ChevronDown
            className={`w-4 h-4 text-(--main-color) transition-transform ${
              isOpenFiles ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpenFiles && (
        <div className="mt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300 px-1">
          {/* ✨ Scroll hint (mobile only) */}
          <p className="lg:hidden text-white/35 text-[10.5px] text-center -mb-1">
            ← {t("reports.scrollHint")} →
          </p>

          {/* ============ TABLE WITH HORIZONTAL SCROLL ============ */}
          <div className="w-full border border-(--main-color)/30 rounded-[8px] overflow-hidden bg-[#171717]">
            {/* Horizontal scroll wrapper */}
            <div className="overflow-x-auto [scrollbar-width:thin] [scrollbar-color:#d49a3e_#171717]">
              {/* Min width to force scroll on mobile */}
              <div className="min-w-[560px]">
                {/* Header Row */}
                <div className="grid grid-cols-4 bg-(--main-color)/15 border-b border-(--main-color)/30">
                  {columns.map((col, idx) => (
                    <button
                      key={col.key}
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={`${col.minWidth} flex items-center justify-center gap-1.5 px-2 py-3 text-center cursor-pointer hover:bg-(--main-color)/25 transition-colors ${
                        idx !== columns.length - 1
                          ? "border-l border-(--main-color)/20"
                          : ""
                      }`}
                    >
                      <span className="text-[12.5px] sm:text-[13px] font-bold text-(--main-color) truncate">
                        {t(col.labelKey)}
                      </span>
                      <SortIcon columnKey={col.key} />
                    </button>
                  ))}
                </div>

                {/* Vertical scroll body */}
                <div className="max-h-[320px] sm:max-h-[380px] lg:max-h-[420px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#d49a3e_#171717]">
                  {sortedRecords.length === 0 ? (
                    <div className="py-12 flex flex-col items-center gap-2 px-3">
                      <SearchX size={32} className="text-white/20" />
                      <p className="text-white/45 text-[12.5px] text-center font-bold">
                        {t("reports.noResults")}
                      </p>
                      <p className="text-white/30 text-[11px] text-center">
                        {t("reports.tryChange")}
                      </p>
                    </div>
                  ) : (
                    sortedRecords.map((record) => {
                      const isSelected = selectedRecord?.id === record.id;
                      return (
                        <div
                          key={record.id}
                          onClick={() => onSelect(record)}
                          className={`grid grid-cols-4 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#1a1612] border-2 border-(--main-color) shadow-[inset_0_0_15px_rgba(212,154,62,0.15)]"
                              : "hover:bg-white/[0.04] border-b border-[#222] last:border-b-0"
                          }`}
                        >
                          {columns.map((col, idx) => (
                            <Cell
                              key={col.key}
                              text={getCellValue(record, col.key)}
                              isSelected={isSelected}
                              bordered={idx !== columns.length - 1}
                              minWidth={col.minWidth}
                            />
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Helper hint */}
          {!selectedRecord && sortedRecords.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 py-1">
              <div className="w-1 h-1 rounded-full bg-(--main-color)/60" />
              <p className="text-white/45 text-[11px]">
                {t("reports.selectHint")}
              </p>
              <div className="w-1 h-1 rounded-full bg-(--main-color)/60" />
            </div>
          )}

          {/* Selected indicator */}
          {selectedRecord && (
            <div className="flex items-center gap-2 bg-(--main-color)/10 border border-(--main-color)/30 rounded-[8px] px-3 py-2.5 animate-in fade-in duration-200">
              <FileText
                size={15}
                className="text-(--main-color) flex-shrink-0"
              />
              <p className="text-white text-[12px] sm:text-[13px] font-bold truncate flex-1">
                {selectedRecord.child} - {selectedRecord.father}
              </p>
              <span className="text-[10px] text-(--main-color) bg-(--main-color)/15 px-2 py-0.5 rounded-full flex-shrink-0 font-bold">
                {t("reports.selectedBadge")}
              </span>
            </div>
          )}

          {/* Actions */}
          {selectedRecord && (
            <div className="grid grid-cols-5 w-full gap-1.5 sm:gap-2 mt-1 animate-in fade-in duration-200">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.key}
                    onClick={action.onClick}
                    className="mx-auto cursor-pointer w-full h-[72px] sm:h-[78px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-[10px] flex flex-col gap-1.5 items-center justify-center transition-all hover:scale-[1.03] active:scale-95 border border-transparent hover:border-(--main-color)/40"
                  >
                    <Icon size={22} className="text-(--main-color) sm:hidden" />
                    <Icon
                      size={24}
                      className="text-(--main-color) hidden sm:block"
                    />
                    <span className="text-white text-[10.5px] sm:text-[11.5px] font-bold">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ Cell Component ============ */
function Cell({ text, isSelected, bordered, minWidth }) {
  return (
    <div
      className={`${minWidth} px-2 py-3 flex items-center justify-center ${
        bordered
          ? `border-l ${isSelected ? "border-l-(--main-color)/30" : "border-l-[#222]"}`
          : ""
      }`}
    >
      <p
        className={`text-[12.5px] sm:text-[13px] font-bold text-center truncate transition-colors ${
          isSelected ? "text-(--main-color)" : "text-[#eee]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

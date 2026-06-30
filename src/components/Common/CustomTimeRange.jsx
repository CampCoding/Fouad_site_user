// src/components/Common/CustomTimeRange.jsx
import { Clock } from "lucide-react";
import { useRef } from "react";

export default function CustomTimeRange({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  fromPlaceholder = "من",
  toPlaceholder = "إلى",
  error,
  className = "",
}) {
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const formatTime12h = (time24, isEn = false) => {
    if (!time24) return "";
    const [h, m] = time24.split(":");
    const hour = parseInt(h);
    const period = hour >= 12 ? (isEn ? "PM" : "م") : isEn ? "AM" : "ص";
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${m} ${period}`;
  };

  const isEn = document.documentElement.lang === "en";

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 gap-2">
        {/* From */}
        <div
          onClick={() => fromRef.current?.showPicker?.()}
          className={`relative flex items-center h-[40px] bg-[#0f0f0f] border rounded-[10px] cursor-pointer transition-colors ${
            error ? "" : "border-[#2a2a2a] hover:border-(--main-color)/50"
          }`}
          style={error ? { borderColor: "#671C33" } : {}}
        >
          <div className="flex-1 px-3 truncate">
            <span
              className={`text-[13px] ${
                fromValue ? "text-white" : "text-white/35"
              }`}
            >
              {fromValue ? formatTime12h(fromValue, isEn) : fromPlaceholder}
            </span>
          </div>
          <div className="px-2.5 border-s border-[#222]">
            <Clock size={14} className="text-(--main-color)" />
          </div>

          <input
            ref={fromRef}
            type="time"
            value={fromValue || ""}
            onChange={(e) => onFromChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer [color-scheme:dark]"
          />
        </div>

        {/* To */}
        <div
          onClick={() => toRef.current?.showPicker?.()}
          className={`relative flex items-center h-[40px] bg-[#0f0f0f] border rounded-[10px] cursor-pointer transition-colors ${
            error ? "" : "border-[#2a2a2a] hover:border-(--main-color)/50"
          }`}
          style={error ? { borderColor: "#671C33" } : {}}
        >
          <div className="flex-1 px-3 truncate">
            <span
              className={`text-[13px] ${
                toValue ? "text-white" : "text-white/35"
              }`}
            >
              {toValue ? formatTime12h(toValue, isEn) : toPlaceholder}
            </span>
          </div>
          <div className="px-2.5 border-s border-[#222]">
            <Clock size={14} className="text-(--main-color)" />
          </div>

          <input
            ref={toRef}
            type="time"
            value={toValue || ""}
            onChange={(e) => onToChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer [color-scheme:dark]"
          />
        </div>
      </div>

      {error && (
        <p
          className="text-[11px] mt-1 flex items-center gap-1.5"
          style={{ color: "#a8334c" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#671C33" }}
          />
          {error.message || error}
        </p>
      )}
    </div>
  );
}

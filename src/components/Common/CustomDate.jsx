import { Calendar } from "lucide-react";
import { useRef } from "react";

export default function CustomDate({
  value,
  onChange,
  placeholder = "تاريخ الخدمة",
  error,
  className = "",
}) {
  const dateInputRef = useRef(null);

  const handleBoxClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        onClick={handleBoxClick}
        className={`flex items-center h-[38.4px] bg-[#171717] border rounded-[4px] cursor-pointer group transition-all ${
          error
            ? ""
            : "border-(--main-color)/30 focus-within:border-(--main-color)"
        }`}
        style={error ? { borderColor: "#671C33" } : {}}
      >
        <div className="flex-1 px-3 text-start truncate">
          <span
            className={`${value ? "text-white" : "text-(--main-color)"} text-sm`}
          >
            {value ? value : placeholder}
          </span>
        </div>

        <div className="h-full aspect-square flex items-center justify-center rounded-s-[4px]">
          <Calendar className="w-4 h-4 text-(--main-color)" />
        </div>
      </div>

      {error && (
        <p
          className="text-[11px] mt-1 text-start flex items-center gap-1.5"
          style={{ color: "#a8334c" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#671C33" }}
          />
          {error.message || error}
        </p>
      )}

      <input
        ref={dateInputRef}
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

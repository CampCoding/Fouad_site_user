// src/components/Common/CustomCombobox.jsx
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CustomCombobox({
  value,
  onChange,
  options = [],
  placeholder = "اختر أو اكتب...",
  error,
  className = "",
  allowCustom = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!value) {
      setSearch("");
      return;
    }
    const found = options.find((opt) => opt.value === value);
    setSearch(found ? found.label : value);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (opt) => {
    onChange(opt.value);
    setSearch(opt.label);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setIsOpen(true);
    if (allowCustom) onChange(val);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearch("");
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div
        className={`flex items-center bg-[#0f0f0f] border rounded-[10px] transition-colors h-[40px] ${
          error ? "" : isOpen ? "border-(--main-color)" : "border-[#2a2a2a]"
        }`}
        style={error ? { borderColor: "#671C33" } : {}}
      >
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-[13px] px-3 outline-none placeholder:text-white/35 min-w-0"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 w-6 h-6 me-1 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={12} className="text-white/50" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 w-9 h-full flex items-center justify-center"
        >
          <ChevronDown
            size={15}
            className={`text-(--main-color) transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-[100] top-full mt-1 left-0 right-0 bg-[#0f0f0f] border border-(--main-color)/40 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-h-[200px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-center text-white/40 text-[12px]">
              {allowCustom && search ? `استخدم: "${search}"` : "لا توجد نتائج"}
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-start px-3 py-2.5 text-[12.5px] hover:bg-(--main-color)/10 transition-colors flex items-center justify-between gap-2 ${
                  value === opt.value
                    ? "bg-(--main-color)/10 text-(--main-color) font-bold"
                    : "text-white/80"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && (
                  <Check
                    size={13}
                    className="text-(--main-color) flex-shrink-0"
                  />
                )}
              </button>
            ))
          )}
        </div>
      )}

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

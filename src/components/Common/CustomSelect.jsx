import React, { useState, useRef, useEffect } from 'react';

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder,
  error,
  className = "",
  selectClassName = ""

}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${selectClassName} flex items-center justify-between h-[38.4px] bg-[#171717] border rounded-[4px] cursor-pointer group transition-all ${error ? 'border-red-500' : 'border-(--main-color)/30 focus-within:border-(--main-color)'
          }`}
      >
        {/* Selected value or placeholder */}
        <div className="flex-1 px-3 text-start truncate flex items-center gap-2">
          {selectedOption?.img && (
            <img src={selectedOption.img} alt={selectedOption.label} className="w-10 h-10 object-contain" />
          )}
          {selectedOption?.icon && (
            <span className="text-white">{selectedOption.icon}</span>
          )}
          <span className={`${selectedOption ? 'text-white' : 'text-(--main-color)'} text-sm`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="h-full aspect-square flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1742382414/icons_fouady_6_kyj440.png"
            alt="chevron down"
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1 text-start">{error.message || error}</p>}

      {/* Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-[#171717] border border-(--main-color)/30 rounded-[4px] shadow-lg max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.id || option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-(--main-color)/10 transition-colors flex items-center gap-3 ${value === option.value ? 'bg-(--main-color)/20 text-white' : 'text-(--main-color)'
                  }`}
              >
                {option.img && (
                  <img src={option.img} alt={option.label} className="w-10 h-10" />
                )}
                {option.icon && (
                  <span className="text-lg">{option.icon}</span>
                )}
                <span className="flex-1">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-(--main-color)/50">لا يوجد خيارات</div>
          )}
        </div>
      )}
    </div>
  );
}

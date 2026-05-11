import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

export default function CustomDate({ 
  value, 
  onChange, 
  placeholder = "تاريخ الخدمة", 
  error, 
  className = "" 
}) {
  const dateInputRef = useRef(null);

  const handleBoxClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Visual Component */}
      <div
        onClick={handleBoxClick}
        className={`flex items-center h-[38.4px] bg-[#171717] border rounded-[4px] cursor-pointer group transition-all ${
          error ? 'border-red-500' : 'border-(--main-color)/30 focus-within:border-(--main-color)'
        }`}
      >
        {/* Display Value / Placeholder */}
        <div className="flex-1 px-3 text-start truncate">
          <span className={`${value ? 'text-white' : 'text-(--main-color)'} text-sm`}>
            {value ? value : placeholder}
          </span>
        </div>

        {/* Calendar Icon Box on the left (as shown in the design image) */}
        <div className="h-full aspect-square flex items-center justify-center rounded-s-[4px]">
          <Calendar className="w-4 h-4 text-(--main-color)" />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1 text-start">{error.message || error}</p>}

      {/* Hidden Native Date Input */}
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

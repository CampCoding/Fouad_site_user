import React from "react";

export default function CustomInput({
  type = "text",
  istextarea,
  className = "",
  style = {},
  placeholder,
  onChange,
  name,
  row,
  value,
  error,
}) {
  // Common classes for consistency
  const commonClasses = `block bg-[#171717] border border-[#545454] w-full text-sm text-white focus:border-(--main-color) p-[8px_10px] outline-none placeholder:text-white pr-2 rounded-[5px] transition-all ${className}`;

  if (istextarea) {
    return (
      <div className="w-full flex flex-col gap-1">
        <textarea
          className={commonClasses}
          style={style}
          rows={row || 7}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        ></textarea>
        {error && <p className="text-red-500 text-[10px] text-right">{error.message || error}</p>}
      </div>
    );
  }

  // Handle File Type specifically to show placeholder
  if (type === "file") {
    return (
      <div className="w-full flex flex-col gap-1">
        <label
          className={`${commonClasses} h-[38.7px] flex items-center justify-end cursor-pointer`}
          style={style}
        >
          <span className="text-white text-sm">
            {value ? (typeof value === "string" ? value : value.name) : placeholder}
          </span>
          <input
            type="file"
            className="hidden" // Hide the default browser button
            name={name}
            onChange={onChange}
          />
        </label>
        {error && <p className="text-red-500 text-[10px] text-right">{error.message || error}</p>}
      </div>
    );
  }

  // Default Input (text, number, etc.)
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className={`${commonClasses} text-right text-white placeholder:text-white h-[38.7px] ${error ? 'border-red-500' : ''}`}
        style={style}
        value={value || ""}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-[10px] text-right">{error.message || error}</p>}
    </div>
  );
}

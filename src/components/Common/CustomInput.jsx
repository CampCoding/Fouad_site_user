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
  register,
  autoComplete,
  hasEndIcon = false,
}) {
  const commonClasses = `block bg-[#0f0f0f] border border-[#2a2a2a] w-full text-[13px] text-white focus:border-(--main-color) py-[8px] ps-3 ${
    hasEndIcon ? "pe-9" : "pe-3"
  } outline-none placeholder:text-white/35 rounded-[10px] transition-colors ${
    error ? "!border-[#671C33]" : ""
  } ${className}`;

  if (istextarea) {
    const textareaProps = register
      ? { ...register }
      : { value: value ?? "", onChange, name };

    return (
      <div className="w-full flex flex-col gap-1">
        <textarea
          {...textareaProps}
          className={`${commonClasses} resize-none`}
          style={style}
          rows={row || 5}
          placeholder={placeholder}
        />
        {error && <ErrorText error={error} />}
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="w-full flex flex-col gap-1">
        <label
          className={`${commonClasses} h-[38px] flex items-center cursor-pointer`}
          style={style}
        >
          <span className="text-white text-[13px] truncate">
            {value
              ? typeof value === "string"
                ? value
                : value.name
              : placeholder}
          </span>
          <input
            type="file"
            className="hidden"
            name={name}
            onChange={onChange}
            {...(register || {})}
          />
        </label>
        {error && <ErrorText error={error} />}
      </div>
    );
  }

  const inputProps = register
    ? { ...register }
    : { value: value ?? "", onChange, name };

  return (
    <div className="w-full flex flex-col gap-1">
      <input
        {...inputProps}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        style={style}
        className={`${commonClasses} h-[40px]`}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
}

/* ====== Error Text (نبيتي #671C33) ====== */
function ErrorText({ error }) {
  return (
    <p
      className="text-[11px] flex items-center gap-1.5 mt-0.5"
      style={{ color: "#a8334c" }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "#671C33" }}
      />
      {error.message || error}
    </p>
  );
}

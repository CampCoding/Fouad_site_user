export default function InfoBlock({ title, intro, items, ordered = false }) {
  return (
    <div className="bg-[#171717] border border-(--main-color)/20 rounded-xl p-4 lg:p-5">
      {title && (
        <h3 className="text-(--main-color) font-bold text-[14px] lg:text-[15px] mb-3 pb-2 border-b border-(--main-color)/20">
          {title}
        </h3>
      )}

      {intro && (
        <p className="text-white/80 text-[12px] lg:text-[13px] mb-3 leading-relaxed">
          {intro}
        </p>
      )}

      {items && items.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 items-start text-white/85 text-[12px] lg:text-[13px] leading-relaxed"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 text-(--main-color) flex items-center justify-center text-[10px] font-bold mt-0.5">
                {ordered ? idx + 1 : "•"}
              </span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

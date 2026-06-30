export default function TextBlock({ title, text }) {
  return (
    <div className="bg-[#171717] border border-(--main-color)/20 rounded-xl p-4 lg:p-5">
      {title && (
        <h3 className="text-(--main-color) font-bold text-[14px] lg:text-[15px] mb-3 pb-2 border-b border-(--main-color)/20">
          {title}
        </h3>
      )}
      {text && (
        <p className="text-white/85 text-[12px] lg:text-[13px] leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
}

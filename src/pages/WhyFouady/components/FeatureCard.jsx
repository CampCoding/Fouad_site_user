import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FeatureCard({
  icon: Icon,
  title,
  desc,
  items = [],
  btnText,
  onBtnClick,
  accentColor = "main", // main / blue / emerald / purple / amber
}) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl overflow-hidden hover:border-(--main-color) transition-all shadow-sm">
      {/* Header */}
      <div className="p-4 lg:p-5 flex items-start gap-3 border-b border-(--main-color)/20 bg-(--main-color)/5">
        {Icon && (
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-(--main-color) lg:w-6 lg:h-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-[14px] lg:text-[16px] mb-1">
            {title}
          </h3>
          {desc && (
            <p className="text-white/70 text-[11.5px] lg:text-[12.5px] leading-relaxed">
              {desc}
            </p>
          )}
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="p-4 lg:p-5">
          <ul className="flex flex-col gap-2.5">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-2.5 items-start text-white/85 text-[12px] lg:text-[13px] leading-relaxed"
              >
                <CheckCircle2
                  size={14}
                  className="text-(--main-color) flex-shrink-0 mt-0.5"
                />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button */}
      {btnText && onBtnClick && (
        <div className="px-4 lg:px-5 pb-4 lg:pb-5">
          <button
            onClick={onBtnClick}
            className="w-full bg-(--main-color)/10 hover:bg-(--main-color) text-(--main-color) hover:text-black border border-(--main-color)/40 hover:border-(--main-color) rounded-lg py-2.5 text-[12px] lg:text-[13px] font-bold transition-all flex items-center justify-center gap-2 group"
          >
            {btnText}
            <ArrowIcon
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
}

import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SectionCard({ section, onClick }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const ArrowIcon = isEn ? ChevronRight : ChevronLeft;
  const Icon = section.icon;

  // ✨ أول صورة كـ preview
  const previewImage = section.images?.[0];
  const imagesCount = section.images?.length || 0;

  return (
    <button
      onClick={onClick}
      className="
        group relative bg-[#171717] border border-(--main-color)/30
        hover:border-(--main-color)
        rounded-xl overflow-hidden
        flex flex-col
        transition-all duration-300
        text-start w-full
        shadow-sm hover:shadow-[0_4px_20px_rgba(212,154,62,0.15)]
      "
    >
      {/* Preview Area */}
      <div className="relative w-full aspect-[16/9] bg-[#0d0d0d] overflow-hidden border-b border-(--main-color)/20">
        {previewImage ? (
          <>
            {/* الصورة كـ preview - فيها blur وبتاع عشان توحي إنها preview */}
            <img
              src={previewImage}
              alt={t(`beforeVisit.sections.${section.id}.title`)}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            />

            {/* Overlay ديكور */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />

            {/* Badge عدد الصور */}
            <div className="absolute top-3 end-3 bg-black/70 backdrop-blur-md border border-(--main-color)/50 rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <Images size={11} className="text-(--main-color)" />
              <span className="text-(--main-color) text-[10px] font-bold">
                {imagesCount}
              </span>
            </div>
          </>
        ) : Icon ? (
          // للكروت الـ extra (Bring + Reach) — أيقونة كبيرة
          <div className="w-full h-full flex items-center justify-center bg-(--main-color)/5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
              <Icon size={32} className="text-(--main-color) lg:w-9 lg:h-9" />
            </div>
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="p-3 lg:p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-[13px] lg:text-[15px] truncate">
            {t(`beforeVisit.sections.${section.id}.title`)}
          </h3>
          <p className="text-white/60 text-[11px] lg:text-[12px] mt-0.5 line-clamp-1">
            {t(`beforeVisit.sections.${section.id}.shortDesc`)}
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center flex-shrink-0 group-hover:bg-(--main-color) group-hover:border-(--main-color) transition-all">
          <ArrowIcon
            size={16}
            className="text-(--main-color) group-hover:text-black transition-colors"
          />
        </div>
      </div>
    </button>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomeCard({
  item,
  onClick,
  activeId,
  className = "",
  imgClass = "w-[40px] h-[40px]",
  textClass = "text-[13px]",
  border = false,
  style = {},
}) {
  const { i18n } = useTranslation();
  const isActive = activeId === item?.id;
  const isAr = i18n.language === "ar";

  return (
    <>
      {/* ========== موبايل + تابلت (الشكل القديم - مربع) ========== */}
      <div
        onClick={onClick}
        style={style}
        className={`
          lg:hidden
          mx-auto cursor-pointer 
          w-full aspect-square 
          max-w-[110px] sm:max-w-[140px]
          bg-[linear-gradient(180deg,#0a0a0a_0%,#1f1f1f_100%)]
          rounded-[14px]
          flex flex-col items-center justify-center 
          border transition-all duration-300
          hover:scale-[1.02]
          ${
            isActive || border
              ? "border-(--main-color) shadow-[0_0_15px_rgba(212,154,62,0.25)]"
              : "border-(--main-color)/90 hover:border-(--main-color)"
          }
          ${className}
        `}
      >
        <div
          className="
            w-[55px] h-[55px]
            rounded-full 
            bg-[radial-gradient(circle,rgba(0,0,0,0.6),rgba(0,0,0,0.3))]
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.4)]
            flex items-center justify-center
            flex-shrink-0
          "
        >
          {item?.icon ? (
            <item.icon className={`${imgClass} text-(--main-color)`} />
          ) : (
            <img
              src={item?.img || item?.image}
              className={`${imgClass} object-contain`}
              alt={item?.name}
            />
          )}
        </div>

        {item?.name && (
          <p
            className={`
              font-normal cursor-pointer text-white 
              text-center px-1 line-clamp-1 mt-2
              ${textClass}
            `}
          >
            {item?.name}
          </p>
        )}
      </div>

      {/* ========== ديسكتوب (الشكل الجديد - أفقي) ========== */}
      <div
        onClick={onClick}
        style={style}
        className={`
          hidden lg:flex
          cursor-pointer w-full
          bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_50%,#1f1f1f_100%)]
          rounded-[16px]
          items-center gap-4 p-4
          border transition-all duration-300
          hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(212,154,62,0.15)]
          group relative overflow-hidden
          ${
            isActive || border
              ? "border-(--main-color) shadow-[0_0_15px_rgba(212,154,62,0.3)]"
              : "border-(--main-color)/60 hover:border-(--main-color)"
          }
          ${className}
        `}
      >
        {/* Accent line في الأعلى */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-(--main-color)/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* الأيقونة في دايرة */}
        <div
          className="
            w-[65px] h-[65px]
            rounded-full 
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]
            flex items-center justify-center
            flex-shrink-0
            border border-(--main-color)/30
            group-hover:border-(--main-color)/60
            transition-all
          "
        >
          {item?.icon ? (
            <item.icon className="w-[32px] h-[32px] text-(--main-color)" />
          ) : (
            <img
              src={item?.img || item?.image}
              className="w-[34px] h-[34px] object-contain"
              alt={item?.name}
            />
          )}
        </div>

        {/* النصوص */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <h3 className="text-white font-bold text-[16px] truncate">
            {item?.name}
          </h3>
          {item?.desc && (
            <p className="text-white/50 text-[12px] truncate">{item.desc}</p>
          )}
        </div>

        {/* السهم */}
        <div className="flex-shrink-0 text-(--main-color)/40 group-hover:text-(--main-color) group-hover:translate-x-[-4px] transition-all">
          {isAr ? (
            <ChevronLeft className="w-[20px] h-[20px]" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px]" />
          )}
        </div>
      </div>
    </>
  );
}

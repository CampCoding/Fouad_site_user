// src/pages/Profile/components/ProfileMenu.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import HomeCard from "../../../components/Common/HomeCard";

export default function ProfileMenu({ menuItems, onSelect }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <>
      {/* Mobile / Tablet */}
      <div className="grid grid-cols-3 gap-3 mt-4 lg:hidden">
        {menuItems.map((item) => (
          <HomeCard
            key={item.id}
            item={item}
            onClick={() => onSelect(item.view)}
            imgClass="w-[26px] h-[26px]"
            textClass="text-[14px]"
            className="w-full"
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-2 gap-4 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.view)}
            className="cursor-pointer w-full bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_50%,#1f1f1f_100%)] rounded-[16px] flex items-center gap-4 p-5 border border-(--main-color)/60 hover:border-(--main-color) hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(212,154,62,0.15)] transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-(--main-color)/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-[65px] h-[65px] rounded-full bg-[radial-gradient(circle,rgba(212,154,62,0.15),rgba(0,0,0,0.4))] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center flex-shrink-0 border border-(--main-color)/30 group-hover:border-(--main-color)/60 transition-all">
              <item.icon className="w-[30px] h-[30px] text-(--main-color)" />
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <h3 className="text-white font-bold text-[16px] truncate">
                {item.name}
              </h3>
              <p className="text-white/50 text-[12px] truncate">
                {item.view === "patients"
                  ? isEn
                    ? "Manage your patients list"
                    : "إدارة قائمة مرضاك"
                  : t(`profile.desc.${item.view}`)}
              </p>
            </div>
            <div className="flex-shrink-0 text-(--main-color)/40 group-hover:text-(--main-color) transition-all">
              {isEn ? (
                <ChevronRight className="w-[20px] h-[20px]" />
              ) : (
                <ChevronLeft className="w-[20px] h-[20px]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

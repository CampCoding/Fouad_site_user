// src/pages/Profile/components/FollowersView.jsx
import { Calendar, CalendarCheck, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATIENT_FOLLOWERS_DATA } from "./data";

export default function FollowersView() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const navigate = useNavigate();

  return (
    <div className="text-white flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1">
        <p className="text-(--main-color) text-[12px] lg:text-[14px] font-bold">
          {t("profile.followers.upcoming")}
        </p>
        <p className="text-white/40 text-[11px] lg:text-[12px]">
          {PATIENT_FOLLOWERS_DATA.length} {t("profile.followers.count")}
        </p>
      </div>

      {PATIENT_FOLLOWERS_DATA.length === 0 ? (
        <div className="border border-[#292929] bg-[#111] rounded-[14px] py-12 flex flex-col items-center gap-3">
          <CalendarCheck size={36} className="text-white/20" />
          <p className="text-white/40 text-[13px]">
            {isEn ? "No upcoming follow-ups" : "لا توجد متابعات قادمة"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {PATIENT_FOLLOWERS_DATA.map((item) => (
            <div
              key={item.id}
              className="border border-(--main-color)/40 bg-[#171717] rounded-lg overflow-hidden hover:border-(--main-color) transition-colors"
            >
              <div className="relative w-full h-[140px] lg:h-[180px] bg-[#0d0d0d]">
                <img
                  src={item.image}
                  alt={isEn ? item.titleEn : item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x200/171717/d49a3e?text=Fouady";
                  }}
                />
                <div className="absolute top-2 end-2 bg-(--main-color) text-black font-bold text-[11px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <CalendarCheck size={12} />
                  {item.date}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-3 lg:p-4 flex flex-col gap-2">
                <p className="text-white font-bold text-[14px] lg:text-[16px]">
                  {isEn ? item.titleEn : item.title}
                </p>
                <p className="text-white/60 text-[11px] lg:text-[12px] leading-relaxed">
                  {isEn ? item.descriptionEn : item.description}
                </p>

                <div className="flex items-center gap-1.5 bg-[#0d0d0d] border border-[#292929] rounded-md px-2 py-1.5 mt-1">
                  <UserRound size={13} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px] lg:text-[12px]">
                    <span className="text-white/50">
                      {t("profile.followers.doctor")}:{" "}
                    </span>
                    <span className="font-bold">
                      {isEn ? item.doctorEn : item.doctor}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/reservations?v=followers`)}
                  className="auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5 mt-1"
                >
                  <Calendar size={16} />
                  {t("profile.followers.book")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

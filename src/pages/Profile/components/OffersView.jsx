// src/pages/Profile/components/OffersView.jsx
import { Calendar, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { OFFERS_DATA } from "./data";

export default function OffersView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-white flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1">
        <p className="text-(--main-color) text-[12px] lg:text-[14px] font-bold">
          {t("profile.offers.available")}
        </p>
        <p className="text-white/40 text-[11px] lg:text-[12px]">
          {OFFERS_DATA.length} {t("profile.offers.count")}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
        {OFFERS_DATA.map((offer) => (
          <div
            key={offer.id}
            className="border border-(--main-color)/40 bg-[#171717] rounded-lg overflow-hidden hover:border-(--main-color) transition-colors"
          >
            <div className="relative w-full h-[160px] lg:h-[200px] bg-[#0d0d0d]">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x200/171717/d49a3e?text=Offer";
                }}
              />
              <div className="absolute top-2 end-2 bg-(--main-color) text-black font-bold text-[13px] px-3 py-1 rounded-full shadow-lg">
                {t("profile.offers.discount")} {offer.discount}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-3 lg:p-4 flex flex-col gap-2">
              <p className="text-white font-bold text-[14px] lg:text-[16px]">
                {offer.title}
              </p>
              <p className="text-white/60 text-[11px] lg:text-[12px] leading-relaxed">
                {offer.description}
              </p>
              <div className="flex items-center gap-1.5 bg-[#0d0d0d] border border-[#292929] rounded-md px-2 py-1.5 mt-1">
                <Calendar size={13} className="text-(--main-color)" />
                <p className="text-white/80 text-[11px] lg:text-[12px]">
                  {t("profile.offers.validUntil")}:{" "}
                  <span className="text-(--main-color) font-bold">
                    {offer.expiry}
                  </span>
                </p>
              </div>
              <button
                onClick={() =>
                  navigate(`/reservations?s=payment&svc=${offer.id}`)
                }
                className="auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5 mt-1"
              >
                <Gift size={16} />
                {t("profile.offers.useNow")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

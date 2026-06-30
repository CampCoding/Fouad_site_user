import {
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BranchCard({ branch }) {
  const { t } = useTranslation();

  const handleCall = (phone) => window.open(`tel:${phone}`);
  const handleWhatsapp = (phone) =>
    window.open(`https://wa.me/2${phone.replace(/^0/, "")}`, "_blank");
  const handleMap = () => window.open(branch.mapLink, "_blank");

  return (
    <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl overflow-hidden hover:border-(--main-color) transition-all">
      {/* Header */}
      <div className="bg-(--main-color)/10 p-4 border-b border-(--main-color)/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center flex-shrink-0">
          <MapPin size={18} className="text-(--main-color)" />
        </div>
        <h3 className="text-white font-bold text-[14px] lg:text-[16px] flex-1">
          {branch.name}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <InfoRow
          icon={MapPin}
          label={t("beforeVisit.reach.address")}
          value={branch.address}
        />
        <InfoRow
          icon={Navigation}
          label={t("beforeVisit.reach.directions")}
          value={branch.directions}
        />
        <InfoRow
          icon={Clock}
          label={t("beforeVisit.reach.workingHours")}
          value={branch.workingHours}
        />

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={() => handleCall(branch.phone)}
            className="flex items-center justify-center gap-1.5 bg-[#0d0d0d] border border-(--main-color)/30 hover:border-(--main-color) rounded-md py-2 text-[11px] text-white transition-all"
          >
            <Phone size={12} className="text-(--main-color)" />
            <span dir="ltr">{branch.phone}</span>
          </button>
          <button
            onClick={() => handleWhatsapp(branch.whatsapp)}
            className="flex items-center justify-center gap-1.5 bg-[#0d0d0d] border border-(--main-color)/30 hover:border-(--main-color) rounded-md py-2 text-[11px] text-white transition-all"
          >
            <MessageCircle size={12} className="text-(--main-color)" />
            <span>{t("beforeVisit.reach.whatsapp")}</span>
          </button>
        </div>

        <button
          onClick={handleMap}
          className="flex items-center justify-center gap-2 bg-(--main-color) hover:opacity-90 text-black font-bold rounded-md py-2.5 text-[12px] transition-all"
        >
          <MapPin size={14} />
          {t("beforeVisit.reach.openInMaps")}
        </button>

        <button
          onClick={() => handleWhatsapp(branch.whatsapp)}
          className="flex items-center justify-center gap-2 bg-[#0d0d0d] border border-white/10 hover:border-(--main-color)/40 text-white/70 hover:text-white rounded-md py-2 text-[11px] transition-all"
        >
          <HelpCircle size={12} />
          {t("beforeVisit.reach.needHelp")}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-2.5 items-start">
      <Icon size={14} className="text-(--main-color) flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-(--main-color) text-[10px] font-bold mb-0.5">
          {label}
        </p>
        <p className="text-white/85 text-[12px] leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

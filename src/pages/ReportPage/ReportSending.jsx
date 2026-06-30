// src/pages/ReportPage/ReportSending.jsx
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

export default function ReportSending() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const reportData = {
    child: isEn ? "Child Name" : "اسم الطفل",
    father: isEn ? "Father Name" : "اسم الأب",
    service: isEn ? "Service" : "الخدمة",
    date: isEn ? "Service Date" : "تاريخ الخدمة",
    link: "ww.mohamed ebrahem .sss.d",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportData.link);
    toast.success(isEn ? "Link copied successfully!" : "تم نسخ الرابط بنجاح!");
  };

  const handleSend = (platform) => {
    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(reportData.link)}`,
        "_blank",
      );
    } else if (platform === "telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(reportData.link)}`,
        "_blank",
      );
    } else if (platform === "email") {
      window.open(
        `mailto:?subject=Report&body=${encodeURIComponent(reportData.link)}`,
        "_blank",
      );
    }
  };

  const actions = [
    {
      id: 1,
      text: t("reportSending.actions.whatsapp"),
      btn: t("reportSending.send"),
      platform: "whatsapp",
    },
    {
      id: 2,
      text: t("reportSending.actions.telegram"),
      btn: t("reportSending.send"),
      platform: "telegram",
    },
    {
      id: 3,
      text: t("reportSending.actions.email"),
      btn: t("reportSending.send"),
      platform: "email",
    },
    {
      id: 4,
      text: t("reportSending.actions.copy"),
      btn: t("reportSending.copy"),
      platform: "copy",
    },
  ];

  return (
    <div className="pb-10 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="card mt-10">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png"
          className="object-contain"
          width={40}
          height={40}
          alt="report icon"
        />
        <p className="font-bold text-[15px] cursor-pointer text-[#eee]">
          {t("reports.title")}
        </p>
      </div>

      {/* Header Bar */}
      <div className="border h-[38.4px] mt-8 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] shadow-[0_0_10px_rgba(212,154,62,0.1)]">
        <p className="text-white text-center font-bold text-[13px] sm:text-[14px] px-3">
          {t("reportSending.headerTitle")}
        </p>
      </div>

      {/* Top Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 py-3 border-b-2 border-(--main-color) gap-2 sm:gap-3 mt-4">
        <InfoBox text={reportData.child} />
        <InfoBox text={reportData.father} />
        <InfoBox text={reportData.service} />
        <InfoBox text={reportData.date} />
      </div>

      {/* Report Link */}
      <div className="grid grid-cols-4 gap-3 border rounded-[4px] my-3 border-[#292929]">
        <div className="col-span-1 h-[38.4px] flex items-center justify-center rounded-[4px]">
          <p className="text-[#eee] text-[10px] sm:text-[11px] font-bold text-center">
            {t("reportSending.reportLink")}
          </p>
        </div>
        <div className="col-span-3 h-[38.4px] flex justify-end items-center px-4 rounded-[4px]">
          <p className="text-(--main-color) text-[10px] sm:text-[11px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
            {reportData.link}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col my-10 gap-3">
        {actions.map((action) => (
          <div key={action.id} className="grid grid-cols-4 gap-3">
            <div className="col-span-3 border h-[38.4px] flex items-center px-3 sm:px-4 rounded-[4px] border-(--main-color)/30 bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]">
              <p className="text-[#eee] text-[10px] sm:text-[12px] font-bold">
                {action.text}
              </p>
            </div>
            <button
              onClick={() =>
                action.platform === "copy"
                  ? handleCopy()
                  : handleSend(action.platform)
              }
              className="col-span-1 h-[38.4px] bg-[#232323] border border-(--main-color)/30 rounded-[4px] text-white text-[11px] sm:text-[12px] font-bold transition-all hover:bg-(--main-color)/20 active:scale-95 cursor-pointer"
            >
              {action.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBox({ text }) {
  return (
    <div className="border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] shadow-sm">
      <p className="text-white text-[10px] sm:text-[11px] text-center font-bold truncate">
        {text}
      </p>
    </div>
  );
}

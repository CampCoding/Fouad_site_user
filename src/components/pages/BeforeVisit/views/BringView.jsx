import { CheckCircle2, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BringView() {
  const { t } = useTranslation();
  const items = t("beforeVisit.bring.items", { returnObjects: true });

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
            <ClipboardList size={22} className="text-(--main-color)" />
          </div>
          <h2 className="text-white font-bold text-[16px] lg:text-[18px]">
            {t("beforeVisit.sections.bring.title")}
          </h2>
        </div>
        <p className="text-white/80 text-[12px] lg:text-[13px] leading-relaxed">
          {t("beforeVisit.bring.intro")}
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-[#171717] border border-(--main-color)/20 rounded-xl p-4 lg:p-5">
        <ul className="flex flex-col gap-3">
          {(Array.isArray(items) ? items : []).map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 items-start bg-[#0d0d0d] border border-white/5 hover:border-(--main-color)/30 rounded-lg p-3 transition-all"
            >
              <CheckCircle2
                size={18}
                className="text-(--main-color) flex-shrink-0 mt-0.5"
              />
              <span className="text-white/90 text-[12px] lg:text-[13px] leading-relaxed flex-1">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

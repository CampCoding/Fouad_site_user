import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import BranchCard from "../components/BranchCard";

export default function ReachView() {
  const { t } = useTranslation();
  const branches = t("beforeVisit.reach.branches", { returnObjects: true });

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
            <MapPin size={22} className="text-(--main-color)" />
          </div>
          <h2 className="text-white font-bold text-[16px] lg:text-[18px]">
            {t("beforeVisit.sections.reach.title")}
          </h2>
        </div>
        <p className="text-white/80 text-[12px] lg:text-[13px] leading-relaxed">
          {t("beforeVisit.reach.intro")}
        </p>
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(Array.isArray(branches) ? branches : []).map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
}

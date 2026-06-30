import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FileText,
  Search,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReportStepper() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const ArrowIcon = isEn ? ChevronRight : ChevronLeft;
  const steps = t("whyFouady.reports.steps", { returnObjects: true });
  const icons = [FileText, Edit3, Search, CheckCircle, Send];

  return (
    <div className="flex flex-col gap-3">
      {/* Mobile: Vertical stepper */}
      <div className="flex flex-col gap-2 lg:hidden">
        {(Array.isArray(steps) ? steps : []).map((step, idx) => {
          const StepIcon = icons[idx];
          return (
            <div
              key={idx}
              className="flex items-center gap-3 bg-[#0d0d0d] border border-(--main-color)/20 hover:border-(--main-color)/50 rounded-lg p-3 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 text-(--main-color) flex items-center justify-center flex-shrink-0 font-bold text-[12px]">
                {idx + 1}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <StepIcon
                  size={14}
                  className="text-(--main-color) flex-shrink-0"
                />
                <span className="text-white/90 text-[12px] font-medium">
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: Horizontal stepper */}
      <div className="hidden lg:flex items-center gap-1">
        {(Array.isArray(steps) ? steps : []).map((step, idx) => {
          const StepIcon = icons[idx];
          const isLast = idx === steps.length - 1;
          return (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-12 h-12 rounded-full bg-(--main-color)/15 border-2 border-(--main-color)/40 text-(--main-color) flex items-center justify-center font-bold">
                  <StepIcon size={20} />
                </div>
                <div className="text-center">
                  <p className="text-(--main-color) text-[10px] font-bold mb-0.5">
                    {idx + 1}
                  </p>
                  <p className="text-white/90 text-[11px] font-medium leading-tight max-w-[100px]">
                    {step}
                  </p>
                </div>
              </div>

              {!isLast && (
                <ArrowIcon
                  size={20}
                  className="text-(--main-color)/40 flex-shrink-0 mb-6"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

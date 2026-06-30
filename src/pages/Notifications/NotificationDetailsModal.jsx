import { Calendar, Download, ExternalLink, FileText, X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function NotificationDetailsModal({ item, onClose, onAction }) {
  const { t } = useTranslation();

  // Lock scroll + ESC
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!item) return null;

  // نوع الأكشن
  const hasPdf = Boolean(item.pdfUrl);
  const hasRoute = Boolean(item.route);
  const hasAction = hasPdf || hasRoute;

  const actionLabel = hasPdf
    ? t("notifications.downloadPdf")
    : t("notifications.goToPage");

  const ActionIcon = hasPdf ? Download : ExternalLink;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#171717] border border-(--main-color) rounded-xl w-full max-w-[420px] lg:max-w-[500px] max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20 bg-(--main-color)/5">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-(--main-color)" />
            <h3 className="text-white font-bold text-[14px] lg:text-[16px]">
              {t("notifications.details")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-(--main-color)/10 flex items-center justify-center transition-colors"
            title={t("notifications.close")}
          >
            <X size={18} className="text-(--main-color)" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-6 flex flex-col gap-4">
          {/* Icon + Title */}
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0 bg-[#0d0d0d] border border-(--main-color)/40 rounded-lg flex items-center justify-center">
              {item?.icon ? (
                <item.icon className="w-7 h-7 text-(--main-color)" />
              ) : (
                <img
                  src={item?.img || item?.image}
                  className="w-8 h-8 object-contain"
                  alt={item?.name}
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-block bg-(--main-color)/15 border border-(--main-color)/40 text-(--main-color) text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                {item.name}
              </div>
              <h4 className="text-white font-bold text-[15px] lg:text-[17px] leading-snug">
                {item.title}
              </h4>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="bg-[#0d0d0d] border border-white/5 rounded-lg p-3.5">
              <p className="text-white/85 text-[13px] lg:text-[13.5px] leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-white/60 text-[12px]">
            <Calendar size={14} className="text-(--main-color)" />
            <span>{item.date}</span>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="p-4 border-t border-(--main-color)/20 bg-(--main-color)/5 flex flex-col sm:flex-row gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#0d0d0d] border border-white/10 hover:border-(--main-color)/40 text-white/80 hover:text-white rounded-md py-2.5 text-[12px] font-bold transition-all"
          >
            {t("notifications.close")}
          </button>

          {hasAction ? (
            <button
              onClick={onAction}
              className="flex-1 bg-(--main-color) hover:opacity-90 text-black rounded-md py-2.5 text-[12px] font-bold transition-all flex items-center justify-center gap-2"
            >
              <ActionIcon size={14} />
              {actionLabel}
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-[#0d0d0d] border border-white/5 text-white/30 rounded-md py-2.5 text-[12px] font-bold cursor-not-allowed"
            >
              {t("notifications.noAction")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

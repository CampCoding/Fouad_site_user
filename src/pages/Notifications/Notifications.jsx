import { Bell, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import HomeCard from "../../components/Common/HomeCard";
import { useUser } from "../../context/UserContext";
import { getNotificationsByRole } from "../../utils/notificationData";
import NotificationDetailsModal from "./NotificationDetailsModal";

export default function Notifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // ✨ للـ modal

  const { tabs: roleTabs, notifications: roleNotifications } = useMemo(
    () => getNotificationsByRole(user?.role || "patient"),
    [user?.role],
  );

  useEffect(() => {
    setActiveTab(0);
  }, [user?.role]);

  const translatedTabs = useMemo(
    () => roleTabs.map((tab) => ({ ...tab, name: t(tab.nameKey) })),
    [t, roleTabs],
  );

  const translatedNotifications = useMemo(
    () =>
      roleNotifications.map((item) => ({
        ...item,
        name: t(item.nameKey),
        title: t(item.titleKey),
        description: item.descKey ? t(item.descKey) : null,
      })),
    [t, roleNotifications],
  );

  const filteredData = useMemo(() => {
    if (activeTab === 0) return translatedNotifications;
    const activeSlug = roleTabs.find((tab) => tab.id === activeTab)?.slug;
    return translatedNotifications.filter((item) => item.slug === activeSlug);
  }, [activeTab, translatedNotifications, roleTabs]);

  // ✨ Action من داخل الـ modal
  const handleAction = async () => {
    if (!selectedItem) return;

    if (selectedItem.pdfUrl) {
      try {
        const response = await fetch(selectedItem.pdfUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${selectedItem.title || "report"}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        window.open(selectedItem.pdfUrl, "_blank");
      }
      setSelectedItem(null);
      return;
    }

    if (selectedItem.route) {
      navigate(selectedItem.route);
      setSelectedItem(null);
    }
  };

  return (
    <div className="py-10 mx-auto">
      <div className="card mb-4 cursor-pointer" onClick={() => setActiveTab(0)}>
        <Bell size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("notifications.title")}
        </p>
      </div>

      {/* Tabs */}
      <div
        className={`grid grid-cols-3 gap-3 px-2 mb-6 transition-all ${activeTab !== 0 ? "border-b border-(--main-color) pb-4" : ""}`}
      >
        {translatedTabs.map((item) => (
          <HomeCard
            key={item.id}
            item={item}
            activeId={activeTab}
            onClick={() => setActiveTab(item.id)}
            imgClass="w-[26px] h-[26px]"
            textClass="text-[10px]"
            className="w-full"
            forceMobileShape
          />
        ))}
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-1 px-1">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)} // ✨ يفتح الـ modal
              className="flex w-full gap-3 items-stretch pb-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors p-2 rounded-lg group"
            >
              {/* Icon box */}
              <div className="w-[65px] flex-shrink-0 bg-[#171717] border border-(--main-color)/40 group-hover:border-(--main-color) transition-colors rounded-lg flex items-center justify-center self-stretch">
                {item?.icon ? (
                  <item.icon className="w-[26px] h-[26px] text-(--main-color)" />
                ) : (
                  <img
                    src={item?.img || item?.image}
                    className="w-[28px] h-[28px] object-contain"
                    alt={item?.name}
                  />
                )}
              </div>

              {/* النصوص */}
              <div className="flex-1 flex flex-col justify-between gap-1.5 min-h-[65px] p-2.5 bg-[#171717] border border-white/5 group-hover:border-(--main-color)/30 transition-colors rounded-lg">
                <p className="text-white font-bold text-[14px] leading-snug text-right line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-(--main-color) text-[10px]">
                    {item.date || "15/2/2025"}
                  </p>
                  <div className="flex items-center gap-1 text-(--main-color)/70 group-hover:text-(--main-color) text-[10px] font-medium transition-colors">
                    <Eye size={11} />
                    <span>{t("notifications.viewDetails")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-(--main-color)/50 text-sm">
              {t("notifications.empty")}
            </p>
          </div>
        )}
      </div>

      {/* ✨ Modal */}
      {selectedItem && (
        <NotificationDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}

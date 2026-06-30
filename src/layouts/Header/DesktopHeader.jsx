import { Bell, House, Settings, Share2, UserRoundCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";
import { useReport } from "../../context/ReportContext";

export default function DesktopHeader() {
  const { t } = useTranslation();
  const { selectedRecord } = useReport();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const isReportPage = location.pathname.includes("/report");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = isReportPage
    ? [
        { id: 1, text: "تم تحديث بيانات التقرير الحالي", time: "منذ دقيقتين" },
        { id: 2, text: "طلب طباعة جديد للتقرير", time: "منذ ساعة" },
      ]
    : [{ id: 1, text: "تنبيه عام: النظام محدث", time: "منذ يوم" }];

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const navItems = [
    { to: "/", icon: House, label: t("nav.home") },
    { to: "/settings", icon: Settings, label: t("nav.settings") },
    { to: "/profile", icon: UserRoundCog, label: t("nav.profile") },
    { to: "/share", icon: Share2, label: t("nav.share") },
  ];

  return (
    <header className="hidden lg:block sticky top-0 left-0 right-0 z-60 bg-(--dark_gray-4) border-b-2 border-(--main-color)">
      <div className="w-full max-w-[1100px] mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Fouady"
              className="h-[40px] w-auto object-contain"
            />
            <span className="text-(--main-color) font-bold text-[18px]">
              {t("common.appName")}
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-(--main-color)/15 text-(--main-color)"
                        : "text-white/70 hover:text-(--main-color) hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-[20px] h-[20px]" />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleBellClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:text-(--main-color) hover:bg-white/5 transition-all duration-200"
              >
                <Bell className="w-[20px] h-[20px]" />
                <span className="text-[14px] font-medium">
                  {t("nav.notifications")}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute top-[50px] end-0 w-[300px] bg-[#171717] border-2 border-(--main-color) rounded-[8px] shadow-2xl z-70 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-(--main-color)/20">
                    <p className="text-white font-bold text-sm">
                      {isReportPage
                        ? t("nav.reportsNotifications")
                        : t("nav.generalNotifications")}
                    </p>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (selectedRecord) {
                            navigate(`/notifications/${selectedRecord.id}`);
                          } else {
                            navigate("/notifications");
                          }
                          setShowNotifications(false);
                        }}
                        className="p-3 hover:bg-(--main-color)/10 border-b border-(--main-color)/10 last:border-0 transition-colors cursor-pointer"
                      >
                        <p className="text-[#eee] text-xs leading-relaxed">
                          {n.text}
                        </p>
                        <p className="text-(--main-color) text-[10px] mt-1">
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

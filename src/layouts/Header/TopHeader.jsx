import { Bell, House, Settings, Share2, UserRoundCog } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useReport } from "../../context/ReportContext";

export default function TopHeader() {
  const { selectedRecord } = useReport();
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleBellClick = () => {
    if (selectedRecord) {
      navigate(`/notifications/${selectedRecord.id}`);
    } else {
      navigate("/notifications");
    }
  };

  const navItemClass = (isActive) =>
    `w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
      isActive
        ? "bg-(--main-color) border-(--main-color) shadow-[0_6px_18px_rgba(212,154,62,0.22)]"
        : "bg-transparent border-transparent hover:bg-white/5 hover:border-(--main-color)/20"
    }`;

  const iconClass = (isActive) =>
    `${isActive ? "text-black" : "text-(--main-color)"} w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] transition-colors duration-200`;

  const isHomeActive = isActiveRoute("/");
  const isSettingsActive = isActiveRoute("/settings");
  const isProfileActive = isActiveRoute("/profile");
  const isShareActive = isActiveRoute("/share");
  const isNotificationsActive =
    isActiveRoute("/notifications") ||
    location.pathname.startsWith("/notifications/");

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-60 bg-(--dark_gray-4) border-t-2 border-(--main-color)">
      <div className="w-full max-w-full sm:max-w-[640px] mx-auto">
        <div className="grid grid-cols-5 gap-2 items-center justify-center py-4 px-2 sm:px-6">
          <Link
            to="/"
            className="flex justify-center"
            aria-current={isHomeActive ? "page" : undefined}
          >
            <span className={navItemClass(isHomeActive)}>
              <House className={iconClass(isHomeActive)} />
            </span>
          </Link>

          <Link
            to="/settings"
            className="flex justify-center"
            aria-current={isSettingsActive ? "page" : undefined}
          >
            <span className={navItemClass(isSettingsActive)}>
              <Settings className={iconClass(isSettingsActive)} />
            </span>
          </Link>

          <Link
            to="/profile"
            className="flex justify-center"
            aria-current={isProfileActive ? "page" : undefined}
          >
            <span className={navItemClass(isProfileActive)}>
              <UserRoundCog className={iconClass(isProfileActive)} />
            </span>
          </Link>

          <Link
            to="/share"
            className="flex justify-center"
            aria-current={isShareActive ? "page" : undefined}
          >
            <span className={navItemClass(isShareActive)}>
              <Share2 className={iconClass(isShareActive)} />
            </span>
          </Link>

          <button
            type="button"
            onClick={handleBellClick}
            className="flex justify-center"
            aria-current={isNotificationsActive ? "page" : undefined}
          >
            <span className={navItemClass(isNotificationsActive)}>
              <Bell className={iconClass(isNotificationsActive)} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

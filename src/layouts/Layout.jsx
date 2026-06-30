import { Navigate, Outlet, useLocation } from "react-router";
import PageTransition from "../components/Common/PageTransition";
import { useUser } from "../context/UserContext";
import DesktopHeader from "./Header/DesktopHeader";
import TopHeader from "./Header/TopHeader";

const AUTH_PATHS = [
  "/login",
  "/register",
  "/change-password",
  "/reset-password",
];

export default function Layout() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useUser();

  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));
  const isFullWidthPage = pathname.startsWith("/report-shipping");

  if (!isLoggedIn && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className={`bg-(--dark_gray-4) ${
        isAuthPage ? "h-[100dvh] overflow-hidden" : "min-h-screen"
      }`}
    >
      {!isAuthPage && <DesktopHeader />}

      <div
        className={`w-full mx-auto relative ${
          isAuthPage
            ? "h-full max-w-full sm:max-w-[640px] lg:max-w-[460px]"
            : "min-h-screen max-w-full sm:max-w-[640px] lg:max-w-[1100px]"
        }`}
      >
        <main
          className={`${
            isAuthPage
              ? "h-full flex items-center justify-center px-4 sm:px-6 overflow-hidden"
              : `min-h-screen overflow-y-auto py-10 lg:py-8 ${
                  isFullWidthPage ? "px-0" : "px-4 sm:px-6 lg:px-8"
                }`
          }`}
        >
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        {!isAuthPage && <TopHeader />}
        <PageTransition />
      </div>
    </div>
  );
}

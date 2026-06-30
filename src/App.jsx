import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LanguageProvider } from "./context/LanguageContext";
import { ReportProvider } from "./context/ReportContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/routes";

const ANTD_THEME = {
  token: {
    colorPrimary: "#d49a3e",
    colorBgElevated: "#171717",
    colorText: "#fff",
    colorTextHeading: "#fff",
    colorBorder: "#d49a3e",
    borderRadius: 10,
    fontFamily: "inherit",
  },
  components: {
    Popconfirm: {
      colorBgElevated: "#171717",
    },
    Button: {
      colorBgContainer: "#232323",
    },
  },
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      window.dispatchEvent(new Event("pwa-installable"));
    };

    const handleAppInstalled = () => {
      window.deferredPrompt = null;
      window.dispatchEvent(new Event("pwa-installed"));
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[4000] flex flex-col items-center justify-center gap-6 px-6 bg-[#171717]">
        <img
          src="/logo3 (2).png"
          className="h-[380px] w-auto max-w-[620px] object-contain animate-pulse"
          alt="Fouady Logo"
        />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <ReportProvider>
        <UserProvider>
          <ConfigProvider
            theme={ANTD_THEME}
            direction={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#171717",
                  color: "#fff",
                  border: "1px solid #d49a3e",
                  fontSize: "13px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                },
                success: {
                  iconTheme: { primary: "#d49a3e", secondary: "#171717" },
                },
                error: {
                  iconTheme: { primary: "#ef4444", secondary: "#171717" },
                  style: { border: "1px solid #ef4444" },
                },
              }}
            />
            <AppRoutes />
          </ConfigProvider>
        </UserProvider>
      </ReportProvider>
    </LanguageProvider>
  );
}

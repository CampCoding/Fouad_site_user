import {
  Check,
  ChevronRight,
  Copy,
  Download,
  Info,
  Send,
  Share2,
  Smartphone,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";
import { useSearchParams } from "react-router";

const SHARE_METHODS = [
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    color: "text-[#25D366]",
  },
  {
    id: "telegram",
    icon: Send,
    color: "text-[#229ED9]",
  },
  {
    id: "copy",
    icon: Copy,
    color: "text-(--main-color)",
  },
];

export default function SharePage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [searchParams, setSearchParams] = useSearchParams();

  const view = searchParams.get("v") === "install" ? "install" : "share";

  const [hasPrompt, setHasPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [platform, setPlatform] = useState("desktop");
  const [copied, setCopied] = useState(false);

  const appLink = typeof window !== "undefined" ? window.location.origin : "";

  const inviteText = t("sharePage.inviteMessage", { link: appLink });

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) setPlatform("ios");
    else if (/android/.test(ua)) setPlatform("android");
    else setPlatform("desktop");

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsInstalled(standalone);

    if (window.deferredPrompt) {
      setHasPrompt(true);
    }

    const handleInstallable = () => {
      setHasPrompt(true);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setHasPrompt(false);
      setShowHelp(false);
    };

    window.addEventListener("pwa-installable", handleInstallable);
    window.addEventListener("pwa-installed", handleInstalled);

    return () => {
      window.removeEventListener("pwa-installable", handleInstallable);
      window.removeEventListener("pwa-installed", handleInstalled);
    };
  }, []);

  const methods = useMemo(() => {
    return SHARE_METHODS.map((item) => {
      if (item.id === "whatsapp") {
        return {
          ...item,
          title: t("sharePage.whatsappTitle"),
          text: t("sharePage.whatsappText"),
          btnText: t("sharePage.shareNow"),
        };
      }

      if (item.id === "telegram") {
        return {
          ...item,
          title: t("sharePage.telegramTitle"),
          text: t("sharePage.telegramText"),
          btnText: t("sharePage.shareNow"),
        };
      }

      return {
        ...item,
        title: t("sharePage.copyTitle"),
        text: t("sharePage.copyText"),
        btnText: copied ? t("sharePage.copied") : t("sharePage.copyLink"),
      };
    });
  }, [t, copied]);

  const openView = (nextView) => {
    if (nextView === "share") {
      setSearchParams({});
    } else {
      setSearchParams({ v: "install" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeInstallView = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMethodClick = async (id) => {
    if (!appLink) return;

    if (id === "whatsapp") {
      const url = `https://wa.me/?text=${encodeURIComponent(inviteText)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (id === "telegram") {
      const url = `https://t.me/share/url?url=${encodeURIComponent(
        appLink,
      )}&text=${encodeURIComponent(t("sharePage.telegramShareText"))}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (id === "copy") {
      try {
        await navigator.clipboard.writeText(appLink);
        setCopied(true);
        toast.success(t("sharePage.copySuccess"));
        setTimeout(() => setCopied(false), 1800);
      } catch {
        toast.error(t("sharePage.copyError"));
      }
    }
  };

  const handleInstall = async () => {
    if (isInstalled) return;

    const prompt = window.deferredPrompt;

    if (prompt) {
      try {
        prompt.prompt();
        const result = await prompt.userChoice;

        if (result.outcome === "accepted") {
          window.deferredPrompt = null;
          setHasPrompt(false);
        } else {
          setShowHelp(true);
        }
      } catch (error) {
        console.error("Install error:", error);
        setShowHelp(true);
      }

      return;
    }

    setShowHelp(true);
  };

  const renderHelpSteps = () => {
    if (platform === "ios") {
      return (
        <div className="space-y-2">
          <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
            {t("sharePage.iosHelpTitle")}
          </p>

          <div className="space-y-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-[12px] border border-(--main-color)/20 bg-black/20 p-3"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center text-(--main-color) text-[11px] font-bold">
                  {step}
                </div>
                <p className="text-white/80 text-[12px] sm:text-[13px] leading-6">
                  {t(`sharePage.iosStep${step}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (platform === "android") {
      return (
        <div className="space-y-2">
          <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
            {t("sharePage.androidHelpTitle")}
          </p>

          <div className="space-y-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-[12px] border border-(--main-color)/20 bg-black/20 p-3"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center text-(--main-color) text-[11px] font-bold">
                  {step}
                </div>
                <p className="text-white/80 text-[12px] sm:text-[13px] leading-6">
                  {t(`sharePage.androidStep${step}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
          {t("sharePage.desktopHelpTitle")}
        </p>

        <div className="space-y-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex items-start gap-3 rounded-[12px] border border-(--main-color)/20 bg-black/20 p-3"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center text-(--main-color) text-[11px] font-bold">
                {step}
              </div>
              <p className="text-white/80 text-[12px] sm:text-[13px] leading-6">
                {t(`sharePage.desktopStep${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const backIconClass = isEn ? "left-3" : "right-3";

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Old Page Title */}
      <div
        className="card mb-4 mt-10 cursor-pointer"
        onClick={closeInstallView}
      >
        <Share2 size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("sharePage.title")}
        </p>
      </div>

      {/* Old Header */}
      <div
        className={`border h-[38.4px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          view !== "share" ? "cursor-pointer" : ""
        }`}
        onClick={view !== "share" ? closeInstallView : undefined}
      >
        {view !== "share" && (
          <ChevronRight
            className={`absolute ${backIconClass} text-(--main-color) ${
              isEn ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}

        <p className="text-white text-center font-bold text-[14px] px-8 line-clamp-1">
          {view === "share"
            ? t("sharePage.shareHeader")
            : t("sharePage.installHeader")}
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={() => openView("share")}
          className={`min-h-[40px] rounded-[10px] border text-[13px] font-bold transition-all ${
            view === "share"
              ? "bg-(--main-color) text-black border-(--main-color)"
              : "bg-[#171717] text-white border-(--main-color)/30 hover:border-(--main-color)"
          }`}
        >
          {t("sharePage.shareTab")}
        </button>

        <button
          type="button"
          onClick={() => openView("install")}
          className={`min-h-[40px] rounded-[10px] border text-[13px] font-bold transition-all ${
            view === "install"
              ? "bg-(--main-color) text-black border-(--main-color)"
              : "bg-[#171717] text-white border-(--main-color)/30 hover:border-(--main-color)"
          }`}
        >
          {t("sharePage.installTab")}
        </button>
      </div>

      {view === "share" ? (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <Share2 size={17} className="text-(--main-color)" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("sharePage.browseHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("sharePage.browseHintText")}
              </p>
            </div>
          </div>

          {/* Invite Link Preview */}
          <div className="rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(145deg,#101010_0%,#1a1a1a_60%,#111111_100%)] p-4 sm:p-5">
            <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px] mb-2">
              {t("sharePage.linkLabel")}
            </p>
            <div className="rounded-[12px] border border-(--main-color)/20 bg-black/30 px-3 py-3">
              <p className="text-white/75 text-[12px] sm:text-[13px] break-all">
                {appLink}
              </p>
            </div>
          </div>

          {/* Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {methods.map((method) => {
              const Icon = method.icon;

              return (
                <div
                  key={method.id}
                  className="rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] p-4 sm:p-5 hover:border-(--main-color) transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-11 h-11 rounded-[14px] bg-white/[0.03] border border-(--main-color)/25 flex items-center justify-center">
                      <Icon size={20} className={method.color} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-white font-bold text-[14px] sm:text-[15px]">
                        {method.title}
                      </h2>
                      <p className="mt-2 text-white/60 text-[11.5px] sm:text-[12px] leading-relaxed">
                        {method.text}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleMethodClick(method.id)}
                    className="mt-4 auth_btn !w-full"
                  >
                    {method.btnText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Status */}
          <div className="rounded-[14px] border border-(--main-color)/25 bg-[#111111] p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/12 border border-(--main-color)/25 flex items-center justify-center">
                {isInstalled ? (
                  <Check size={18} className="text-(--green-color)" />
                ) : (
                  <Smartphone size={18} className="text-(--main-color)" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[13px] sm:text-[14px]">
                  {isInstalled
                    ? t("sharePage.alreadyInstalled")
                    : hasPrompt
                      ? t("sharePage.installAvailable")
                      : t("sharePage.installReady")}
                </p>

                <p className="mt-1 text-white/60 text-[11.5px] sm:text-[12px] leading-relaxed">
                  {t("sharePage.installHint")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleInstall}
              disabled={isInstalled}
              className={`mt-4 auth_btn !w-full sm:!w-[180px] !bg-(--main-color) !text-black !border-(--main-color) ${
                isInstalled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isInstalled
                ? t("sharePage.installedButton")
                : t("sharePage.installButton")}
            </button>
          </div>

          {/* Help */}
          {(showHelp || !hasPrompt || platform === "ios") && (
            <div className="rounded-[16px] border border-(--main-color)/30 bg-(--main-color)/5 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-(--main-color)" />
                <p className="text-white font-bold text-[13px] sm:text-[14px]">
                  {t("sharePage.installHelpTitle")}
                </p>
              </div>

              {renderHelpSteps()}
            </div>
          )}

          {/* Extra note */}
          <div className="border border-(--main-color)/30 bg-black/20 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-center">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center">
              <Download size={16} className="text-(--main-color)" />
            </div>

            <p className="text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed flex-1">
              {t("sharePage.installBottomNote")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

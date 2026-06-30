// src/pages/Profile/Profile.jsx
import {
  Building2,
  Calendar,
  CalendarCheck,
  ChevronRight,
  Eye,
  Mail,
  MessageCircleQuestion,
  Stethoscope,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { useUser } from "../../context/UserContext";

import AppointmentsView from "./components/AppointmentsView";
import BalanceView from "./components/BalanceView";
import ClinicsView from "./components/ClinicsView";
import ConsultationsView from "./components/ConsultationsView";
import FollowersView from "./components/FollowersView";
import HospitalsView from "./components/HospitalsView";
import MessagesView from "./components/MessagesView";
import MyDataView from "./components/MyDataView";
import OffersView from "./components/OffersView";
import PatientsView from "./components/PatientsView";
import ProfileMenu from "./components/ProfileMenu";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { isDoctor } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("v") || "menu";

  const patientMenuItems = [
    {
      id: 1,
      name: t("profile.menu.followers"),
      icon: CalendarCheck,
      view: "followers",
    },
    {
      id: 2,
      name: t("profile.menu.appointments"),
      icon: Calendar,
      view: "appointments",
    },
    {
      id: 3,
      name: isEn ? "Consultations" : "استشاراتي",
      icon: MessageCircleQuestion,
      view: "consultations",
    },
    { id: 4, name: t("profile.menu.offers"), icon: Eye, view: "offers" },
    { id: 5, name: t("profile.menu.balance"), icon: Wallet, view: "balance" },
    { id: 6, name: t("profile.menu.messages"), icon: Mail, view: "messages" },
    { id: 7, name: t("profile.menu.data"), icon: UserRound, view: "data" },
  ];

  const doctorMenuItems = [
    {
      id: 1,
      name: isEn ? "My Schedule" : "جدولي",
      icon: Calendar,
      view: "appointments",
    },
    {
      id: 2,
      name: isEn ? "My Patients" : "مرضاي",
      icon: Users,
      view: "patients",
    },
    {
      id: 3,
      name: isEn ? "Consultations" : "استشاراتي",
      icon: MessageCircleQuestion,
      view: "consultations",
    },
    {
      id: 4,
      name: isEn ? "My Clinics" : "عياداتي",
      icon: Stethoscope,
      view: "clinics",
    },
    {
      id: 5,
      name: isEn ? "My Hospitals" : "مستشفياتي",
      icon: Building2,
      view: "hospitals",
    },
    { id: 6, name: t("profile.menu.messages"), icon: Mail, view: "messages" },
    { id: 7, name: t("profile.menu.data"), icon: UserRound, view: "data" },
  ];

  const menuItems = isDoctor ? doctorMenuItems : patientMenuItems;

  const setViewParam = (newView) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("v", newView);
    setSearchParams(sp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (view !== "menu") {
      const sp = new URLSearchParams(searchParams);
      sp.delete("v");
      setSearchParams(sp);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoHome = () => {
    const sp = new URLSearchParams(searchParams);
    sp.delete("v");
    setSearchParams(sp);
  };

  const getViewTitle = () => {
    if (view === "menu") return t("profile.mainMenu");
    const item = menuItems.find((m) => m.view === view);
    if (item) return item.name;
    return t(`profile.menu.${view}`);
  };

  const renderView = () => {
    switch (view) {
      case "menu":
        return <ProfileMenu menuItems={menuItems} onSelect={setViewParam} />;
      case "patients":
        return isDoctor ? <PatientsView /> : null;
      case "clinics":
        return isDoctor ? <ClinicsView /> : null;
      case "hospitals":
        return isDoctor ? <HospitalsView /> : null;
      case "consultations":
        return <ConsultationsView />;
      case "data":
        return <MyDataView />;
      case "appointments":
        return <AppointmentsView />;
      case "followers":
        return !isDoctor ? <FollowersView /> : null;
      case "offers":
        return !isDoctor ? <OffersView /> : null;
      case "balance":
        return !isDoctor ? <BalanceView /> : null;
      case "messages":
        return <MessagesView />;
      default:
        return null;
    }
  };

  const backIconClass = isEn ? "left-3" : "right-3";

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      <div className="card mt-10 mb-4 cursor-pointer" onClick={handleGoHome}>
        <UserRound size={40} className="text-(--main-color)" />
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-bold text-[15px] text-[#eee]">
            {t("profile.title")}
          </p>
          {isDoctor && (
            <span className="flex items-center gap-1 bg-(--main-color)/15 border border-(--main-color)/30 rounded-full px-2 py-0.5 text-(--main-color) text-[10px] font-bold">
              <Stethoscope size={10} />
              {isEn ? "Doctor" : "طبيب"}
            </span>
          )}
        </div>
      </div>

      <div
        className={`border h-[38px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          view !== "menu" ? "cursor-pointer" : ""
        }`}
        onClick={view !== "menu" ? handleBack : undefined}
      >
        {view !== "menu" && (
          <ChevronRight
            className={`absolute ${backIconClass} text-(--main-color) ${
              isEn ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}
        <p className="text-white text-center font-bold text-[14px] px-8 line-clamp-1">
          {getViewTitle()}
        </p>
      </div>

      {renderView()}
    </div>
  );
}

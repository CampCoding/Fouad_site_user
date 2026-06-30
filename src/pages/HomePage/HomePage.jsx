import {
  HeartPulse,
  ListChecks,
  MessageCircleQuestion,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import HomeCard from "../../components/Common/HomeCard";
import MainLogo from "../../components/Common/MainLogo";

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  const data = [
    // First Row
    {
      id: 1,
      name: t("home.bookService"),
      desc: t("home.desc.bookService"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
      link: "/reservations",
    },
    {
      id: 2,
      name: t("home.medicalReports"),
      desc: t("home.desc.medicalReports"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
      link: "/reports",
    },
    {
      id: 3,
      name: t("home.onlineConsultations"),
      desc: t("home.desc.onlineConsultations"),
      icon: MessageCircleQuestion,
      link: "/consultations",
    },

    // Second Row
    {
      id: 4,
      name: t("home.beforeYourVisit"),
      desc: t("home.desc.beforeYourVisit"),
      icon: ListChecks,
      link: "/before-visit",
    },
    {
      id: 5,
      name: t("home.myChildJourney"),
      desc: t("home.desc.myChildJourney"),
      icon: HeartPulse,
      link: "/my-child-journey",
    },
    {
      id: 6,
      name: t("home.educationGuidance"),
      desc: t("home.desc.educationGuidance"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/19_f6mora.png",
      link: "/education",
    },

    // Third Row
    {
      id: 7,
      name: t("home.ourBranches"),
      desc: t("home.desc.ourBranches"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/15_q3boqp.png",
      link: "/branches",
    },
    {
      id: 8,
      name: t("home.ourServices"),
      desc: t("home.desc.ourServices"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/14_bl3hmg.png",
      link: "/services",
    },
    {
      id: 9,
      name: t("home.ourDoctorsTeam"),
      desc: t("home.desc.ourDoctorsTeam"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/13_qgvubp.png",
      link: "/team",
    },

    // Fourth Row
    {
      id: 10,
      name: t("home.whyFouady"),
      desc: t("home.desc.whyFouady"),
      icon: ShieldCheck,
      link: "/why-fouady",
    },
    {
      id: 11,
      name: t("home.contactUs"),
      desc: t("home.desc.contactUs"),
      img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/18_izofqx.png",
      link: "/contact-us",
    },
    {
      id: 12,
      name: t("home.shareYourFeedback"),
      desc: t("home.desc.shareYourFeedback"),
      icon: Star,
      link: "/rating",
    },
  ];

  return (
    <div className="w-full pb-24 lg:pb-0">
      <MainLogo />

      <div
        className="
          grid grid-cols-3 lg:grid-cols-3
          gap-[15px] sm:gap-[20px] lg:gap-[16px]
          w-full
          mx-auto mb-[40px] lg:mb-0
        "
      >
        {data.map((item) => (
          <HomeCard
            key={item.id}
            item={item}
            activeId={activeTab}
            onClick={() => {
              setActiveTab(item.id);
              navigate(item.link);
            }}
            textClass="text-[13px] sm:text-[14px]"
            imgClass="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
          />
        ))}
      </div>
    </div>
  );
}

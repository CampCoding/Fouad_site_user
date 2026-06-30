import {
  Award,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import FeatureCard from "./components/FeatureCard";
import IntroVideo from "./components/IntroVideo";
import ReportStepper from "./components/ReportStepper";
import ValueCard from "./components/ValueCard";

export default function WhyFouady() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const navigate = useNavigate();
  const BackArrow = isEn ? ChevronLeft : ChevronRight;

  // Values icons
  const valueIcons = [Award, FileCheck2, MessageCircle, HeartPulse];

  const values = t("whyFouady.values.items", { returnObjects: true });
  const valuesArray = Array.isArray(values) ? values : [];

  return (
    <div className="pb-20 lg:pb-10">
      {/* Header */}
      <div className="card mt-10 mb-6">
        <div className="w-10 h-10 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
          <HeartHandshake size={20} className="text-(--main-color)" />
        </div>
        <p className="font-bold text-[17px] text-[#eee]">
          {t("whyFouady.title")}
        </p>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="w-full mb-5 border h-[var(--main-height)] flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer hover:bg-(--main-color)/5 transition-colors"
      >
        <BackArrow className="absolute start-3 text-(--main-color)" size={20} />
        <p className="text-white text-center font-bold text-[13px] lg:text-[14px]">
          {t("whyFouady.back")}
        </p>
      </button>

      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 1. Hero */}
        <div className="bg-[#171717] border border-(--main-color)/40 rounded-xl p-5 lg:p-6 text-center relative overflow-hidden">
          <div className="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-(--main-color)/5 border border-(--main-color)/10" />
          <div className="absolute -bottom-8 -start-8 w-24 h-24 rounded-full bg-(--main-color)/5 border border-(--main-color)/10" />

          <div className="relative">
            <div className="w-16 h-16 mx-auto rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center mb-4">
              <HeartHandshake size={28} className="text-(--main-color)" />
            </div>
            <h1 className="text-white font-bold text-[20px] lg:text-[24px] mb-3">
              {t("whyFouady.hero.title")}
            </h1>
            <p className="text-white/80 text-[13px] lg:text-[14px] leading-relaxed max-w-[600px] mx-auto">
              {t("whyFouady.hero.message")}
            </p>
          </div>
        </div>

        {/* 2. Intro Video */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-(--main-color) font-bold text-[13px] lg:text-[14px]">
              {t("whyFouady.videoSection.title")}
            </h3>
          </div>
          <p className="text-white/60 text-[11px] lg:text-[12px] px-1 -mt-1">
            {t("whyFouady.videoSection.subtitle")}
          </p>
          <IntroVideo src="/videos/intro.mp4" />
        </div>

        {/* 3. Specialty */}
        <FeatureCard
          icon={Stethoscope}
          title={t("whyFouady.specialty.title")}
          desc={t("whyFouady.specialty.desc")}
          items={t("whyFouady.specialty.items", { returnObjects: true })}
        />

        {/* 4. Team */}
        <FeatureCard
          icon={Users}
          title={t("whyFouady.team.title")}
          desc={t("whyFouady.team.desc")}
          items={t("whyFouady.team.items", { returnObjects: true })}
          btnText={t("whyFouady.team.btn")}
          onBtnClick={() => navigate("/team")}
        />

        {/* 5. Reports stepper */}
        <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl overflow-hidden">
          <div className="p-4 lg:p-5 flex items-start gap-3 border-b border-(--main-color)/20 bg-(--main-color)/5">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck
                size={20}
                className="text-(--main-color) lg:w-6 lg:h-6"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-[14px] lg:text-[16px] mb-1">
                {t("whyFouady.reports.title")}
              </h3>
              <p className="text-white/70 text-[11.5px] lg:text-[12.5px] leading-relaxed">
                {t("whyFouady.reports.desc")}
              </p>
            </div>
          </div>
          <div className="p-4 lg:p-5">
            <ReportStepper />
          </div>
        </div>

        {/* 6. Branches */}
        <FeatureCard
          icon={MapPin}
          title={t("whyFouady.branches.title")}
          desc={t("whyFouady.branches.desc")}
          items={t("whyFouady.branches.items", { returnObjects: true })}
          btnText={t("whyFouady.branches.btn")}
          onBtnClick={() => navigate("/branches")}
        />

        {/* 7. Experience */}
        <FeatureCard
          icon={Smile}
          title={t("whyFouady.experience.title")}
          desc={t("whyFouady.experience.desc")}
          items={t("whyFouady.experience.items", { returnObjects: true })}
        />

        {/* 8. Education */}
        <FeatureCard
          icon={GraduationCap}
          title={t("whyFouady.education.title")}
          desc={t("whyFouady.education.desc")}
          items={t("whyFouady.education.items", { returnObjects: true })}
          btnText={t("whyFouady.education.btn")}
          onBtnClick={() => navigate("/education")}
        />

        {/* 9. Values */}
        <div className="flex flex-col gap-3">
          <div className="text-center mb-1">
            <h3 className="text-(--main-color) font-bold text-[14px] lg:text-[16px] mb-1">
              {t("whyFouady.values.title")}
            </h3>
            <p className="text-white/60 text-[11px] lg:text-[12px]">
              {t("whyFouady.values.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {valuesArray.map((value, idx) => (
              <ValueCard
                key={idx}
                title={value.title}
                desc={value.desc}
                icon={valueIcons[idx] || Sparkles}
              />
            ))}
          </div>
        </div>

        {/* 10. CTA Footer */}
        <div className="bg-[#171717] border border-(--main-color)/40 rounded-xl p-5 lg:p-6 text-center mt-2">
          <h3 className="text-white font-bold text-[16px] lg:text-[18px] mb-1">
            {t("whyFouady.cta.title")}
          </h3>
          <p className="text-white/60 text-[12px] lg:text-[13px] mb-4">
            {t("whyFouady.cta.subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => navigate("/reservations")}
              className="auth_btn w-full! !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-2 !py-2.5"
            >
              <Calendar size={14} />
              {t("whyFouady.cta.bookService")}
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-[#0d0d0d] border border-(--main-color)/40 hover:border-(--main-color) text-white rounded-md py-2.5 px-4 text-[13px] font-bold transition-all flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-(--main-color)" />
              {t("whyFouady.cta.contactUs")}
            </button>
            <button
              onClick={() => navigate("/branches")}
              className="bg-[#0d0d0d] border border-(--main-color)/40 hover:border-(--main-color) text-white rounded-md py-2.5 px-4 text-[13px] font-bold transition-all flex items-center justify-center gap-2"
            >
              <Building2 size={14} className="text-(--main-color)" />
              {t("whyFouady.cta.branches")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

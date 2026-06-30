import { ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import SectionCard from "./components/SectionCard";
import { SECTIONS, getSection } from "./data";
import BringView from "./views/BringView";
import ExamView from "./views/ExamView";
import ReachView from "./views/ReachView";

export default function BeforeVisit() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentId = searchParams.get("s");
  const currentSection = currentId ? getSection(currentId) : null;
  const BackArrow = isEn ? ChevronLeft : ChevronRight;

  const goToSection = (id) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("s", id);
    setSearchParams(sp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (currentId) {
      const sp = new URLSearchParams(searchParams);
      sp.delete("s");
      setSearchParams(sp);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const exams = SECTIONS.filter((s) => s.type === "exam");
  const extras = SECTIONS.filter((s) => s.type === "extra");

  const renderDetail = () => {
    if (!currentSection) return null;
    if (currentSection.type === "exam") {
      return <ExamView section={currentSection} />;
    }
    if (currentSection.id === "bring") return <BringView />;
    if (currentSection.id === "reach") return <ReachView />;
    return null;
  };

  return (
    <div className="pb-20 lg:pb-10">
      {/* Header */}
      <div className="card mt-10 mb-6">
        <div className="w-10 h-10 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
          <HeartPulse size={20} className="text-(--main-color)" />
        </div>
        <p
          className="font-bold text-[15px] cursor-pointer text-[#eee]"
          onClick={() => {
            const sp = new URLSearchParams(searchParams);
            sp.delete("s");
            setSearchParams(sp);
          }}
        >
          {t("beforeVisit.title")}
        </p>
      </div>

      {/* Back button */}
      <button
        onClick={goBack}
        className="w-full mb-4 border h-[var(--main-height)] flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer hover:bg-(--main-color)/5 transition-colors"
      >
        <BackArrow className="absolute start-3 text-(--main-color)" size={20} />
        <p className="text-white text-center font-bold text-[13px] lg:text-[14px]">
          {currentSection ? t("beforeVisit.backToList") : t("beforeVisit.back")}
        </p>
      </button>

      {/* CONTENT */}
      {!currentSection ? (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Welcome */}
          <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5 text-center">
            <h2 className="text-white font-bold text-[16px] lg:text-[18px] mb-2">
              {t("beforeVisit.subtitle")}
            </h2>
            <p className="text-white/70 text-[12px] lg:text-[13px] leading-relaxed">
              {t("beforeVisit.intro")}
            </p>
          </div>

          {/* Exams */}
          <div className="flex flex-col gap-3">
            <h3 className="text-(--main-color) font-bold text-[13px] lg:text-[14px] px-1">
              {t("beforeVisit.examsTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {exams.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onClick={() => goToSection(section.id)}
                />
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="flex flex-col gap-3">
            <h3 className="text-(--main-color) font-bold text-[13px] lg:text-[14px] px-1">
              {t("beforeVisit.extraTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {extras.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onClick={() => goToSection(section.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderDetail()}
        </div>
      )}
    </div>
  );
}

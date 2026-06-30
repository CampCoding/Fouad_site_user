import {
  Activity,
  Baby,
  ChevronRight,
  FileText,
  HeartPulse,
  ListChecks,
  MoveHorizontal,
  Stethoscope,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

const INSTRUCTIONS_DATA = [
  {
    id: 1,
    slug: "children-patients",
    titleAr: "تعليمات مرضى الأطفال",
    titleEn: "Instructions for Pediatric Patients",
    subtitleAr: "إرشادات مهمة قبل حضور الطفل للكشف أو الفحص",
    subtitleEn: "Important guidance before your child’s visit or examination",
    icon: Baby,
    itemsAr: [
      "يجب إحضار شهادة الميلاد أو إثبات هوية الطفل",
      "الحضور قبل الميعاد بـ 15 دقيقة على الأقل",
      "يفضل عدم تناول الطعام قبل بعض الفحوصات بـ 4 ساعات",
      "إحضار التقارير الطبية السابقة إن وجدت",
      "حضور أحد الوالدين مع الطفل أثناء الكشف",
    ],
    itemsEn: [
      "Bring the child’s birth certificate or any valid ID",
      "Arrive at least 15 minutes before the appointment",
      "Avoid food for 4 hours before some examinations when required",
      "Bring previous medical reports if available",
      "One parent should accompany the child during the visit",
    ],
  },
  {
    id: 2,
    slug: "heart-patients",
    titleAr: "تعليمات مرضى القلب",
    titleEn: "Instructions for Cardiac Patients",
    subtitleAr: "تعليمات تساعد على دقة الفحص ومتابعة الحالة",
    subtitleEn: "Guidelines to support accurate evaluation and follow-up",
    icon: HeartPulse,
    itemsAr: [
      "الامتناع عن الكافيين قبل الفحص بـ 12 ساعة",
      "إحضار قائمة بالأدوية الحالية",
      "ارتداء ملابس فضفاضة ومريحة",
      "إحضار آخر تقارير القلب والأشعة",
      "إبلاغ الطبيب بأي أعراض حدثت مؤخرًا",
    ],
    itemsEn: [
      "Avoid caffeine for 12 hours before the examination",
      "Bring a list of current medications",
      "Wear loose and comfortable clothing",
      "Bring the latest heart reports and imaging results",
      "Inform the doctor about any recent symptoms",
    ],
  },
  {
    id: 3,
    slug: "lab-tests",
    titleAr: "تعليمات الفحوصات المخبرية",
    titleEn: "Laboratory Test Instructions",
    subtitleAr: "تعليمات التحاليل لضمان أفضل النتائج الممكنة",
    subtitleEn: "Lab preparation steps to help ensure reliable results",
    icon: Activity,
    itemsAr: [
      "الصيام من 8 إلى 12 ساعة لبعض التحاليل",
      "شرب الماء مسموح أثناء الصيام",
      "تجنب الرياضة الشاقة قبل التحليل بيوم",
      "إبلاغ المختبر بأي أدوية يتم تناولها",
      "الحضور في الصباح الباكر للحصول على نتائج أدق",
    ],
    itemsEn: [
      "Fast for 8 to 12 hours for some tests",
      "Drinking water is allowed during fasting",
      "Avoid intense exercise the day before the test",
      "Inform the lab about any medications being taken",
      "Arrive early in the morning for more accurate results",
    ],
  },
  {
    id: 4,
    slug: "radiology",
    titleAr: "تعليمات الأشعة",
    titleEn: "Radiology Instructions",
    subtitleAr: "إرشادات مهمة قبل الفحوصات والأشعة المختلفة",
    subtitleEn: "Important instructions before imaging and radiology exams",
    icon: FileText,
    itemsAr: [
      "إزالة أي مجوهرات أو معادن قبل الفحص",
      "إبلاغ الطبيب بحالات الحمل قبل أي أشعة",
      "الصيام مطلوب لبعض أنواع الأشعة",
      "ارتداء الملابس المخصصة التي يوفرها المركز",
      "إحضار الأشعات السابقة للمقارنة",
    ],
    itemsEn: [
      "Remove any jewelry or metal items before the exam",
      "Inform the doctor about pregnancy before any imaging",
      "Fasting may be required for some imaging studies",
      "Wear the special clothing provided by the center when needed",
      "Bring previous imaging results for comparison",
    ],
  },
  {
    id: 5,
    slug: "general-before-visit",
    titleAr: "تعليمات عامة قبل الكشف",
    titleEn: "General Instructions Before the Visit",
    subtitleAr: "نقاط أساسية لتسهيل إجراءات الزيارة داخل المركز",
    subtitleEn: "Basic steps to make your visit smoother at the center",
    icon: Stethoscope,
    itemsAr: [
      "إحضار البطاقة الشخصية أو إثبات هوية",
      "الحضور في الميعاد المحدد لتجنب التأخير",
      "إحضار جميع التقارير والأشعة السابقة",
      "ارتداء كمامة طبية داخل المركز",
      "الالتزام بتعليمات استقبال المرضى",
    ],
    itemsEn: [
      "Bring your national ID or any valid identification",
      "Arrive on time to avoid delays",
      "Bring all previous reports and imaging results",
      "Wear a medical mask inside the center",
      "Follow the patient reception instructions",
    ],
  },
];

export default function Instructions() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSlug = searchParams.get("section");

  const sections = useMemo(() => {
    return INSTRUCTIONS_DATA.map((section) => ({
      ...section,
      title: isEn ? section.titleEn : section.titleAr,
      subtitle: isEn ? section.subtitleEn : section.subtitleAr,
      items: isEn ? section.itemsEn : section.itemsAr,
    }));
  }, [isEn]);

  const selectedSection =
    sections.find((section) => section.slug === selectedSlug) || null;

  const openSection = (slug) => {
    setSearchParams({ section: slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeSection = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backIconClass = isEn ? "left-3" : "right-3";

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Old Page Title */}
      <div className="card mt-10 mb-4 cursor-pointer" onClick={closeSection}>
        <ListChecks size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("instructionsPage.title")}
        </p>
      </div>

      {/* Old Header Bar */}
      <div
        className={`border h-[38.4px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          selectedSection ? "cursor-pointer" : ""
        }`}
        onClick={selectedSection ? closeSection : undefined}
      >
        {selectedSection && (
          <ChevronRight
            className={`absolute ${backIconClass} text-(--main-color) ${
              isEn ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}

        <p className="text-white text-center font-bold text-[14px] px-8 line-clamp-1">
          {selectedSection
            ? selectedSection.title
            : t("instructionsPage.chooseType")}
        </p>
      </div>

      {!selectedSection ? (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <MoveHorizontal size={17} className="text-(--main-color)" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("instructionsPage.browseHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("instructionsPage.browseHintText")}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="overflow-x-auto lg:overflow-visible pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 w-max min-w-full lg:w-full">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => openSection(section.slug)}
                    className="group flex-shrink-0 lg:w-auto w-[280px] sm:w-[300px] rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-[14px] bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center">
                          <Icon size={22} className="text-(--main-color)" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="text-white font-bold text-[14px] sm:text-[15px] leading-snug">
                            {section.title}
                          </h2>

                          <p className="mt-2 text-white/60 text-[11.5px] sm:text-[12px] leading-relaxed line-clamp-3 min-h-[56px]">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-bold">
                          {t("instructionsPage.instructionsCount", {
                            count: section.items.length,
                          })}
                        </span>

                        <span className="text-(--main-color) text-[11px] font-bold">
                          {t("instructionsPage.viewInstructions")}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Section Intro */}
          <div className="rounded-[18px] border border-(--main-color)/30 bg-[linear-gradient(145deg,#101010_0%,#1a1a1a_60%,#111111_100%)] p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="absolute -top-8 -end-8 w-24 h-24 rounded-full bg-(--main-color)/8 blur-2xl" />

            <div className="relative">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-[16px] bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center">
                  <selectedSection.icon
                    size={24}
                    className="text-(--main-color)"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-2.5 py-0.5 text-(--main-color) text-[10px] sm:text-[11px] font-bold mb-2">
                    {t("instructionsPage.instructionsLabel")}
                  </span>

                  <h2 className="text-white font-bold text-[17px] sm:text-[19px] lg:text-[23px] leading-snug">
                    {selectedSection.title}
                  </h2>

                  <p className="mt-2 text-white/70 text-[12px] sm:text-[13px] leading-relaxed max-w-[720px]">
                    {selectedSection.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center rounded-full border border-(--main-color)/35 bg-black/30 px-3 py-1 text-white/75 text-[11px] sm:text-[12px]">
                {t("instructionsPage.instructionsCount", {
                  count: selectedSection.items.length,
                })}
              </div>
            </div>
          </div>

          {/* Instruction Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {selectedSection.items.map((item, index) => (
              <div
                key={index}
                className="rounded-[14px] border border-(--main-color)/20 bg-[#111111] p-3.5 sm:p-4 flex gap-3 items-start hover:border-(--main-color)/35 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center text-(--main-color) font-bold text-[12px]">
                  {index + 1}
                </div>

                <p className="text-white/85 text-[13px] sm:text-[14px] leading-7 flex-1">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="border border-(--main-color)/30 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4">
            <p className="text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
              {t("instructionsPage.bottomNote")}
            </p>
          </div>

          {/* Back Button */}
          <button
            type="button"
            onClick={closeSection}
            className="auth_btn !w-full sm:!w-[210px]"
          >
            {t("instructionsPage.backToInstructions")}
          </button>
        </div>
      )}
    </div>
  );
}

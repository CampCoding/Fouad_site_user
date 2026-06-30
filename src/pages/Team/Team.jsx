// src/pages/Team/Team.jsx
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Users2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const DEFAULT_DOCTOR_IMAGE =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=faces&q=80";

const data = [
  {
    id: 1,
    nameAr: "المؤسسون",
    nameEn: "Founders",
    members: [
      {
        id: 101,
        nameAr: "أ.د. أحمد حمدي أحمد شبانة",
        nameEn: "Prof. Dr. Ahmed Hamdy Shabana",
        titleAr: "المدير التنفيذي",
        titleEn: "Executive Director",
        bioAr: "أستاذ مساعد طب الأطفال، كلية الطب، جامعة طنطا",
        bioEn:
          "Associate Professor of Pediatrics, Faculty of Medicine, Tanta University",
      },
      {
        id: 102,
        nameAr: "أ.د. محمد الشيمي",
        nameEn: "Prof. Dr. Mohamed El-Shimy",
        titleAr: "المؤسس الشريك",
        titleEn: "Co-Founder",
        bioAr: "أستاذ طب الأطفال والقلب، جامعة عين شمس",
        bioEn: "Professor of Pediatrics and Cardiology, Ain Shams University",
      },
    ],
  },
  {
    id: 2,
    nameAr: "القطاع الطبي",
    nameEn: "Medical Sector",
    members: [
      {
        id: 201,
        nameAr: "د. محمد أبو العزم",
        nameEn: "Dr. Mohamed Abou El-Azm",
        titleAr: "طبيب مقيم قلب الأطفال",
        titleEn: "Pediatric Cardiology Resident",
        bioAr: "طبيب مقيم قلب الأطفال، جامعة طنطا",
        bioEn: "Pediatric Cardiology Resident, Tanta University",
      },
    ],
  },
  {
    id: 3,
    nameAr: "القطاع الإداري",
    nameEn: "Administrative Sector",
    members: [
      {
        id: 301,
        nameAr: "الأستاذ/ هاني الشناوي",
        nameEn: "Mr. Hany El-Shennawy",
        titleAr: "المدير الإداري",
        titleEn: "Administrative Director",
        bioAr: "مدير الشئون الإدارية بمراكز فؤادي لقلب الأطفال",
        bioEn:
          "Administrative Affairs Manager at Fouady Pediatric Cardiology Centers",
      },
    ],
  },
  {
    id: 4,
    nameAr: "القطاع العلمي",
    nameEn: "Scientific Sector",
    members: [
      {
        id: 401,
        nameAr: "د. شيماء النجار",
        nameEn: "Dr. Shaimaa El-Naggar",
        titleAr: "مسئول البحث العلمي",
        titleEn: "Scientific Research Officer",
        bioAr: "مدرس مساعد طب الأطفال، كلية الطب، جامعة طنطا",
        bioEn:
          "Assistant Lecturer of Pediatrics, Faculty of Medicine, Tanta University",
      },
    ],
  },
];

export default function Team() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = useMemo(() => {
    return data.map((cat) => ({
      ...cat,
      name: isEn ? cat.nameEn : cat.nameAr,
      members: cat.members.map((m) => ({
        ...m,
        name: isEn ? m.nameEn : m.nameAr,
        title: isEn ? m.titleEn : m.titleAr,
        bio: isEn ? m.bioEn : m.bioAr,
        image: DEFAULT_DOCTOR_IMAGE,
      })),
    }));
  }, [isEn]);

  const handleTitleClick = () => {
    setView("categories");
    setSelectedCategory(null);
    setCurrentIndex(0);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setView("team-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (view === "team-detail") {
      setView("categories");
      setSelectedCategory(null);
      setCurrentIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    if (!selectedCategory?.members?.length) return;
    setCurrentIndex((p) => (p + 1) % selectedCategory.members.length);
  };

  const prevSlide = () => {
    if (!selectedCategory?.members?.length) return;
    setCurrentIndex(
      (p) =>
        (p - 1 + selectedCategory.members.length) %
        selectedCategory.members.length,
    );
  };

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Page Title */}
      <div
        className="card mt-10 mb-4 cursor-pointer"
        onClick={handleTitleClick}
      >
        <Users2 size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("teamPage.title")}
        </p>
      </div>

      {/* Header Bar */}
      <div
        className={`border h-[38px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          view !== "categories" ? "cursor-pointer" : ""
        }`}
        onClick={view !== "categories" ? handleBack : undefined}
      >
        {view !== "categories" && (
          <ChevronRight
            className={`absolute ${isEn ? "left-3 rotate-180" : "right-3"} text-(--main-color)`}
            size={20}
          />
        )}
        <p className="text-white text-center font-bold text-[15px] px-8 line-clamp-1">
          {view === "categories"
            ? t("teamPage.chooseSection")
            : selectedCategory?.name}
        </p>
      </div>

      {/* ============== CATEGORIES ============== */}
      {view === "categories" && (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <MoveHorizontal size={17} className="text-(--main-color)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("teamPage.browseHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("teamPage.browseHintText")}
              </p>
            </div>
          </div>

          {/* Section Cards - scroll mobile, grid desktop */}
          <div className="overflow-x-auto lg:overflow-visible pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex lg:grid lg:grid-cols-2 gap-3 lg:gap-4 w-max min-w-full lg:w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="group flex-shrink-0 lg:w-auto w-[260px] sm:w-[290px] rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-white font-bold text-[14px] sm:text-[15px] leading-snug">
                          {cat.name}
                        </h2>
                        <p className="mt-2 text-white/55 text-[11.5px] sm:text-[12px]">
                          {t("teamPage.membersCount", {
                            count: cat.members.length,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-bold">
                        {t("teamPage.viewMembers")}
                      </span>
                      <div className="text-(--main-color)">
                        {isEn ? (
                          <ChevronRight size={16} />
                        ) : (
                          <ChevronLeft size={16} />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============== TEAM DETAIL (Swiper) ============== */}
      {view === "team-detail" && selectedCategory && (
        <div className="space-y-4">
          {/* Member Card */}
          <div className="relative rounded-[18px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#101010_0%,#161616_55%,#0b0b0b_100%)] overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-12 -end-12 w-40 h-40 rounded-full bg-(--main-color)/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 start-0 w-40 h-40 rounded-full bg-(--main-color)/5 blur-3xl pointer-events-none" />

            <div className="relative p-5 sm:p-6 lg:p-8 lg:grid lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-8 lg:items-center">
              {/* Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-(--main-color)/20 blur-xl pointer-events-none" />
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-[270px] lg:h-[270px] rounded-full overflow-hidden border-2 border-(--main-color)/40 shadow-[0_8px_30px_rgba(212,154,62,0.18)]">
                    <img
                      src={selectedCategory.members[currentIndex].image}
                      alt={selectedCategory.members[currentIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = DEFAULT_DOCTOR_IMAGE;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-5 lg:mt-0 min-w-0 text-center lg:text-start">
                <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] sm:text-[12px] font-bold">
                  {selectedCategory.members[currentIndex].title}
                </span>

                <h2 className="mt-3 text-white font-bold text-[18px] sm:text-[20px] lg:text-[26px] leading-snug">
                  {selectedCategory.members[currentIndex].name}
                </h2>

                <div className="mt-4 rounded-[14px] border border-(--main-color)/20 bg-white/[0.02] p-3.5 sm:p-4">
                  <p className="text-white/80 text-[12.5px] sm:text-[13.5px] lg:text-[14.5px] leading-7">
                    {selectedCategory.members[currentIndex].bio}
                  </p>
                </div>

                {/* Desktop arrows */}
                {selectedCategory.members.length > 1 && (
                  <div className="mt-5 hidden lg:flex items-center justify-between">
                    <span className="text-white/40 text-[12px]">
                      {currentIndex + 1} / {selectedCategory.members.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full bg-black/55 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center hover:bg-(--main-color)/10 transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full bg-black/55 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center hover:bg-(--main-color)/10 transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile arrows */}
            {selectedCategory.members.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="lg:hidden absolute left-2 top-[120px] sm:top-[140px] -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center active:bg-(--main-color)/10 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="lg:hidden absolute right-2 top-[120px] sm:top-[140px] -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center active:bg-(--main-color)/10 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Dots + Counter (mobile) */}
          {selectedCategory.members.length > 1 && (
            <div className="flex items-center justify-between lg:hidden">
              <span className="text-white/40 text-[12px]">
                {currentIndex + 1} / {selectedCategory.members.length}
              </span>
              <div className="flex items-center gap-1.5">
                {selectedCategory.members.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? "w-6 bg-(--main-color)"
                        : "w-2.5 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick name list */}
          {selectedCategory.members.length > 1 && (
            <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 w-max min-w-full">
                {selectedCategory.members.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-shrink-0 rounded-[12px] border px-3 py-2 text-[11.5px] sm:text-[12px] transition-all ${
                      currentIndex === i
                        ? "bg-(--main-color)/15 border-(--main-color) text-(--main-color) font-bold"
                        : "bg-[#111] border-(--main-color)/25 text-white/70 hover:border-(--main-color)/45"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <button
            type="button"
            onClick={handleBack}
            className="auth_btn !w-full sm:!w-[210px]"
          >
            {t("teamPage.backToSections")}
          </button>
        </div>
      )}
    </div>
  );
}

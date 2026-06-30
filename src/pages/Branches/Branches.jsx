import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Image as ImageIcon,
  Map,
  MapPinned,
  MoveHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 1,
    nameAr: "الفروع الداخلية",
    nameEn: "Internal Branches",
    branches: [
      {
        id: 1,
        nameAr: "طنطا",
        nameEn: "Tanta",
        images: ["/images/22.png", "/images/23.png"],
        addressAr: "شارع البحر - طنطا",
        addressEn: "El Bahr Street - Tanta",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.!2d30.99!3d30.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQ3JzE2LjgiTiAzMMKwNTknMjQuMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.788,30.99",
      },
      {
        id: 2,
        nameAr: "بنها",
        nameEn: "Banha",
        images: ["/images/22.png"],
        addressAr: "شارع كلية التجارة - بنها",
        addressEn: "Faculty of Commerce Street - Banha",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.!2d31.18!3d30.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI3JzM2LjAiTiAzMcKwMTAnNDguMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.46,31.18",
      },
      {
        id: 3,
        nameAr: "المحلة",
        nameEn: "El Mahalla",
        images: ["/images/22.png"],
        addressAr: "شارع الجلاء - المحلة",
        addressEn: "El Galaa Street - El Mahalla",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.!2d31.16!3d30.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU4JzEyLjAiTiAzMcKwMDknMzYuMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.97,31.16",
      },
      {
        id: 4,
        nameAr: "شبين الكوم",
        nameEn: "Shebin El Kom",
        images: ["/images/22.png"],
        addressAr: "شارع جمال عبد الناصر - أمام نادي الجمهورية - برج الجمهورية",
        addressEn: "Gamal Abdel Nasser Street - In front of El Gomhoureya Club",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.!2d31.01!3d30.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMzJzAwLjAiTiAzMcKwMDAnMzYuMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.55,31.01",
      },
      {
        id: 5,
        nameAr: "كفر الشيخ",
        nameEn: "Kafr El Sheikh",
        images: ["/images/22.png"],
        addressAr: "شارع الخليفة المأمون - كفر الشيخ",
        addressEn: "El Khalifa El Maamoun Street - Kafr El Sheikh",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.!2d30.94!3d31.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzM2LjAiTiAzMMKwNTYnMjQuMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=31.11,30.94",
      },
      {
        id: 6,
        nameAr: "ايتاي",
        nameEn: "Itay El Baroud",
        images: ["/images/22.png"],
        addressAr: "ايتاي البارود - البحيرة",
        addressEn: "Itay El Baroud - Beheira",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.!2d30.69!3d30.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDUxJzM2LjAiTiAzMMKwNDEnMjQuMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.86,30.69",
      },
      {
        id: 7,
        nameAr: "القاهرة",
        nameEn: "Cairo",
        images: ["/images/22.png"],
        addressAr: "القاهرة",
        addressEn: "Cairo",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.!2d31.23!3d30.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzI0LjAiTiAzMcKwMTMnNDguMCJF!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=30.04,31.23",
      },
    ],
  },
  {
    id: 2,
    nameAr: "الوحدات الخارجية",
    nameEn: "External Units",
    branches: [
      {
        id: 11,
        nameAr: "محافظة الغربية",
        nameEn: "Gharbia Governorate",
        images: ["/images/22.png"],
        addressAr: "الغربية",
        addressEn: "Gharbia",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.0!3d30.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR2hhcmJpYQ!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gharbia+Egypt",
      },
      {
        id: 12,
        nameAr: "محافظة البحيرة",
        nameEn: "Beheira Governorate",
        images: ["/images/22.png"],
        addressAr: "البحيرة",
        addressEn: "Beheira",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d30.5!3d31.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQmVoZWlyYQ!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Beheira+Egypt",
      },
      {
        id: 13,
        nameAr: "محافظة المنوفية",
        nameEn: "Monufia Governorate",
        images: ["/images/22.png"],
        addressAr: "المنوفية",
        addressEn: "Monufia",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.0!3d30.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTW9udWZpYQ!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Monufia+Egypt",
      },
      {
        id: 14,
        nameAr: "محافظة القليوبية",
        nameEn: "Qalyubia Governorate",
        images: ["/images/22.png"],
        addressAr: "القليوبية",
        addressEn: "Qalyubia",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.2!3d30.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUWFseXViaWE!5e0!3m2!1sar!2seg!4v1",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Qalyubia+Egypt",
      },
      {
        id: 15,
        nameAr: "محافظة الدقهلية",
        nameEn: "Dakahlia Governorate",
        images: ["/images/22.png"],
        addressAr: "الدقهلية",
        addressEn: "Dakahlia",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.4!3d31.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRGFrYWhsaWE!5e0!3m2!1sar!2seg!4v1",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Dakahlia+Egypt",
      },
      {
        id: 16,
        nameAr: "محافظة الشرقية",
        nameEn: "Sharqia Governorate",
        images: ["/images/22.png"],
        addressAr: "الشرقية",
        addressEn: "Sharqia",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.5!3d30.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zU2hhcnFpYQ!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Sharqia+Egypt",
      },
      {
        id: 17,
        nameAr: "محافظة كفر الشيخ",
        nameEn: "Kafr El Sheikh Governorate",
        images: ["/images/22.png"],
        addressAr: "كفر الشيخ",
        addressEn: "Kafr El Sheikh",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d30.9!3d31.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2Fmcg!5e0!3m2!1sar!2seg!4v1",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Kafr+El+Sheikh+Egypt",
      },
      {
        id: 18,
        nameAr: "محافظة القاهرة",
        nameEn: "Cairo Governorate",
        images: ["/images/22.png"],
        addressAr: "القاهرة",
        addressEn: "Cairo",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ2Fpcm8!5e0!3m2!1sar!2seg!4v1",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Cairo+Egypt",
      },
      {
        id: 19,
        nameAr: "محافظة الأسكندرية",
        nameEn: "Alexandria Governorate",
        images: ["/images/22.png"],
        addressAr: "الأسكندرية",
        addressEn: "Alexandria",
        embedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000.!2d29.9!3d31.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWxleA!5e0!3m2!1sar!2seg!4v1",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Alexandria+Egypt",
      },
    ],
  },
];

export default function Branches() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [view, setView] = useState("categories");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const localizedData = useMemo(() => {
    return data.map((section) => ({
      ...section,
      name: isEn ? section.nameEn : section.nameAr,
      branches: section.branches.map((branch) => ({
        ...branch,
        name: isEn ? branch.nameEn : branch.nameAr,
        address: isEn ? branch.addressEn : branch.addressAr,
        sectionName: isEn ? section.nameEn : section.nameAr,
      })),
    }));
  }, [isEn]);

  const handleTitleClick = () => {
    setView("categories");
    setSelectedBranch(null);
    setCurrentIndex(0);
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setCurrentIndex(0);
    setView("branch-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReachClick = () => {
    setView("how-to-reach");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (view === "how-to-reach") {
      setView("branch-detail");
    } else if (view === "branch-detail") {
      setView("categories");
      setSelectedBranch(null);
      setCurrentIndex(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextSlide = () => {
    if (!selectedBranch?.images?.length) return;
    setCurrentIndex((prev) => (prev + 1) % selectedBranch.images.length);
  };

  const prevSlide = () => {
    if (!selectedBranch?.images?.length) return;
    setCurrentIndex(
      (prev) =>
        (prev - 1 + selectedBranch.images.length) %
        selectedBranch.images.length,
    );
  };

  const openInGoogleMaps = () => {
    if (selectedBranch?.mapUrl) {
      window.open(selectedBranch.mapUrl, "_blank");
    }
  };

  const backIconClass = isEn ? "left-3" : "right-3";

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Page Title */}
      <div
        className="card mt-10 mb-4 cursor-pointer"
        onClick={handleTitleClick}
      >
        <MapPinned size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("branchesPage.title")}
        </p>
      </div>

      {/* Header Bar */}
      <div
        className={`border h-[38.4px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          view !== "categories" ? "cursor-pointer" : ""
        }`}
        onClick={view !== "categories" ? handleBack : undefined}
      >
        {view !== "categories" && (
          <ChevronRight
            className={`absolute ${backIconClass} text-(--main-color) ${
              isEn ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}

        <p className="text-white text-center font-bold text-[14px] px-8 line-clamp-1">
          {view === "categories"
            ? t("branchesPage.categoriesTitle")
            : view === "branch-detail"
              ? selectedBranch?.name
              : t("branchesPage.howToReachBranch", {
                  name: selectedBranch?.name || "",
                })}
        </p>
      </div>

      {/* ========================== CATEGORIES ========================== */}
      {view === "categories" && (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <MoveHorizontal size={17} className="text-(--main-color)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("branchesPage.swipeHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("branchesPage.swipeHintText")}
              </p>
            </div>
          </div>

          {/* Sections */}
          {localizedData.map((section) => (
            <section
              key={section.id}
              className="rounded-[16px] border border-(--main-color)/35 bg-[#171717] p-3 sm:p-4 lg:p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-[14px] sm:text-[15px] lg:text-[18px] leading-snug">
                    {section.name}
                  </h2>
                  <p className="mt-1 text-white/50 text-[11px] sm:text-[12px]">
                    {t("branchesPage.locationsCount", {
                      count: section.branches.length,
                    })}
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center whitespace-nowrap rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-medium">
                  {t("branchesPage.horizontalHint")}
                </span>
              </div>

              {/* Horizontal Scroll */}
              <div className="overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-3 lg:gap-4 w-max min-w-full">
                  {section.branches.map((branch) => (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => handleBranchClick(branch)}
                      className="group flex-shrink-0 snap-start w-[250px] sm:w-[280px] lg:w-[320px] rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10">
                        <img
                          src={branch.images[0]}
                          alt={branch.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <span className="absolute top-3 end-3 rounded-full border border-(--main-color)/40 bg-black/60 px-2.5 py-1 text-(--main-color) text-[10px] font-bold">
                          {section.name}
                        </span>
                      </div>

                      <div className="p-3.5 sm:p-4">
                        <h3 className="text-white font-bold text-[14px] sm:text-[15px] leading-snug line-clamp-1">
                          {branch.name}
                        </h3>
                        <p className="mt-2 text-white/65 text-[11.5px] sm:text-[12px] leading-relaxed line-clamp-2 min-h-[38px]">
                          {branch.address}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-bold">
                            {t("branchesPage.viewBranch")}
                          </span>
                          <div className="text-(--main-color)">
                            {isEn ? (
                              <ChevronRight size={18} />
                            ) : (
                              <ChevronLeft size={18} />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ======================== BRANCH DETAIL ======================== */}
      {view === "branch-detail" && selectedBranch && (
        <div className="flex flex-col gap-4">
          <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-[16px] p-3 sm:p-4 lg:p-5 lg:grid lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-6">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-[14px] overflow-hidden border border-white/10 bg-black">
                <img
                  src={selectedBranch.images[currentIndex]}
                  alt={selectedBranch.name}
                  className="w-full h-full object-cover"
                />

                {selectedBranch.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={isEn ? prevSlide : nextSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center hover:bg-black/75 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={isEn ? nextSlide : prevSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 border border-(--main-color)/35 text-(--main-color) flex items-center justify-center hover:bg-black/75 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}
              {selectedBranch.images.length > 1 && (
                <>
                  <div className="flex items-center justify-center gap-1.5">
                    {selectedBranch.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          currentIndex === index
                            ? "w-6 bg-(--main-color)"
                            : "w-2.5 bg-white/25"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Thumbnails */}
                  <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex gap-2 w-max min-w-full">
                      {selectedBranch.images.map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className={`w-[88px] h-[68px] rounded-[10px] overflow-hidden border transition-all ${
                            currentIndex === index
                              ? "border-(--main-color)"
                              : "border-white/10"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${selectedBranch.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="mt-4 lg:mt-0 min-w-0">
              <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] sm:text-[12px] font-bold">
                {selectedBranch.sectionName}
              </span>

              <h2 className="mt-3 text-white font-bold text-[18px] sm:text-[20px] lg:text-[26px] leading-snug">
                {selectedBranch.name}
              </h2>

              <div className="mt-4 rounded-[14px] border border-(--main-color)/25 bg-white/[0.02] p-3.5 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Map size={16} className="text-(--main-color)" />
                  <p className="text-(--main-color) font-bold text-[12px] sm:text-[13px]">
                    {t("branchesPage.address")}
                  </p>
                </div>
                <p className="text-white/80 text-[12.5px] sm:text-[13.5px] leading-6">
                  {selectedBranch.address}
                </p>
              </div>

              <div className="mt-3 rounded-[14px] border border-(--main-color)/25 bg-(--main-color)/5 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon size={16} className="text-(--main-color)" />
                  <p className="text-(--main-color) font-bold text-[12px] sm:text-[13px]">
                    {t("branchesPage.branchGallery")}
                  </p>
                </div>
                <p className="text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                  {t("branchesPage.morePhotos")}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleReachClick}
                  className="auth_btn !w-full sm:!w-[170px] !bg-(--main-color) !text-black !border-(--main-color)"
                >
                  {t("branchesPage.howToReach")}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="auth_btn !w-full sm:!w-[190px]"
                >
                  {t("branchesPage.browseMoreBranches")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================== HOW TO REACH ======================== */}
      {view === "how-to-reach" && selectedBranch && (
        <div className="flex flex-col gap-4">
          <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-[16px] p-3 sm:p-4 lg:p-5 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6">
            {/* Google Maps iframe */}
            <div className="w-full rounded-[14px] overflow-hidden border border-white/10 bg-black min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]">
              <iframe
                src={selectedBranch.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${selectedBranch.name} - Google Maps`}
                className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]"
              />
            </div>

            {/* Info */}
            <div className="mt-4 lg:mt-0 min-w-0">
              <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] sm:text-[12px] font-bold">
                {t("branchesPage.branchLocation")}
              </span>

              <h2 className="mt-3 text-white font-bold text-[18px] sm:text-[20px] lg:text-[26px] leading-snug">
                {selectedBranch.name}
              </h2>

              {/* Address */}
              <div className="mt-4 bg-black/50 p-4 rounded-[14px] border border-(--main-color)/20 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Map size={16} className="text-(--main-color)" />
                  <p className="text-(--main-color) font-bold text-[12px] sm:text-[13px]">
                    {t("branchesPage.address")}
                  </p>
                </div>
                <p className="text-white text-[13px] sm:text-[14px] leading-relaxed">
                  {selectedBranch.address}
                </p>
              </div>

              {/* Open in Google Maps */}
              <button
                type="button"
                onClick={openInGoogleMaps}
                className="mt-3 w-full rounded-[14px] border border-(--main-color)/40 bg-(--main-color)/5 p-3.5 sm:p-4 flex items-center gap-3 hover:bg-(--main-color)/10 hover:border-(--main-color) transition-all cursor-pointer group"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center group-hover:bg-(--main-color)/30 transition-colors">
                  <Compass size={18} className="text-(--main-color)" />
                </div>

                <div className="flex-1 min-w-0 text-start">
                  <p className="text-white font-bold text-[13px] sm:text-[14px]">
                    {t("branchesPage.openInMaps")}
                  </p>
                  <p className="mt-0.5 text-white/60 text-[11px] sm:text-[12px]">
                    {t("branchesPage.openInMapsHint")}
                  </p>
                </div>

                <ExternalLink
                  size={18}
                  className="text-(--main-color) flex-shrink-0"
                />
              </button>

              {/* Location hint */}
              <div className="mt-3 border border-(--main-color)/30 bg-(--main-color)/5 rounded-[12px] p-3">
                <p className="text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                  {t("branchesPage.locationHint")}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="auth_btn !w-full sm:!w-[190px]"
                >
                  {t("branchesPage.backToBranch")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

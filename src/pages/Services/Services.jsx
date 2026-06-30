import {
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MoveHorizontal,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { SERVICES_DATA } from "../../utils/servicesData";

function getPreview(text = "") {
  const normalized = text
    .replace(/\n+/g, " ")
    .replace(/•/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return "";

  const firstChunk = normalized.split(". ")[0];
  if (firstChunk.length <= 120) return firstChunk;
  return `${firstChunk.slice(0, 117)}...`;
}

export default function Services() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isEn = i18n.language === "en";
  const selectedSlug = searchParams.get("service");

  const categories = useMemo(() => {
    return SERVICES_DATA.map((category) => {
      const categoryTitle = isEn ? category.titleEn : category.titleAr;

      return {
        ...category,
        title: categoryTitle,
        services: category.services.map((service) => {
          const description = isEn
            ? service.descriptionEn
            : service.descriptionAr;

          return {
            ...service,
            name: isEn ? service.nameEn : service.nameAr,
            description,
            categoryTitle,
            preview: getPreview(description),
          };
        }),
      };
    });
  }, [isEn]);

  const allServices = useMemo(
    () => categories.flatMap((category) => category.services),
    [categories],
  );

  const selectedService =
    allServices.find((service) => service.slug === selectedSlug) || null;

  const openService = (slug) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("service", slug);
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeService = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("service");
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const BackIcon = isEn ? ChevronLeft : ChevronRight;
  const ForwardIcon = isEn ? ChevronRight : ChevronLeft;

  return (
    <div className="pb-24 lg:pb-10">
      {/* Hero */}
      <div
        className={`card mb-4 mt-10 cursor-pointer`}
        onClick={() => setView("categories")}
      >
        <HeartHandshake size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("servicesPage.title")}
        </p>
      </div>

      {!selectedService ? (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <MoveHorizontal size={17} className="text-(--main-color)" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("servicesPage.browseHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("servicesPage.browseHintText")}
              </p>
            </div>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <section
              key={category.id}
              className="rounded-[18px] border border-(--main-color)/30 bg-[#171717] p-3 sm:p-4 lg:p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-[14px] sm:text-[15px] lg:text-[18px] leading-snug">
                    {category.title}
                  </h2>
                  <p className="mt-1 text-white/50 text-[11px] sm:text-[12px]">
                    {t("servicesPage.servicesCount", {
                      count: category.services.length,
                    })}
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center whitespace-nowrap rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-medium">
                  {t("servicesPage.dragToExplore")}
                </span>
              </div>

              <div className="overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-3 lg:gap-4 w-max min-w-full">
                  {category.services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => openService(service.slug)}
                      className="group flex-shrink-0 snap-start w-[250px] sm:w-[280px] lg:w-[320px] rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      </div>

                      <div className="p-3.5 sm:p-4">
                        <h3 className="text-white font-bold text-[13.5px] sm:text-[14px] lg:text-[15px] leading-snug line-clamp-2 min-h-[40px]">
                          {service.name}
                        </h3>

                        <p className="mt-2 text-white/65 text-[11.5px] sm:text-[12px] leading-relaxed line-clamp-3 min-h-[54px]">
                          {service.preview}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-bold">
                            {t("servicesPage.viewDetails")}
                          </span>

                          <ForwardIcon
                            size={18}
                            className="text-(--main-color) transition-transform duration-300 group-hover:translate-x-[2px]"
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Back bar */}
          <button
            type="button"
            onClick={closeService}
            className="w-full min-h-[44px] rounded-[10px] border border-(--main-color)/40 bg-[#171717] px-3 sm:px-4 flex items-center justify-between gap-3 hover:border-(--main-color) transition-colors"
          >
            <div className="flex items-center gap-2 text-(--main-color) flex-shrink-0">
              <BackIcon size={18} />
              <span className="text-[12px] sm:text-[13px] font-bold">
                {t("servicesPage.backToServices")}
              </span>
            </div>

            <p className="flex-1 text-center text-white font-bold text-[13px] sm:text-[14px] line-clamp-1">
              {selectedService.name}
            </p>

            <div className="w-[95px] sm:w-[112px] flex-shrink-0" />
          </button>

          {/* Detail */}
          <div className="rounded-[18px] border border-(--main-color)/35 bg-[linear-gradient(180deg,#121212_0%,#0b0b0b_100%)] p-4 sm:p-5 lg:p-6 lg:grid lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-6 lg:items-start">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-[16px] overflow-hidden border border-white/10 bg-black">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hidden lg:flex items-center gap-2 text-white/55 text-[12px]">
                <CalendarPlus size={15} className="text-(--main-color)" />
                <span>{t("servicesPage.detailHint")}</span>
              </div>
            </div>

            <div className="min-w-0 mt-4 lg:mt-0">
              <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] sm:text-[12px] font-bold">
                {selectedService.categoryTitle}
              </span>

              <h2 className="mt-3 text-white font-bold text-[18px] sm:text-[20px] lg:text-[26px] leading-snug">
                {selectedService.name}
              </h2>

              <div className="mt-4 border border-(--main-color)/25 bg-white/[0.02] rounded-[14px] p-3.5 sm:p-4">
                <p className="text-white/80 text-[12.5px] sm:text-[13.5px] lg:text-[14.5px] leading-7 whitespace-pre-line">
                  {selectedService.description}
                </p>
              </div>

              <div className="mt-4 lg:hidden border border-(--main-color)/30 bg-(--main-color)/5 rounded-[12px] p-3 flex gap-2.5 items-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
                  <CalendarPlus size={14} className="text-(--main-color)" />
                </div>
                <p className="text-white/75 text-[11.5px] leading-relaxed">
                  {t("servicesPage.detailHint")}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/reservations")}
                  className="auth_btn !w-full sm:!w-[160px] !bg-(--main-color) !text-black !border-(--main-color)"
                >
                  {t("servicesPage.bookNow")}
                </button>

                <button
                  type="button"
                  onClick={closeService}
                  className="auth_btn !w-full sm:!w-[190px]"
                >
                  {t("servicesPage.browseMore")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

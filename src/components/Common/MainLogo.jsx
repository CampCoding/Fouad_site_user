import { useTranslation } from "react-i18next";

export default function MainLogo() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-5 mb-5 flex h-[110px] sm:h-[120px] lg:h-[180px] w-full items-center justify-between rounded-[10px] gap-2 sm:gap-3 lg:gap-6">
      {/* النصوص */}
      <div className="-mt-[10px] flex flex-1 flex-col sm:items-start items-center justify-center min-w-0">
        <h1 className="m-0 text-white font-bold text-[22px] sm:text-[30px] lg:text-[42px] tracking-[0.4px] whitespace-nowrap">
          {t("mainLogo.title")}
        </h1>

        <h2 className="my-1 text-(--main-color) text-[16px] sm:text-[22px] lg:text-[28px] font-bold tracking-[0.4px] whitespace-nowrap">
          {t("mainLogo.subtitle")}
        </h2>

        <div className="mt-1 border-b-2 border-(--main-color) h-[2px] w-full max-w-[400px]" />
      </div>

      {/* اللوجو */}
      <div className="flex items-center justify-center flex-shrink-0">
        <img
          src={"/images/logo.png"}
          alt="Fouady Academy Logo"
          className="h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] lg:h-[170px] lg:w-[170px] object-contain"
        />
      </div>
    </div>
  );
}

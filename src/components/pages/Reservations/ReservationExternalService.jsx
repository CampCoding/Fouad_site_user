import { useTranslation } from "react-i18next";
import CustomSelect from "../../Common/CustomSelect";

export default function ReservationExternalService({
  goToNextStep,
  details,
  setDetails,
}) {
  const { t } = useTranslation();

  const serviceOptions = [
    {
      value: "pediatric_checkup",
      label: t("reservations.chooseService.pediatricCheckup"),
    },
  ];

  const typeOptions = [
    { value: "first", label: t("reservations.chooseService.firstTime") },
    { value: "followup", label: t("reservations.chooseService.followup") },
  ];

  const governorateOptions = [
    { value: "cairo", label: t("reservations.externalService.cairo") },
  ];

  const cityOptions = [
    { value: "nasr_city", label: t("reservations.externalService.nasrCity") },
  ];

  const hospitalOptions = [
    {
      value: "hosp1",
      label: t("reservations.externalService.salamHospital"),
    },
  ];

  const isContinueEnabled =
    details.service &&
    details.type &&
    details.governorate &&
    details.city &&
    details.hospital;

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
          {t("reservations.externalService.fillServiceData")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <CustomSelect
          placeholder={t("reservations.chooseService.service")}
          options={serviceOptions}
          value={details.service}
          onChange={(val) => setDetails({ ...details, service: val })}
        />
        <CustomSelect
          placeholder={t("reservations.chooseService.firstOrFollowup")}
          options={typeOptions}
          value={details.type}
          onChange={(val) => setDetails({ ...details, type: val })}
        />
        <CustomSelect
          placeholder={t("reservations.externalService.governorate")}
          options={governorateOptions}
          value={details.governorate}
          onChange={(val) => setDetails({ ...details, governorate: val })}
        />
        <CustomSelect
          placeholder={t("reservations.externalService.city")}
          options={cityOptions}
          value={details.city}
          onChange={(val) => setDetails({ ...details, city: val })}
        />
        <CustomSelect
          placeholder={t("reservations.externalService.hospital")}
          options={hospitalOptions}
          value={details.hospital}
          onChange={(val) => setDetails({ ...details, hospital: val })}
        />
      </div>

      <button
        onClick={goToNextStep}
        className={`auth_btn mt-3 ms-auto! ${!isContinueEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!isContinueEnabled}
      >
        {t("reservations.continue")}
      </button>
    </div>
  );
}

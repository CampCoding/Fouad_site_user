import { useTranslation } from "react-i18next";
import CustomSelect from "../../Common/CustomSelect";

export default function ReservationChooseService({
  selectedServiceId,
  handleSelectServiceType,
  goToNextStep,
  subStep,
  setSubStep,
  details,
  setDetails,
}) {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      name: t("reservations.chooseService.internal"),
      description: t("reservations.chooseService.internalDesc"),
    },
    {
      id: 2,
      name: t("reservations.chooseService.external"),
      description: t("reservations.chooseService.externalDesc"),
    },
    // {
    //   id: 3,
    //   name: t("reservations.chooseService.online"),
    //   description: t("reservations.chooseService.onlineDesc"),
    // },
  ];

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

  const branchOptions = [
    {
      value: "branch1",
      label: t("reservations.chooseService.branchNasrCity"),
    },
    {
      value: "branch2",
      label: t("reservations.chooseService.branchFifthSettlement"),
    },
    { value: "branch3", label: t("reservations.chooseService.branchMaadi") },
  ];

  const handleContinue = () => {
    if (subStep === 2) {
      if (details.service && details.type && details.branch) {
        goToNextStep();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Sub-step 1 */}
      {subStep === 1 && (
        <div>
          <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
              {t("reservations.chooseService.chooseType")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {services.map((service) => (
              <div
                onClick={() => handleSelectServiceType(service.id)}
                key={service.id}
                className={`flex border bg-[#171717] p-2.5 lg:p-3 rounded-[4px] text-white gap-4 lg:gap-8 items-center cursor-pointer transition-all duration-300
                    ${selectedServiceId == service.id ? "border-(--main-bg-color)! bg-(--main-bg-color)! text-white!" : "border-[#232323]!"}`}
              >
                <p className="text-[13px] lg:text-[14px] font-medium">
                  {service.name}
                </p>
                <p className="text-[11px] lg:text-[12px] text-white/60">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-step 2 */}
      {subStep === 2 && selectedServiceId === 1 && (
        <div className="flex flex-col gap-3">
          <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
              {t("reservations.chooseService.fillServiceData")}
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
              placeholder={t("reservations.chooseService.branch")}
              options={branchOptions}
              value={details.branch}
              onChange={(val) => setDetails({ ...details, branch: val })}
            />
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!(details.service && details.type && details.branch)}
            className={`auth_btn mt-3 ms-auto! ${!(details.service && details.type && details.branch) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {t("reservations.continue")}
          </button>
        </div>
      )}
    </div>
  );
}

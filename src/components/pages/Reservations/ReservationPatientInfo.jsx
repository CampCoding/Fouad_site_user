import { useTranslation } from "react-i18next";
import CustomInput from "../../Common/CustomInput";

export default function ReservationPatientInfo({
  goToNextStep,
  patientInfo,
  setPatientInfo,
}) {
  const { t } = useTranslation();

  const requiredFields = [
    "childName",
    "fatherName",
    "motherName",
    "phone",
    "age",
  ];
  const isFormValid = requiredFields.every((field) =>
    patientInfo[field]?.trim(),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
          {t("reservations.patientInfo.fillPatientData")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <CustomInput
          onChange={(e) =>
            setPatientInfo((prev) => ({ ...prev, childName: e.target.value }))
          }
          value={patientInfo.childName}
          placeholder={t("reservations.patientInfo.childName")}
        />
        <CustomInput
          onChange={(e) =>
            setPatientInfo((prev) => ({ ...prev, fatherName: e.target.value }))
          }
          value={patientInfo.fatherName}
          placeholder={t("reservations.patientInfo.fatherName")}
        />
        <CustomInput
          onChange={(e) =>
            setPatientInfo((prev) => ({ ...prev, motherName: e.target.value }))
          }
          value={patientInfo.motherName}
          placeholder={t("reservations.patientInfo.motherName")}
        />
        <CustomInput
          type="tel"
          onChange={(e) =>
            setPatientInfo((prev) => ({ ...prev, phone: e.target.value }))
          }
          value={patientInfo.phone}
          placeholder={t("reservations.patientInfo.phone")}
        />
        <CustomInput
          type="number"
          onChange={(e) =>
            setPatientInfo((prev) => ({ ...prev, age: e.target.value }))
          }
          value={patientInfo.age}
          placeholder={t("reservations.patientInfo.age")}
        />
        <CustomInput
          onChange={(e) =>
            setPatientInfo((prev) => ({
              ...prev,
              referringDoctor: e.target.value,
            }))
          }
          value={patientInfo.referringDoctor}
          placeholder={t("reservations.patientInfo.referringDoctor")}
        />
      </div>

      <button
        onClick={goToNextStep}
        disabled={!isFormValid}
        className="auth_btn disabled:opacity-50 disabled:cursor-not-allowed ms-auto!"
      >
        {t("reservations.continue")}
      </button>
    </div>
  );
}

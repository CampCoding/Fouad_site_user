// src/pages/Profile/components/AppointmentsView.jsx
import { useTranslation } from "react-i18next";
import { useUser } from "../../../context/UserContext";
import { DOCTOR_APPOINTMENTS, PATIENT_APPOINTMENTS } from "./data";

export default function AppointmentsView() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { isDoctor } = useUser();

  const appointments = isDoctor ? DOCTOR_APPOINTMENTS : PATIENT_APPOINTMENTS;

  const headers = appointments.headers.map((key) =>
    t(`profile.appointments.${key}`),
  );

  const title = isDoctor
    ? isEn
      ? "Your Schedule"
      : "جدول مواعيدك"
    : t("profile.appointments.upcoming");

  const countLabel = isDoctor
    ? isEn
      ? "appointments"
      : "موعد"
    : t("profile.appointments.count");

  return (
    <div className="text-white flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-(--main-color) text-[12px] lg:text-[14px] font-bold">
          {title}
        </p>
        <p className="text-white/40 text-[11px] lg:text-[12px]">
          {appointments.data.length} {countLabel}
        </p>
      </div>

      <div className="border border-(--main-color)/30 rounded-md overflow-hidden bg-[#171717]">
        <div className="w-full grid grid-cols-5 bg-(--main-color)/15 border-b border-(--main-color)/30">
          {headers.map((header, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center p-2 lg:p-3 text-center text-[10px] lg:text-[13px] font-bold text-(--main-color) ${
                idx !== headers.length - 1
                  ? "border-l border-(--main-color)/20"
                  : ""
              }`}
            >
              {header}
            </div>
          ))}
        </div>
        {appointments.data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`w-full grid grid-cols-5 hover:bg-(--main-color)/5 transition-colors ${
              rowIdx !== appointments.data.length - 1
                ? "border-b border-[#292929]"
                : ""
            }`}
          >
            {row.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                className={`flex items-center justify-center p-2.5 lg:p-3.5 text-center text-[11px] lg:text-[13px] text-white/85 ${
                  cellIdx !== row.length - 1 ? "border-l border-[#292929]" : ""
                }`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

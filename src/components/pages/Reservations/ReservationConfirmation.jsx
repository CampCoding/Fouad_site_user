import { CircleCheckBig } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export default function ReservationConfirmation({
  goToStep,
  showInstructions = true,
}) {
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationDone, setReservationDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isExternalReservation = location.pathname === "/reservations/external";

  const internal_data = [
    {
      label: t("reservations.confirmation.labels.serviceType"),
      value: t("reservations.confirmation.values.speechTherapy"),
    },
    {
      label: t("reservations.confirmation.labels.service"),
      value: t("reservations.confirmation.values.checkup"),
    },
    {
      label: t("reservations.confirmation.labels.branch"),
      value: t("reservations.confirmation.values.maadiB"),
    },
    {
      label: t("reservations.confirmation.labels.treatingDoctor"),
      value: t("reservations.confirmation.values.drName"),
    },
    {
      label: t("reservations.confirmation.labels.day"),
      value: t("reservations.confirmation.values.sunday"),
    },
    {
      label: t("reservations.confirmation.labels.date"),
      value: "2024-05-12",
    },
    {
      label: t("reservations.confirmation.labels.time"),
      value: `10:00 ${t("reservations.confirmation.values.morning")}`,
    },
    {
      label: t("reservations.confirmation.labels.phone"),
      value: "01234567890",
    },
    {
      label: t("reservations.confirmation.labels.childName"),
      value:
        t("reservations.confirmation.values.checkup") === "Checkup"
          ? "Ahmed Mohamed"
          : "أحمد محمد",
    },
    {
      label: t("reservations.confirmation.labels.fatherName"),
      value:
        t("reservations.confirmation.values.drName") === "Dr. Mohamed Ali"
          ? "Mohamed Ali"
          : "محمد علي",
    },
    {
      label: t("reservations.confirmation.labels.paymentMethod"),
      value: t("reservations.confirmation.values.instapay"),
    },
    {
      label: t("reservations.confirmation.labels.price"),
      value: "500 ج.م",
    },
  ];

  const external_data = [
    {
      label: t("reservations.confirmation.labels.serviceType"),
      value: t("reservations.confirmation.values.speechTherapy"),
    },
    {
      label: t("reservations.confirmation.labels.service"),
      value: t("reservations.confirmation.values.checkup"),
    },
    {
      label: t("reservations.confirmation.labels.governorate"),
      value: t("reservations.confirmation.values.gharbia"),
    },
    {
      label: t("reservations.confirmation.labels.city"),
      value: t("reservations.confirmation.values.tanta"),
    },
    {
      label: t("reservations.confirmation.labels.hospital"),
      value: t("reservations.confirmation.values.darElQemma"),
    },
    {
      label: t("reservations.confirmation.labels.date"),
      value: "2024-05-12",
    },
    { label: t("reservations.confirmation.labels.within"), value: "" },
    {
      label: t("reservations.confirmation.labels.phone"),
      value: "01234567890",
    },
    {
      label: t("reservations.confirmation.labels.childName"),
      value:
        t("reservations.confirmation.values.checkup") === "Checkup"
          ? "Ahmed Mohamed"
          : "أحمد محمد",
    },
    {
      label: t("reservations.confirmation.labels.fatherName"),
      value:
        t("reservations.confirmation.values.drName") === "Dr. Mohamed Ali"
          ? "Mohamed Ali"
          : "محمد علي",
    },
    {
      label: t("reservations.confirmation.labels.paymentMethod"),
      value: t("reservations.confirmation.values.instapay"),
    },
    {
      label: t("reservations.confirmation.labels.price"),
      value: "500 ج.م",
    },
  ];

  const data = useMemo(() => {
    return isExternalReservation ? external_data : internal_data;
  }, [location.pathname, t]);

  // Grid rendering helper
  const renderGrid = () => (
    <div className="rounded-[8px] overflow-hidden shadow-xl">
      <div dir="ltr" className="grid grid-cols-4 gap-1.5 lg:gap-2">
        {Array.from({ length: data.length / 2 }).map((_, rowIndex) => {
          const itemRight = data[rowIndex * 2];
          const itemLeft = data[rowIndex * 2 + 1];

          return (
            <React.Fragment key={rowIndex}>
              <div className="col-span-1 p-1.5 lg:p-2 border rounded-lg border-[#232323] text-[11px] lg:text-[12px] text-center bg-transparent text-white flex items-center justify-center">
                {itemLeft.value}
              </div>
              <div className="col-span-1 p-1.5 lg:p-2 border rounded-lg border-(--main-color) text-white text-[9px] lg:text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center">
                {itemLeft.label}
              </div>

              <div className="col-span-1 p-1.5 lg:p-2 rounded-lg border border-[#232323] text-white text-[11px] lg:text-[12px] text-center bg-transparent flex items-center justify-center">
                {itemRight.value}
              </div>
              <div className="col-span-1 p-1.5 lg:p-2 border rounded-lg border-(--main-color) text-white text-[9px] lg:text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center">
                {itemRight.label}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!isConfirmed ? (
        /* Review State */
        <div className="flex flex-col gap-1">
          <div className="border h-[40px] flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
              {t("reservations.confirmation.reviewData")}
            </p>
          </div>

          <div className="mt-4">{renderGrid()}</div>

          <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-2">
            <button
              onClick={() => goToStep("service")}
              className="auth_btn w-full! py-2.5! lg:py-3! font-bold! text-[12px] lg:text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
            >
              {t("reservations.confirmation.editReservation")}
            </button>
            <button
              onClick={() => setIsConfirmed(true)}
              className="auth_btn w-full! py-2.5! lg:py-3! font-bold! text-[12px] lg:text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
            >
              {t("reservations.confirmation.confirmReservation")}
            </button>
          </div>
        </div>
      ) : reservationDone ? (
        /* Done State */
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="border h-[40px] w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
              {t("reservations.confirmation.confirmed")}
            </p>
          </div>

          <CircleCheckBig size={60} color="#d49a3e" className="my-5" />

          {renderGrid()}

          <div
            className={`grid ${showInstructions ? "grid-cols-3" : "grid-cols-2"} w-full! gap-2 lg:gap-4 mt-2`}
          >
            <button
              onClick={() => goToStep("service")}
              className="auth_btn w-full! py-2.5! lg:py-3! font-bold! text-[11px] lg:text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
            >
              {t("reservations.confirmation.editReservation")}
            </button>
            <button className="auth_btn w-full! py-2.5! lg:py-3! font-bold! text-[11px] lg:text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]">
              {t("reservations.confirmation.cancelReservation")}
            </button>
            {showInstructions && (
              <button
                onClick={() =>
                  navigate(
                    `/reservations-instruction?svc=${isExternalReservation ? "2" : "1"}`,
                  )
                }
                className="auth_btn w-full! py-2.5! lg:py-3! font-bold! text-[11px] lg:text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
              >
                {t("reservations.confirmation.instructions")}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Pending State */
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border h-[40px] w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className="text-white text-[11px] lg:text-xs px-2 text-center font-semibold">
              {t("reservations.confirmation.receivedRequest")}
            </p>
          </div>

          <CircleCheckBig
            onClick={() => setReservationDone(true)}
            size={60}
            color="#d49a3e"
            className="my-5 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

import { Calendar, Clock, Info, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../Common/CustomSelect";

const generateDates = (t, i18n) => {
  const dates = [];
  const today = new Date();
  const dayNamesAr = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const dayNamesEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayNames = i18n.language === "ar" ? dayNamesAr : dayNamesEn;

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    let label = "";
    if (i === 0) label = t("reservationAppointment.today");
    else if (i === 1) label = t("reservationAppointment.tomorrow");
    else label = dayNames[d.getDay()];
    const formattedDate = `${d.getDate()}/${d.getMonth() + 1}`;
    dates.push({
      id: i + 1,
      label,
      displayDate: formattedDate,
      fullDate: d.toISOString().split("T")[0],
    });
  }
  return dates;
};

const times = [
  { time: "14:00", reserved: false },
  { time: "14:30", reserved: false },
  { time: "15:00", reserved: false },
  { time: "15:30", reserved: true },
  { time: "16:00", reserved: false },
  { time: "16:30", reserved: false },
  { time: "17:00", reserved: true },
  { time: "17:30", reserved: false },
];

function getNearestAppointment(t) {
  const d = new Date();
  return {
    doctorName: t("reservationAppointment.doctorName"),
    dateId: 1,
    displayDate: `${d.getDate()}/${d.getMonth() + 1}`,
    time: "14:00",
  };
}

export default function ReservationAppointment({
  goToNextStep,
  appointmentData,
  setAppointmentData,
}) {
  const { t, i18n } = useTranslation();
  const dates = generateDates(t, i18n);
  const NEAREST_APPOINTMENT = getNearestAppointment(t);

  const doctorOptions = [
    { value: "any", label: t("reservationAppointment.anyDoctor") },
    { value: "mahmoud_shabana", label: t("reservationAppointment.doctorName") },
  ];

  const { doctor, selectedDateId, selectedTime } = appointmentData;
  const isAnyDoctor = doctor === "any";
  const isReady = isAnyDoctor || (doctor && selectedDateId && selectedTime);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="border h-[var(--main-height)] mb-2 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
          {t("reservationAppointment.title")}
        </p>
      </div>

      {/* Note */}
      <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-md p-3 flex gap-2.5 items-start animate-in fade-in duration-300">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center mt-0.5">
          <Info size={13} className="text-(--main-color)" />
        </div>
        <p className="text-white/80 text-[11px] lg:text-[11.5px] leading-relaxed flex-1">
          {t("reservationAppointment.noteText1")}
          <br />
          {t("reservationAppointment.noteText2")}{" "}
          <span className="text-(--main-color) font-bold">
            {t("reservationAppointment.noteHighlight")}
          </span>{" "}
          {t("reservationAppointment.noteText3")}
        </p>
      </div>

      {/* Doctor select */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 px-1">
          <Stethoscope size={13} className="text-(--main-color)" />
          <p className="text-(--main-color) text-[11px] font-bold">
            {t("reservationAppointment.doctor")}
          </p>
        </div>
        <CustomSelect
          placeholder={t("reservationAppointment.selectDoctor")}
          options={doctorOptions}
          value={doctor}
          onChange={(val) => {
            if (val === "any") {
              setAppointmentData({
                doctor: val,
                selectedDateId: NEAREST_APPOINTMENT.dateId,
                selectedTime: NEAREST_APPOINTMENT.time,
              });
            } else {
              setAppointmentData({
                ...appointmentData,
                doctor: val,
                selectedDateId: 1,
                selectedTime: null,
              });
            }
          }}
        />
      </div>

      {/* Any doctor card */}
      {isAnyDoctor && (
        <div className="border-2 border-(--main-color) bg-gradient-to-br from-(--main-color)/15 to-(--main-color)/5 rounded-lg p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-(--main-color) flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-black" />
            </div>
            <div>
              <p className="text-(--main-color) font-bold text-[13px]">
                {t("reservationAppointment.nearestAvailable")}
              </p>
              <p className="text-white/60 text-[10px]">
                {t("reservationAppointment.autoSelected")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-2">
              <p className="text-white/40 text-[9px] mb-1">
                {t("reservationAppointment.summary.doctor")}
              </p>
              <p className="text-(--main-color) text-[10px] lg:text-[11px] font-bold text-center truncate w-full">
                {NEAREST_APPOINTMENT.doctorName}
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-2">
              <p className="text-white/40 text-[9px] mb-1">
                {t("reservationAppointment.summary.date")}
              </p>
              <p className="text-white text-[10px] lg:text-[11px] font-bold">
                {NEAREST_APPOINTMENT.displayDate}
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-2">
              <p className="text-white/40 text-[9px] mb-1">
                {t("reservationAppointment.summary.time")}
              </p>
              <p className="text-(--main-color) text-[10px] lg:text-[11px] font-bold">
                {NEAREST_APPOINTMENT.time}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Date picker */}
      {doctor && !isAnyDoctor && (
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-1.5 px-1">
            <Calendar size={13} className="text-(--main-color)" />
            <p className="text-(--main-color) text-[11px] font-bold">
              {t("reservationAppointment.selectDate")}
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((date) => (
              <div
                key={date.id}
                onClick={() =>
                  setAppointmentData({
                    ...appointmentData,
                    selectedDateId: date.id,
                    selectedTime: null,
                  })
                }
                className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[65px] lg:min-w-[70px] h-[48px] lg:h-[50px] rounded-[6px] border cursor-pointer transition-all
                  ${
                    selectedDateId === date.id
                      ? "border-(--main-color) bg-(--main-color)/15 text-white shadow-lg"
                      : "border-[#232323] bg-[#171717] text-gray-400 hover:border-(--main-color)/50"
                  }`}
              >
                <p className="text-[9px] lg:text-[10px] font-medium">
                  {date.label}
                </p>
                <p className="text-[10px] lg:text-[11px] font-bold">
                  {date.displayDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time picker */}
      {doctor && !isAnyDoctor && selectedDateId && (
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-1.5 px-1">
            <Clock size={13} className="text-(--main-color)" />
            <p className="text-(--main-color) text-[11px] font-bold">
              {t("reservationAppointment.selectTime")}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {times.map((slot, index) => (
              <div
                key={index}
                onClick={() =>
                  !slot.reserved &&
                  setAppointmentData({
                    ...appointmentData,
                    selectedTime: slot.time,
                  })
                }
                className={`h-[36px] lg:h-[38px] flex items-center justify-center rounded-[6px] border text-[11px] font-bold transition-all cursor-pointer
                  ${
                    slot.reserved
                      ? "bg-[#2a1313] border-[#442222] text-white/30 cursor-not-allowed"
                      : selectedTime === slot.time
                        ? "border-(--main-color) bg-(--main-color)/20 text-white shadow-md"
                        : "border-[#232323] bg-[#171717] text-white hover:border-(--main-color)/50"
                  }`}
              >
                {slot.reserved
                  ? t("reservationAppointment.reserved")
                  : slot.time}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {!isAnyDoctor && isReady && (
        <div className="border border-(--main-color)/40 bg-(--main-color)/10 rounded-md p-3 animate-in fade-in duration-300">
          <p className="text-white/60 text-[10px] mb-1">
            {t("reservationAppointment.summaryTitle")}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
              <p className="text-white/40 text-[9px]">
                {t("reservationAppointment.summary.doctor")}
              </p>
              <p className="text-(--main-color) text-[10px] font-bold mt-0.5 text-center truncate w-full">
                {doctorOptions.find((d) => d.value === doctor)?.label}
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
              <p className="text-white/40 text-[9px]">
                {t("reservationAppointment.summary.date")}
              </p>
              <p className="text-white text-[10px] font-bold mt-0.5">
                {dates.find((d) => d.id === selectedDateId)?.displayDate}
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
              <p className="text-white/40 text-[9px]">
                {t("reservationAppointment.summary.time")}
              </p>
              <p className="text-(--main-color) text-[10px] font-bold mt-0.5">
                {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue */}
      <button
        onClick={goToNextStep}
        disabled={!isReady}
        className={`auth_btn mt-2 ms-auto! ${!isReady ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {t("reservationAppointment.continue")}
      </button>
    </div>
  );
}

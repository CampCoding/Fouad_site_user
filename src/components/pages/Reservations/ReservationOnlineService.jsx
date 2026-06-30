import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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

export default function ReservationOnlineService({
  goToNextStep,
  subStep,
  setSubStep,
  details,
  setDetails,
  currentDoctorIndex,
  setCurrentDoctorIndex,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {
  const { t, i18n } = useTranslation();

  const doctors = [
    {
      id: 1,
      name: t("reservations.onlineService.drName"),
      specialty: t("reservations.onlineService.consultantPediatric"),
      experience: t("reservations.onlineService.experience"),
      price: 500,
      img: "/images/11.png",
    },
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

  const currentDoctor = doctors[currentDoctorIndex];
  const dates = generateDates(t, i18n);

  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctorIndex(
      (prev) => (prev - 1 + doctors.length) % doctors.length,
    );
  };

  const isFormEnabled =
    details.service &&
    details.type &&
    details.governorate &&
    details.city &&
    details.hospital;

  // Sub-step 1: Service details
  if (subStep === 1) {
    return (
      <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
          <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
            {t("reservations.onlineService.fillServiceData")}
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
          onClick={() => setSubStep(2)}
          disabled={!isFormEnabled}
          className={`auth_btn mt-3 ms-auto! ${!isFormEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {t("reservations.continue")}
        </button>
      </div>
    );
  }

  // Sub-step 2: Doctor selection
  if (subStep === 2) {
    return (
      <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
          <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
            {t("reservations.onlineService.doctor")}
          </p>
        </div>

        <div className="relative group">
          {doctors.length > 1 && (
            <>
              <button
                onClick={prevDoctor}
                className="absolute start-[-15px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#232323] border border-white/5 flex justify-center items-center text-white/50 hover:text-(--main-color) hover:border-(--main-color) transition-all shadow-xl"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextDoctor}
                className="absolute end-[-15px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#232323] border border-white/5 flex justify-center items-center text-white/50 hover:text-(--main-color) hover:border-(--main-color) transition-all shadow-xl"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div
            key={currentDoctor.id}
            className="bg-[#171717] border border-[#232323] rounded-[12px] p-5 lg:p-6 flex flex-col items-center gap-4 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="absolute top-0 end-0 w-32 h-32 bg-(--main-color)/5 rounded-full -me-16 -mt-16 blur-3xl"></div>

            <div className="w-full h-full p-1 overflow-hidden bg-[#232323]">
              <img
                src={currentDoctor.img}
                alt={currentDoctor.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-white font-bold text-[16px] lg:text-lg">
                {currentDoctor.name}
              </h3>
              <p className="text-(--main-color) text-[13px] lg:text-sm font-medium">
                {currentDoctor.specialty}
              </p>
              <p className="text-white/60 text-[11px] mt-2 leading-relaxed max-w-[250px] min-h-[48px]">
                {currentDoctor.experience}
              </p>
            </div>

            <div className="flex items-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-(--main-color) text-(--main-color)"
                />
              ))}
            </div>

            <div className="bg-[#232323] px-4 lg:px-6 py-2 rounded-full border border-white/5 flex items-center gap-2">
              <span className="text-(--main-color) text-[11px] lg:text-xs font-bold">
                {t("reservations.onlineService.consultationPrice", {
                  price: currentDoctor.price,
                })}
              </span>
            </div>

            <button
              onClick={() => setSubStep(3)}
              className="auth_btn w-full mt-4 py-3 font-bold shadow-lg"
            >
              {t("reservations.onlineService.setAppointment")}
            </button>
          </div>

          {doctors.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {doctors.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === currentDoctorIndex ? "w-6 bg-(--main-color)" : "w-2 bg-[#232323]"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sub-step 3: Date & Time
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[var(--main-height)] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className="text-white text-center font-bold text-[13px] lg:text-[15px]">
          {t("reservations.onlineService.chooseAppointment")}
        </p>
      </div>

      {/* Dates */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {dates.map((date) => (
          <div
            key={date.id}
            onClick={() => setSelectedDate(date.id)}
            className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[70px] lg:min-w-[75px] h-[50px] lg:h-[55px] rounded-[6px] border cursor-pointer transition-all
              ${
                selectedDate === date.id
                  ? "border-(--main-bg-color) bg-(--main-bg-color) text-white shadow-lg"
                  : "border-[#232323] bg-[#171717] text-gray-400 hover:border-(--main-color)"
              }`}
          >
            <p className="text-[10px] font-medium uppercase">{date.label}</p>
            <p className="text-[11px] lg:text-xs font-bold">
              {date.displayDate}
            </p>
          </div>
        ))}
      </div>

      {/* Times */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {times.map((slot, index) => (
          <div
            key={index}
            onClick={() => !slot.reserved && setSelectedTime(slot.time)}
            className={`h-[38px] lg:h-[42px] flex items-center justify-center rounded-[6px] border text-[11px] lg:text-xs font-bold transition-all
              ${
                slot.reserved
                  ? "bg-[#2a1313] border-[#442222] text-white/30 cursor-not-allowed"
                  : selectedTime === slot.time
                    ? "border-(--main-bg-color) bg-(--main-bg-color) text-white shadow-md"
                    : "border-[#232323] bg-[#171717] text-white hover:border-(--main-color) cursor-pointer"
              }`}
          >
            {slot.reserved
              ? t("reservations.onlineService.reserved")
              : slot.time}
          </div>
        ))}
      </div>

      <button
        onClick={goToNextStep}
        disabled={!selectedTime}
        className={`auth_btn mt-6 ms-auto! ${!selectedTime ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {t("reservations.continue")}
      </button>
    </div>
  );
}

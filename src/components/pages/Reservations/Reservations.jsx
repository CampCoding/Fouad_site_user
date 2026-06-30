import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ReservationAppointment from "./ReservationAppointment";
import ReservationChooseService from "./ReservationChooseService";
import ReservationConfirmation from "./ReservationConfirmation";
import ReservationExternalPatient from "./ReservationExternalPatient";
import ReservationExternalService from "./ReservationExternalService";
import ReservationOnlineService from "./ReservationOnlineService";
import ReservationPatientInfo from "./ReservationPatientInfo";
import ReservationPayment from "./ReservationPayment";

const FULL_FLOW = [
  "service",
  "appointment",
  "patient",
  "payment",
  "confirmation",
];
const ONLINE_FLOW = ["service", "patient", "payment", "confirmation"];

export default function Reservations() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const isExternal = type === "external";
  const isOnline = type === "online";

  const currentFlow = isOnline ? ONLINE_FLOW : FULL_FLOW;
  const currentSlug = searchParams.get("s") || currentFlow[0];
  const currentStepIndex = currentFlow.indexOf(currentSlug);
  const currentStepNumber = currentStepIndex + 1;
  const selectedServiceId = Number(searchParams.get("svc")) || null;

  // ============= States =============
  const [serviceSubStep, setServiceSubStep] = useState(1);
  const [internalServiceDetails, setInternalServiceDetails] = useState({
    service: "",
    type: "",
    branch: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    doctor: "",
    selectedDateId: 1,
    selectedTime: null,
  });

  const [externalServiceDetails, setExternalServiceDetails] = useState({
    service: "",
    type: "",
    governorate: "",
    city: "",
    hospital: "",
  });

  const [onlineSubStep, setOnlineSubStep] = useState(1);
  const [onlineServiceDetails, setOnlineServiceDetails] = useState({
    service: "",
    type: "",
    governorate: "",
    city: "",
    hospital: "",
  });
  const [onlineDoctorIndex, setOnlineDoctorIndex] = useState(0);
  const [onlineSelectedDate, setOnlineSelectedDate] = useState(1);
  const [onlineSelectedTime, setOnlineSelectedTime] = useState(null);

  const [patientInfo, setPatientInfo] = useState({
    childName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    age: "",
    referringDoctor: "",
  });

  const [externalPatientInfo, setExternalPatientInfo] = useState({
    childName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    age: "",
    referringDoctor: "",
  });

  const [paymentData, setPaymentData] = useState({
    selectedMethod: null,
    price: "",
    hasCoupon: false,
    confirmCoupon: false,
    couponCode: "",
  });

  // ============= Navigation =============
  const goToStep = (slug) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (slug === currentFlow[0]) {
      newSearchParams.delete("s");
    } else {
      newSearchParams.set("s", slug);
    }
    setSearchParams(newSearchParams);
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < currentFlow.length) {
      goToStep(currentFlow[nextIndex]);
    }
  };

  const handleSelectServiceType = (serviceId) => {
    if (serviceId === 2) {
      navigate(`/reservations/external?svc=${serviceId}`);
    } else if (serviceId === 3) {
      navigate(`/reservations/online?svc=${serviceId}`);
    } else if (serviceId === 1) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("svc", String(serviceId));
      setSearchParams(newSearchParams);
      setServiceSubStep(2);
    }
  };

  const handleBack = () => {
    if (
      currentSlug === "service" &&
      !isExternal &&
      !isOnline &&
      serviceSubStep > 1
    ) {
      setServiceSubStep(serviceSubStep - 1);
      if (serviceSubStep === 2) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("svc");
        setSearchParams(newSearchParams);
      }
      return;
    }

    if (currentSlug === "service" && isOnline && onlineSubStep > 1) {
      setOnlineSubStep(onlineSubStep - 1);
      return;
    }

    if (currentStepIndex > 0) {
      goToStep(currentFlow[currentStepIndex - 1]);
      return;
    }

    if (isExternal || isOnline) {
      navigate("/reservations");
      return;
    }

    if (selectedServiceId) {
      const newSearchParams = new URLSearchParams();
      setSearchParams(newSearchParams);
      setServiceSubStep(1);
      return;
    }
  };

  const showBackButton =
    currentStepIndex > 0 ||
    isExternal ||
    isOnline ||
    selectedServiceId ||
    (currentSlug === "service" && serviceSubStep > 1);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="card mt-10 mb-6">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png"
          className="object-contain"
          width={40}
          height={40}
          alt="reservation icon"
        />
        <p
          className="font-bold text-[15px] cursor-pointer text-[#eee]"
          onClick={() => navigate("/reservations")}
        >
          {t("reservations.title")}
        </p>
      </div>

      {/* Back Button */}
      {showBackButton && (
        <div
          className="border h-[var(--main-height)] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer hover:bg-(--main-color)/5 transition-colors"
          onClick={handleBack}
        >
          <ChevronLeft
            className="absolute start-3 text-(--main-color)"
            size={20}
          />
          <p className="text-white text-center font-bold text-[14px]">
            {t("reservations.back")}
          </p>
        </div>
      )}

      {/* Stepper Header */}
      <div
        className="grid mt-3 gap-1.5 lg:gap-2 sticky top-20 z-10"
        style={{
          gridTemplateColumns: `repeat(${currentFlow.length}, minmax(0, 1fr))`,
        }}
      >
        {currentFlow.map((slug, idx) => {
          const stepNum = idx + 1;
          return (
            <div
              key={slug}
              onClick={() => goToStep(slug)}
              className={`col-span-1 flex flex-col gap-1 rounded-[7px] bg-[linear-gradient(90deg,#242424,#404040)] px-1 py-2 font-bold items-center justify-center shadow-sm transition-all duration-500 ${stepNum > currentStepNumber ? "opacity-50 pointer-events-none" : "opacity-100"} ${slug === currentSlug ? "border border-(--main-color)" : ""}`}
            >
              <div
                className={`w-[28px] h-[28px] border-[3px] rounded-full flex justify-center items-center text-[12px]
                ${slug === currentSlug ? "text-(--main-color) border-(--main-color)" : "text-gray-400 border-gray-400"}`}
              >
                {stepNum}
              </div>
              <p
                className={`text-[10px] lg:text-[11px] mt-2 text-center font-bold ${slug === currentSlug ? "text-white" : "text-gray-400"}`}
              >
                {t(`reservations.steps.${slug}`)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {currentSlug === "service" && (
          <div className="flex flex-col">
            {isExternal ? (
              <ReservationExternalService
                goToNextStep={goToNextStep}
                details={externalServiceDetails}
                setDetails={setExternalServiceDetails}
              />
            ) : isOnline ? (
              <ReservationOnlineService
                goToNextStep={goToNextStep}
                subStep={onlineSubStep}
                setSubStep={setOnlineSubStep}
                details={onlineServiceDetails}
                setDetails={setOnlineServiceDetails}
                currentDoctorIndex={onlineDoctorIndex}
                setCurrentDoctorIndex={setOnlineDoctorIndex}
                selectedDate={onlineSelectedDate}
                setSelectedDate={setOnlineSelectedDate}
                selectedTime={onlineSelectedTime}
                setSelectedTime={setOnlineSelectedTime}
              />
            ) : (
              <ReservationChooseService
                selectedServiceId={selectedServiceId}
                handleSelectServiceType={handleSelectServiceType}
                goToNextStep={goToNextStep}
                subStep={serviceSubStep}
                setSubStep={setServiceSubStep}
                details={internalServiceDetails}
                setDetails={setInternalServiceDetails}
              />
            )}
          </div>
        )}

        {currentSlug === "appointment" && !isOnline && (
          <ReservationAppointment
            goToNextStep={goToNextStep}
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
          />
        )}

        {currentSlug === "patient" &&
          (isExternal || isOnline ? (
            <ReservationExternalPatient
              goToNextStep={goToNextStep}
              patientInfo={externalPatientInfo}
              setPatientInfo={setExternalPatientInfo}
            />
          ) : (
            <ReservationPatientInfo
              goToNextStep={goToNextStep}
              patientInfo={patientInfo}
              setPatientInfo={setPatientInfo}
            />
          ))}

        {currentSlug === "payment" && (
          <ReservationPayment
            goToNextStep={goToNextStep}
            selectedServiceId={selectedServiceId}
            showInstructions={!isOnline}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        )}

        {currentSlug === "confirmation" && (
          <ReservationConfirmation
            goToStep={goToStep}
            showInstructions={!isOnline}
          />
        )}
      </div>
    </div>
  );
}

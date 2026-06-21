import React, { useState } from 'react'
import ReservationChooseService from './ReservationChooseService';
import ReservationPatientInfo from './ReservationPatientInfo';
import ReservationPayment from './ReservationPayment';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationExternalService from './ReservationExternalService';
import ReservationExternalPatient from './ReservationExternalPatient';
import ReservationOnlineService from './ReservationOnlineService';
import ReservationAppointment from './ReservationAppointment';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';

// ✨ الفلو للداخلي والخارجي (5 ستيبس)
const FULL_FLOW = ['service', 'appointment', 'patient', 'payment', 'confirmation'];

// ✨ الفلو للأونلاين (4 ستيبس - فيه الموعد جوه الخدمة)
const ONLINE_FLOW = ['service', 'patient', 'payment', 'confirmation'];

const STEPS_TITLES = {
  service: "الخدمة",
  appointment: "الموعد",
  patient: "المريض",
  payment: "الدفع",
  confirmation: "التأكيد",
};

export default function Reservations() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isExternal = type === 'external';
  const isOnline = type === 'online';

  // ✨ اختار الفلو المناسب
  const currentFlow = isOnline ? ONLINE_FLOW : FULL_FLOW;

  const currentSlug = searchParams.get('s') || currentFlow[0];
  const currentStepIndex = currentFlow.indexOf(currentSlug);
  const currentStepNumber = currentStepIndex + 1;
  const selectedServiceId = Number(searchParams.get('svc')) || null;

  // ✨ ============= States محفوظة في الـ Parent =============

  // ستيب الخدمة (الداخلي): sub-step + بيانات
  const [serviceSubStep, setServiceSubStep] = useState(1);
  const [internalServiceDetails, setInternalServiceDetails] = useState({
    service: '',
    type: '',
    branch: ''
  });

  // ستيب الموعد (الداخلي والخارجي)
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    selectedDateId: 1,
    selectedTime: null,
  });

  // بيانات الخدمة الخارجية
  const [externalServiceDetails, setExternalServiceDetails] = useState({
    service: '',
    type: '',
    governorate: '',
    city: '',
    hospital: ''
  });

  // بيانات الخدمة الأونلاين
  const [onlineSubStep, setOnlineSubStep] = useState(1);
  const [onlineServiceDetails, setOnlineServiceDetails] = useState({
    service: '',
    type: '',
    governorate: '',
    city: '',
    hospital: ''
  });
  const [onlineDoctorIndex, setOnlineDoctorIndex] = useState(0);
  const [onlineSelectedDate, setOnlineSelectedDate] = useState(1);
  const [onlineSelectedTime, setOnlineSelectedTime] = useState(null);

  // بيانات المريض (الداخلي)
  const [patientInfo, setPatientInfo] = useState({
    childName: '',
    fatherName: '',
    motherName: '',
    phone: '',
    age: '',
    referringDoctor: '',
  });

  // بيانات المريض (الخارجي/الأونلاين)
  const [externalPatientInfo, setExternalPatientInfo] = useState({
    childName: '',
    fatherName: '',
    motherName: '',
    phone: '',
    age: '',
    referringDoctor: '',
  });

  // بيانات الدفع
  const [paymentData, setPaymentData] = useState({
    selectedMethod: null,
    price: '',
    hasCoupon: false,
    confirmCoupon: false,
    couponCode: '',
  });

  // ✨ ============= نهاية الـ States =============

  const goToStep = (slug) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (slug === currentFlow[0]) {
      newSearchParams.delete('s');
    } else {
      newSearchParams.set('s', slug);
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
      newSearchParams.set('svc', String(serviceId));
      setSearchParams(newSearchParams);
      setServiceSubStep(2); // ينقل للـ sub-step بتاع بيانات الخدمة
    }
  };

  // ✨ زر العودة - يشتغل في كل الحالات
  const handleBack = () => {
    // لو في sub-step داخل ستيب الخدمة (الداخلي)
    if (currentSlug === 'service' && !isExternal && !isOnline && serviceSubStep > 1) {
      setServiceSubStep(serviceSubStep - 1);
      // لو رجع للـ sub-step الأول، شيل svc
      if (serviceSubStep === 2) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('svc');
        setSearchParams(newSearchParams);
      }
      return;
    }

    // لو في الأونلاين subStep > 1
    if (currentSlug === 'service' && isOnline && onlineSubStep > 1) {
      setOnlineSubStep(onlineSubStep - 1);
      return;
    }

    // لو في ستيب غير الأول
    if (currentStepIndex > 0) {
      goToStep(currentFlow[currentStepIndex - 1]);
      return;
    }

    // لو في external/online وفي أول ستيب → ارجع لاختيار النوع
    if (isExternal || isOnline) {
      navigate('/reservations');
      return;
    }

    // لو في الداخلي وفي أول ستيب وفي svc → شيله ارجع لاختيار النوع
    if (selectedServiceId) {
      const newSearchParams = new URLSearchParams();
      setSearchParams(newSearchParams);
      setServiceSubStep(1);
      return;
    }
  };

  // ✨ هل نعرض زر العودة؟
  const showBackButton =
    currentStepIndex > 0 ||
    isExternal ||
    isOnline ||
    selectedServiceId ||
    (currentSlug === 'service' && serviceSubStep > 1);

  return (
    <div className="pb-20">
      <div className={`card mt-10 mb-6`}>
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png"
          className='object-contain'
          width={40}
          height={40}
          alt="reservation icon"
        />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]" onClick={() => navigate('/reservations')}>
          الحجز
        </p>
      </div>

      {/* ✨ Back Button - يظهر دايمًا */}
      {showBackButton && (
        <div
          className="border h-[38.4px] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer hover:bg-(--main-color)/5 transition-colors"
          onClick={handleBack}
        >
          <ChevronRight className="absolute right-3 text-(--main-color)" size={20} />
          <p className='text-white text-center font-bold text-[14px]'>العودة</p>
        </div>
      )}

      {/* ✨ Stepper Header - ديناميكي حسب الفلو */}
      <div
        className='grid mt-3 gap-2 sticky top-20 z-10'
        style={{ gridTemplateColumns: `repeat(${currentFlow.length}, minmax(0, 1fr))` }}
      >
        {currentFlow.map((slug, idx) => {
          const stepNum = idx + 1;
          return (
            <div
              key={slug}
              onClick={() => goToStep(slug)}
              className={`col-span-1 flex flex-col gap-1 rounded-[7px] bg-[linear-gradient(90deg,#242424,#404040)] px-1 py-2 font-bold items-center justify-center shadow-sm transition-all duration-500 ${stepNum > currentStepNumber ? 'opacity-50 pointer-events-none' : 'opacity-100'} ${slug === currentSlug ? 'border border-(--main-color)' : ''}`}
            >
              <div className={`w-[28px] h-[28px] border-[3px] rounded-full flex justify-center items-center text-[12px]
                ${slug === currentSlug ? 'text-(--main-color) border-(--main-color)' : 'text-gray-400 border-gray-400'}
              `}>
                {stepNum}
              </div>
              <p className={`text-[11px] mt-2 text-center font-bold ${slug === currentSlug ? 'text-white' : 'text-gray-400'}`}>
                {STEPS_TITLES[slug]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* ستيب 1: الخدمة */}
        {currentSlug === 'service' && (
          <div className='flex flex-col'>
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

        {/* ✨ ستيب 2: الموعد (للداخلي والخارجي بس) */}
        {currentSlug === 'appointment' && !isOnline && (
          <ReservationAppointment
            goToNextStep={goToNextStep}
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
          />
        )}

        {/* ستيب: المريض */}
        {currentSlug === 'patient' && (
          (isExternal || isOnline) ? (
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
          )
        )}

        {/* ستيب: الدفع */}
        {currentSlug === 'payment' && (
          <ReservationPayment
            goToNextStep={goToNextStep}
            selectedServiceId={selectedServiceId}
            showInstructions={!isOnline}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        )}

        {/* ستيب: التأكيد */}
        {currentSlug === 'confirmation' && (
          <ReservationConfirmation
            goToStep={goToStep}
            showInstructions={!isOnline}
          />
        )}

      </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import ReservationChooseService from './ReservationChooseService';
import ReservationPatientInfo from './ReservationPatientInfo';
import ReservationPayment from './ReservationPayment';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationExternalService from './ReservationExternalService';
import ReservationExternalPatient from './ReservationExternalPatient';
import ReservationOnlineService from './ReservationOnlineService';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';




const steps = [
  {
    id: 1,
    title: "الخدمة",
  },
  {
    id: 2,
    title: "المريض",
  },
  {
    id: 3,
    title: "الدفع"
  },
  {
    id: 4,
    title: "التأكيد"
  }
]

export default function Reservations() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive currentStep and selectedServiceId from URL search parameters
  const currentStep = Number(searchParams.get('step')) || 1;
  const selectedServiceId = Number(searchParams.get('svc')) || null;

  const isExternal = type === 'external';
  const isOnline = type === 'online';

  // Function to handle navigation to a specific step
  const goToStep = (stepNum) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('step', String(stepNum));
    setSearchParams(newSearchParams);
  };

  // Function to handle selecting a service type (used by ReservationChooseService)
  const handleSelectServiceType = (serviceId) => {
    if (serviceId === 2) { // External
      navigate(`/reservations/external?step=1&svc=${serviceId}`);
    } else if (serviceId === 3) { // Online
      navigate(`/reservations/online?step=1&svc=${serviceId}`);
    } else if (serviceId === 1) { // Internal
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('step', '2'); // Go to patient info step
      newSearchParams.set('svc', String(serviceId));
      setSearchParams(newSearchParams);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(-1); // Go back one step in browser history
    } else if (isExternal || isOnline) {
      navigate('/reservations'); // Go back to main service selection if on step 1 of external/online
    } else {
      // If on step 1 of main reservations, no more steps back within this flow.
      // Could navigate to a global home page if desired, but for now, do nothing.
    }
  };
 
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

      {/* Back Button (if needed, can be integrated into a common header component) */}
      {(currentStep > 1 || isExternal || isOnline) && (
        <div className="border h-[38.4px] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer" onClick={handleBack}>
          <ChevronRight className="absolute right-3 text-(--main-color)" size={20} />
          <p className='text-white text-center font-bold text-[14px]'>العودة</p>
        </div>
      )}

      {/* Stepper Header */}
      <div className='grid grid-cols-4 mt-3 gap-2 sticky top-20 z-10'>
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => goToStep(step.id)} // Update step on click
            className={`col-span-1 flex flex-col gap-1 rounded-[7px] bg-[linear-gradient(90deg,#242424,#404040)] px-2 py-2 font-bold items-center justify-center shadow-sm transition-all duration-500 ${step.id > currentStep ? 'opacity-50 pointer-events-none' : 'opacity-100'} ${step.id === currentStep ? 'border border-(--main-color)' : ''}`}
          >
            <div className={`w-[30px] h-[30px] border-3 rounded-full flex justify-center items-center
              ${step.id === currentStep ? 'text-(--main-color) border-(--main-color)' : 'text-gray-400 border-gray-400'}
            `}>
              {step?.id}
            </div>
            <p className={`text-[14px] mt-3 text-center font-bold ${step.id === currentStep ? 'text-white' : 'text-gray-400'}`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {currentStep === 1 && (
          <div className='flex flex-col'>
            {isExternal ? (
              <ReservationExternalService currentStep={currentStep} setSearchParams={setSearchParams} />
            ) : isOnline ? (
              <ReservationOnlineService currentStep={currentStep} setSearchParams={setSearchParams} />
            ) : (
              <ReservationChooseService 
                selectedServiceId={selectedServiceId} 
                currentStep={currentStep}
                setSearchParams={setSearchParams}
                handleSelectServiceType={handleSelectServiceType}
              />
            )}
          </div>
        )}

        {currentStep === 2 && (
          (isExternal || isOnline) ? (
            <ReservationExternalPatient currentStep={currentStep} setSearchParams={setSearchParams} />
          ) : ( // Default to internal patient info if no type specified
            <ReservationPatientInfo currentStep={currentStep} setSearchParams={setSearchParams}/>
          )
        )}

        {currentStep === 3 && (
          <ReservationConfirmation currentStep={currentStep} setSearchParams={setSearchParams} selectedServiceId={selectedServiceId} showInstructions={!isOnline} />
        )}
        {currentStep === 4 && (
          <ReservationConfirmation currentStep={currentStep} setSearchParams={setSearchParams} showInstructions={!isOnline} />
        )}


      </div>
    </div>
  )
}

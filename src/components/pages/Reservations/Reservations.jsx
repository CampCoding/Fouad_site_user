import React, { useEffect, useState } from 'react'
import ReservationChooseService from './ReservationChooseService';
import ReservationPatientInfo from './ReservationPatientInfo';
import ReservationPayment from './ReservationPayment';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationExternalService from './ReservationExternalService';
import ReservationExternalPatient from './ReservationExternalPatient';
import ReservationOnlineService from './ReservationOnlineService';
import { useParams } from 'react-router';




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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);

  const isExternal = type === 'external';
  const isOnline = type === 'online';



 

  return (
    <div className="pb-20">
      <div className={`card mb-6`}>
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png"
          className='object-contain'
          width={40}
          height={40}
          alt="reservation icon"
        />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          الحجز
        </p>
      </div>

      {/* Stepper Header */}
      <div className='grid grid-cols-4 mt-3 gap-2 sticky top-20 z-10'>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`col-span-1 flex flex-col gap-1 rounded-[7px] 
            bg-[linear-gradient(90deg,#242424,#404040)]
            px-2 py-2 font-bold items-center justify-center shadow-sm transition-all duration-500
            ${step.id > currentStep ? 'opacity-50 pointer-events-none' : 'opacity-100'}
            ${step.id === currentStep ? 'border border-(--main-color)' : ''}
            `}
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
              <ReservationExternalService setCurrentStep={setCurrentStep} />
            ) : isOnline ? (
              <ReservationOnlineService setCurrentStep={setCurrentStep} />
            ) : (
              <ReservationChooseService 
                setSelectedService={setSelectedService} 
                selectedService={selectedService} 
                setCurrentStep={setCurrentStep}
              />
            )}
          </div>
        )}

        {currentStep === 2 && (
          isExternal ? (
            <ReservationExternalPatient setCurrentStep={setCurrentStep} />
          ) : (
            <ReservationPatientInfo setCurrentStep={setCurrentStep}/>
          )
        )}

        {currentStep === 3 && (
          <ReservationPayment setCurrentStep={setCurrentStep}/>
        )}
        {currentStep === 4 && (
          <ReservationConfirmation setCurrentStep={setCurrentStep} showInstructions={!isOnline} />
        )}


      </div>
    </div>
  )
}

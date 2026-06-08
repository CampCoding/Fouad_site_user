import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect';

export default function ReservationExternalService({ currentStep, setSearchParams }) {
  const [details, setDetails] = useState({
    service: '',
    type: '',
    governorate: '',
    city: '',
    hospital: ''
  });

  const isContinueEnabled = details.service && details.type && details.governorate && details.city && details.hospital;

  // Function to advance to the next step
  const handleNextStep = () => {
    setSearchParams(prev => {
      prev.set('step', String(currentStep + 1));
      return prev;
    });
  };
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملاء بيانات الخدمة</p>
      </div>

      <div className='flex flex-col gap-3'>
        <CustomSelect 
          placeholder={"الخدمة"} 
          options={[ { value: 'first', label: 'أول مرة' },]} 
          value={details.service} 
          onChange={(val) => setDetails({...details, service: val})} 
        />
        <CustomSelect 
          placeholder={"أول مرة / متابعة"} 
          options={[
            { value: 'first', label: 'أول مرة' },
            { value: 'followup', label: 'متابعة' }
          ]} 
          value={details.type} 
          onChange={(val) => setDetails({...details, type: val})} 
        />
        <CustomSelect 
          placeholder={"المحافظة"} 
          options={[ { value: 'first', label: 'أول مرة' },]} 
          value={details.governorate} 
          onChange={(val) => setDetails({...details, governorate: val})} 
        />
        <CustomSelect 
          placeholder={"المدينة"} 
          options={[ { value: 'first', label: 'أول مرة' },]} 
          value={details.city} 
          onChange={(val) => setDetails({...details, city: val})} 
        />
        <CustomSelect 
          placeholder={"المستشفى / الحضانة"} 
          options={[ { value: 'first', label: 'أول مرة' },]} 
          value={details.hospital} 
          onChange={(val) => setDetails({...details, hospital: val})} 
        />
      </div>

      <button 
        onClick={handleNextStep}
        className={`auth_btn mt-3 ms-auto! ${!isContinueEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isContinueEnabled}
      >
        الاستمرار
      </button>
    </div>
  );
}

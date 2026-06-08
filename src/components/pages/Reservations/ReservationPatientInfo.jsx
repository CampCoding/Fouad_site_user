import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect'
import CustomInput from '../../Common/CustomInput'
import { useSearchParams } from 'react-router'

export default function ReservationPatientInfo({ currentStep, setSearchParams }) {
  const [patientInfo, setPatientInfo] = useState({
    childName: '',
    fatherName: '',
    motherName: '',
    phone: '',
    age: ''
  })

  // Function to advance to the next step
  const handleNextStep = () => {
    setSearchParams(prev => {
      prev.set('step', String(currentStep + 1));
      return prev;
    });
  };

  console.log("Values" , Object.values(patientInfo).some(value => !value));
  return (
    <div className="flex flex-col gap-3">
      <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملأ بيانات المريض </p>
      </div>

      <div className='flex flex-col gap-3'>
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, childName: e.target.value }))} value={patientInfo.childName} placeholder={"اسم الطفل"} />
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, fatherName: e.target.value }))} value={patientInfo.fatherName} placeholder={"اسم الأب"} />
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, motherName: e.target.value }))} value={patientInfo.motherName} placeholder={"اسم الأم"} />
        <CustomInput type='tel' onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))} value={patientInfo.phone} placeholder={"التليفون"} />
        <CustomInput type='number' onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))} value={patientInfo.age} placeholder={"العمر"} />

      </div>

      <button onClick={handleNextStep} disabled={Object.values(patientInfo).some(value => !value)} className="auth_btn disabled:opacity-50 disabled:cursor-not-allowed ms-auto!">للاستمرار</button>
    </div>
  )
}

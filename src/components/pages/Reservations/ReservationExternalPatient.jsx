import React from 'react'
import CustomInput from '../../Common/CustomInput'

export default function ReservationExternalPatient({ goToNextStep, patientInfo, setPatientInfo }) {

  const requiredFields = ['childName', 'fatherName', 'motherName', 'phone', 'age'];
  const isFormValid = requiredFields.every(field => patientInfo[field]?.trim());

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملاء بيانات المريض</p>
      </div>

      <div className='flex flex-col gap-3'>
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, childName: e.target.value }))} value={patientInfo.childName} placeholder={"اسم الطفل"} />
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, fatherName: e.target.value }))} value={patientInfo.fatherName} placeholder={"اسم الأب"} />
        <CustomInput onChange={(e) => setPatientInfo(prev => ({ ...prev, motherName: e.target.value }))} value={patientInfo.motherName} placeholder={"اسم الأم"} />
        <CustomInput type="tel" onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))} value={patientInfo.phone} placeholder={"التليفون"} />
        <CustomInput type="number" onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))} value={patientInfo.age} placeholder={"العمر"} />

        <CustomInput
          onChange={(e) => setPatientInfo(prev => ({ ...prev, referringDoctor: e.target.value }))}
          value={patientInfo.referringDoctor}
          placeholder={"اسم الطبيب المحول (اختياري)"}
        />
      </div>

      <button onClick={goToNextStep} disabled={!isFormValid} className="auth_btn disabled:opacity-50 disabled:cursor-not-allowed mt-3 ms-auto!">للاستمرار</button>
    </div>
  );
}
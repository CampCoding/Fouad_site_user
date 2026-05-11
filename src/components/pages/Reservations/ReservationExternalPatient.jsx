import React from 'react'
import CustomInput from '../../Common/CustomInput'
import CustomSelect from '../../Common/CustomSelect'

export default function ReservationExternalPatient({ setCurrentStep }) {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملاء بيانات المريض</p>
      </div>

      <div className='flex flex-col gap-3'>
        <CustomInput placeholder={"اسم الطفل"} />
        <CustomInput placeholder={"اسم الأب"} />
        <CustomInput placeholder={"اسم الأم"} />
        <CustomInput placeholder={"التليفون"} />
        <CustomSelect 
          placeholder={"القسم"} 
          options={[]} 
        />
      </div>

      <button onClick={() => setCurrentStep(3)} className="auth_btn mt-3 ms-auto!">للاستمرار</button>
    </div>
  );
}

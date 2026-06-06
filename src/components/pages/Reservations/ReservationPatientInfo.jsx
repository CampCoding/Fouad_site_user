import React from 'react'
import CustomSelect from '../../Common/CustomSelect'
import CustomInput from '../../Common/CustomInput'

export default function ReservationPatientInfo({setCurrentStep}) {
  return (
     <div className="flex flex-col gap-3">
              <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
                <p className='text-white text-center font-bold'>إملأ بيانات المريض </p>
              </div>
    
               <div className='flex flex-col gap-3'>
                      <CustomInput placeholder={"اسم الطفل"} />
                      <CustomInput placeholder={"اسم الأب"} />
                      <CustomInput placeholder={"اسم الأم"} />
                      <CustomInput placeholder={"التليفون"} />
                      <CustomInput placeholder={"العمر"} />
                   
                    </div>

              <button onClick={() => setCurrentStep(3)} className="auth_btn ms-auto!">للاستمرار</button>
            </div>
  )
}

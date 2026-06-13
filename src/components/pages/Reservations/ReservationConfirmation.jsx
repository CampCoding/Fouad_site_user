import { CircleCheckBig } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';

export default function ReservationConfirmation({ currentStep, setSearchParams, selectedServiceId, showInstructions = true }) {

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationDone, setReservationDone] = useState(false);
  const navigate = useNavigate();
  
  const location = useLocation();
  const isExternalReservation = location.pathname == "/reservations/external"

  const internal_data = [
    { label: "نوع الخدمة", value: "جلسة تخاطب" },
    { label: "الخدمة", value: "الكشف" },
    { label: "الفرع", value: "فرع المعادي" },
    { label: "الطبيب المعالج", value: "د. محمد علي" },
    { label: "اليوم", value: "الأحد" },
    { label: "التاريخ", value: "2024-05-12" },
    { label: "الساعة", value: "10:00 صباحاً" },
    { label: "التليفون", value: "01234567890" },
    { label: "اسم الطفل", value: "أحمد محمد" },
    { label: "اسم الأب", value: "محمد علي" },
    { label: "طريقة الدفع", value: "إنستاباي" },
    { label: "السعر", value: "500 ج.م" },
  ];

  const externtal_data = [
    { label: "نوع الخدمة", value: "جلسة تخاطب" },
    { label: "الخدمة", value: "الكشف" },
    { label: "المحافظه", value: "الغربية" },
    { label: "المدينة", value: "طنطا" },
    { label: "المستشفي", value: "دار القمة" },
    { label: "التاريخ", value: "2024-05-12" },
    { label: "خلال مدة", value: ""},
    { label: "التليفون", value: "01234567890" },
    { label: "اسم الطفل", value: "أحمد محمد" },
    { label: "اسم الأب", value: "محمد علي" },
    { label: "طريقة الدفع", value: "إنستاباي" },
    { label: "السعر", value: "500 ج.م" },
  ];

  const data = useMemo(() =>  {
    return isExternalReservation ? externtal_data : internal_data
  } , [location.pathname])

  // Function to go to a specific step
  const goToStep = (stepNum) => {
    setSearchParams(prev => {
      prev.set('step', String(stepNum));
      return prev;
    });
  };
  return (
    <div className="flex flex-col  gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">


      {!isConfirmed ?
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="border h-[40px] flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>راجع بيانات الحجز</p>
          </div>

          {/* Data Grid */}
          <div className="rounded-[8px] mt-4 overflow-hidden  shadow-xl">
            <div
              dir='ltr'
              className="grid grid-cols-4 gap-2">
              {Array.from({ length: data.length / 2 }).map((_, rowIndex) => {
                const itemRight = data[rowIndex * 2];
                const itemLeft = data[rowIndex * 2 + 1];

                return (
                  <React.Fragment key={rowIndex}>
                    {/* Left Side Pair (Col 1 & 2) */}

                    <div className={`col-span-1 p-2 border  rounded-lg border-[#232323] text-[12px] text-center bg-transparent text-white flex items-center justify-center`}>
                      {itemLeft.value}
                    </div>
                    <div className={`col-span-1 p-2  border rounded-lg  border-[#232323] text-white text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center`}>
                      {itemLeft.label}
                    </div>


                    {/* Right Side Pair (Col 3 & 4) */}
                    <div className={`col-span-1 p-2  rounded-lg border  border-[#232323] text-white text-[12px] text-center bg-transparent flex items-center justify-center`}>
                      {itemRight.value}
                    </div>
                    <div className={`col-span-1 p-2  border rounded-lg border-[#232323] text-white text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center 
                  `}>
                      {itemRight.label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <button
              onClick={() => goToStep(1)}
              className="auth_btn w-full! py-3! font-bold! text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
            >
              تعديل الحجز
            </button>
            <button
              onClick={() => setIsConfirmed(true)}
              className="auth_btn w-full! py-3! font-bold! text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
            >
              تأكيد الحجز
            </button>
          </div>
        </div> : reservationDone ?
          <div className="flex flex-col justify-center items-center gap-1">
            {/* Header */}
            <div className="border h-[40px] w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
              <p className='text-white text-center font-bold'>تم تأكيد الحجز </p>
            </div>

            <CircleCheckBig
              size={60} color="#d49a3e" className='my-5' />
            {/* Data Grid */}
            <div className="rounded-[8px] overflow-hidden  shadow-xl">
              <div
                dir='ltr'
                className="grid grid-cols-4 gap-2">
                {Array.from({ length: data.length / 2 }).map((_, rowIndex) => {
                  const itemRight = data[rowIndex * 2];
                  const itemLeft = data[rowIndex * 2 + 1];

                  return (
                    <React.Fragment key={rowIndex}>
                      {/* Left Side Pair (Col 1 & 2) */}

                      <div className={`col-span-1 p-2 border  rounded-lg border-[#232323] text-[12px] text-center bg-transparent text-white flex items-center justify-center`}>
                        {itemLeft.value}
                      </div>
                      <div className={`col-span-1 p-2  border rounded-lg  border-[#232323] text-white text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center`}>
                        {itemLeft.label}
                      </div>


                      {/* Right Side Pair (Col 3 & 4) */}
                      <div className={`col-span-1 p-2  rounded-lg border  border-[#232323] text-white text-[12px] text-center bg-transparent flex items-center justify-center`}>
                        {itemRight.value}
                      </div>
                      <div className={`col-span-1 p-2  border rounded-lg border-[#232323] text-white text-[10px] font-bold text-center bg-[#232323]! flex items-center justify-center 
                  `}>
                        {itemRight.label}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className={`grid ${showInstructions ? 'grid-cols-3' : 'grid-cols-2'} w-full! gap-4 mt-2`}>
              <button
                onClick={() => goToStep(3)}
                className="auth_btn w-full! py-3! font-bold! text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
              >
                تعديل الحجز
              </button>
              <button
                className="auth_btn w-full! py-3! font-bold! text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
              >
                للإلغاء الحجز
              </button>
              {showInstructions && (
                <button
                  onClick={() => navigate(`/reservations-instruction?svc=${isExternalReservation ? "2" :"1"}`)}
                  className="auth_btn w-full! py-3! font-bold! text-sm shadow-[0_0_15px_rgba(var(--main-bg-rgb),0.2)]"
                >
                  للتعليمات
                </button>
              )}
            </div>

          </div>
          : <div className="flex flex-col items-center justify-center gap-2">
            <div className="border h-[40px] w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
              <p className='text-white text-xs px-2 text-center font-semibold'>تم تلقي طلبكم وسيتم إرسال رسالة تأكيد الحجز ف اقرب وقت</p>
            </div>

            <CircleCheckBig
              onClick={() => setReservationDone(true)}
              size={60} color="#d49a3e" className='my-5' />
          </div>}
    </div>
  );
}

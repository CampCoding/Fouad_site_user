import React from 'react'
import CustomSelect from '../../Common/CustomSelect';

// ✨ خدمة واحدة دلوقتي
const serviceOptions = [
  { value: 'pediatric_checkup', label: 'كشف أطفال' },
];

export default function ReservationExternalService({ goToNextStep, details, setDetails }) {

  const isContinueEnabled = details.service && details.type && details.governorate && details.city && details.hospital;

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملاء بيانات الخدمة</p>
      </div>

      <div className='flex flex-col gap-3'>
        <CustomSelect
          placeholder={"الخدمة"}
          options={serviceOptions}
          value={details.service}
          onChange={(val) => setDetails({ ...details, service: val })}
        />
        <CustomSelect
          placeholder={"أول مرة / متابعة"}
          options={[
            { value: 'first', label: 'أول مرة' },
            { value: 'followup', label: 'متابعة' }
          ]}
          value={details.type}
          onChange={(val) => setDetails({ ...details, type: val })}
        />
        <CustomSelect
          placeholder={"المحافظة"}
          options={[{ value: 'cairo', label: 'القاهرة' }]}
          value={details.governorate}
          onChange={(val) => setDetails({ ...details, governorate: val })}
        />
        <CustomSelect
          placeholder={"المدينة"}
          options={[{ value: 'nasr_city', label: 'مدينة نصر' }]}
          value={details.city}
          onChange={(val) => setDetails({ ...details, city: val })}
        />
        <CustomSelect
          placeholder={"المستشفى / الحضانة"}
          options={[{ value: 'hosp1', label: 'مستشفى السلام' }]}
          value={details.hospital}
          onChange={(val) => setDetails({ ...details, hospital: val })}
        />
      </div>

      <button
        onClick={goToNextStep}
        className={`auth_btn mt-3 ms-auto! ${!isContinueEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isContinueEnabled}
      >
        الاستمرار
      </button>
    </div>
  );
}
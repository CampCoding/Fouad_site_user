import React from 'react'
import CustomSelect from '../../Common/CustomSelect';

const services = [
  { id: 1, name: "خدمات داخلية", description: "(داخل فروعنا)" },
  { id: 2, name: "خدمات خارجية", description: "(في المستشفيات والحضانات)" },
  { id: 3, name: "خدمات أونلاين", description: "(عبر الانترنت)" }
];

// ✨ خدمة واحدة دلوقتي
const serviceOptions = [
  { value: 'pediatric_checkup', label: 'كشف أطفال' },
];

const typeOptions = [
  { value: 'first', label: 'أول مرة' },
  { value: 'followup', label: 'متابعة' },
];

const branchOptions = [
  { value: 'branch1', label: 'فرع مدينة نصر' },
  { value: 'branch2', label: 'فرع التجمع الخامس' },
  { value: 'branch3', label: 'فرع المعادي' },
];

export default function ReservationChooseService({
  selectedServiceId,
  handleSelectServiceType,
  goToNextStep,
  subStep,
  setSubStep,
  details,
  setDetails,
}) {

  const handleContinue = () => {
    if (subStep === 2) {
      if (details.service && details.type && details.branch) {
        goToNextStep();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Sub-step 1: اختيار نوع الخدمة */}
      {subStep === 1 && (
        <div>
          <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>اختار نوع الخدمة</p>
          </div>
          <div className='flex flex-col gap-3'>
            {services.map((service) => (
              <div
                onClick={() => handleSelectServiceType(service.id)}
                key={service.id}
                className={`flex border bg-[#171717] p-1 rounded-[4px] text-white gap-8 items-center cursor-pointer transition-all duration-300 
                    ${selectedServiceId == service.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-[#232323]!'}`}
              >
                <p>{service.name}</p>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-step 2: بيانات الخدمة (للداخلي فقط) */}
      {subStep === 2 && selectedServiceId === 1 && (
        <div className="flex flex-col gap-3">
          <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>إملأ بيانات الخدمة </p>
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
              options={typeOptions}
              value={details.type}
              onChange={(val) => setDetails({ ...details, type: val })}
            />
            <CustomSelect
              placeholder={"الفرع"}
              options={branchOptions}
              value={details.branch}
              onChange={(val) => setDetails({ ...details, branch: val })}
            />
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!(details.service && details.type && details.branch)}
            className={`auth_btn mt-3 ms-auto! ${!(details.service && details.type && details.branch) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            الاستمرار
          </button>
        </div>
      )}
    </div>
  )
}
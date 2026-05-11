import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect';
import { useNavigate } from 'react-router';


const services = [
  {
    id: 1,
    name: "خدمات داخلية",
    description: "(داخل فروعنا)",
  },
  {
    id: 2,
    name: "خدمات خارجية",
    description: "(في المستشفيات والحضانات)",
  },
  {
    id: 3,
    name: "خدمات أونلاين",
    description: "(عبر الانترنت)",
  }
];

const serviceOptions = [
  { value: 'service1', label: 'كشف نساء' },
  { value: 'service2', label: 'كشف أطفال' },
  { value: 'service3', label: 'سونار' },
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

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    let label = '';
    if (i === 0) label = 'اليوم';
    else if (i === 1) label = 'غدا';
    else label = d.toLocaleDateString('ar-EG', { weekday: 'long' });
    const formattedDate = `${d.getDate()}/${d.getMonth() + 1}`;
    dates.push({ id: i + 1, label, displayDate: formattedDate, fullDate: d.toISOString().split('T')[0] });
  }
  return dates;
};

const times = [
  { time: "14:00", reserved: false },
  { time: "14:30", reserved: false },
  { time: "15:00", reserved: false },
  { time: "15:30", reserved: true },
  { time: "16:00", reserved: false },
  { time: "16:30", reserved: false },
  { time: "17:00", reserved: true },
  { time: "17:30", reserved: false },
];


export default function ReservationChooseService({setCurrentStep , setSelectedService, selectedService }) {
  const navigate = useNavigate();
  const [subStep, setSubStep] = useState(1);

  const [details, setDetails] = useState({ service: '', type: '', branch: '' });
  const [selectedDate, setSelectedDate] = useState(1); // Today by default
  const [selectedTime, setSelectedTime] = useState(null);
  
  const dates = generateDates();

  const handleContinue = () => {
    if (subStep === 1) {
      if (selectedService === 2) {
        navigate('/reservations/external');
      } else if (selectedService === 3) {
        navigate('/reservations/online');
      } else if (selectedService) {
        setSubStep(2);
      }
    } else if (subStep === 2) {

      if (details.service && details.type && details.branch) setSubStep(3);
    } else if (subStep === 3) {
      if (selectedDate && selectedTime) setCurrentStep(2);
    }
  };

  const isContinueEnabled = () => {
    if (subStep === 1) return !!selectedService;
    if (subStep === 2) return details.service && details.type && details.branch;
    if (subStep === 3) return selectedDate && selectedTime;
    return false;
  };

  return (
    <div className="flex flex-col gap-3">
      {subStep === 1 ? (
        <div>
          <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>اختار نوع الخدمة</p>
          </div>
          <div className='flex flex-col gap-3'>
            {services.map((service) => (
              <div
                onClick={() => setSelectedService(service.id)}
                key={service.id}
                className={`flex border bg-[#171717] p-1 rounded-[4px] text-white gap-8 items-center cursor-pointer transition-all duration-300 
                    ${selectedService == service.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-[#232323]!'}`}
              >
                <p>{service.name}</p>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : subStep === 2 ? (
        <div className="flex flex-col gap-3">
          <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>إملأ بيانات الخدمة </p>
          </div>

          <div className='flex flex-col gap-3'>
            <CustomSelect 
              placeholder={"الخدمة"} 
              options={serviceOptions} 
              value={details.service} 
              onChange={(val) => setDetails({...details, service: val})} 
            />
            <CustomSelect 
              placeholder={"أول مرة / متابعة"} 
              options={typeOptions} 
              value={details.type} 
              onChange={(val) => setDetails({...details, type: val})} 
            />
            <CustomSelect 
              placeholder={"الفرع"} 
              options={branchOptions} 
              value={details.branch} 
              onChange={(val) => setDetails({...details, branch: val})} 
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
            <p className='text-white text-center font-bold'>إختار ميعاد الخدمة</p>
          </div>

          {/* Date Scroller */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((date) => (
              <div
                key={date.id}
                onClick={() => setSelectedDate(date.id)}
                className={`flex-shrink-0 flex gap-2 items-center justify-center min-w-[70px] h-[35px] rounded-[4px] border cursor-pointer transition-all
                  ${selectedDate === date.id 
                    ? 'border-(--main-bg-color) bg-(--main-bg-color) text-white' 
                    : 'border-(--main-color) bg-[#171717] text-gray-400 hover:border-(--main-color)'}`}
              >
                <p className="text-xs font-noraml">{date.label}</p>
                <p className="text-xs">{date.displayDate}</p>
              </div>
            ))}
          </div>

          {/* Time Picker Grid */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {times.map((slot, index) => (
              <div
                key={index}
                onClick={() => !slot.reserved && setSelectedTime(slot.time)}
                className={`h-[40px] flex items-center justify-center rounded-[4px] border text-xs font-bold transition-all
                  ${slot.reserved 
                    ? 'bg-[#2a1313] border-[#442222] text-white cursor-not-allowed' 
                    : selectedTime === slot.time 
                      ? 'border-(--main-bg-color) bg-(--main-bg-color) text-white' 
                      : 'border-[#232323] bg-[#171717] text-white hover:border-(--main-color)'}`}
              >
                {slot.reserved ? 'محجوز' : slot.time}
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={handleContinue}
        className={`auth_btn mt-3 ms-auto! ${!isContinueEnabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isContinueEnabled()}
      >
        الاستمرار
      </button>
    </div>
  )
}

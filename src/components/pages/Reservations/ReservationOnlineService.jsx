import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: "أ.د / أحمد سمير",
    specialty: "استشاري طب الأطفال",
    experience: "خبرة أكثر من 15 سنوات في تشخيص وعلاج أمراض قلب الأطفال، وزميل الجمعية المصرية لقلب الأطفال.",
    price: 500,
    img: "/images/11.png"
  },
  {
    id: 2,
    name: "أ.د / سارة محمد",
    specialty: "استشاري قلب الأطفال",
    experience: "متخصصة في موجات صدى الصوت على القلب (السونار) للأطفال وحديثي الولادة.",
    price: 600,
    img: "/images/11.png"
  },
  {
    id: 3,
    name: "د / محمود حسن",
    specialty: "أخصائي طب الأطفال",
    experience: "خبرة في متابعة الحالات الحرجة للأطفال في العناية المركزة لحديثي الولادة.",
    price: 400,
    img: "/images/11.png"
  }
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

export default function ReservationOnlineService({ currentStep, setSearchParams }) {
  const [subStep, setSubStep] = useState(1);
  const [details, setDetails] = useState({
    service: '',
    type: '',
    governorate: '',
    city: '',
    hospital: ''
  });
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);

  const currentDoctor = doctors[currentDoctorIndex];

  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };


  const dates = generateDates();

  const isFormEnabled = details.service && details.type && details.governorate && details.city && details.hospital;

  // Function to advance to the next step
  const handleNextStep = () => {
    setSearchParams(prev => {
      prev.set('step', String(currentStep + 1));
      return prev;
    });
  };
  // Sub-step 1: Fill Service Data
  if (subStep === 1) {
    return (
      <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
          <p className='text-white text-center font-bold'>إملاء بيانات الخدمة</p>
        </div>
        <div className='flex flex-col gap-3'>
          <CustomSelect 
            placeholder={"الخدمة"} 
            options={[{ value: 'online_consult', label: 'استشارة أونلاين' }]} 
            value={details.service} 
            onChange={(val) => setDetails({...details, service: val})} 
          />
          <CustomSelect 
            placeholder={"أول مرة / متابعة"} 
            options={[{ value: 'first', label: 'أول مرة' }, { value: 'followup', label: 'متابعة' }]} 
            value={details.type} 
            onChange={(val) => setDetails({...details, type: val})} 
          />
          <CustomSelect 
            placeholder={"المحافظة"} 
            options={[{ value: 'cairo', label: 'القاهرة' }]} 
            value={details.governorate} 
            onChange={(val) => setDetails({...details, governorate: val})} 
          />
          <CustomSelect 
            placeholder={"المدينة"} 
            options={[{ value: 'nasr_city', label: 'مدينة نصر' }]} 
            value={details.city} 
            onChange={(val) => setDetails({...details, city: val})} 
          />
          <CustomSelect 
            placeholder={"المستشفى / الحضانة"} 
            options={[{ value: 'hosp1', label: 'مستشفى السلام' }]} 
            value={details.hospital} 
            onChange={(val) => setDetails({...details, hospital: val})} 
          />
        </div>
        <button 
          onClick={() => setSubStep(2)} // This is an internal sub-step, not a main step
          disabled={!isFormEnabled}
          className={`auth_btn mt-3 ms-auto! ${!isFormEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          الاستمرار
        </button>
      </div>
    );
  }

  // Sub-step 2: Doctor Card
  if (subStep === 2) {
    return (
      <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
          <p className='text-white text-center font-bold'>الطبيب</p>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={prevDoctor}
            className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#232323] border border-white/5 flex justify-center items-center text-white/50 hover:text-(--main-color) hover:border-(--main-color) transition-all shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextDoctor}
            className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#232323] border border-white/5 flex justify-center items-center text-white/50 hover:text-(--main-color) hover:border-(--main-color) transition-all shadow-xl"
          >
            <ChevronRight size={20} />
          </button>

          {/* Doctor Card */}
          <div key={currentDoctor.id} className="bg-[#171717] border border-[#232323] rounded-[12px] p-6 flex flex-col items-center gap-4 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-(--main-color)/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="w-full h-full  p-1 overflow-hidden bg-[#232323]">
              <img 
                src={currentDoctor.img} 
                alt={currentDoctor.name} 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-white font-bold text-lg">{currentDoctor.name}</h3>
              <p className="text-(--main-color) text-sm font-medium">{currentDoctor.specialty}</p>
              <p className="text-white/60 text-[11px] mt-2 leading-relaxed max-w-[250px] min-h-[48px]">
                {currentDoctor.experience}
              </p>
            </div>

            <div className="flex items-center gap-1 my-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-(--main-color) text-(--main-color)" />)}
            </div>

            <div className="bg-[#232323] px-6 py-2 rounded-full border border-white/5 flex items-center gap-2">
              <span className="text-(--main-color) text-xs font-bold">قيمة الاستشارة: {currentDoctor.price} جنيه</span>
            </div>

            <button onClick={() => setSubStep(3)} className="auth_btn w-full mt-4 py-3 font-bold shadow-lg">حدد موعد</button> {/* This is an internal sub-step, not a main step */}
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {doctors.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentDoctorIndex ? 'w-6 bg-(--main-color)' : 'w-2 bg-[#232323]'}`}
              />
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Sub-step 3: Date/Time Picker
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="border h-[38.4px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إختار ميعاد الخدمة</p>
      </div>

      {/* Date Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {dates.map((date) => (
          <div
            key={date.id}
            onClick={() => setSelectedDate(date.id)}
            className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[75px] h-[55px] rounded-[6px] border cursor-pointer transition-all
              ${selectedDate === date.id 
                ? 'border-(--main-bg-color) bg-(--main-bg-color) text-white shadow-lg' 
                : 'border-[#232323] bg-[#171717] text-gray-400 hover:border-(--main-color)'}`}
          >
            <p className="text-[10px] font-medium uppercase">{date.label}</p>
            <p className="text-xs font-bold">{date.displayDate}</p>
          </div>
        ))}
      </div>

      {/* Time Picker Grid */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {times.map((slot, index) => (
          <div
            key={index}
            onClick={() => !slot.reserved && setSelectedTime(slot.time)}
            className={`h-[42px] flex items-center justify-center rounded-[6px] border text-xs font-bold transition-all
              ${slot.reserved 
                ? 'bg-[#2a1313] border-[#442222] text-white/30 cursor-not-allowed' 
                : selectedTime === slot.time 
                  ? 'border-(--main-bg-color) bg-(--main-bg-color) text-white shadow-md' 
                  : 'border-[#232323] bg-[#171717] text-white hover:border-(--main-color)'}`}
          >
            {slot.reserved ? 'محجوز' : slot.time}
          </div>
        ))}
      </div>

      <button 
        onClick={handleNextStep}
        disabled={!selectedTime}
        className={`auth_btn mt-6 ms-auto! ${!selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        الاستمرار
      </button>
    </div>
  );
}

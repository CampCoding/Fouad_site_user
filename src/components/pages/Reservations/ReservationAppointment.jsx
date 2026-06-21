import React from 'react';
import CustomSelect from '../../Common/CustomSelect';
import { Stethoscope, Calendar, Clock } from 'lucide-react';

const doctorOptions = [
    { value: 'mahmoud_shabana', label: 'د / أحمد شبانة' },
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

export default function ReservationAppointment({ goToNextStep, appointmentData, setAppointmentData }) {
    const dates = generateDates();
    const { doctor, selectedDateId, selectedTime } = appointmentData;

    const isReady = doctor && selectedDateId && selectedTime;

    return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="border h-[38.4px] mb-2 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
                <p className='text-white text-center font-bold'>اختر الطبيب والموعد</p>
            </div>

            {/* اختيار الطبيب */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 px-1">
                    <Stethoscope size={13} className="text-(--main-color)" />
                    <p className="text-(--main-color) text-[11px] font-bold">الطبيب المعالج</p>
                </div>
                <CustomSelect
                    placeholder="اختر الطبيب"
                    options={doctorOptions}
                    value={doctor}
                    onChange={(val) => setAppointmentData({ ...appointmentData, doctor: val })}
                />
            </div>

            {/* اختيار التاريخ */}
            {doctor && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-1.5 px-1">
                        <Calendar size={13} className="text-(--main-color)" />
                        <p className="text-(--main-color) text-[11px] font-bold">اختر التاريخ</p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {dates.map((date) => (
                            <div
                                key={date.id}
                                onClick={() => setAppointmentData({ ...appointmentData, selectedDateId: date.id, selectedTime: null })}
                                className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[70px] h-[50px] rounded-[6px] border cursor-pointer transition-all
                  ${selectedDateId === date.id
                                        ? 'border-(--main-color) bg-(--main-color)/15 text-white shadow-lg'
                                        : 'border-[#232323] bg-[#171717] text-gray-400 hover:border-(--main-color)/50'}`}
                            >
                                <p className="text-[10px] font-medium">{date.label}</p>
                                <p className="text-[11px] font-bold">{date.displayDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* اختيار الوقت */}
            {doctor && selectedDateId && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-1.5 px-1">
                        <Clock size={13} className="text-(--main-color)" />
                        <p className="text-(--main-color) text-[11px] font-bold">اختر الوقت</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {times.map((slot, index) => (
                            <div
                                key={index}
                                onClick={() => !slot.reserved && setAppointmentData({ ...appointmentData, selectedTime: slot.time })}
                                className={`h-[38px] flex items-center justify-center rounded-[6px] border text-[11px] font-bold transition-all cursor-pointer
                  ${slot.reserved
                                        ? 'bg-[#2a1313] border-[#442222] text-white/30 cursor-not-allowed'
                                        : selectedTime === slot.time
                                            ? 'border-(--main-color) bg-(--main-color)/20 text-white shadow-md'
                                            : 'border-[#232323] bg-[#171717] text-white hover:border-(--main-color)/50'}`}
                            >
                                {slot.reserved ? 'محجوز' : slot.time}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ملخص الاختيار */}
            {isReady && (
                <div className="border border-(--main-color)/40 bg-(--main-color)/10 rounded-md p-3 animate-in fade-in duration-300">
                    <p className="text-white/60 text-[10px] mb-1">ملخص الموعد:</p>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
                            <p className="text-white/40 text-[9px]">الطبيب</p>
                            <p className="text-(--main-color) text-[10px] font-bold mt-0.5 text-center truncate w-full">
                                {doctorOptions.find(d => d.value === doctor)?.label}
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
                            <p className="text-white/40 text-[9px]">التاريخ</p>
                            <p className="text-white text-[10px] font-bold mt-0.5">
                                {dates.find(d => d.id === selectedDateId)?.displayDate}
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-[#0d0d0d] rounded p-1.5">
                            <p className="text-white/40 text-[9px]">الوقت</p>
                            <p className="text-(--main-color) text-[10px] font-bold mt-0.5">{selectedTime}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* زر الاستمرار */}
            <button
                onClick={goToNextStep}
                disabled={!isReady}
                className={`auth_btn mt-2 ms-auto! ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                الاستمرار
            </button>
        </div>
    );
}
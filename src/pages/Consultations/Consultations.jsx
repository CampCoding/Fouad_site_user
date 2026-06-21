import React, { useState, useMemo } from 'react';
import {
    MessageCircleQuestion,
    ChevronDown,
    Phone,
    Video,
    MessageSquare,
    Calendar,
    CheckCircle2,
} from 'lucide-react';

const DOCTORS = [
    {
        id: 1,
        name: 'دكتور احمد شبانة',
        specialty: 'استشاري أمراض القلب',
        price: '100',
    },
];

// أنواع الاستشارة
const CONSULTATION_TYPES = [
    {
        id: 'phone',
        name: 'استشارة هاتفية',
        icon: Phone,
        available: true,
    },
    {
        id: 'video',
        name: 'استشارة فيديو',
        icon: Video,
        available: true,
    },
    {
        id: 'chat',
        name: 'شات من داخل التطبيق',
        icon: MessageSquare,
        available: false,
    },
];

const generateDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        let label;
        if (i === 0) label = 'اليوم';
        else if (i === 1) label = 'غدًا';
        else label = dayNames[date.getDay()];

        days.push({
            id: i,
            label,
            date: `${date.getDate()}/${date.getMonth() + 1}`,
            fullDate: date,
        });
    }
    return days;
};

const generateSlots = (dayIndex) => {
    const slots = [];
    const startHour = 14;
    const endHour = 22;

    const bookedSlotsPerDay = {
        0: [2, 5, 9],
        1: [0, 4, 7, 11],
        2: [3, 6, 10],
        3: [1, 8, 12],
        4: [2, 5, 9, 13],
        5: [0, 4, 7],
        6: [3, 6, 10, 14],
    };

    const bookedIndexes = bookedSlotsPerDay[dayIndex] || [];

    let slotIndex = 0;
    for (let h = startHour; h < endHour; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hour12 = h > 12 ? h - 12 : h;
            const period = h >= 12 ? 'م' : 'ص';
            const timeStr = `${hour12}:${m === 0 ? '00' : m} ${period}`;

            slots.push({
                id: `${dayIndex}-${h}-${m}`,
                time: timeStr,
                isBooked: bookedIndexes.includes(slotIndex),
            });

            slotIndex++;
        }
    }
    return slots;
};

export default function Consultations() {
    const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
    const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState(CONSULTATION_TYPES[0]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [activeDay, setActiveDay] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const days = useMemo(() => generateDays(), []);
    const slots = useMemo(() => generateSlots(activeDay), [activeDay]);

    const handleBook = () => {
        if (!selectedSlot) {
            toast.error('من فضلك اختر ميعاد');
            return;
        }
        setShowConfirm(true);
    };

    const confirmBooking = () => {
        console.log({
            doctor: selectedDoctor,
            type: selectedType,
            day: days[activeDay],
            slot: selectedSlot,
        });

        toast.success('تم حجز الاستشارة بنجاح! سيتم التواصل معك في الميعاد المحدد');

        setSelectedSlot(null);
        setShowConfirm(false);
    };
    const TypeIcon = selectedType.icon;

    return (
        <div className="py-10 mx-auto">
            <div className="card mb-6">
                <MessageCircleQuestion size={40} className="text-(--main-color)" />
                <p className="font-bold text-[17px] text-[#eee]">استشارات</p>
            </div>

            <div className="flex flex-col gap-[9.5px] px-1">
                {/* ===== Doctor Selection ===== */}
                <div className="bg-[#171717] border border-(--main-color) rounded-md p-3">
                    <p className="text-white/60 text-[12px] mb-2">الطبيب المحوّل إليه</p>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowDoctorDropdown(!showDoctorDropdown);
                                setShowTypeDropdown(false);
                            }}
                            className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] border border-(--main-color)/40 rounded-md hover:border-(--main-color) transition-colors"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-white font-bold text-[14px]">
                                    {selectedDoctor.name}
                                </span>
                                <span className="text-(--main-color) text-[11px]">
                                    {selectedDoctor.specialty}
                                </span>
                            </div>
                            <ChevronDown
                                size={20}
                                className={`text-(--main-color) transition-transform ${showDoctorDropdown ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {showDoctorDropdown && (
                            <div className="absolute top-full mt-1 left-0 right-0 bg-[#0d0d0d] border border-(--main-color) rounded-md z-10 overflow-y-auto max-h-[200px]">
                                {DOCTORS.map((doc) => (
                                    <button
                                        key={doc.id}
                                        onClick={() => {
                                            setSelectedDoctor(doc);
                                            setShowDoctorDropdown(false);
                                        }}
                                        className="w-full text-right p-3 hover:bg-white/5 transition-colors flex flex-col items-start border-b border-white/5 last:border-0"
                                    >
                                        <span className="text-white text-[13px] font-bold">
                                            {doc.name}
                                        </span>
                                        <span className="text-(--main-color) text-[11px]">
                                            {doc.specialty}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== Consultation Type Selection ===== */}
                <div className="bg-[#171717] border border-(--main-color) rounded-md p-3">
                    <p className="text-white/60 text-[12px] mb-2">نوع الاستشارة</p>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowTypeDropdown(!showTypeDropdown);
                                setShowDoctorDropdown(false);
                            }}
                            className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] border border-(--main-color)/40 rounded-md hover:border-(--main-color) transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <TypeIcon size={18} className="text-(--main-color)" />
                                <span className="text-white font-bold text-[14px]">
                                    {selectedType.name}
                                </span>
                            </div>
                            <ChevronDown
                                size={20}
                                className={`text-(--main-color) transition-transform ${showTypeDropdown ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {showTypeDropdown && (
                            <div className="absolute top-full mt-1 left-0 right-0 bg-[#0d0d0d] border border-(--main-color) rounded-md z-10 overflow-y-auto max-h-[200px]">
                                {CONSULTATION_TYPES.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={type.id}
                                            disabled={!type.available}
                                            onClick={() => {
                                                if (!type.available) return;
                                                setSelectedType(type);
                                                setShowTypeDropdown(false);
                                            }}
                                            className={`w-full flex items-center justify-between p-3 transition-colors border-b border-white/5 last:border-0 ${type.available
                                                ? 'hover:bg-white/5 cursor-pointer'
                                                : 'cursor-not-allowed opacity-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    size={16}
                                                    className={
                                                        type.available
                                                            ? 'text-(--main-color)'
                                                            : 'text-white/40'
                                                    }
                                                />
                                                <span
                                                    className={`text-[13px] font-bold ${type.available ? 'text-white' : 'text-white/50'
                                                        }`}
                                                >
                                                    {type.name}
                                                </span>
                                            </div>
                                            {!type.available && (
                                                <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-2 py-1 rounded">
                                                    غير متاح حاليًا
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== Consultation Info ===== */}
                <div className="bg-[#171717] border border-(--main-color)/40 rounded-md p-3 flex items-center justify-center gap-3">
                    <TypeIcon size={20} className="text-(--main-color)" />
                    <p className="text-white text-[14px] font-bold">
                        {selectedType.name} - {selectedDoctor.price} جنيه
                    </p>
                </div>

                {/* ===== Days Tabs ===== */}
                <div className="bg-[#171717] border border-(--main-color) rounded-md p-3">
                    <p className="text-white text-center font-bold text-[14px] mb-3">
                        اختر اليوم والميعاد
                    </p>

                    <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
                        {days.map((day, index) => (
                            <button
                                key={day.id}
                                onClick={() => {
                                    setActiveDay(index);
                                    setSelectedSlot(null);
                                }}
                                className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[75px] h-[55px] rounded-md border transition-all ${activeDay === index
                                    ? '!bg-(--main-color) !border-(--main-color) text-black'
                                    : 'bg-[#0d0d0d] border-(--main-color)/30 text-white hover:border-(--main-color)'
                                    }`}
                            >
                                <span className="text-[13px] font-bold">{day.label}</span>
                                <span className="text-[10px] opacity-70">{day.date}</span>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 max-h-[280px] overflow-y-auto">
                        {slots.map((slot) => {
                            const isSelected = selectedSlot?.id === slot.id;
                            return (
                                <button
                                    key={slot.id}
                                    onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                                    disabled={slot.isBooked}
                                    className={`h-[40px] rounded-md border text-[12px] font-bold transition-all ${slot.isBooked
                                        ? 'bg-[#0d0d0d] border-white/10 text-white/30 line-through cursor-not-allowed'
                                        : isSelected
                                            ? '!bg-(--main-color) !border-(--main-color) text-black'
                                            : 'bg-[#0d0d0d] border-(--main-color)/40 text-white hover:border-(--main-color)'
                                        }`}
                                >
                                    {slot.time}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {selectedSlot && (
                    <div className="bg-(--main-color)/10 border border-(--main-color) rounded-md p-3 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-(--main-color)" />
                        <p className="text-white text-[13px]">
                            تم اختيار: <span className="font-bold">{days[activeDay].label}</span>
                            {' - '}
                            <span className="text-(--main-color) font-bold">
                                {selectedSlot.time}
                            </span>
                        </p>
                    </div>
                )}

                <button
                    onClick={handleBook}
                    disabled={!selectedSlot}
                    className={`h-[44px] rounded-md font-bold text-[14px] transition-colors flex items-center justify-center gap-2 ${selectedSlot
                        ? '!bg-(--main-color) text-black hover:opacity-90'
                        : '!bg-(--dark-gray) text-white/40 cursor-not-allowed border border-white/10'
                        }`}
                >
                    <Calendar size={18} />
                    احجز الاستشارة
                </button>

                <div className="bg-[#0d0d0d] border border-(--main-color)/20 rounded-md p-3 mt-2">
                    <p className="text-white text-[12px] text-center mb-2 font-bold">
                        ملاحظة مهمة
                    </p>
                    <p className="text-white/60 text-[11px] text-center leading-6">
                        سيتم التواصل بك في الميعاد الذي اخترته. من فضلك تأكد أن تليفونك مفتوح في
                        الميعاد المحدد.
                    </p>
                </div>
            </div>

            {showConfirm && (
                <div
                    onClick={() => setShowConfirm(false)}
                    className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#171717] border border-(--main-color) rounded-lg w-full max-w-[380px] p-5"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-(--main-color)/10 flex items-center justify-center">
                                <TypeIcon size={32} className="text-(--main-color)" />
                            </div>

                            <h3 className="text-white text-[17px] font-bold">تأكيد الحجز</h3>

                            <div className="w-full bg-[#0d0d0d] rounded-md p-3 flex flex-col gap-2">
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-white/60">الطبيب:</span>
                                    <span className="text-white font-bold">
                                        {selectedDoctor.name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-white/60">نوع الاستشارة:</span>
                                    <span className="text-white font-bold">
                                        {selectedType.name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-white/60">اليوم:</span>
                                    <span className="text-white font-bold">
                                        {days[activeDay].label} ({days[activeDay].date})
                                    </span>
                                </div>
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-white/60">الوقت:</span>
                                    <span className="text-(--main-color) font-bold">
                                        {selectedSlot.time}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-white/60">السعر:</span>
                                    <span className="text-white font-bold">
                                        {selectedDoctor.price} جنيه
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full mt-2">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 h-[40px] border border-white/20 rounded-md text-white text-[13px] hover:bg-white/5 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={confirmBooking}
                                    className="flex-1 h-[40px] !bg-(--main-color) rounded-md text-black text-[13px] font-bold hover:opacity-90 transition-opacity"
                                >
                                    تأكيد
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
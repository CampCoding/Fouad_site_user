import React, { useState, useMemo } from 'react';
import {
    MessageCircleQuestion,
    ChevronDown,
    Phone,
    Video,
    MessageSquare,
    Calendar,
    CheckCircle2,
    X,
    Copy,
    ArrowLeftRight,
    Info,
    UploadCloud,
} from 'lucide-react';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import CustomInput from '../../components/Common/CustomInput';
import CustomSelect from '../../components/Common/CustomSelect';
import toast from 'react-hot-toast';

const USER_BALANCE = 500;

const DOCTORS = [
    {
        id: 1,
        name: 'دكتور احمد شبانة',
        specialty: 'استشاري أمراض القلب',
        price: '100',
    },
];

const CONSULTATION_TYPES = [
    { id: 'phone', name: 'استشارة هاتفية', icon: Phone, available: true },
    { id: 'video', name: 'استشارة فيديو', icon: Video, available: true },
    {
        id: 'chat',
        name: 'شات من داخل التطبيق',
        icon: MessageSquare,
        available: false,
    },
];

const PAYMENT_OPTIONS = [
    {
        value: 'balance',
        label: 'الدفع من خلال رصيدك في البرنامج',
        img: '/images/159.png',
    },
    {
        value: 'cash',
        label: 'الدفع نقدا من خلال الفرع يوم الفحص',
        img: '/images/152.png',
    },
    {
        value: 'cards',
        label: 'الدفع من بطاقة الالكترونية',
        img: '/images/158.png',
    },
    {
        value: 'instapay',
        label: 'الدفع من إنستاباي',
        img: '/images/156.png',
    },
    {
        value: 'vodafone',
        label: 'الدفع من فودافون كاش',
        img: '/images/157.png',
    },
    {
        value: 'insurance',
        label: 'على نفقة التأمين الصحي',
        img: '/images/153.png',
    },
    {
        value: 'doctors',
        label: 'تعاقد نقابة الأطباء',
        img: '/images/154.png',
    },
    {
        value: 'engineers',
        label: 'تعاقد نقابة المهندسين',
        img: '/images/155.png',
    },
];

const generateDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = [
        'الأحد',
        'الإثنين',
        'الثلاثاء',
        'الأربعاء',
        'الخميس',
        'الجمعة',
        'السبت',
    ];

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
    // ===== Step Management =====
    const [currentStep, setCurrentStep] = useState('booking'); // 'booking' | 'payment' | 'confirm'

    // ===== Booking States =====
    const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
    const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState(CONSULTATION_TYPES[0]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [activeDay, setActiveDay] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // ===== Payment States =====
    const [selectedMethod, setSelectedMethod] = useState('');
    const [price, setPrice] = useState(DOCTORS[0].price);
    const [hasCoupon, setHasCoupon] = useState(false);
    const [confirmCoupon, setConfirmCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const days = useMemo(() => generateDays(), []);
    const slots = useMemo(() => generateSlots(activeDay), [activeDay]);

    const TypeIcon = selectedType.icon;
    const isSufficient = Number(price) <= USER_BALANCE;

    // ===== Handlers =====
    const handleGoToPayment = () => {
        if (!selectedSlot) {
            toast.error('من فضلك اختر ميعاد');
            return;
        }
        setPrice(selectedDoctor.price);
        setCurrentStep('payment');
    };

    const handleGoToConfirm = () => {
        if (!selectedMethod) {
            toast.error('من فضلك اختر طريقة الدفع');
            return;
        }

        if (selectedMethod === 'balance' && !isSufficient) {
            toast.error('رصيدك لا يكفي لإتمام المعاملة');
            return;
        }

        setCurrentStep('confirm');
    };

    const handleMethodChange = (method) => {
        if (method === selectedMethod) return;
        setSelectedMethod(method);
        setHasCoupon(false);
        setConfirmCoupon(false);
        setCouponCode('');
    };

    const confirmBooking = () => {
        console.log({
            doctor: selectedDoctor,
            type: selectedType,
            day: days[activeDay],
            slot: selectedSlot,
            payment: selectedMethod,
            price,
        });

        toast.success(
            'تم حجز الاستشارة بنجاح! سيتم التواصل معك في الميعاد المحدد'
        );

        setSelectedSlot(null);
        setSelectedMethod('');
        setPrice(DOCTORS[0].price);
        setHasCoupon(false);
        setConfirmCoupon(false);
        setCouponCode('');
        setCurrentStep('booking');
    };

    // ===== Steps Config =====
    const steps = [
        { key: 'booking', label: 'الحجز' },
        { key: 'payment', label: 'الدفع' },
        { key: 'confirm', label: 'التأكيد' },
    ];

    const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

    return (
        <div className="py-10 mx-auto">
            {/* ===== Page Title ===== */}
            <div className="card mb-6">
                <MessageCircleQuestion size={40} className="text-(--main-color)" />
                <p className="font-bold text-[17px] text-[#eee]">استشارات</p>
            </div>

            {/* ===== Stepper ===== */}
            <div className="flex items-center justify-center gap-2 mb-6 px-1">
                {steps.map((step, index) => (
                    <React.Fragment key={step.key}>
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border transition-all ${index <= currentStepIndex
                                        ? 'bg-(--main-color) border-(--main-color) text-black'
                                        : 'bg-[#0d0d0d] border-white/20 text-white/40'
                                    }`}
                            >
                                {index < currentStepIndex ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span
                                className={`text-[10px] ${index <= currentStepIndex
                                        ? 'text-(--main-color) font-bold'
                                        : 'text-white/40'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-[2px] mt-[-16px] ${index < currentStepIndex ? 'bg-(--main-color)' : 'bg-white/10'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex flex-col gap-[9.5px] px-1">
                {/* ═══════════════════════════════════════════ */}
                {/* ===== STEP 1: BOOKING ===== */}
                {/* ═══════════════════════════════════════════ */}
                {currentStep === 'booking' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Doctor Selection */}
                        <div className="bg-[#171717] border border-(--main-color) rounded-md p-3 mb-[9.5px]">
                            <p className="text-white/60 text-[12px] mb-2">
                                الطبيب المحوّل إليه
                            </p>
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
                                                    setPrice(doc.price);
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

                        {/* Consultation Type */}
                        <div className="bg-[#171717] border border-(--main-color) rounded-md p-3 mb-[9.5px]">
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

                        {/* Consultation Info */}
                        <div className="bg-[#171717] border border-(--main-color)/40 rounded-md p-3 flex items-center justify-center gap-3 mb-[9.5px]">
                            <TypeIcon size={20} className="text-(--main-color)" />
                            <p className="text-white text-[14px] font-bold">
                                {selectedType.name} - {selectedDoctor.price} جنيه
                            </p>
                        </div>

                        {/* Days & Slots */}
                        <div className="bg-[#171717] border border-(--main-color) rounded-md p-3 mb-[9.5px]">
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

                        {/* Selected Slot Info */}
                        {selectedSlot && (
                            <div className="bg-(--main-color)/10 border border-(--main-color) rounded-md p-3 flex items-center gap-2 mb-[9.5px]">
                                <CheckCircle2 size={20} className="text-(--main-color)" />
                                <p className="text-white text-[13px]">
                                    تم اختيار:{' '}
                                    <span className="font-bold">{days[activeDay].label}</span>
                                    {' - '}
                                    <span className="text-(--main-color) font-bold">
                                        {selectedSlot.time}
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Go to Payment */}
                        <button
                            onClick={handleGoToPayment}
                            disabled={!selectedSlot}
                            className={`h-[44px] w-full rounded-md font-bold text-[14px] transition-colors flex items-center justify-center gap-2 ${selectedSlot
                                    ? '!bg-(--main-color) text-black hover:opacity-90'
                                    : '!bg-[#232323] text-white/40 cursor-not-allowed border border-white/10'
                                }`}
                        >
                            <Calendar size={18} />
                            التالي - بيانات الدفع
                        </button>

                        {/* Note */}
                        <div className="bg-[#0d0d0d] border border-(--main-color)/20 rounded-md p-3 mt-2">
                            <p className="text-white text-[12px] text-center mb-2 font-bold">
                                ملاحظة مهمة
                            </p>
                            <p className="text-white/60 text-[11px] text-center leading-6">
                                سيتم التواصل بك في الميعاد الذي اخترته. من فضلك تأكد أن تليفونك
                                مفتوح في الميعاد المحدد.
                            </p>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* ===== STEP 2: PAYMENT ===== */}
                {/* ═══════════════════════════════════════════ */}
                {currentStep === 'payment' && (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="border h-[40px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
                            <p className="text-white text-center font-bold">
                                إملأ بيانات الدفع
                            </p>
                        </div>

                        {/* ===== ملخص الحجز ===== */}
                        <div className="bg-[#171717] border border-(--main-color)/40 rounded-md p-3 flex flex-col gap-2">
                            <div className="flex justify-between text-[12px]">
                                <span className="text-white/60">الطبيب:</span>
                                <span className="text-white font-bold">
                                    {selectedDoctor.name}
                                </span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                                <span className="text-white/60">نوع الاستشارة:</span>
                                <span className="text-white font-bold">
                                    {selectedType.name}
                                </span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                                <span className="text-white/60">الميعاد:</span>
                                <span className="text-(--main-color) font-bold">
                                    {days[activeDay].label} - {selectedSlot?.time}
                                </span>
                            </div>
                        </div>

                        {/* ===== Payment Method Select ===== */}
                        <div className="flex flex-col gap-1">
                            <CustomSelect
                                placeholder={'اختر طريقة الدفع'}
                                options={PAYMENT_OPTIONS}
                                value={selectedMethod}
                                onChange={handleMethodChange}
                                selectClassName="h-[50px]!"
                            />
                        </div>

                        {/* ===== Price + Coupon ===== */}
                        {selectedMethod &&
                            selectedMethod !== 'insurance' &&
                            selectedMethod !== 'doctors' &&
                            selectedMethod !== 'engineers' && (
                                <div className="grid grid-cols-[1fr_0.5fr_0.7fr] gap-2 items-center">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-start">
                                            سعر الخدمة
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CustomInput
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="border-[#232323]! rounded-[4px]!"
                                            inputClassName="placeholder:text-white text-white text-center"
                                            placeholder={'السعر'}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => setHasCoupon(!hasCoupon)}
                                            className={`bg-[#171717] rounded-[4px] text-[11px] h-[38.4px] text-white transition-all ${hasCoupon
                                                    ? 'border border-(--main-bg-color) shadow-[0_0_10px_rgba(var(--main-bg-rgb),0.3)]'
                                                    : 'border border-[#232323]'
                                                }`}
                                        >
                                            لديك كود خصم؟
                                        </button>
                                    </div>
                                </div>
                            )}

                        {/* ===== Balance Check ===== */}
                        {selectedMethod === 'balance' && price && (
                            <div className="mt-2 animate-in fade-in zoom-in-95 duration-300">
                                {isSufficient ? (
                                    <div className="grid grid-cols-[1fr_1fr] gap-2 items-center p-px bg-[#1d1d1d] border border-[#232323] rounded-[4px]">
                                        <div className="text-white text-[12px] h-[38.4px] flex items-center justify-center">
                                            {USER_BALANCE} ج.م
                                        </div>
                                        <div className="text-white text-[12px] h-[38.4px] flex items-center justify-center">
                                            رصيدك الحالي
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-[#2a1313] border border-[#442222] py-3 px-4 rounded-[4px] flex justify-center items-center">
                                        <p className="text-white text-[11px] text-center font-bold">
                                            عفوا.. رصيدك الحالي لا يكفي لإتمام المعاملة
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ===== Instapay / Vodafone ===== */}
                        {(selectedMethod === 'instapay' ||
                            selectedMethod === 'vodafone') && (
                                <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-[10fr_2fr_6fr] gap-2">
                                        <div className="bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]">
                                            <p className="text-[#a6a6a6] text-center text-[13px]">
                                                اضغط هنا لتحويل مبلغ الحجز
                                            </p>
                                        </div>
                                        <MdOutlineKeyboardDoubleArrowLeft className="text-[#545454] mx-auto w-[50px] h-[50px]" />
                                        <button
                                            onClick={() => setIsTransferOpen(true)}
                                            className="auth_btn"
                                        >
                                            للتحويل
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-[10fr_2fr_6fr] gap-2">
                                        <div className="bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]">
                                            <p className="text-[#a6a6a6] text-center text-[13px]">
                                                اضغط هنا لتحميل إيصال التحويل
                                            </p>
                                        </div>
                                        <MdOutlineKeyboardDoubleArrowLeft className="text-[#545454] mx-auto w-[50px] h-[50px]" />
                                        <button
                                            onClick={() => setIsUploadOpen(true)}
                                            className="auth_btn"
                                        >
                                            للتحميل
                                        </button>
                                    </div>
                                </div>
                            )}

                        {/* ===== Insurance ===== */}
                        {selectedMethod === 'insurance' && (
                            <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center justify-start gap-2 text-white/70 text-[13px]">
                                    <Info className="w-4 h-4 text-(--main-color)" />
                                    <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        'أصل خطاب التأمين للمركز مختوم وساري',
                                        'صورة الصفحة الأولى للشهادة الصحية بالكارنيه',
                                        'صورة شهادة ميلاد الطفل',
                                        'صورة بطاقة الأب أو الأم',
                                    ].map((doc, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between gap-2 bg-[#171717] border border-[#232323] p-3 rounded-[8px] hover:border-(--main-color)/30 transition-all cursor-pointer group"
                                            onClick={() => setIsUploadOpen(true)}
                                        >
                                            <p className="text-white text-[10px] flex-1 text-right leading-tight">
                                                {doc}
                                            </p>
                                            <div className="p-2 bg-[#232323] rounded-full group-hover:bg-(--main-color)/10 transition-colors">
                                                <UploadCloud className="w-4 h-4 text-(--main-color)" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/40 text-[11px] text-center mt-2 leading-relaxed">
                                    يتم تسليم هذه الأوراق بنفس الترتيب <br /> من خلال فروعنا يوم
                                    الفحص
                                </p>
                            </div>
                        )}

                        {/* ===== Doctors / Engineers ===== */}
                        {(selectedMethod === 'doctors' ||
                            selectedMethod === 'engineers') && (
                                <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center justify-start gap-2 text-white/70 text-[13px]">
                                        <Info className="w-4 h-4 text-(--main-color)" />
                                        <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            'أصل خطاب النقابة للمركز مختوم وساري',
                                            'صورة شهادة ميلاد الطفل',
                                            'صورة بطاقة الأب أو الأم',
                                        ].map((doc, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between gap-3 bg-[#171717] border border-[#232323] p-3 rounded-[8px] hover:border-(--main-color)/30 transition-all cursor-pointer group"
                                                onClick={() => setIsUploadOpen(true)}
                                            >
                                                <p className="text-white text-[12px] flex-1 text-right">
                                                    {doc}
                                                </p>
                                                <div className="p-2 bg-[#232323] rounded-full group-hover:bg-(--main-color)/10 transition-colors">
                                                    <UploadCloud className="w-4 h-4 text-(--main-color)" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-white/40 text-[11px] text-center mt-2 leading-relaxed">
                                        يتم تسليم هذه الأوراق بنفس الترتيب <br /> من خلال فروعنا يوم
                                        الفحص
                                    </p>
                                </div>
                            )}

                        {/* ===== Coupon ===== */}
                        {hasCoupon && (
                            <div className="grid grid-cols-[1fr_0.3fr] gap-2 items-end mt-2 animate-in fade-in zoom-in-95 duration-300">
                                <div className="flex flex-col gap-1">
                                    <CustomInput
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="كود الخصم"
                                        inputClassName="text-white bg-transparent"
                                    />
                                </div>
                                <button
                                    onClick={() => setConfirmCoupon(true)}
                                    className="bg-[#171717] border border-[#232323] rounded-[4px] text-[12px] h-[38.4px] text-white hover:border-(--main-color) transition-all"
                                >
                                    للتأكيد
                                </button>
                            </div>
                        )}

                        {/* ===== Coupon Confirmed ===== */}
                        {confirmCoupon && (
                            <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top-2 duration-300">
                                <div className="border border-white/80 py-2 rounded-[4px] flex justify-center items-center text-white bg-white/5">
                                    <p className="text-sm font-bold">تم عمل خصم بقيمة 20 %</p>
                                </div>
                                <div className="grid grid-cols-[1fr_0.5fr] gap-2 items-center">
                                    <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-start">
                                        سعر الخدمة
                                    </div>
                                    <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-center font-bold">
                                        {price ? (price * 0.8).toFixed(2) : 'السعر'}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ===== Navigation Buttons ===== */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setCurrentStep('booking')}
                                className="auth_btn flex-1"
                            >
                                العودة
                            </button>
                            <button
                                onClick={handleGoToConfirm}
                                className="auth_btn !bg-(--main-color) !text-black !border-(--main-color) flex-1"
                            >
                                للإستمرار
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* ===== STEP 3: CONFIRMATION (Modal) ===== */}
                {/* ═══════════════════════════════════════════ */}
                {currentStep === 'confirm' && (
                    <div
                        className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
                        onClick={() => setCurrentStep('payment')}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#171717] border border-(--main-color) rounded-lg w-full max-w-[380px] p-5 animate-in zoom-in-95 duration-200"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-(--main-color)/10 flex items-center justify-center">
                                    <TypeIcon size={32} className="text-(--main-color)" />
                                </div>

                                <h3 className="text-white text-[17px] font-bold">
                                    تأكيد الحجز
                                </h3>

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
                                            {selectedSlot?.time}
                                        </span>
                                    </div>
                                    <div className="h-[1px] bg-white/10 my-1" />
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-white/60">طريقة الدفع:</span>
                                        <span className="text-white font-bold">
                                            {
                                                PAYMENT_OPTIONS.find(
                                                    (p) => p.value === selectedMethod
                                                )?.label
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-white/60">السعر:</span>
                                        <span className="text-(--main-color) font-bold">
                                            {confirmCoupon && price
                                                ? (price * 0.8).toFixed(2)
                                                : price}{' '}
                                            جنيه
                                        </span>
                                    </div>
                                    {confirmCoupon && (
                                        <div className="flex justify-between text-[13px]">
                                            <span className="text-white/60">الخصم:</span>
                                            <span className="text-green-400 font-bold">20%</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 w-full mt-2">
                                    <button
                                        onClick={() => setCurrentStep('payment')}
                                        className="flex-1 h-[40px] border border-white/20 rounded-md text-white text-[13px] hover:bg-white/5 transition-colors"
                                    >
                                        العودة
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

            {/* ═══════════════════════════════════════════ */}
            {/* ===== MODALS ===== */}
            {/* ═══════════════════════════════════════════ */}

            {/* Upload Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#171717] border border-(--main-color) rounded-[8px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20">
                            <h3 className="text-white font-bold text-lg">
                                تحميل إيصال التحويل
                            </h3>
                            <button
                                onClick={() => setIsUploadOpen(false)}
                                className="p-1 hover:bg-(--main-color)/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-(--main-color)" />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            <div
                                onClick={() =>
                                    document.getElementById('consult-file-upload').click()
                                }
                                className="border-2 border-dashed border-(--main-color)/30 rounded-[8px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-(--main-color)/5 transition-all group"
                            >
                                <input
                                    id="consult-file-upload"
                                    type="file"
                                    hidden
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                <div className="w-12 h-12 bg-(--main-color)/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-6 h-6 text-(--main-color)" />
                                </div>
                                <div className="text-center">
                                    <p className="text-white text-sm font-medium">
                                        {selectedFile
                                            ? selectedFile.name
                                            : 'اضغط هنا لاختيار ملف الإيصال'}
                                    </p>
                                    <p className="text-white/40 text-[11px] mt-1">
                                        PDF, JPG, PNG (Max 5MB)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-2">
                                <button
                                    onClick={() => setIsUploadOpen(false)}
                                    className="px-5 py-2 text-sm font-medium text-(--main-color) hover:bg-(--main-color)/10 rounded-[4px] transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    disabled={!selectedFile}
                                    onClick={() => setIsUploadOpen(false)}
                                    className={`auth_btn px-6 py-2 flex items-center justify-center min-w-[100px] ${!selectedFile ? 'opacity-50 grayscale' : ''
                                        }`}
                                >
                                    تحميل الآن
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Transfer Modal */}
            {isTransferOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#171717] border border-(--main-color) rounded-[8px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20 bg-(--main-color)/5">
                            <div className="flex items-center gap-2">
                                <ArrowLeftRight className="w-5 h-5 text-(--main-color)" />
                                <h3 className="text-white font-bold text-lg">
                                    بيانات التحويل
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsTransferOpen(false)}
                                className="p-1 hover:bg-(--main-color)/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-(--main-color)" />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="bg-[#232323] p-4 rounded-[6px] border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/40 text-[11px]">
                                            رقم الموبايل / الحساب
                                        </span>
                                        <button className="text-(--main-color) hover:text-white transition-colors">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-white font-mono text-xl tracking-wider text-center">
                                        01234567890
                                    </p>
                                </div>

                                <div className="bg-[#232323] p-4 rounded-[6px] border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/40 text-[11px]">
                                            اسم المستلم
                                        </span>
                                    </div>
                                    <p className="text-white text-md font-medium text-center">
                                        شركة فؤادي للأنظمة
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-[6px]">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                <p className="text-[12px] text-blue-100/80 leading-relaxed">
                                    برجاء التأكد من رقم الحساب قبل التحويل، ورفع صورة الإيصال بعد
                                    إتمام العملية لضمان سرعة تفعيل الحجز.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsTransferOpen(false)}
                                className="auth_btn w-full py-3 text-md font-bold"
                            >
                                فهمت، شكراً
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
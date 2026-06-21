import React, { useState } from 'react';
import { ListChecks, ChevronDown, Stethoscope, Baby, HeartPulse, Activity, FileText } from 'lucide-react';

const INSTRUCTIONS_DATA = [
    {
        id: 1,
        title: 'تعليمات مرضى الأطفال',
        icon: Baby,
        items: [
            'يجب إحضار شهادة الميلاد أو إثبات هوية الطفل',
            'الحضور قبل الميعاد بـ 15 دقيقة على الأقل',
            'يفضل عدم تناول الطعام قبل بعض الفحوصات بـ 4 ساعات',
            'إحضار التقارير الطبية السابقة إن وجدت',
            'حضور أحد الوالدين مع الطفل أثناء الكشف',
        ],
    },
    {
        id: 2,
        title: 'تعليمات مرضى القلب',
        icon: HeartPulse,
        items: [
            'الامتناع عن الكافيين قبل الفحص بـ 12 ساعة',
            'إحضار قائمة بالأدوية الحالية',
            'ارتداء ملابس فضفاضة ومريحة',
            'إحضار آخر تقارير القلب والأشعة',
            'إبلاغ الطبيب بأي أعراض حدثت مؤخرًا',
        ],
    },
    {
        id: 3,
        title: 'تعليمات الفحوصات المخبرية',
        icon: Activity,
        items: [
            'الصيام من 8 إلى 12 ساعة لبعض التحاليل',
            'شرب الماء مسموح أثناء الصيام',
            'تجنب الرياضة الشاقة قبل التحليل بيوم',
            'إبلاغ المختبر بأي أدوية يتم تناولها',
            'الحضور في الصباح الباكر للحصول على نتائج أدق',
        ],
    },
    {
        id: 4,
        title: 'تعليمات الأشعة',
        icon: FileText,
        items: [
            'إزالة أي مجوهرات أو معادن قبل الفحص',
            'إبلاغ الطبيب بحالات الحمل قبل أي أشعة',
            'الصيام مطلوب لبعض أنواع الأشعة',
            'ارتداء الملابس المخصصة التي يوفرها المركز',
            'إحضار الأشعات السابقة للمقارنة',
        ],
    },
    {
        id: 5,
        title: 'تعليمات عامة قبل الكشف',
        icon: Stethoscope,
        items: [
            'إحضار البطاقة الشخصية أو إثبات هوية',
            'الحضور في الميعاد المحدد لتجنب التأخير',
            'إحضار جميع التقارير والأشعة السابقة',
            'ارتداء كمامة طبية داخل المركز',
            'الالتزام بتعليمات استقبال المرضى',
        ],
    },
];

export default function Instructions() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="py-10 mx-auto">
            {/* Page Title Card */}
            <div className="card mb-6">
                <ListChecks size={40} className="text-(--main-color)" />
                <p className="font-bold text-[17px] text-[#eee]">التعليمات</p>
            </div>

            {/* Instructions List */}
            <div className="flex flex-col gap-[9.5px] px-1">
                {INSTRUCTIONS_DATA.map((section) => {
                    const Icon = section.icon;
                    const isOpen = openId === section.id;

                    return (
                        <div
                            key={section.id}
                            className="border border-(--main-color) rounded-md overflow-hidden bg-[#171717] transition-all"
                        >
                            {/* Header */}
                            <button
                                onClick={() => toggle(section.id)}
                                className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={22} className="text-(--main-color)" />
                                    <p className="text-white font-bold text-[14px]">{section.title}</p>
                                </div>

                                <ChevronDown
                                    size={20}
                                    className={`text-(--main-color) transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                                        }`}
                                />
                            </button>

                            {/* Content */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'
                                    }`}
                            >
                                <ul className="flex flex-col gap-2 p-4 border-t border-(--main-color)/30 bg-[#0d0d0d]">
                                    {section.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-white text-[13px] leading-6"
                                        >
                                            <span className="text-(--main-color) font-bold mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
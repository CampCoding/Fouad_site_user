import {
  UserRound,
  Wallet,
  Calendar,
  FileText,
  Mail,
  Eye,
  Triangle,
  ChevronRight,
  Gift,
  Coins,
  X,
  CalendarCheck,
  Clock,
  Plus,
  Trash2,
  Building2,
  MessageCirclePlus,
  Send
} from 'lucide-react'
import React, { useState } from 'react'
import HomeCard from '../../components/Common/HomeCard';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import PageTitle from '../../components/Common/PageTitle';
import CustomInput from '../../components/Common/CustomInput';
import CustomSelect from '../../components/Common/CustomSelect';
import ReservationBox from '../../components/Common/ReservationBox';

const menuItems = [
  { id: 1, name: "متابعاتي", icon: CalendarCheck, view: 'followers' },
  { id: 2, name: "حجوزاتي", icon: Calendar, view: 'appointments' },
  { id: 3, name: "عروضي", icon: Eye, view: 'offers' },
  { id: 4, name: "رصيدي", icon: Wallet, view: 'balance' },
  { id: 5, name: "مراسلاتي", icon: Mail, view: 'messages' },
  { id: 6, name: "بياناتي", icon: UserRound, view: 'data' },
]

// بيانات المتابعات
const followersData = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1752063867/echo-followup.jpg",
    title: "متابعة الإيكو",
    description: "متابعة دورية لفحص الإيكو وقياس وظائف القلب",
    date: "14-3-2025",
    doctor: "د. أحمد شبانة"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1752063867/checkup-followup.jpg",
    title: "متابعة الكشف الدوري",
    description: "كشف دوري شامل للاطمئنان على الحالة",
    date: "22-4-2025",
    doctor: "د. أحمد علي"
  },
];

// بيانات العروض
const offersData = [
  {
    id: 1,
    image: "/images/offer-1.jpg",
    title: "خصم 50% على متابعة الإيكو",
    description: "كوبون خصم بمناسبة شهر رمضان الكريم على متابعة الإيكو",
    expiry: "15-2-2025",
    discount: "50%"
  },
  {
    id: 2,
    image: "/images/offer-2.jpg",
    title: "خصم 30% على الكشف الأول",
    description: "خصم خاص لأول كشف للمرضى الجدد بالمركز",
    expiry: "30-3-2025",
    discount: "30%"
  },
];

// بيانات المراسلات (محادثات قديمة)
const messagesData = [
  {
    id: 1,
    subject: "استفسار عن موعد الكشف",
    lastMessage: "شكراً لكم، تم استلام الرد",
    date: "12-2-2025",
    time: "10:30 ص",
    unread: 2,
    from: "incoming"
  },
  {
    id: 2,
    subject: "طلب تعديل موعد المتابعة",
    lastMessage: "تم تعديل الموعد بنجاح إلى 15-3-2025",
    date: "8-2-2025",
    time: "2:15 م",
    unread: 0,
    from: "outgoing"
  },
];

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const view = searchParams.get('v') || 'menu';

  // ✨ غيرت workplace من string لـ array
  const [profileData, setProfileData] = useState({
    name: "أحمد محمد أحمد",
    tel: "01234567890",
    job: "مهندس",
    workplaces: [], // array من أماكن العمل
  });

  const [isWorkplaceModalOpen, setIsWorkplaceModalOpen] = useState(false);
  const [workplaceForm, setWorkplaceForm] = useState({
    hospitalName: "",
    hospitalCode: ""
  });

  // ✨ Modal مراسلة جديدة
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    subject: "",
    message: ""
  });

  // ✨ إضافة مكان عمل جديد (مش تعديل)
  const handleSaveWorkplace = (e) => {
    e.preventDefault();
    if (workplaceForm.hospitalName.trim() === "") return;

    const newWorkplace = {
      id: Date.now(),
      name: workplaceForm.hospitalName,
      code: workplaceForm.hospitalCode
    };

    setProfileData({
      ...profileData,
      workplaces: [...profileData.workplaces, newWorkplace]
    });

    // تفريغ الفورم
    setWorkplaceForm({ hospitalName: "", hospitalCode: "" });
    setIsWorkplaceModalOpen(false);
  };

  // ✨ حذف مكان عمل
  const handleDeleteWorkplace = (id) => {
    setProfileData({
      ...profileData,
      workplaces: profileData.workplaces.filter(w => w.id !== id)
    });
  };

  // ✨ إرسال مراسلة جديدة
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessageForm.subject.trim() === "" || newMessageForm.message.trim() === "") return;

    // TODO: إرسال للـ API
    console.log("New Message:", newMessageForm);

    setNewMessageForm({ subject: "", message: "" });
    setIsNewMessageModalOpen(false);
  };

  const setViewParam = (newView) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('v', newView);
    setSearchParams(newSearchParams);
  };

  const handleBack = () => {
    if (view !== 'menu') {
      navigate(-1);
    }
  };

  const handleGoHome = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('v');
    setSearchParams(newSearchParams);
  };

  const appointmentsData = [
    ["احمد محمد", "إيكو", "طنطا", "12/5/2025", "11:00"],
    ["احمد محمد", "كشف", "طنطا", "20/5/2025", "1:00"],
    ["احمد محمد", "متابعة", "المنصورة", "1/6/2025", "10:00"],
  ];

  const appointmentHeaders = ["اسم المريض", "الخدمة", "الفرع", "التاريخ", "الوقت"];

  return (
    <div className='py-10 mx-auto max-w-[400px] relative px-1'>
      <div className="card mb-4 cursor-pointer" onClick={handleGoHome}>
        <UserRound size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">شخصي</p>
      </div>

      {/* Header / Navigation Bar */}
      <div
        className="border h-[38.4px] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer"
        onClick={handleBack}
      >
        {view !== 'menu' && (
          <ChevronRight className="absolute right-3 text-(--main-color)" size={20} />
        )}
        <p className='text-white text-center font-bold text-[14px]'>
          {view === 'menu' ? 'القائمة الرئيسية' :
            view === 'data' ? 'بياناتي' :
              view === 'appointments' ? 'حجوزاتي' :
                view === 'followers' ? 'متابعاتي' :
                  view === 'offers' ? 'عروضي' :
                    view === 'balance' ? 'رصيدي' :
                      'مراسلاتي'}
        </p>
      </div>

      {/* Menu Grid View */}
      {view === 'menu' && (
        <div className="grid grid-cols-3 gap-3 px-4 mt-6">
          {menuItems.map((item) => (
            <HomeCard
              key={item.id}
              item={item}
              onClick={() => setViewParam(item.view)}
              imgClass="w-[26px] h-[26px]"
              textClass="text-[14px]"
              className='w-full'
            />
          ))}
        </div>
      )}

      {/* My Data (بياناتي) View - مع دعم أكتر من مكان عمل */}
      {view === 'data' && (
        <div className="flex text-white px-2 mt-5 flex-col gap-2 animate-in fade-in duration-300">
          <div className="flex flex-col gap-2">
            <CustomInput
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              type="text"
              placeholder="الاسم"
            />
            <CustomInput
              value={profileData.tel}
              onChange={(e) => setProfileData({ ...profileData, tel: e.target.value })}
              type="tel"
              placeholder="رقم التليفون"
            />
            <CustomInput
              value={profileData.job}
              onChange={(e) => setProfileData({ ...profileData, job: e.target.value })}
              type="text"
              placeholder="الوظيفة"
            />

            {/* ✨ قائمة أماكن العمل */}
            {profileData.workplaces.length > 0 && (
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-(--main-color) text-[12px] font-bold">أماكن العمل</p>
                  <p className="text-white/40 text-[11px]">{profileData.workplaces.length} مكان</p>
                </div>

                {profileData.workplaces.map((workplace) => (
                  <div
                    key={workplace.id}
                    className="border border-[#292929] bg-[#171717] rounded-md p-3 flex items-center gap-2.5 hover:border-(--main-color)/40 transition-colors"
                  >
                    {/* أيقونة */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center">
                      <Building2 size={16} className="text-(--main-color)" />
                    </div>

                    {/* البيانات */}
                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                      <p className="text-white text-[13px] font-bold truncate">{workplace.name}</p>
                      {workplace.code && (
                        <p className="text-white/50 text-[11px] truncate">
                          الكود: <span className="text-(--main-color)/80">{workplace.code}</span>
                        </p>
                      )}
                    </div>

                    {/* زر الحذف */}
                    <button
                      type="button"
                      onClick={() => handleDeleteWorkplace(workplace.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* زرار إضافة مكان عمل */}
            <button
              type="button"
              onClick={() => setIsWorkplaceModalOpen(true)}
              className="auth_btn !w-full !mx-auto !rounded-md mt-3 py-3 font-bold text-sm flex items-center justify-center gap-2 border-dashed!"
            >
              <Plus size={16} className="text-(--main-color)" />
              {profileData.workplaces.length > 0 ? "إضافة مكان عمل آخر" : "إضافة مكان العمل"}
            </button>

            {/* زرار حفظ */}
            <div className="flex justify-between items-center mt-4">
              <button className="auth_btn cursor-pointer !w-full !bg-(--main-color) !text-black !border-(--main-color)">
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Appointments (حجوزاتي) View */}
      {view === 'appointments' && (
        <div className="mt-3 text-white flex flex-col gap-3 animate-in fade-in duration-300">

          <div className="flex items-center justify-between px-1 mb-1">
            <p className="text-(--main-color) text-[12px] font-bold">حجوزاتك القادمة</p>
            <p className="text-white/40 text-[11px]">{appointmentsData.length} حجوزات</p>
          </div>

          <div className="border border-(--main-color)/30 rounded-md overflow-hidden bg-[#171717]">
            <div className="w-full grid grid-cols-5 bg-(--main-color)/15 border-b border-(--main-color)/30">
              {appointmentHeaders.map((header, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center p-2 text-center text-[10px] font-bold text-(--main-color) ${idx !== appointmentHeaders.length - 1 ? 'border-l border-(--main-color)/20' : ''
                    }`}
                >
                  {header}
                </div>
              ))}
            </div>

            {appointmentsData.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`w-full grid grid-cols-5 hover:bg-(--main-color)/5 transition-colors ${rowIdx !== appointmentsData.length - 1 ? 'border-b border-[#292929]' : ''
                  }`}
              >
                {row.map((cell, cellIdx) => (
                  <div
                    key={cellIdx}
                    className={`flex items-center justify-center p-2.5 text-center text-[11px] text-white/85 ${cellIdx !== row.length - 1 ? 'border-l border-[#292929]' : ''
                      }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>


        </div>
      )}

      {/* My Followers (متابعاتي) View */}
      {view === 'followers' && (
        <div className='mt-3 text-white flex flex-col gap-3 animate-in fade-in duration-300'>

          <div className="flex items-center justify-between px-1">
            <p className="text-(--main-color) text-[12px] font-bold">متابعاتك المقبلة</p>
            <p className="text-white/40 text-[11px]">{followersData.length} متابعات</p>
          </div>

          {followersData.map((item) => (
            <div
              key={item.id}
              className="border border-(--main-color)/40 bg-[#171717] rounded-lg overflow-hidden hover:border-(--main-color) transition-colors"
            >
              <div className="relative w-full h-[140px] bg-[#0d0d0d]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x200/171717/d49a3e?text=Fouady";
                  }}
                />
                <div className="absolute top-2 right-2 bg-(--main-color) text-black font-bold text-[11px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <CalendarCheck size={12} />
                  {item.date}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <p className="text-white font-bold text-[14px]">{item.title}</p>
                <p className="text-white/60 text-[11px] leading-relaxed">{item.description}</p>

                <div className="flex items-center gap-1.5 bg-[#0d0d0d] border border-[#292929] rounded-md px-2 py-1.5 mt-1">
                  <UserRound size={13} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px]">
                    <span className="text-white/50">الطبيب: </span>
                    <span className="font-bold">{item.doctor}</span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/reservations?v=followers`)}
                  className='auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5 mt-1'
                >
                  <Calendar size={16} />
                  حجز موعد المتابعة
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* My Offers (عروضي) View */}
      {view === 'offers' && (
        <div className="mt-3 text-white flex flex-col gap-3 animate-in fade-in duration-300">

          <div className="flex items-center justify-between px-1">
            <p className="text-(--main-color) text-[12px] font-bold">عروضك المتاحة</p>
            <p className="text-white/40 text-[11px]">{offersData.length} عروض</p>
          </div>

          {offersData.map((offer) => (
            <div
              key={offer.id}
              className="border border-(--main-color)/40 bg-[#171717] rounded-lg overflow-hidden hover:border-(--main-color) transition-colors"
            >
              <div className="relative w-full h-[160px] bg-[#0d0d0d]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x200/171717/d49a3e?text=Offer";
                  }}
                />
                <div className="absolute top-2 right-2 bg-(--main-color) text-black font-bold text-[13px] px-3 py-1 rounded-full shadow-lg">
                  خصم {offer.discount}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <p className="text-white font-bold text-[14px]">{offer.title}</p>
                <p className="text-white/60 text-[11px] leading-relaxed">{offer.description}</p>

                <div className="flex items-center gap-1.5 bg-[#0d0d0d] border border-[#292929] rounded-md px-2 py-1.5 mt-1">
                  <Calendar size={13} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px]">
                    صالح حتى: <span className="text-(--main-color) font-bold">{offer.expiry}</span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/reservations?s=payment&svc=${offer.id}`)}
                  className='auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5 mt-1'
                >
                  <Gift size={16} />
                  استخدام العرض الآن
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* My Balance (رصيدي) View */}
      {view === 'balance' && (
        <div className="mt-3 text-white flex flex-col gap-3 animate-in fade-in duration-300">

          <div className="relative overflow-hidden border border-(--main-color)/40 bg-gradient-to-br from-[#171717] to-[#1f1f1f] p-4 rounded-lg">
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-(--main-color)/5 rounded-full blur-2xl"></div>

            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center flex-shrink-0">
                <Wallet size={24} className="text-(--main-color)" />
              </div>
              <div className="flex flex-col">
                <p className="text-white/60 text-[12px]">رصيدك الحالي</p>
                <p className="text-(--main-color) font-bold text-[20px] leading-tight mt-0.5">
                  70 <span className="text-[13px] font-normal">ج.م</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#292929] bg-[#171717]/60 p-3 rounded-md flex gap-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center mt-0.5">
              <span className="text-(--main-color) text-[11px] font-bold">!</span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <p className="text-white text-[12px] font-bold">طريقة استخدام الرصيد</p>
              <ul className="text-white/70 text-[11px] leading-relaxed flex flex-col gap-1 list-disc pr-4">
                <li>يمكنك استخدام الرصيد في حجز أي خدمة من خدمات المركز</li>
                <li>إذا كان الرصيد أقل من سعر الخدمة، يجب شحن الفرق</li>

              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate(`/reservations?v=balance`)}
              className="auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
            >
              <Wallet size={16} />
              استخدام الرصيد
            </button>
            <button
              onClick={() => {/* TODO: شحن رصيد */ }}
              className="auth_btn !w-full flex items-center justify-center gap-1.5"
            >
              <Coins size={16} className="text-(--main-color)" />
              شحن الرصيد
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between border-b border-[#292929] pb-2">
              <p className="text-(--main-color) text-[13px] font-bold">سجل المعاملات</p>
              <p className="text-white/40 text-[10px]">آخر 5 معاملات</p>
            </div>

            {[
              { type: 'add', amount: 50, date: '10-2-2024', expiry: '23-2-2025', status: 'active' },
              { type: 'add', amount: 50, date: '10-2-2024', expiry: '23-2-2025', status: 'active' },
              { type: 'use', amount: 30, date: '5-1-2024', service: 'متابعة إيكو' },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#292929] bg-[#171717] p-2.5 rounded-md flex items-center gap-2.5"
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${item.type === 'add'
                  ? 'bg-(--green-color)/15 border border-(--green-color)/40'
                  : 'bg-red-500/15 border border-red-500/40'
                  }`}>
                  {item.type === 'add' ? (
                    <span className="text-(--green-color) font-bold text-[16px]">+</span>
                  ) : (
                    <span className="text-red-500 font-bold text-[16px]">−</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-[12px] font-bold">
                      {item.type === 'add' ? 'إضافة رصيد' : 'استخدام رصيد'}
                    </p>
                    <p className={`text-[12px] font-bold ${item.type === 'add' ? 'text-(--green-color)' : 'text-red-500'
                      }`}>
                      {item.type === 'add' ? '+' : '-'}{item.amount} ج.م
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-[10px]">
                      {item.type === 'add' ? `بتاريخ ${item.date}` : `${item.service} • ${item.date}`}
                    </p>
                    {item.type === 'add' && (
                      <p className="text-(--main-color)/80 text-[10px]">
                        ينتهي {item.expiry}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ✨ Messages (مراسلاتي) View - بدء مراسلة + استقبال */}
      {view === 'messages' && (
        <div className="mt-3 text-white flex flex-col gap-3 animate-in fade-in duration-300">

          {/* زرار بدء مراسلة جديدة */}
          <button
            onClick={() => setIsNewMessageModalOpen(true)}
            className="border border-(--main-color)/40 bg-gradient-to-br from-(--main-color)/10 to-(--main-color)/5 rounded-lg p-3 flex items-center gap-3 hover:border-(--main-color) hover:from-(--main-color)/15 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-(--main-color) flex items-center justify-center flex-shrink-0">
              <MessageCirclePlus size={20} className="text-black" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-bold text-[13px]">بدء مراسلة جديدة</p>
              <p className="text-white/60 text-[11px]">تواصل مع إدارة المركز</p>
            </div>
          </button>

          {/* عنوان المراسلات السابقة */}
          <div className="flex items-center justify-between px-1 mt-1">
            <p className="text-(--main-color) text-[12px] font-bold">المراسلات السابقة</p>
            <p className="text-white/40 text-[11px]">{messagesData.length} مراسلات</p>
          </div>

          {/* قائمة المراسلات */}
          {messagesData.length === 0 ? (
            <div className="border border-[#292929] bg-[#171717] rounded-lg py-10 flex flex-col items-center gap-2">
              <Mail size={32} className="text-white/20" />
              <p className="text-white/50 text-[12px]">لا توجد مراسلات حالياً</p>
            </div>
          ) : (
            messagesData.map((msg) => (
              <div
                key={msg.id}
                className="border border-[#292929] bg-[#171717] rounded-lg p-3 flex gap-2.5 hover:border-(--main-color)/40 transition-colors cursor-pointer"
              >
                {/* أيقونة الرسالة */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative ${msg.from === 'incoming'
                  ? 'bg-(--main-color)/10 border border-(--main-color)/30'
                  : 'bg-(--green-color)/10 border border-(--green-color)/30'
                  }`}>
                  <Mail
                    size={16}
                    className={msg.from === 'incoming' ? 'text-(--main-color)' : 'text-(--green-color)'}
                  />
                  {/* عداد الرسائل غير المقروءة */}
                  {msg.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#171717]">
                      {msg.unread}
                    </span>
                  )}
                </div>

                {/* محتوى الرسالة */}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white font-bold text-[12px] truncate flex-1">{msg.subject}</p>
                    <p className="text-white/40 text-[10px] flex-shrink-0">{msg.date}</p>
                  </div>
                  <p className="text-white/60 text-[11px] truncate">{msg.lastMessage}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${msg.from === 'incoming'
                      ? 'bg-(--main-color)/15 text-(--main-color) border border-(--main-color)/30'
                      : 'bg-(--green-color)/15 text-(--green-color) border border-(--green-color)/30'
                      }`}>
                      {msg.from === 'incoming' ? 'واردة' : 'صادرة'}
                    </span>
                    <span className="text-white/30 text-[10px]">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      )}

      {/* الـ Modal الخاص بإضافة مكان العمل */}
      {isWorkplaceModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-[360px] bg-[#171717] border border-[#232323] rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">

            <div className="flex items-center justify-between border-b border-[#232323] pb-3 mb-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Building2 size={18} className="text-(--main-color)" />
                إضافة مكان العمل
              </h3>
              <button
                onClick={() => {
                  setIsWorkplaceModalOpen(false);
                  setWorkplaceForm({ hospitalName: "", hospitalCode: "" });
                }}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveWorkplace} className="flex flex-col gap-4 text-right">

              <CustomInput
                value={workplaceForm.hospitalName}
                onChange={(e) => setWorkplaceForm({ ...workplaceForm, hospitalName: e.target.value })}
                type="text"
                placeholder="اسم المكان"
              />

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="auth_btn flex-1 py-3 font-bold text-xs !rounded-md !bg-(--main-color) !text-black !border-(--main-color)"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsWorkplaceModalOpen(false);
                    setWorkplaceForm({ hospitalName: "", hospitalCode: "" });
                  }}
                  className="flex-1 py-3 font-bold text-xs bg-[#232323] text-gray-300 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors"
                >
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ✨ Modal مراسلة جديدة */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-[360px] bg-[#171717] border border-[#232323] rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">

            <div className="flex items-center justify-between border-b border-[#232323] pb-3 mb-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <MessageCirclePlus size={18} className="text-(--main-color)" />
                مراسلة جديدة
              </h3>
              <button
                onClick={() => {
                  setIsNewMessageModalOpen(false);
                  setNewMessageForm({ subject: "", message: "" });
                }}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-3 text-right">

              <CustomInput
                value={newMessageForm.subject}
                onChange={(e) => setNewMessageForm({ ...newMessageForm, subject: e.target.value })}
                type="text"
                placeholder="موضوع المراسلة"
              />

              <CustomInput
                value={newMessageForm.message}
                onChange={(e) => setNewMessageForm({ ...newMessageForm, message: e.target.value })}
                istextarea
                row={5}
                placeholder="اكتب رسالتك هنا..."
              />

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="auth_btn flex-1 py-3 font-bold text-xs !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  إرسال
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewMessageModalOpen(false);
                    setNewMessageForm({ subject: "", message: "" });
                  }}
                  className="flex-1 py-3 font-bold text-xs bg-[#232323] text-gray-300 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors"
                >
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
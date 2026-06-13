import { UserRound, Wallet, Calendar, FileText, Mail, Eye, Triangle, ChevronRight, Gift, Coins, X } from 'lucide-react'
import React, { useState } from 'react'
import HomeCard from '../../components/Common/HomeCard';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import PageTitle from '../../components/Common/PageTitle';
import CustomInput from '../../components/Common/CustomInput';
import CustomSelect from '../../components/Common/CustomSelect';
import ReservationBox from '../../components/Common/ReservationBox';

const menuItems = [
  { id: 1, name: "متابعاتي", icon: Wallet, view: 'followers' },
  { id: 2, name: "حجوزاتي", icon: Calendar, view: 'appointments' },
  { id: 3, name: "عروضي", icon: Eye, view: 'offers' },
  { id: 4, name: "رصيدي", icon: Wallet, view: 'balance' },
  { id: 5, name: "مراسلاتي", icon: Mail, view: 'messages' },
  { id: 6, name: "بياناتي", icon: UserRound, view: 'data' },
]

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const view = searchParams.get('v') || 'menu';
  const [profileData, setProfileData] = useState({
    name: "أحمد محمد أحمد",
    tel: "01234567890",
    job: "مهندس",
    workplace: "", // هنا هيتخزن اسم المستشفى بعد الحفظ
  });

  // الـ States الجديدة للموديل والمدخلات الخاصة بمكان العمل
  const [isWorkplaceModalOpen, setIsWorkplaceModalOpen] = useState(false);
  const [workplaceForm, setWorkplaceForm] = useState({
    hospitalName: "",
    hospitalCode: ""
  });

  // دالة التعامل مع حفظ بيانات مكان العمل
  const handleSaveWorkplace = (e) => {
    e.preventDefault();
    if (workplaceForm.hospitalName.trim() === "") return;

    // تحديث مكان العمل في الـ Profile الأساسي
    setProfileData({
      ...profileData,
      workplace: workplaceForm.hospitalName
    });

    // قفل الموديل
    setIsWorkplaceModalOpen(false);
  };

  // Function to update the view search parameter
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

  const reservationData = ["احمد محمد ", "إيكو", "طنطا", "12/5/2025", "11:00"];

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
              textClass="text-[10px]"
              className='w-full'
            />
          ))}
        </div>
      )}

      {/* My Data (بياناتي) View */}
      {view === 'data' && (
        <div className="flex text-white px-2 mt-5 flex-col gap-2 animate-in fade-in duration-300">
          <div className="flex flex-col gap-2">
            <CustomInput 
              value={profileData.name} 
              onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
              type="text" 
              placeholder="الاسم" 
            />
            <CustomInput 
              value={profileData.tel} 
              onChange={(e) => setProfileData({...profileData, tel: e.target.value})} 
              type="tel" 
              placeholder="رقم التليفون" 
            />
            <CustomInput 
              value={profileData.job} 
              onChange={(e) => setProfileData({...profileData, job: e.target.value})} 
              type="text" 
              placeholder="الوظيفة" 
            />

            {/* عرض مكان العمل الحالي لو تم إضافته */}
            {profileData.workplace && (
              <div className="border border-[#313130] bg-[#171717] p-3 rounded-md mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-400">مكان العمل الحالي:</p>
                <p className="text-sm font-bold text-(--main-color)">{profileData.workplace}</p>
              </div>
            )}
            
            {/* عند الضغط يفتح الموديل */}
            <button 
              type="button"
              onClick={() => setIsWorkplaceModalOpen(true)}
              className="auth_btn w-full! mx-auto! rounded-md! mt-4 py-3.5 font-bold text-sm shadow-[0_0_20px_rgba(var(--main-bg-rgb),0.15)]"
            >
              {profileData.workplace ? "تعديل مكان العمل" : "اضافة مكان العمل +"}
            </button>
            <div className="flex justify-between items-center mt-4">
              <button className="auth_btn cursor-pointer w-full!">حفظ التعديلات</button>

            </div>
          </div>
        </div>
      )}

      {/* My Appointments (حجوزاتي) View */}
      {view === 'appointments' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
           <div className="flex flex-col">
              <ReservationBox data={reservationData} />
              <ReservationBox data={reservationData} />
              <ReservationBox data={reservationData} />
           </div>
        </div>
      )}

      {/* My Followers (متابعاتي) View */}
      {view === 'followers' && (
        <div className='mt-3 text-white px-2 flex flex-col gap-2'>
          <div className='flex gap-2 flex-col'>
            <div className="rounded-sm p-4 border border-[#292929] bg-[#171717] flex flex-col justify-center items-center">
                <p className='text-center mb-2 text-[13.5px] text-(--main-color) font-bold'>تذكير بميعاد المتابعة</p>
                <p className='text-center text-[15px]'>ميعاد المتابعة القادم بتاريخ 14-3-2025 </p>
            </div>
            <button 
            onClick={() => navigate(`/reservations?v=followers`)}
            className='auth_btn py-2 px-8 self-end'>للحجز</button>
          </div>
        </div>
      )}

      {/* My Offers (عروضي) View */}
      {view === 'offers' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
          <div className='flex flex-col gap-2'>
            <div className="rounded-sm p-4 border border-[#292929] bg-[#171717] flex flex-col justify-center items-center gap-2">
                <p className='text-center text-[14px]'>لديك كوبون خصم 50 % على متابعة الايكو بمناسبة شهر رمضان الكريم</p>
                <p className='text-center text-(--main-color) font-bold'>صالح حتى 15-2-2025</p>
            </div>
            <button 
            onClick={()=> navigate(`/reservations?v=offers&svc=1&step=3`)}
            className='auth_btn py-2 px-8 self-end'>للاستخدام</button>
          </div>
        </div>
      )}

      {/* My Balance (رصيدي) View */}
      {view === 'balance' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border border-[#313130] bg-[#171717] p-3 rounded-lg">
              <p className="text-[#d49a3e] font-bold text-sm">رصيدك الحالي :</p>
              <p className="font-bold text-sm">0 ج م</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/70">يمكنك استخدام الرصيد في حجز الخدمات من خلال البرنامج</p>
              <button
              onClick={()=> navigate(`/reservations?v=balance`)}
              className="auth_btn py-2 px-6 self-end">استخدام الرصيد</button>
            </div>
            <div className="flex flex-col gap-2 mt-4">
               <div className="flex justify-between items-center border border-[#313130] bg-[#171717]/50 p-2 rounded">
                  <p className="text-[#d49a3e] text-xs font-bold w-full text-right">تفاصيل الحساب</p>
               </div>
               {[
                 "تم إضافة رصيد 50 جنيه يوم 10-2-2024 صالحة للاستخدام حتى 23-2-2025",
                 "تم إضافة رصيد 50 جنيه يوم 10-2-2024 صالحة للاستخدام حتى 23-2-2025"
               ].map((text, i) => (
                 <div key={i} className="border border-[#313130] bg-[#171717]/30 p-2 rounded">
                   <p className="text-[11px] text-right">{text}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for Correspondence */}
      {view === 'messages' && (
        <div className="mt-3 text-white px-4 flex flex-col gap-6">
          <PageTitle title="مراسلاتي" />
          <div className="text-center py-10">
            <p className="text-white/50 text-sm">لا يوجد رسائل حالياً</p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* الـ Modal الخاص بإضافة مكان العمل */}
      {isWorkplaceModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-[360px] bg-[#171717] border border-[#232323] rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* الهيدر وزر الإغلاق */}
            <div className="flex items-center justify-between border-b border-[#232323] pb-3 mb-4">
              <h3 className="text-white font-bold text-base">إضافة مكان العمل</h3>
              <button 
                onClick={() => setIsWorkplaceModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* الفورم */}
            <form onSubmit={handleSaveWorkplace} className="flex flex-col gap-4 text-right">
              
              {/* مدخل اسم المستشفى */}
              <CustomInput 
                value={workplaceForm.hospitalName}
                onChange={(e) => setWorkplaceForm({...workplaceForm, hospitalName: e.target.value})}
                type="text"
                placeholder="اسم المستشفى"
              />

              {/* مدخل كود المستشفى */}
              <CustomInput 
                value={workplaceForm.hospitalCode}
                onChange={(e) => setWorkplaceForm({...workplaceForm, hospitalCode: e.target.value})}
                type="text"
                placeholder="كود المستشفى"
              />

              {/* أزرار الموديل */}
              <div className="flex gap-3 mt-2">
                <button 
                  type="submit" 
                  className="auth_btn flex-1 py-3 font-bold text-xs rounded-md!"
                >
                  حفظ البيانات
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsWorkplaceModalOpen(false)}
                  className="flex-1 py-3 font-bold text-xs bg-[#232323] text-gray-300 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors"
                >
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------- */}

    </div>
  )
}
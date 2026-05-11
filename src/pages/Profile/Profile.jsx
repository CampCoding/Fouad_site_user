import { UserRound, Wallet, Calendar, FileText, Mail, Eye, Triangle, ChevronRight, Gift, Coins } from 'lucide-react'
import React, { useState } from 'react'
import HomeCard from '../../components/Common/HomeCard';
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
  const [view, setView] = useState('menu');
  const [profileData, setProfileData] = useState({
    name: "أحمد محمد أحمد",
    tel: "01234567890",
    job: "مهندس",
    workplace: ""
  });
  
  const handleBack = () => setView('menu');

  const reservationData = ["احمد محمد ", "إيكو", "طنطا", "12/5/2025", "11:00"];

  return (
    <div className='py-10 mx-auto'>
      {/* Page Title Card */}
      <div className="card mb-4 cursor-pointer" onClick={() => setView('menu')}>
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
              onClick={() => setView(item.view)}
              imgClass="w-[26px] h-[26px]"
              textClass="text-[10px]"
              className='w-full'
            />
          ))}
        </div>
      )}

      {/* My Data (بياناتي) View */}
      {view === 'data' && (
        <div className="flex text-white px-2 mt-5 flex-col gap-2">
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
            <CustomSelect
              placeholder="مكان العمل"
              value={profileData.workplace}
              onChange={(val) => setProfileData({...profileData, workplace: val})}
              options={[
                { id: 1, label: "طنطا", value: "tanta" },
                { id: 2, label: "بنها", value: "banha" },
              ]}
            />
            <p className="text-(--main-color) text-left text-[11px] font-medium cursor-pointer hover:underline">
              اضافة مكان العمل
            </p>
            <button className="mt-4 auth_btn text-black font-bold py-2 px-8 rounded-lg text-[13px] self-start">
              للتعديل
            </button>
          </div>
        </div>
      )}

      {/* My Appointments (حجوزاتي) View */}
      {view === 'appointments' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
           {/* <PageTitle title="حجوزاتي" /> */}
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
          {/* <PageTitle title={"متابعاتي"} /> */}
          <div className='flex gap-2 flex-col'>
            <div className="rounded-sm p-4 border border-[#292929] bg-[#171717] flex flex-col justify-center items-center">
                <p className='text-center mb-2 text-[13.5px] text-(--main-color) font-bold'>تذكير بميعاد المتابعة</p>
                <p className='text-center text-[15px]'>ميعاد المتابعة القادم بتاريخ 14-3-2025 </p>
            </div>
            <button className='auth_btn py-2 px-8 self-end'>للحجز</button>
          </div>
        </div>
      )}

      {/* My Offers (عروضي) View */}
      {view === 'offers' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
          {/* <PageTitle title={"عروضي"}/> */}
          <div className='flex flex-col gap-2'>
            <div className="rounded-sm p-4 border border-[#292929] bg-[#171717] flex flex-col justify-center items-center gap-2">
                <p className='text-center text-[14px]'>لديك كوبون خصم 50 % على متابعة الايكو بمناسبة شهر رمضان الكريم</p>
                <p className='text-center text-(--main-color) font-bold'>صالح حتى 15-2-2025</p>
            </div>
            <button className='auth_btn py-2 px-8 self-end'>للاستخدام</button>
          </div>
        </div>
      )}

      {/* My Balance (رصيدي) View */}
      {view === 'balance' && (
        <div className="mt-3 text-white px-2 flex flex-col gap-2">
          {/* <PageTitle title="رصيدي" /> */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border border-[#313130] bg-[#171717] p-3 rounded-lg">
              <p className="text-[#d49a3e] font-bold text-sm">رصيدك الحالي :</p>
              <p className="font-bold text-sm">0 ج م</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/70">يمكنك استخدام الرصيد في حجز الخدمات من خلال البرنامج</p>
              <button className="auth_btn py-2 px-6 self-end">استخدام الرصيد</button>
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

    </div>
  )
}

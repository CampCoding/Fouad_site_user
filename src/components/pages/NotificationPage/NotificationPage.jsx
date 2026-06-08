import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Printer, Share2, FolderClosed, CheckCircle2, Truck, ArrowDown, Home, Settings, UserRoundCog, Pin, Bell } from 'lucide-react';

export default function NotificationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Issued, 2: Shipping, 3: Delivered

  // Dummy data based on selected record or ID
  const record = {
    id: id,
    child: "اسم الطفل",
    father: "اسم الأب",
    service: "الخدمة",
    date: "تاريخ الخدمة",
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Page Content */}
      <div className="max-w-md mx-auto px-4 pt-10 animate-in fade-in duration-500">
        
        {/* Reports Icon Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#171717] border-2 border-(--main-color) rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.1)] mb-2">
            <img 
              src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png" 
              className="w-10 h-10 object-contain" 
              alt="report" 
            />
          </div>
          <span className="text-white font-bold text-lg">التقارير</span>
        </div>

        {/* Dynamic Content based on Step */}
        <div className="space-y-6">
          
          {/* Status Banner */}
          <div className="border-2 border-(--main-color) py-3 px-4 rounded-lg text-center animate-in zoom-in-95 duration-300">
            <p className="text-(--main-color) font-bold text-sm">
              {step === 1 && "تم صدور التقرير لهذا الفحص"}
              {step === 2 && "تم تلقي طلبكم وجاري تسليم التقرير إلى شركة الشحن"}
              {step === 3 && "تم تسليم التقرير لشركة الشحن"}
            </p>
          </div>

          {/* Step 1: Report Details Table */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-4 gap-1 mb-6 text-white text-[10px] font-bold">
                <div className="bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] border border-(--main-color)/30 p-2 text-center rounded">
                   <p className="text-white text-[10px] font-bold">{record.child}</p>
                </div>
                <div className="bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] border border-(--main-color)/30 p-2 text-center rounded">
                   <p className="text-white text-[10px] font-bold">{record.father}</p>
                </div>
                <div className="bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] border border-(--main-color)/30 p-2 text-center rounded">
                   <p className="text-white text-[10px] font-bold">{record.service}</p>
                </div>
                <div className="bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] border border-(--main-color)/30 p-2 text-center rounded">
                   <p className="text-white text-[10px] font-bold">{record.date}</p>
                </div>
              </div>

              <div className="bg-[#171717]/50 p-4 border border-white/5 rounded-xl text-right">
                <p className="text-[#aaa] text-xs leading-relaxed" style={{ direction: 'rtl' }}>
                  يمكنك الإطلاع على التقرير من خلال الضغط على زر إفتح بالأسفل كما يمكنكم أيضا طباعته أو طلب شحن التقرير إلى محل إقامتكم و يمكنكم إرسال التقرير للطبيب المعالج من خلال الضغط على زر إرسال أو حجز موعد للإستفسار سواء بالمركز أو أونلاين.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 & 3: Shipping Progress */}
          {(step === 2 || step === 3) && (
            <div className="flex flex-col items-center py-6 gap-6 animate-in fade-in zoom-in-95 duration-500">
              {/* Report Icon */}
              <div className="w-14 h-14 bg-[#171717] border border-(--main-color)/50 rounded-lg flex items-center justify-center">
                 <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1742382414/icons_fouady_6_kyj440.png" className="w-8 h-8 opacity-50" style={{ transform: 'rotate(180deg)' }} alt="" />
              </div>

              {/* Transition Icon */}
              <div className="flex flex-col items-center gap-2">
                {step === 2 ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <ArrowDown className="text-(--main-color) w-8 h-8" />
                    <ArrowDown className="text-(--main-color) w-8 h-8 -mt-5 opacity-50" />
                  </div>
                ) : (
                  <CheckCircle2 className="text-(--main-color) w-12 h-12 animate-in zoom-in duration-300" />
                )}
              </div>

              {/* Truck Icon */}
              <div className="w-24 h-24 bg-(--main-color) rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                <Truck className="w-14 h-14 text-black" strokeWidth={2.5} />
              </div>

              {/* Track Button */}
              <button className="mt-4 px-8 py-2 bg-[#171717] border border-(--main-color) text-white text-sm font-bold rounded hover:bg-(--main-color) hover:text-black transition-all">
                متابعة طلبكم
              </button>
            </div>
          )}

          {/* Demo Controls (Only for you to test states) */}
          <div className="mt-10 flex border-t border-white/10 pt-6 justify-center gap-4">
            <button onClick={() => setStep(1)} className={`w-8 h-8 rounded-full border ${step===1?'bg-(--main-color) text-black':'text-white'}`}>1</button>
            <button onClick={() => setStep(2)} className={`w-8 h-8 rounded-full border ${step===2?'bg-(--main-color) text-black':'text-white'}`}>2</button>
            <button onClick={() => setStep(3)} className={`w-8 h-8 rounded-full border ${step===3?'bg-(--main-color) text-black':'text-white'}`}>3</button>
          </div>

        </div>

        {/* Global Action Toolbar (Matches Image 1 bottom icons) */}
        {step === 1 && (
             <div className="grid grid-cols-5 w-full gap-2 mt-10">
                {/* Open Button - Navigates to reports page, passing the notification ID as reportId */}
                <button
                  onClick={() => navigate(`/reports?reportId=${id}`)}
                  className="bg-[#171717] p-4 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-(--main-color)/30 transition-all"
                >
                    <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png" className="w-6 h-6" alt="" />
                </button>
                {/* Send Button */}
                <button className="bg-[#171717] p-4 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-(--main-color)/30 transition-all">
                    <Share2 className="text-(--main-color) w-6 h-6" />
                </button>
                {/* Ship Button */}
                <button className="bg-[#171717] p-4 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-(--main-color)/30 transition-all">
                    <FolderClosed className="text-(--main-color) w-6 h-6" />
                </button>
                {/* Print Button */}
                <button className="bg-[#171717] p-4 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-(--main-color)/30 transition-all">
                    <Printer className="text-(--main-color) w-6 h-6" />
                </button>
                {/* Book Button - Navigates to reservations page */}
                <button
                  onClick={() => navigate('/reservations')}
                  className="bg-[#171717] p-4 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-(--main-color)/30 transition-all"
                >
                    <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png" className="w-6 h-6" alt="" />
                </button>
             </div>
        )}
      </div>
    </div>
  );
}

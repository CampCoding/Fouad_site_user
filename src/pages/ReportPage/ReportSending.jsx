import React from 'react';
import { useParams } from 'react-router';

export default function ReportSending() {
  const { id } = useParams();

  const reportData = {
    child: "اسم الطفل",
    father: "اسم الأب",
    service: "الخدمة",
    date: "تاريخ الخدمة",
    link: "ww.mohamed ebrahem .sss.d"
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportData.link);
    alert("تم نسخ الرابط بنجاح!");
  };

  const handleSend = (platform) => {
    console.log(`Sending to ${platform} for report ${id}`);
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(reportData.link)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(reportData.link)}`, '_blank');
    } else if (platform === 'email') {
      window.open(`mailto:?subject=تقرير&body=${encodeURIComponent(reportData.link)}`, '_blank');
    } else {
      alert(`جاري الإرسال عبر ${platform}...`);
    }
  };

  // ✨ اتشال "إرسال عبر رسالة نصية"
  const actions = [
    { id: 1, text: "لإرسال التقرير عبر واتس آب", btn: "إرسل", platform: "whatsapp" },
    { id: 2, text: "لإرسال التقرير عبر تيليجرام", btn: "إرسل", platform: "telegram" },
    { id: 3, text: "لإرسال التقرير عبر الإيميل", btn: "إرسل", platform: "email" },
    { id: 4, text: "إنسخ رابط التقرير", btn: "إنسخ", platform: "copy" },
  ];

  return (
    <div className='pb-10 animate-in fade-in duration-300'>
      {/* Page Title Card */}
      <div className={`card mt-10`}>
        <img src={"https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png"} className='object-contain' width={40} height={40} alt="report icon" />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          التقارير
        </p>
      </div>

      {/* Page Header Bar */}
      <div className="border h-[38.4px] mt-8 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] shadow-[0_0_10px_rgba(212,154,62,0.1)]">
        <p className='text-white text-center font-bold'>لإرسال التقرير </p>
      </div>

      {/* Top Report Info Grid */}
      <div className='grid grid-cols-4 py-3 border-b-2 border-(--main-color) gap-3 mt-4'>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] shadow-sm'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.child}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] shadow-sm'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.father}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] shadow-sm'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.service}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)] shadow-sm'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.date}</p>
        </div>
      </div>

      {/* Report Link Section */}
      <div className="grid grid-cols-4 gap-3 border rounded-[4px] my-3 border-[#292929]">
        <div className="col-span-1 h-[38.4px] flex items-center justify-center rounded-[4px]">
          <p className="text-[#eee] text-[11px] font-bold">لينك التقرير</p>
        </div>
        <div className="col-span-3 h-[38.4px] flex justify-end items-center px-4 rounded-[4px]">
          <p className="text-(--main-color) text-[11px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">{reportData.link}</p>
        </div>
      </div>

      {/* Sending Actions List */}
      <div className="flex flex-col my-10 gap-3">
        {actions.map((action) => (
          <div key={action.id} className="grid grid-cols-4 gap-3">
            <div className="col-span-3 border h-[38.4px] flex items-center px-4 rounded-[4px] border-(--main-color)/30 bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]">
              <p className="text-[#eee] text-[11px] font-bold">{action.text}</p>
            </div>
            <button
              onClick={() => action.platform === 'copy' ? handleCopy() : handleSend(action.platform)}
              className="col-span-1 h-[38.4px] bg-[#232323] border border-(--main-color)/30 rounded-[4px] text-white text-[11px] font-bold transition-all hover:bg-(--main-color)/20 active:scale-95 cursor-pointer"
            >
              {action.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
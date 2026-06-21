import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import HomeCard from '../../components/Common/HomeCard';
import { PROFILE_DATA, NOTIFICATION_DATA } from '../../utils/notificationData';
import { Bell } from 'lucide-react';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState(NOTIFICATION_DATA);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 0) {
      setFilteredData(NOTIFICATION_DATA);
    } else {
      const categoryName = PROFILE_DATA.find(t => t.id === activeTab)?.name;
      setFilteredData(NOTIFICATION_DATA.filter(item => item.name === categoryName));
    }
  }, [activeTab]);

  const handleNotificationClick = async (item) => {
    // لو فيه PDF نزله
    if (item.pdfUrl) {
      try {
        const response = await fetch(item.pdfUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${item.title || 'report'}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        // fallback لو التحميل المباشر منعه CORS
        window.open(item.pdfUrl, '_blank');
      }

      return;
    }

    // لو مفيش PDF وروت موجود
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <div className="py-10 mx-auto">
      <div className="card mb-4 cursor-pointer" onClick={() => setActiveTab(0)}>
        <Bell size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">التنبيهات</p>
      </div>

      <div className={`grid grid-cols-3 gap-3 px-2 mb-6 transition-all ${activeTab !== 0 ? "border-b border-(--main-color) pb-4" : ""}`}>
        {PROFILE_DATA.map((item) => (
          <HomeCard
            key={item.id}
            item={item}
            activeId={activeTab}
            onClick={() => setActiveTab(item.id)}
            imgClass="w-[26px] h-[26px]"
            textClass="text-[10px]"
            className='w-full'
          />
        ))}
      </div>

      <div className="flex flex-col gap-1 px-1">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className="flex w-full gap-3 items-center pb-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors p-2 rounded-lg"
            >
              <div className="w-[65px] h-[65px] flex-shrink-0">
                <HomeCard
                  item={item}
                  border
                  imgClass="w-[24px] h-[24px]"
                  textClass="text-[9px]"
                  className="!w-full !h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-[65px] p-2 bg-[#171717] border border-white/5 rounded-lg">
                <p className="text-white font-bold text-[15px] text-right line-clamp-2">{item.title}</p>
                <p className="text-(--main-color) text-[10px] text-left">15/2/2025</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-(--main-color)/50 text-sm">لا يوجد تنبيهات في هذا القسم</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react'
import { House, Pin, Settings, Share2, UserRoundCog, Bell } from 'lucide-react'
import { useReport } from '../../context/ReportContext'
import { Link, useLocation, useNavigate } from 'react-router'

export default function TopHeader() {
  const { selectedRecord } = useReport();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isReportPage = location.pathname.includes('/report');

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = isReportPage 
    ? [
        { id: 1, text: "تم تحديث بيانات التقرير الحالي", time: "منذ دقيقتين" },
        { id: 2, text: "طلب طباعة جديد للتقرير", time: "منذ ساعة" },
      ]
    : [
        { id: 1, text: "تنبيه عام: النظام محدث", time: "منذ يوم" },
      ];

  const handleBellClick = () => {
    if (selectedRecord) {
      navigate(`/notifications/${selectedRecord.id}`);
    } else {
      navigate('/notifications');
    }
  };

  return (
    <div
      style={{
        direction: "ltr",
      }}
      className='grid bg-(--dark_gray-4) z-60 fixed left-0 right-0 top-0 grid-cols-6 gap-2 items-center justify-center py-4 border-b-2 border-(--main-color)'>
      <Link to="/">
        <House className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </Link>
      <Link to="/settings">
        <Settings className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </Link>
      <Link to="/profile">
        <UserRoundCog className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </Link>
      <Link to="/share">
      <Share2 className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </Link>
      
      <Link to="/pin">
        <Pin className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </Link>
      
      <div className="relative" ref={dropdownRef}>
        <Bell 
          onClick={handleBellClick}
          className='text-(--main-color) text-center mx-auto w-[26px] h-[26px] cursor-pointer hover:scale-110 transition-transform' 
        />
        {showNotifications && (
          <div className="absolute top-[45px] right-0 w-[250px] bg-[#171717] border-2 border-(--main-color) rounded-[8px] shadow-2xl z-70 animate-in slide-in-from-top-2 duration-200" style={{ direction: 'rtl' }}>
            <div className="p-3 border-b border-(--main-color)/20">
              <p className="text-white font-bold text-sm">
                {isReportPage ? "إشعارات التقارير" : "الإشعارات العامة"}
              </p>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="p-3 hover:bg-(--main-color)/10 border-b border-(--main-color)/10 last:border-0 transition-colors">
                  <p className="text-[#eee] text-xs leading-relaxed">{n.text}</p>
                  <p className="text-(--main-color) text-[10px] mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

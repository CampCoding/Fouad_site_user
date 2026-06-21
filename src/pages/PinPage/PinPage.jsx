import { Pin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function PinPage() {
  const [hasPrompt, setHasPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [platform, setPlatform] = useState('desktop');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios');
    else if (/android/.test(ua)) setPlatform('android');
    else setPlatform('desktop');

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsInstalled(standalone);

    // لو الـ prompt اتسجل قبل ما الصفحة دي تفتح
    if (window.deferredPrompt) {
      setHasPrompt(true);
    }

    const handleInstallable = () => {
      setHasPrompt(true);
      console.log('✅ Prompt available in PinPage');
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setHasPrompt(false);
      setShowHelp(false);
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isInstalled) return;

    const prompt = window.deferredPrompt;

    if (prompt) {
      try {
        prompt.prompt();
        const result = await prompt.userChoice;
        if (result.outcome === 'accepted') {
          window.deferredPrompt = null;
          setHasPrompt(false);
        }
      } catch (error) {
        console.error('Install error:', error);
        setShowHelp(true);
      }
      return;
    }

    setShowHelp(true);
  };

  const renderHelp = () => {
    if (platform === 'ios') {
      return (
        <div className="mt-4 p-3 border !border-(--main-color) rounded-sm text-white text-[13px] leading-6">
          على iPhone / iPad:
          <br />
          1- افتح من <span className="text-(--main-color)">Safari</span>
          <br />
          2- اضغط <span className="text-(--main-color)">Share</span>
          <br />
          3- اختر <span className="text-(--main-color)">Add to Home Screen</span>
        </div>
      );
    }

    return (
      <div className="mt-4 p-3 border !border-(--main-color) rounded-sm text-white text-[13px] leading-6">
        لتثبيت الموقع:
        <br />
        دوس على أيقونة <span className="text-(--main-color)">Install</span> في شريط العنوان بالأعلى
        <br />
        أو من قائمة المتصفح اختر
        <span className="text-(--main-color)"> Install app</span>
      </div>
    );
  };

  return (
    <div className="py-10 mx-auto">
      <div className="card mb-6">
        <Pin size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">التثبيت</p>
      </div>

      <div className="flex flex-col gap-[9.5px]">
        <div className="flex flex-col min-h-[40vh] justify-center gap-[9.5px]">
          <div className="p-2 border !border-(--main-color) !w-full !rounded-sm text-white flex items-center">
            <p className="my-auto ps-2 !text-[13px]">
              {isInstalled
                ? 'الموقع مضاف بالفعل على هذا الجهاز'
                : 'يمكنك إضافة الموقع إلى الشاشة الرئيسية أو سطح المكتب'}
            </p>
          </div>

          <button
            onClick={handleInstall}
            disabled={isInstalled}
            className={`border !mx-auto text-white !w-[140px] !h-[38px] !text-[13px] flex justify-center items-center p-2 px-4 !bg-(--dark-gray) !border-(--main-color) !rounded-sm ${isInstalled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isInstalled ? 'تمت الإضافة' : 'إضافة الموقع'}
          </button>

          {showHelp && renderHelp()}
        </div>
      </div>
    </div>
  );
}
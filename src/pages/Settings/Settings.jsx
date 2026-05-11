import React from 'react';
import SettingDropDown from '../../components/SettingDropDown/SettingDropDown';
import { SETTINGS_DATA } from '../../utils/settingsData';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className='py-10 mx-auto'>
      {/* Page Title Card */}
      <div className="card mb-6">
        <SettingsIcon size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">الإعدادات</p>
      </div>

      <div
      dir='ltr'
      className="px-2">
        <div className="flex flex-col gap-2">
          {SETTINGS_DATA.map((item) => (
            <SettingDropDown key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { Settings as SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import SettingDropDown from "../../components/SettingDropDown/SettingDropDown";
import { SETTINGS_DATA } from "../../utils/settingsData";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <div className="py-10 mx-auto">
      {/* Page Title Card */}
      <div className="card mb-6">
        <SettingsIcon size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("settings.title")}
        </p>
      </div>

      <div dir={isEn ? "ltr" : "rtl"} className="px-2">
        <div className="flex flex-col gap-2">
          {SETTINGS_DATA.map((item) => (
            <SettingDropDown key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

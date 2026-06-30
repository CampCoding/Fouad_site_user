import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import CustomInput from "../Common/CustomInput";
import CustomSelect from "../Common/CustomSelect";

export default function SettingDropDown({ item }) {
  const { t, i18n } = useTranslation();
  const { changeLanguage, lang } = useLanguage();
  const isEn = i18n.language === "en";

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const getTitle = (obj) => {
    if (!obj) return "";
    return isEn ? obj.titleEn || obj.titleAr : obj.titleAr || obj.titleEn;
  };

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (ele, value) => {
    // لو ده الـ Language Switcher - غيّر اللغة فعلياً
    if (ele?.isLanguageSwitcher) {
      changeLanguage(value);
    }
    handleInputChange(ele.id, value);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Header Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full h-[38.4px] items-center justify-between px-4 
          bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] 
          border rounded-lg border-(--main-color)/40 cursor-pointer 
          hover:bg-white/5 transition-colors"
      >
        {isEn ? (
          <>
            <p className="text-white font-bold text-[13px]">{getTitle(item)}</p>
            <ChevronDown
              size={18}
              className={`text-(--main-color) transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        ) : (
          <>
            <ChevronDown
              size={18}
              className={`text-(--main-color) transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <p className="text-white font-bold text-[13px]">{getTitle(item)}</p>
          </>
        )}
      </button>

      {/* Expandable Content - الإصلاح هنا: overflow-visible لما يبقى مفتوح */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isOpen
            ? "max-h-[1000px] opacity-100 py-1 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {item?.data?.map((ele) => (
          <div
            key={ele?.id}
            className={`flex gap-2 items-center justify-between w-full ${
              isEn ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {ele?.isDropDown && ele?.data?.length ? (
              <div className="w-1/2">
                <CustomSelect
                  options={ele.data}
                  value={
                    ele?.isLanguageSwitcher
                      ? lang
                      : formData[ele.id] || ele.data[0].value
                  }
                  onChange={(val) => handleSelectChange(ele, val)}
                  placeholder={getTitle(ele)}
                />
              </div>
            ) : (
              <div className="w-1/2">
                <CustomInput
                  value={formData[ele.id] || ""}
                  onChange={(e) => handleInputChange(ele.id, e.target.value)}
                  placeholder={getTitle(ele)}
                />
              </div>
            )}

            <div className="h-[38.4px] flex-1 bg-[#171717] border border-(--main-color)/20 rounded-[4px] flex items-center justify-end px-4">
              <p className="text-white text-[13px]">{getTitle(ele)}</p>
            </div>
          </div>
        ))}

        {item.id === 3 && (
          <button className="mt-2 w-full bg-(--main-color) text-black font-bold py-2 rounded-lg text-[13px] hover:brightness-110 transition-all">
            {t("settings.saveCard")}
          </button>
        )}
      </div>
    </div>
  );
}

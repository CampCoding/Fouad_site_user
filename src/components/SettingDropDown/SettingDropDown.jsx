import React, { useState } from "react";
import CustomInput from "../Common/CustomInput";
import CustomSelect from "../Common/CustomSelect";
import { ChevronDown } from "lucide-react";

export default function SettingDropDown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full h-[38.4px] items-center justify-between px-4 bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] border rounded-lg border-(--main-color)/40 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <ChevronDown 
          size={18} 
          className={`text-(--main-color) transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
        <p className="text-white font-bold text-[13px]">{item?.title}</p>
      </button>

      <div className={`flex flex-col gap-2 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100 py-1" : "max-h-0 opacity-0"}`}>
        {item?.data?.map((ele) => (
          <div
            key={ele?.id}
            className="flex gap-2 items-center justify-between w-full"
          >
             {ele?.isDropDown && ele?.data?.length ? (
                <div className="w-1/2">
                  <CustomSelect 
                    options={ele.data}
                    value={formData[ele.id] || ele.data[0].value}
                    onChange={(val) => handleInputChange(ele.id, val)}
                    placeholder={ele.title}
                  />
                </div>
              ) : (
                <div className="w-1/2">
                  <CustomInput 
                    value={formData[ele.id] || ""} 
                    onChange={(e) => handleInputChange(ele.id, e.target.value)} 
                    placeholder={ele.title}
                  />
                </div>
              )}
              
            <div
              className={`h-[38.4px] flex-1 bg-[#171717] border border-(--main-color)/20 rounded-[4px] flex items-center justify-end px-4`}
            >
              <p className="text-white text-[13px]">
                {ele?.title}
              </p>
            </div>
          </div>
        ))}
        {item.id === 3 && (
            <button className="mt-2 w-full bg-(--main-color) text-black font-bold py-2 rounded-lg text-[13px] hover:brightness-110 transition-all">
                حفظ البطاقة
            </button>
        )}
      </div>
    </div>
  );
}

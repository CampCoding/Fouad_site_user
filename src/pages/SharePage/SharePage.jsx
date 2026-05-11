import { Share2 } from 'lucide-react'
import React from 'react'

export const SHARE_DATA = [
  {
    id: 1,
    title: "دعوة للإنضمام عبر رسالة نصية للهاتف",
    placeholder: "اكتب الرقم",
    type: "tel",
    btnText: "إرسل",
  },
  {
    id: 2,
    title: "دعوة للإنضمام عبر واتس آب",
    placeholder: "اكتب الرقم",
    type: "tel",
    btnText: "إرسل",
  },
  {
    id: 3,
    title: "دعوة للإنضمام عبر تيليجرام",
    placeholder: "اكتب الرقم",
    type: "tel",
    btnText: "إرسل",
  },
  // {
  //     id:4,
  //     title:"دعوة للإنضمام عبر الإيميل ",
  //     placeholder:"اكتب الإيميل",
  //     type:"email",
  //     btnText :"إرسل"
  // },
  // {
  //     id:5,
  //     title:"إنسخ رابط الدعوة",
  //     btnText :"انسخ",
  //     text:"www.mohamed ebram .sss.d"
  // },
]

export default function SharePage() {
  return (
    <div className="py-10 mx-auto">
      <div className="card mb-6">
        <Share2 size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">مشاركة</p>
      </div>

      <div className="mt-4 text-white">
        <div className="flex flex-col !gap-[9.5px]">
          {SHARE_DATA.map((item) => (
            <div
              key={item?.id}
              className="flex !gap-[9.5px] items-center"
            >
              <div className="bg-transparent border w-full  !border-(--main-color) !rounded-sm px-3  h-[38px] flex  items-center">
                <p className="text-[11px] sm:text-[13px] !rounded-sm text-left text-white my-auto">
                  {item?.title}
                </p>
              </div>
              <button
                className="border !w-[114px] !h-[38px] !text-[13px] flex justify-center items-center p-2 px-4 !bg-(--dark-gray) !border-(--main-color) !rounded-sm"
              >
                {item?.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

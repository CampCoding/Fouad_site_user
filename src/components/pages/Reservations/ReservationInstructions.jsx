import React from 'react'
import { useParams } from 'react-router'

const data = [
  {
    id: 1,
    title: "يتولى فريق الأطباء في الوحدات الخارجية إجراء الفحص ضمن الإطار الزمني المحدد.",
    external_img: "/images/7.png",
    internal_img: '/images/3.png'
  },
  {
    id: 2,
    title: "نظرًا لحساسية الوضع الصحي لأطفالنا ، فإننا نُولي عامل الوقت أولوية قصوى، ونعمل بكل جدية لضمان تقديم الرعاية اللازمة دون تأخير",
    external_img: "/images/8.png",
    internal_img: '/images/4.png'
  },
  {
    id: 3,
    title: "سيتم ابلاغ الاطباء بنتيجة الفحص فور عمله لتمكينهم من التعامل مع الاطفال بما يخص حالة القلب بشكل سليم ",
    external_img: "/images/9.png",
    internal_img: '/images/5.png'
  },
  {
    id: 4,
    title: "سيتم ارفاق التقارير النهائية في البرنامج فور صدوره بعد مراجعته من استشاريين المركز",
    external_img: "/images/10.png",
    internal_img: '/images/6.png'
  },
]

export default function ReservationInstructions() {
  const {type} = useParams();
  const isExternal = type === 'external';
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className={`card mb-6`}>
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png"
          className='object-contain'
          width={40}
          height={40}
          alt="reservation icon"
        />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          الحجز
        </p>
      </div>
      
      <div className="flex flex-col justify-center items-center gap-1">
        {/* Header */}
        <div className="border h-[40px] w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
          <p className='text-white text-center font-bold'>يرجي اتباع التعليمات الاتية</p>
        </div>

        <div className="flex flex-col mt-4 gap-3">
          {data?.map(item => <div
            key={item?.id}
            className="grid grid-cols-[8fr_4fr] gap-3">
            <div className="border rounded-lg text-white text-xs border-(--main-color) p-2">
              {item?.title}
            </div>
            <div className="rounded-lg bg-(--main-bg-color)   p-2 flex justify-center items-center">
              <img src={isExternal ?item?.external_img : item?.internal_img} className='w-10 h-10' alt="" />
            </div>
          </div>)}
        </div>

        <button className="auth_btn px-3 text-xs mx-auto! mt-3">لمزيد من معلومات عن الفحص</button>
      </div>
    </div>
  )
}

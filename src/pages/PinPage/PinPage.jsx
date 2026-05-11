import { Pin } from 'lucide-react'
import React from 'react'

export default function PinPage() {
  return (
    <div className='py-10 mx-auto'>
      {/* Page Title Card */}
      <div className="card mb-6">
        <Pin size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">للتثبيت</p>
      </div>

         <div className="flex flex-col gap-[9.5px]">
      <div className="!gap-[9.5px] flex flex-col h-[40vh] justify-between">
        <div className="p-2  border !border-(--main-color) !h-[38px] !w-full  !rounded-sm text-white flex   items-center">
          <p className="my-auto ps-2 !text-[13px]">
           الآن يمكنك تثبيت البرنامج على سطح الموبايل أو الكمبيوتر
          </p>
        </div>

        <button className="border mx-auto!  text-white  !w-[114px] !h-[38px] !text-[13px] flex justify-center items-center p-2 px-4 !bg-(--dark-gray) !border-(--main-color) !rounded-sm">
          للتثبيت
        </button>
      </div>

      {/* <div className=" !gap-(--fixed-gap) flex justify-between">
        <div className="p-2  border !border-(--main-color) !h-[38px] !w-full  !rounded-sm text-white flex  items-center">
          <p className="my-auto ps-2 !text-[13px]">
            لتثبيت البرنامج على سطح الكمبيوتر  
          </p>
        </div>

        <button className="border text-white  !w-[114px] !h-[38px] !text-[13px] flex justify-center items-center p-2 px-4 !bg-(--dark-gray) !border-(--main-color) !rounded-sm">
          للتثبيت
        </button>
      </div>


      <div className=" !gap-(--fixed-gap) flex justify-between">
        <div className="p-2  border !border-(--main-color) !h-[38px] !w-full  !rounded-sm text-white flex  items-center">
          <p className="my-auto ps-2  !text-[13px]">
            لتثبيت البرنامج على سطح التابلت  
          </p>
        </div>

        <button className="border text-white !w-[114px] !h-[38px] !text-[13px] flex justify-center items-center p-2 px-4 !bg-(--dark-gray) !border-(--main-color) !rounded-sm">
          للتثبيت
        </button>
      </div> */}
      </div>
    </div>
  )
}

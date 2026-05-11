import React from 'react'

export default function PageTitle({ title }) {
  return (
    <div className="w-full bg-[#171717] border border-(--main-color) rounded-sm h-[38.7px] flex items-center justify-center mb-4">
      <p className="text-white font-bold text-[14px]">{title}</p>
    </div>
  )
}

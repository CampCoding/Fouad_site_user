import React from 'react'

export default function ReservationBox({ data = [] }) {
  return (
    <div className="w-full grid grid-cols-5 gap-1 mb-1 border border-[#292929] rounded-sm bg-[#171717] overflow-hidden">
      {data.map((item, idx) => (
        <div 
          key={idx} 
          className={`flex items-center justify-center p-2 text-center text-[11px] ${
            idx === 0 ? 'font-bold text-white bg-white/5' : 'text-white/80'
          } ${idx !== data.length - 1 ? 'border-l border-[#292929]' : ''}`}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

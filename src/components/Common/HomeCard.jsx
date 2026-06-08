import React from 'react';

export default function HomeCard({ 
  item, 
  onClick, 
  activeId, 
  className = "", 
  imgClass = "w-[35px] h-[35px]",
  textClass = "text-[11px]",
  border = false,
  style = {}
}) {
  const isActive = activeId === item?.id;
  
  return (
    <div
      onClick={onClick}
      style={style}
      className={`mx-auto cursor-pointer w-[86px] h-[86px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[8px] items-center justify-center border-[2px] transition-all ${
        isActive || border ? "border-[#d49a3e]" : "border-transparent"
      } ${className}`}
    >
      {item?.icon ? (
        <item.icon className={`${imgClass} text-(--main-color)`} />
      ) : (
        <img src={item?.img || item?.image} className={imgClass} alt={item?.name} />
      )}
      {item?.name && (
        <p className={`font-bold cursor-pointer text-[#eee] text-center px-1 line-clamp-1 ${textClass}`}>
          {item?.name}
        </p>
      )}
    </div>
  );
}

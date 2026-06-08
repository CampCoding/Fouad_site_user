import React from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Printer, Share2, FolderClosed, ChevronDown } from 'lucide-react';

export default function ReportFiles({ records = [], selectedRecord, onSelect, onOpen, onPrint }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isOpenFiles = searchParams.get('filesOpen') === 'true';

  const toggleOpenFiles = () => {
    setSearchParams(prev => {
      prev.set('filesOpen', String(!isOpenFiles));
      return prev;
    });
  };

  return (
    <div className="mt-6 animate-in fade-in duration-300">
      {/* Files Section Header */}
      <div onClick={toggleOpenFiles} className="flex items-center justify-between h-[38.4px] bg-[#171717] border-2 border-(--main-color) rounded-[4px] cursor-pointer transition-all">
        <div className="flex-1 px-3 text-center truncate">
          <span className={`text-sm text-center text-white font-bold`}>
            الملفات
          </span>
        </div>

        <div className="h-full aspect-square flex items-center justify-center">
          <ChevronDown className={`w-4 h-4 text-(--main-color) transition-transform ${isOpenFiles ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Files Records Grid */}
      {isOpenFiles && (
        <div className="mt-4 px-2 max-h-[400px] overflow-y-auto flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {records.map((record) => (
            <div
              key={record.id}
              onClick={() => onSelect(record)}
              className={`grid grid-cols-4 gap-1 cursor-pointer transition-all rounded-[4px]`}
            >
              <div className={`${selectedRecord?.id === record.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-(--main-color)/30'
                } border p-2 text-center rounded-[4px]`}>
                <p className="text-[#eee] text-[10px] font-bold">{record.child}</p>
              </div>

              <div className={`${selectedRecord?.id === record.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-(--main-color)/30'
                }  border p-2 text-center rounded-[4px]`}>
                <p className="text-[#eee] text-[10px] font-bold">{record.father}</p>
              </div>

              <div className={`${selectedRecord?.id === record.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-(--main-color)/30'
                } border p-2 text-center rounded-[4px]`}>
                <p className="text-[#eee] text-[10px] font-bold">{record.service}</p>
              </div>

              <div className={`${selectedRecord?.id === record.id ? 'border-(--main-bg-color)! bg-(--main-bg-color)! text-white!' : 'border-(--main-color)/30'
                } border p-2 text-center rounded-[4px]`}>
                <p className="text-[#eee] text-[10px] font-bold">{record.date}</p>
              </div>
            </div>
          ))}

          {/* Action Buttons Bar */}
          <div className="grid grid-cols-5 w-full gap-2 mt-6">
            {/* Open Button */}
            <button
              onClick={onOpen}
              className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[10px] items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png" className="w-7 h-7" alt="open icon" />
              <span className="text-white text-[11px] font-bold">إفتح</span>
            </button>

            {/* Print Button */}
            <button
              onClick={onPrint}
              className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[10px] items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-7 h-7 text-(--main-color)" />
              <span className="text-white text-[11px] font-bold">إطبع</span>
            </button>

            {/* Ship Button */}
            <button
              onClick={() => {
                if (selectedRecord) {
                   navigate(`/report-shipping/${selectedRecord.id}`);
                } else {
                  alert("يرجى اختيار ملف أولاً");
                }
              }}
              className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[10px] items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <FolderClosed className="w-7 h-7 text-(--main-color)" />
              <span className="text-white text-[11px] font-bold">إشحن</span>
            </button>

            {/* Send Button */}
            <button
              onClick={() => {
                if (selectedRecord) {
                  navigate(`/report-sending/${selectedRecord.id}`)
                } else {
                  alert("يرجى اختيار ملف أولاً");
                }
              }}
              className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[10px] items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <Share2 className="w-7 h-7 text-(--main-color)" />
              <span className="text-white text-[11px] font-bold">إرسل</span>
            </button>

            {/* Book Button */}
            <button
              className="mx-auto cursor-pointer w-full! h-[70px] bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))] rounded-lg flex flex-col gap-[10px] items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png" className="w-7 h-7" alt="book icon" />
              <span className="text-white text-[11px] font-bold">احجز</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { MapPinned, Triangle, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const data = [
  {
    id: 1,
    name: "الفروع الداخليه",
    branches: [
      { id: 1, name: "طنطا", images: ["/images/22.png", "/images/23.png"], address: "شارع البحر - طنطا", mapImg: "/images/24.png" },
      { id: 2, name: "بنها", images: ["/images/22.png"], address: "شارع كلية التجارة - بنها", mapImg: "/images/24.png" },
      { id: 3, name: "المحلة", images: ["/images/22.png"], address: "شارع الجلاء - المحلة", mapImg: "/images/24.png" },
      { id: 4, name: "شبين الكوم", images: ["/images/22.png"], address: "شارع جمال عبد الناصر - أمام نادي الجمهورية - برج الجمهورية", mapImg: "/images/24.png" },
      { id: 5, name: "كفر الشيخ", images: ["/images/22.png"], address: "شارع الخليفة المأمون - كفر الشيخ", mapImg: "/images/24.png" },
      { id: 6, name: "ايتاي", images: ["/images/22.png"], address: "ايتاي البارود - البحيرة", mapImg: "/images/24.png" },
      { id: 6, name: "القاهرة", images: ["/images/22.png"], address: "ايتاي البارود - البحيرة", mapImg: "/images/24.png" },
    ]
  },
  {
    id: 2,
    name: "الوحدات الخارجية",
    branches: [
      { id: 11, name: "محافظة الغربية", images: ["/images/22.png"], address: "الغربية", mapImg: "/images/24.png" },
      { id: 12, name: "محافظة البحيرة", images: ["/images/22.png"], address: "البحيرة", mapImg: "/images/24.png" },
      { id: 13, name: "محافظة المنوفية", images: ["/images/22.png"], address: "المنوفية", mapImg: "/images/24.png" },
      { id: 14, name: "محافظة القليوبية", images: ["/images/22.png"], address: "القليوبية", mapImg: "/images/24.png" },
      { id: 15, name: "محافظة الدقهلية", images: ["/images/22.png"], address: "الدقهلية", mapImg: "/images/24.png" },
      { id: 16, name: "محافظة الشرقية", images: ["/images/22.png"], address: "الشرقية", mapImg: "/images/24.png" },
      { id: 17, name: "محافظة كفر الشيخ", images: ["/images/22.png"], address: "كفر الشيخ", mapImg: "/images/24.png" },
      { id: 18, name: "محافظة القاهرة", images: ["/images/22.png"], address: "القاهرة", mapImg: "/images/24.png" },
      { id: 19, name: "محافظة الأسكندرية", images: ["/images/22.png"], address: "الأسكندرية", mapImg: "/images/24.png" },
    ]
  }
]

export default function Branches() {
  const [view, setView] = useState('categories'); // categories, branch-swiper, how-to-reach
  const [openId, setOpenId] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setCurrentIndex(0);
    setView('branch-swiper');
  };

  const handleReachClick = () => {
    setView('how-to-reach');
  };

  const handleBack = () => {
    if (view === 'how-to-reach') setView('branch-swiper');
    else if (view === 'branch-swiper') setView('categories');
  };

  const nextSlide = () => {
    if (selectedBranch?.images) {
      setCurrentIndex((prev) => (prev + 1) % selectedBranch.images.length);
    }
  };

  const prevSlide = () => {
    if (selectedBranch?.images) {
      setCurrentIndex((prev) => (prev - 1 + selectedBranch.images.length) % selectedBranch.images.length);
    }
  };

  return (
    <div className='pb-20 mx-auto'>
      {/* Page Title Card */}
      <div
        className={`card mt-10 mb-4 cursor-pointer`}
        onClick={() => setView('categories')}
      >
        <MapPinned size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">فروعنا</p>
      </div>

      {/* Header / Navigation Bar */}
      <div 
        className="border h-[38.4px] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer"
        onClick={handleBack}
      >
        {view !== 'categories' && (
          <ChevronRight className="absolute right-3 text-(--main-color)" size={20} />
        )}
        <p className='text-white text-center font-bold text-[14px]'>
          {view === 'categories' ? 'الفروع و الوحدات' : 
           view === 'branch-swiper' ? selectedBranch?.name : 
           `كيف اصل ل فرع ${selectedBranch?.name}`}
        </p>
      </div>

      {/* Categories View */}
      {view === 'categories' && (
        <div className="flex flex-col gap-2 mt-4">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <div
                onClick={() => toggleAccordion(item.id)}
                className="flex items-center px-2 h-[38.4px] 
                 bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))]
                 border rounded-lg border-(--main-color)/40 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="w-4"></div>
                <p className="text-white font-bold text-center flex-1 text-[14px]">{item.name}</p>
                <Triangle
                  size={10}
                  className={`text-(--main-color) transition-transform duration-300 ${openId === item.id ? '' : 'rotate-180'}`}
                  fill="currentColor"
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-[500px] opacity-100 py-3' : 'max-h-0 opacity-0'}`}
              >
                <div className="flex flex-col gap-2 px-2">
                  {item.branches.map((branch) => (
                    <div
                      key={branch.id}
                      onClick={() => handleBranchClick(branch)}
                      className="h-[38.4px] border border-(--main-color)/40 flex justify-center items-center 
                       bg-[linear-gradient(135deg,rgb(0,0,0),#4d4c4c)]
                      rounded-lg cursor-pointer hover:border hover:border-(--main-color) transition-all"
                    >
                      <p className="text-[#eee] font-medium text-[13px]">{branch.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Branch Swiper View */}
      {view === 'branch-swiper' && selectedBranch && (
        <div className="relative flex flex-col items-center gap-4 px-4">
          <div className="w-full bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-4 flex flex-col items-center gap-4 min-h-[300px]">
            {/* Swiper Content */}
            <div className="w-full aspect-video flex justify-center items-center relative overflow-hidden rounded-md border border-white/10">
              <img 
                src={selectedBranch.images[currentIndex]} 
                alt={selectedBranch.name} 
                className="w-full h-full object-cover" 
              />
              
              {selectedBranch.images.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-(--main-color) hover:bg-black/70 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-(--main-color) hover:bg-black/70 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <p className="text-white text-[12px] opacity-70">
              {currentIndex + 1} / {selectedBranch.images.length}
            </p>

            {/* How to Reach Button */}
            <button 
              onClick={handleReachClick}
              className="mt-auto px-10 py-1.5 border border-(--main-color) text-white rounded-[4px] text-[12px] bg-black hover:bg-(--main-color)/10 transition-colors"
            >
              كيف اصل
            </button>
          </div>
        </div>
      )}

      {/* How to Reach View */}
      {view === 'how-to-reach' && selectedBranch && (
        <div className="flex flex-col gap-4 px-4">
          <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-3 flex flex-col items-center gap-4">
            <div className="w-full rounded-md overflow-hidden border border-white/10">
              <img 
                src={selectedBranch.mapImg} 
                alt="Map" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="bg-black/50 p-4 rounded-md border border-(--main-color)/20 w-full">
              <p className="text-white text-center text-[13px] leading-relaxed">
                {selectedBranch.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

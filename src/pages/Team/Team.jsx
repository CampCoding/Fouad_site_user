import { Users2, Triangle, ChevronRight, ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'

const data = [
  {
    id: 1,
    name: "المؤسسون",
    members: [
      {
        id: 101,
        name: "أ.د. أحمد حمدي أحمد شبانة",
        title: "المدير التنفيذي",
        bio: "أستاذ مساعد طب الأطفال، كلية الطب، جامعة طنطا",
        image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685474/11_t94g3h.png" // Placeholder
      },
      {
        id: 102,
        name: "أ.د. محمد الشيمي",
        title: "المؤسس الشريك",
        bio: "أستاذ طب الأطفال والقلب، جامعة عين شمس",
        image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685474/11_t94g3h.png"
      }
    ]
  },
  {
    id: 2,
    name: "القطاع الطبي",
    members: [
      {
        id: 201,
        name: "د. محمد أبو العزم",
        title: "طبيب مقيم قلب الأطفال",
        bio: "طبيب مقيم قلب الأطفال، جامعة طنطا",
        image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685474/11_t94g3h.png"
      }
    ]
  },
  {
    id: 3,
    name: "القطاع الإداري",
    members: [
      {
        id: 301,
        name: "الأستاذ/ هاني الشناوي",
        title: "المدير الإداري",
        bio: "مدير الشئون الإدارية بمراكز فؤادي لقلب الأطفال",
        image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685474/11_t94g3h.png"
      }
    ]
  },
  {
    id: 4,
    name: "القطاع العلمي",
    members: [
      {
        id: 401,
        name: "د. شيماء النجار",
        title: "مسئول البحث العلمي",
        bio: "مدرس مساعد طب الأطفال، كلية الطب، جامعة طنطا",
        image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685474/11_t94g3h.png"
      }
    ]
  }
]

export default function Team() {
  const [view, setView] = useState('categories'); // categories, team-slider
  const [openId, setOpenId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setView('team-slider');
  };

  const handleBack = () => {
    if (view === 'team-slider') setView('categories');
  };

  const nextSlide = () => {
    if (selectedCategory?.members) {
      setCurrentIndex((prev) => (prev + 1) % selectedCategory.members.length);
    }
  };

  const prevSlide = () => {
    if (selectedCategory?.members) {
      setCurrentIndex((prev) => (prev - 1 + selectedCategory.members.length) % selectedCategory.members.length);
    }
  };

  return (
    <div className='pb-20 mx-auto'>
      {/* Page Title Card */}
      <div
        className={`card mb-4 cursor-pointer`}
        onClick={() => setView('categories')}
      >
        <Users2 size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">فريقنا</p>
      </div>

      {/* Header / Navigation Bar */}
      <div 
        className="border h-[38.4px] mb-3 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer"
        onClick={handleBack}
      >
        {view !== 'categories' && (
          <ChevronRight className="absolute right-3 text-(--main-color)" size={20} />
        )}
        <p className='text-white text-center font-bold text-[14px] px-8 line-clamp-1'>
          {view === 'categories' ? 'إختار القسم' : selectedCategory?.name}
        </p>
      </div>

      {/* Categories View */}
      {view === 'categories' && (
        <div className="flex flex-col gap-2 mt-4 px-4">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <div
                onClick={() => toggleAccordion(item.id)}
                className="flex items-center px-4 h-[38.4px] 
                 bg-[linear-gradient(90deg,rgba(36,36,36,0.63),rgba(64,64,64,0.63))]
                 border rounded-lg border-(--main-color)/40 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="w-4"></div>
                <p className="text-white font-bold text-center flex-1 text-[13px]">{item.name}</p>
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
                   <div
                    onClick={() => handleCategoryClick(item)}
                    className="h-[38.4px] border border-(--main-color)/40 flex justify-center items-center 
                     bg-[linear-gradient(135deg,rgb(0,0,0),#4d4c4c)]
                    rounded-lg cursor-pointer hover:border hover:border-(--main-color) transition-all"
                  >
                    <p className="text-[#eee] font-medium text-[13px]">عرض الفريق</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Slider View */}
      {view === 'team-slider' && selectedCategory && (
        <div className="flex flex-col gap-4 px-4 relative">
          <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-6 flex flex-col items-center gap-6 min-h-[480px]">
            
            {/* Title above image */}
            <div className="w-full h-[38.4px] bg-black/50 border border-(--main-color)/40 rounded-lg flex justify-center items-center">
                <p className="text-(--main-color) font-bold text-[14px]">
                    {selectedCategory.members[currentIndex].title}
                </p>
            </div>

            {/* Member Image */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-(--main-color)/40 shadow-[0_0_20px_rgba(212,154,62,0.2)]">
              <img 
                src={selectedCategory.members[currentIndex].image} 
                alt={selectedCategory.members[currentIndex].name} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Name Plate */}
            <div className="w-full h-[38.4px] bg-black border border-(--main-color)/60 rounded-lg flex justify-center items-center shadow-lg">
                <p className="text-white font-bold text-[14px]">
                    {selectedCategory.members[currentIndex].name}
                </p>
            </div>

            {/* Bio Plate */}
            <div className="w-full p-4 bg-black/30 border border-(--main-color)/20 rounded-lg flex-1">
              <p className="text-[#ccc] text-center text-[12px] leading-relaxed">
                {selectedCategory.members[currentIndex].bio}
              </p>
            </div>

            {/* Navigation Arrows (if multiple members) */}
            {selectedCategory.members.length > 1 && (
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={prevSlide}
                  className="p-2 border border-(--main-color)/40 rounded-full hover:bg-(--main-color)/10 text-(--main-color)"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-2 border border-(--main-color)/40 rounded-full hover:bg-(--main-color)/10 text-(--main-color)"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

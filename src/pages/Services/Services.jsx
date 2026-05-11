import { HeartHandshake, Triangle, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const data = [
  {
    id: 1,
    name: "فحوصات قلب الأطفال التشخيصية",
    services: [
      { 
        id: 1, 
        name: "إيكو (أشعة تليفزيونية على القلب)", 
        image: "/images/25.png", 
        description: "أحدث أجهزة الموجات فوق الصوتية الملونة على القلب (الدوبلر الملون) للأطفال وحديثي الولادة والأجنة للكشف عن العيوب الخلقية بالقلب، وثقوب القلب، وضيق أو ارتجاع صمامات القلب، وقياس كفاءة عضلة القلب." 
      },
      { 
        id: 2, 
        name: "رسم قلب كهربائي", 
        image: "/images/26.png", 
        description: "رسم القلب الكهربائي للأطفال وحديثي الولادة لتشخيص سرعة أو بطء ضربات القلب، وخلل كهربة القلب، واضطرابات النظم." 
      },
      { 
        id: 3, 
        name: "هولتر", 
        image: "/images/27.png", 
        description: "جهاز رسم قلب محمول (هولتر) لمدة ٢٤ إلى ٤٨ ساعة لتسجيل ضربات القلب باستمرار أثناء ممارسة الحياة الطبيعية." 
      },
    ]
  },
  {
    id: 2,
    name: "عيادات قلب الأطفال التخصصية",
    services: [
      { 
        id: 4, 
        name: "عيادة كهربة القلب", 
        image: "/images/35.png", 
        description: "ما هي أهداف العيادة؟\n• تشخيص وعلاج حالات اضطرابات نظم القلب (سرعة، بطء، أو عدم انتظام ضربات القلب).\n• رسم القلب الكهربائي للأطفال وحديثي الولادة.\n• جهاز الهولتر.\n• تشخيص وعلاج حالات الإغماء المتكرر.\n• فحص عائلات مرضى اضطراب نظم القلب الوراثي." 
      },
      { 
        id: 44, 
        name: "عيادة الحمى الروماتيزمية للقلب", 
        image: "/images/37.png", 
        description: "ما هي أهداف العيادة؟\n• التشخيص المبكر لحالات الحمى الروماتيزمية.\n• متابعة حالات تأثر صمامات القلب بالحمى الروماتيزمية.\n• برنامج الوقاية الأولية والثانوية من الحمى الروماتيزمية." 
      },
      { 
        id: 45, 
        name: "عيادة العيوب الخلقية في القلب", 
        image: "/images/38.png", 
        description: "ما هي أهداف العيادة؟\n• تشخيص العيوب الخلقية في القلب للأطفال وحديثي الولادة والأجنة.\n• متابعة حالات العيوب الخلقية قبل وبعد العمليات الجراحية أو القسطرة العلاجية." 
      },
    ]
  },
  {
    id: 3,
    name: "برامج متابعة قلب الأطفال",
    services: [
      { 
        id: 5, 
        name: "برنامج العائلة", 
        image: "/images/30.png", 
        description: "ما هي أهداف البرنامج؟\n• فحص قلب الأطفال المقربين من الدرجة الأولى لمرضى عيوب القلب الخلقية وأمراض عضلة القلب الوراثية.\n• الكشف المبكر عن أي إصابات مشابهة وبدء العلاج المبكر." 
      },
      { 
        id: 55, 
        name: "برنامج فحص قلب الرياضيين", 
        image: "/images/31.png", 
        description: "ما هي أهداف البرنامج؟\n• فحص القلب للرياضيين قبل البدء في ممارسة الرياضة لضمان سلامة القلب وتجنب حدوث أي مضاعفات أثناء المجهود البدني الشديد." 
      },
      { 
        id: 56, 
        name: "برنامج فحص القلب قبل العمليات الجراحية", 
        image: "/images/32.png", 
        description: "ما هي أهداف البرنامج؟\n• تقييم كفاءة القلب وصماماته قبل إجراء أي عمليات جراحية غير قلبية لضمان سلامة الطفل أثناء التخدير والجراحة." 
      },
    ]
  },
  {
    id: 4,
    name: "دعم و تثقيف الأسرة",
    services: [
      { id: 6, name: "التثقيف الطبي", image: "/images/33.png", description: "تقديم معلومات طبية مبسطة للأهل حول حالة طفلهم وكيفية التعامل معها." },
      { id: 66, name: "تأهيل الأطفال للحالات الجراحية والقسطرة القلبية", image: "/images/34.png", description: "تحضير الطفل نفسياً وجسدياً قبل إجراء العمليات أو القسطرة." },
      { id: 67, name: "إعادة التأهيل للأطفال بعد جراحة وقسطرة القلب", image: "/images/35.png", description: "برنامج متابعة وتأهيل لضمان عودة الطفل لحياته الطبيعية بأمان." },
    ]
  },
  {
    id: 5,
    name: "الخدمات الخارجية (الوحدات المتنقلة)",
    services: [
      { id: 7, name: "إيكو (أشعة تليفزيونية على القلب)", image: "/images/25.png", description: "خدمة الإيكو المتنقلة في المنازل والمستشفيات." },
      { id: 71, name: "رسم قلب كهربائي", image: "/images/26.png", description: "خدمة رسم القلب المتنقلة." },
      { id: 72, name: "هولتر", image: "/images/27.png", description: "تركيب جهاز الهولتر في مكان تواجد المريض." },
      { id: 73, name: "أشعة تليفزيونية على المخ", image: "/images/36.png", description: "فحص المخ بالموجات فوق الصوتية للأطفال وحديثي الولادة." },
      { id: 74, name: "فحص قاع عين", image: "/images/39.png", description: "فحص شبكية العين وقاع العين للأطفال المبتسرين وحديثي الولادة." },
    ]
  },
  {
    id: 6,
    name: "خدمات نيوكير",
    services: [
      { id: 8, name: "أشعة تليفزيونية على المخ", image: "/images/36.png", description: "فحص المخ بالموجات فوق الصوتية للأطفال وحديثي الولادة للكشف عن النزيف أو العيوب الخلقية." },
      { id: 81, name: "فحص قاع عين", image: "/images/39.png", description: "فحص شبكية العين وقاع العين للأطفال المبتسرين وحديثي الولادة." },
    ]
  }
]

export default function Services() {
  const [view, setView] = useState('categories'); // categories, service-detail
  const [openId, setOpenId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();
  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setView('service-detail');
  };

  const handleBack = () => {
    if (view === 'service-detail') setView('categories');
  };

  return (
    <div className='pb-20 mx-auto'>
      {/* Page Title Card */}
      <div
        className={`card mb-4 cursor-pointer`}
        onClick={() => setView('categories')}
      >
        <HeartHandshake size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">خدماتنا</p>
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
          {view === 'categories' ? 'إختار القسم' : 
           selectedService?.name}
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
                  {item.services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className="h-[38.4px] border border-(--main-color)/40 flex justify-center items-center 
                       bg-[linear-gradient(135deg,rgb(0,0,0),#4d4c4c)]
                      rounded-lg cursor-pointer hover:border hover:border-(--main-color) transition-all"
                    >
                      <p className="text-[#eee] font-medium text-[13px]">{service.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Detail View */}
      {view === 'service-detail' && selectedService && (
        <div className="flex flex-col gap-4 px-4">
          <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-4 flex flex-col items-center gap-4">
            <div className="w-full aspect-video rounded-md overflow-hidden border border-white/10">
              <img 
                src={selectedService.image} 
                alt={selectedService.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <p className="text-white text-right text-[13px] leading-relaxed whitespace-pre-line">
              {selectedService.description}
            </p>

            <button 
              onClick={() => navigate('/reservations')}
              className="mt-4 px-12 py-1.5 border border-(--main-color) text-white rounded-[4px] text-[13px] bg-black hover:bg-(--main-color)/10 transition-colors font-bold"
            >
              للحجز
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

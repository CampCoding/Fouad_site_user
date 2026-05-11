import React, { useState } from 'react';
import { HouseHeart, Triangle, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const data = [
  {
    id: 1,
    name: "الأمراض",
    types: [
      {
        id: 1, name: "المقالات",
        data: [
          {
            id: 1,
            name: "الثقب بين الأذنين",
            content: 'هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين الغرفتين الصغيرتين فى القلب (الأذينين)',
            img: '/images/14.png',
            data: [
              {
                id: 1,
                title: " ما هو الثقب بين الأذنين ؟",
                content: 'هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين الغرفتين الصغيرتين فى القلب (الأذينين)',
                img: '/images/17.png'
              },
              { id: 2, title: "كيف تشك الأم بوجود ثقب بين الأذنين ؟" },
              { id: 3, title: "أسباب حدوث الثقب بين الأذنين ؟" },
              { id: 4, title: "المشاكل التي تسببها الثقب بين الأذنين" },
              { id: 5, title: "كيف يتم التشخيص ؟" },
              { id: 6, title: "هل يمكن أن يغلق الثقب تلقائيًا ؟" },
              { id: 7, title: "متابعة الحالة" },
              { id: 8, title: "متى نلجأ لعلاج الثقب بين الأذنين؟" }
            ]
          },
          {
            id: 2,
            name: " الثقب بين البطينين",
            content: "هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين البطين الأيمن و الأيسر للقلب",
            img: "/images/14.png",
          },
          {
            id: 3,
            name: " الثقب الجنيني",
            content: "هو فتحة في الجدار الفاصل بين الأذينين الأيمن والأيسر للقلب نتيجة لعدم انغلاق الفتحه البيضاويه بين الأذينين بعد الولادة و هو شائع الحدوث و يبلغ معدل حدوثه 25% بين الاطفال حديثى الولادة",
            img: "/images/14.png",
          },
          {
            id: 4,
            name: "القناة الشريانية المفتوحة",
            content: "هي أحد أكثر العيوب الخلقية انتشارًا و التى تصيب القلب نتيجة لعدم غلق القناة الشريانية التى تصل الشريان الرئوى بالشريان الأورطى بعد الولادة",
            img: "/images/14.png",
            data: [
              {
                id: 1,
                title: " ما هى القناة الشريانية المفتوحة ؟",
                content: 'عادة يتم اكتشاف القناة الشريانية المفتوحة عندما يلاحظ الطبيب سرعة ضربات القلب او تغيير فى اصوات القلب و يرسل الطفل لعمل فحص باشعه الايكو على القلب الذى يظهر:',
                img: '/images/17.png'
              },
              { id: 2, title: "كيف تشك الأم بوجود القناة الشريانية المفتوحة ؟" },
              { id: 3, title: " أسباب حدوث القناة الشريانية المفتوحة ؟" },
              { id: 4, title: "المشاكل التي تسببها القناة الشريانية المفتوحة" },
              { id: 5, title: "كيف يتم التشخيص ؟" },
              { id: 6, title: "هل يمكن أن تغلق القناة تلقائيًا ؟" },
              { id: 7, title: "متابعة الحالة" },
              { id: 8, title: "متى نلجأ لعلاج القناة الشريانية المفتوحة؟" }
            ]
          }
        ]
      },
      { 
        id: 2, name: "الفيديوهات",
        data: [
          { id: 1, name: "الثقب بين الأذنين", videoUrl: "#" },
          { id: 2, name: "الثقب بين البطينين", videoUrl: "#" },
          { id: 3, name: "الثقب الجنيني", videoUrl: "#" },
          { id: 4, name: "القناة الشريانية المفتوحة", videoUrl: "#" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "الفحوصات",
    types: [
      { 
        id: 1, name: "المقالات",
        data: [
          {
            id: 1,
            name: "رسم القلب الكهربائي (ECG)",
            content: "هو اختبار بسيط وسريع يسجل النشاط الكهربائي للقلب.",
            img: "/images/18.png",
            data: [
              { id: 1, title: "ما هو رسم القلب؟" },
              { id: 2, title: "متى يطلب الطبيب رسم القلب؟" },
              { id: 3, title: "كم يستغرق الفحص؟" },
              {
                id: 4,
                title: "كيف يتم عمل رسم القلب؟",
                content: "• يحتاج طفلك لخلع القميص.\n• يستلقي طفلك على ظهره على سرير الفحص مغطى بملاءة للخصوصية.\n• يتم إجراء الفحص باستخدام ملصقات بلاستيكية صغيرة توضع على صدر طفلك وذراعيه وساقيه.\n• يتم توصيل الأسلاك المتصلة بجهاز رسم القلب.\n• يتم أخذ لقطة من نشاط القلب بواسطة الكمبيوتر وطباعتها.\n• بمجرد الانتهاء من رسم القلب، سيتم فصل الأسلاك ونزع الملصقات.",
                footerImg: "/images/19.png"
              },
              { id: 5, title: "هل يمكنني البقاء مع طفلي أثناء الفحص؟" },
              { id: 6, title: "كيف يمكنك تحضير طفلك في المنزل لإجراء رسم القلب؟" }
            ]
          },
          {
            id: 2,
            name: "فحص الإيكو (ECHO)",
            content: "هو فحص بالموجات فوق الصوتية للقلب يظهر بنية القلب ووظيفته.",
            img: "/images/13.png",
            data: [
              { id: 1, title: "ما هو فحص الإيكو؟" },
              { id: 2, title: "ما فائدة الفحص بأشعة الإيكو؟" },
              { id: 3, title: "كم يستغرق الفحص؟" },
              { id: 4, title: "من يشرف على عمل الفحص؟" },
              { id: 5, title: "متى يطلب الطبيب فحص الإيكو؟" },
              { id: 6, title: "كيف تحضر طفلك للإيكو؟" },
              {
                id: 7,
                title: "متى يحتاج طفلك إلى مهدئ لإجراء الإيكو؟",
                content: "• لا يحتاج معظم الأطفال إلى القيام بأي شئ خاص للاستعداد لفحص الإيكو.\n• نظرًا لأن الحركة أثناء الفحص يمكن أن تجعل صوره رديئة وتجعل الفحص يستغرق وقتا أطول، فقد يحتاج بعض الأطفال (خاصة ما دون ٤ سنوات) إلى مهدئ ما لم يكن هناك مانع طبي.\n• يتم استخدام الأدوية المنومة الخفيفة عن طريق الفم قبل ٣٠ إلى ٤٥ دقيقة من موعد الفحص.\n• يتم حساب الجرعة المطلوبة تحت إشراف الطبيب حسب وزن الطفل.\n• سيصاب الطفل بالنعاس فجأة مما يجعل الفحص أسهل ويعطي صورًا أوضح للقلب.",
                footerImg: "/images/19.png"
              },
              { id: 8, title: "ماذا سيحدث خلال فحص الإيكو بالخطوات؟" },
              { id: 9, title: "متى يتم استلام نتيجة الفحص الخاصة بالطفل؟" }
            ]
          },
          {
            id: 3,
            name: "الهولتر (Holter ECG)",
            content: "هو جهاز محمول يسجل النشاط الكهربائي للقلب باستمرار لمدة ٢٤ إلى ٤٨ ساعة.",
            img: "/images/20.png",
            data: [
              { id: 1, title: "ما هو جهاز الهولتر؟" },
              { id: 2, title: "لماذا يتم استخدامه؟" }
            ]
          }
        ]
      },
      { 
        id: 2, name: "الفيديوهات",
        data: [
          { id: 1, name: "رسم القلب الكهربائي (ECG)", videoUrl: "#" },
          { id: 2, name: "فحص الإيكو (ECHO)", videoUrl: "#" },
          { id: 3, name: "الهولتر (Holter ECG)", videoUrl: "#" }
        ]
      }
    ]
  }
];

export default function EducationPage() {
  const [view, setView] = useState('categories'); // categories, slider, list, detail, video-list, video-player
  const [openId, setOpenId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleTypeClick = (item, type) => {
    if (type.name === "المقالات") {
      if (type.data && type.data.length > 0) {
        setSelectedType(type);
        setCurrentIndex(0);
        setView('slider');
      }
    } else if (type.name === "الفيديوهات") {
      if (type.data && type.data.length > 0) {
        setSelectedType(type);
        setView('video-list');
      }
    }
  };

  const nextSlide = () => {
    if (selectedType?.data) {
      setCurrentIndex((prev) => (prev + 1) % selectedType.data.length);
    }
  };

  const prevSlide = () => {
    if (selectedType?.data) {
      setCurrentIndex((prev) => (prev - 1 + selectedType.data.length) % selectedType.data.length);
    }
  };

  const handleMoreClick = (article) => {
    if (article.data) {
      setSelectedArticle(article);
      setView('list');
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setView('detail');
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setView('video-player');
  };

  const handleBack = () => {
    if (view === 'detail') setView('list');
    else if (view === 'list') setView('slider');
    else if (view === 'video-player') setView('video-list');
    else if (view === 'video-list') setView('categories');
    else if (view === 'slider') setView('categories');
  };

  const currentArticle = selectedType?.data?.[currentIndex];

  return (
    <div className='pb-20  mx-auto'>
      {/* Page Title Card */}
      <div 
        className={`card mb-4 cursor-pointer`}
        onClick={() => setView('categories')}
      >
        <HouseHeart size={40} className="text-(--main-color)" />
        <p className="font-bold text-[17px] text-[#eee]">
          التثقيف
        </p>
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
          {view === 'categories' ? 'إختار نوع التثقيف' : 
           view === 'slider' ? currentArticle?.name : 
           view === 'list' ? selectedArticle?.name :
           view === 'video-list' ? 'الفيديوهات' :
           view === 'video-player' ? selectedVideo?.name :
           selectedTopic?.title}
        </p>
      </div>

      {/* Main Content Areas */}
      {view === 'categories' && (
        <div className="flex flex-col gap-2 mt-4">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <div
                onClick={() => toggleAccordion(item.id)}
                className="flex items-center px-4 h-[38.4px] 
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-60 opacity-100 py-3' : 'max-h-0 opacity-0'}`}
              >
                <div className="flex flex-col gap-2 px-2">
                  {item.types.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleTypeClick(item, type)}
                      className="h-[38.4px] border border-(--main-color)/40 flex justify-center items-center 
                       bg-[linear-gradient(135deg,rgb(0,0,0),#4d4c4c)]
                      rounded-lg cursor-pointer hover:border hover:border-(--main-color) transition-all"
                    >
                      <p className="text-[#eee] font-medium text-[13px]">{type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'slider' && currentArticle && (
        <div className="relative flex flex-col items-center px-4">
          <div className="w-full bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-6 flex flex-col items-center gap-4 min-h-[350px]">
            {/* Image Container */}
            <div className="w-40 h-40 flex justify-center items-center">
              <img src={currentArticle.img} alt={currentArticle.name} className="max-w-full max-h-full object-contain" />
            </div>
            
            {/* Description */}
            <p className="text-white text-center text-[13px] leading-relaxed line-clamp-4">
              {currentArticle.content}
            </p>

            {/* More Button */}
            <button 
              onClick={() => handleMoreClick(currentArticle)}
              className="mt-auto px-10 py-1.5 border border-(--main-color) text-white rounded-[4px] text-[12px] bg-black hover:bg-(--main-color)/10 transition-colors"
            >
              المزيد
            </button>

            {/* Navigation Arrows */}
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-(--main-color) hover:scale-110 transition-transform">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-(--main-color) hover:scale-110 transition-transform">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {view === 'list' && selectedArticle && (
        <div className="flex flex-col gap-2 px-4">
          {selectedArticle.data?.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="flex items-center px-4 h-[38.4px] bg-black border border-(--main-color)/40 rounded-md cursor-pointer hover:bg-white/5 transition-colors"
            >
              <Triangle size={10} className="text-(--main-color) rotate-180" fill="currentColor" />
              <p className="text-[#eee] font-medium text-center flex-1 text-[13px]">{topic.title}</p>
              <div className="w-4"></div>
            </div>
          ))}
        </div>
      )}

      {view === 'video-list' && selectedType && (
        <div className="flex flex-col gap-2 px-4">
          {selectedType.data?.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="flex items-center px-4 h-[38.4px] bg-black border border-(--main-color)/40 rounded-md cursor-pointer hover:bg-white/5 transition-colors"
            >
              <Triangle size={10} className="text-(--main-color) rotate-180" fill="currentColor" />
              <p className="text-[#eee] font-medium text-center flex-1 text-[13px]">{video.name}</p>
              <div className="w-4"></div>
            </div>
          ))}
        </div>
      )}

      {view === 'video-player' && selectedVideo && (
        <div className="flex flex-col gap-4 px-4">
          <div className="w-full aspect-video bg-black border border-(--main-color)/20 rounded-lg flex items-center justify-center relative overflow-hidden">
             {/* Mockup Video Player UI */}
             <div className="w-16 h-16 rounded-full border-2 border-(--main-color) flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play size={32} className="text-(--main-color) fill-(--main-color)" />
             </div>
             <p className="absolute bottom-4 text-(--main-color) text-[10px] opacity-50">Video Player Interface</p>
          </div>
          <p className="text-white text-center text-sm font-bold">{selectedVideo.name}</p>
        </div>
      )}

      {view === 'detail' && selectedTopic && (
        <div className="bg-[linear-gradient(180deg,rgb(21,21,21),rgb(0,0,0))] border border-(--main-color)/20 rounded-lg p-6 flex flex-col gap-6 mx-4">
           <p className="text-white text-sm leading-relaxed text-right whitespace-pre-line">
            {selectedTopic.content || "محتوى المقال سيتم إضافته قريباً..."}
          </p>
          {(selectedTopic.img || selectedTopic.footerImg) && (
            <div className="w-full flex justify-center mt-4">
              <img src={selectedTopic.img || selectedTopic.footerImg} alt={selectedTopic.title} className="max-w-[200px] object-contain" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

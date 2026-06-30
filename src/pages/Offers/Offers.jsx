import { Calendar, ChevronLeft, ChevronRight, Tag, X } from "lucide-react";
import { useState } from "react";

const OFFERS_DATA = [
  {
    id: 1,
    image: "/images/offer-1.jpg",
    title: "باقة الكشف الشامل",
    description:
      "باقة متكاملة تشمل الكشف العام، وقياس ضغط الدم، وتحاليل الدم الأساسية، ورسم القلب. مناسبة لجميع الأعمار وللاطمئنان الدوري على صحتك.",
    price: "500 ج.م",
    oldPrice: "750 ج.م",
    validUntil: "ساري حتى نهاية الشهر",
  },
  {
    id: 2,
    image: "/images/offer-2.jpg",
    title: "خصم 30% على فحوصات القلب",
    description:
      "خصم خاص على فحوصات القلب الشاملة (ECG، Echo، اختبار المجهود). متاح لفترة محدودة بإشراف نخبة من استشاريي القلب.",
    price: "700 ج.م",
    oldPrice: "1000 ج.م",
    validUntil: "العرض ساري لمدة أسبوعين",
  },
];

export default function Offers() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openOffer = (index) => setActiveIndex(index);
  const closeOffer = () => setActiveIndex(null);

  const nextOffer = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % OFFERS_DATA.length);
  };

  const prevOffer = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? OFFERS_DATA.length - 1 : prev - 1));
  };

  const currentOffer = activeIndex !== null ? OFFERS_DATA[activeIndex] : null;

  return (
    <div className="py-10 mx-auto">
      {/* Page Title */}
      <div className="card mb-6">
        <Tag size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">عروضنا</p>
      </div>

      {/* Offers List */}
      {OFFERS_DATA.length === 0 ? (
        <div className="text-center py-20">
          <Tag size={50} className="text-(--main-color)/50 mx-auto mb-3" />
          <p className="text-white/50 text-[14px]">لا توجد عروض حاليًا</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-1">
          {OFFERS_DATA.map((offer, index) => (
            <div
              key={offer.id}
              className="bg-[#171717] border border-(--main-color)/40 rounded-lg overflow-hidden hover:border-(--main-color) transition-all"
            >
              {/* Image */}
              <div
                onClick={() => openOffer(index)}
                className="relative cursor-pointer overflow-hidden aspect-[16/9] group"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Price Badge */}
                {offer.price && (
                  <div className="absolute top-3 right-3 bg-(--main-color) text-black font-bold text-[13px] px-3 py-1 rounded-md shadow-lg">
                    {offer.price}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-[16px]">
                    {offer.title}
                  </h3>
                  {offer.oldPrice && (
                    <span className="text-white/40 text-[12px] line-through">
                      {offer.oldPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-white/70 text-[13px] leading-6">
                  {offer.description}
                </p>

                {/* Validity */}
                {offer.validUntil && (
                  <div className="flex items-center gap-2 text-(--main-color) text-[12px]">
                    <Calendar size={14} />
                    <span>{offer.validUntil}</span>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openOffer(index)}
                    className="flex-1 h-[36px] border border-(--main-color) rounded-md text-white text-[12px] font-bold hover:bg-(--main-color)/10 transition-colors"
                  >
                    عرض الصورة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Lightbox Modal ===== */}
      {currentOffer && (
        <div
          onClick={closeOffer}
          className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-4"
        >
          <button
            onClick={closeOffer}
            className="absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black z-10"
          >
            <X size={22} className="text-white" />
          </button>

          <button
            onClick={prevOffer}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-(--main-color) z-10 transition-colors"
          >
            <ChevronRight size={22} className="text-white" />
          </button>

          <button
            onClick={nextOffer}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-(--main-color) z-10 transition-colors"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={currentOffer.image}
              alt={currentOffer.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-[16px] font-bold mt-4 text-center">
              {currentOffer.title}
            </p>
            <p className="text-white/60 text-[12px] mt-2 text-center max-w-[500px] px-4">
              {currentOffer.description}
            </p>
            <p className="text-white/40 text-[11px] mt-2">
              {activeIndex + 1} / {OFFERS_DATA.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

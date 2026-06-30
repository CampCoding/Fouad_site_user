import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Newspaper,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

const NEWS_DATA = [
  {
    id: 1,
    title: "افتتاح فرع جديد في مدينة نصر",
    description:
      "يسعدنا أن نعلن عن افتتاح فرع جديد للمركز في مدينة نصر، مجهز بأحدث الأجهزة الطبية وفريق متخصص من الاستشاريين لتقديم أفضل خدمة طبية لجميع المرضى.",
    date: "2026-01-20",
  },
  {
    id: 2,
    title: "حملة توعية مجانية لصحة القلب",
    description:
      "يطلق المركز حملة توعوية مجانية للكشف المبكر عن أمراض القلب، وتشمل قياس الضغط، رسم القلب، واستشارة طبية مجانية لجميع الزوار خلال الأسبوع القادم.",
    date: "2026-01-20",
  },
  {
    id: 3,
    title: "انضمام د.أحمد محمود لفريق المركز",
    description:
      "يسر إدارة المركز الإعلان عن انضمام الدكتور أحمد محمود، استشاري جراحة القلب، إلى فريق العمل، بخبرة تزيد عن 20 عامًا في مجال جراحات القلب المفتوح والقسطرة القلبية.",
    date: "2026-01-19",
  },
  {
    id: 4,
    title: "تحديث نظام الحجز الإلكتروني",
    description:
      "تم تطوير نظام الحجز الإلكتروني الجديد ليوفر تجربة أسرع وأسهل للمرضى، مع إمكانية اختيار الطبيب والوقت المناسب بدقة، وإرسال تذكير قبل الميعاد بساعة.",
    date: "2026-01-18",
  },
  {
    id: 5,
    title: "خصم خاص على باقات الفحوصات",
    description:
      "بمناسبة العام الجديد، يقدم المركز خصومات تصل إلى 30% على جميع باقات الفحوصات الشاملة لفترة محدودة. تواصل معنا الآن لمعرفة التفاصيل والاستفادة من العروض.",
    date: "2026-01-15",
  },
  {
    id: 6,
    title: "ندوة طبية عن أمراض الأطفال",
    description:
      "ينظم المركز ندوة طبية مجانية عن أحدث طرق علاج أمراض القلب عند الأطفال، يقدمها نخبة من الاستشاريين المتخصصين يوم السبت القادم في القاعة الرئيسية.",
    date: "2026-01-10",
  },
];

// تجميع الأخبار حسب اليوم
const groupByDate = (news) => {
  const grouped = {};
  news.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });
  return Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a))
    .map((date) => ({ date, items: grouped[date] }));
};

const formatDayName = (dateStr) => {
  const date = new Date(dateStr);
  const dayNames = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  return dayNames[date.getDay()];
};

const formatFullDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const DESCRIPTION_LIMIT = 150;

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilterDate, setTempFilterDate] = useState("");

  const groupedNews = useMemo(() => groupByDate(NEWS_DATA), []);

  // الحصول على التاريخ من URL
  const urlDate = searchParams.get("date");

  // تحديد الـ index الحالي
  const currentIndex = useMemo(() => {
    if (!urlDate) return 0;
    const index = groupedNews.findIndex((g) => g.date === urlDate);
    return index >= 0 ? index : 0;
  }, [urlDate, groupedNews]);

  const currentGroup = groupedNews[currentIndex];
  const hasPrevious = currentIndex < groupedNews.length - 1;
  const hasNext = currentIndex > 0;

  // تعيين تاريخ افتراضي في URL
  useEffect(() => {
    if (!urlDate && groupedNews.length > 0) {
      setSearchParams({ date: groupedNews[0].date }, { replace: true });
    }
  }, [urlDate, groupedNews, setSearchParams]);

  const goToDate = (date) => {
    setSearchParams({ date });
  };

  const goToPreviousDay = () => {
    if (hasPrevious) {
      goToDate(groupedNews[currentIndex + 1].date);
    }
  };

  const goToNextDay = () => {
    if (hasNext) {
      goToDate(groupedNews[currentIndex - 1].date);
    }
  };

  const clearFilter = () => {
    setSearchParams({ date: groupedNews[0].date });
    setTempFilterDate("");
    setShowFilter(false);
  };

  const applyFilter = () => {
    if (!tempFilterDate) {
      toast.error("اختر تاريخ أولاً");
      return;
    }

    const exists = groupedNews.some((g) => g.date === tempFilterDate);
    if (!exists) {
      toast.error("لا توجد أخبار في هذا التاريخ");
      return;
    }

    goToDate(tempFilterDate);
    setShowFilter(false);
    toast.success("تم تطبيق الفلتر");
  };

  const openFilter = () => {
    setTempFilterDate(urlDate || "");
    setShowFilter(true);
  };

  return (
    <div className="py-10 mx-auto">
      {/* Page Title */}
      <div className="card mb-6">
        <Newspaper size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">أخبارنا</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-2 px-1 mb-4">
        {urlDate && currentGroup ? (
          <div className="flex items-center gap-2 bg-(--main-color)/10 border border-(--main-color) rounded-md px-3 py-2 flex-1">
            <Calendar size={16} className="text-(--main-color)" />
            <span className="text-white text-[12px] flex-1">
              {formatDayName(urlDate)} - {formatFullDate(urlDate)}
            </span>
          </div>
        ) : (
          <div className="text-white text-[14px] font-bold flex-1">أخبارنا</div>
        )}

        <button
          onClick={openFilter}
          className="flex items-center gap-2 bg-[#171717] border border-(--main-color) rounded-md px-3 py-2 hover:bg-(--main-color)/10 transition-colors"
        >
          <Filter size={16} className="text-(--main-color)" />
          <span className="text-white text-[12px]">فلترة</span>
        </button>
      </div>

      {/* Empty State */}
      {!currentGroup ? (
        <div className="text-center py-20">
          <Newspaper
            size={60}
            className="text-(--main-color)/30 mx-auto mb-4"
          />
          <p className="text-white/50 text-[14px] mb-2">لا توجد أخبار</p>
          <p className="text-white/30 text-[12px]">
            لم يتم نشر أي أخبار حتى الآن
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 px-1">
            {/* Date Header */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-(--main-color)/30" />
              <div className="flex flex-col items-center bg-[#171717] border border-(--main-color) rounded-md px-4 py-2">
                <span className="text-(--main-color) font-bold text-[14px]">
                  {formatDayName(currentGroup.date)}
                </span>
                <span className="text-white/40 text-[10px]">
                  {formatFullDate(currentGroup.date)}
                </span>
              </div>
              <div className="flex-1 h-px bg-(--main-color)/30" />
            </div>

            {/* News Cards */}
            {currentGroup.items.map((news) => {
              const isLong = news.description.length > DESCRIPTION_LIMIT;
              const preview = isLong
                ? news.description.slice(0, DESCRIPTION_LIMIT) + "..."
                : news.description;

              return (
                <div
                  key={news.id}
                  className="bg-[#171717] border border-(--main-color)/40 rounded-md p-4 hover:border-(--main-color) transition-colors"
                >
                  <h3 className="text-white font-bold text-[15px] mb-2">
                    {news.title}
                  </h3>
                  <p className="text-white/70 text-[13px] leading-7">
                    {preview}
                  </p>
                  {isLong && (
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="text-(--main-color) text-[12px] font-bold mt-2 hover:underline flex items-center gap-1"
                    >
                      قراءة المزيد
                      <ChevronLeft size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2 mt-6 px-1">
            <button
              onClick={goToNextDay}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-[12px] font-bold transition-colors ${
                hasNext
                  ? "bg-[#171717] border border-(--main-color) text-white hover:bg-(--main-color)/10"
                  : "bg-[#0d0d0d] border border-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={16} />
              اليوم التالي
            </button>

            <span className="text-white/50 text-[11px]">
              {currentIndex + 1} / {groupedNews.length}
            </span>

            <button
              onClick={goToPreviousDay}
              disabled={!hasPrevious}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-[12px] font-bold transition-colors ${
                hasPrevious
                  ? "bg-[#171717] border border-(--main-color) text-white hover:bg-(--main-color)/10"
                  : "bg-[#0d0d0d] border border-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              اليوم السابق
              <ChevronLeft size={16} />
            </button>
          </div>
        </>
      )}

      {/* ===== Full News Modal ===== */}
      {selectedNews && (
        <div
          onClick={() => setSelectedNews(null)}
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#171717] border border-(--main-color) rounded-lg w-full max-w-[480px] max-h-[85vh] overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-(--main-color)/30 bg-[#171717]">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-(--main-color)" />
                <span className="text-white/60 text-[12px]">
                  {formatFullDate(selectedNews.date)}
                </span>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <div className="p-5">
              <h2 className="text-white font-bold text-[18px] mb-4 leading-8">
                {selectedNews.title}
              </h2>
              <p className="text-white/80 text-[14px] leading-8 whitespace-pre-wrap">
                {selectedNews.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== Filter Modal ===== */}
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#171717] border border-(--main-color) rounded-lg w-full max-w-[360px] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-[15px]">
                فلترة الأخبار
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-white/60 text-[12px]">اختر التاريخ</label>

              <div
                onClick={(e) => {
                  const input = e.currentTarget.querySelector("input");
                  if (input) {
                    try {
                      input.showPicker();
                    } catch {
                      input.focus();
                    }
                  }
                }}
                className="relative w-full p-3 bg-[#0d0d0d] border border-(--main-color) rounded-md text-white text-[13px] flex items-center justify-between cursor-pointer hover:bg-(--main-color)/5 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Calendar size={18} className="text-(--main-color)" />
                  <span
                    className={tempFilterDate ? "text-white" : "text-white/40"}
                  >
                    {tempFilterDate
                      ? formatFullDate(tempFilterDate)
                      : "اضغط لاختيار التاريخ"}
                  </span>
                </div>
                <input
                  type="date"
                  value={tempFilterDate}
                  onChange={(e) => setTempFilterDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={clearFilter}
                  className="flex-1 h-[40px] border border-white/20 rounded-md text-white text-[13px] hover:bg-white/5 transition-colors"
                >
                  إعادة تعيين
                </button>
                <button
                  onClick={applyFilter}
                  className="flex-1 h-[40px] !bg-(--main-color) rounded-md text-black text-[13px] font-bold hover:opacity-90 transition-opacity"
                >
                  تطبيق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

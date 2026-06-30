import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  MoveHorizontal,
  Play,
  Video,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router";

const data = [
  {
    id: 1,
    nameAr: "الأمراض",
    nameEn: "Diseases",
    descAr: "تعرف على أمراض القلب الخلقية عند الأطفال",
    descEn: "Learn about congenital heart diseases in children",
    img: "/images/14.png",
    articles: [
      {
        id: 1,
        nameAr: "الثقب بين الأذنين",
        nameEn: "Atrial Septal Defect (ASD)",
        contentAr:
          "هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين الغرفتين الصغيرتين فى القلب (الأذينين)",
        contentEn:
          "One of the most common congenital heart defects. It is an opening in the wall separating the two small chambers of the heart (the atria).",
        img: "/images/14.png",
        topics: [
          {
            id: 1,
            titleAr: "ما هو الثقب بين الأذنين ؟",
            titleEn: "What is Atrial Septal Defect?",
            contentAr:
              "هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين الغرفتين الصغيرتين فى القلب (الأذينين)",
            contentEn:
              "One of the most common congenital heart defects. It is an opening in the wall separating the two small chambers of the heart (the atria).",
          },
          {
            id: 2,
            titleAr: "كيف تشك الأم بوجود ثقب بين الأذنين ؟",
            titleEn: "How can a mother suspect ASD?",
          },
          {
            id: 3,
            titleAr: "أسباب حدوث الثقب بين الأذنين ؟",
            titleEn: "Causes of ASD?",
          },
          {
            id: 4,
            titleAr: "المشاكل التي تسببها الثقب بين الأذنين",
            titleEn: "Problems caused by ASD",
          },
          {
            id: 5,
            titleAr: "كيف يتم التشخيص ؟",
            titleEn: "How is it diagnosed?",
          },
          {
            id: 6,
            titleAr: "هل يمكن أن يغلق الثقب تلقائيًا ؟",
            titleEn: "Can it close on its own?",
          },
          {
            id: 7,
            titleAr: "متابعة الحالة",
            titleEn: "Follow-up",
          },
          {
            id: 8,
            titleAr: "متى نلجأ لعلاج الثقب بين الأذنين؟",
            titleEn: "When do we treat ASD?",
          },
        ],
      },
      {
        id: 2,
        nameAr: "الثقب بين البطينين",
        nameEn: "Ventricular Septal Defect (VSD)",
        contentAr:
          "هو أحد أكثر العيوب الخلقية انتشارًا والتى تصيب القلب و هو عبارة عن فتحة فى الجدار الفاصل بين البطين الأيمن و الأيسر للقلب",
        contentEn:
          "One of the most common congenital heart defects. It is an opening in the wall separating the right and left ventricles of the heart.",
        img: "/images/14.png",
      },
      {
        id: 3,
        nameAr: "الثقب الجنيني",
        nameEn: "Patent Foramen Ovale (PFO)",
        contentAr:
          "هو فتحة في الجدار الفاصل بين الأذينين الأيمن والأيسر للقلب نتيجة لعدم انغلاق الفتحه البيضاويه بين الأذينين بعد الولادة و هو شائع الحدوث و يبلغ معدل حدوثه 25% بين الاطفال حديثى الولادة",
        contentEn:
          "An opening in the wall between the right and left atria due to the oval foramen not closing after birth. It is common, occurring in about 25% of newborns.",
        img: "/images/14.png",
      },
      {
        id: 4,
        nameAr: "القناة الشريانية المفتوحة",
        nameEn: "Patent Ductus Arteriosus (PDA)",
        contentAr:
          "هي أحد أكثر العيوب الخلقية انتشارًا و التى تصيب القلب نتيجة لعدم غلق القناة الشريانية التى تصل الشريان الرئوى بالشريان الأورطى بعد الولادة",
        contentEn:
          "One of the most common congenital heart defects resulting from the arterial duct connecting the pulmonary artery to the aorta not closing after birth.",
        img: "/images/14.png",
        topics: [
          {
            id: 1,
            titleAr: "ما هى القناة الشريانية المفتوحة ؟",
            titleEn: "What is PDA?",
            contentAr:
              "عادة يتم اكتشاف القناة الشريانية المفتوحة عندما يلاحظ الطبيب سرعة ضربات القلب او تغيير فى اصوات القلب و يرسل الطفل لعمل فحص باشعه الايكو على القلب الذى يظهر:",
            contentEn:
              "PDA is usually discovered when the doctor notices a fast heartbeat or change in heart sounds and refers the child for an echocardiogram which shows:",
          },
          {
            id: 2,
            titleAr: "كيف تشك الأم بوجود القناة الشريانية المفتوحة ؟",
            titleEn: "How can a mother suspect PDA?",
          },
          {
            id: 3,
            titleAr: "أسباب حدوث القناة الشريانية المفتوحة ؟",
            titleEn: "Causes of PDA?",
          },
          {
            id: 4,
            titleAr: "المشاكل التي تسببها القناة الشريانية المفتوحة",
            titleEn: "Problems caused by PDA",
          },
          {
            id: 5,
            titleAr: "كيف يتم التشخيص ؟",
            titleEn: "How is it diagnosed?",
          },
          {
            id: 6,
            titleAr: "هل يمكن أن تغلق القناة تلقائيًا ؟",
            titleEn: "Can it close on its own?",
          },
          {
            id: 7,
            titleAr: "متابعة الحالة",
            titleEn: "Follow-up",
          },
          {
            id: 8,
            titleAr: "متى نلجأ لعلاج القناة الشريانية المفتوحة؟",
            titleEn: "When do we treat PDA?",
          },
        ],
      },
    ],
    videos: [
      {
        id: 1,
        nameAr: "الثقب بين الأذنين",
        nameEn: "Atrial Septal Defect",
        videoUrl: "#",
      },
      {
        id: 2,
        nameAr: "الثقب بين البطينين",
        nameEn: "Ventricular Septal Defect",
        videoUrl: "#",
      },
      {
        id: 3,
        nameAr: "الثقب الجنيني",
        nameEn: "Patent Foramen Ovale",
        videoUrl: "#",
      },
      {
        id: 4,
        nameAr: "القناة الشريانية المفتوحة",
        nameEn: "Patent Ductus Arteriosus",
        videoUrl: "#",
      },
    ],
  },
  {
    id: 2,
    nameAr: "الفحوصات",
    nameEn: "Tests & Examinations",
    descAr: "تعرف على فحوصات القلب للأطفال وكيفية الاستعداد لها",
    descEn: "Learn about pediatric heart tests and how to prepare",
    img: "/images/18.png",
    articles: [
      {
        id: 1,
        nameAr: "رسم القلب الكهربائي (ECG)",
        nameEn: "Electrocardiogram (ECG)",
        contentAr: "هو اختبار بسيط وسريع يسجل النشاط الكهربائي للقلب.",
        contentEn:
          "A simple and quick test that records the electrical activity of the heart.",
        img: "/images/18.png",
        topics: [
          {
            id: 1,
            titleAr: "ما هو رسم القلب؟",
            titleEn: "What is an ECG?",
          },
          {
            id: 2,
            titleAr: "متى يطلب الطبيب رسم القلب؟",
            titleEn: "When does the doctor request an ECG?",
          },
          {
            id: 3,
            titleAr: "كم يستغرق الفحص؟",
            titleEn: "How long does the test take?",
          },
          {
            id: 4,
            titleAr: "كيف يتم عمل رسم القلب؟",
            titleEn: "How is an ECG performed?",
            contentAr:
              "• يحتاج طفلك لخلع القميص.\n• يستلقي طفلك على ظهره على سرير الفحص مغطى بملاءة للخصوصية.\n• يتم إجراء الفحص باستخدام ملصقات بلاستيكية صغيرة توضع على صدر طفلك وذراعيه وساقيه.\n• يتم توصيل الأسلاك المتصلة بجهاز رسم القلب.\n• يتم أخذ لقطة من نشاط القلب بواسطة الكمبيوتر وطباعتها.\n• بمجرد الانتهاء من رسم القلب، سيتم فصل الأسلاء ونزع الملصقات.",
            contentEn:
              "• Your child needs to remove their shirt.\n• Your child lies on their back on the exam bed covered with a sheet for privacy.\n• Small plastic stickers are placed on your child's chest, arms, and legs.\n• Wires are connected to the ECG machine.\n• A snapshot of the heart's activity is taken by the computer and printed.\n• Once complete, the wires are disconnected and stickers removed.",
          },
          {
            id: 5,
            titleAr: "هل يمكنني البقاء مع طفلي أثناء الفحص؟",
            titleEn: "Can I stay with my child during the test?",
          },
          {
            id: 6,
            titleAr: "كيف يمكنك تحضير طفلك في المنزل لإجراء رسم القلب؟",
            titleEn: "How can you prepare your child at home for an ECG?",
          },
        ],
      },
      {
        id: 2,
        nameAr: "فحص الإيكو (ECHO)",
        nameEn: "Echocardiogram (ECHO)",
        contentAr: "هو فحص بالموجات فوق الصوتية للقلب يظهر بنية القلب ووظيفته.",
        contentEn:
          "An ultrasound examination of the heart that shows heart structure and function.",
        img: "/images/13.png",
        topics: [
          {
            id: 1,
            titleAr: "ما هو فحص الإيكو؟",
            titleEn: "What is an Echocardiogram?",
          },
          {
            id: 2,
            titleAr: "ما فائدة الفحص بأشعة الإيكو؟",
            titleEn: "What are the benefits of an ECHO?",
          },
          {
            id: 3,
            titleAr: "كم يستغرق الفحص؟",
            titleEn: "How long does the test take?",
          },
          {
            id: 4,
            titleAr: "من يشرف على عمل الفحص؟",
            titleEn: "Who supervises the test?",
          },
          {
            id: 5,
            titleAr: "متى يطلب الطبيب فحص الإيكو؟",
            titleEn: "When does the doctor request an ECHO?",
          },
          {
            id: 6,
            titleAr: "كيف تحضر طفلك للإيكو؟",
            titleEn: "How to prepare your child for an ECHO?",
          },
          {
            id: 7,
            titleAr: "متى يحتاج طفلك إلى مهدئ لإجراء الإيكو؟",
            titleEn: "When does your child need sedation for an ECHO?",
            contentAr:
              "• لا يحتاج معظم الأطفال إلى القيام بأي شئ خاص للاستعداد لفحص الإيكو.\n• نظرًا لأن الحركة أثناء الفحص يمكن أن تجعل صوره رديئة وتجعل الفحص يستغرق وقتا أطول، فقد يحتاج بعض الأطفال (خاصة ما دون ٤ سنوات) إلى مهدئ ما لم يكن هناك مانع طبي.\n• يتم استخدام الأدوية المنومة الخفيفة عن طريق الفم قبل ٣٠ إلى ٤٥ دقيقة من موعد الفحص.\n• يتم حساب الجرعة المطلوبة تحت إشراف الطبيب حسب وزن الطفل.\n• سيصاب الطفل بالنعاس فجأة مما يجعل الفحص أسهل ويعطي صورًا أوضح للقلب.",
            contentEn:
              "• Most children don't need any special preparation for an ECHO.\n• Since movement during the test can result in poor images and a longer exam, some children (especially under 4 years) may need sedation unless medically contraindicated.\n• Mild oral sedatives are given 30 to 45 minutes before the test.\n• The required dose is calculated under the doctor's supervision based on the child's weight.\n• The child will suddenly become drowsy, making the test easier and providing clearer heart images.",
          },
          {
            id: 8,
            titleAr: "ماذا سيحدث خلال فحص الإيكو بالخطوات؟",
            titleEn: "What happens during an ECHO step by step?",
          },
          {
            id: 9,
            titleAr: "متى يتم استلام نتيجة الفحص الخاصة بالطفل؟",
            titleEn: "When will the test results be ready?",
          },
        ],
      },
      {
        id: 3,
        nameAr: "الهولتر (Holter ECG)",
        nameEn: "Holter Monitor (Holter ECG)",
        contentAr:
          "هو جهاز محمول يسجل النشاط الكهربائي للقلب باستمرار لمدة ٢٤ إلى ٤٨ ساعة.",
        contentEn:
          "A portable device that continuously records the heart's electrical activity for 24 to 48 hours.",
        img: "/images/20.png",
        topics: [
          {
            id: 1,
            titleAr: "ما هو جهاز الهولتر؟",
            titleEn: "What is a Holter Monitor?",
          },
          {
            id: 2,
            titleAr: "لماذا يتم استخدامه؟",
            titleEn: "Why is it used?",
          },
        ],
      },
    ],
    videos: [
      {
        id: 1,
        nameAr: "رسم القلب الكهربائي (ECG)",
        nameEn: "Electrocardiogram (ECG)",
        videoUrl: "#",
      },
      {
        id: 2,
        nameAr: "فحص الإيكو (ECHO)",
        nameEn: "Echocardiogram (ECHO)",
        videoUrl: "#",
      },
      {
        id: 3,
        nameAr: "الهولتر (Holter ECG)",
        nameEn: "Holter Monitor (Holter ECG)",
        videoUrl: "#",
      },
    ],
  },
];

export default function EducationPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const view = searchParams.get("v") || "home";
  const catId = searchParams.get("c");
  const artId = searchParams.get("a");
  const topicId = searchParams.get("t");
  const videoId = searchParams.get("vid");

  // Localize
  const categories = useMemo(() => {
    return data.map((cat) => ({
      ...cat,
      name: isEn ? cat.nameEn : cat.nameAr,
      desc: isEn ? cat.descEn : cat.descAr,
      articles: cat.articles.map((art) => ({
        ...art,
        name: isEn ? art.nameEn : art.nameAr,
        content: isEn ? art.contentEn : art.contentAr,
        topics: art.topics?.map((tp) => ({
          ...tp,
          title: isEn ? tp.titleEn : tp.titleAr,
          content: isEn ? tp.contentEn : tp.contentAr,
        })),
      })),
      videos: cat.videos.map((vid) => ({
        ...vid,
        name: isEn ? vid.nameEn : vid.nameAr,
      })),
    }));
  }, [isEn]);

  // Current selections
  const currentCat = categories.find((c) => String(c.id) === catId);
  const currentArt = currentCat?.articles.find((a) => String(a.id) === artId);
  const currentTopic = currentArt?.topics?.find(
    (tp) => String(tp.id) === topicId,
  );
  const currentVideo = currentCat?.videos.find((v) => String(v.id) === videoId);

  // Navigation
  const goHome = () => setSearchParams({});

  const openCategory = (id) => setSearchParams({ v: "category", c: id });

  const openArticle = (artIdVal) =>
    setSearchParams({ v: "article", c: catId, a: artIdVal });

  const openTopic = (topicIdVal) =>
    setSearchParams({ v: "topic", c: catId, a: artId, t: topicIdVal });

  const openVideo = (vidId) =>
    setSearchParams({ v: "video", c: catId, vid: vidId });

  const handleBack = () => {
    if (view !== "home") navigate(-1);
  };

  // Header text
  const getHeaderText = () => {
    if (view === "home") return t("educationPage.chooseType");
    if (view === "category") return currentCat?.name;
    if (view === "article") return currentArt?.name;
    if (view === "topic") return currentTopic?.title;
    if (view === "video") return currentVideo?.name;
    return "";
  };

  const backIconClass = isEn ? "left-3" : "right-3";

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Page Title */}
      <div className="card mt-10 mb-4 cursor-pointer" onClick={goHome}>
        <HiOutlineAcademicCap size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("educationPage.title")}
        </p>
      </div>

      {/* Header Bar */}
      <div
        className={`border h-[38.4px] mb-4 w-full flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative ${
          view !== "home" ? "cursor-pointer" : ""
        }`}
        onClick={view !== "home" ? handleBack : undefined}
      >
        {view !== "home" && (
          <ChevronRight
            className={`absolute ${backIconClass} text-(--main-color) ${
              isEn ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}
        <p className="text-white text-center font-bold text-[14px] px-8 line-clamp-1">
          {getHeaderText()}
        </p>
      </div>

      {/* ======================== HOME ======================== */}
      {view === "home" && (
        <div className="space-y-5">
          {/* Hint */}
          <div className="border border-(--main-color)/40 bg-(--main-color)/5 rounded-[14px] p-3.5 sm:p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center">
              <MoveHorizontal size={17} className="text-(--main-color)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-(--main-color) font-bold text-[13px] sm:text-[14px]">
                {t("educationPage.browseHintTitle")}
              </p>
              <p className="mt-1 text-white/75 text-[11.5px] sm:text-[12.5px] leading-relaxed">
                {t("educationPage.browseHintText")}
              </p>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => openCategory(cat.id)}
                className="group rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-3 start-3 end-3">
                    <h3 className="text-white font-bold text-[16px] sm:text-[17px]">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-white/70 text-[11.5px] sm:text-[12px] line-clamp-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-white/60 text-[11px]">
                      <FileText size={13} className="text-(--main-color)" />
                      {cat.articles.length} {t("educationPage.articles")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-white/60 text-[11px]">
                      <Video size={13} className="text-(--main-color)" />
                      {cat.videos.length} {t("educationPage.videosLabel")}
                    </span>
                  </div>
                  <div className="text-(--main-color)">
                    {isEn ? (
                      <ChevronRight size={16} />
                    ) : (
                      <ChevronLeft size={16} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ======================== CATEGORY (Articles + Videos together) ======================== */}
      {view === "category" && currentCat && (
        <div className="space-y-6">
          {/* Articles Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-(--main-color)" />
              <h3 className="text-white font-bold text-[15px] sm:text-[16px]">
                {t("educationPage.articles")}
              </h3>
              <span className="text-white/40 text-[12px]">
                ({currentCat.articles.length})
              </span>
            </div>

            {/* Horizontal scroll */}
            <div className="overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 lg:gap-4 w-max min-w-full">
                {currentCat.articles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => openArticle(article.id)}
                    className="group flex-shrink-0 snap-start w-[240px] sm:w-[270px] lg:w-[300px] rounded-[16px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] overflow-hidden hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 text-start"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10">
                      <img
                        src={article.img}
                        alt={article.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                      {article.topics && (
                        <span className="absolute top-3 end-3 rounded-full border border-(--main-color)/40 bg-black/60 px-2.5 py-1 text-(--main-color) text-[10px] font-bold">
                          {article.topics.length}{" "}
                          {t("educationPage.topicsLabel")}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 sm:p-4">
                      <h4 className="text-white font-bold text-[13.5px] sm:text-[14px] leading-snug line-clamp-2 min-h-[40px]">
                        {article.name}
                      </h4>
                      <p className="mt-2 text-white/60 text-[11.5px] sm:text-[12px] leading-relaxed line-clamp-2 min-h-[36px]">
                        {article.content}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full border border-(--main-color)/35 bg-(--main-color)/10 px-3 py-1 text-(--main-color) text-[11px] font-bold">
                          {t("educationPage.readMore")}
                        </span>
                        <div className="text-(--main-color)">
                          {isEn ? (
                            <ChevronRight size={16} />
                          ) : (
                            <ChevronLeft size={16} />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Videos Section */}
          {currentCat.videos.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-(--main-color)" />
                <h3 className="text-white font-bold text-[15px] sm:text-[16px]">
                  {t("educationPage.videosLabel")}
                </h3>
                <span className="text-white/40 text-[12px]">
                  ({currentCat.videos.length})
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {currentCat.videos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => openVideo(video.id)}
                    className="w-full flex items-center gap-3 px-4 min-h-[52px] bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_100%)] border border-(--main-color)/30 rounded-[12px] hover:border-(--main-color) transition-all text-start group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center group-hover:bg-(--main-color)/25 transition-colors">
                      <Play
                        size={16}
                        className="text-(--main-color) fill-(--main-color)"
                      />
                    </div>
                    <p className="flex-1 text-[#eee] font-medium text-[13px] sm:text-[14px] line-clamp-1">
                      {video.name}
                    </p>
                    <div className="text-(--main-color) opacity-0 group-hover:opacity-100 transition-opacity">
                      {isEn ? (
                        <ArrowRight size={16} />
                      ) : (
                        <ArrowLeft size={16} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ======================== ARTICLE (Topics List) ======================== */}
      {view === "article" && currentArt && (
        <div className="space-y-4">
          {/* Article Header */}
          <div className="rounded-[16px] border border-(--main-color)/25 bg-[linear-gradient(145deg,#101010_0%,#1a1a1a_60%,#111111_100%)] p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute -top-8 -end-8 w-24 h-24 rounded-full bg-(--main-color)/8 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-2.5 py-0.5 text-(--main-color) text-[10px] sm:text-[11px] font-bold mb-2">
                {currentCat?.name}
              </span>
              <h2 className="text-white font-bold text-[16px] sm:text-[18px] lg:text-[20px] leading-snug">
                {currentArt.name}
              </h2>
              <p className="mt-2 text-white/65 text-[12px] sm:text-[13px] leading-relaxed">
                {currentArt.content}
              </p>
            </div>
          </div>

          {/* Topics */}
          {currentArt.topics?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {currentArt.topics.map((topic, index) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => openTopic(topic.id)}
                  className="w-full flex items-center gap-3 px-4 min-h-[48px] bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_100%)] border border-(--main-color)/25 rounded-[12px] hover:border-(--main-color) transition-all text-start group"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center text-(--main-color) text-[11px] font-bold">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-[#eee] font-medium text-[13px] sm:text-[14px] line-clamp-1">
                    {topic.title}
                  </p>
                  <div className="text-(--main-color) opacity-0 group-hover:opacity-100 transition-opacity">
                    {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="w-14 h-14 rounded-full bg-(--main-color)/10 border border-(--main-color)/25 flex items-center justify-center">
                <FileText size={24} className="text-(--main-color)/60" />
              </div>
              <p className="text-white/50 text-[13px] text-center">
                {t("educationPage.comingSoon")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================== TOPIC DETAIL ======================== */}
      {view === "topic" && currentTopic && (
        <div className="space-y-4">
          {/* Title */}
          <div className="rounded-[16px] border border-(--main-color)/25 bg-[linear-gradient(145deg,#101010_0%,#1a1a1a_60%,#111111_100%)] p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute -top-8 -end-8 w-24 h-24 rounded-full bg-(--main-color)/8 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center mt-0.5">
                <BookOpen size={17} className="text-(--main-color)" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-2.5 py-0.5 text-(--main-color) text-[10px] sm:text-[11px] font-bold mb-2">
                  {currentArt?.name}
                </span>
                <h2 className="text-white font-bold text-[16px] sm:text-[18px] lg:text-[22px] leading-snug">
                  {currentTopic.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-[16px] border border-(--main-color)/20 bg-[#111111] overflow-hidden">
            <div className="p-4 sm:p-5 lg:p-6">
              {currentTopic.content ? (
                <div className="space-y-3">
                  {currentTopic.content
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((line, idx) => {
                      const isBullet = line.trim().startsWith("•");
                      if (isBullet) {
                        return (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-(--main-color) mt-[9px]" />
                            <p className="text-white/85 text-[13px] sm:text-[14px] leading-7 flex-1">
                              {line.trim().replace(/^•\s*/, "")}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <p
                          key={idx}
                          className="text-white/85 text-[13px] sm:text-[14px] leading-7"
                        >
                          {line.trim()}
                        </p>
                      );
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8">
                  <div className="w-14 h-14 rounded-full bg-(--main-color)/10 border border-(--main-color)/25 flex items-center justify-center">
                    <FileText size={24} className="text-(--main-color)/60" />
                  </div>
                  <p className="text-white/50 text-[13px] sm:text-[14px] text-center max-w-[280px]">
                    {t("educationPage.comingSoon")}
                  </p>
                </div>
              )}
            </div>

            {/* Topic Navigation */}
            {currentArt?.topics && currentArt.topics.length > 1 && (
              <div className="border-t border-(--main-color)/15 bg-black/30 px-4 sm:px-5 py-3">
                <div className="flex items-center justify-between gap-3">
                  {(() => {
                    const currentIdx = currentArt.topics.findIndex(
                      (tp) => String(tp.id) === topicId,
                    );
                    const prevTp =
                      currentIdx > 0 ? currentArt.topics[currentIdx - 1] : null;
                    const nextTp =
                      currentIdx < currentArt.topics.length - 1
                        ? currentArt.topics[currentIdx + 1]
                        : null;

                    return (
                      <>
                        {prevTp ? (
                          <button
                            type="button"
                            onClick={() => openTopic(prevTp.id)}
                            className="flex items-center gap-1.5 text-white/60 hover:text-(--main-color) transition-colors min-w-0 max-w-[45%]"
                          >
                            {isEn ? (
                              <ArrowLeft size={14} className="flex-shrink-0" />
                            ) : (
                              <ArrowRight size={14} className="flex-shrink-0" />
                            )}
                            <span className="text-[11px] sm:text-[12px] line-clamp-1">
                              {prevTp.title}
                            </span>
                          </button>
                        ) : (
                          <div />
                        )}

                        <span className="text-white/30 text-[11px] flex-shrink-0">
                          {currentIdx + 1} / {currentArt.topics.length}
                        </span>

                        {nextTp ? (
                          <button
                            type="button"
                            onClick={() => openTopic(nextTp.id)}
                            className="flex items-center gap-1.5 text-white/60 hover:text-(--main-color) transition-colors min-w-0 max-w-[45%]"
                          >
                            <span className="text-[11px] sm:text-[12px] line-clamp-1">
                              {nextTp.title}
                            </span>
                            {isEn ? (
                              <ArrowRight size={14} className="flex-shrink-0" />
                            ) : (
                              <ArrowLeft size={14} className="flex-shrink-0" />
                            )}
                          </button>
                        ) : (
                          <div />
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Back */}
          <button
            type="button"
            onClick={handleBack}
            className="auth_btn !w-full sm:!w-[200px]"
          >
            {t("educationPage.backToTopics")}
          </button>
        </div>
      )}

      {/* ======================== VIDEO PLAYER ======================== */}
      {view === "video" && currentVideo && (
        <div className="space-y-4">
          <div className="w-full aspect-video bg-black border border-(--main-color)/20 rounded-[16px] flex items-center justify-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full border-2 border-(--main-color) flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-(--main-color)/10 transition-all">
              <Play
                size={32}
                className="text-(--main-color) fill-(--main-color)"
              />
            </div>
            <p className="absolute bottom-4 text-(--main-color) text-[10px] opacity-50">
              {t("educationPage.videoPlayer")}
            </p>
          </div>

          <div className="rounded-[16px] border border-(--main-color)/20 bg-[#111111] p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full border border-(--main-color)/30 bg-(--main-color)/10 px-2.5 py-0.5 text-(--main-color) text-[10px] sm:text-[11px] font-bold">
                {currentCat?.name}
              </span>
            </div>
            <p className="text-white font-bold text-[15px] sm:text-[16px]">
              {currentVideo.name}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="auth_btn !w-full sm:!w-[200px]"
          >
            {t("educationPage.backToCategory")}
          </button>
        </div>
      )}
    </div>
  );
}

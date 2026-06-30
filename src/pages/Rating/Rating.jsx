// src/pages/Rating/Rating.jsx
import { Building2, Send, Star, Upload, Video, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const RATING_OPTIONS = [
  {
    id: 1,
    nameAr: "قيم عبر فيسبوك",
    nameEn: "Rate on Facebook",
    icon: "facebook",
    type: "external",
    link: "https://www.facebook.com/fouady.center/reviews",
  },
  {
    id: 2,
    nameAr: "قيم عبر جوجل",
    nameEn: "Rate on Google",
    icon: "google",
    type: "external",
    link: "https://search.google.com/local/writereview?placeid=ChIJXXXXXXXXXXXXX",
  },
  {
    id: 3,
    nameAr: "تقييم زيارة في الفرع",
    nameEn: "Rate a Branch Visit",
    icon: "branch",
    type: "branch",
  },
  {
    id: 4,
    nameAr: "مشاركة فيديو أو قصة نجاح",
    nameEn: "Share a Video or Success Story",
    icon: "story",
    type: "story",
  },
];

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        fill="var(--main-color)"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        fill="var(--main-color)"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="var(--main-color)"
        opacity="0.8"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="var(--main-color)"
        opacity="0.6"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="var(--main-color)"
        opacity="0.9"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function getIcon(iconType) {
  switch (iconType) {
    case "facebook":
      return <FacebookIcon />;
    case "google":
      return <GoogleIcon />;
    case "branch":
      return <Building2 size={22} className="text-(--main-color)" />;
    case "story":
      return <Video size={22} className="text-(--main-color)" />;
    default:
      return null;
  }
}

export default function Rating() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [activeModal, setActiveModal] = useState(null);
  const [branchRating, setBranchRating] = useState(0);
  const [branchHover, setBranchHover] = useState(0);
  const [branchMessage, setBranchMessage] = useState("");
  const [storyMessage, setStoryMessage] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const handleOptionClick = (option) => {
    if (option.type === "external") {
      window.open(option.link, "_blank");
      return;
    }
    setActiveModal(option.type);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
  };

  const handleBranchSubmit = () => {
    if (branchRating === 0) {
      toast.error(t("ratingPage.errorNoStars"));
      return;
    }
    console.log("Branch Rating:", {
      rating: branchRating,
      message: branchMessage,
    });
    toast.success(t("ratingPage.successBranch"));
    setBranchRating(0);
    setBranchMessage("");
    setActiveModal(null);
  };

  const handleStorySubmit = () => {
    if (!storyMessage.trim() && !videoFile) {
      toast.error(t("ratingPage.errorNoStory"));
      return;
    }
    console.log("Story:", { message: storyMessage, video: videoFile });
    toast.success(t("ratingPage.successStory"));
    setStoryMessage("");
    setVideoFile(null);
    setVideoPreview("");
    setActiveModal(null);
  };

  return (
    <div className="pb-24 lg:pb-10 mx-auto">
      {/* Page Title */}
      <div className="card mt-10 mb-6">
        <Star size={40} className="text-(--main-color)" />
        <p className="font-bold text-[15px] text-[#eee]">
          {t("ratingPage.title")}
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {RATING_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className="group flex items-center gap-3 p-3.5 sm:p-4 border border-(--main-color)/40 rounded-[14px] bg-[linear-gradient(180deg,#111111_0%,#171717_55%,#101010_100%)] hover:border-(--main-color) hover:shadow-[0_8px_25px_rgba(212,154,62,0.12)] hover:scale-[1.01] transition-all duration-300 w-full text-start"
          >
            <div className="flex-shrink-0 w-[44px] h-[44px] rounded-[12px] bg-(--main-color)/10 border border-(--main-color)/25 flex items-center justify-center group-hover:bg-(--main-color)/15 transition-colors">
              {getIcon(option.icon)}
            </div>
            <p className="text-white font-bold text-[13px] sm:text-[14px] flex-1">
              {isEn ? option.nameEn : option.nameAr}
            </p>
          </button>
        ))}
      </div>

      {/* ========== Branch Rating Modal ========== */}
      {activeModal === "branch" && (
        <Modal
          onClose={() => setActiveModal(null)}
          title={t("ratingPage.branchModalTitle")}
        >
          <div className="flex flex-col gap-4">
            <p className="text-white/80 text-[13px] text-center">
              {t("ratingPage.howWasExperience")}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setBranchHover(star)}
                  onMouseLeave={() => setBranchHover(0)}
                  onClick={() => setBranchRating(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      (branchHover || branchRating) >= star
                        ? "fill-(--main-color) text-(--main-color)"
                        : "text-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Star label */}
            {(branchHover || branchRating) > 0 && (
              <p className="text-(--main-color) text-[12px] text-center font-bold">
                {t(`ratingPage.stars.${branchHover || branchRating}`)}
              </p>
            )}

            <textarea
              value={branchMessage}
              onChange={(e) => setBranchMessage(e.target.value)}
              placeholder={t("ratingPage.opinionPlaceholder")}
              rows={4}
              className="w-full p-3 bg-[#0d0d0d] border border-(--main-color)/40 rounded-[10px] text-white text-[13px] outline-none resize-none placeholder:text-white/40 focus:border-(--main-color) transition-colors"
            />

            <button
              type="button"
              onClick={handleBranchSubmit}
              className="flex items-center justify-center gap-2 h-[38px] bg-[#232323] border border-(--main-color) rounded-[10px] text-white text-[13px] font-bold hover:bg-(--main-color)/10 transition-colors"
            >
              <Send size={16} className="text-(--main-color)" />
              {t("ratingPage.submitRating")}
            </button>
          </div>
        </Modal>
      )}

      {/* ========== Story Modal ========== */}
      {activeModal === "story" && (
        <Modal
          onClose={() => setActiveModal(null)}
          title={t("ratingPage.storyModalTitle")}
        >
          <div className="flex flex-col gap-4">
            <p className="text-white/80 text-[13px] text-center">
              {t("ratingPage.storySubtitle")}
            </p>

            {/* Video upload */}
            {!videoPreview ? (
              <label className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-(--main-color)/50 rounded-[14px] cursor-pointer hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/30 flex items-center justify-center">
                  <Upload size={22} className="text-(--main-color)" />
                </div>
                <p className="text-white/70 text-[13px]">
                  {t("ratingPage.uploadVideo")}
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-[14px] overflow-hidden border border-(--main-color)/40">
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-[14px]"
                />
                <button
                  type="button"
                  onClick={removeVideo}
                  className="absolute top-2 left-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            )}

            <textarea
              value={storyMessage}
              onChange={(e) => setStoryMessage(e.target.value)}
              placeholder={t("ratingPage.storyPlaceholder")}
              rows={5}
              className="w-full p-3 bg-[#0d0d0d] border border-(--main-color)/40 rounded-[10px] text-white text-[13px] outline-none resize-none placeholder:text-white/40 focus:border-(--main-color) transition-colors"
            />

            <button
              type="button"
              onClick={handleStorySubmit}
              className="flex items-center justify-center gap-2 h-[38px] bg-[#232323] border border-(--main-color) rounded-[10px] text-white text-[13px] font-bold hover:bg-(--main-color)/10 transition-colors"
            >
              <Send size={16} className="text-(--main-color)" />
              {t("ratingPage.shareStory")}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ========== Modal ========== */
function Modal({ children, onClose, title }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#171717] border border-(--main-color)/60 rounded-[16px] w-full max-w-[440px] lg:max-w-[500px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20">
          <p className="text-white font-bold text-[15px]">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

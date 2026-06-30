import {
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartPulse,
  Video,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";
import { VIDEOS } from "./data";

export default function Journey() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const navigate = useNavigate();
  const BackArrow = isEn ? ChevronLeft : ChevronRight;

  const [playerIndex, setPlayerIndex] = useState(null);

  return (
    <div className="pb-20 lg:pb-10">
      {/* Header */}
      <div className="card mt-10 mb-6">
        <div className="w-10 h-10 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center">
          <HeartPulse size={20} className="text-(--main-color)" />
        </div>
        <p
          className="font-bold text-[17px] cursor-pointer text-[#eee]"
          onClick={() => navigate("/")}
        >
          {t("journey.title")}
        </p>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="w-full mb-4 border h-[var(--main-height)] flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px] relative cursor-pointer hover:bg-(--main-color)/5 transition-colors"
      >
        <BackArrow className="absolute start-3 text-(--main-color)" size={20} />
        <p className="text-white text-center font-bold text-[13px] lg:text-[14px]">
          {t("journey.back")}
        </p>
      </button>

      {/* Welcome */}
      <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5 text-center mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-white font-bold text-[16px] lg:text-[18px] mb-2">
          {t("journey.subtitle")}
        </h2>
        <p className="text-white/70 text-[12px] lg:text-[13px] leading-relaxed">
          {t("journey.intro")}
        </p>
      </div>

      {/* Videos section */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Video size={15} className="text-(--main-color)" />
            <h3 className="text-(--main-color) font-bold text-[13px] lg:text-[14px]">
              {t("journey.videosTitle")}
            </h3>
          </div>
          <span className="text-white/50 text-[11px] lg:text-[12px]">
            {t("journey.videosCount", { count: VIDEOS.length })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {VIDEOS.map((video, idx) => (
            <VideoCard
              key={video.id}
              video={video}
              index={idx}
              onClick={() => setPlayerIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Share story note */}
      <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5 flex gap-3 items-start animate-in fade-in duration-500">
        <div className="w-10 h-10 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center flex-shrink-0">
          <Heart size={18} className="text-(--main-color)" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-[13px] lg:text-[14px] mb-1">
            {t("journey.shareNote")}
          </h4>
          <p className="text-white/70 text-[11px] lg:text-[12px] leading-relaxed mb-3">
            {t("journey.shareDesc")}
          </p>
          <button
            onClick={() => navigate("/rating")}
            className="auth_btn w-fit! !text-[12px] !py-2 !px-4"
          >
            {t("journey.shareNote")}
          </button>
        </div>
      </div>

      {/* Player Modal */}
      {playerIndex !== null && (
        <VideoPlayer
          videos={VIDEOS}
          startIndex={playerIndex}
          onClose={() => setPlayerIndex(null)}
        />
      )}
    </div>
  );
}

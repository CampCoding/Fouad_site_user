import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function VideoPlayer({ videos, startIndex = 0, onClose }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [index, setIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentVideo = videos[index];

  // Reset on video change
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(true);
    setProgress(0);
    setCurrentTime(0);
  }, [index]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "m") toggleMute();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying, index]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = isEn ? e.clientX - rect.left : rect.right - e.clientX;
    const pct = x / rect.width;
    const newTime = pct * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const nextVideo = () => {
    if (index < videos.length - 1) setIndex(index + 1);
  };
  const prevVideo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md animate-in fade-in duration-200 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between p-3 lg:p-4 border-b border-white/10 z-10">
        <div className="text-white/80 text-[12px] lg:text-[13px] font-medium">
          {t("journey.videoTitle", { number: index + 1 })}
          <span className="text-white/40 mx-2">•</span>
          <span className="text-(--main-color)">
            {index + 1} / {videos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500/30 text-white flex items-center justify-center transition-colors"
          title={t("common.back")}
        >
          <X size={18} />
        </button>
      </div>

      {/* Video container */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center relative overflow-hidden"
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 z-20">
            <Loader2 size={40} className="text-(--main-color) animate-spin" />
            <p className="text-white/70 text-[12px]">{t("journey.loading")}</p>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          key={currentVideo.id}
          src={currentVideo.src}
          poster={currentVideo.thumb}
          className="max-w-full max-h-full w-auto"
          onLoadedData={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />

        {/* Center play button (لما الفيديو متوقف) */}
        {!isPlaying && !isLoading && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-(--main-color) text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <Play size={28} className="fill-black ms-1" />
          </button>
        )}

        {/* Side nav arrows */}
        {videos.length > 1 && (
          <>
            {index > 0 && (
              <button
                onClick={prevVideo}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors backdrop-blur-md z-10"
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {index < videos.length - 1 && (
              <button
                onClick={nextVideo}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors backdrop-blur-md z-10"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </>
        )}
      </div>

      {/* Bottom controls */}
      <div className="p-3 lg:p-4 border-t border-white/10 bg-black/50">
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          className="w-full h-1.5 bg-white/15 rounded-full cursor-pointer mb-3 relative group"
        >
          <div
            className="h-full bg-(--main-color) rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute end-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-(--main-color) opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-(--main-color)/20 hover:bg-(--main-color)/30 text-(--main-color) flex items-center justify-center transition-colors"
              title={isPlaying ? t("journey.pause") : t("journey.play")}
            >
              {isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} className="ms-0.5" />
              )}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title={isMuted ? t("journey.unmute") : t("journey.mute")}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Time */}
            <span className="text-white/70 text-[11px] lg:text-[12px] font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title={t("journey.fullscreen")}
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

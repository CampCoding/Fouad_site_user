import { Loader2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function IntroVideo({ src }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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
    setProgress((cur / dur) * 100);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0d0d0d] border border-(--main-color)/30 rounded-xl overflow-hidden group shadow-lg"
    >
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20 bg-[#0d0d0d]">
          <Loader2 size={32} className="text-(--main-color) animate-spin" />
          <p className="text-white/50 text-[11px]">
            {t("whyFouady.videoSection.loading")}
          </p>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        onLoadedData={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-auto block cursor-pointer"
      />

      {/* Center Play (لما متوقف) */}
      {!isPlaying && !isLoading && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-(--main-color) text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play size={28} className="fill-black ms-1" />
          </div>
        </button>
      )}

      {/* Bottom controls */}
      {isPlaying && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full mb-2 overflow-hidden">
            <div
              className="h-full bg-(--main-color) transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause size={14} />
                ) : (
                  <Play size={14} className="ms-0.5" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            {/* <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors"
            >
              <Maximize size={14} />
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

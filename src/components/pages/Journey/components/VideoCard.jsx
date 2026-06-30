import { Loader2, Play } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function VideoCard({ video, index, onClick }) {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  return (
    <button
      onClick={onClick}
      className="
        group relative bg-[#171717] border border-(--main-color)/30
        hover:border-(--main-color)
        rounded-xl overflow-hidden
        transition-all duration-300
        text-start w-full
        shadow-sm hover:shadow-[0_4px_20px_rgba(212,154,62,0.15)]
      "
    >
      {/* Video preview */}
      <div className="relative w-full aspect-video bg-[#0d0d0d] overflow-hidden">
        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-[#0d0d0d]">
            <Loader2 size={28} className="text-(--main-color) animate-spin" />
            <p className="text-white/40 text-[10px]">{t("journey.loading")}</p>
          </div>
        )}

        {/* Video (preload metadata بس عشان أول frame يطلع) */}
        <video
          ref={videoRef}
          src={video.src}
          preload="metadata"
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Dark overlay */}
        {isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        )}

        {/* Play button */}
        {isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-(--main-color) text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play size={24} className="lg:w-7 lg:h-7 fill-black ms-0.5" />
            </div>
          </div>
        )}

        {/* Number badge */}
        {isLoaded && (
          <div className="absolute top-3 start-3 bg-black/70 backdrop-blur-sm border border-(--main-color)/40 text-(--main-color) text-[11px] font-bold px-2.5 py-1 rounded-full">
            #{index + 1}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 lg:p-4 flex items-center justify-between gap-3 bg-[#171717]">
        <h3 className="text-white font-bold text-[13px] lg:text-[14px] truncate flex-1">
          {t("journey.videoTitle", { number: index + 1 })}
        </h3>
        <div className="flex items-center gap-1 text-(--main-color) text-[11px] font-medium">
          <Play size={11} />
          <span>{t("journey.watchNow")}</span>
        </div>
      </div>
    </button>
  );
}

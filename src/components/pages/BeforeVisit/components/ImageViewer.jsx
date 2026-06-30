import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ImageViewer({ images, startIndex = 0, onClose }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index]);

  const next = () => {
    setZoom(1);
    setIndex((p) => (p + 1) % images.length);
  };
  const prev = () => {
    setZoom(1);
    setIndex((p) => (p - 1 + images.length) % images.length);
  };

  const hasMany = images.length > 1;

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between p-3 lg:p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--main-color)/20 text-white flex items-center justify-center transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--main-color)/20 text-white flex items-center justify-center transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
        </div>

        <div className="text-white/80 text-[12px] lg:text-[13px] font-medium">
          {t("beforeVisit.imageCounter", {
            current: index + 1,
            total: images.length,
          })}
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500/30 text-white flex items-center justify-center transition-colors"
          title={t("beforeVisit.closeViewer")}
        >
          <X size={18} />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4 relative">
        <img
          src={images[index]}
          alt={`view-${index}`}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
      </div>

      {/* Nav buttons */}
      {hasMany && (
        <>
          <button
            onClick={prev}
            className="absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors backdrop-blur-md"
            title={t("beforeVisit.prevImage")}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-(--main-color)/30 text-white flex items-center justify-center transition-colors backdrop-blur-md"
            title={t("beforeVisit.nextImage")}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Thumbnails (لو فيه أكتر من صورة) */}
      {hasMany && (
        <div className="border-t border-white/10 p-3 flex justify-center gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setZoom(1);
              }}
              className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-md overflow-hidden border-2 transition-all ${
                i === index
                  ? "border-(--main-color) opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

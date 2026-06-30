import { ImageIcon, ZoomIn } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageViewer from "../components/ImageViewer";

export default function ExamView({ section }) {
  const { t } = useTranslation();
  const [viewerIndex, setViewerIndex] = useState(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="bg-[#171717] border border-(--main-color)/30 rounded-xl p-5">
        <h2 className="text-white font-bold text-[16px] lg:text-[18px] mb-1.5">
          {t(`beforeVisit.sections.${section.id}.title`)}
        </h2>
        <p className="text-white/70 text-[12px] lg:text-[13px] leading-relaxed">
          {t(`beforeVisit.sections.${section.id}.shortDesc`)}
        </p>
      </div>

      {/* Hint */}
      <div className="border border-(--main-color)/30 bg-(--main-color)/5 rounded-md p-3 flex gap-2.5 items-center">
        <div className="w-7 h-7 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center flex-shrink-0">
          <ImageIcon size={14} className="text-(--main-color)" />
        </div>
        <p className="text-white/80 text-[11.5px] lg:text-[12.5px] flex-1">
          {t("beforeVisit.imagesHint")}
        </p>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {section.images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setViewerIndex(idx)}
            className="group relative bg-[#0d0d0d] border border-(--main-color)/30 hover:border-(--main-color) rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-[0_4px_20px_rgba(212,154,62,0.15)]"
          >
            <img
              src={img}
              alt={`${section.id}-${idx + 1}`}
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-(--main-color) text-black scale-0 group-hover:scale-100 transition-transform flex items-center justify-center shadow-xl">
                <ZoomIn size={20} />
              </div>
            </div>

            {/* Counter badge */}
            <div className="absolute top-2 end-2 bg-black/70 backdrop-blur-sm border border-(--main-color)/40 text-(--main-color) text-[10px] font-bold px-2 py-0.5 rounded-full">
              {idx + 1} / {section.images.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {viewerIndex !== null && (
        <ImageViewer
          images={section.images}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}

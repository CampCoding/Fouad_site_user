import { Sparkles } from "lucide-react";

export default function ValueCard({ title, desc, icon: Icon = Sparkles }) {
  return (
    <div className="bg-[#171717] border border-(--main-color)/30 hover:border-(--main-color) rounded-xl p-4 lg:p-5 flex flex-col items-center text-center gap-2 transition-all hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-full bg-(--main-color)/15 border border-(--main-color)/40 flex items-center justify-center mb-1">
        <Icon size={20} className="text-(--main-color)" />
      </div>
      <h4 className="text-white font-bold text-[13px] lg:text-[14px]">
        {title}
      </h4>
      <p className="text-white/60 text-[11px] lg:text-[11.5px] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

// src/pages/Profile/components/Modal.jsx
import { X } from "lucide-react";

export default function Modal({ children, onClose, title, icon }) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] lg:max-w-[480px] bg-[#171717] border border-(--main-color)/30 rounded-[18px] p-5 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-(--main-color)/20 pb-3 mb-4 sticky top-0 bg-[#171717] z-10">
          <h3 className="text-white font-bold text-[15px] flex items-center gap-2">
            {icon}
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

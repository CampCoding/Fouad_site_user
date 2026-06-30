// src/pages/Profile/components/ConsultationReplyModal.jsx
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Common/CustomInput";
import Modal from "./Modal";

export default function ConsultationReplyModal({
  consultation,
  onClose,
  onSubmit,
}) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    if (reply.trim().length < 10) {
      toast.error(
        isEn
          ? "Reply must be at least 10 characters"
          : "الرد يجب أن يكون 10 أحرف على الأقل",
      );
      return;
    }
    onSubmit(reply);
  };

  return (
    <Modal
      title={isEn ? "Reply to Consultation" : "الرد على الاستشارة"}
      icon={<MessageSquare size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {/* Patient info */}
        <div className="bg-[#0d0d0d] border border-(--main-color)/20 rounded-[10px] p-3">
          <p className="text-white/40 text-[10.5px]">
            {isEn ? "Patient" : "المريض"}
          </p>
          <p className="text-white font-bold text-[13.5px] mt-0.5">
            {isEn ? consultation.patientNameEn : consultation.patientName}
          </p>
        </div>

        {/* Original message */}
        {consultation.details && (
          <div>
            <p className="text-(--main-color) text-[11px] font-bold mb-1.5 px-1">
              {isEn ? "Patient's Question" : "سؤال المريض"}
            </p>
            <div className="bg-[#0d0d0d] border border-[#222] rounded-[10px] p-3 max-h-[120px] overflow-y-auto">
              <p className="text-white/75 text-[11.5px] leading-relaxed">
                {isEn
                  ? consultation.detailsEn || consultation.details
                  : consultation.details}
              </p>
            </div>
          </div>
        )}

        {/* Reply input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--main-color) text-[11.5px] font-bold px-1">
            {isEn ? "Your Reply" : "ردك"}
          </label>
          <CustomInput
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            istextarea
            row={6}
            placeholder={
              isEn
                ? "Write your medical advice and recommendations..."
                : "اكتب نصيحتك الطبية وتوصياتك..."
            }
          />
          <div className="flex items-center justify-between px-1">
            <p
              className={`text-[10px] ${
                reply.trim().length < 10
                  ? "text-red-400"
                  : "text-(--green-color)"
              }`}
            >
              {reply.trim().length < 10
                ? isEn
                  ? `Min 10 chars (${10 - reply.trim().length} more)`
                  : `الحد الأدنى 10 (متبقي ${10 - reply.trim().length})`
                : isEn
                  ? "✓ Ready to send"
                  : "✓ جاهز للإرسال"}
            </p>
            <p className="text-white/40 text-[10px]">
              {reply.length} {isEn ? "chars" : "حرف"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            <Send size={14} />
            {isEn ? "Send Reply" : "إرسال الرد"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[38px] font-bold bg-[#232323] text-white/70 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors text-[13px]"
          >
            {t("profile.modal.cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// src/pages/Profile/components/NewMessageModal.jsx
import { MessageCirclePlus, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Common/CustomInput";
import Modal from "./Modal";

export default function NewMessageModal({ onClose, onSend }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [form, setForm] = useState({ subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim()) {
      toast.error(isEn ? "Subject is required" : "الموضوع مطلوب");
      return;
    }
    if (!form.message.trim()) {
      toast.error(isEn ? "Message body is required" : "نص الرسالة مطلوب");
      return;
    }
    onSend(form);
    toast.success(
      isEn ? "Message sent successfully" : "تم إرسال الرسالة بنجاح",
    );
  };

  return (
    <Modal
      title={t("profile.messages.newMessageTitle")}
      icon={<MessageCirclePlus size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <CustomInput
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          type="text"
          placeholder={t("profile.messages.subject")}
        />
        <CustomInput
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          istextarea
          row={5}
          placeholder={t("profile.messages.messageBody")}
        />
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            <Send size={14} />
            {t("profile.messages.send")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[38px] font-bold bg-[#232323] text-white/70 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors text-[13px]"
          >
            {t("profile.modal.cancel")}
          </button>
        </div>
      </form>
    </Modal>
  );
}

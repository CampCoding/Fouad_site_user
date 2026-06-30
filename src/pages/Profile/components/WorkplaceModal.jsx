// src/pages/Profile/components/WorkplaceModal.jsx
import { Building2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Common/CustomInput";
import Modal from "./Modal";

export default function WorkplaceModal({ onClose, onSave }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [form, setForm] = useState({ hospitalName: "", hospitalCode: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.hospitalName.trim()) {
      toast.error(isEn ? "Workplace name is required" : "اسم المكان مطلوب");
      return;
    }
    onSave(form);
    toast.success(isEn ? "Workplace added" : "تمت إضافة مكان العمل");
  };

  return (
    <Modal
      title={t("profile.data.addWorkplace")}
      icon={<Building2 size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <CustomInput
          value={form.hospitalName}
          onChange={(e) => setForm({ ...form, hospitalName: e.target.value })}
          type="text"
          placeholder={t("profile.data.workplaceName")}
        />

        <CustomInput
          value={form.hospitalCode}
          onChange={(e) => setForm({ ...form, hospitalCode: e.target.value })}
          type="text"
          placeholder={
            isEn ? "Workplace Code (optional)" : "كود المكان (اختياري)"
          }
        />

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color)"
          >
            {t("profile.modal.add")}
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

// src/pages/Profile/components/EditPatientModal.jsx
import { Activity, CalendarCheck, Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomCombobox from "../../../components/Common/CustomCombobox";
import CustomDate from "../../../components/Common/CustomDate";
import Modal from "./Modal";
import { DIAGNOSIS_OPTIONS, STATUS_OPTIONS } from "./data";

export default function EditPatientModal({ patient, onClose, onSave }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const toInputDate = (str) => {
    if (!str) return "";
    const [day, month, year] = str.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const toDisplayDate = (str) => {
    if (!str) return "";
    const [year, month, day] = str.split("-");
    return `${day}-${month}-${year}`;
  };

  const [form, setForm] = useState({
    diagnosis: patient.diagnosis || "",
    status: patient.status || "follow_up",
    nextVisit: toInputDate(patient.nextVisit),
  });

  const diagnosisOptions = DIAGNOSIS_OPTIONS.map((d) => ({
    value: d.value,
    label: isEn ? d.labelEn : d.labelAr,
  }));

  const statusOptions = STATUS_OPTIONS.map((s) => ({
    value: s.value,
    label: isEn ? s.labelEn : s.labelAr,
  }));

  const handleSave = () => {
    if (!form.diagnosis.trim()) {
      toast.error(isEn ? "Diagnosis is required" : "التشخيص مطلوب");
      return;
    }
    if (!form.status.trim()) {
      toast.error(isEn ? "Status is required" : "الحالة مطلوبة");
      return;
    }

    onSave({
      diagnosis: form.diagnosis,
      status: form.status,
      nextVisit: form.nextVisit ? toDisplayDate(form.nextVisit) : null,
    });

    toast.success(isEn ? "Patient data updated" : "تم تحديث بيانات المريض");
  };

  const handleClearVisit = () => {
    setForm({ ...form, nextVisit: "" });
    toast(isEn ? "Next visit cleared" : "تم مسح تاريخ الزيارة", {
      icon: "🗑️",
    });
  };

  return (
    <Modal
      title={isEn ? "Edit Patient" : "تعديل بيانات المريض"}
      icon={<Pencil size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {/* Patient info */}
        <div className="bg-[#0d0d0d] border border-(--main-color)/20 rounded-[10px] p-3">
          <p className="text-white/40 text-[10.5px]">
            {isEn ? "Patient" : "المريض"}
          </p>
          <p className="text-white font-bold text-[14px] mt-0.5">
            {patient.name}
          </p>
        </div>

        {/* Diagnosis */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--main-color) text-[11.5px] font-bold px-1">
            {isEn ? "Diagnosis" : "التشخيص"}
          </label>
          <CustomCombobox
            value={form.diagnosis}
            onChange={(val) => setForm({ ...form, diagnosis: val })}
            options={diagnosisOptions}
            placeholder={
              isEn ? "Select or type diagnosis" : "اختر أو اكتب التشخيص"
            }
            allowCustom
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-(--main-color) text-[11.5px] font-bold px-1">
            <Activity size={13} />
            {isEn ? "Status" : "الحالة"}
          </label>
          <CustomCombobox
            value={form.status}
            onChange={(val) => setForm({ ...form, status: val })}
            options={statusOptions}
            placeholder={isEn ? "Select status" : "اختر الحالة"}
            allowCustom
          />
        </div>

        {/* Next Visit */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-(--main-color) text-[11.5px] font-bold px-1">
            <CalendarCheck size={13} />
            {isEn ? "Next Visit Date" : "تاريخ الزيارة القادمة"}
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <CustomDate
                value={form.nextVisit}
                onChange={(val) => setForm({ ...form, nextVisit: val })}
                placeholder={isEn ? "Select date" : "اختر التاريخ"}
              />
            </div>
            {form.nextVisit && (
              <button
                type="button"
                onClick={handleClearVisit}
                className="flex-shrink-0 h-[38px] w-[38px] rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                title={isEn ? "Clear date" : "مسح التاريخ"}
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            type="button"
            onClick={handleSave}
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            <Save size={14} />
            {isEn ? "Save Changes" : "حفظ التعديلات"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-4 font-bold bg-[#232323] text-white/70 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors text-[13px]"
          >
            {t("profile.modal.cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// src/pages/Profile/components/AddPatientModal.jsx
import { Activity, CalendarCheck, Plus, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomCombobox from "../../../components/Common/CustomCombobox";
import CustomDate from "../../../components/Common/CustomDate";
import CustomInput from "../../../components/Common/CustomInput";
import Modal from "./Modal";
import { DIAGNOSIS_OPTIONS, STATUS_OPTIONS } from "./data";

export default function AddPatientModal({ onClose, onAdd }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    diagnosis: "",
    status: "new",
    nextVisit: "",
  });

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const diagnosisOptions = DIAGNOSIS_OPTIONS.map((d) => ({
    value: d.value,
    label: isEn ? d.labelEn : d.labelAr,
  }));

  const statusOptions = STATUS_OPTIONS.map((s) => ({
    value: s.value,
    label: isEn ? s.labelEn : s.labelAr,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(isEn ? "Patient name is required" : "اسم المريض مطلوب");
      return;
    }
    if (!form.diagnosis.trim()) {
      toast.error(isEn ? "Diagnosis is required" : "التشخيص مطلوب");
      return;
    }
    if (!form.status.trim()) {
      toast.error(isEn ? "Status is required" : "حالة المريض مطلوبة");
      return;
    }

    onAdd({
      ...form,
      nextVisit: form.nextVisit ? formatDate(form.nextVisit) : null,
    });

    toast.success(
      isEn ? "Patient added successfully" : "تمت إضافة المريض بنجاح",
    );
  };

  return (
    <Modal
      title={isEn ? "Add New Patient" : "إضافة مريض جديد"}
      icon={<Users size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <CustomInput
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          placeholder={isEn ? "Patient Name" : "اسم المريض"}
        />

        <CustomInput
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          type="text"
          placeholder={isEn ? "Age (e.g. 4 years)" : "العمر (مثال: 4 سنوات)"}
        />

        <CustomInput
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          type="tel"
          placeholder={isEn ? "Phone Number" : "رقم الهاتف"}
        />

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
            {isEn ? "Patient Status" : "حالة المريض"}
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
            {isEn
              ? "Next Visit Date (optional)"
              : "تاريخ الزيارة القادمة (اختياري)"}
          </label>
          <CustomDate
            value={form.nextVisit}
            onChange={(val) => setForm({ ...form, nextVisit: val })}
            placeholder={isEn ? "Select next visit date" : "اختر تاريخ الزيارة"}
          />
          <p className="text-white/35 text-[10.5px] px-1">
            {isEn
              ? "You can set it later from patient details."
              : "يمكنك تحديده لاحقًا من تفاصيل المريض."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            <Plus size={14} />
            {isEn ? "Add Patient" : "إضافة المريض"}
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

// src/pages/Profile/components/HospitalModal.jsx
import { Building2, Clock, Plus, Save } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomDate from "../../../components/Common/CustomDate";
import CustomInput from "../../../components/Common/CustomInput";
import CustomTimeRange from "../../../components/Common/CustomTimeRange";
import Modal from "./Modal";
import { WORKING_DAYS_OPTIONS } from "./data";

export default function HospitalModal({ hospital, onClose, onSave }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const isEditing = !!hospital;

  const [form, setForm] = useState({
    name: hospital?.name || "",
    department: hospital?.department || "",
    position: hospital?.position || "",
    startDate: hospital?.startDate || "",
    workingHoursFrom: hospital?.workingHoursFrom || "",
    workingHoursTo: hospital?.workingHoursTo || "",
    workingDays: hospital?.workingDays || [],
  });

  const toggleDay = (day) => {
    setForm({
      ...form,
      workingDays: form.workingDays.includes(day)
        ? form.workingDays.filter((d) => d !== day)
        : [...form.workingDays, day],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error(isEn ? "Hospital name is required" : "اسم المستشفى مطلوب");
      return;
    }
    if (!form.department.trim()) {
      toast.error(isEn ? "Department is required" : "القسم مطلوب");
      return;
    }
    if (!form.position.trim()) {
      toast.error(isEn ? "Position is required" : "المنصب مطلوب");
      return;
    }
    if (!form.workingHoursFrom || !form.workingHoursTo) {
      toast.error(isEn ? "Working hours are required" : "ساعات العمل مطلوبة");
      return;
    }
    if (form.workingHoursFrom >= form.workingHoursTo) {
      toast.error(
        isEn
          ? "End time must be after start time"
          : "وقت النهاية يجب أن يكون بعد وقت البداية",
      );
      return;
    }
    onSave(form);
  };

  return (
    <Modal
      title={
        isEditing
          ? isEn
            ? "Edit Hospital"
            : "تعديل المستشفى"
          : isEn
            ? "Add New Hospital"
            : "إضافة مستشفى جديد"
      }
      icon={<Building2 size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <CustomInput
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          placeholder={isEn ? "Hospital Name" : "اسم المستشفى"}
        />
        <CustomInput
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          type="text"
          placeholder={isEn ? "Department" : "القسم"}
        />
        <CustomInput
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          type="text"
          placeholder={
            isEn ? "Position (e.g. Consultant)" : "المنصب (مثال: استشاري)"
          }
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-(--main-color) text-[11.5px] font-bold px-1">
            {isEn ? "Start Date" : "تاريخ بدء العمل"}
          </label>
          <CustomDate
            value={form.startDate}
            onChange={(val) => setForm({ ...form, startDate: val })}
            placeholder={isEn ? "Select date" : "اختر التاريخ"}
          />
        </div>

        {/* Working Hours - TimeRange */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-(--main-color) text-[11.5px] font-bold px-1">
            <Clock size={13} />
            {isEn ? "Working Hours" : "ساعات العمل"}
          </label>
          <CustomTimeRange
            fromValue={form.workingHoursFrom}
            toValue={form.workingHoursTo}
            onFromChange={(val) => setForm({ ...form, workingHoursFrom: val })}
            onToChange={(val) => setForm({ ...form, workingHoursTo: val })}
            fromPlaceholder={isEn ? "From" : "من"}
            toPlaceholder={isEn ? "To" : "إلى"}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--main-color) text-[11.5px] font-bold px-1">
            {isEn ? "Working Days" : "أيام العمل"}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {WORKING_DAYS_OPTIONS.map((day) => {
              const isActive = form.workingDays.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                    isActive
                      ? "bg-(--main-color) border-(--main-color) text-black"
                      : "bg-[#0d0d0d] border-(--main-color)/25 text-white/65 hover:border-(--main-color)/50"
                  }`}
                >
                  {isEn ? day.labelEn : day.labelAr}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            {isEditing ? <Save size={14} /> : <Plus size={14} />}
            {isEditing ? (isEn ? "Save" : "حفظ") : isEn ? "Add" : "إضافة"}
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

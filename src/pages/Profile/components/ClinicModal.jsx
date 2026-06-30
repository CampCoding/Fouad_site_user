// src/pages/Profile/components/ClinicModal.jsx
import { Clock, Plus, Save, Stethoscope } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Common/CustomInput";
import CustomTimeRange from "../../../components/Common/CustomTimeRange";
import Modal from "./Modal";
import { WORKING_DAYS_OPTIONS } from "./data";

export default function ClinicModal({ clinic, onClose, onSave }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const isEditing = !!clinic;

  const [form, setForm] = useState({
    name: clinic?.name || "",
    address: clinic?.address || "",
    phone: clinic?.phone || "",
    consultationPrice: clinic?.consultationPrice || "",
    workingHoursFrom: clinic?.workingHoursFrom || "",
    workingHoursTo: clinic?.workingHoursTo || "",
    workingDays: clinic?.workingDays || [],
    mapLink: clinic?.mapLink || "",
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
      toast.error(isEn ? "Clinic name is required" : "اسم العيادة مطلوب");
      return;
    }
    if (!form.address.trim()) {
      toast.error(isEn ? "Address is required" : "العنوان مطلوب");
      return;
    }
    if (!form.phone.trim()) {
      toast.error(isEn ? "Phone is required" : "رقم الهاتف مطلوب");
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
    if (form.workingDays.length === 0) {
      toast.error(
        isEn ? "Select working days" : "اختر أيام العمل على الأقل يوم واحد",
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
            ? "Edit Clinic"
            : "تعديل العيادة"
          : isEn
            ? "Add New Clinic"
            : "إضافة عيادة جديدة"
      }
      icon={<Stethoscope size={18} className="text-(--main-color)" />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <CustomInput
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          placeholder={isEn ? "Clinic Name" : "اسم العيادة"}
        />

        <CustomInput
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          type="text"
          placeholder={isEn ? "Address" : "العنوان"}
        />

        <CustomInput
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          type="tel"
          placeholder={isEn ? "Phone Number" : "رقم الهاتف"}
        />

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

        {/* Working Days */}
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

        <CustomInput
          value={form.mapLink}
          onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
          type="url"
          placeholder={
            isEn ? "Google Maps Link (optional)" : "رابط الموقع (اختياري)"
          }
        />

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="auth_btn flex-1 font-bold !rounded-md !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
          >
            {isEditing ? <Save size={14} /> : <Plus size={14} />}
            {isEditing
              ? isEn
                ? "Save Changes"
                : "حفظ"
              : isEn
                ? "Add Clinic"
                : "إضافة"}
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

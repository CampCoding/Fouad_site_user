// src/pages/Profile/components/ClinicsView.jsx
import { Popconfirm } from "antd";
import { Clock, MapPin, Phone, Plus, Stethoscope, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ClinicModal from "./ClinicModal";
import { DOCTOR_CLINICS, formatTimeRange, getWorkingDaysLabel } from "./data";

export default function ClinicsView() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [clinics, setClinics] = useState(DOCTOR_CLINICS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);

  const handleSave = (form) => {
    if (editingClinic) {
      setClinics(
        clinics.map((c) => (c.id === editingClinic.id ? { ...c, ...form } : c)),
      );
      toast.success(isEn ? "Clinic updated" : "تم تحديث العيادة");
    } else {
      setClinics([
        { id: Date.now(), ...form, nameEn: form.name, addressEn: form.address },
        ...clinics,
      ]);
      toast.success(isEn ? "Clinic added" : "تمت إضافة العيادة");
    }
    setIsModalOpen(false);
    setEditingClinic(null);
  };

  const handleDelete = (id) => {
    setClinics(clinics.filter((c) => c.id !== id));
    toast.success(isEn ? "Clinic deleted" : "تم حذف العيادة", { icon: "🗑️" });
  };

  const openEditModal = (clinic) => {
    setEditingClinic(clinic);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-(--main-color) text-[13px] font-bold">
            {isEn ? "My Clinics" : "عياداتي"}
          </p>
          <p className="text-white/40 text-[11px] mt-0.5">
            {clinics.length} {isEn ? "clinic(s)" : "عيادة"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingClinic(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 h-[38px] px-4 bg-(--main-color) rounded-[10px] text-black font-bold text-[13px] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          {isEn ? "Add Clinic" : "إضافة عيادة"}
        </button>
      </div>

      {/* Clinics List */}
      {clinics.length === 0 ? (
        <div className="border border-[#292929] bg-[#111] rounded-[14px] py-12 flex flex-col items-center gap-3">
          <Stethoscope size={36} className="text-white/20" />
          <p className="text-white/40 text-[13px]">
            {isEn ? "No clinics added yet" : "لا توجد عيادات مضافة بعد"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="relative rounded-[14px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#141414_0%,#0f0f0f_100%)] p-4 hover:border-(--main-color) transition-colors"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-[12px] bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center">
                  <Stethoscope size={20} className="text-(--main-color)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-[14px] truncate">
                    {isEn ? clinic.nameEn : clinic.name}
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5">
                <InfoChip
                  icon={<MapPin size={11} className="text-(--main-color)" />}
                  text={isEn ? clinic.addressEn : clinic.address}
                />
                <InfoChip
                  icon={<Phone size={11} className="text-(--main-color)" />}
                  text={clinic.phone}
                />
                <InfoChip
                  icon={<Clock size={11} className="text-(--main-color)" />}
                  text={formatTimeRange(
                    clinic.workingHoursFrom,
                    clinic.workingHoursTo,
                    isEn,
                  )}
                />
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {clinic.workingDays.map((day) => (
                    <span
                      key={day}
                      className="text-[10px] bg-(--main-color)/10 text-(--main-color) px-2 py-0.5 rounded-full border border-(--main-color)/25"
                    >
                      {getWorkingDaysLabel([day], isEn)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => openEditModal(clinic)}
                  className="flex-1 h-[32px] rounded-[8px] bg-(--main-color)/10 border border-(--main-color)/30 text-(--main-color) text-[11.5px] font-bold hover:bg-(--main-color)/20 transition-colors"
                >
                  {isEn ? "Edit" : "تعديل"}
                </button>
                <Popconfirm
                  title={
                    <span className="text-white font-bold text-[13px]">
                      {isEn ? "Delete Clinic?" : "حذف العيادة؟"}
                    </span>
                  }
                  description={
                    <span className="text-white/60 text-[12px]">
                      {isEn
                        ? `Delete "${clinic.name}"?`
                        : `حذف "${clinic.name}"؟`}
                    </span>
                  }
                  okText={isEn ? "Yes, Delete" : "نعم"}
                  cancelText={isEn ? "Cancel" : "إلغاء"}
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleDelete(clinic.id)}
                >
                  <button
                    type="button"
                    className="h-[32px] w-[32px] rounded-[8px] bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ClinicModal
          clinic={editingClinic}
          onClose={() => {
            setIsModalOpen(false);
            setEditingClinic(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function InfoChip({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 bg-[#0d0d0d] border border-[#222] rounded-[6px] px-2 py-1">
      {icon}
      <p className="text-white/75 text-[11px] truncate">{text}</p>
    </div>
  );
}

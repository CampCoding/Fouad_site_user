// src/pages/Profile/components/HospitalsView.jsx
import { Popconfirm } from "antd";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import HospitalModal from "./HospitalModal";
import { DOCTOR_HOSPITALS, formatTimeRange, getWorkingDaysLabel } from "./data";

export default function HospitalsView() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [hospitals, setHospitals] = useState(DOCTOR_HOSPITALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  const handleSave = (form) => {
    if (editingHospital) {
      setHospitals(
        hospitals.map((h) =>
          h.id === editingHospital.id ? { ...h, ...form } : h,
        ),
      );
      toast.success(isEn ? "Hospital updated" : "تم تحديث المستشفى");
    } else {
      setHospitals([
        {
          id: Date.now(),
          ...form,
          nameEn: form.name,
          departmentEn: form.department,
          positionEn: form.position,
        },
        ...hospitals,
      ]);
      toast.success(isEn ? "Hospital added" : "تمت إضافة المستشفى");
    }
    setIsModalOpen(false);
    setEditingHospital(null);
  };

  const handleDelete = (id) => {
    setHospitals(hospitals.filter((h) => h.id !== id));
    toast.success(isEn ? "Hospital deleted" : "تم حذف المستشفى", {
      icon: "🗑️",
    });
  };

  const openEditModal = (hospital) => {
    setEditingHospital(hospital);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-(--main-color) text-[13px] font-bold">
            {isEn ? "My Hospitals" : "مستشفياتي"}
          </p>
          <p className="text-white/40 text-[11px] mt-0.5">
            {hospitals.length} {isEn ? "hospital(s)" : "مستشفى"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingHospital(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 h-[38px] px-4 bg-(--main-color) rounded-[10px] text-black font-bold text-[13px] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          {isEn ? "Add" : "إضافة"}
        </button>
      </div>

      {/* List */}
      {hospitals.length === 0 ? (
        <div className="border border-[#292929] bg-[#111] rounded-[14px] py-12 flex flex-col items-center gap-3">
          <Building2 size={36} className="text-white/20" />
          <p className="text-white/40 text-[13px]">
            {isEn ? "No hospitals added yet" : "لا توجد مستشفيات مضافة"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="relative rounded-[14px] border border-(--main-color)/30 bg-[linear-gradient(180deg,#141414_0%,#0f0f0f_100%)] p-4 hover:border-(--main-color) transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-[12px] bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center">
                  <Building2 size={20} className="text-(--main-color)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-[14px]">
                    {isEn ? hospital.nameEn : hospital.name}
                  </h3>
                  <p className="text-white/55 text-[11.5px] mt-0.5">
                    {isEn ? hospital.departmentEn : hospital.department}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#222] rounded-[6px] px-2.5 py-1.5">
                  <Briefcase size={11} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px]">
                    <span className="text-white/45">
                      {isEn ? "Position: " : "المنصب: "}
                    </span>
                    <span className="font-bold">
                      {isEn ? hospital.positionEn : hospital.position}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#222] rounded-[6px] px-2.5 py-1.5">
                  <Calendar size={11} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px]">
                    <span className="text-white/45">
                      {isEn ? "Since: " : "منذ: "}
                    </span>
                    <span className="font-bold">{hospital.startDate}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#222] rounded-[6px] px-2.5 py-1.5">
                  <Clock size={11} className="text-(--main-color)" />
                  <p className="text-white/80 text-[11px] truncate">
                    {formatTimeRange(
                      hospital.workingHoursFrom,
                      hospital.workingHoursTo,
                      isEn,
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {hospital.workingDays.map((day) => (
                    <span
                      key={day}
                      className="text-[10px] bg-(--main-color)/10 text-(--main-color) px-2 py-0.5 rounded-full border border-(--main-color)/25"
                    >
                      {getWorkingDaysLabel([day], isEn)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => openEditModal(hospital)}
                  className="flex-1 h-[32px] rounded-[8px] bg-(--main-color)/10 border border-(--main-color)/30 text-(--main-color) text-[11.5px] font-bold hover:bg-(--main-color)/20 transition-colors"
                >
                  {isEn ? "Edit" : "تعديل"}
                </button>
                <Popconfirm
                  title={
                    <span className="text-white font-bold text-[13px]">
                      {isEn ? "Delete Hospital?" : "حذف المستشفى؟"}
                    </span>
                  }
                  description={
                    <span className="text-white/60 text-[12px]">
                      {isEn
                        ? `Delete "${hospital.name}"?`
                        : `حذف "${hospital.name}"؟`}
                    </span>
                  }
                  okText={isEn ? "Yes" : "نعم"}
                  cancelText={isEn ? "Cancel" : "إلغاء"}
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleDelete(hospital.id)}
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
        <HospitalModal
          hospital={editingHospital}
          onClose={() => {
            setIsModalOpen(false);
            setEditingHospital(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

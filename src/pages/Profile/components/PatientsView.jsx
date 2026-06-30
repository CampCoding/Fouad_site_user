import { Popconfirm } from "antd";
import {
  Calendar,
  CalendarCheck,
  ChevronLeft,
  ClipboardList,
  Heart,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";
import InfoRow from "./InfoRow";
import {
  PATIENTS_DATA,
  getDiagnosisLabel,
  getStatusColor,
  getStatusLabel,
} from "./data";

export default function PatientsView() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [patients, setPatients] = useState(PATIENTS_DATA);
  const [patientSearch, setPatientSearch] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editPatient, setEditPatient] = useState(null);

  const handleAddPatient = (form) => {
    const lastVisit = new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    const newPatient = {
      id: Date.now(),
      name: form.name,
      age: form.age,
      ageEn: form.age,
      phone: form.phone,
      diagnosis: form.diagnosis,
      lastVisit,
      nextVisit: form.nextVisit || null,
      status: form.status,
    };
    setPatients([newPatient, ...patients]);
    setIsAddPatientOpen(false);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
    if (selectedPatient?.id === id) setSelectedPatient(null);
    toast.success(isEn ? "Patient deleted" : "تم حذف المريض", { icon: "🗑️" });
  };

  const handleUpdatePatient = (updates) => {
    if (!editPatient) return;

    const updated = patients.map((p) =>
      p.id === editPatient.id ? { ...p, ...updates } : p,
    );
    setPatients(updated);

    if (selectedPatient?.id === editPatient.id) {
      setSelectedPatient({ ...selectedPatient, ...updates });
    }

    setEditPatient(null);
  };

  const filteredPatients = patients.filter((p) => {
    const diagLabel = getDiagnosisLabel(p.diagnosis, isEn);
    return (
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      diagLabel.toLowerCase().includes(patientSearch.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Search + Add */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute top-1/2 -translate-y-1/2 start-3 text-white/40"
          />
          <input
            type="text"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            placeholder={isEn ? "Search patient..." : "ابحث عن مريض..."}
            className="w-full h-[38px] bg-[#111] border border-(--main-color)/30 rounded-[10px] ps-9 pe-3 text-white text-[13px] outline-none focus:border-(--main-color) transition-colors placeholder:text-white/30"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsAddPatientOpen(true)}
          className="flex-shrink-0 flex items-center gap-1.5 h-[38px] px-4 bg-(--main-color) rounded-[10px] text-black font-bold text-[13px] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          {isEn ? "Add" : "إضافة"}
        </button>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-(--main-color) text-[12px] font-bold">
          {isEn ? "Patients List" : "قائمة المرضى"}
        </p>
        <p className="text-white/40 text-[11px]">
          {filteredPatients.length} {isEn ? "patient(s)" : "مريض"}
        </p>
      </div>

      {/* Selected Patient Detail */}
      {selectedPatient && (
        <div className="relative rounded-[16px] border border-(--main-color)/40 bg-[linear-gradient(180deg,#141414_0%,#0f0f0f_100%)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-(--main-color)/50 to-transparent" />

          <button
            type="button"
            onClick={() => setSelectedPatient(null)}
            className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X size={14} className="text-white" />
          </button>

          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center">
                <Heart
                  size={22}
                  className="text-(--main-color)"
                  fill="currentColor"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-bold text-[16px]">
                    {selectedPatient.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(selectedPatient.status)}`}
                  >
                    {getStatusLabel(selectedPatient.status, isEn)}
                  </span>
                </div>
                <p className="text-white/50 text-[12px] mt-0.5">
                  {isEn ? selectedPatient.ageEn : selectedPatient.age}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <InfoRow
                icon={
                  <ClipboardList size={13} className="text-(--main-color)" />
                }
                label={isEn ? "Diagnosis" : "التشخيص"}
                value={getDiagnosisLabel(selectedPatient.diagnosis, isEn)}
              />
              <InfoRow
                icon={<Phone size={13} className="text-(--main-color)" />}
                label={isEn ? "Phone" : "الهاتف"}
                value={selectedPatient.phone}
              />
              <InfoRow
                icon={<Calendar size={13} className="text-(--main-color)" />}
                label={isEn ? "Last Visit" : "آخر زيارة"}
                value={selectedPatient.lastVisit}
              />
              <div className="flex items-start gap-2 bg-[#0d0d0d] border border-[#222] rounded-[10px] p-2.5">
                <div className="flex-shrink-0 mt-0.5">
                  <CalendarCheck size={13} className="text-(--main-color)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[10px]">
                    {isEn ? "Next Visit" : "الزيارة القادمة"}
                  </p>
                  <p
                    className={`text-[12px] font-bold mt-0.5 break-words ${
                      selectedPatient.nextVisit ? "text-white" : "text-white/40"
                    }`}
                  >
                    {selectedPatient.nextVisit ||
                      (isEn ? "Not set" : "غير محدد")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setEditPatient(selectedPatient)}
                className="flex items-center gap-1.5 px-3 h-[34px] rounded-[8px] bg-(--main-color)/10 border border-(--main-color)/30 text-(--main-color) text-[12px] font-bold hover:bg-(--main-color)/20 transition-colors"
              >
                <Pencil size={13} />
                {isEn ? "Edit" : "تعديل"}
              </button>

              <Popconfirm
                title={
                  <span className="text-white font-bold text-[13px]">
                    {isEn ? "Delete Patient?" : "حذف المريض؟"}
                  </span>
                }
                description={
                  <span className="text-white/60 text-[12px]">
                    {isEn
                      ? `Delete "${selectedPatient.name}"?`
                      : `حذف "${selectedPatient.name}"؟`}
                  </span>
                }
                okText={isEn ? "Yes, Delete" : "نعم، احذف"}
                cancelText={isEn ? "Cancel" : "إلغاء"}
                okButtonProps={{ danger: true }}
                onConfirm={() => handleDeletePatient(selectedPatient.id)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 h-[34px] rounded-[8px] bg-red-500/10 border border-red-500/30 text-red-500 text-[12px] font-bold hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={13} />
                  {isEn ? "Remove" : "حذف"}
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      )}

      {/* Patients List */}
      {filteredPatients.length === 0 ? (
        <div className="border border-[#292929] bg-[#111] rounded-[14px] py-12 flex flex-col items-center gap-3">
          <Users size={36} className="text-white/20" />
          <p className="text-white/40 text-[13px]">
            {isEn ? "No patients found" : "لا يوجد مرضى"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() =>
                setSelectedPatient(
                  selectedPatient?.id === patient.id ? null : patient,
                )
              }
              className={`w-full text-start rounded-[14px] border p-3.5 transition-all duration-200 ${
                selectedPatient?.id === patient.id
                  ? "border-(--main-color) bg-(--main-color)/5"
                  : "border-(--main-color)/20 bg-[#111] hover:border-(--main-color)/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/10 border border-(--main-color)/25 flex items-center justify-center">
                  <Heart
                    size={16}
                    className="text-(--main-color)"
                    fill="currentColor"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white font-bold text-[13px] truncate">
                      {patient.name}
                    </p>
                    <span
                      className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(patient.status)}`}
                    >
                      {getStatusLabel(patient.status, isEn)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-white/50 text-[11px]">
                      {isEn ? patient.ageEn : patient.age}
                    </p>
                    <span className="text-white/20">•</span>
                    <p className="text-white/50 text-[11px] truncate">
                      {getDiagnosisLabel(patient.diagnosis, isEn)}
                    </p>
                  </div>
                </div>

                <ChevronLeft
                  size={14}
                  className={`flex-shrink-0 transition-transform ${
                    selectedPatient?.id === patient.id
                      ? "text-(--main-color) rotate-90"
                      : "text-white/20"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {isAddPatientOpen && (
        <AddPatientModal
          onClose={() => setIsAddPatientOpen(false)}
          onAdd={handleAddPatient}
        />
      )}

      {editPatient && (
        <EditPatientModal
          patient={editPatient}
          onClose={() => setEditPatient(null)}
          onSave={handleUpdatePatient}
        />
      )}
    </div>
  );
}

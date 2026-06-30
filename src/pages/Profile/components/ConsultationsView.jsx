// src/pages/Profile/components/ConsultationsView.jsx
import {
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Clock,
  MessageCircleQuestion,
  MessageSquare,
  Phone,
  Plus,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useUser } from "../../../context/UserContext";
import ConsultationReplyModal from "./ConsultationReplyModal";
import {
  CONSULTATIONS_DATA,
  getConsultationStatusColor,
  getConsultationStatusLabel,
} from "./data";

const TYPE_ICONS = {
  phone: Phone,
  video: Video,
  chat: MessageSquare,
};

export default function ConsultationsView() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { isDoctor } = useUser();
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState(CONSULTATIONS_DATA);
  const [activeTab, setActiveTab] = useState(isDoctor ? "pending" : "all");
  const [selected, setSelected] = useState(null);
  const [replyConsultation, setReplyConsultation] = useState(null);

  // Filter consultations
  const filtered = useMemo(() => {
    if (activeTab === "all") return consultations;
    return consultations.filter((c) => c.status === activeTab);
  }, [consultations, activeTab]);

  const counts = useMemo(
    () => ({
      pending: consultations.filter((c) => c.status === "pending").length,
      accepted: consultations.filter((c) => c.status === "accepted").length,
      completed: consultations.filter((c) => c.status === "completed").length,
    }),
    [consultations],
  );

  const handleAccept = (id) => {
    setConsultations(
      consultations.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "accepted",
              acceptedAt: new Date()
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-"),
            }
          : c,
      ),
    );
    if (selected?.id === id) {
      setSelected({ ...selected, status: "accepted" });
    }
    toast.success(isEn ? "Consultation accepted" : "تم قبول الاستشارة بنجاح");
  };

  const handleComplete = (id, reply) => {
    setConsultations(
      consultations.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "completed",
              doctorReply: reply,
              completedAt: new Date()
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-"),
            }
          : c,
      ),
    );
    if (selected?.id === id) {
      setSelected({ ...selected, status: "completed", doctorReply: reply });
    }
    setReplyConsultation(null);
    toast.success(isEn ? "Reply sent successfully" : "تم إرسال الرد بنجاح");
  };

  // Tabs config
  const doctorTabs = [
    {
      key: "pending",
      labelAr: "مطلوبة",
      labelEn: "Requests",
      count: counts.pending,
    },
    {
      key: "accepted",
      labelAr: "مقبولة",
      labelEn: "Accepted",
      count: counts.accepted,
    },
    {
      key: "completed",
      labelAr: "تمت",
      labelEn: "Completed",
      count: counts.completed,
    },
  ];

  const patientTabs = [
    {
      key: "all",
      labelAr: "الكل",
      labelEn: "All",
      count: consultations.length,
    },
    {
      key: "pending",
      labelAr: "في الانتظار",
      labelEn: "Pending",
      count: counts.pending,
    },
    {
      key: "accepted",
      labelAr: "مقبولة",
      labelEn: "Accepted",
      count: counts.accepted,
    },
    {
      key: "completed",
      labelAr: "تمت",
      labelEn: "Completed",
      count: counts.completed,
    },
  ];

  const tabs = isDoctor ? doctorTabs : patientTabs;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Patient: Request New */}
      {!isDoctor && (
        <button
          type="button"
          onClick={() => navigate("/consultations")}
          className="border border-(--main-color)/40 bg-gradient-to-br from-(--main-color)/10 to-(--main-color)/5 rounded-[14px] p-3.5 flex items-center gap-3 hover:border-(--main-color) hover:from-(--main-color)/15 transition-all"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-(--main-color) flex items-center justify-center">
            <Plus size={20} className="text-black" />
          </div>
          <div className="flex-1 text-start">
            <p className="text-white font-bold text-[13.5px]">
              {isEn ? "Request New Consultation" : "طلب استشارة جديدة"}
            </p>
            <p className="text-white/55 text-[11.5px] mt-0.5">
              {isEn
                ? "Phone, video or chat consultation"
                : "هاتفية، فيديو أو محادثة نصية"}
            </p>
          </div>
        </button>
      )}

      {/* Tabs */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
        <div className="flex gap-2 w-max min-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full border text-[12px] transition-all ${
                activeTab === tab.key
                  ? "bg-(--main-color) border-(--main-color) text-black font-bold"
                  : "bg-[#111] border-(--main-color)/25 text-white/70 hover:border-(--main-color)/50"
              }`}
            >
              <span>{isEn ? tab.labelEn : tab.labelAr}</span>
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.key
                      ? "bg-black/20 text-black"
                      : "bg-(--main-color)/20 text-(--main-color)"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Detail */}
      {selected && (
        <ConsultationDetail
          consultation={selected}
          isDoctor={isDoctor}
          isEn={isEn}
          onClose={() => setSelected(null)}
          onAccept={() => handleAccept(selected.id)}
          onReply={() => setReplyConsultation(selected)}
        />
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="border border-[#292929] bg-[#111] rounded-[14px] py-12 flex flex-col items-center gap-3">
          <MessageCircleQuestion size={36} className="text-white/20" />
          <p className="text-white/40 text-[13px]">
            {isEn ? "No consultations found" : "لا توجد استشارات"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((c) => {
            const Icon = TYPE_ICONS[c.type] || MessageSquare;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className={`w-full text-start rounded-[14px] border p-3.5 transition-all ${
                  selected?.id === c.id
                    ? "border-(--main-color) bg-(--main-color)/5"
                    : "border-(--main-color)/20 bg-[#111] hover:border-(--main-color)/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--main-color)/10 border border-(--main-color)/25 flex items-center justify-center">
                    <Icon size={16} className="text-(--main-color)" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white font-bold text-[13px] truncate">
                        {isDoctor
                          ? isEn
                            ? c.patientNameEn
                            : c.patientName
                          : isEn
                            ? c.doctorNameEn
                            : c.doctorName}
                      </p>
                      <span
                        className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getConsultationStatusColor(c.status)}`}
                      >
                        {getConsultationStatusLabel(c.status, isEn)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-(--main-color) text-[11px] font-bold">
                        {isEn ? c.requestedDayEn : c.requestedDay}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/60 text-[11px]">
                        {isEn ? c.requestedTimeEn : c.requestedTime}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/60 text-[11px]">
                        {c.price} {isEn ? "EGP" : "ج.م"}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft
                    size={14}
                    className={`flex-shrink-0 transition-transform ${
                      selected?.id === c.id
                        ? "text-(--main-color) rotate-90"
                        : "text-white/20"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Reply Modal */}
      {replyConsultation && (
        <ConsultationReplyModal
          consultation={replyConsultation}
          onClose={() => setReplyConsultation(null)}
          onSubmit={(reply) => handleComplete(replyConsultation.id, reply)}
        />
      )}
    </div>
  );
}

/* ============ Detail Component ============ */
function ConsultationDetail({
  consultation,
  isDoctor,
  isEn,
  onClose,
  onAccept,
  onReply,
}) {
  const Icon = TYPE_ICONS[consultation.type] || MessageSquare;

  return (
    <div className="relative rounded-[16px] border border-(--main-color)/40 bg-[linear-gradient(180deg,#141414_0%,#0f0f0f_100%)] overflow-hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
      >
        <ChevronLeft size={14} className="text-white rotate-90" />
      </button>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center">
            <Icon size={20} className="text-(--main-color)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-[15px]">
              {isDoctor
                ? isEn
                  ? consultation.patientNameEn
                  : consultation.patientName
                : isEn
                  ? consultation.doctorNameEn
                  : consultation.doctorName}
            </h3>
            {isDoctor && (
              <p className="text-white/55 text-[11.5px] mt-0.5">
                {isEn ? consultation.patientAgeEn : consultation.patientAge}
              </p>
            )}
          </div>
          <span
            className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border ${getConsultationStatusColor(consultation.status)}`}
          >
            {getConsultationStatusLabel(consultation.status, isEn)}
          </span>
        </div>

        {/* Appointment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-[8px] p-2.5">
            <p className="text-white/40 text-[10px]">
              {isEn ? "Day" : "اليوم"}
            </p>
            <p className="text-(--main-color) font-bold text-[12.5px] mt-0.5">
              {isEn ? consultation.requestedDayEn : consultation.requestedDay}
            </p>
          </div>
          <div className="bg-[#0d0d0d] border border-[#222] rounded-[8px] p-2.5">
            <p className="text-white/40 text-[10px]">
              {isEn ? "Time" : "الوقت"}
            </p>
            <p className="text-(--main-color) font-bold text-[12.5px] mt-0.5">
              {isEn ? consultation.requestedTimeEn : consultation.requestedTime}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-[8px] p-2.5 flex items-center gap-2">
            <Icon size={13} className="text-(--main-color)" />
            <p className="text-white/80 text-[11.5px] font-bold">
              {isEn
                ? consultation.type === "phone"
                  ? "Phone Consultation"
                  : consultation.type === "video"
                    ? "Video Consultation"
                    : "Chat Consultation"
                : consultation.type === "phone"
                  ? "استشارة هاتفية"
                  : consultation.type === "video"
                    ? "استشارة فيديو"
                    : "استشارة نصية"}
            </p>
          </div>
          <div className="bg-[#0d0d0d] border border-[#222] rounded-[8px] p-2.5 flex items-center gap-2">
            <Clock size={13} className="text-(--main-color)" />
            <p className="text-white/80 text-[11.5px]">
              {consultation.price} {isEn ? "EGP" : "ج.م"}
            </p>
          </div>
        </div>

        {/* Chat Details */}
        {consultation.type === "chat" && consultation.details && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <ClipboardList size={12} className="text-(--main-color)" />
              <p className="text-(--main-color) text-[11px] font-bold">
                {isEn ? "Consultation Details" : "تفاصيل الاستشارة"}
              </p>
            </div>
            <div className="bg-[#0d0d0d] border border-(--main-color)/20 rounded-[10px] p-3">
              <p className="text-white/85 text-[12px] leading-relaxed">
                {isEn
                  ? consultation.detailsEn || consultation.details
                  : consultation.details}
              </p>
            </div>
          </div>
        )}

        {/* Doctor Reply */}
        {consultation.doctorReply && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 size={12} className="text-(--green-color)" />
              <p className="text-(--green-color) text-[11px] font-bold">
                {isEn ? "Doctor's Reply" : "رد الطبيب"}
              </p>
            </div>
            <div className="bg-(--green-color)/5 border border-(--green-color)/25 rounded-[10px] p-3">
              <p className="text-white/85 text-[12px] leading-relaxed">
                {consultation.doctorReply}
              </p>
            </div>
          </div>
        )}

        {/* Doctor Actions */}
        {isDoctor && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
            {consultation.status === "pending" && (
              <button
                type="button"
                onClick={onAccept}
                className="flex-1 h-[36px] rounded-[8px] bg-(--main-color) text-black text-[12px] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={14} />
                {isEn ? "Accept Request" : "قبول الطلب"}
              </button>
            )}
            {consultation.status === "accepted" && (
              <button
                type="button"
                onClick={onReply}
                className="flex-1 h-[36px] rounded-[8px] bg-(--main-color) text-black text-[12px] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} />
                {isEn ? "Send Reply" : "إرسال الرد"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

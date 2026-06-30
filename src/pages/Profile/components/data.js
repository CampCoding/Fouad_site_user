// src/pages/Profile/components/data.js
// ✅ شيل أي حاجة قديمة واستبدلها بالنسخة دي

// ============ PATIENTS ============
export const PATIENTS_DATA = [
  {
    id: 1,
    name: "يوسف أحمد محمد",
    age: "4 سنوات",
    ageEn: "4 years",
    diagnosis: "vsd",
    lastVisit: "12-5-2025",
    nextVisit: "12-8-2025",
    status: "follow_up",
    phone: "01234567890",
  },
  {
    id: 2,
    name: "مريم علي حسن",
    age: "2 سنوات",
    ageEn: "2 years",
    diagnosis: "pulmonary_stenosis",
    lastVisit: "20-5-2025",
    nextVisit: "20-7-2025",
    status: "treatment",
    phone: "01098765432",
  },
  {
    id: 3,
    name: "كريم محمود إبراهيم",
    age: "7 سنوات",
    ageEn: "7 years",
    diagnosis: "pda",
    lastVisit: "1-6-2025",
    nextVisit: null,
    status: "recovered",
    phone: "01112233445",
  },
];

// ============ PATIENT FOLLOWERS ============
export const PATIENT_FOLLOWERS_DATA = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dbz6ebekj/image/upload/v1752063867/echo-followup.jpg",
    title: "متابعة الإيكو",
    titleEn: "Echo Follow-up",
    description: "متابعة دورية لفحص الإيكو وقياس وظائف القلب",
    descriptionEn:
      "Periodic follow-up for echo examination and heart function measurement",
    date: "14-3-2025",
    doctor: "د. أحمد شبانة",
    doctorEn: "Dr. Ahmed Shabana",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dbz6ebekj/image/upload/v1752063867/checkup-followup.jpg",
    title: "متابعة الكشف الدوري",
    titleEn: "Periodic Check-up",
    description: "كشف دوري شامل للاطمئنان على الحالة",
    descriptionEn: "Comprehensive periodic examination",
    date: "22-4-2025",
    doctor: "د. أحمد علي",
    doctorEn: "Dr. Ahmed Ali",
  },
];

// ============ APPOINTMENTS ============
export const PATIENT_APPOINTMENTS = {
  headers: ["patient", "service", "branch", "date", "time"],
  data: [
    ["احمد محمد", "إيكو", "طنطا", "12/5/2025", "11:00"],
    ["احمد محمد", "كشف", "طنطا", "20/5/2025", "1:00"],
    ["احمد محمد", "متابعة", "المنصورة", "1/6/2025", "10:00"],
  ],
};

export const DOCTOR_APPOINTMENTS = {
  headers: ["patient", "service", "branch", "date", "time"],
  data: [
    ["يوسف أحمد", "إيكو", "طنطا", "اليوم", "10:00"],
    ["مريم علي", "كشف", "طنطا", "اليوم", "11:30"],
    ["كريم محمود", "متابعة", "طنطا", "اليوم", "1:00"],
    ["سارة إبراهيم", "إيكو", "طنطا", "غدا", "9:00"],
    ["محمد أحمد", "كشف", "طنطا", "غدا", "10:30"],
  ],
};

// ============ OFFERS ============
export const OFFERS_DATA = [
  {
    id: 1,
    image: "/images/offer-1.jpg",
    title: "خصم 50% على متابعة الإيكو",
    description: "كوبون خصم بمناسبة شهر رمضان الكريم",
    expiry: "15-2-2025",
    discount: "50%",
  },
  {
    id: 2,
    image: "/images/offer-2.jpg",
    title: "خصم 30% على الكشف الأول",
    description: "خصم خاص لأول كشف للمرضى الجدد",
    expiry: "30-3-2025",
    discount: "30%",
  },
];

// ============ MESSAGES ============
export const MESSAGES_DATA = [
  {
    id: 1,
    subject: "استفسار عن موعد الكشف",
    lastMessage: "شكراً لكم، تم استلام الرد",
    date: "12-2-2025",
    time: "10:30 ص",
    unread: 2,
    from: "incoming",
  },
  {
    id: 2,
    subject: "طلب تعديل موعد المتابعة",
    lastMessage: "تم تعديل الموعد بنجاح إلى 15-3-2025",
    date: "8-2-2025",
    time: "2:15 م",
    unread: 0,
    from: "outgoing",
  },
];

// ============ BALANCE ============
export const BALANCE_HISTORY = [
  { type: "add", amount: 50, date: "10-2-2024", expiry: "23-2-2025" },
  { type: "add", amount: 50, date: "10-2-2024", expiry: "23-2-2025" },
  { type: "use", amount: 30, date: "5-1-2024", service: "متابعة إيكو" },
];

// ============ DIAGNOSIS ============
export const DIAGNOSIS_OPTIONS = [
  {
    value: "vsd",
    labelAr: "عيب في الحاجز البطيني (VSD)",
    labelEn: "Ventricular Septal Defect (VSD)",
  },
  {
    value: "asd",
    labelAr: "عيب في الحاجز الأذيني (ASD)",
    labelEn: "Atrial Septal Defect (ASD)",
  },
  {
    value: "pulmonary_stenosis",
    labelAr: "تضيق الصمام الرئوي",
    labelEn: "Pulmonary Valve Stenosis",
  },
  {
    value: "aortic_stenosis",
    labelAr: "تضيق الصمام الأورطي",
    labelEn: "Aortic Valve Stenosis",
  },
  {
    value: "pda",
    labelAr: "قناة شريانية سالكة (PDA)",
    labelEn: "Patent Ductus Arteriosus (PDA)",
  },
  { value: "tof", labelAr: "رباعية فالو", labelEn: "Tetralogy of Fallot" },
  {
    value: "cardiomyopathy",
    labelAr: "تضخم عضلة القلب",
    labelEn: "Cardiomyopathy",
  },
  {
    value: "arrhythmia",
    labelAr: "اضطراب نظم القلب",
    labelEn: "Cardiac Arrhythmia",
  },
  {
    value: "routine_checkup",
    labelAr: "كشف دوري",
    labelEn: "Routine Check-up",
  },
];

// ============ STATUS ============
export const STATUS_OPTIONS = [
  {
    value: "new",
    labelAr: "جديد",
    labelEn: "New",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
  {
    value: "follow_up",
    labelAr: "متابعة",
    labelEn: "Follow-up",
    color: "text-(--main-color) bg-(--main-color)/10 border-(--main-color)/30",
  },
  {
    value: "treatment",
    labelAr: "علاج",
    labelEn: "Treatment",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },
  {
    value: "recovered",
    labelAr: "تعافى",
    labelEn: "Recovered",
    color:
      "text-(--green-color) bg-(--green-color)/10 border-(--green-color)/30",
  },
];
// ============ DOCTOR CLINICS ============
export const DOCTOR_CLINICS = [
  {
    id: 1,
    name: "عيادة د. أحمد شبانة - طنطا",
    nameEn: "Dr. Ahmed Shabana Clinic - Tanta",
    address: "شارع البحر، طنطا، الغربية",
    addressEn: "El-Bahr St., Tanta, Gharbia",
    phone: "01234567890",
    consultationPrice: "300",
    workingDays: ["sat", "mon", "wed"],
    workingHoursFrom: "17:00",
    workingHoursTo: "21:00",
    mapLink: "https://maps.google.com",
  },
  {
    id: 2,
    name: "عيادة د. أحمد شبانة - المحلة",
    nameEn: "Dr. Ahmed Shabana Clinic - Mahalla",
    address: "شارع 23 يوليو، المحلة الكبرى",
    addressEn: "23 July St., El-Mahalla El-Kobra",
    phone: "01234567891",
    consultationPrice: "250",
    workingDays: ["sun", "tue", "thu"],
    workingHoursFrom: "18:00",
    workingHoursTo: "22:00",
    mapLink: "https://maps.google.com",
  },
];

// ============ DOCTOR HOSPITALS ============
export const DOCTOR_HOSPITALS = [
  {
    id: 1,
    name: "مستشفى جامعة طنطا",
    nameEn: "Tanta University Hospital",
    department: "قسم قلب الأطفال",
    departmentEn: "Pediatric Cardiology Dept.",
    position: "استشاري",
    positionEn: "Consultant",
    startDate: "2018-09-01",
    workingDays: ["sun", "mon", "tue", "wed", "thu"],
    workingHoursFrom: "08:00",
    workingHoursTo: "14:00",
  },
  {
    id: 2,
    name: "مستشفى الدلتا التخصصي",
    nameEn: "Delta Specialized Hospital",
    department: "قسم قسطرة القلب",
    departmentEn: "Cardiac Catheterization Dept.",
    position: "أخصائي زائر",
    positionEn: "Visiting Specialist",
    startDate: "2020-03-15",
    workingDays: ["sat", "wed"],
    workingHoursFrom: "10:00",
    workingHoursTo: "13:00",
  },
];

// ============ CONSULTATIONS ============
// نفس الـ data بتُعرض للمريض ودكتور (filter حسب الـ role)
export const CONSULTATIONS_DATA = [
  // مريض رقم 1 طلب استشارة من د. شبانة
  {
    id: 1,
    type: "chat",
    patientId: 101,
    patientName: "أحمد محمد أحمد",
    patientNameEn: "Ahmed Mohamed Ahmed",
    patientAge: "5 سنوات",
    patientAgeEn: "5 years",
    doctorId: 2,
    doctorName: "د. أحمد شبانة",
    doctorNameEn: "Dr. Ahmed Shabana",
    requestedDay: "اليوم",
    requestedDayEn: "Today",
    requestedTime: "5:00 م",
    requestedTimeEn: "5:00 PM",
    requestDate: "20-7-2025",
    details:
      "ابني يعاني من ضيق في التنفس عند بذل أي مجهود بسيط، وأحياناً يشعر بألم في الصدر، عمره 5 سنوات وقمنا بفحص إيكو منذ شهرين كان طبيعياً، نرجو الإفادة.",
    detailsEn:
      "My son experiences shortness of breath during light effort and sometimes chest pain. He is 5 years old and had a normal echo 2 months ago.",
    status: "pending",
    price: "100",
    createdAt: "20-7-2025 10:30",
  },
  {
    id: 2,
    type: "phone",
    patientId: 102,
    patientName: "نور حسن علي",
    patientNameEn: "Nour Hassan Ali",
    patientAge: "3 سنوات",
    patientAgeEn: "3 years",
    doctorId: 2,
    doctorName: "د. أحمد شبانة",
    doctorNameEn: "Dr. Ahmed Shabana",
    requestedDay: "غدًا",
    requestedDayEn: "Tomorrow",
    requestedTime: "7:30 م",
    requestedTimeEn: "7:30 PM",
    requestDate: "20-7-2025",
    details: null,
    status: "pending",
    price: "150",
    createdAt: "20-7-2025 11:00",
  },
  {
    id: 3,
    type: "video",
    patientId: 101,
    patientName: "أحمد محمد أحمد",
    patientNameEn: "Ahmed Mohamed Ahmed",
    patientAge: "5 سنوات",
    patientAgeEn: "5 years",
    doctorId: 2,
    doctorName: "د. أحمد شبانة",
    doctorNameEn: "Dr. Ahmed Shabana",
    requestedDay: "الأحد",
    requestedDayEn: "Sunday",
    requestedTime: "6:00 م",
    requestedTimeEn: "6:00 PM",
    requestDate: "18-7-2025",
    details: null,
    status: "accepted",
    price: "200",
    createdAt: "18-7-2025 09:15",
    acceptedAt: "18-7-2025 12:00",
  },
  {
    id: 4,
    type: "chat",
    patientId: 101,
    patientName: "أحمد محمد أحمد",
    patientNameEn: "Ahmed Mohamed Ahmed",
    patientAge: "5 سنوات",
    patientAgeEn: "5 years",
    doctorId: 2,
    doctorName: "د. أحمد شبانة",
    doctorNameEn: "Dr. Ahmed Shabana",
    requestedDay: "الإثنين",
    requestedDayEn: "Monday",
    requestedTime: "8:00 م",
    requestedTimeEn: "8:00 PM",
    requestDate: "15-7-2025",
    details: "متابعة بعد العملية وقياس النبض اليومي.",
    detailsEn: "Post-operation follow-up and daily heart rate measurement.",
    status: "completed",
    price: "100",
    createdAt: "10-7-2025 14:20",
    completedAt: "15-7-2025 20:30",
    doctorReply:
      "تمت متابعة الحالة، النتائج جيدة. استمر على العلاج لمدة شهر وأعد الإيكو بعدها.",
  },
];

// ============ CONSULTATION STATUS OPTIONS ============
export const CONSULTATION_STATUS = [
  {
    value: "pending",
    labelAr: "في الانتظار",
    labelEn: "Pending",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  },
  {
    value: "accepted",
    labelAr: "مقبولة",
    labelEn: "Accepted",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
  {
    value: "completed",
    labelAr: "تمت",
    labelEn: "Completed",
    color:
      "text-(--green-color) bg-(--green-color)/10 border-(--green-color)/30",
  },
];

// ============ WORKING DAYS HELPER ============
export const WORKING_DAYS_OPTIONS = [
  { value: "sat", labelAr: "السبت", labelEn: "Sat" },
  { value: "sun", labelAr: "الأحد", labelEn: "Sun" },
  { value: "mon", labelAr: "الإثنين", labelEn: "Mon" },
  { value: "tue", labelAr: "الثلاثاء", labelEn: "Tue" },
  { value: "wed", labelAr: "الأربعاء", labelEn: "Wed" },
  { value: "thu", labelAr: "الخميس", labelEn: "Thu" },
  { value: "fri", labelAr: "الجمعة", labelEn: "Fri" },
];

// ============ HELPERS ============
export function getStatusLabel(value, isEn) {
  const found = STATUS_OPTIONS.find((s) => s.value === value);
  if (found) return isEn ? found.labelEn : found.labelAr;
  return value;
}

export function getStatusColor(value) {
  const found = STATUS_OPTIONS.find((s) => s.value === value);
  return found?.color || "text-white/60 bg-white/5 border-white/15";
}

export function getDiagnosisLabel(value, isEn) {
  const found = DIAGNOSIS_OPTIONS.find((d) => d.value === value);
  if (found) return isEn ? found.labelEn : found.labelAr;
  return value;
}

export function getConsultationStatusLabel(value, isEn) {
  const found = CONSULTATION_STATUS.find((s) => s.value === value);
  if (found) return isEn ? found.labelEn : found.labelAr;
  return value;
}

export function getConsultationStatusColor(value) {
  const found = CONSULTATION_STATUS.find((s) => s.value === value);
  return found?.color || "text-white/60 bg-white/5 border-white/15";
}

export function getWorkingDaysLabel(days, isEn) {
  if (!days || days.length === 0) return "";
  return days
    .map((d) => {
      const found = WORKING_DAYS_OPTIONS.find((opt) => opt.value === d);
      return isEn ? found?.labelEn : found?.labelAr;
    })
    .join(" • ");
}

export function formatTimeRange(from, to, isEn = false) {
  if (!from || !to) return "";

  const format = (time24) => {
    const [h, m] = time24.split(":");
    const hour = parseInt(h);
    const period = hour >= 12 ? (isEn ? "PM" : "م") : isEn ? "AM" : "ص";
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${m} ${period}`;
  };

  return `${format(from)} - ${format(to)}`;
}

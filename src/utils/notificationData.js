// ============ TABS ============
export const PATIENT_TABS = [
  {
    id: 1,
    slug: "reports",
    nameKey: "notifications.tabs.reports",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
  },
  {
    id: 2,
    slug: "reservations",
    nameKey: "notifications.tabs.reservations",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
  },
  {
    id: 3,
    slug: "personal",
    nameKey: "notifications.tabs.personal",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
  },
];

export const DOCTOR_TABS = [
  {
    id: 1,
    slug: "consultations",
    nameKey: "notifications.tabs.consultations",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
  },
  {
    id: 2,
    slug: "patients",
    nameKey: "notifications.tabs.patients",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
  },
  {
    id: 3,
    slug: "schedule",
    nameKey: "notifications.tabs.schedule",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
  },
];

// ============ NOTIFICATIONS ============
export const PATIENT_NOTIFICATIONS = [
  {
    id: 1,
    slug: "reports",
    nameKey: "notifications.tabs.reports",
    titleKey: "notifications.items.reportEcg",
    descKey: "notifications.descriptions.reportEcg",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
    pdfUrl: "https://s21.q4cdn.com/676487211/files/doc_downloads/test.pdf",
    date: "15/2/2025",
  },
  {
    id: 2,
    slug: "reservations",
    nameKey: "notifications.tabs.reservations",
    titleKey: "notifications.items.reservationEcho",
    descKey: "notifications.descriptions.reservationEcho",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
    route: "/reservations?s=confirmation&svc=1",
    date: "14/2/2025",
  },
  {
    id: 3,
    slug: "personal",
    nameKey: "notifications.tabs.personal",
    titleKey: "notifications.items.personalUpdate",
    descKey: "notifications.descriptions.personalUpdate",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
    route: "/profile?v=data",
    date: "13/2/2025",
  },
  {
    id: 4,
    slug: "reports",
    nameKey: "notifications.tabs.reports",
    titleKey: "notifications.items.reportHolter",
    descKey: "notifications.descriptions.reportHolter",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
    pdfUrl: "https://s21.q4cdn.com/676487211/files/doc_downloads/test.pdf",
    date: "12/2/2025",
  },
];

export const DOCTOR_NOTIFICATIONS = [
  {
    id: 1,
    slug: "consultations",
    nameKey: "notifications.tabs.consultations",
    titleKey: "notifications.items.consultationNew",
    descKey: "notifications.descriptions.consultationNew",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
    route: "/profile?v=consultations",
    date: "15/2/2025",
  },
  {
    id: 2,
    slug: "patients",
    nameKey: "notifications.tabs.patients",
    titleKey: "notifications.items.patientFollowup",
    descKey: "notifications.descriptions.patientFollowup",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
    route: "/profile?v=patients",
    date: "15/2/2025",
  },
  {
    id: 3,
    slug: "schedule",
    nameKey: "notifications.tabs.schedule",
    titleKey: "notifications.items.scheduleNew",
    descKey: "notifications.descriptions.scheduleNew",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
    route: "/profile?v=appointments",
    date: "14/2/2025",
  },
  {
    id: 4,
    slug: "patients",
    nameKey: "notifications.tabs.patients",
    titleKey: "notifications.items.patientAdded",
    descKey: "notifications.descriptions.patientAdded",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
    route: "/profile?v=patients",
    date: "13/2/2025",
  },
  {
    id: 5,
    slug: "schedule",
    nameKey: "notifications.tabs.schedule",
    titleKey: "notifications.items.scheduleChanged",
    descKey: "notifications.descriptions.scheduleChanged",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
    route: "/profile?v=appointments",
    date: "11/2/2025",
  },
];

// ============ Helper ============
export const getNotificationsByRole = (role) => {
  if (role === "doctor") {
    return {
      tabs: DOCTOR_TABS,
      notifications: DOCTOR_NOTIFICATIONS,
    };
  }
  return {
    tabs: PATIENT_TABS,
    notifications: PATIENT_NOTIFICATIONS,
  };
};

// ============ Backward compatibility ============
export const PROFILE_DATA = PATIENT_TABS;
export const NOTIFICATION_DATA = PATIENT_NOTIFICATIONS;

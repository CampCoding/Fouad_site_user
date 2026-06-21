export const PROFILE_DATA = [
  {
    id: 1,
    name: "التقارير",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
  },
  {
    id: 2,
    name: "الحجز",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
  },
  {
    id: 3,
    name: "شخصي",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
  },
];

export const NOTIFICATION_DATA = [
  {
    id: 1,
    name: "التقارير",
    title: "تم صدور تقرير رسم القلب",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
    pdfUrl: "https://s21.q4cdn.com/676487211/files/doc_downloads/test.pdf",
  },
  {
    id: 2,
    name: "الحجز",
    title: "تم تأكيد موعد فحص الإيكو",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
    // ✨ اتعدل من ?svc=1&step=4 لـ ?s=confirmation&svc=1
    route: "/reservations?s=confirmation&svc=1",
  },
  {
    id: 3,
    name: "شخصي",
    title: "تم تحديث بياناتك الشخصية",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1742287510/3_iyc4rx.png",
    route: "/profile",
  },
  {
    id: 4,
    name: "التقارير",
    title: "تقرير الهولتر جاهز للمراجعة",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
    pdfUrl: "https://s21.q4cdn.com/676487211/files/doc_downloads/test.pdf",
  },
];

export const SETTINGS_DATA = [
  {
    id: 2,
    titleAr: "اللغة",
    titleEn: "Language",
    data: [
      {
        id: 1,
        titleAr: "اللغة",
        titleEn: "Language",
        isDropDown: true,
        isLanguageSwitcher: true,
        data: [
          {
            id: 1,
            label: "العربية",
            title: "العربية",
            value: "ar",
          },
          {
            id: 2,
            title: "English",
            label: "English",
            value: "en",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    titleAr: "بطاقات الدفع الالكتروني",
    titleEn: "Payment Cards",
    data: [
      {
        id: 1,
        titleAr: "نوع الكارت",
        titleEn: "Card Type",
        isDropDown: true,
        data: [
          {
            id: 1,
            label: "ماستر كارد",
            title: "ماستر كارد",
            value: "master_card",
          },
        ],
      },
      {
        id: 2,
        titleAr: "رقم الكارت",
        titleEn: "Card Number",
        isDropDown: false,
      },
      {
        id: 3,
        titleAr: "تاريخ الإنتهاء",
        titleEn: "Expiry Date",
        isDropDown: false,
      },
      {
        id: 4,
        titleAr: "الإسم علي الكارت",
        titleEn: "Name on Card",
        isDropDown: false,
      },
      {
        id: 5,
        titleAr: "رمز التحقق",
        titleEn: "CVV",
        isDropDown: false,
      },
    ],
  },
];

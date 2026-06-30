import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

// جلب اللغة المحفوظة أو الافتراضية
const savedLang = localStorage.getItem("fouady-lang") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

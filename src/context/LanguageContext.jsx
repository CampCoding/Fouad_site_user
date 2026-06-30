import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "ar");
  const [dir, setDir] = useState(i18n.language === "en" ? "ltr" : "rtl");

  const toggleLanguage = useCallback(() => {
    const newLang = lang === "ar" ? "en" : "ar";
    const newDir = newLang === "ar" ? "rtl" : "ltr";

    setLang(newLang);
    setDir(newDir);
    i18n.changeLanguage(newLang);
    localStorage.setItem("fouady-lang", newLang);

    document.documentElement.lang = newLang;
    document.documentElement.dir = newDir;
  }, [lang, i18n]);

  const changeLanguage = useCallback(
    (newLang) => {
      const newDir = newLang === "ar" ? "rtl" : "ltr";

      setLang(newLang);
      setDir(newDir);
      i18n.changeLanguage(newLang);
      localStorage.setItem("fouady-lang", newLang);

      document.documentElement.lang = newLang;
      document.documentElement.dir = newDir;
    },
    [i18n],
  );

  // ضبط الـ HTML attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const isArabic = lang === "ar";
  const isEnglish = lang === "en";

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        isArabic,
        isEnglish,
        toggleLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { LOCALES, LOCALE_STORAGE } from "../constants/enum";

import translationEn from "../locales/en.json";
import translationVi from "../locales/vi.json";

const localeStorage = localStorage.getItem(LOCALE_STORAGE);

const resources = {
  en: { translation: translationEn },
  vi: { translation: translationVi },
};
console.log(localeStorage);

i18n
  .use(Backend)  // This should be configured or might not be needed if using local JSON files
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localeStorage || LOCALES.VI,  // Ensures a valid fallback
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',  // Example path, adjust as necessary
    },
  });

export default i18n;
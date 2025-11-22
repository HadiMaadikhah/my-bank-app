import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ar from "./ar.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: "en",       // زبان پیش‌فرض
    fallbackLng: "en",
    interpolation: {
      escapeValue: true   // امنیت بالاتر جلوگیری از XSS
    }
  });

export default i18n;

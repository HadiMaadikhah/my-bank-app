import { Fingerprint, Phone, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const isFarsi = i18n.language === "fa";
  const isRTL = isArabic || isFarsi;

  const [openLang, setOpenLang] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";

    setOpenLang(false);
  };

  /* Ensure direction is applied immediately on load */
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f2f4ff] to-white relative ${
        isRTL ? "rtl font-farsi" : "ltr font-english"
      }`}
    >
      {/* LANGUAGE DROPDOWN */}
      <div className={`absolute top-5 ${isRTL ? "left-5" : "right-5"}`}>
        <button
          onClick={() => setOpenLang(!openLang)}
          className="px-3 py-1 bg-[#2e3092] text-white rounded-lg text-sm flex items-center gap-1 hover:bg-[#23246e] transition"
        >
          <Globe className="w-4 h-4" />
          {i18n.language === "ar"
            ? "العربية"
            : i18n.language === "fa"
            ? "فارسی"
            : "English"}
        </button>

        {openLang && (
          <div
            className={`mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-32 absolute z-50 ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <button
              onClick={() => changeLanguage("en")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              🇬🇧 English
            </button>

            <button
              onClick={() => changeLanguage("ar")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              🇸🇦 العربية
            </button>

            <button
              onClick={() => changeLanguage("fa")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              🇮🇷 فارسی
            </button>
          </div>
        )}
      </div>

      {/* LOGIN BOX */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 border border-[#2e3092]/20">
        {/* UAE PASS */}
        <button
          type="button"
          className={`w-full border border-[#2e3092] rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#2e3092]/10 transition ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <Fingerprint className="w-5 h-5 text-[#2e3092]" />
          <span className="font-semibold text-[#2e3092]">{t("uae_pass")}</span>
        </button>

        <p className="text-center text-gray-600 text-sm mt-3">{t("login_desc")}</p>

        {/* OR */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm font-medium">{t("or")}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* FORM */}
        <form className="space-y-4" autoComplete="off">
          <div className="relative">
            <Phone
              className={`absolute top-3 ${
                isRTL ? "right-3" : "left-3"
              } text-[#2e3092] w-5 h-5`}
            />

            <input
              type="tel"
              placeholder={t("enter_mobile")}
              dir="ltr"
              className={`w-full py-2 border border-[#2e3092] rounded-lg focus:ring-2 
                focus:ring-[#2e3092] outline-none text-center`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/otp")}
            className="w-full bg-[#2e3092] text-white hover:bg-[#23246e] mt-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {t("send_otp")}
          </button>
        </form>
      </div>
    </div>
  );
}

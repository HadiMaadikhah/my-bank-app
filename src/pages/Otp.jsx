import { useState, useEffect } from "react";
import { KeyRound, RefreshCw, Loader2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OtpInput from "@/components/OtpInput";

export default function Otp() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const [resendActive, setResendActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const isArabic = i18n.language === "ar";

  // Language switching
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    setOpenLang(false);
  };

  // RTL handling
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic]);

  // OTP timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendActive(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(45);
    setResendActive(false);
  };

  const handleVerify = (code) => {
    const finalCode = code || otp;

    if (finalCode.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f2f4ff] to-white relative">

      {/* LANGUAGE DROPDOWN */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setOpenLang(!openLang)}
          className="px-3 py-1 bg-[#2e3092] text-white rounded-lg text-sm flex items-center gap-1 hover:bg-[#23246e] transition"
        >
          <Globe className="w-4 h-4" />
          {isArabic ? "العربية" : "English"}
        </button>

        {openLang && (
          <div className="mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-32 absolute right-0 z-50">
            <button
              onClick={() => changeLanguage("en")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              🇦🇪 English
            </button>
            <button
              onClick={() => changeLanguage("ar")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              🇸🇦 العربية
            </button>
          </div>
        )}
      </div>

      {/* MAIN BOX */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 border border-[#2e3092]/20">

        <h2 className="text-center text-lg font-semibold text-[#2e3092] mb-4">
          {t("otp_title")}
        </h2>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all">
            <Loader2 className="w-10 h-10 text-[#2e3092] animate-spin mb-3" />
            <p className="text-[#2e3092] font-medium text-sm tracking-wide">
              {t("otp_verifying")}
            </p>
          </div>
        )}

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* OTP INPUT */}
          <OtpInput
            length={6}
            onChange={setOtp}
            onComplete={(code) => handleVerify(code)}
          />

          {/* Resend */}
          <div className="text-center mt-2 text-sm text-gray-600">
            {resendActive ? (
              <button
                type="button"
                onClick={handleResend}
                className="flex items-center justify-center space-x-1 text-[#2e3092] font-medium hover:underline mx-auto mt-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t("otp_resend")}</span>
              </button>
            ) : (
              <p>
                {t("otp_resend_wait")}{" "}
                <span className="text-[#2e3092] font-semibold">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </p>
            )}
          </div>

          {/* Verify Button */}
          {!loading && (
            <button
              type="button"
              onClick={() => handleVerify()}
              className="w-full bg-[#2e3092] hover:bg-[#23246e] text-white mt-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{t("otp_verify")}</span>
            </button>
          )}

          {/* Change mobile */}
          <p
            onClick={() => navigate("/")}
            className="text-center text-sm text-[#2e3092] hover:underline cursor-pointer mt-3"
          >
            {t("otp_change_mobile")}
          </p>
        </form>
      </div>
    </div>
  );
}

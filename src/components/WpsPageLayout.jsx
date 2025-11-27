import { useTranslation } from "react-i18next";

export default function WpsPageLayout({
  title,
  subtitle,
  children,
  noCard = false, // ← اضافه شد
}) {
  const { i18n, t } = useTranslation();

  // Arabic + Persian = RTL
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  return (
    <div className={`${isRTL ? "text-right" : "text-left"} w-full`}>

      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#2E3092]">{t(title)}</h1>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{t(subtitle)}</p>
        )}
      </div>

      {/* Content Wrapper */}
      {noCard ? (
        // بدون کادر
        <div>{children}</div>
      ) : (
        // با کادر (مثل register)
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-[#d9dcff] p-6 sm:p-8 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}

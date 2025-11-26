import { useTranslation } from "react-i18next";

export default function WpsPageLayout({ title, subtitle, children }) {
  const { i18n, t } = useTranslation();

  // Arabic + Persian = RTL
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#2E3092]">
          {t(title)}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {t(subtitle)}
          </p>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}

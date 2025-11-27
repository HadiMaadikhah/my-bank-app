// src/pages/wps/Register.jsx
import { useState } from "react";
import {
  Building2,
  Save,
  RotateCcw,
  Upload,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Layout Wrapper (New)
import WpsPageLayout from "@/components/WpsPageLayout";

export default function Register() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  const [activeTab, setActiveTab] = useState("register");
  const [registerType, setRegisterType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isRegistered, setIsRegistered] = useState(null);
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    tradeLicense: "",
    licensePlace: "",
    info1: "",
    info2: "",
    info3: "",
    bankSelection: "",
  });

  const companies = [
    { name: "Emirates Tech Solutions", registered: true },
    { name: "Future Vision Trading", registered: false },
    { name: "Alpha Systems FZ LLC", registered: true },
  ];

  const banks = ["BSI", "Emirates NBD", "Abu Dhabi Bank"];

  const handleSelectCompany = (e) => {
    const name = e.target.value;
    setSelectedCompany(name);
    const company = companies.find((c) => c.name === name);
    setIsRegistered(company ? company.registered : null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerType) return toast.error(t("register_error_type"));
    if (registerType === "company" && !selectedCompany)
      return toast.error(t("register_error_company"));
    toast.success(t("register_success_submitted"));
  };

  const handleReset = () => {
    setRegisterType("");
    setSelectedCompany("");
    setIsRegistered(null);
    setFormData({
      tradeLicense: "",
      licensePlace: "",
      info1: "",
      info2: "",
      info3: "",
      bankSelection: "",
    });
    toast.info(t("register_success_reset"));
  };

  return (
    <WpsPageLayout
      title="register_title"
      subtitle="register_subtitle_text"
    >
      {/* Tabs */}
      <div className="flex bg-[#f7f8ff] border border-[#e1e4ff] rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all 
            ${
              activeTab === "register"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#eef0ff]"
                : "text-gray-600 hover:bg-[#f3f4ff]"
            }`}
        >
          {t("register_tab_register")}
        </button>

        <button
          onClick={() => setActiveTab("deregister")}
          className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all 
            ${
              activeTab === "deregister"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#eef0ff]"
                : "text-gray-600 hover:bg-[#f3f4ff]"
            }`}
        >
          {t("register_tab_deregister")}
        </button>
      </div>

      {/* ================= REGISTER SECTION ================= */}
      {activeTab === "register" && (
        <div className="space-y-8">

          {/* Registration Type */}
          <div className="bg-white border border-[#e1e4ff] p-5 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[#1c1f4a] mb-3">
              {t("register_choose_type")}
            </h3>

            <div className={`flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="registerType"
                  value="sponsor"
                  checked={registerType === "sponsor"}
                  onChange={(e) => {
                    setRegisterType(e.target.value);
                    setSelectedCompany("");
                    setIsRegistered(null);
                  }}
                  className="w-4 h-4 text-[#2E3092]"
                />
                {t("register_type_sponsor")}
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="registerType"
                  value="company"
                  checked={registerType === "company"}
                  onChange={(e) => setRegisterType(e.target.value)}
                  className="w-4 h-4 text-[#2E3092]"
                />
                {t("register_type_company")}
              </label>
            </div>
          </div>

          {/* Company Select */}
          <div className="bg-white border border-[#e1e4ff] p-5 rounded-xl shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("register_companies_list")}
            </label>

            <select
              value={selectedCompany}
              onChange={handleSelectCompany}
              disabled={registerType !== "company"}
              className={`w-full border rounded-md px-3 py-2 text-sm 
                focus:ring-2 focus:ring-[#2E3092]/40
                ${
                  registerType === "company"
                    ? "bg-white border-[#cfd3ff]"
                    : "bg-gray-100 cursor-not-allowed border-gray-200"
                }`}
            >
              <option value="">{t("register_select_company")}</option>
              {companies.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          {registerType === "company" && selectedCompany && (
            <div
              className={`p-4 rounded-xl text-white font-medium shadow-sm flex items-center justify-between
                ${isRegistered ? "bg-green-500" : "bg-red-500"}`}
            >
              <span>
                {isRegistered
                  ? t("register_company_registered")
                  : t("register_company_not_registered")}
              </span>
              <AlertCircle size={20} />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Group 1 */}
            <div className="bg-white rounded-xl border border-[#e1e4ff] p-5 shadow-sm grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t("register_trade_license")}
                </label>
                <input
                  type="text"
                  name="tradeLicense"
                  value={formData.tradeLicense}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t("register_license_place")}
                </label>
                <input
                  type="text"
                  name="licensePlace"
                  value={formData.licensePlace}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/40"
                />
              </div>
            </div>

            {/* Group 2 */}
            <div className="bg-white rounded-xl border border-[#e1e4ff] p-5 shadow-sm grid sm:grid-cols-3 gap-4">
              {["info1", "info2", "info3"].map((info) => (
                <div key={info}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {t(`register_${info}`)}
                  </label>
                  <input
                    type="text"
                    name={info}
                    value={formData[info]}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/40"
                  />
                </div>
              ))}
            </div>

            {/* Bank */}
            <div className="bg-white rounded-xl border border-[#e1e4ff] p-5 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("register_bank_selection")}
              </label>

              <select
                name="bankSelection"
                value={formData.bankSelection}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/40"
              >
                <option value="">{t("register_select_bank")}</option>
                {banks.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload */}
            <div className="bg-white rounded-xl border border-[#e1e4ff] p-5 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("register_upload_document")}
              </label>

              <label className="flex items-center gap-2 px-4 py-2 bg-[#2E3092] text-white rounded-md cursor-pointer hover:bg-[#23246e] text-sm w-fit">
                <Upload size={16} />
                {t("register_upload_choose")}
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2 rounded-md text-sm shadow-sm"
              >
                <Save size={16} />
                {t("register_submit")}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm shadow-sm"
              >
                <RotateCcw size={16} />
                {t("register_reset")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= DEREGISTER ================= */}
      {activeTab === "deregister" && (
        <div className="p-6 flex flex-col items-center text-center space-y-6">

          <h3 className="text-lg sm:text-xl font-semibold text-[#2E3092]">
            {t("deregister_title")}
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!agree) return toast.error(t("deregister_error_confirm"));
              toast.success(t("deregister_success"));
            }}
            className="w-full max-w-lg bg-white border border-[#e1e4ff] rounded-xl p-6 shadow-sm space-y-5 text-sm"
          >
            <label className="flex items-start gap-3 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#2E3092]"
              />
              <span className="text-left">
                {t("deregister_confirm_text")}
                <br />
                <strong>{t("deregister_confirm_strong")}</strong>
              </span>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2.5 rounded-md shadow-sm"
            >
              <CheckSquare size={16} />
              {t("deregister_submit")}
            </button>
          </form>
        </div>
      )}
    </WpsPageLayout>
  );
}

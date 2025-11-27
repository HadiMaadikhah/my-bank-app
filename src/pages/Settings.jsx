// src/pages/Settings.jsx

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Lock,
  Globe,
  Bell,
  Upload,
  Save,
  Smartphone,
  ShieldCheck,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  // ───────────────────────────────────────────────
  // TAB STATE
  // ───────────────────────────────────────────────
  const tabs = [
    "personal",
    "address",
    "documents",
    "security",
    "alerts",
    "preferences",
  ];

  const [activeTab, setActiveTab] = useState("personal");

  // ───────────────────────────────────────────────
  // FORM STATES
  // ───────────────────────────────────────────────
  const [personal, setPersonal] = useState({
    name: "Hadi Maadikhah",
    email: "hadi.maq@gmail.com",
    phone: "+971 50 123 4567",
  });

  const [address, setAddress] = useState({
    country: "United Arab Emirates",
    city: "Dubai",
    addressLine: "Business Bay – XYZ Tower",
    poBox: "123456",
  });

  const [documents, setDocuments] = useState({
    emiratesId: null,
    passport: null,
    license: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [alerts, setAlerts] = useState({
    emailSalary: true,
    smsSalary: false,
    loginAlert: true,
    deviceAlert: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    dateFormat: "dd/mm/yyyy",
    currency: "AED",
  });

  // Upload Handler
  const uploadFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocuments((p) => ({ ...p, [key]: file.name }));
    toast.success(t("settings_doc_uploaded"));
  };

  // Save actions
  const save = () => toast.success(t("settings_saved"));
  const savePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error(t("settings_password_nomatch"));
      return;
    }
    toast.success(t("settings_password_success"));
  };

  // Switch
  const toggle = (key) =>
    setAlerts((p) => ({ ...p, [key]: !p[key] }));

  // ───────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────
  return (
    <div className={`min-h-screen p-6 ${isRTL ? "text-right" : "text-left"}`}>
      <h1 className="text-2xl font-bold text-[#2E3092] mb-6">
        {t("settings_title")}
      </h1>

      {/* Tabs Wrapper */}
<div className="relative">
  {/* Left Fade (برای حالت LTR) */}
  {!isRTL && (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
  )}

  {/* Right Fade */}
  {!isRTL && (
    <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
  )}

  {/* RTL Left/Right Swap */}
  {isRTL && (
    <>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
    </>
  )}

  {/* Scrollable Tabs */}
  <div
    className={`
      flex gap-2 overflow-x-auto no-scrollbar pb-2 border-b
      ${isRTL ? "flex-row-reverse" : ""}
    `}
  >
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`
          whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-medium transition
          ${
            activeTab === tab
              ? "bg-[#2E3092] text-white shadow"
              : "bg-white border border-[#2E3092]/30 text-[#2E3092] hover:bg-[#2E3092]/10"
          }
        `}
      >
        {t(`settings_tab_${tab}`)}
      </button>
    ))}
  </div>
</div>



      {/* ───────────────────────────────────────────
          TAB CONTENT
      ─────────────────────────────────────────── */}

      {/* PERSONAL INFO */}
      {activeTab === "personal" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <User size={20} /> {t("settings_profile")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label={t("settings_name")} value={personal.name} onChange={(v) => setPersonal({ ...personal, name: v })} />
            <Input label={t("settings_email")} value={personal.email} onChange={(v) => setPersonal({ ...personal, email: v })} />
            <Input label={t("settings_phone")} value={personal.phone} onChange={(v) => setPersonal({ ...personal, phone: v })} />
          </div>

          <SaveBtn onClick={save} />
        </div>
      )}

      {/* ADDRESS */}
      {activeTab === "address" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <MapPin size={20} /> {t("settings_address")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label={t("settings_country")} value={address.country} onChange={(v) => setAddress({ ...address, country: v })} />
            <Input label={t("settings_city")} value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
            <Input label={t("settings_addressline")} value={address.addressLine} onChange={(v) => setAddress({ ...address, addressLine: v })} className="sm:col-span-2" />
            <Input label={t("settings_pobox")} value={address.poBox} onChange={(v) => setAddress({ ...address, poBox: v })} />
          </div>

          <SaveBtn onClick={save} />
        </div>
      )}

      {/* DOCUMENTS */}
      {activeTab === "documents" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <FileText size={20} /> {t("settings_documents")}
          </h2>

          {["emiratesId", "passport", "license"].map((doc) => (
            <DocRow
              key={doc}
              label={t(`settings_${doc}`)}
              file={documents[doc]}
              onUpload={(e) => uploadFile(e, doc)}
            />
          ))}

          <SaveBtn onClick={save} />
        </div>
      )}

      {/* SECURITY */}
      {activeTab === "security" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <Lock size={20} /> {t("settings_password")}
          </h2>

          <PasswordInput label={t("settings_oldpass")} value={passwordForm.old} onChange={(v) => setPasswordForm({ ...passwordForm, old: v })} />
          <PasswordInput label={t("settings_newpass")} value={passwordForm.new} onChange={(v) => setPasswordForm({ ...passwordForm, new: v })} />
          <PasswordInput label={t("settings_confirmpass")} value={passwordForm.confirm} onChange={(v) => setPasswordForm({ ...passwordForm, confirm: v })} />

          <button
            onClick={savePassword}
            className="mt-3 bg-[#2E3092] text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <Save size={16} /> {t("settings_password_change")}
          </button>

          {/* Logout from all devices */}
          <button className="text-red-600 flex items-center gap-2 mt-6 hover:underline">
            <LogOut size={16} /> {t("settings_logout_all")}
          </button>
        </div>
      )}

      {/* ALERTS */}
      {activeTab === "alerts" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <Bell size={20} /> {t("settings_alerts")}
          </h2>

          {[
            ["emailSalary", t("settings_alert_email_salary")],
            ["smsSalary", t("settings_alert_sms_salary")],
            ["loginAlert", t("settings_alert_login")],
            ["deviceAlert", t("settings_alert_devices")],
          ].map(([key, label]) => (
            <SwitchRow key={key} checked={alerts[key]} onToggle={() => toggle(key)} label={label} />
          ))}

          <SaveBtn onClick={save} />
        </div>
      )}

      {/* PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-[#2E3092]">
            <Globe size={20} /> {t("settings_preferences")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label={t("settings_language")}
              value={i18n.language}
              onChange={(v) => i18n.changeLanguage(v)}
              options={[
                { value: "en", label: "English" },
                { value: "ar", label: "العربية" },
                { value: "fa", label: "فارسی" },
              ]}
            />

            <Select
              label={t("settings_dateformat")}
              value={preferences.dateFormat}
              onChange={(v) => setPreferences({ ...preferences, dateFormat: v })}
              options={[
                { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
                { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
              ]}
            />
          </div>

          <SaveBtn onClick={save} />
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────
   COMPONENTS
─────────────────────────────────────────────── */

function Input({ label, value, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input
        className="w-full border rounded-md px-3 py-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="password"
        className="w-full border rounded-md px-3 py-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function DocRow({ label, file, onUpload }) {
  return (
    <div className="flex items-center justify-between border p-3 rounded-lg">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{file || "—"}</p>
      </div>
      <label className="cursor-pointer bg-[#2E3092] text-white px-4 py-2 rounded-md hover:bg-[#23246e] flex items-center gap-2">
        <Upload size={16} />
        Upload
        <input type="file" className="hidden" onChange={onUpload} />
      </label>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full border rounded-md px-3 py-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SwitchRow({ label, checked, onToggle }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
            checked ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SaveBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-[#2E3092] text-white px-6 py-2 rounded-md hover:bg-[#23246e]"
    >
      <Save size={16} /> Save
    </button>
  );
}

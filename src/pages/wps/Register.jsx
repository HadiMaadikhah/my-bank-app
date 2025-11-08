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

export default function Register() {
  const [activeTab, setActiveTab] = useState("register");
  const [registerType, setRegisterType] = useState(""); // "company" or "sponsor"
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
    if (!registerType)
      return toast.error("Please select a registration type first.");
    if (registerType === "company" && !selectedCompany)
      return toast.error("Please select a company.");
    toast.success("Form submitted successfully!");
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
    toast.info("Form cleared.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#f7f8ff] to-[#e8eaff]">
          <Building2 className="text-[#2E3092]" size={24} />
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2E3092]">
            WPS Register / Deregister
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all ${
              activeTab === "register"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#f5f6ff]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setActiveTab("deregister")}
            className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all ${
              activeTab === "deregister"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#f5f6ff]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Deregister
          </button>
        </div>

        {/* Register Tab */}
        {activeTab === "register" && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Registration Type */}
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-medium cursor-pointer">
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
                  className="w-4 h-4 text-[#2E3092] border-gray-300 focus:ring-[#2E3092]"
                />
                Domestic Sponsor
              </label>

              <label className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="registerType"
                  value="company"
                  checked={registerType === "company"}
                  onChange={(e) => setRegisterType(e.target.value)}
                  className="w-4 h-4 text-[#2E3092] border-gray-300 focus:ring-[#2E3092]"
                />
                Company
              </label>
            </div>

            {/* Company Select (Active only if company selected) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List of Companies
              </label>
              <select
                value={selectedCompany}
                onChange={handleSelectCompany}
                disabled={registerType !== "company"}
                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  registerType === "company"
                    ? "bg-white focus:ring-[#2E3092]/50 border-gray-300"
                    : "bg-gray-100 cursor-not-allowed border-gray-200"
                }`}
              >
                <option value="">Select company...</option>
                {companies.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Indicator */}
            {registerType === "company" && selectedCompany && (
              <div
                className={`p-4 rounded-lg flex items-center justify-between text-white font-medium ${
                  isRegistered ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span>
                  {isRegistered ? "Already REGISTERED!" : "NOT REGISTERED!"}
                </span>
                <AlertCircle size={20} />
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trade License + License Place */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trade License
                  </label>
                  <input
                    type="text"
                    name="tradeLicense"
                    value={formData.tradeLicense}
                    onChange={handleChange}
                    placeholder="Enter trade license number"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E3092]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Place
                  </label>
                  <input
                    type="text"
                    name="licensePlace"
                    value={formData.licensePlace}
                    onChange={handleChange}
                    placeholder="Enter license place"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E3092]/50"
                  />
                </div>
              </div>

              {/* Info Fields */}
              <div className="grid sm:grid-cols-3 gap-4">
                {["info1", "info2", "info3"].map((info) => (
                  <div key={info}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {info.replace("info", "Info ")}
                    </label>
                    <input
                      type="text"
                      name={info}
                      value={formData[info]}
                      onChange={handleChange}
                      placeholder={`Enter ${info.replace("info", "Info ")}`}
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E3092]/50"
                    />
                  </div>
                ))}
              </div>

              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Selection
                </label>
                <select
                  name="bankSelection"
                  value={formData.bankSelection}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E3092]/50 bg-white"
                >
                  <option value="">Select Bank...</option>
                  {banks.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Document
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white text-sm font-medium rounded-md cursor-pointer transition">
                    <Upload size={16} />
                    Choose File
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-sm text-gray-500">No file chosen</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white text-sm font-medium px-5 py-2 rounded-md transition"
                >
                  <Save size={16} />
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-md transition"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Deregister Tab */}
        {activeTab === "deregister" && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2E3092]">
              Request to Deregister from BSI For WPS Payment
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!agree) {
                  toast.error("Please confirm before submitting.");
                  return;
                }
                toast.success("Deregistration request submitted.");
              }}
              className="w-full max-w-md space-y-5"
            >
              <div className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#2E3092] border-gray-300 rounded focus:ring-[#2E3092]"
                />
                <label htmlFor="confirm" className="text-left leading-snug">
                  I hereby confirm that I have requested to deregister from
                  <br />
                  <strong>WPS payment by BSI.</strong>
                </label>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
              >
                <CheckSquare size={16} />
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

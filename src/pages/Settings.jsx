import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Lock,
  Save,
  X,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  // Main settings
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  // Password form
  const [passwordData, setPasswordData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  // Password visibility
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength
  const getStrength = () => {
    const pass = passwordData.newPass;
    if (!pass) return "";
    if (pass.length < 6) return "Weak";
    if (pass.length < 10) return "Medium";
    return "Strong";
  };

  const strengthColor = {
    "": "",
    Weak: "text-red-500",
    Medium: "text-yellow-500",
    Strong: "text-green-600",
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Confirmation modals
  const [confirmModal, setConfirmModal] = useState(false);
  const [passwordConfirmModal, setPasswordConfirmModal] = useState(false);

  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const requestConfirm = (action) => {
    setOnConfirmAction(() => action);
    setConfirmModal(true);
  };

  const requestPasswordConfirm = (action) => {
    setOnConfirmAction(() => action);
    setPasswordConfirmModal(true);
  };

  // Save main settings
  const saveMainSettings = () => {
    requestConfirm(() => {
      toast.success("Settings updated successfully!");
    });
  };

  // Save password
  const savePassword = () => {
    if (!passwordData.oldPass || !passwordData.newPass || !passwordData.confirmPass) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (passwordData.newPass !== passwordData.confirmPass) {
      toast.error("New passwords do not match!");
      return;
    }

    requestPasswordConfirm(() => {
      toast.success("Password updated successfully!");
      setPasswordData({ oldPass: "", newPass: "", confirmPass: "" });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b bg-gradient-to-r from-[#f7f8ff] to-[#e8eaff]">
          <SettingsIcon className="text-[#2E3092]" size={24} />
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2E3092]">Settings</h2>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* ---------------- NOTIFICATIONS ---------------- */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Bell className="text-[#2E3092]" size={20} />
              <div>
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-xs text-gray-500">Receive account alerts</p>
              </div>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#2E3092] rounded-full transition"></div>
            </label>
          </div>

          {/* ---------------- 2FA ---------------- */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="text-[#2E3092]" size={20} />
              <div>
                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add extra security</p>
              </div>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFA}
                onChange={(e) => setTwoFA(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#2E3092] rounded-full transition"></div>
            </label>
          </div>

          {/* ---------------- PASSWORD SECTION ---------------- */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-[#2E3092]" size={20} />
              <h3 className="text-lg font-semibold text-[#1c1f4a]">
                Change Password
              </h3>
            </div>

            <div className="space-y-4">

              {/* Old Password */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPass"
                  value={passwordData.oldPass}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm pr-10 focus:ring-2 focus:ring-[#2E3092]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-[38px] text-gray-500"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input
                  type={showNew ? "text" : "password"}
                  name="newPass"
                  value={passwordData.newPass}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm pr-10 focus:ring-2 focus:ring-[#2E3092]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-[38px] text-gray-500"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {/* Strength */}
                <p className={`mt-1 text-xs font-medium ${strengthColor[getStrength()]}`}>
                  {getStrength()}
                </p>
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPass"
                  value={passwordData.confirmPass}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm pr-10 focus:ring-2 focus:ring-[#2E3092]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-[38px] text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Save password button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={savePassword}
                  className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2 rounded-md text-sm transition"
                >
                  <Save size={16} />
                  Update Password
                </button>
              </div>

            </div>
          </div>

          {/* ---------------- SAVE MAIN SETTINGS ---------------- */}
          <div className="flex justify-end pt-6">
            <button
              onClick={saveMainSettings}
              className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>

        </div>
      </div>

      {/* ===================== MAIN CONFIRM MODAL ===================== */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl border border-gray-200 p-6">

            <h3 className="text-lg font-semibold text-[#2E3092] mb-4">
              Are you sure?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Do you want to save these settings?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 bg-gray-100 border rounded-md text-sm hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setConfirmModal(false);
                  if (onConfirmAction) onConfirmAction();
                }}
                className="px-5 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white rounded-md text-sm"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== PASSWORD CONFIRM MODAL ===================== */}
      {passwordConfirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl border border-gray-200 p-6">

            <h3 className="text-lg font-semibold text-[#2E3092] mb-4">
              Confirm Password Change
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to update your password?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPasswordConfirmModal(false)}
                className="px-4 py-2 bg-gray-100 border rounded-md text-sm hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setPasswordConfirmModal(false);
                  if (onConfirmAction) onConfirmAction();
                }}
                className="px-5 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white rounded-md flex items-center gap-2 text-sm"
              >
                <CheckCircle size={16} />
                Yes, Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

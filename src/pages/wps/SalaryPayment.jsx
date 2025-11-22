// src/pages/wps/SalaryPayment.jsx
import { useState } from "react";
import {
  CreditCard,
  Edit,
  Send,
  FileText,
  Upload,
  CheckCircle2,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import WpsPageLayout from "@/components/WpsPageLayout";

export default function SalaryPayment() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("details");
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "James Miller",
      eid: "E12456",
      lastPayment: "2025-10-25",
      salary: 8300,
      selected: false,
    },
    {
      id: 2,
      name: "Sophia Khan",
      eid: "P98762",
      lastPayment: "2025-10-28",
      salary: 7400,
      selected: false,
    },
    {
      id: 3,
      name: "Liam Chen",
      eid: "E54319",
      lastPayment: "2025-10-22",
      salary: 9500,
      selected: false,
    },
    {
      id: 4,
      name: "Amira Patel",
      eid: "P11234",
      lastPayment: "2025-10-19",
      salary: 8700,
      selected: false,
    },
    {
      id: 5,
      name: "Carlos Mendes",
      eid: "E99881",
      lastPayment: "2025-10-30",
      salary: 9100,
      selected: false,
    },
  ]);

  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    leaves: "",
    daysPaid: "",
    allowance: "",
    refund: "",
    final: "",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleCheckbox = (id) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, selected: !e.selected } : e))
    );
  };

  const handleEdit = (emp) => {
    setEditModal(emp);
    setEditForm({
      leaves: "",
      daysPaid: "",
      allowance: "",
      refund: "",
      final: emp.salary || "",
    });
  };

  const handleSaveEdit = () => {
    toast.success(t("salary_toast_update_success"));
    setEditModal(null);
  };

  // Handle sending list to MOHRE
  const handleSendList = () => {
    setLoadingSend(true);
    setTimeout(() => {
      toast.success(t("salary_toast_send_list_success"));
      setLoadingSend(false);
      setActiveTab("action");
    }, 2500);
  };

  // Handle sending notification to MOHRE
  const handleSendNotification = () => {
    setLoadingAction(true);
    setTimeout(() => {
      toast.success(t("salary_toast_send_notification_success"));
      setLoadingAction(false);
      setShowSummary(false);
      setVerify(false);
    }, 2500);
  };

  return (
    <WpsPageLayout
      title={t("salary_title")}
      subtitle={t("salary_subtitle")}
    >
      {/* Tabs */}
      <div className="border-b flex bg-white rounded-t-2xl overflow-hidden">
        {[
          { key: "details", label: t("salary_tab_details") },
          { key: "send", label: t("salary_tab_send") },
          { key: "action", label: t("salary_tab_action") },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all ${
              activeTab === tab.key
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#f5f6ff]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---------- TAB 1 ---------- */}
      {activeTab === "details" && (
        <div className="p-6 bg-white rounded-b-2xl space-y-6 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-[#f7f8ff] text-gray-700">
              <tr>
                <th className="p-3 text-left">
                  {t("salary_table1_name")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_table1_eid")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_table1_last_payment")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_table1_salary_amount")}
                </th>
                <th className="p-3 text-center">
                  {t("salary_table1_select")}
                </th>
                <th className="p-3 text-center">
                  {t("salary_table1_action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr
                  key={e.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{e.name}</td>
                  <td className="p-3">{e.eid}</td>
                  <td className="p-3">{e.lastPayment}</td>
                  <td className="p-3">{e.salary}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={e.selected}
                      onChange={() => handleCheckbox(e.id)}
                      className="text-[#2E3092] focus:ring-[#2E3092]"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit(e)}
                      className="text-[#2E3092] hover:underline flex items-center justify-center gap-1"
                    >
                      <Edit size={16} /> {t("salary_edit_amount")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                const hasSelected = employees.some((e) => e.selected);
                if (!hasSelected) {
                  toast.error(t("salary_error_select_employee"));
                  return;
                }
                toast.info(t("salary_info_proceed_list"));
                setActiveTab("send");
              }}
              className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-5 py-2 rounded-md text-sm font-medium transition"
            >
              {t("salary_btn_go_payment")} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ---------- TAB 2 ---------- */}
      {activeTab === "send" && (
        <div className="p-6 bg-white rounded-b-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#2E3092]">
                {t("salary_send_title")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("salary_send_desc")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                defaultValue="2025-11-10"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/50"
                aria-label={t("salary_send_payment_date")}
              />
              <button className="flex items-center gap-2 bg-[#2E3092] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#23246e] transition">
                <Send size={16} />
                {t("submit")}
              </button>
            </div>
          </div>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f7f8ff] text-gray-700">
              <tr>
                <th className="p-3 text-left">
                  {t("salary_send_table_name")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_send_table_eid")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_send_table_salary_amount")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_send_table_payment_date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {employees
                .filter((e) => e.selected)
                .map((e) => (
                  <tr key={e.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{e.name}</td>
                    <td className="p-3">{e.eid}</td>
                    <td className="p-3">{e.salary}</td>
                    <td className="p-3">2025-11-10</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSendList}
              disabled={loadingSend}
              className={`relative flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition 
                text-white bg-green-600 hover:bg-green-700 
                ${loadingSend ? "opacity-90 cursor-wait" : ""}`}
              style={{ minWidth: "180px", height: "40px" }}
            >
              {loadingSend ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span className="text-white/90">
                    {t("salary_send_sending")}
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{t("salary_btn_send_list_mohre")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ---------- TAB 3 ---------- */}
      {activeTab === "action" && (
        <div className="p-6 bg-white rounded-b-2xl space-y-6">
          <p className="text-center text-sm text-gray-600">
            {t("salary_action_hint")}
          </p>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f7f8ff] text-gray-700">
              <tr>
                <th className="p-3 text-left">
                  {t("salary_action_table_name")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_action_table_eid")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_action_table_salary_amount")}
                </th>
                <th className="p-3 text-left">
                  {t("salary_action_table_payment_date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {employees
                .filter((e) => e.selected)
                .map((e) => (
                  <tr key={e.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{e.name}</td>
                    <td className="p-3">{e.eid}</td>
                    <td className="p-3">{e.salary}</td>
                    <td className="p-3">2025-11-10</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-5 py-2 rounded-md text-sm font-medium transition">
              <FileText size={16} /> {t("salary_action_export_file")}
            </button>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition">
              <Send size={16} /> {t("salary_action_send_bulk")}
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
            >
              <CheckCircle2 size={16} />{" "}
              {t("salary_action_send_notification")}
            </button>
          </div>
        </div>
      )}

      {/* ---------- Edit Modal ---------- */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2E3092]">
                {t("salary_edit_title", { name: editModal.name })}
              </h3>
              <button onClick={() => setEditModal(null)}>
                <X className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { key: "leaves", label: t("salary_edit_leaves") },
                { key: "daysPaid", label: t("salary_edit_days_paid") },
                { key: "allowance", label: t("salary_edit_allowance") },
                { key: "refund", label: t("salary_edit_refund") },
                { key: "final", label: t("salary_edit_final") },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {f.label}
                  </label>
                  <input
                    type="number"
                    value={editForm[f.key]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [f.key]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/50"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditModal(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm bg-[#2E3092] text-white rounded-md hover:bg-[#23246e]"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Notification Summary Modal ---------- */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-[#2E3092] mb-4">
              {t("salary_summary_title")}
            </h3>
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>{t("salary_summary_total_employees")} 5</p>
              <p>{t("salary_summary_total_amount")} AED 43,000</p>
              <p>{t("salary_summary_success_no")} 5</p>
              <p>{t("salary_summary_failed_no")} 0</p>
              <p>{t("salary_summary_success_amount")} AED 43,000</p>
              <p>{t("salary_summary_failed_amount")} AED 0</p>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                checked={verify}
                onChange={(e) => setVerify(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#2E3092] focus:ring-[#2E3092]"
              />
              <label className="text-sm">
                {t("salary_summary_verify_text")}
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                {t("cancel")}
              </button>
              <button
                disabled={!verify || loadingAction}
                onClick={handleSendNotification}
                className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 ${
                  verify
                    ? "bg-[#2E3092] text-white hover:bg-[#23246e]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loadingAction ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />{" "}
                    {t("salary_summary_btn_sending")}
                  </>
                ) : (
                  t("salary_summary_btn_submit")
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </WpsPageLayout>
  );
}

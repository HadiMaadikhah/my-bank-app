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
import WpsPageLayout from "@/components/WpsPageLayout";

export default function SalaryPayment() {
  const [activeTab, setActiveTab] = useState("details");
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const [employees, setEmployees] = useState([
    { id: 1, name: "James Miller", eid: "E12456", lastPayment: "2025-10-25", salary: 8300, selected: false },
    { id: 2, name: "Sophia Khan", eid: "P98762", lastPayment: "2025-10-28", salary: 7400, selected: false },
    { id: 3, name: "Liam Chen", eid: "E54319", lastPayment: "2025-10-22", salary: 9500, selected: false },
    { id: 4, name: "Amira Patel", eid: "P11234", lastPayment: "2025-10-19", salary: 8700, selected: false },
    { id: 5, name: "Carlos Mendes", eid: "E99881", lastPayment: "2025-10-30", salary: 9100, selected: false },
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
    toast.success("Salary details updated successfully!");
    setEditModal(null);
  };

  // Handle sending list to MOHRE
  const handleSendList = () => {
    setLoadingSend(true);
    setTimeout(() => {
      toast.success("Salary list sent to MOHRE successfully!");
      setLoadingSend(false);
      setActiveTab("action");
    }, 2500);
  };

  // Handle sending notification to MOHRE
  const handleSendNotification = () => {
    setLoadingAction(true);
    setTimeout(() => {
      toast.success("Salary payment notification sent successfully!");
      setLoadingAction(false);
      setShowSummary(false);
      setVerify(false);
    }, 2500);
  };

  return (
    <WpsPageLayout
      title="Salary Payment"
      subtitle="Manage and process employee salary payments."
    >
      {/* Tabs */}
      <div className="border-b flex bg-white rounded-t-2xl overflow-hidden">
        {[
          { key: "details", label: "Salary Payment Details" },
          { key: "send", label: "Send List" },
          { key: "action", label: "Salary Payment Action" },
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
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">EID / Passport No</th>
                <th className="p-3 text-left">Last Payment</th>
                <th className="p-3 text-left">Salary Amount (AED)</th>
                <th className="p-3 text-center">Select to Pay</th>
                <th className="p-3 text-center">Action</th>
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
                      <Edit size={16} /> Edit Amount
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
                  toast.error("Please select at least one employee.");
                  return;
                }
                toast.info("Proceeding to payment list...");
                setActiveTab("send");
              }}
              className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-5 py-2 rounded-md text-sm font-medium transition"
            >
              Go to Payment <ArrowRight size={16} />
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
                Salary Payment Details of Corporate
              </h3>
              <p className="text-sm text-gray-500">
                Select payment date and submit to generate list.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                defaultValue="2025-11-10"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E3092]/50"
              />
              <button className="flex items-center gap-2 bg-[#2E3092] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#23246e] transition">
                <Send size={16} />
                Submit
              </button>
            </div>
          </div>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f7f8ff] text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">EID / Passport No</th>
                <th className="p-3 text-left">Salary Amount</th>
                <th className="p-3 text-left">Date of Payment</th>
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
              className={`flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium transition ${
                loadingSend ? "opacity-80 cursor-not-allowed" : "hover:bg-green-700"
              }`}
            >
              {loadingSend ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Sending...
                </>
              ) : (
                <>
                  <Upload size={16} /> Send list to MOHRE
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
            If list sending successfully done and ACK received, this tab will get active.
          </p>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f7f8ff] text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">EID / Passport No</th>
                <th className="p-3 text-left">Salary Amount</th>
                <th className="p-3 text-left">Date of Payment</th>
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
              <FileText size={16} /> Export Salary File
            </button>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition">
              <Send size={16} /> Send Bulk payment details to MOHRE
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
            >
              <CheckCircle2 size={16} /> Send Salary Payment notification to MOHRE
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
                Edit Salary for {editModal.name}
              </h3>
              <button onClick={() => setEditModal(null)}>
                <X className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { key: "leaves", label: "Leaves" },
                { key: "daysPaid", label: "Days Paid" },
                { key: "allowance", label: "Allowance" },
                { key: "refund", label: "Refund Amount" },
                { key: "final", label: "Final Amount" },
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
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm bg-[#2E3092] text-white rounded-md hover:bg-[#23246e]"
              >
                Save
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
              Confirm Salary Payment Notification
            </h3>
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>Total Employees: 5</p>
              <p>Total Amount: AED 43,000</p>
              <p>Successful No: 5</p>
              <p>Failed No: 0</p>
              <p>Successful Amount: AED 43,000</p>
              <p>Failed Amount: AED 0</p>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                checked={verify}
                onChange={(e) => setVerify(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#2E3092] focus:ring-[#2E3092]"
              />
              <label className="text-sm">
                Verify the information are correct
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
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
                    <Loader2 className="animate-spin" size={16} /> Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </WpsPageLayout>
  );
}

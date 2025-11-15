import { useState, useMemo } from "react";
import {
  RotateCcw,
  ClipboardCheck,
  Check,
  X,
  Search,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

/* ===================== DEMO DATA ===================== */
const employeesDemo = [
  { name: "Staff A", eid: "123-1980-123", salary: 5000, paymentDate: "2502" },
  { name: "Staff B", eid: "5875", salary: 4500, paymentDate: "2502" },
  { name: "Staff C", eid: "5254", salary: 4500, paymentDate: "2502" },
  { name: "Staff D", eid: "241215", salary: 3000, paymentDate: "2502" },
];

const refundStatusDemo = [
  {
    name: "Staff A",
    eid: "123-1980-123",
    salary: 5000,
    paymentDate: "2502",
    requestDate: "2503",
    status: "done",
    desc: "",
  },
  {
    name: "Staff B",
    eid: "5875",
    salary: 4500,
    paymentDate: "2502",
    requestDate: "2503",
    status: "failed",
    desc: "Account not valid",
  },
];

export default function Refund() {
  const [activeTab, setActiveTab] = useState("request");

  /* ===================== REQUEST STATES ===================== */
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  /* ===================== MODALS ===================== */
  const [confirmModal, setConfirmModal] = useState(false);
  const [finalConfirmModal, setFinalConfirmModal] = useState(false);

  /* ===================== STATUS FILTER STATES ===================== */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  /* ===================== SELECT LOGIC ===================== */
  const toggleSelect = (emp) => {
    let updated;

    if (selected.some((x) => x.eid === emp.eid)) {
      updated = selected.filter((x) => x.eeid !== emp.eid);
    } else {
      updated = [...selected, emp];
    }

    setSelected(updated);
    setSelectAll(updated.length === employeesDemo.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected([...employeesDemo]);
      setSelectAll(true);
    }
  };

  const finalAmount = useMemo(
    () => selected.reduce((sum, i) => sum + i.salary, 0),
    [selected]
  );

  /* ===================== FILTERING STATUS ===================== */
  const filteredRefunds = refundStatusDemo.filter((i) => {
    const matchSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.eid.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || i.status === statusFilter;

    const matchDate = dateFilter === "" || i.paymentDate === dateFilter;

    return matchSearch && matchStatus && matchDate;
  });

  const paginated = filteredRefunds.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages =
    Math.ceil(filteredRefunds.length / rowsPerPage) || 1;

  /* ===========================================================
      PAGE STRUCTURE
  =========================================================== */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#f7f8ff] to-[#e8eaff]">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#2E3092]">
            WPS Refund Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Submit and track refund requests for salary payment issues.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex border-b border-gray-200 bg-white text-sm sm:text-base">
          <button
            onClick={() => setActiveTab("request")}
            className={`flex-1 py-3 font-medium transition-all ${
              activeTab === "request"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#f5f6ff]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Refund Request
          </button>

          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-3 font-medium transition-all ${
              activeTab === "status"
                ? "text-[#2E3092] border-b-2 border-[#2E3092] bg-[#f5f6ff]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Refund Status
          </button>
        </div>

        {/* ===========================================================
                TAB : REFUND REQUEST
        =========================================================== */}
        {activeTab === "request" && (
          <div className="p-6 sm:p-8 space-y-6">

            {/* ===== TABLE ===== */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

              <h3 className="text-lg font-semibold text-[#2E3092] flex items-center gap-2 mb-4">
                <RotateCcw size={20} />
                Request Refund
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f5f6ff] text-[#2E3092] border-b">
                      <th className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 text-[#2E3092]"
                        />
                      </th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">EID / Passport</th>
                      <th className="p-3 text-left">Salary Amount</th>
                      <th className="p-3 text-left">Date of Payment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employeesDemo.map((emp, i) => {
                      const isSelected = selected.some((x) => x.eid === emp.eid);

                      return (
                        <tr
                          key={i}
                          className={`border-b transition-all ${
                            isSelected
                              ? "bg-blue-50 scale-[1.01] shadow-sm"
                              : i % 2 === 0
                              ? "bg-gray-50"
                              : "bg-white"
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(emp)}
                              className="w-4 h-4 text-[#2E3092]"
                            />
                          </td>
                          <td className="p-3">{emp.name}</td>
                          <td className="p-3">{emp.eid}</td>
                          <td className="p-3">AED {emp.salary}</td>
                          <td className="p-3">{emp.paymentDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  disabled={!selected.length}
                  onClick={() => setConfirmModal(true)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition
                    ${
                      selected.length
                        ? "bg-[#2E3092] hover:bg-[#23246e] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Request Refund
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===========================================================
                TAB : REFUND STATUS
        =========================================================== */}
        {activeTab === "status" && (
          <div className="p-6 sm:p-8 space-y-6">

            {/* ===== FILTER CARD ===== */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <div className="grid md:grid-cols-4 gap-4">

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    placeholder="Search by name or EID..."
                    className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#2E3092]/40"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                {/* Date */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    placeholder="Payment date"
                    className="w-full border rounded-md pl-9 pr-3 py-2 text-sm"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                {/* Status */}
                <select
                  className="w-full border rounded-md py-2 px-3 text-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="done">Done</option>
                  <option value="failed">Failed</option>
                </select>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                    setDateFilter("");
                    setPage(1);
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm border rounded-md"
                >
                  <Filter size={16} />
                  Reset Filters
                </button>
              </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-semibold text-[#2E3092] mb-3 flex items-center gap-2">
                <ClipboardCheck size={20} />
                Refund Status
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f5f6ff] text-[#2E3092] border-b">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">EID / Passport</th>
                      <th className="p-3 text-left">Salary</th>
                      <th className="p-3 text-left">Payment Date</th>
                      <th className="p-3 text-left">Refund Request Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginated.length ? (
                      paginated.map((r, i) => (
                        <tr
                          key={i}
                          className={`border-b ${
                            i % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="p-3">{r.name}</td>
                          <td className="p-3">{r.eid}</td>
                          <td className="p-3">AED {r.salary}</td>
                          <td className="p-3">{r.paymentDate}</td>
                          <td className="p-3">{r.requestDate}</td>

                          <td className="p-3">
                            {r.status === "done" ? (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex items-center gap-1 w-fit">
                                <Check size={14} /> Done
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold flex items-center gap-1 w-fit">
                                <AlertCircle size={14} /> Failed
                              </span>
                            )}
                          </td>

                          <td className="p-3">
                            {r.desc || <span className="text-gray-400 text-xs">—</span>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-6 text-gray-500">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ===== PAGINATION ===== */}
              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="text-gray-500">
                  Showing {paginated.length} of {filteredRefunds.length} records
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`p-2 rounded-md border ${
                      page === 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className="font-medium">
                    {page} / {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`p-2 rounded-md border ${
                      page === totalPages
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ===========================================================
                MODAL 1 — SELECTED ROWS (DETAILS)
        =========================================================== */}
        {confirmModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-200 p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#2E3092]">
                  Confirm Selected Refunds
                </h3>
                <button onClick={() => setConfirmModal(false)}>
                  <X size={20} className="text-gray-600 hover:text-gray-800 transition" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3">
                The following employees will be included in this refund request:
              </p>

              {/* List of selected employees */}
              <div className="max-h-60 overflow-y-auto border rounded-xl bg-gray-50 p-3 mb-4">
                {selected.map((emp, idx) => (
                  <div
                    key={idx}
                    className="mb-3 pb-3 border-b last:border-b-0 last:pb-0 last:mb-0"
                  >
                    <div className="flex justify-between text-sm font-semibold text-gray-800">
                      <span>{emp.name}</span>
                      <span className="text-xs text-gray-500">{emp.eid}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Salary: AED {emp.salary}</span>
                      <span>Payment date: {emp.paymentDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Amount */}
              <div className="bg-gray-100 border rounded-xl p-3 mb-6">
                <p className="text-xs text-gray-500">Final Amount</p>
                <p className="text-lg font-semibold text-gray-800">AED {finalAmount}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-md text-sm text-gray-700 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setConfirmModal(false);
                    setFinalConfirmModal(true);
                  }}
                  className="px-5 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white rounded-md text-sm flex items-center gap-2 transition"
                >
                  <Check size={16} />
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===========================================================
                MODAL 2 — FINAL CONFIRMATION
        =========================================================== */}
        {finalConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-200 p-6">

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#2E3092] mb-3">
                Are you sure?
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Do you want to submit this refund request for the selected employees?
              </p>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setFinalConfirmModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-md text-sm text-gray-700 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setFinalConfirmModal(false);
                    toast.success("Refund request submitted successfully.");
                    setSelected([]);
                    setSelectAll(false);
                  }}
                  className="px-5 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white rounded-md text-sm flex items-center gap-2 transition"
                >
                  <Check size={16} />
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

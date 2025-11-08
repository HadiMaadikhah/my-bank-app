// src/pages/wps/Employees.jsx
import { useMemo, useState } from "react";
import WpsPageLayout from "@/components/WpsPageLayout";
import {
  Users,
  Plus,
  X,
  BadgeCheck,
  Search,
  Building2,
  Trash2,
  PauseCircle,
} from "lucide-react";
import { toast } from "sonner";

const BRAND = "#2E3092";

const STATUS_COLORS = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Terminated: "bg-red-100 text-red-700",
};

const PAY_COLORS = {
  Paid: "bg-green-100 text-green-700",
  "Not paid": "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

export default function Employees() {
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'payments'
  const [showAddModal, setShowAddModal] = useState(false);

  // --- Seed data (10 نمونه)
  const [employees, setEmployees] = useState([
    { id: 1,  name: "Ahmed Khan",         empId: "EMP-1001", department: "Operations", status: "Active",    paymentStatus: "Paid",     joinDate: "2022-04-12", lastActive: "2025-10-01", iban: "AE12 3456 7890 1234", eidPassport: "EID-784-2022-001", company: "BlueWave Technologies LLC" },
    { id: 2,  name: "Sara Al Farsi",      empId: "EMP-1002", department: "HR",         status: "Inactive",  paymentStatus: "Not paid", joinDate: "2021-08-20", lastActive: "2023-09-14", iban: "AE98 7654 3210 9999", eidPassport: "P-987654321",    company: "Golden Falcon Trading Co." },
    { id: 3,  name: "Mohammed Ali",       empId: "EMP-1003", department: "IT",         status: "Active",    paymentStatus: "Failed",   joinDate: "2024-01-05", lastActive: "2025-11-01", iban: "AE00 1111 2222 3333", eidPassport: "EID-784-2024-003", company: "Oceanic Foods Industries" },
    { id: 4,  name: "Fatima Noor",        empId: "EMP-1004", department: "Finance",    status: "Terminated",paymentStatus: "Not paid", joinDate: "2020-02-10", lastActive: "2022-03-15", iban: "AE22 4444 5555 6666", eidPassport: "P-1122334455",   company: "BlueWave Technologies LLC" },
    { id: 5,  name: "Omar Rahman",        empId: "EMP-1005", department: "Sales",      status: "Active",    paymentStatus: "Paid",     joinDate: "2023-03-18", lastActive: "2025-10-20", iban: "AE55 7777 8888 9999", eidPassport: "EID-784-2023-005", company: "Golden Falcon Trading Co." },
    { id: 6,  name: "Layla Hamed",        empId: "EMP-1006", department: "Compliance", status: "Inactive",  paymentStatus: "Failed",   joinDate: "2021-11-02", lastActive: "2023-01-30", iban: "AE77 0000 1111 2222", eidPassport: "P-5566778899",   company: "Oceanic Foods Industries" },
    { id: 7,  name: "Khalid Al Mansoori", empId: "EMP-1007", department: "IT",         status: "Active",    paymentStatus: "Paid",     joinDate: "2024-06-25", lastActive: "2025-10-29", iban: "AE13 2468 1357 2468", eidPassport: "EID-784-2024-007", company: "BlueWave Technologies LLC" },
    { id: 8,  name: "Mariam Yousuf",      empId: "EMP-1008", department: "Finance",    status: "Active",    paymentStatus: "Not paid", joinDate: "2022-09-09", lastActive: "2025-09-21", iban: "AE24 1357 2468 1357", eidPassport: "P-6677889900",   company: "Golden Falcon Trading Co." },
    { id: 9,  name: "Rashid Qasim",       empId: "EMP-1009", department: "Operations", status: "Inactive",  paymentStatus: "Paid",     joinDate: "2020-12-14", lastActive: "2023-04-10", iban: "AE36 9999 8888 7777", eidPassport: "EID-784-2020-009", company: "Oceanic Foods Industries" },
    { id:10,  name: "Noora Al Tamimi",    empId: "EMP-1010", department: "HR",         status: "Active",    paymentStatus: "Paid",     joinDate: "2025-02-01", lastActive: "2025-11-02", iban: "AE48 2222 3333 4444", eidPassport: "EID-784-2025-010", company: "BlueWave Technologies LLC" },
  ]);

  // --- فرم افزودن کارمند
  const [newEmp, setNewEmp] = useState({
    name: "",
    empId: "",
    department: "",
    status: "Active",
    paymentStatus: "Paid",
    joinDate: "",
    iban: "",
    eidPassport: "",
    company: "",
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const { name, empId, department, joinDate, iban, eidPassport, company } = newEmp;
    if (!name || !empId || !department || !joinDate || !iban || !eidPassport || !company) {
      toast.error("Please fill all required fields.");
      return;
    }
    setEmployees((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        ...newEmp,
        lastActive: newEmp.joinDate,
      },
    ]);
    setShowAddModal(false);
    setNewEmp({
      name: "",
      empId: "",
      department: "",
      status: "Active",
      paymentStatus: "Paid",
      joinDate: "",
      iban: "",
      eidPassport: "",
      company: "",
    });
    toast.success("Employee added successfully.");
  };

  // -------------------- فیلترها (زنده) --------------------
  // تب 1: لیست کارمندان
  const [nameQuery, setNameQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState({
    Active: true,
    Inactive: false,
    Terminated: false,
  });
  const [onlyActive24m, setOnlyActive24m] = useState(false);

  const filteredEmployees = useMemo(() => {
    const statuses = Object.entries(statusFilter)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const now = new Date("2025-11-08"); // Asia/Baku
    const months24Ago = new Date(now);
    months24Ago.setMonth(months24Ago.getMonth() - 24);

    return employees.filter((e) => {
      const matchStatus = statuses.length ? statuses.includes(e.status) : true;
      const q = nameQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.empId.toLowerCase().includes(q) ||
        (e.eidPassport || "").toLowerCase().includes(q) ||
        (e.company || "").toLowerCase().includes(q);
      const match24 =
        !onlyActive24m ||
        (e.status === "Active" && new Date(e.lastActive) >= months24Ago);

      return matchStatus && matchQuery && match24;
    });
  }, [employees, statusFilter, nameQuery, onlyActive24m]);

  // تب 2: وضعیت پرداخت
  const [payFilter, setPayFilter] = useState({
    Paid: true,
    "Not paid": false,
    Failed: false,
  });

  const filteredPayments = useMemo(() => {
    const keys = Object.entries(payFilter)
      .filter(([, v]) => v)
      .map(([k]) => k);
    return employees.filter((e) => keys.includes(e.paymentStatus));
  }, [employees, payFilter]);

  // -------------------- اکشن‌ها --------------------
  const markPaid = (id) => {
    setEmployees((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentStatus: "Paid" } : p))
    );
    toast.success("Payment marked as Paid.");
  };

  const suspendEmployee = (id) => {
    setEmployees((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Terminated" ? "Inactive" : "Inactive",
            }
          : p
      )
    );
    toast.message("Employee set to Inactive.");
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((p) => p.id !== id));
    toast.success("Employee removed.");
  };

  // کارت موبایل برای تب 1
  const ListCard = ({ e }) => (
    <div
      className={`rounded-xl border border-[#e5e7ff]/60 p-4 space-y-2 ${
        e.status === "Active"
          ? "bg-white"
          : e.status === "Inactive"
          ? "bg-gray-50"
          : "bg-red-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-[#1a1c3b]">{e.name}</div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_COLORS[e.status]}`}>
          {e.status}
        </span>
      </div>
      <div className="text-xs text-gray-600">ID: {e.empId}</div>
      <div className="text-xs text-gray-600">Dept: {e.department}</div>
      <div className="text-xs text-gray-600">Company: {e.company}</div>
      <div className="text-xs text-gray-600">EID/Passport: {e.eidPassport}</div>
      <div className="text-xs text-gray-600">Join: {new Date(e.joinDate).toLocaleDateString()}</div>
      <div className="text-xs text-gray-600">IBAN: {e.iban}</div>
    </div>
  );

  // کارت موبایل برای تب 2
  const PayCard = ({ e }) => (
    <div
      className={`rounded-xl border border-[#e5e7ff]/60 p-4 space-y-2 ${
        e.paymentStatus === "Paid"
          ? "bg-white"
          : e.paymentStatus === "Not paid"
          ? "bg-yellow-50"
          : "bg-red-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-[#1a1c3b] flex items-center gap-2">
          <Users size={16} className="text-[#2E3092]" />
          {e.name}
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${PAY_COLORS[e.paymentStatus]}`}>
          {e.paymentStatus}
        </span>
      </div>
      <div className="text-xs text-gray-600">ID: {e.empId}</div>
      <div className="text-xs text-gray-600">Dept: {e.department}</div>
      <div className="text-xs text-gray-600">Company: {e.company}</div>
      <div className="text-xs text-gray-600">Last Active: {new Date(e.lastActive).toLocaleDateString()}</div>
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => markPaid(e.id)}
          className="inline-flex items-center gap-1.5 text-[#2E3092] hover:text-[#23246e] px-3 py-1 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff] transition text-xs font-medium"
        >
          <BadgeCheck size={14} />
          Mark Paid
        </button>
        <button
          onClick={() => suspendEmployee(e.id)}
          className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 px-3 py-1 rounded-lg border border-amber-200 hover:bg-amber-50 transition text-xs font-medium"
        >
          <PauseCircle size={14} />
          Suspend
        </button>
        <button
          onClick={() => deleteEmployee(e.id)}
          className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition text-xs font-medium"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <WpsPageLayout
      title="Employees"
      subtitle="Manage your employee details and salary records."
    >
      <div className="flex flex-col gap-6">
        {/* Tabs */}
        <div className="bg-white/80 border border-[#d9dbff]/60 rounded-xl overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-3 text-sm sm:text-base font-medium transition ${
                activeTab === "list"
                  ? "text-white bg-[#2E3092]"
                  : "text-[#2E3092] bg-white hover:bg-[#f5f6ff]"
              }`}
            >
              List of Employees
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 py-3 text-sm sm:text-base font-medium transition ${
                activeTab === "payments"
                  ? "text-white bg-[#2E3092]"
                  : "text-[#2E3092] bg-white hover:bg-[#f5f6ff]"
              }`}
            >
              Employees Payment Status
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "list" ? (
            <div className="p-5 sm:p-6 space-y-5">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search (Name / ID / EID / Company)
                    </label>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                        placeholder="Type to search..."
                        className="w-full pl-9 pr-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Active", "Inactive", "Terminated"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setStatusFilter((prev) => ({ ...prev, [s]: !prev[s] }))
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                            statusFilter[s]
                              ? "text-white border-transparent"
                              : "text-[#2E3092] border-[#d0d4ff]"
                          }`}
                          style={{ backgroundColor: statusFilter[s] ? BRAND : "white" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={onlyActive24m}
                        onChange={(e) => setOnlyActive24m(e.target.checked)}
                        className="w-4 h-4 text-[#2E3092] border-gray-300 rounded focus:ring-[#2E3092]"
                      />
                      Just active in last 24 months
                    </label>
                  </div>
                </div>

                {/* Add */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                  >
                    <Plus size={16} />
                    Add Employee
                  </button>
                </div>
              </div>

              {/* Count */}
              <div className="text-xs text-gray-500">
                Showing <span className="font-semibold">{filteredEmployees.length}</span> record(s)
              </div>

              {/* Table (Desktop ≥ md) */}
              <div className="hidden md:block bg-white/80 backdrop-blur-md border border-[#d9dbff]/60 shadow-sm rounded-xl overflow-x-auto">
                <table className="min-w-[1000px] w-full text-sm">
                  <thead className="bg-[#2E3092] text-white text-left">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Employee ID</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">EID / Passport No</th>
                      <th className="py-3 px-4">Join Date</th>
                      <th className="py-3 px-4">IBAN</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((e) => (
                      <tr
                        key={e.id}
                        className={`border-t border-[#e5e7ff]/60 transition ${
                          e.status === "Active"
                            ? "bg-white hover:bg-[#f8f9ff]"
                            : e.status === "Inactive"
                            ? "bg-gray-50 text-gray-600"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-[#1a1c3b]">{e.name}</td>
                        <td className="py-3 px-4 text-gray-700">{e.empId}</td>
                        <td className="py-3 px-4 text-gray-700">{e.department}</td>
                        <td className="py-3 px-4 text-gray-700">{e.company}</td>
                        <td className="py-3 px-4 text-gray-700">{e.eidPassport}</td>
                        <td className="py-3 px-4 text-gray-700">
                          {new Date(e.joinDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-700">{e.iban}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[e.status]}`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => markPaid(e.id)}
                              className="inline-flex items-center gap-1.5 text-[#2E3092] hover:text-[#23246e] px-3 py-1.5 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff] transition text-xs font-medium"
                              title="Mark Paid"
                            >
                              <BadgeCheck size={14} />
                              Mark Paid
                            </button>
                            <button
                              onClick={() => suspendEmployee(e.id)}
                              className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50 transition text-xs font-medium"
                              title="Suspend"
                            >
                              <PauseCircle size={14} />
                              Suspend
                            </button>
                            <button
                              onClick={() => deleteEmployee(e.id)}
                              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition text-xs font-medium"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-6 text-center text-gray-500">
                          No employees found with current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cards (Mobile < md) */}
              <div className="md:hidden grid grid-cols-1 gap-3">
                {filteredEmployees.map((e) => <ListCard key={e.id} e={e} />)}
                {filteredEmployees.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-6">
                    No employees found with current filters.
                  </div>
                )}
              </div>
            </div>
          ) : (
            // ------------------- TAB 2: Employees Payment Status -------------------
            <div className="p-5 sm:p-6 space-y-5">
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {["Paid", "Not paid", "Failed"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPayFilter((prev) => ({ ...prev, [p]: !prev[p] }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                        payFilter[p]
                          ? "text-white border-transparent"
                          : "text-[#2E3092] border-[#d0d4ff]"
                      }`}
                      style={{ backgroundColor: payFilter[p] ? BRAND : "white" }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Showing <span className="font-semibold">{filteredPayments.length}</span> record(s)
                </div>
              </div>

              {/* Table (Desktop ≥ md) */}
              <div className="hidden md:block bg-white/80 backdrop-blur-md border border-[#d9dbff]/60 shadow-sm rounded-xl overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead className="bg-[#2E3092] text-white text-left">
                    <tr>
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Employee ID</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4">Last Active</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((e) => (
                      <tr
                        key={e.id}
                        className={`border-t border-[#e5e7ff]/60 transition ${
                          e.paymentStatus === "Paid"
                            ? "bg-white hover:bg-[#f8f9ff]"
                            : e.paymentStatus === "Not paid"
                            ? "bg-yellow-50"
                            : "bg-red-50"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-[#1a1c3b]">
                          <span className="inline-flex items-center gap-2">
                            <Users size={16} className="text-[#2E3092]" />
                            {e.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{e.empId}</td>
                        <td className="py-3 px-4 text-gray-700">{e.department}</td>
                        <td className="py-3 px-4 text-gray-700">{e.company}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${PAY_COLORS[e.paymentStatus]}`}>
                            {e.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {new Date(e.lastActive).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => markPaid(e.id)}
                              className="inline-flex items-center gap-1.5 text-[#2E3092] hover:text-[#23246e] px-3 py-1.5 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff] transition text-xs font-medium"
                              title="Mark Paid"
                            >
                              <BadgeCheck size={14} />
                              Mark Paid
                            </button>
                            <button
                              onClick={() => suspendEmployee(e.id)}
                              className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50 transition text-xs font-medium"
                              title="Suspend"
                            >
                              <PauseCircle size={14} />
                              Suspend
                            </button>
                            <button
                              onClick={() => deleteEmployee(e.id)}
                              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition text-xs font-medium"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPayments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-gray-500">
                          No records with current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cards (Mobile < md) */}
              <div className="md:hidden grid grid-cols-1 gap-3">
                {filteredPayments.map((e) => <PayCard key={e.id} e={e} />)}
                {filteredPayments.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-6">
                    No records with current filters.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowAddModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#cfd3ff]/70 p-6 relative animate-fade-in">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-[#2E3092] transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Building2 className="text-[#2E3092]" size={22} />
                <h2 className="text-lg font-semibold text-[#2E3092]">
                  Add New Employee
                </h2>
              </div>

              <form onSubmit={handleAddEmployee} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    placeholder="e.g. Ahmed Khan"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    value={newEmp.empId}
                    onChange={(e) => setNewEmp({ ...newEmp, empId: e.target.value })}
                    placeholder="e.g. EMP-12345"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    placeholder="e.g. IT"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    value={newEmp.company}
                    onChange={(e) => setNewEmp({ ...newEmp, company: e.target.value })}
                    placeholder="e.g. BlueWave Technologies LLC"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={newEmp.joinDate}
                    onChange={(e) => setNewEmp({ ...newEmp, joinDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IBAN
                  </label>
                  <input
                    value={newEmp.iban}
                    onChange={(e) => setNewEmp({ ...newEmp, iban: e.target.value })}
                    placeholder="AE00 0000 0000 0000"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    EID / Passport No
                  </label>
                  <input
                    value={newEmp.eidPassport}
                    onChange={(e) => setNewEmp({ ...newEmp, eidPassport: e.target.value })}
                    placeholder="e.g. EID-784-XXXX or Passport No"
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newEmp.status}
                    onChange={(e) => setNewEmp({ ...newEmp, status: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Terminated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={newEmp.paymentStatus}
                    onChange={(e) => setNewEmp({ ...newEmp, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                  >
                    <option>Paid</option>
                    <option>Not paid</option>
                    <option>Failed</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#2E3092] hover:bg-[#23246e] text-white rounded-lg shadow-sm transition inline-flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </WpsPageLayout>
  );
}

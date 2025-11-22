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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("list");
  const [showAddModal, setShowAddModal] = useState(false);

  // -------------------- سبک شده: فقط 4 نمونه مختلف --------------------
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      empId: "EMP-1001",
      department: "Operations",
      status: "Active",
      paymentStatus: "Paid",
      joinDate: "2022-04-12",
      lastActive: "2025-11-01",
      iban: "AE12 3456 7890 1234",
      eidPassport: "EID-784-2022-001",
      company: "BlueWave Technologies LLC",
    },
    {
      id: 2,
      name: "Sara Al Farsi",
      empId: "EMP-1002",
      department: "HR",
      status: "Inactive",
      paymentStatus: "Not paid",
      joinDate: "2021-08-20",
      lastActive: "2023-09-14",
      iban: "AE98 7654 3210 9999",
      eidPassport: "P-987654321",
      company: "Golden Falcon Trading Co.",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      empId: "EMP-1003",
      department: "IT",
      status: "Terminated",
      paymentStatus: "Failed",
      joinDate: "2024-01-05",
      lastActive: "2025-11-02",
      iban: "AE00 1111 2222 3333",
      eidPassport: "EID-784-2024-003",
      company: "Oceanic Foods Industries",
    },
    {
      id: 4,
      name: "Fatima Noor",
      empId: "EMP-1004",
      department: "Finance",
      status: "Active",
      paymentStatus: "Paid",
      joinDate: "2023-03-18",
      lastActive: "2025-10-20",
      iban: "AE55 7777 8888 9999",
      eidPassport: "P-1122334455",
      company: "BlueWave Technologies LLC",
    },
  ]);

  // -------------------- Add employee form --------------------
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
      toast.error(t("employees_required_fields"));
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

    toast.success(t("employees_added_success"));
  };

  // -------------------- Filters: Employees list --------------------
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

    const now = new Date("2025-11-08");
    const months24Ago = new Date(now);
    months24Ago.setMonth(months24Ago.getMonth() - 24);

    return employees.filter((e) => {
      const matchStatus = statuses.includes(e.status);
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

  // -------------------- Filters: Payment status --------------------
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

  // -------------------- Actions --------------------
  const markPaid = (id) => {
    setEmployees((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentStatus: "Paid" } : p))
    );
    toast.success(t("employees_marked_paid"));
  };

  const suspendEmployee = (id) => {
    setEmployees((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Inactive" } : p
      )
    );
    toast.message(t("employees_suspended"));
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((p) => p.id !== id));
    toast.success(t("employees_removed"));
  };

  // -------------------- UI Components --------------------
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
          {t(`employees_status_${e.status.toLowerCase()}`) ?? e.status}
        </span>
      </div>

      <div className="text-xs text-gray-600">{t("employees_table_id")}: {e.empId}</div>
      <div className="text-xs text-gray-600">{t("employees_table_department")}: {e.department}</div>
      <div className="text-xs text-gray-600">{t("employees_table_company")}: {e.company}</div>
      <div className="text-xs text-gray-600">{t("employees_table_passport")}: {e.eidPassport}</div>
      <div className="text-xs text-gray-600">{t("employees_table_join")}: {new Date(e.joinDate).toLocaleDateString()}</div>
      <div className="text-xs text-gray-600">IBAN: {e.iban}</div>
    </div>
  );

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
          {t(`employees_pay_${e.paymentStatus.replace(" ", "_").toLowerCase()}`) ?? e.paymentStatus}
        </span>
      </div>

      <div className="text-xs text-gray-600">{t("employees_table_id")}: {e.empId}</div>
      <div className="text-xs text-gray-600">{t("employees_table_department")}: {e.department}</div>
      <div className="text-xs text-gray-600">{t("employees_table_company")}: {e.company}</div>
      <div className="text-xs text-gray-600">{t("employees_pay_last_active")}: {new Date(e.lastActive).toLocaleDateString()}</div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => markPaid(e.id)}
          className="inline-flex items-center gap-1.5 text-[#2E3092] hover:text-[#23246e] px-3 py-1 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff] transition text-xs font-medium"
        >
          <BadgeCheck size={14} />
          {t("employees_mark_paid")}
        </button>

        <button
          onClick={() => suspendEmployee(e.id)}
          className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 px-3 py-1 rounded-lg border border-amber-200 hover:bg-amber-50 transition text-xs font-medium"
        >
          <PauseCircle size={14} />
          {t("employees_suspend")}
        </button>

        <button
          onClick={() => deleteEmployee(e.id)}
          className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition text-xs font-medium"
        >
          <Trash2 size={14} />
          {t("employees_delete")}
        </button>
      </div>
    </div>
  );

  // -------------------- Render --------------------
  return (
    <WpsPageLayout title={t("employees_title")} subtitle={t("employees_subtitle")}>
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
              {t("employees_tab_list")}
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 py-3 text-sm sm:text-base font-medium transition ${
                activeTab === "payments"
                  ? "text-white bg-[#2E3092]"
                  : "text-[#2E3092] bg-white hover:bg-[#f5f6ff]"
              }`}
            >
              {t("employees_tab_payments")}
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "list" ? (
            <>
              {/* Filters */}
              <div className="p-5 sm:p-6 space-y-5">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Search */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("employees_search_label")}
                      </label>
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={nameQuery}
                          onChange={(e) => setNameQuery(e.target.value)}
                          placeholder={t("employees_search_placeholder")}
                          className="w-full pl-9 pr-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                        />
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("employees_filter_status")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Active", "Inactive", "Terminated"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() =>
                              setStatusFilter((prev) => ({
                                ...prev,
                                [s]: !prev[s],
                              }))
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                              statusFilter[s]
                                ? "text-white border-transparent"
                                : "text-[#2E3092] border-[#d0d4ff]"
                            }`}
                            style={{
                              backgroundColor: statusFilter[s] ? BRAND : "white",
                            }}
                          >
                            {t(`employees_status_${s.toLowerCase()}`)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Activity Filter */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("employees_filter_activity")}
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={onlyActive24m}
                          onChange={(e) => setOnlyActive24m(e.target.checked)}
                          className="w-4 h-4 text-[#2E3092] border-gray-300 rounded focus:ring-[#2E3092]"
                        />
                        {t("employees_filter_active24")}
                      </label>
                    </div>
                  </div>

                  {/* Add Employee */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                    >
                      <Plus size={16} />
                      {t("employees_add_btn")}
                    </button>
                  </div>
                </div>

                {/* Count */}
                <div className="text-xs text-gray-500">
                  {t("employees_showing")}{" "}
                  <span className="font-semibold">{filteredEmployees.length}</span>{" "}
                  {t("employees_records")}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white/80 backdrop-blur-md border border-[#d9dbff]/60 shadow-sm rounded-xl overflow-x-auto">
                  <table className="min-w-[1000px] w-full text-sm">
                    <thead className="bg-[#2E3092] text-white text-left">
                      <tr>
                        <th className="py-3 px-4">{t("employees_table_name")}</th>
                        <th className="py-3 px-4">{t("employees_table_id")}</th>
                        <th className="py-3 px-4">{t("employees_table_department")}</th>
                        <th className="py-3 px-4">{t("employees_table_company")}</th>
                        <th className="py-3 px-4">{t("employees_table_passport")}</th>
                        <th className="py-3 px-4">{t("employees_table_join")}</th>
                        <th className="py-3 px-4">{t("employees_table_iban")}</th>
                        <th className="py-3 px-4">{t("employees_table_status")}</th>
                        <th className="py-3 px-4 text-center">{t("employees_table_actions")}</th>
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
                          <td className="py-3 px-4">{e.empId}</td>
                          <td className="py-3 px-4">{e.department}</td>
                          <td className="py-3 px-4">{e.company}</td>
                          <td className="py-3 px-4">{e.eidPassport}</td>
                          <td className="py-3 px-4">{new Date(e.joinDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{e.iban}</td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[e.status]}`}
                            >
                              {t(`employees_status_${e.status.toLowerCase()}`)}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => markPaid(e.id)}
                                className="inline-flex items-center gap-1.5 text-[#2E3092] px-3 py-1.5 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff]"
                              >
                                <BadgeCheck size={14} />
                                {t("employees_mark_paid")}
                              </button>

                              <button
                                onClick={() => suspendEmployee(e.id)}
                                className="inline-flex items-center gap-1.5 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50"
                              >
                                <PauseCircle size={14} />
                                {t("employees_suspend")}
                              </button>

                              <button
                                onClick={() => deleteEmployee(e.id)}
                                className="inline-flex items-center gap-1.5 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                                {t("employees_delete")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan={9} className="py-6 text-center text-gray-500">
                            {t("employees_no_results")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid grid-cols-1 gap-3">
                  {filteredEmployees.map((e) => (
                    <ListCard key={e.id} e={e} />
                  ))}

                  {filteredEmployees.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-6">
                      {t("employees_no_results")}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // -------------------- Payments Tab --------------------
            <>
              <div className="p-5 sm:p-6 space-y-5">

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {["Paid", "Not paid", "Failed"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() =>
                          setPayFilter((prev) => ({
                            ...prev,
                            [p]: !prev[p],
                          }))
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          payFilter[p]
                            ? "text-white border-transparent"
                            : "text-[#2E3092] border-[#d0d4ff]"
                        }`}
                        style={{ backgroundColor: payFilter[p] ? BRAND : "white" }}
                      >
                        {t(`employees_pay_${p.replace(" ", "_").toLowerCase()}`)}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500">
                    {t("employees_showing")}{" "}
                    <span className="font-semibold">{filteredPayments.length}</span>{" "}
                    {t("employees_records")}
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white/80 backdrop-blur-md border border-[#d9dbff]/60 shadow-sm rounded-xl overflow-x-auto">
                  <table className="min-w-[900px] w-full text-sm">
                    <thead className="bg-[#2E3092] text-white text-left">
                      <tr>
                        <th className="py-3 px-4">{t("employees_pay_employee")}</th>
                        <th className="py-3 px-4">{t("employees_table_id")}</th>
                        <th className="py-3 px-4">{t("employees_table_department")}</th>
                        <th className="py-3 px-4">{t("employees_table_company")}</th>
                        <th className="py-3 px-4">{t("employees_pay_payment_status")}</th>
                        <th className="py-3 px-4">{t("employees_pay_last_active")}</th>
                        <th className="py-3 px-4 text-center">{t("employees_table_actions")}</th>
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

                          <td className="py-3 px-4">{e.empId}</td>
                          <td className="py-3 px-4">{e.department}</td>
                          <td className="py-3 px-4">{e.company}</td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${PAY_COLORS[e.paymentStatus]}`}
                            >
                              {t(`employees_pay_${e.paymentStatus.replace(" ", "_").toLowerCase()}`)}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {new Date(e.lastActive).toLocaleDateString()}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => markPaid(e.id)}
                                className="inline-flex items-center gap-1.5 text-[#2E3092] px-3 py-1.5 rounded-lg border border-[#d0d4ff]/70 hover:bg-[#f6f7ff]"
                              >
                                <BadgeCheck size={14} />
                                {t("employees_mark_paid")}
                              </button>

                              <button
                                onClick={() => suspendEmployee(e.id)}
                                className="inline-flex items-center gap-1.5 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50"
                              >
                                <PauseCircle size={14} />
                                {t("employees_suspend")}
                              </button>

                              <button
                                onClick={() => deleteEmployee(e.id)}
                                className="inline-flex items-center gap-1.5 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                                {t("employees_delete")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredPayments.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-gray-500">
                            {t("employees_no_results_pay")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid grid-cols-1 gap-3">
                  {filteredPayments.map((e) => (
                    <PayCard key={e.id} e={e} />
                  ))}
                  {filteredPayments.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-6">
                      {t("employees_no_results_pay")}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---------------- Add Employee Modal ---------------- */}
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
                  {t("employees_add_title")}
                </h2>
              </div>

              <form onSubmit={handleAddEmployee} className="grid sm:grid-cols-2 gap-4">

                {/* Full name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_full_name")}
                  </label>
                  <input
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    placeholder={t("employees_full_name_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_emp_id")}
                  </label>
                  <input
                    value={newEmp.empId}
                    onChange={(e) => setNewEmp({ ...newEmp, empId: e.target.value })}
                    placeholder={t("employees_emp_id_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_department")}
                  </label>
                  <input
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    placeholder={t("employees_department_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_company")}
                  </label>
                  <input
                    value={newEmp.company}
                    onChange={(e) => setNewEmp({ ...newEmp, company: e.target.value })}
                    placeholder={t("employees_company_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_join_date")}
                  </label>
                  <input
                    type="date"
                    value={newEmp.joinDate}
                    onChange={(e) => setNewEmp({ ...newEmp, joinDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* IBAN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_iban")}
                  </label>
                  <input
                    value={newEmp.iban}
                    onChange={(e) => setNewEmp({ ...newEmp, iban: e.target.value })}
                    placeholder={t("employees_iban_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* EID / Passport */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_eid_passport")}
                  </label>
                  <input
                    value={newEmp.eidPassport}
                    onChange={(e) => setNewEmp({ ...newEmp, eidPassport: e.target.value })}
                    placeholder={t("employees_eid_passport_placeholder")}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_status")}
                  </label>
                  <select
                    value={newEmp.status}
                    onChange={(e) => setNewEmp({ ...newEmp, status: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  >
                    <option value="Active">{t("employees_status_active")}</option>
                    <option value="Inactive">{t("employees_status_inactive")}</option>
                    <option value="Terminated">{t("employees_status_terminated")}</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("employees_payment_status")}
                  </label>
                  <select
                    value={newEmp.paymentStatus}
                    onChange={(e) => setNewEmp({ ...newEmp, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:ring-2 focus:ring-[#2E3092]/40"
                  >
                    <option value="Paid">{t("employees_pay_paid")}</option>
                    <option value="Not paid">{t("employees_pay_not_paid")}</option>
                    <option value="Failed">{t("employees_pay_failed")}</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    {t("cancel")}
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#2E3092] hover:bg-[#23246e] text-white rounded-lg shadow-sm inline-flex items-center gap-2"
                  >
                    <Plus size={16} />
                    {t("save")}
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

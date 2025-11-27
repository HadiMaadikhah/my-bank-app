import { useTranslation } from "react-i18next";
import {
  Building2,
  Users2,
  Wallet,
  Clock4,
  ArrowUpRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

export default function WpsDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa" || i18n.language === "ar";

  // ----- Demo WPS Counts -----
  const stats = {
    companies: 42,
    employees: 1280,
    paidThisMonth: 2360000,
    pending: 47,
  };

  // ----- Salary Distribution Chart -----
  const chartData = [
    { name: "Company A", value: 35 },
    { name: "Company B", value: 25 },
    { name: "Company C", value: 20 },
    { name: "Others", value: 20 },
  ];

  const COLORS = ["#2E3092", "#4C51BF", "#A3A8F0", "#CBD5E0"];

  // ----- Salary Flow Chart -----
  const flowData = [
    { month: "Aug", value: 2100000 },
    { month: "Sep", value: 2240000 },
    { month: "Oct", value: 2310000 },
    { month: "Nov", value: 2360000 },
  ];

  // ----- Recent Activity -----
  const activity = [
    {
      id: 1,
      company: "BlueWave Technologies",
      amount: "AED 122,000",
      date: "Nov 28, 2025",
      status: "Paid",
    },
    {
      id: 2,
      company: "Astra Logistics",
      amount: "AED 54,000",
      date: "Nov 28, 2025",
      status: "Processing",
    },
    {
      id: 3,
      company: "Al Mareefa LLC",
      amount: "AED 87,400",
      date: "Nov 27, 2025",
      status: "Rejected",
    },
  ];

  return (
    <div className={`space-y-6 p-6 ${isRTL ? "text-right" : "text-left"}`}>

      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-[#2E3092]">
          {t("wps_overview_title")}
        </h1>
        <p className="text-gray-600">
          {t("wps_overview_subtitle")}
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Companies */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E3092]/10 flex items-center justify-center">
            <Building2 className="text-[#2E3092]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("wps_total_companies")}</p>
            <p className="text-xl font-semibold text-[#2E3092]">{stats.companies}</p>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E3092]/10 flex items-center justify-center">
            <Users2 className="text-[#2E3092]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("wps_total_employees")}</p>
            <p className="text-xl font-semibold text-[#2E3092]">{stats.employees}</p>
          </div>
        </div>

        {/* Paid This Month */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E3092]/10 flex items-center justify-center">
            <Wallet className="text-[#2E3092]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("wps_total_payments")}</p>
            <p className="text-xl font-semibold text-[#2E3092]">
              AED {stats.paidThisMonth.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E3092]/10 flex items-center justify-center">
            <Clock4 className="text-[#2E3092]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("wps_pending_salaries")}</p>
            <p className="text-xl font-semibold text-[#2E3092]">{stats.pending}</p>
          </div>
        </div>

      </div>

      {/* SECTION 2 — DONUT CHART */}
      <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2E3092] mb-4">
          {t("wps_salary_distribution")}
        </h2>

        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-full md:w-1/2 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            {chartData.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full block"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></span>
                <span className="text-sm font-medium text-gray-700">
                  {entry.name} — {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — Salary Flow */}
      <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2E3092] mb-5">
          {t("wps_salary_flow")}
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={flowData}>
            <XAxis dataKey="month" stroke="#8083b8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2E3092" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 4 — Recent Activities */}
      <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2E3092] mb-4">
          {t("wps_recent_activity")}
        </h2>

        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-xl border border-[#e1e4ff] bg-white hover:shadow transition"
            >
              <div>
                <p className="font-semibold text-[#2E3092]">{item.company}</p>
                <p className="text-sm text-gray-600">{item.amount}</p>
              </div>

              <div className={`${isRTL ? "text-left" : "text-right"}`}>
                <p className="text-sm text-gray-600">{item.date}</p>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

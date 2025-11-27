// src/pages/Dashboard.jsx
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  RefreshCw,
  Save,
  Wallet,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import WpsPageLayout from "@/components/WpsPageLayout";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  // ---------- Demo Data (Not Translated) ----------
  const demoProfiles = useMemo(
    () => ({
      Personal: [
        {
          id: 1,
          name: "Savings Account",
          number: "123-4567890",
          balance: 52430,
          salary: true,
          transactions: [
            { id: 1, type: "Salary Credit", amount: "+AED 12,000", date: "Nov 01, 2025" },
            { id: 2, type: "ATM Withdrawal", amount: "-AED 500", date: "Oct 29, 2025" },
            { id: 3, type: "Utility Bill", amount: "-AED 240", date: "Oct 28, 2025" },
            { id: 4, type: "Transfer In", amount: "+AED 1,000", date: "Oct 27, 2025" },
            { id: 5, type: "Grocery Payment", amount: "-AED 150", date: "Oct 26, 2025" },
          ],
        },
        {
          id: 2,
          name: "Current Account",
          number: "987-6543210",
          balance: 18940,
          salary: false,
          transactions: [
            { id: 1, type: "Transfer Out", amount: "-AED 2,000", date: "Oct 30, 2025" },
            { id: 2, type: "Salary Credit", amount: "+AED 8,000", date: "Oct 27, 2025" },
            { id: 3, type: "POS Payment", amount: "-AED 100", date: "Oct 25, 2025" },
            { id: 4, type: "Bill Payment", amount: "-AED 200", date: "Oct 24, 2025" },
            { id: 5, type: "ATM Withdrawal", amount: "-AED 500", date: "Oct 23, 2025" },
          ],
        },
      ],
      Business: [
        {
          id: 3,
          name: "Corporate Main",
          number: "556-7821345",
          balance: 180600,
          salary: false,
          transactions: [
            { id: 1, type: "Vendor Payment", amount: "-AED 12,000", date: "Oct 31, 2025" },
            { id: 2, type: "Client Deposit", amount: "+AED 45,000", date: "Oct 25, 2025" },
            { id: 3, type: "Transfer Out", amount: "-AED 8,200", date: "Oct 22, 2025" },
            { id: 4, type: "Service Fee", amount: "-AED 300", date: "Oct 20, 2025" },
            { id: 5, type: "Transfer In", amount: "+AED 10,000", date: "Oct 18, 2025" },
          ],
        },
      ],
      Joint: [
        {
          id: 4,
          name: "Joint Account",
          number: "224-1100987",
          balance: 75600,
          salary: false,
          transactions: [
            { id: 1, type: "Deposit", amount: "+AED 25,000", date: "Nov 01, 2025" },
            { id: 2, type: "Transfer Out", amount: "-AED 2,000", date: "Oct 30, 2025" },
            { id: 3, type: "Payment Received", amount: "+AED 1,200", date: "Oct 29, 2025" },
            { id: 4, type: "Bill Payment", amount: "-AED 500", date: "Oct 28, 2025" },
            { id: 5, type: "POS Payment", amount: "-AED 200", date: "Oct 27, 2025" },
          ],
        },
      ],
    }),
    []
  );

  const [activeProfile, setActiveProfile] = useState("Personal");
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const accounts = demoProfiles[activeProfile];
  const selectedAccount =
    accounts.find((a) => a.id === selectedAccountId) || null;

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  // Chart Data
  const chartData = accounts.map((acc) => ({
    name: acc.name,
    value: parseFloat(((acc.balance / totalBalance) * 100).toFixed(1)),
  }));

  const COLORS = ["#2E3092", "#4C51BF", "#A3A8F0", "#CBD5E0"];

  const handleSetAsSalary = () => toast.success(t("set_salary_success"));
  const handleRefreshTx = () => toast.info(t("refresh_msg"));
  const handleSaveChanges = () => toast.success(t("save_msg"));

  return (
    <WpsPageLayout
      title="dashboard_title"
      subtitle="dashboard_subtitle"
    >
      <div className={`${isRTL ? "text-right" : "text-left"} space-y-10`}>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            {
              icon: <Wallet size={22} />,
              title: t("total_balance"),
              value: `AED ${totalBalance.toLocaleString()}`,
            },
            {
              icon: <Users size={22} />,
              title: t("total_accounts"),
              value: accounts.length,
            },
            {
              icon: <CreditCard size={22} />,
              title: t("salary_account"),
              value: accounts.find((a) => a.salary)?.name || t("none"),
            },
            {
              icon: <TrendingUp size={22} />,
              title: t("avg_balance"),
              value: `AED ${
                accounts.length > 0
                  ? (totalBalance / accounts.length).toFixed(0)
                  : 0
              }`,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] rounded-2xl p-5 shadow-lg flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2E3092]/10 flex items-center justify-center text-[#2E3092]">
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-lg font-semibold text-[#1c1f4a]">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#d9dcff] shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#2E3092] mb-4">
            {t("balance_distribution")}
          </h2>

          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Chart */}
            <div className="w-full md:w-1/2 h-64">
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
            <div className="w-full md:w-1/2 flex flex-col gap-3">
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
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profiles Tabs */}
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#2E3092] mb-2">
              {t("profiles")}
            </h2>

            <div
              className={`flex flex-wrap gap-2 ${
                isRTL ? "justify-end" : "justify-start"
              }`}
            >
              {Object.keys(demoProfiles).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setActiveProfile(p);
                    setSelectedAccountId(null);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition 
                    ${
                      activeProfile === p
                        ? "bg-[#2E3092] text-white shadow-md"
                        : "bg-white/80 border border-[#2E3092]/30 text-[#2E3092] hover:bg-[#2E3092]/10"
                    }`}
                >
                  {t(`profile_${p.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="text-lg font-semibold text-[#2E3092] mb-3">
              {t("accounts")}
            </h2>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccountId(acc.id)}
                  className={`border rounded-xl p-4 bg-white/80 backdrop-blur-xl shadow-md cursor-pointer transition
                    ${
                      selectedAccountId === acc.id
                        ? "border-[#2E3092] ring-2 ring-[#2E3092]/20"
                        : "border-[#d9dcff]"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#2E3092] font-semibold">{acc.name}</h3>
                    {acc.salary && <CheckCircle2 className="text-green-500" />}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{acc.number}</p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {t("balance")}{" "}
                    <span className="text-[#2E3092]">
                      AED {acc.balance.toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          {selectedAccount && (
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#2E3092]">
                  {t("last_transactions")} — {selectedAccount.name}
                </h2>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSetAsSalary}
                    className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-3 py-2 rounded-md text-sm"
                  >
                    <CheckCircle2 size={16} />
                    {t("set_salary")}
                  </button>

                  <button
                    onClick={handleRefreshTx}
                    className="inline-flex items-center gap-2 bg-white border border-[#2E3092]/40 text-[#2E3092] hover:bg-[#2E3092]/5 px-3 py-2 rounded-md text-sm"
                  >
                    <RefreshCw size={16} />
                    {t("refresh")}
                  </button>

                  <button
                    onClick={handleSaveChanges}
                    className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Save size={16} />
                    {t("save")}
                  </button>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow border border-[#d9dcff] overflow-x-auto">
                <table
                  className={`w-full text-sm min-w-[500px] ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <thead className="bg-[#2E3092] text-white">
                    <tr>
                      <th className="py-3 px-4">{t("date")}</th>
                      <th className="py-3 px-4">{t("type")}</th>
                      <th className="py-3 px-4">{t("amount")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedAccount.transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="py-2 px-4">{tx.date}</td>
                        <td className="py-2 px-4">{tx.type}</td>
                        <td
                          className={`py-2 px-4 font-medium ${
                            tx.amount.startsWith("-")
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </WpsPageLayout>
  );
}

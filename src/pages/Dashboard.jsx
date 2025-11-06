import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Banknote,
  Building2,
  HandCoins,
  Headphones,
  CheckCircle2,
  RefreshCw,
  Save,
  Menu,
  X,
} from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()

  // ---------- Demo Data ----------
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
  )

  const [activeProfile, setActiveProfile] = useState("Personal")
const [selectedAccountId, setSelectedAccountId] = useState(null)
const [activeMenu, setActiveMenu] = useState("")       // ← مقدار اولیه خالی
const [activeSubMenu, setActiveSubMenu] = useState("") // ← برای WPS زیرمنو
const [sidebarOpen, setSidebarOpen] = useState(false)



  const accounts = demoProfiles[activeProfile]
  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || null

  const sidebarItems = [
    { key: "Banking", label: "Banking", icon: Banknote },
    { key: "Facilities", label: "Facilities", icon: Building2 },
    { key: "Requests", label: "Requests", icon: HandCoins },
    { key: "Customer Service", label: "Customer Service", icon: Headphones },
  ]

  const handleSetAsSalary = () =>
    toast.success("Salary account updated successfully.")
  const handleRefreshTx = () => toast.info("Refreshing transactions...")
  const handleSaveChanges = () => toast.success("Changes saved successfully.")

  const COLORS = ["#2E3092", "#4C51BF", "#A3A8F0", "#CBD5E0"]
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const chartData = accounts.map((acc) => ({
    name: acc.name,
    value: parseFloat(((acc.balance / totalBalance) * 100).toFixed(1)),
  }))

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Sidebar */}
      <aside
  className={`fixed top-0 left-0 h-screen w-64 bg-[#2E3092] text-white flex flex-col py-6 transform transition-transform duration-300 z-50
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0`}
>
  <div className="px-6 pb-5 border-b border-white/15 flex justify-between items-center">
    <div>
      <h2 className="text-lg font-semibold tracking-wide">Customer Portal</h2>
      <p className="text-xs text-white/70">Welcome to MyBank</p>
    </div>
    <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
      <X size={20} />
    </button>
  </div>

  {/* Navigation */}
  <nav className="mt-4 flex-1 space-y-1 px-3 text-sm">
    {/* Banking */}
    <button
      onClick={() => setActiveMenu("Banking")}
      className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
        activeMenu === "Banking" ? "bg-white text-[#2E3092]" : "hover:bg-white/10 text-white/90"
      }`}
    >
      <Banknote size={18} />
      <span>Banking</span>
    </button>

    {/* Facilities */}
    <div>
      <button
        onClick={() => setActiveMenu(activeMenu === "Facilities" ? "" : "Facilities")}
        className={`w-full text-left flex items-center justify-between px-4 py-2 rounded-md transition ${
          activeMenu === "Facilities"
            ? "bg-white text-[#2E3092]"
            : "hover:bg-white/10 text-white/90"
        }`}
      >
        <span className="flex items-center gap-3">
          <Building2 size={18} />
          Facilities
        </span>
        <span className="text-xs">{activeMenu === "Facilities" ? "−" : "+"}</span>
      </button>

      {/* Facilities submenu */}
      {activeMenu === "Facilities" && (
        <div className="ml-6 mt-1 space-y-1">
          {/* WPS Module */}
          <div>
            <button
              onClick={() => {
    const next = activeSubMenu === "WPS" ? "" : "WPS";
    setActiveSubMenu(next);
    // ✅ در زمان باز شدن، به صفحه WPS هدایت کن
    if (next === "WPS") navigate("/wps");
  }}
  className="w-full text-left px-3 py-1 rounded-md hover:bg-white/10"
>
  WPS Module {activeSubMenu === "WPS" ? "−" : "+"}
            </button>
            {activeSubMenu === "WPS" && (
              <div className="ml-4 mt-1 space-y-1">
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Register / Deregister
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Companies
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Employees
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Salary Payment
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Refund
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Reports
                </button>
              </div>
            )}
          </div>

          {/* Module A & B */}
          <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
            Module A
          </button>
          <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
            Module B
          </button>
        </div>
      )}
    </div>

    {/* Customer Services */}
    <button
      onClick={() => setActiveMenu("Customer")}
      className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
        activeMenu === "Customer"
          ? "bg-white text-[#2E3092]"
          : "hover:bg-white/10 text-white/90"
      }`}
    >
      <Headphones size={18} />
      <span>Customer Services</span>
    </button>

    {/* Reports */}
    <button
      onClick={() => setActiveMenu("Reports")}
      className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
        activeMenu === "Reports"
          ? "bg-white text-[#2E3092]"
          : "hover:bg-white/10 text-white/90"
      }`}
    >
      <Save size={18} />
      <span>Reports</span>
    </button>
  </nav>

  <div className="mt-auto px-6 pt-4 pb-2 border-t border-white/10 text-xs text-white/65">
    © 2025 MyBank UAE
  </div>
</aside>


      {/* Overlay (mobile only) */}
      {sidebarOpen && (
      <div
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
    />
  )}


      {/* Main Content */}
  <main className="md:ml-64 p-4 md:p-8 overflow-y-auto transition-all duration-300">
        {/* Header for mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            className="text-[#2E3092]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-[#2E3092]">Dashboard</h1>
          <div className="w-6" />
        </div>

        <h1 className="hidden md:block text-2xl font-bold text-[#2E3092] mb-6">
          Dashboard
        </h1>

        {/* Chart Section */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-[#2E3092] mb-4">
            Account Balance Distribution
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Profiles */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#2E3092] mb-2">Profiles</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(demoProfiles).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setActiveProfile(p)
                  setSelectedAccountId(null)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeProfile === p
                    ? "bg-[#2E3092] text-white"
                    : "bg-white border border-[#2E3092]/35 text-[#2E3092] hover:bg-[#2E3092]/10"
                }`}
              >
                {p} Profile
              </button>
            ))}
          </div>
        </section>

        {/* Accounts & Transactions */}
        <section className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-[#2E3092] mb-3">
              {activeProfile} Accounts
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccountId(acc.id)}
                  className={`border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer ${
                    selectedAccountId === acc.id
                      ? "border-[#2E3092] ring-2 ring-[#2E3092]/20"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#2E3092] font-semibold">{acc.name}</h3>
                    {acc.salary && (
                      <CheckCircle2 className="text-green-500" title="Salary Account" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{acc.number}</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    Balance:{" "}
                    <span className="text-[#2E3092]">
                      AED {acc.balance.toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selectedAccount && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-3">
                <h2 className="text-xl font-semibold text-[#2E3092]">
                  Last 5 Transactions — {selectedAccount.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSetAsSalary}
                    className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-3 py-2 rounded-md text-sm transition"
                  >
                    <CheckCircle2 size={16} />
                    Set as Salary
                  </button>
                  <button
                    onClick={handleRefreshTx}
                    className="inline-flex items-center gap-2 bg-white border border-[#2E3092]/40 text-[#2E3092] hover:bg-[#2E3092]/5 px-3 py-2 rounded-md text-sm transition"
                  >
                    <RefreshCw size={16} />
                    Refresh
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-3 py-2 rounded-md text-sm transition"
                  >
                    <Save size={16} />
                    Save
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-[#2E3092] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Amount</th>
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
      </main>
    </div>
  )
}

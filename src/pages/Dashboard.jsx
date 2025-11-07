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
  CheckCircle2,
  RefreshCw,
  Save,
  Menu,
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

  const accounts = demoProfiles[activeProfile]
  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || null

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
      {/* Main Content */}
      <main className="p-4 md:p-8 overflow-y-auto transition-all duration-300">
        {/* Header for mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button className="text-[#2E3092]">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-[#2E3092]">Banking</h1>
          <div className="w-6" />
        </div>

        <h1 className="hidden md:block text-2xl font-bold text-[#2E3092] mb-6">
          Banking
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

import { useState } from "react";
import {
  Building2,
  Users,
  DollarSign,
  FileBarChart,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  UserPlus,
  Receipt,
  LogOut,
  ArrowLeft,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "BlueWave Technologies FZCO",
    employees: 8,
    salaryHistory: [
      {
        month: "August 2025",
        totalPaid: 62000,
        details: [
          { id: 1, name: "Michael Torres", amount: 8500, date: "Aug 28, 2025" },
          { id: 2, name: "Sara Nguyen", amount: 7800, date: "Aug 28, 2025" },
        ],
      },
      {
        month: "September 2025",
        totalPaid: 64800,
        details: [
          { id: 1, name: "Daniel Kim", amount: 6200, date: "Sep 27, 2025" },
          { id: 2, name: "Liam Patel", amount: 9800, date: "Sep 27, 2025" },
        ],
      },
      {
        month: "October 2025",
        totalPaid: 66700,
        details: [
          { id: 1, name: "Emma Brooks", amount: 8700, date: "Oct 28, 2025" },
          { id: 2, name: "Olivia Park", amount: 9100, date: "Oct 28, 2025" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Astra Logistics & Shipping",
    employees: 9,
    salaryHistory: [
      {
        month: "August 2025",
        totalPaid: 54300,
        details: [
          { id: 1, name: "Lucas Bennett", amount: 9400, date: "Aug 29, 2025" },
          { id: 2, name: "Mia Gonzalez", amount: 6600, date: "Aug 29, 2025" },
        ],
      },
      {
        month: "September 2025",
        totalPaid: 55900,
        details: [
          { id: 1, name: "David Chen", amount: 7200, date: "Sep 27, 2025" },
          { id: 2, name: "Sophie Klein", amount: 5900, date: "Sep 27, 2025" },
        ],
      },
      {
        month: "October 2025",
        totalPaid: 57500,
        details: [
          { id: 1, name: "Ethan Johnson", amount: 6100, date: "Oct 26, 2025" },
          { id: 2, name: "Aria Wilson", amount: 5200, date: "Oct 26, 2025" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Falcon Energy Systems LLC",
    employees: 11,
    salaryHistory: [
      {
        month: "August 2025",
        totalPaid: 61000,
        details: [
          { id: 1, name: "Grace Lee", amount: 7800, date: "Aug 25, 2025" },
          { id: 2, name: "Jack Taylor", amount: 8100, date: "Aug 25, 2025" },
        ],
      },
      {
        month: "September 2025",
        totalPaid: 62500,
        details: [
          { id: 1, name: "Sophia Adams", amount: 7000, date: "Sep 26, 2025" },
          { id: 2, name: "Henry Davis", amount: 8900, date: "Sep 26, 2025" },
        ],
      },
      {
        month: "October 2025",
        totalPaid: 64000,
        details: [
          { id: 1, name: "Ava Martinez", amount: 7400, date: "Oct 28, 2025" },
          { id: 2, name: "William Scott", amount: 6700, date: "Oct 28, 2025" },
        ],
      },
    ],
  },
];

export default function WpsPage() {
  const [openCompany, setOpenCompany] = useState(null);
  const [openMonth, setOpenMonth] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* --- Header Top Bar --- */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        {/* سمت چپ */}
        <div className="flex items-center gap-3">
          <UserCircle className="text-[#2E3092]" size={28} />
          <div>
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-semibold text-[#2E3092]">hadi Maadikhah</p>
          </div>
        </div>

        {/* سمت راست */}
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-[#2E3092] border border-[#2E3092]/40 px-3 py-2 rounded-md hover:bg-[#2E3092]/10 transition text-sm"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-[#2E3092] text-white px-3 py-2 rounded-md hover:bg-[#23246e] transition text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* --- Page Header --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2E3092]">WPS Module</h1>
        <button className="flex items-center gap-2 bg-[#2E3092] text-white px-3 py-2 rounded-lg hover:bg-[#24256f] transition">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* --- Quick Access --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { icon: <UserPlus size={20} />, label: "Register / Deregister" },
          { icon: <Building2 size={20} />, label: "Companies" },
          { icon: <Users size={20} />, label: "Employees" },
          { icon: <DollarSign size={20} />, label: "Salary Payment" },
          { icon: <Receipt size={20} />, label: "Refund" },
          { icon: <FileBarChart size={20} />, label: "Reports" },
        ].map((item, i) => (
          <button
            key={i}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="text-[#2E3092]">{item.icon}</div>
            <span className="text-xs font-medium text-[#2E3092] text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* --- Company List --- */}
      <div className="space-y-4">
        {companies.map((company) => {
          const isOpen = openCompany === company.id;

          return (
            <div
              key={company.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Company Header */}
              <button
                onClick={() => {
                  setOpenCompany(isOpen ? null : company.id);
                  setOpenMonth(null);
                }}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
              >
                <div>
                  <h2 className="text-[#2E3092] font-semibold">{company.name}</h2>
                  <p className="text-sm text-gray-500">
                    {company.employees} Employees
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="text-[#2E3092]" />
                ) : (
                  <ChevronDown className="text-[#2E3092]" />
                )}
              </button>

              {/* Company Details */}
              {isOpen && (
                <div className="px-5 pb-5 pt-3 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-[#2E3092] mb-2">
                    Salary Payments (Last 3 Months)
                  </h3>

                  {company.salaryHistory.map((month, index) => {
                    const isMonthOpen =
                      openMonth?.companyId === company.id &&
                      openMonth?.month === month.month;

                    return (
                      <div
                        key={index}
                        className="border rounded-lg mb-2 bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center justify-between px-4 py-2">
                          <span className="text-sm font-medium text-[#2E3092]">
                            {month.month}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                              Total Paid:{" "}
                              <b className="text-[#2E3092]">
                                AED {month.totalPaid.toLocaleString()}
                              </b>
                            </span>
                            <button
                              onClick={() =>
                                setOpenMonth(
                                  isMonthOpen
                                    ? null
                                    : { companyId: company.id, month: month.month }
                                )
                              }
                              className="flex items-center gap-1 text-sm text-[#2E3092] hover:underline"
                            >
                              <Info size={14} />
                              Payment Details
                            </button>
                          </div>
                        </div>

                        {/* Employee Payment Details */}
                        {isMonthOpen && (
                          <div className="px-4 pb-3 animate-fadeIn">
                            <table className="w-full text-sm mt-2 bg-white rounded-md overflow-hidden border border-gray-200">
                              <thead className="bg-[#2E3092] text-white">
                                <tr>
                                  <th className="py-2 px-3 text-left">Employee</th>
                                  <th className="py-2 px-3 text-left">Amount</th>
                                  <th className="py-2 px-3 text-left">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {month.details.map((d) => (
                                  <tr
                                    key={d.id}
                                    className="border-t hover:bg-gray-50 transition"
                                  >
                                    <td className="py-2 px-3">{d.name}</td>
                                    <td className="py-2 px-3 text-[#2E3092] font-medium">
                                      AED {d.amount.toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3 text-gray-600">
                                      {d.date}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

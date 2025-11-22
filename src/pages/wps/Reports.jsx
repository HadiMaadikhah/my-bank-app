import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const companies = [
  {
    id: 1,
    name: "BlueWave Technologies FZCO",
    employees: 8,
    salaryHistory: [
      { month: "August 2025", totalPaid: 62000, details: [
        { id: 1, name: "Michael Torres", amount: 8500, date: "Aug 28, 2025" },
        { id: 2, name: "Sara Nguyen", amount: 7800, date: "Aug 28, 2025" },
      ]},
      { month: "September 2025", totalPaid: 64800, details: [
        { id: 1, name: "Daniel Kim", amount: 6200, date: "Sep 27, 2025" },
        { id: 2, name: "Liam Patel", amount: 9800, date: "Sep 27, 2025" },
      ]},
      { month: "October 2025", totalPaid: 66700, details: [
        { id: 1, name: "Emma Brooks", amount: 8700, date: "Oct 28, 2025" },
        { id: 2, name: "Olivia Park", amount: 9100, date: "Oct 28, 2025" },
      ]},
    ],
  },
  {
    id: 2,
    name: "Astra Logistics & Shipping",
    employees: 9,
    salaryHistory: [
      { month: "August 2025", totalPaid: 54300, details: [
        { id: 1, name: "Lucas Bennett", amount: 9400, date: "Aug 29, 2025" },
        { id: 2, name: "Mia Gonzalez", amount: 6600, date: "Aug 29, 2025" },
      ]},
      { month: "September 2025", totalPaid: 55900, details: [
        { id: 1, name: "David Chen", amount: 7200, date: "Sep 27, 2025" },
        { id: 2, name: "Sophie Klein", amount: 5900, date: "Sep 27, 2025" },
      ]},
      { month: "October 2025", totalPaid: 57500, details: [
        { id: 1, name: "Ethan Johnson", amount: 6100, date: "Oct 26, 2025" },
        { id: 2, name: "Aria Wilson", amount: 5200, date: "Oct 26, 2025" },
      ]},
    ],
  },
];

export default function Reports() {
  const { t } = useTranslation();
  const [openCompany, setOpenCompany] = useState(null);
  const [openMonth, setOpenMonth] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 sm:p-10">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[#2E3092]">
          {t("reports_title")}
        </h1>
        <p className="text-gray-600 mt-1">{t("reports_subtitle")}</p>
      </div>

      {/* --- Company List --- */}
      <div className="space-y-5 mt-8">
        {companies.map((company) => {
          const isOpen = openCompany === company.id;

          return (
            <div
              key={company.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Company Header */}
              <button
                onClick={() => {
                  setOpenCompany(isOpen ? null : company.id);
                  setOpenMonth(null);
                }}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-gradient-to-r from-[#2E3092]/10 to-[#4c51bf]/5 hover:from-[#2E3092]/20 transition-all"
              >
                <div>
                  <h2 className="text-[#2E3092] font-semibold text-lg">
                    {company.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {company.employees} {t("reports_employees")}
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
                <div className="px-6 pb-6 pt-3 border-t border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-[#2E3092] mb-3">
                    {t("reports_last3months")}
                  </h3>

                  {company.salaryHistory.map((month, index) => {
                    const isMonthOpen =
                      openMonth?.companyId === company.id &&
                      openMonth?.month === month.month;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl mb-3 bg-white hover:shadow transition-all duration-200"
                      >
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-sm font-medium text-[#2E3092]">
                            {month.month}
                          </span>

                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                              {t("reports_total_paid")}:{" "}
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
                              {t("reports_details")}
                            </button>
                          </div>
                        </div>

                        {/* Employee Payment Details */}
                        {isMonthOpen && (
                          <div className="px-4 pb-4 animate-fadeIn">
                            <table className="w-full text-sm mt-2 bg-white rounded-lg overflow-hidden border border-gray-200">
                              <thead className="bg-[#2E3092] text-white">
                                <tr>
                                  <th className="py-2 px-3 text-left">
                                    {t("reports_employee")}
                                  </th>
                                  <th className="py-2 px-3 text-left">
                                    {t("reports_amount")}
                                  </th>
                                  <th className="py-2 px-3 text-left">
                                    {t("reports_date")}
                                  </th>
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

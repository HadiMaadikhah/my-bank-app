// src/pages/wps/Reports.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import WpsPageLayout from "@/components/WpsPageLayout";

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
];

export default function Reports() {
  const { t, i18n } = useTranslation();
  const [openCompany, setOpenCompany] = useState(null);
  const [openMonth, setOpenMonth] = useState(null);

  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  return (
    <WpsPageLayout
      title="reports_title"
      subtitle="reports_subtitle"
    >
      <div className="space-y-5 mt-2">
        {companies.map((company) => {
          const isOpen = openCompany === company.id;

          return (
            <div
              key={company.id}
              className="bg-white rounded-2xl border border-[#e1e4ff] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Company Header */}
              <button
                onClick={() => {
                  setOpenCompany(isOpen ? null : company.id);
                  setOpenMonth(null);
                }}
                className={`w-full flex items-center justify-between px-5 sm:px-6 py-4 
                  bg-gradient-to-r from-[#2E3092]/10 to-[#4c51bf]/5 
                  hover:from-[#2E3092]/18 transition-all
                  ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h2 className="text-[#2E3092] font-semibold text-base sm:text-lg">
                    {company.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {company.employees} {t("reports_employees")}
                  </p>
                </div>

                <div className="flex items-center">
                  {isOpen ? (
                    <ChevronUp className="text-[#2E3092]" />
                  ) : (
                    <ChevronDown className="text-[#2E3092]" />
                  )}
                </div>
              </button>

              {/* Company Details */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#e5e7ff] bg-[#f7f8ff]/60">
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
                        className="border border-[#e1e4ff] rounded-xl mb-3 bg-white hover:shadow-sm transition-all duration-200"
                      >
                        {/* Month Row */}
                        <div
                          className={`flex items-center justify-between px-4 py-3 ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-sm font-medium text-[#2E3092]">
                            {month.month}
                          </span>

                          <div
                            className={`flex items-center gap-3 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
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
                          <div className="px-4 pb-4 animate-fade-in">
                            <div className="overflow-x-auto rounded-lg border border-[#e1e4ff] mt-2">
                              <table className="w-full text-sm bg-white">
                                <thead className="bg-[#2E3092] text-white">
                                  <tr>
                                    <th
                                      className={`py-2 px-3 ${
                                        isRTL ? "text-right" : "text-left"
                                      }`}
                                    >
                                      {t("reports_employee")}
                                    </th>
                                    <th
                                      className={`py-2 px-3 ${
                                        isRTL ? "text-right" : "text-left"
                                      }`}
                                    >
                                      {t("reports_amount")}
                                    </th>
                                    <th
                                      className={`py-2 px-3 ${
                                        isRTL ? "text-right" : "text-left"
                                      }`}
                                    >
                                      {t("reports_date")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {month.details.map((d) => (
                                    <tr
                                      key={d.id}
                                      className="border-t border-[#eef0ff] hover:bg-[#f7f8ff] transition"
                                    >
                                      <td className="py-2 px-3">
                                        {d.name}
                                      </td>
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
    </WpsPageLayout>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Headphones,
  HandCoins,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const [openFacilities, setOpenFacilities] = useState(true);
  const [openWps, setOpenWps] = useState(true);

  const { t, i18n } = useTranslation();

  // --------------------------
  //  RTL detection (AR + FA)
  // --------------------------
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  const linkClass = ({ isActive }) =>
    `flex items-center ${
      isRTL ? "flex-row-reverse" : "flex-row"
    } gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "bg-[#2E3092]/90 text-white shadow-md scale-[1.02]"
         : "text-[#1c1f4a]/80 hover:bg-[#e9ebff]/80 hover:text-[#2E3092]"
     }`;

  return (
    <aside
      className={`flex flex-col w-64 bg-gradient-to-b from-[#f9faff]/90 via-[#eef0ff]/85 to-[#e3e6ff]/85 
        text-[#1c1f4a] h-full shadow-xl border-r border-[#cfd2ff]/70 
        backdrop-blur-md transition-all duration-300 ${
          isRTL ? "text-right" : "text-left"
        }`}
    >
      {/* Header */}
      <div className="p-5 text-center border-b border-[#d6d9ff]/50 bg-white/70 backdrop-blur-lg shadow-sm">
        <div
          className={`flex items-center justify-center gap-2 ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Building2 size={22} className="text-[#2E3092]" />
          <h2 className="text-lg font-semibold text-[#2E3092]">
            {t("header_bank")}
          </h2>
        </div>
        <p className="text-xs text-[#2E3092]/70">{t("header_portal")}</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-2 px-3 overflow-y-auto custom-scroll">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClass} onClick={onNavigate}>
          <LayoutDashboard size={18} className={`${isRTL ? "order-2" : ""}`} />
          <span className={`${isRTL ? "order-1" : ""}`}>
            {t("dashboard_title")}
          </span>
        </NavLink>

        {/* FACILITIES */}
        <div className="mt-2">
          <button
            onClick={() => setOpenFacilities(!openFacilities)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium 
              text-[#1c1f4a]/90 hover:bg-white/70 transition-all"
          >
            <span
              className={`flex items-center gap-3 ${
                isRTL ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Building2 size={18} className={`${isRTL ? "order-2" : ""}`} />
              <span className={`${isRTL ? "order-1" : ""}`}>
                {t("menu_facilities")}
              </span>
            </span>

            {openFacilities ? (
              <ChevronDown size={16} className="text-[#2E3092]" />
            ) : (
              <ChevronRight size={16} className="text-[#2E3092]" />
            )}
          </button>

          {/* Facilities Inner */}
          {openFacilities && (
            <div
              className={`mt-1 space-y-1 ${
                isRTL
                  ? "pr-5 border-r border-[#cfd3ff]/50"
                  : "pl-5 border-l border-[#cfd3ff]/50"
              }`}
            >
              {/* WPS */}
              <button
                onClick={() => setOpenWps(!openWps)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm 
                text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 transition-all"
              >
                <span
                  className={`flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  {t("menu_wps_module")}
                </span>

                {openWps ? (
                  <ChevronDown size={14} className="text-[#2E3092]" />
                ) : (
                  <ChevronRight size={14} className="text-[#2E3092]" />
                )}
              </button>

              {/* WPS Inner Items */}
              {openWps && (
                <div
                  className={`mt-1 space-y-1 text-sm ${
                    isRTL ? "pr-4" : "pl-4"
                  }`}
                >
                  {[
                    { to: "/wps/register", label: t("menu_register") },
                    { to: "/wps/companies", label: t("menu_companies") },
                    { to: "/wps/employees", label: t("menu_employees") },
                    { to: "/wps/salary", label: t("menu_salary") },
                    { to: "/wps/refund", label: t("menu_refund") },
                    { to: "/wps/reports", label: t("menu_reports") },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block py-1.5 px-3 rounded-md transition ${
                          isActive
                            ? "bg-[#e6e7ff] text-[#2E3092] font-semibold"
                            : "text-[#1c1f4a]/80 hover:text-[#2E3092]"
                        }`
                      }
                      onClick={onNavigate}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Other Modules */}
              <div className="pt-2 border-t border-[#e5e6ff]/70 mt-2 space-y-1">
                <NavLink
                  to="#"
                  className="block py-1.5 px-3 rounded-md text-sm text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 transition"
                  onClick={onNavigate}
                >
                  Module A
                </NavLink>
                <NavLink
                  to="#"
                  className="block py-1.5 px-3 rounded-md text-sm text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 transition"
                  onClick={onNavigate}
                >
                  Module B
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* REQUESTS */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <HandCoins size={18} className={`${isRTL ? "order-2" : ""}`} />
          <span className={`${isRTL ? "order-1" : ""}`}>
            {t("menu_requests")}
          </span>
        </NavLink>

        {/* CUSTOMER SERVICES */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <Headphones size={18} className={`${isRTL ? "order-2" : ""}`} />
          <span className={`${isRTL ? "order-1" : ""}`}>
            {t("menu_customer_services")}
          </span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-[#d3d7ff]/50 text-xs text-center text-[#2E3092]/70 bg-white/70 backdrop-blur-md">
        <p className="font-medium">© 2025 MyBank UAE</p>
        <p className="text-[11px] text-[#2E3092]/60">{t("menu_footer")}</p>
      </div>
    </aside>
  );
}

// src/components/Sidebar.jsx

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
  Layers,
  FolderKanban,
} from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  const [facOpen, setFacOpen] = useState(true);
  const [wpsOpen, setWpsOpen] = useState(true);

  /* MAIN MENU LINK */
  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-2.5 rounded-xl text-[0.92rem] font-medium transition-all
    ${isRTL ? "flex-row-reverse justify-end text-right" : "flex-row justify-start text-left"}
    ${
      isActive
        ? "bg-[#2E3092]/90 text-white shadow-md"
        : "text-[#1c1f4a]/80 hover:bg-[#eceeff] hover:text-[#2E3092]"
    }
  `;

  /* SUBMENU LINK */
  const submenuClass = ({ isActive }) =>
    `
    block py-1.5 px-3 rounded-md transition
    ${isRTL ? "text-right" : "text-left"}
    ${
      isActive
        ? "bg-[#2E3092]/20 text-[#2E3092] font-semibold"
        : "text-[#1c1f4a]/80 hover:text-[#2E3092]"
    }
  `;

  return (
    <aside
      className={`
        flex flex-col w-64 h-full
        bg-gradient-to-b from-[#f7f8ff] via-[#eef0ff]/90 to-[#e6e9ff]/80 
        shadow-xl border-r border-[#d0d3ff]/60 backdrop-blur-sm
        transition-all duration-300
        ${isRTL ? "text-right" : "text-left"}
      `}
    >
      {/* HEADER */}
      <div className="p-6 border-b border-[#d8daff]/50 bg-white/70 backdrop-blur-md shadow-sm">
        <div
          className={`
            flex items-center justify-center gap-2
            ${isRTL ? "flex-row-reverse" : "flex-row"}
          `}
        >
          <Building2 size={22} className="text-[#2E3092]" />
          <h2 className="text-lg font-semibold text-[#2E3092]">MyBank UAE</h2>
        </div>
        <p className="text-xs text-[#2E3092]/70 mt-1">{t("header_portal")}</p>
      </div>

      {/* MENU LIST */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scroll space-y-3">

        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClass} onClick={onNavigate}>
          <LayoutDashboard size={18} className={`${isRTL ? "order-2" : ""}`} />
          <span className={`${isRTL ? "order-1" : ""}`}>
            {t("dashboard_title")}
          </span>
        </NavLink>

        {/* FACILITIES ------------------------------------------------ */}
        <div className="space-y-1">

          {/* FACILITIES BUTTON — FIXED WITH direction */}
          <button
            onClick={() => setFacOpen(!facOpen)}
            className={`
              w-full flex items-center px-4 py-2.5 
              rounded-lg font-semibold text-[#2E3092] hover:bg-white/80 transition-all text-sm
              ${isRTL ? "flex-row-reverse justify-between" : "flex-row justify-between"}
            `}
            style={{ direction: "ltr" }}
          >
            <span className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Layers size={18} className="text-[#2E3092]" />
              {t("menu_facilities")}
            </span>

            {facOpen ? (
              <ChevronDown size={15} className="text-[#2E3092]" />
            ) : (
              <ChevronRight size={15} className="text-[#2E3092]" />
            )}
          </button>

          {/* FACILITIES INNER */}
          {facOpen && (
            <div
              className={`
                mt-1 space-y-1
                ${isRTL ? "pr-5 border-r text-right" : "pl-5 border-l text-left"}
              `}
            >

              {/* WPS MODULE ------------------------------------------------ */}
              <button
                onClick={() => setWpsOpen(!wpsOpen)}
                className={`
                  w-full flex items-center py-2 px-3 rounded-md text-sm 
                  text-[#1c1f4a]/80 hover:bg-white/60 hover:text-[#2E3092] transition-all
                  ${isRTL ? "flex-row-reverse justify-between" : "flex-row justify-between"}
                `}
                style={{ direction:  "ltr" }}

              >
                <span className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <FolderKanban size={15} className="text-[#2E3092]" />
                  {t("menu_wps_module")}
                </span>

                {wpsOpen ? (
                  <ChevronDown size={14} className="text-[#2E3092]" />
                ) : (
                  <ChevronRight size={14} className="text-[#2E3092]" />
                )}
              </button>

              {/* WPS INNER MENU */}
              {wpsOpen && (
                <div className={`mt-1 space-y-1 text-sm ${isRTL ? "pr-4" : "pl-4"}`}>

                  <NavLink to="/wps/dashboard" className={submenuClass} onClick={onNavigate}>
                    {t("menu_wps_dashboard")}
                  </NavLink>

                  <NavLink to="/wps/register" className={submenuClass} onClick={onNavigate}>
                    {t("menu_register")}
                  </NavLink>

                  <NavLink to="/wps/companies" className={submenuClass} onClick={onNavigate}>
                    {t("menu_companies")}
                  </NavLink>

                  <NavLink to="/wps/employees" className={submenuClass} onClick={onNavigate}>
                    {t("menu_employees")}
                  </NavLink>

                  <NavLink to="/wps/salary" className={submenuClass} onClick={onNavigate}>
                    {t("menu_salary")}
                  </NavLink>

                  <NavLink to="/wps/refund" className={submenuClass} onClick={onNavigate}>
                    {t("menu_refund")}
                  </NavLink>

                  <NavLink to="/wps/reports" className={submenuClass} onClick={onNavigate}>
                    {t("menu_reports")}
                  </NavLink>
                </div>
              )}

            </div>
          )}
        </div>

        {/* REQUESTS */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <HandCoins size={18} className={`${isRTL ? "order-2" : ""}`} />
          {t("menu_requests")}
        </NavLink>

        {/* SUPPORT */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <Headphones size={18} className={`${isRTL ? "order-2" : ""}`} />
          {t("menu_customer_services")}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="mt-auto p-4 border-t border-[#d2d3ff]/50 text-xs text-center text-[#2E3092]/70 bg-white/70 backdrop-blur-sm">
        © 2025 MyBank UAE
        <p className="text-[11px] text-[#2E3092]/60">{t("menu_footer")}</p>
      </div>
    </aside>
  );
}

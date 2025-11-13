import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Building2,
  Headphones,
  Banknote,
  HandCoins,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const [openFacilities, setOpenFacilities] = useState(true);
  const [openWps, setOpenWps] = useState(true);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "bg-[#2E3092]/90 text-white shadow-md scale-[1.02]"
         : "text-[#1c1f4a]/80 hover:bg-[#e9ebff]/80 hover:text-[#2E3092]"
     }`;

  return (
    <aside className="flex flex-col w-64 bg-gradient-to-b from-[#f9faff]/90 via-[#eef0ff]/85 to-[#e3e6ff]/85 text-[#1c1f4a] h-full shadow-xl border-r border-[#cfd2ff]/70 backdrop-blur-md transition-all duration-300">
      {/* Header */}
      <div className="p-5 text-center border-b border-[#d6d9ff]/50 bg-white/70 backdrop-blur-lg shadow-sm">
        <div className="flex items-center justify-center gap-2">
          <Building2 size={22} className="text-[#2E3092]" />
          <h2 className="text-lg font-semibold text-[#2E3092]">MyBank</h2>
        </div>
        <p className="text-xs text-[#2E3092]/70">Corporate Portal</p>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 mt-4 space-y-2 px-3 overflow-y-auto custom-scroll">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClass} onClick={onNavigate}>
          <LayoutDashboard size={18} />
          Banking
        </NavLink>

        {/* Facilities */}
        <div className="mt-2">
          <button
            onClick={() => setOpenFacilities(!openFacilities)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-[#1c1f4a]/90 hover:bg-white/70 transition-all"
          >
            <span className="flex items-center gap-3">
              <Building2 size={18} />
              Facilities
            </span>
            {openFacilities ? (
              <ChevronDown size={16} className="text-[#2E3092]" />
            ) : (
              <ChevronRight size={16} className="text-[#2E3092]" />
            )}
          </button>

          {/* Facilities Inner */}
          {openFacilities && (
            <div className="pl-5 mt-1 space-y-1 border-l border-[#cfd3ff]/50">
              {/* WPS */}
              <button
                onClick={() => setOpenWps(!openWps)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 transition-all"
              >
                <span>WPS Module</span>
                {openWps ? (
                  <ChevronDown size={14} className="text-[#2E3092]" />
                ) : (
                  <ChevronRight size={14} className="text-[#2E3092]" />
                )}
              </button>

              {/* WPS Inner Links */}
              {openWps && (
                <div className="pl-4 mt-1 space-y-1 text-sm">
                  {[
                    { to: "/wps/register", label: "Register / Deregister" },
                    { to: "/wps/companies", label: "Companies" },
                    { to: "/wps/employees", label: "Employees" },
                    { to: "/wps/salary", label: "Salary Payment" },
                    { to: "/wps/refund", label: "Refund" },
                    { to: "/wps/reports", label: "Reports" },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block py-1.5 px-3 rounded-md hover:text-[#2E3092] transition ${
                          isActive
                            ? "bg-[#e6e7ff] text-[#2E3092] font-semibold"
                            : "text-[#1c1f4a]/80"
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
                  className="block py-1.5 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 rounded-md transition"
                  onClick={onNavigate}
                >
                  Module A
                </NavLink>
                <NavLink
                  to="#"
                  className="block py-1.5 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092] hover:bg-white/60 rounded-md transition"
                  onClick={onNavigate}
                >
                  Module B
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Requests */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <HandCoins size={18} />
          Requests
        </NavLink>

        {/* Customer Services */}
        <NavLink to="#" className={linkClass} onClick={onNavigate}>
          <Headphones size={18} />
          Customer Services
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-[#d3d7ff]/50 text-xs text-center text-[#2E3092]/70 bg-white/70 backdrop-blur-md">
        <p className="font-medium">© 2025 MyBank UAE</p>
        <p className="text-[11px] text-[#2E3092]/60">Empowering Payroll Solutions</p>
      </div>
    </aside>
  );
}

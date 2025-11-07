import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Building2,
  Headphones,
  Banknote,
  HandCoins,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const [openFacilities, setOpenFacilities] = useState(false);
  const [openWps, setOpenWps] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
    ${
      isActive
        ? "bg-white/80 text-[#2E3092] shadow-md backdrop-blur-md scale-[1.02]"
        : "text-[#1c1f4a] hover:bg-white/60 hover:text-[#2E3092] hover:backdrop-blur-sm"
    }`;

  return (
    <aside className="flex flex-col w-64 bg-gradient-to-b from-[#eef0ff]/90 via-[#e2e6ff]/80 to-[#d8dcff]/80 text-[#1c1f4a] h-full shadow-lg border-r border-[#d0d4ff]/70 backdrop-blur-xl">
      {/* Header */}
      <div className="p-6 text-center border-b border-[#cfd3ff]/50 bg-white/60 backdrop-blur-md shadow-sm">
        <h2 className="text-lg font-semibold tracking-wide text-[#2E3092]">
          MyBank
        </h2>
        <p className="text-xs text-[#2E3092]/70">Customer Portal</p>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 mt-4 space-y-1 px-3 overflow-y-auto">
        {/* Banking */}
        <NavLink to="/dashboard" className={linkClass} onClick={onNavigate}>
          <Banknote size={18} />
          Banking
        </NavLink>

        {/* Facilities */}
        <div>
          <button
            onClick={() => setOpenFacilities(!openFacilities)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/60 transition text-[#1c1f4a]/90"
          >
            <span className="flex items-center gap-3">
              <Building2 size={18} /> Facilities
            </span>
            {openFacilities ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {openFacilities && (
            <div className="pl-6 mt-1 space-y-1">
              {/* WPS Module */}
              <button
                onClick={() => setOpenWps(!openWps)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/50 rounded-md text-sm text-[#1c1f4a]/80"
              >
                <span>WPS Module</span>
                {openWps ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {openWps && (
                <div className="pl-4 space-y-1 text-sm text-[#1c1f4a]/80">
                  <NavLink
                    to="/wps/register"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Register / Deregister
                  </NavLink>
                  <NavLink
                    to="/wps/companies"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Companies
                  </NavLink>
                  <NavLink
                    to="/wps/employees"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Employees
                  </NavLink>
                  <NavLink
                    to="/wps/salary"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Salary Payment
                  </NavLink>
                  <NavLink
                    to="/wps/refund"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Refund
                  </NavLink>
                  <NavLink
                    to="/wps/reports"
                    className="block hover:text-[#2E3092]"
                    onClick={onNavigate}
                  >
                    Reports
                  </NavLink>
                </div>
              )}

              {/* Other Modules */}
              <NavLink
                to="#"
                className="block py-1 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092]"
                onClick={onNavigate}
              >
                Module A
              </NavLink>
              <NavLink
                to="#"
                className="block py-1 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092]"
                onClick={onNavigate}
              >
                Module B
              </NavLink>
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
      <div className="mt-auto p-4 border-t border-[#cfd3ff]/50 text-xs text-center text-[#2E3092]/70 bg-white/60 backdrop-blur-md">
        © 2025 MyBank UAE
      </div>
    </aside>
  );
}

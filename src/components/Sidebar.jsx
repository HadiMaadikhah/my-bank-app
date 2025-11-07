import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Building2,
  Headphones,
  Banknote,
  HandCoins,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
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
    <>
      {/* 🌐 Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-[#eef0ff]/90 via-[#e2e6ff]/80 to-[#d8dcff]/80 text-[#1c1f4a] min-h-screen fixed left-0 top-0 shadow-lg border-r border-[#d0d4ff]/70 backdrop-blur-xl">
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
          <NavLink to="/dashboard" className={linkClass}>
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
                    <NavLink to="/wps/register" className="block hover:text-[#2E3092]">
                      Register / Deregister
                    </NavLink>
                    <NavLink to="/wps/companies" className="block hover:text-[#2E3092]">
                      Companies
                    </NavLink>
                    <NavLink to="/wps/employees" className="block hover:text-[#2E3092]">
                      Employees
                    </NavLink>
                    <NavLink to="/wps/salary" className="block hover:text-[#2E3092]">
                      Salary Payment
                    </NavLink>
                    <NavLink to="/wps/refund" className="block hover:text-[#2E3092]">
                      Refund
                    </NavLink>
                    <NavLink to="/wps/reports" className="block hover:text-[#2E3092]">
                      Reports
                    </NavLink>
                  </div>
                )}

                {/* Other Modules */}
                <NavLink
                  to="#"
                  className="block py-1 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092]"
                >
                  Module A
                </NavLink>
                <NavLink
                  to="#"
                  className="block py-1 px-3 text-sm text-[#1c1f4a]/80 hover:text-[#2E3092]"
                >
                  Module B
                </NavLink>
              </div>
            )}
          </div>

          {/* Requests */}
          <NavLink to="#" className={linkClass}>
            <HandCoins size={18} />
            Requests
          </NavLink>

          {/* Customer Services */}
          <NavLink to="#" className={linkClass}>
            <Headphones size={18} />
            Customer Services
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-[#cfd3ff]/50 text-xs text-center text-[#2E3092]/70 bg-white/60 backdrop-blur-md">
          © 2025 MyBank UAE
        </div>
      </aside>

      {/* 📱 Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gradient-to-r from-[#f0f2ff]/90 to-[#dfe3ff]/90 text-[#2E3092] flex items-center justify-between p-4 z-50 shadow-md backdrop-blur-xl">
        <h2 className="text-base font-semibold tracking-wide">MyBank</h2>
        <button onClick={() => setOpen(true)} className="p-2 hover:bg-[#2E3092]/10 rounded-lg">
          <Menu size={22} />
        </button>
      </div>

      {/* 📱 Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 bg-gradient-to-b from-[#f7f8ff]/90 to-[#e5e8ff]/90 text-[#1c1f4a] h-full shadow-2xl z-50 p-5 flex flex-col animate-slide-in backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#2E3092]">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-[#2E3092]/10 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/60 hover:text-[#2E3092] transition"
              >
                <Banknote size={18} /> Banking
              </NavLink>

              <button
                onClick={() => setOpenFacilities(!openFacilities)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-white/50 text-[#1c1f4a]/90"
              >
                <span className="flex items-center gap-3">
                  <Building2 size={18} /> Facilities
                </span>
                {openFacilities ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {openFacilities && (
                <div className="pl-6 mt-1 space-y-1">
                  <button
                    onClick={() => setOpenWps(!openWps)}
                    className="w-full flex items-center justify-between py-2 px-2 hover:bg-white/50 rounded-md text-sm text-[#1c1f4a]/80"
                  >
                    <span>WPS Module</span>
                    {openWps ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>

                  {openWps && (
                    <div className="pl-4 space-y-1 text-sm">
                      <NavLink to="/wps/register" onClick={() => setOpen(false)}>
                        Register / Deregister
                      </NavLink>
                      <NavLink to="/wps/companies" onClick={() => setOpen(false)}>
                        Companies
                      </NavLink>
                      <NavLink to="/wps/employees" onClick={() => setOpen(false)}>
                        Employees
                      </NavLink>
                      <NavLink to="/wps/salary" onClick={() => setOpen(false)}>
                        Salary Payment
                      </NavLink>
                      <NavLink to="/wps/refund" onClick={() => setOpen(false)}>
                        Refund
                      </NavLink>
                      <NavLink to="/wps/reports" onClick={() => setOpen(false)}>
                        Reports
                      </NavLink>
                    </div>
                  )}
                </div>
              )}

              <NavLink
                to="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/60 hover:text-[#2E3092]"
              >
                <HandCoins size={18} /> Requests
              </NavLink>

              <NavLink
                to="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/60 hover:text-[#2E3092]"
              >
                <Headphones size={18} /> Customer Services
              </NavLink>
            </nav>

            <div className="mt-auto text-xs text-center text-[#2E3092]/70 border-t border-[#cfd3ff]/50 pt-3">
              © 2025 MyBank UAE
            </div>
          </div>
        </>
      )}
    </>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  RotateCcw,
  FileBarChart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  HandCoins,
  Headphones,
  Banknote,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openFacilities, setOpenFacilities] = useState(false);
  const [openWps, setOpenWps] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-white text-[#2E3092]"
        : "hover:bg-white/10 text-white/90"
    }`;

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#2E3092] text-white min-h-screen fixed left-0 top-0 shadow-lg">
        <div className="p-6 text-center border-b border-white/20">
          <h2 className="text-lg font-semibold tracking-wide">MyBank</h2>
          <p className="text-xs text-white/70">Customer Portal</p>
        </div>

        <nav className="flex-1 mt-4 space-y-1 px-3 overflow-y-auto">
          {/* Dashboard */}
          <NavLink to="/dashboard" className={linkClass}>
            <Banknote size={18} />
            Banking
          </NavLink>

          {/* Facilities */}
          <div>
            <button
              onClick={() => setOpenFacilities(!openFacilities)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium"
            >
              <span className="flex items-center gap-3">
                <Building2 size={18} /> Facilities
              </span>
              {openFacilities ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {openFacilities && (
              <div className="pl-6 mt-1 space-y-1">
                {/* WPS Module */}
                <button
                  onClick={() => setOpenWps(!openWps)}
                  className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/10 rounded-md text-sm"
                >
                  <span>WPS Module</span>
                  {openWps ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {openWps && (
                  <div className="pl-4 space-y-1 text-sm">
                    <NavLink to="/wps/register" className="block hover:underline">
                      Register / Deregister
                    </NavLink>
                    <NavLink to="/wps/companies" className="block hover:underline">
                      Companies
                    </NavLink>
                    <NavLink to="/wps/employees" className="block hover:underline">
                      Employees
                    </NavLink>
                    <NavLink to="/wps/salary" className="block hover:underline">
                      Salary Payment
                    </NavLink>
                    <NavLink to="/wps/refund" className="block hover:underline">
                      Refund
                    </NavLink>
                    <NavLink to="/wps/reports" className="block hover:underline">
                      Reports
                    </NavLink>
                  </div>
                )}

                {/* Other Modules */}
                <NavLink to="#" className="block py-1 px-3 hover:underline text-sm">
                  Module A
                </NavLink>
                <NavLink to="#" className="block py-1 px-3 hover:underline text-sm">
                  Module B
                </NavLink>

                {/* Customer Services */}
                <NavLink to="#" className="block py-1 px-3 hover:underline text-sm flex items-center gap-2">
                  <Headphones size={14} /> Customer Services
                </NavLink>
              </div>
            )}
          </div>

          {/* Requests */}
          <NavLink to="#" className={linkClass}>
            <HandCoins size={18} /> Requests
          </NavLink>
        </nav>

        <div className="mt-auto p-4 border-t border-white/10 text-xs text-center text-white/60">
          © 2025 MyBank UAE
        </div>
      </aside>

      {/* 🔹 Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#2E3092] text-white flex items-center justify-between p-4 z-50">
        <h2 className="text-base font-semibold">MyBank</h2>
        <button onClick={() => setOpen(true)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 bg-[#2E3092] text-white h-full shadow-xl z-50 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)} className="p-2">
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {/* Banking */}
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                <Banknote size={18} /> Banking
              </NavLink>

              {/* Facilities */}
              <button
                onClick={() => setOpenFacilities(!openFacilities)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <Building2 size={18} /> Facilities
                </span>
                {openFacilities ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {openFacilities && (
                <div className="pl-6 mt-1 space-y-1">
                  {/* WPS Module */}
                  <button
                    onClick={() => setOpenWps(!openWps)}
                    className="w-full flex items-center justify-between py-2 px-2 hover:bg-white/10 rounded-md text-sm"
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

                  {/* Other Modules */}
                  <NavLink to="#" className="block py-1 px-3 hover:underline text-sm">
                    Module A
                  </NavLink>
                  <NavLink to="#" className="block py-1 px-3 hover:underline text-sm">
                    Module B
                  </NavLink>
                  <NavLink
                    to="#"
                    className="block py-1 px-3 hover:underline text-sm flex items-center gap-2"
                  >
                    <Headphones size={14} /> Customer Services
                  </NavLink>
                </div>
              )}

              {/* Requests */}
              <NavLink
                to="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                <HandCoins size={18} /> Requests
              </NavLink>
            </nav>

            <div className="mt-auto text-xs text-center text-white/60 border-t border-white/10 pt-3">
              © 2025 MyBank UAE
            </div>
          </div>
        </>
      )}
    </>
  );
}

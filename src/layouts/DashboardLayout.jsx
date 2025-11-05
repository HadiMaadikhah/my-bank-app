import { useState } from "react";
import {
  Home,
  Users,
  Building2,
  FileSpreadsheet,
  CreditCard,
  RefreshCw,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFacility, setOpenFacility] = useState(false);
  const [openWps, setOpenWps] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f2f4ff]">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-[#2E3092] text-white w-64 p-5 flex flex-col transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-wide">MyBank WPS</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1 overflow-y-auto">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/15 transition"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          {/* Facilities Dropdown */}
          <div>
            <button
              onClick={() => setOpenFacility(!openFacility)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/15 transition"
            >
              <span className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                Facilities
              </span>
              {openFacility ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {openFacility && (
              <div className="pl-6 mt-1 space-y-1">
                {/* WPS Module Dropdown */}
                <button
                  onClick={() => setOpenWps(!openWps)}
                  className="w-full flex items-center justify-between py-2 px-2 hover:bg-white/10 rounded-md text-sm"
                >
                  <span>WPS Module</span>
                  {openWps ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {openWps && (
                  <div className="pl-4 space-y-1 text-sm">
                    <Link to="/dashboard/register" className="block hover:underline">
                      Register / Deregister
                    </Link>
                    <Link to="/dashboard/companies" className="block hover:underline">
                      Companies
                    </Link>
                    <Link to="/dashboard/employees" className="block hover:underline">
                      Employees
                    </Link>
                    <Link to="/dashboard/salary" className="block hover:underline">
                      Salary Payment
                    </Link>
                    <Link to="/dashboard/refund" className="block hover:underline">
                      Refund Request
                    </Link>
                    <Link to="/dashboard/reports" className="block hover:underline">
                      Reports
                    </Link>
                  </div>
                )}

                <Link to="#" className="block py-1 px-3 hover:underline text-sm">
                  Module A
                </Link>
                <Link to="#" className="block py-1 px-3 hover:underline text-sm">
                  Module B
                </Link>
                <Link to="#" className="block py-1 px-3 hover:underline text-sm">
                  Customer Services
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-white/15 text-xs text-white/65">
          © 2025 MyBank UAE
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-[#2E3092]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-[#2E3092]">
              WPS Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              Welcome, <span className="font-semibold">Hadi</span>
            </p>
            <button className="flex items-center text-[#2E3092] hover:text-[#1c1e6b] transition">
              <LogOut className="w-5 h-5 mr-1" />
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

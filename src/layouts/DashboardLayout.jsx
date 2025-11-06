// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Banknote,
  Building2,
  HandCoins,
  Headphones,
  Save,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // وقتی صفحه عوض شد، سایدبار موبایل بسته شود
  // (برای UX بهتر)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#2E3092] text-white flex flex-col py-6 transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div className="px-6 pb-5 border-b border-white/15 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-wide">Customer Portal</h2>
            <p className="text-xs text-white/70">Welcome to MyBank</p>
          </div>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 space-y-1 px-3 text-sm">
          {/* Banking */}
          <button
            onClick={() => {
              setActiveMenu("Banking");
              navigate("/dashboard");
            }}
            className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
              location.pathname.startsWith("/dashboard")
                ? "bg-white text-[#2E3092]"
                : "hover:bg-white/10 text-white/90"
            }`}
          >
            <Banknote size={18} />
            <span>Banking</span>
          </button>

          {/* Facilities */}
          <div>
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "Facilities" ? "" : "Facilities")
              }
              className={`w-full text-left flex items-center justify-between px-4 py-2 rounded-md transition ${
                activeMenu === "Facilities"
                  ? "bg-white text-[#2E3092]"
                  : "hover:bg-white/10 text-white/90"
              }`}
            >
              <span className="flex items-center gap-3">
                <Building2 size={18} />
                Facilities
              </span>
              <span className="text-xs">{activeMenu === "Facilities" ? "−" : "+"}</span>
            </button>

            {/* Facilities submenu */}
            {activeMenu === "Facilities" && (
              <div className="ml-6 mt-1 space-y-1">
                {/* WPS Module */}
                <div>
                  <button
                    onClick={() => {
                      const next = activeSubMenu === "WPS" ? "" : "WPS";
                      setActiveSubMenu(next);
                      // همراه با باز شدن، برو به صفحه اصلی WPS
                      if (next === "WPS") navigate("/wps");
                    }}
                    className="w-full text-left px-3 py-1 rounded-md hover:bg-white/10"
                  >
                    WPS Module {activeSubMenu === "WPS" ? "−" : "+"}
                  </button>

                  {activeSubMenu === "WPS" && (
                    <div className="ml-4 mt-1 space-y-1">
                      <button
                        onClick={() => navigate("/wps/register")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Register / Deregister
                      </button>
                      <button
                        onClick={() => navigate("/wps/companies")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Companies
                      </button>
                      <button
                        onClick={() => navigate("/wps/employees")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Employees
                      </button>
                      <button
                        onClick={() => navigate("/wps/salary")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Salary Payment
                      </button>
                      <button
                        onClick={() => navigate("/wps/refund")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Refund
                      </button>
                      <button
                        onClick={() => navigate("/wps/reports")}
                        className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md"
                      >
                        Reports
                      </button>
                    </div>
                  )}
                </div>

                {/* Module A & B - نمونه */}
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Module A
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-white/10 rounded-md">
                  Module B
                </button>
              </div>
            )}
          </div>

          {/* Customer Services */}
          <button
            onClick={() => setActiveMenu("Customer")}
            className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
              activeMenu === "Customer"
                ? "bg-white text-[#2E3092]"
                : "hover:bg-white/10 text-white/90"
            }`}
          >
            <Headphones size={18} />
            <span>Customer Services</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => {
              setActiveMenu("Reports");
              navigate("/wps/reports");
            }}
            className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition ${
              location.pathname.startsWith("/wps/reports")
                ? "bg-white text-[#2E3092]"
                : "hover:bg-white/10 text-white/90"
            }`}
          >
            <Save size={18} />
            <span>Reports</span>
          </button>
        </nav>

        <div className="mt-auto px-6 pt-4 pb-2 border-t border-white/10 text-xs text-white/65">
          © 2025 MyBank UAE
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Main content (خروجی صفحات فرزند) */}
      <main className="md:ml-64 p-4 md:p-8 overflow-y-auto transition-all duration-300">
        {/* هدر موبایل */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button className="text-[#2E3092]" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-[#2E3092]">Dashboard</h1>
          <div className="w-6" />
        </div>

        <Outlet />
      </main>
    </div>
  );
}

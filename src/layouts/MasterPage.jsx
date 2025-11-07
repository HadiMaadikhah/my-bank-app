import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MasterPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full h-dvh flex text-[#1a1c3b] bg-gradient-to-br from-[#f9faff] via-[#eef0ff] to-[#e1e4ff]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-[#cfd3ff]/50 bg-gradient-to-b from-[#eef0ff]/90 via-[#e3e6ff]/85 to-[#d8dbff]/80 backdrop-blur-md shadow-sm">
        <Sidebar onNavigate={() => {}} />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-gradient-to-b from-[#f9faff]/95 to-[#e3e6ff]/95 border-r border-[#cfd3ff]/50 shadow-2xl backdrop-blur-xl animate-slide-in">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setMobileOpen((v) => !v)}
          className="bg-white/70 backdrop-blur-md border-b border-[#cfd3ff]/70 shadow-sm"
        />

        <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-white/80 to-[#f3f5ff]/70">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

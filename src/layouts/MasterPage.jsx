// src/layouts/MasterPage.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MasterPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full h-dvh flex text-[#1a1c3b] bg-gradient-to-br from-[#f5f6ff] via-[#e8eaff] to-[#dfe3ff]">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-[#cfd3ff]/50 bg-gradient-to-b from-[#e6e9ff] to-[#d2d6ff] backdrop-blur-md shadow-sm">
        <Sidebar onNavigate={() => {}} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-gradient-to-b from-[#eef0ff] to-[#dfe3ff] border-r border-[#cfd3ff]/50 shadow-2xl">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setMobileOpen((v) => !v)}
          className="bg-white/80 backdrop-blur-md border-b border-[#cfd3ff]/70 shadow-sm"
        />
        <main className="flex-1 overflow-auto px-3 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-white/70 to-[#eef0ff]/80">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

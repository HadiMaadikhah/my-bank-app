import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();

  const user = {
    name: "Hadi Maadikhah",
    email: "hadi.Maadikhah.info@gmail.com",
    avatarUrl: "https://i.pravatar.cc/64?img=15",
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-[#f7f8ff]/90 via-[#ebedff]/90 to-[#dfe3ff]/90 text-[#1c1f4a] border-b border-[#cfd3ff]/70 shadow-sm backdrop-blur-xl sticky top-0 z-50">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#2E3092]/10 focus:outline-none focus:ring-2 focus:ring-[#2E3092]/20 transition"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="text-xl text-[#2E3092]">☰</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-wide text-[#2E3092]">
            MyBank
          </span>
          <span className="hidden sm:inline text-xs opacity-70 font-light">
            Customer Portal
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative" ref={menuRef}>

        {/* User Info */}
        <div className="hidden sm:flex flex-col leading-tight text-right">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-[11px] text-[#2E3092]/70">{user.email}</span>
        </div>

        {/* Avatar */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative focus:outline-none"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className={`w-9 h-9 rounded-full border border-[#cfd3ff]/70 shadow-sm transition-transform duration-200 ${
              menuOpen ? "scale-105" : "hover:scale-105"
            }`}
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white/80 backdrop-blur-md border border-[#d2d5ff]/60 rounded-xl shadow-lg overflow-hidden animate-fade-in">
            
            <div className="px-4 py-3 border-b border-[#e0e3ff]/70">
              <p className="text-sm font-medium text-[#2E3092]">{user.name}</p>
              <p className="text-xs text-[#2E3092]/70 truncate">{user.email}</p>
            </div>

            <ul className="py-1 text-sm">

              {/* Profile */}
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f4ff] text-[#1c1f4a] transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </button>
              </li>

              {/* Settings */}
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f4ff] text-[#1c1f4a] transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                >
                  Settings
                </button>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-[#b82b2b] hover:bg-[#ffeaea] transition"
                >
                  Logout
                </button>
              </li>

            </ul>

          </div>
        )}
      </div>
    </header>
  );
}

// src/components/Header.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  const user = {
    name: "Hadi Maadikhah",
    email: "hadi.Maadikhah.info@gmail.com",
    avatarUrl: "https://i.pravatar.cc/64?img=15",
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Language Switch – فقط i18n، dir را App مدیریت می‌کند
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangLabel =
    i18n.language === "ar"
      ? "العربية"
      : i18n.language === "fa"
      ? "فارسی"
      : "English";

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
        <div
          className={`flex items-center gap-2 ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-lg font-semibold tracking-wide text-[#2E3092]">
            {t("header_bank")}
          </span>
          <span className="hidden sm:inline text-xs opacity-70 font-light">
            {t("header_portal")}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex items-center gap-4 relative"
        ref={menuRef}
      >
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="px-2 py-1 bg-[#2E3092] text-white rounded-lg flex items-center gap-1 text-sm hover:bg-[#23246e]"
          >
            <Globe className="w-4 h-4" />
            {currentLangLabel}
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border text-sm">
              <button
                onClick={() => changeLanguage("en")}
                className="px-3 py-2 hover:bg-gray-100 w-full text-left"
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className="px-3 py-2 hover:bg-gray-100 w-full text-left"
              >
                🇸🇦 العربية
              </button>
              <button
                onClick={() => changeLanguage("fa")}
                className="px-3 py-2 hover:bg-gray-100 w-full text-left"
              >
                🇮🇷 فارسی
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div
          className={`hidden sm:flex flex-col leading-tight ${
            isRTL ? "text-left" : "text-right"
          }`}
        >
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-[11px] text-[#2E3092]/70">
            {user.email}
          </span>
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
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-[#2E3092]">
                {user.name}
              </p>
              <p className="text-xs text-[#2E3092]/70 truncate">
                {user.email}
              </p>
            </div>

            <ul className="py-1 text-sm">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f4ff]"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  {t("header_profile")}
                </button>
              </li>

              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f4ff]"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                >
                  {t("header_settings")}
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-[#b82b2b] hover:bg-[#ffeaea]"
                >
                  {t("header_logout")}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

// src/components/Header.jsx
export default function Header({ onToggleSidebar }) {
  const user = {
    name: "Hadi Maadikhah",
    email: "hadi.Maadikhah.info@gmail.com",
    avatarUrl: "https://i.pravatar.cc/64?img=15",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-[#f7f8ff]/90 via-[#eaefff]/90 to-[#dee2ff]/90 text-[#1c1f4a] border-b border-[#cfd3ff]/70 shadow-sm backdrop-blur-xl sticky top-0 z-50">
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

        {/* Logo / Title */}
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
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="hidden sm:flex flex-col leading-tight text-right">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-[11px] text-[#2E3092]/70">{user.email}</span>
        </div>

        {/* Avatar */}
        <div className="relative group">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-9 h-9 rounded-full border border-[#cfd3ff]/70 shadow-sm group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-white/70 hover:bg-white text-[#2E3092] font-medium border border-[#cfd3ff]/60 shadow-sm transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

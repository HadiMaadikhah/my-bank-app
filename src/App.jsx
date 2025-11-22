// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import PageLoader from "./components/PageLoader";

import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/wps/Register";
import Companies from "./pages/wps/Companies";
import Employees from "./pages/wps/Employees";
import SalaryPayment from "./pages/wps/SalaryPayment";
import Refund from "./pages/wps/Refund";
import Reports from "./pages/wps/Reports";
import WpsPage from "./pages/wps/WpsPage";
import TransitionWrapper from "./components/TransitionWrapper";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MasterPage from "./layouts/MasterPage";

/* ---------------- Protected Layout ---------------- */
function ProtectedRoutes() {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/* ---------------- Wrapper for animations ---------------- */
function AnimatedOutletWrapper() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <TransitionWrapper key={location.pathname}>
        <Outlet />
      </TransitionWrapper>
    </AnimatePresence>
  );
}

/* ---------------- Main App Routes ---------------- */
function AppRoutes() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className={isArabic ? "font-arabic rtl" : "ltr"}>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Protected */}
        <Route element={<ProtectedRoutes />}>

          {/* Layout ثابت */}
          <Route element={<MasterPage />}>
            
            {/* محتوای وسط که تغییر می‌کند */}
            <Route element={<AnimatedOutletWrapper />}>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wps" element={<WpsPage />} />
              <Route path="/wps/register" element={<Register />} />
              <Route path="/wps/companies" element={<Companies />} />
              <Route path="/wps/employees" element={<Employees />} />
              <Route path="/wps/salary" element={<SalaryPayment />} />
              <Route path="/wps/refund" element={<Refund />} />
              <Route path="/wps/reports" element={<Reports />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </div>
  );
}

/* ---------------- Root ---------------- */
export default function App() {
  const basename =
    import.meta.env.MODE === "production" ? "/my-bank-app" : "/";
  return (
    <Router basename={basename}>
      <AppRoutes />
    </Router>
  );
}

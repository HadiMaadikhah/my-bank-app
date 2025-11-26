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
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

// Components
import PageLoader from "./components/PageLoader";
import TransitionWrapper from "./components/TransitionWrapper";

// Layout
import MasterPage from "./layouts/MasterPage";

// Pages
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

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

/* -------------------------------------------
   Protected Route Wrapper
--------------------------------------------*/
function ProtectedRoutes() {
  const isAuthenticated = true; // TODO: بعداً به auth واقعی وصل می‌کنی

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/* -------------------------------------------
   Animated Page Wrapper (Outlet)
--------------------------------------------*/
function AnimatedOutletWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <PageLoader loading={loading} />

      <AnimatePresence mode="wait">
        <TransitionWrapper key={location.pathname}>
          <Outlet />
        </TransitionWrapper>
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------
   Application Routes
--------------------------------------------*/
function AppRoutes() {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  const isArabic = i18n.language === "ar";
  const isFarsi = i18n.language === "fa";
  
  // موتور مرکزی direction در سطح <html>
  useEffect(() => {
    const dir = isRTL ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", i18n.language);

    // کلاس برای استایل‌های global (اگر لازم شد)
    document.documentElement.classList.remove("rtl", "ltr");
    document.documentElement.classList.add(dir);
  }, [i18n.language, isRTL]);

  return (
    // کل اپ فقط اینجا بین RTL/LTR سوییچ می‌کند
    <div className={isRTL ? "font-arabic rtl" : "ltr"}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Protected */}
        <Route element={<ProtectedRoutes />}>
          {/* Layout ثابت */}
          <Route element={<MasterPage />}>
            {/* فقط Outlet با انیمیشن تغییر می‌کند */}
            <Route element={<AnimatedOutletWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* WPS */}
              <Route path="/wps" element={<WpsPage />} />
              <Route path="/wps/register" element={<Register />} />
              <Route path="/wps/companies" element={<Companies />} />
              <Route path="/wps/employees" element={<Employees />} />
              <Route path="/wps/salary" element={<SalaryPayment />} />
              <Route path="/wps/refund" element={<Refund />} />
              <Route path="/wps/reports" element={<Reports />} />

              {/* Profile & Settings */}
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

/* -------------------------------------------
   Root Component
--------------------------------------------*/
export default function App() {
  const basename =
    import.meta.env.MODE === "production" ? "/my-bank-app" : "/";

  return (
    <Router basename={basename}>
      <AppRoutes />
    </Router>
  );
}

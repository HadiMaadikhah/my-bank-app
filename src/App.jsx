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

import Settings from "./pages/Settings";
import WpsDashboard from "./pages/wps/WpsDashboard";


/* -------------------------------------------
   Protected Route Wrapper
--------------------------------------------*/
function ProtectedRoutes() {
  const isAuthenticated = true; // TODO: به auth واقعی وصل می‌کنی
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/* -------------------------------------------
   Animated Page Wrapper
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

  const lang = i18n.language;
  const isArabic = lang === "ar";
  const isFarsi = lang === "fa";
  const isRTL = isArabic || isFarsi;

  // Set HTML <html dir="rtl"> & <html lang="fa">
  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    // Remove old classes
    document.documentElement.classList.remove(
      "rtl",
      "ltr",
      "font-arabic",
      "font-farsi",
      "font-english"
    );

    // Add new classes based on language
    if (isArabic) {
      document.documentElement.classList.add("rtl", "font-arabic");
    } else if (isFarsi) {
      document.documentElement.classList.add("rtl", "font-farsi");
    } else {
      document.documentElement.classList.add("ltr", "font-english");
    }
  }, [lang, isRTL, isArabic, isFarsi]);

  return (
    <div
      className={
        isArabic
          ? "font-arabic rtl"
          : isFarsi
          ? "font-farsi rtl"
          : "font-english ltr"
      }
    >
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Protected */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MasterPage />}>
            <Route element={<AnimatedOutletWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* WPS */}
              <Route path="/wps" element={<WpsPage />} />
              <Route path="/wps/dashboard" element={<WpsDashboard />} />
              <Route path="/wps/register" element={<Register />} />
              <Route path="/wps/companies" element={<Companies />} />
              <Route path="/wps/employees" element={<Employees />} />
              <Route path="/wps/salary" element={<SalaryPayment />} />
              <Route path="/wps/refund" element={<Refund />} />
              <Route path="/wps/reports" element={<Reports />} />

              {/* Profile & Settings */}
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

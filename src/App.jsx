// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

import MasterPage from "./layouts/MasterPage";

function ProtectedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // TEST auth — later replace with real auth/context
  const isAuthenticated = true;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <PageLoader loading={loading} />
      <AnimatePresence mode="wait">
        <TransitionWrapper key={location.pathname}>
          {/* Master shell */}
          <MasterPage />
        </TransitionWrapper>
      </AnimatePresence>
    </>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/* Public routes with loader + animation (optional) */}
      <AnimatePresence mode="wait">
        <TransitionWrapper key={location.pathname}>
          <Routes location={location}>
            {/* Redirect root to login for now */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<Otp />} />

            {/* Protected (render MasterPage and nest inner pages) */}
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/dashboard"
                element={
                  // MasterPage خود Outlet دارد، پس صفحه‌ی واقعی داخل روت زیر رندر می‌شود
                  <Dashboard />
                }
              />
              <Route path="/wps" element={<WpsPage />} />
              <Route path="/wps/register" element={<Register />} />
              <Route path="/wps/companies" element={<Companies />} />
              <Route path="/wps/employees" element={<Employees />} />
              <Route path="/wps/salary" element={<SalaryPayment />} />
              <Route path="/wps/refund" element={<Refund />} />
              <Route path="/wps/reports" element={<Reports />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </TransitionWrapper>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const basename = import.meta.env.MODE === "production" ? "/my-bank-app" : "/";
  return (
    <Router basename={basename}>
      <AppRoutes />
    </Router>
  );
}

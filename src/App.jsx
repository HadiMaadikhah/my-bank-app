import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <PageLoader loading={loading} />
      <AnimatePresence mode="wait">
        <TransitionWrapper key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wps" element={<WpsPage />} />
            <Route path="/wps/register" element={<Register />} />
            <Route path="/wps/companies" element={<Companies />} />
            <Route path="/wps/employees" element={<Employees />} />
            <Route path="/wps/salary" element={<SalaryPayment />} />
            <Route path="/wps/refund" element={<Refund />} />
            <Route path="/wps/reports" element={<Reports />} />
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

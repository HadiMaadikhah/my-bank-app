// src/routes/AnimatedOutletWrapper.jsx
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TransitionWrapper from "../components/TransitionWrapper";

export default function AnimatedOutletWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <TransitionWrapper key={location.pathname}>
          {children}
        </TransitionWrapper>
      </AnimatePresence>
    </>
  );
}

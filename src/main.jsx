import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import "./i18n/index.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* ✅ نوتیفیکیشن‌ها */}
    <Toaster richColors position="top-right" />
  </React.StrictMode>
);

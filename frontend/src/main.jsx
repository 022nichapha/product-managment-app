import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. นำเข้า BrowserRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* 2. ครอบ App ไว้ด้านในนี้ */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);

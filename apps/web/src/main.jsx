/* ============================================================
   HoloTap — Engineering Build System
   File: src/main.jsx
   Author: Raymond Newton
   Project: HoloTap Identity & QR Security Platform
   Layer: web-ui
   Revision: v2 — Unified Web & Mobile Architecture
   ------------------------------------------------------------
   Notes:
   - Deterministic architecture only
   - Zero template styling, zero boilerplate
   - Tailwind v4 CSS-first UI pipeline
   - Web UI must remain modular and stateless
   - Identity, QR, and organisation layers isolated
   - Explicit state transitions; no hidden side-effects
   ============================================================ */


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouter from "./MainRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>

<MainRouter />

</React.StrictMode>
);
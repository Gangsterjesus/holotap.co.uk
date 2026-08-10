/**
 * ============================================================
 *  HoloTap — Web Router (Creator Surface)
 *  File: apps/web/src/AppRouter.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2.3 — Flow‑8 Payments Routing
 * ============================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Flow‑8 Pages
import PaymentsStart from "./pages/payments/start";
import PaymentsExecute from "./pages/payments/execute";
import PaymentsResult from "./pages/payments/result";

// Existing Pages
import Calendar from "./pages/merchant";
import IdentityQR from "./pages/qr/qr";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Flow‑4 Calendar */}
        <Route path="/merchant" element={<Calendar />} />

        {/* Flow‑6 Identity */}
        <Route path="/qr/qr" element={<IdentityQR />} />

        {/* ============================
            Flow‑8 Payments Lifecycle
           ============================ */}

        {/* Flow‑8.1 — Payment Initialiser */}
        <Route path="/payments/start" element={<PaymentsStart />} />

        {/* Flow‑8.2 — Payment Execution */}
        <Route path="/payments/execute/:paymentId" element={<PaymentsExecute />} />

        {/* Flow‑8.3 — Payment Result */}
        <Route path="/payments/result/:paymentId" element={<PaymentsResult />} />

        {/* Payments root → start */}
        <Route path="/payments" element={<PaymentsStart />} />

      </Routes>
    </BrowserRouter>
  );
}

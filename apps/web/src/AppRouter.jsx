/**
 * =================================================================================================
 *  HOLOTAP — WEB APPLICATION ROUTER
 *  File: apps/web/src/AppRouter.jsx
 *
 *  Engineering:
 *    • Raymond Newton HoloTap engineering — Lead Engineer
 *    • Copilot — Engineering Assistant
 *
 *  Revision: v2.4 — Creator Surface Routing (Flows 4, 6, 8, 9)
 *
 *  Overview:
 *    Central routing layer for the HoloTap web client. Registers all creator‑facing modules including
 *    calendar tools, identity surfaces, payment lifecycle flows, and registry binding. This router
 *    defines the deterministic navigation structure for the entire creator experience.
 * =================================================================================================
 */


import { BrowserRouter, Routes, Route } from "react-router-dom";

// Flow‑8 Pages
import PaymentsStart from "./pages/payments/start";
import PaymentsExecute from "./pages/payments/execute";
import PaymentsResult from "./pages/payments/result";

// Flow‑9 Pages
import RegistryOverview from "./pages/registry/index";
import RegistryBind from "./pages/registry/bind";
import RegistryResult from "./pages/registry/result";

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

        <Route path="/payments/start" element={<PaymentsStart />} />
        <Route path="/payments/execute/:paymentId" element={<PaymentsExecute />} />
        <Route path="/payments/result/:paymentId" element={<PaymentsResult />} />
        <Route path="/payments" element={<PaymentsStart />} />

        {/* ============================
            Flow‑9 Registry Binding
           ============================ */}

        <Route path="/registry" element={<RegistryOverview />} />
        <Route path="/registry/bind" element={<RegistryBind />} />
        <Route path="/registry/result" element={<RegistryResult />} />

      </Routes>
    </BrowserRouter>
  );
}

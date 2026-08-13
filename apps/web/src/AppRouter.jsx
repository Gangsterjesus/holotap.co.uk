/**
 * ================================================================================================
 *  HOLOTAP — WEB ROUTER (CREATOR)
 *  Date: 13/08/2026
 *  Author: Ray Newton Holotap Engineering.
 *  File: apps/web/src/AppRouter.jsx
 *  Engineers: Raymond Newton  Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v2.5 — Flow‑aligned Routing Structure
 *
 *  Description:
 *    Adds deterministic routing for Flow‑9.3 Registry Result Surface.
 *    Route: /registry/result → <RegistryResult />
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v2.0
 * ================================================================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Flow‑9 pages
import RegistryBind from "./pages/registry/bind.jsx";
import RegistryStatus from "./pages/registry/status.jsx";
import RegistryResult from "./pages/registry/result.jsx"; // NEW

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ============================
            FLOW‑9 — REGISTRY BINDING
           ============================ */}

        <Route path="/registry/bind" element={<RegistryBind />} />
        <Route path="/registry/status" element={<RegistryStatus />} />

        {/* ============================================================
            FLOW‑9.3 — REGISTRY RESULT SURFACE (NEW)
           ============================================================ */}
        <Route path="/registry/result" element={<RegistryResult />} />

        {/* fallback */}
        <Route path="*" element={<div>Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

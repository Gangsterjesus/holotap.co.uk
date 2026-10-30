/**
 * ================================================================================================
 *  HOLOTAP — HERO ROUTER
 *  File: apps/web/src/AppRouter.jsx
 *  Engineers:
 *    - Raymond Newton (E5357171)
 *    - Copilot Engineering Assistant
 *  Layer: WebUI
 *  Revision: HERO v5.0.0
 *  Date: 30 October 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ================================================================================================
 *
 *  Module Purpose:
 *  Provides deterministic routing for HoloTap HERO registry and
 *  organisation management workflows.
 *
 *  Module Responsibilities:
 *  - Registry binding workflow
 *  - Registry verification workflow
 *  - Registry result workflow
 *  - Organisation creation workflow
 *  - Route isolation and navigation control
 *  - Lazy loading of route surfaces
 *  - Fallback handling for unknown routes
 * ================================================================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/* ================================================================================================
   REGISTRY FLOWS
   ================================================================================================ */

const RegistryBind = lazy(() =>
  import("./pages/registry/bind.jsx")
);

const RegistryStatus = lazy(() =>
  import("./pages/registry/status.jsx")
);

const RegistryResult = lazy(() =>
  import("./pages/registry/result.jsx")
);

/* ================================================================================================
   ORGANISATIONS
   ================================================================================================ */

const OrganisationCreate = lazy(() =>
  import("./pages/organisations/create.jsx")
);

/* ================================================================================================
   FALLBACK
   ================================================================================================ */

function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

/* ================================================================================================
   ROUTER
   ================================================================================================ */

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* =============================================================================
              FLOW 9.0 — ORGANISATION CREATION
             ============================================================================= */}

          <Route
            path="/organisations/create"
            element={<OrganisationCreate />}
          />

          {/* =============================================================================
              FLOW 9.1 — REGISTRY BIND
             ============================================================================= */}

          <Route
            path="/registry/bind"
            element={<RegistryBind />}
          />

          {/* =============================================================================
              FLOW 9.2 — REGISTRY STATUS
             ============================================================================= */}

          <Route
            path="/registry/status"
            element={<RegistryStatus />}
          />

          {/* =============================================================================
              FLOW 9.3 — REGISTRY RESULT
             ============================================================================= */}

          <Route
            path="/registry/result"
            element={<RegistryResult />}
          />

          {/* =============================================================================
              FLOW 10 ClientInformation-Route
             ============================================================================= */}


<Route
  path="/client-information"
  element={<ClientInformation />}
/>
          {/* =============================================================================
              FALLBACK
             ============================================================================= */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
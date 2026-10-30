/**
 * ============================================================
 *  HoloTap — HERO Build
 * ============================================================
 *  File: src/MainRouter.jsx
 *  Engineers:
 *    - Raymond Newton (E5357171)
 *    - Copilot Engineering Assistant
 *  Layer: WebUI
 *  Revision: HERO v5.0.0
 *  Date: 30 October 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *  Defines the primary routing architecture for the HoloTap
 *  HERO WebUI, providing lazy-loaded route boundaries across
 *  customer, merchant, registry, identity, organisation,
 *  administration, and payment workflows.
 *
 *  Module Responsibilities:
 *  - Define global application routes
 *  - Support HERO payment execution flows
 *  - Support merchant dashboard workflows
 *  - Support registry and identity services
 *  - Support administration workspaces
 *  - Maintain deterministic route isolation
 *  - Minimise bundle size through route splitting
 * ============================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navigation from "./components/Navigation.jsx";

/* ============================================================
   PUBLIC
   ============================================================ */

const Home = lazy(() => import("./pages/Home.jsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.jsx"));
const Verify = lazy(() => import("./pages/Verify.jsx"));

/* ============================================================
   AUTHENTICATION
   ============================================================ */

const Login = lazy(() => import("./pages/auth/Login.jsx"));
const MagicLink = lazy(() => import("./pages/auth/MagicLink.jsx"));
const Passkey = lazy(() => import("./pages/auth/Passkey.jsx"));
const VerifyAuth = lazy(() => import("./pages/auth/VerifyAuth.jsx"));

/* ============================================================
   FLOW-9 REGISTRY
   ============================================================ */

const RegistryOverview = lazy(() =>
  import("./pages/registry/index.jsx")
);

const RegistryBind = lazy(() =>
  import("./pages/registry/bind.jsx")
);

const RegistryStatus = lazy(() =>
  import("./pages/registry/status.jsx")
);

const RegistryResult = lazy(() =>
  import("./pages/registry/result.jsx")
);

/* ============================================================
   MERCHANT
   ============================================================ */

const MerchantDashboard = lazy(() =>
  import("./pages/merchant/MerchantDashboard.jsx")
);

/* ============================================================
   ADMIN
   ============================================================ */

const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard.jsx")
);

const AdminMerchants = lazy(() =>
  import("./pages/admin/Merchants.jsx")
);

const AdminLogs = lazy(() =>
  import("./pages/admin/Logs.jsx")
);

const AdminSystemStatus = lazy(() =>
  import("./pages/admin/SystemStatus.jsx")
);

const AdminOrganisations = lazy(() =>
  import("./pages/admin/Organisations.jsx")
);

const AdminUsers = lazy(() =>
  import("./pages/admin/Users.jsx")
);

const Enquiries = lazy(() =>
  import("./pages/admin/Enquiries.jsx")
);

/* ============================================================
   HERO PAYMENT + QR FLOWS
   ============================================================ */

const Activate = lazy(() =>
  import("./pages/activate.tsx")
);

const Scan = lazy(() =>
  import("./pages/scan.tsx")
);

const PaymentResult = lazy(() =>
  import("./pages/payments.jsx")
);

/* ============================================================
   COMMUNICATION
   ============================================================ */

const Updater = lazy(() =>
  import("./pages/Updater.jsx")
);

const AdminContact = lazy(() =>
  import("./pages/Admin.jsx")
);

const Support = lazy(() =>
  import("./pages/Support.jsx")
);

const Dev = lazy(() =>
  import("./pages/Dev.jsx")
);

/* ============================================================
   ROUTER
   ============================================================ */

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Navigation />

      <Suspense fallback={<div />}>
        <Routes>

          {/* PUBLIC */}

          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/verify" element={<Verify />} />

          {/* AUTH */}

          <Route path="/login" element={<Login />} />
          <Route path="/magic" element={<MagicLink />} />
          <Route path="/passkey" element={<Passkey />} />
          <Route path="/auth/verify" element={<VerifyAuth />} />

          {/* FLOW-9 REGISTRY */}

          <Route path="/registry" element={<RegistryOverview />} />
          <Route path="/registry/bind" element={<RegistryBind />} />
          <Route path="/registry/status" element={<RegistryStatus />} />
          <Route path="/registry/result" element={<RegistryResult />} />

          {/* MERCHANT */}

          <Route
            path="/merchant"
            element={<MerchantDashboard />}
          />

          {/* HERO QR FLOWS */}

          <Route path="/activate" element={<Activate />} />
          <Route path="/scan" element={<Scan />} />

          {/* PAYMENT */}

          <Route
            path="/payment/result"
            element={<PaymentResult />}
          />

          {/* ADMIN */}

          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/merchants"
            element={<AdminMerchants />}
          />
          <Route
            path="/admin/logs"
            element={<AdminLogs />}
          />
          <Route
            path="/admin/system"
            element={<AdminSystemStatus />}
          />
          <Route
            path="/admin/orgs"
            element={<AdminOrganisations />}
          />
          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          {/* COMMUNICATION */}

          <Route path="/updater" element={<Updater />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route
            path="/admin-contact"
            element={<AdminContact />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/dev" element={<Dev />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
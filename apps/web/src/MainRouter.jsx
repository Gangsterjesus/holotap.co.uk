/**
 * ============================================================
 *  HoloTap — Engineering Build System
 *  File: src/MainRouter.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2.1 — Async-Split Router Refactor
 *  Date: 04 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Implements the global routing layer for the HoloTap web
 *  application. This version introduces full async-splitting of
 *  all page surfaces to reduce initial bundle size and improve
 *  deterministic load performance across public, creator, admin,
 *  and merchant workspaces.
 *
 *  Refactor Summary (v2.1):
 *  - Converted all synchronous page imports to lazy-loaded
 *    async boundaries using React.lazy()
 *  - Reduced main bundle size by isolating heavy surfaces
 *    (admin, merchant, QR flows, auth flows)
 *  - Navigation system updated to async role-based loader
 *  - Ensures deterministic routing with zero hidden side-effects
 *  - Preserves Tailwind v4 CSS-first architecture
 *
 *  Responsibilities:
 *  - Define global routing structure
 *  - Async-load all page modules on demand
 *  - Maintain stateless, modular, deterministic UI flows
 *  - Enforce isolation between identity, QR, and organisation layers
 * ============================================================
 */


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation.jsx";

/* ============================
   LAZY-LOADED PAGES
   ============================ */
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
const UnderConstruction = lazy(() => import("./pages/UnderConstruction.jsx"));

/* PUBLIC */
const Home = lazy(() => import("./pages/Home.jsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.jsx"));
const Verify = lazy(() => import("./pages/Verify.jsx"));

/* AUTH */
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const MagicLink = lazy(() => import("./pages/auth/MagicLink.jsx"));
const Passkey = lazy(() => import("./pages/auth/Passkey.jsx"));
const VerifyAuth = lazy(() => import("./pages/auth/VerifyAuth.jsx"));

/* ADMIN WORKSPACE */
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminMerchants = lazy(() => import("./pages/admin/Merchants.jsx"));
const AdminLogs = lazy(() => import("./pages/admin/Logs.jsx"));
const AdminSystemStatus = lazy(() => import("./pages/admin/SystemStatus.jsx"));
const AdminOrganisations = lazy(() => import("./pages/admin/Organisations.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/Users.jsx"));

/* MERCHANT WORKSPACE */
const MerchantHome = lazy(() => import("./pages/merchant/MerchantDashboard.jsx"));

/* QR FLOWS (.tsx) */
const Activate = lazy(() => import("./pages/activate.tsx"));
const Scan = lazy(() => import("./pages/scan.tsx"));

/* PAYMENT RESULT */
const PaymentResult = lazy(() => import("./pages/payments.jsx"));

/* COMMUNICATION LAYER */
const Updater = lazy(() => import("./pages/Updater.jsx"));
const Enquiries = lazy(() => import("./pages/admin/Enquiries.jsx"));
const AdminContact = lazy(() => import("./pages/Admin.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const Dev = lazy(() => import("./pages/Dev.jsx"));

/* ============================
   ROUTER
   ============================ */

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Navigation />

      <Suspense fallback={<div />}>
        <Routes>
{/* FLOW-9 REGISTRY */}

<Route
  path="/registry"
  element={<RegistryOverview />}
/>

<Route
  path="/registry/bind"
  element={<RegistryBind />}
/>

<Route
  path="/registry/status"
  element={<RegistryStatus />}
/>

<Route
  path="/registry/result"
  element={<RegistryResult />}
/>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/verify" element={<Verify />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/magic" element={<MagicLink />} />
          <Route path="/passkey" element={<Passkey />} />
          <Route path="/auth/verify" element={<VerifyAuth />} />

          {/* ADMIN WORKSPACE */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/merchants" element={<AdminMerchants />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/system" element={<AdminSystemStatus />} />
          <Route path="/admin/orgs" element={<AdminOrganisations />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* MERCHANT WORKSPACE */}
          <Route path="/merchant" element={<MerchantHome />} />

          {/* QR FLOWS */}
          <Route path="/activate" element={<Activate />} />
          <Route path="/scan" element={<Scan />} />

          {/* PAYMENT RESULT */}
          <Route path="/payment/result" element={<PaymentResult />} />

          {/* COMMUNICATION LAYER */}
          <Route path="/updater" element={<Updater />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/admin-contact" element={<AdminContact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dev" element={<Dev />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

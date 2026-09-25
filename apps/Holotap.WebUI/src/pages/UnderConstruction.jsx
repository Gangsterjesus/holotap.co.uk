/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/UnderConstruction.jsx
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

import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function UnderConstruction() {
  return (
    <Layout
      title="Under Construction"
      subtitle="This section of the HoloTap platform is being prepared"
    >
      <PageHeader
        title="Under Construction"
        subtitle="Web UI initialisation phase"
        actions={null}
      />

      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-gray-600 max-w-lg mb-8">
          This section of the HoloTap platform is currently under construction.
          The identity, organisation, and QR‑security modules are being prepared
          for deployment.
        </p>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
          <p className="text-sm text-gray-500 mb-2">System Status</p>
          <p className="text-holotap-primary font-semibold">
            Web UI: Initialisation Phase
          </p>
        </div>
      </div>
    </Layout>
  );
}


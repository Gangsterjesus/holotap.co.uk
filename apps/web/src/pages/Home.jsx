/**
 * ============================================================
 *  HoloTap — Public Landing Page
 *  File: src/pages/public/Home.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  ------------------------------------------------------------
 *  Purpose:
 *    Public entry point for HoloTap identity + QR security platform.
 *
 *  Responsibilities:
 *    - Present brand identity
 *    - Provide onboarding CTA
 *    - Surface platform status
 * ============================================================
 */
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Home() {
  return (
    <Layout
      title="HoloTap"
      subtitle="Secure QR‑identity and organisation‑grade access control"
    >
      <PageHeader
        title="HoloTap"
        subtitle="Next‑generation digital trust and verification"
        actions={null}
      />

      <div className="flex justify-center mt-8 mb-8">
        <img
          src="/icon.png"
          alt="HoloTap"
          className="h-24"
        />
      </div>

      <a
          href="/onboarding"
          className="block px-6 py-3 mb-8 rounded-lg bg-holotap-primary text-white shadow-md max-w-md mx-auto text-center"
        >
          Get started
      </a>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto text-center">
        <p className="text-sm text-gray-500 mb-2">
          Platform Status
        </p>

        <p className="text-holotap-primary font-semibold">
          Identity &amp; QR Modules: Initialisation Phase
        </p>
      </div>
    </Layout>
  );
}
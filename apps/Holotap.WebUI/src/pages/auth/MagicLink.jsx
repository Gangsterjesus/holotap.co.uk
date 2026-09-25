/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/auth/MagicLink.jsx
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

export default function MagicLink() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        Magic Link Sent
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center max-w-xl mb-4">
        Check your email and click the link to complete sign‑in.
      </p>

      {/* Fallback Instructions */}
      <p className="text-gray-500 text-center max-w-lg">
        If you don’t see the email, check your spam folder or try again from
        the login page.
      </p>

      {/* Status Box */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-gray-500 mb-2">Authentication Status</p>
        <p className="text-holotap-primary font-semibold">
          Magic Link Delivery: Pending User Action
        </p>
      </div>

    </div>
  );
}

/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/auth/Passkey.jsx
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

export default function Passkey() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        Use Passkey
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center max-w-xl mb-4">
        Your browser will prompt you to use a saved passkey.
      </p>

      {/* Guidance */}
      <p className="text-gray-500 text-center max-w-lg leading-relaxed">
        Follow the browser instructions to complete sign‑in using your device
        credential or security key.
      </p>

      {/* Status Box */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-gray-500 mb-2">Authentication Status</p>
        <p className="text-holotap-primary font-semibold">
          Passkey Prompt: Awaiting User Action
        </p>
      </div>

    </div>
  );
}

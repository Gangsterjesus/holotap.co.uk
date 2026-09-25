/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/auth/VerifyAuth.jsx
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

import { useEffect, useState } from "react";

export default function VerifyAuth() {
  const [status, setStatus] = useState("Verifying…");

  async function verify() {
    try {
      const res = await fetch("http://192.168.1.205:3001/auth/verify");
      const data = await res.json();

      // Update UI status
      setStatus(data?.message || "Authenticated.");

      // Persist returning user details
      if (data?.authenticated && data?.email) {
        localStorage.setItem(
          "ht_last_user",
          JSON.stringify({
            email: data.email,
            role: data.role || "merchant",
            lastLogin: Date.now(),
          })
        );
      }
    } catch (err) {
      setStatus("Verification failed.");
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        Authentication
      </h1>

      {/* Status */}
      <p className="text-gray-600 text-center text-lg">
        {status}
      </p>

      {/* Status Box */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-gray-500 mb-2">Verification Status</p>
        <p className="text-holotap-primary font-semibold">
          {status}
        </p>
      </div>

    </div>
  );
}

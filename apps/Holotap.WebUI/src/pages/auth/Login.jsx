/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/auth/Login.jsx
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

export default function Login() {
  const [email, setEmail] = useState("");

  // ------------------------------------------------------------
  // Load returning user details (email auto‑fill)
  // ------------------------------------------------------------

  useEffect(() => {
    const last = localStorage.getItem("ht_last_user");
    if (last) {
      const user = JSON.parse(last);
      if (user?.email) {
        setEmail(user.email);
      }
    }
  }, []);

  async function requestMagicLink() {
    await fetch("http://192.168.1.205:3001/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  async function usePasskey() {
    await fetch("http://192.168.1.205:3001/auth/passkey/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        Sign In
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center max-w-xl mb-10">
        Choose magic link or passkey.
      </p>

      {/* Form */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-6">

        {/* Email */}
        <label className="flex flex-col gap-2 font-semibold text-gray-700">
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
          />
        </label>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={requestMagicLink}
            className="flex-1 bg-holotap-primary text-white font-semibold py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            Send Magic Link
          </button>

          <button
            onClick={usePasskey}
            className="flex-1 bg-gray-200 text-black font-semibold py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            Use Passkey
          </button>
        </div>

      </div>
    </div>
  );
}

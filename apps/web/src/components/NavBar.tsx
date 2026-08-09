/**
 * ============================================================
 *  HoloTap Web — Flow Navigation Component
 *  File: src/components/NavBar.tsx
 *  Engineers: Raymond Newton, Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web Architecture
 *  ------------------------------------------------------------
 *  Purpose:
 *    Provides deterministic navigation across all HoloTap flows.
 *
 *  Flow Map:
 *    Flow‑1  Registration
 *    Flow‑2  Returning Visitor
 *    Flow‑3  Activation
 *    Flow‑4  Calendar / Roster
 *    Flow‑5  Payments
 *    Flow‑6  Identity (QR, Signed Payload, Verification)
 *
 *  Notes:
 *    - Pure React SPA (no Next.js, no Router)
 *    - Uses <a href> for deterministic navigation
 *    - Matches Raymond’s Flow Plan exactly
 * ============================================================
 */

export function NavBar() {
  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300">
      <div className="max-w-5xl mx-auto px-4 py-3 flex gap-6 items-center">
        {/* Brand */}
        <a href="/" className="font-bold text-lg text-gray-800">
          HoloTap
        </a>

        {/* Flow Navigation */}
        <div className="flex gap-4">

          {/* Flow‑1: Registration */}
          <a href="/flow1/register" className="text-gray-700 hover:text-gray-900">
            Registration
          </a>

          {/* Flow‑2: Returning Visitor */}
          <a href="/flow2/returning" className="text-gray-700 hover:text-gray-900">
            Returning Visitor
          </a>

          {/* Flow‑3: Activation */}
          <a href="/flow3/activation" className="text-gray-700 hover:text-gray-900">
            Activation
          </a>

          {/* Flow‑4: Calendar / Roster */}
          <a href="/flow4/calendar" className="text-gray-700 hover:text-gray-900">
            Calendar
          </a>

          {/* Flow‑5: Payments */}
          <a href="/flow5/payments" className="text-gray-700 hover:text-gray-900">
            Payments
          </a>

          {/* Flow‑6: Identity Layer */}
          <a href="/qr/qr" className="text-gray-700 hover:text-gray-900">
            Identity QR
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Admin Section */}
        <div className="flex gap-4">
          <a href="/admin/live" className="text-gray-700 hover:text-gray-900">
            Live Payments
          </a>

          <a href="/admin/refund" className="text-gray-700 hover:text-gray-900">
            Refund / Void
          </a>
        </div>
      </div>
    </nav>
  );
}

/**
 * ============================================================
 *  HoloTap Web — Flow Navigation Component
 *  File: src/components/NavBar.tsFilePath: apps/web/src/config/NavBar.tsx
 *  Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 *  AI: Microsoft Copilot (2026)
 *  Engineers: Raymond Newton, Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web Architecture
 *  ISO: 27001 Aligned
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
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        {/* ====================================================
            BRAND
            ==================================================== */}
        <a href="/" className="font-bold text-xl text-slate-900">
          HoloTap
        </a>

        {/* ====================================================
            FLOW NAVIGATION
            ==================================================== */}
        <div className="flex flex-wrap gap-4">

          {/* Flow-1 */}
          <a href="/flow1/register" className="text-slate-700 hover:text-slate-900">
            Registration
          </a>

          {/* Flow-2 */}
          <a href="/flow2/returning" className="text-slate-700 hover:text-slate-900">
            Returning Visitor
          </a>

          {/* Flow-3 */}
          <a href="/flow3/activation" className="text-slate-700 hover:text-slate-900">
            Activation
          </a>

          {/* Flow-4 */}
          <a href="/flow4/calendar" className="text-slate-700 hover:text-slate-900">
            Calendar
          </a>

          {/* Flow-5 */}
          <a href="/flow5/payments" className="text-slate-700 hover:text-slate-900">
            Payments
          </a>

          {/* Flow-6 */}
          <a href="/qr/qr" className="text-slate-700 hover:text-slate-900">
            Identity QR
          </a>

        </div>

        {/* ====================================================
            FLEX SPACER
            ==================================================== */}
        <div className="flex-1" />

        {/* ====================================================
            ADMIN NAVIGATION
            ==================================================== */}
        <div className="flex gap-4">

          <a href="/admin/live" className="text-slate-700 hover:text-slate-900">
            Live Payments
          </a>

          <a href="/admin/refund" className="text-slate-700 hover:text-slate-900">
            Refund / Void
          </a>

        </div>

        {/* ====================================================
            PRIMARY CTA
            ==================================================== */}
        <a href="/onboarding" className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
          Get Started
        </a>

      </div>
    </nav>
  );
}
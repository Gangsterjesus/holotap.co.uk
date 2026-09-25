/**
 * ============================================================
 *  HoloTap — Dashboard Card Component
 *  File: src/components/DashboardCard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Provides a consistent card wrapper for dashboard surfaces,
 *    including payments, support, enquiries, and creator tools.
 *
 *  Responsibilities:
 *    - Display a title
 *    - Provide a padded, rounded content shell
 *    - Maintain deterministic v2 UI structure
 * ============================================================
 */

export default function DashboardCard({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      {title && (
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
      )}
      <div>{children}</div>
    </div>
  );
}

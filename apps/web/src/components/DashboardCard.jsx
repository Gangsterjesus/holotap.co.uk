/**
 * ============================================================
 * HoloTap Engineering
 * Engineer: Raymond Newton (E5357171)
 * Alias: GangsterJesus
 * AI Engineering Assistant: Microsoft Copilot (2026)
 *
 * Platform: HoloTap Hero v5
 *
 * File: DashboardCard.tsx
 * FilePath: apps/web/src/components/DashboardCard.jsx
 * Layer: Web UI
 * Component: DashboardCard
 * Version: 5.0.0
 * ISO: 27001 Aligned
 * Purpose:
 * ------------------------------------------------------------
 * Provides reusable metric and presentation cards for
 * dashboards, analytics, operational reporting,
 * identity services and administrative interfaces.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Render dashboard metrics
 * - Render dashboard content
 * - Maintain visual consistency
 * - Support Flow 9 analytics
 * - Support Flow 10 identity services
 * - Support future dashboard expansion
 *
 * Quality Objectives:
 * ------------------------------------------------------------
 * - ISO 27001 Aligned
 * - QoS Focused
 * - Accessible
 * - Scalable
 * - Maintainable
 * - Production Ready
 * - Future Proof
 *
 * ============================================================
 */
export default function DashboardCard({
  title,
  value,
  children,
  footer,
  className = "",
  testId,
}) {
  const cardId = `dashboard-card-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article
      aria-labelledby={cardId}
      data-testid={testId}
      className={`
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-md
        transition-shadow
        duration-200
        hover:shadow-lg
        ${className}
      `}
    >
      <header>
        <h2
          id={cardId}
          className="mb-3 text-xl font-semibold text-slate-900"
        >
          {title}
        </h2>
      </header>

      {value != null && (
        <div
          className="mb-4 text-3xl font-bold text-blue-600"
          aria-label={`${title} value`}
        >
          {value}
        </div>
      )}

      {children != null && (
        <section className="text-[15px] text-slate-700">
          {children}
        </section>
      )}

      {footer != null && (
        <footer className="mt-4 border-t border-slate-100 pt-4">
          {footer}
        </footer>
      )}
    </article>
  );
}
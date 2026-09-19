/**
 * ============================================================
 * HoloTap Engineering
 *
 * Engineer: Raymond Newton (E5357171)
 * Alias: GangsterJesus
 * AI Engineering Assistant: Microsoft Copilot (2026)
 *
 * Platform: HoloTap Hero v5
 *
 * <File: D:\holotap\holotap.co.uk\apps\web\src\components\Layout.jsx
 * Layer: Web UI
 * Component: Layout.jsx
 * Version: 5.0.0
 *
 * Purpose:
 *   Provides a reusable dashboard card component for metrics,
 *   analytics, monitoring, registry information, payment
 *   summaries, identity insights, and administrative views.
 *
 * Responsibilities:
 *   - Render dashboard metrics
 *   - Render card content
 *   - Provide visual consistency
 *   - Support Flow 9 analytics
 *   - Support Flow 10 identity services
 *   - Support future platform expansion
 *
 * QoS Objectives:
 *   - Performance
 *   - Availability
 *   - Accessibility
 *
 * Security:
 *   - ISO 27001 Aligned
 *
 * Design Goals:
 *   - Reusable
 *   - Scalable
 *   - Accessible
 *   - Production Ready
 *   - Future Proof
 *
 * ============================================================
 */

import PropTypes from "prop-types";

export default function DashboardCard({
  title,
  value,
  children,
  footer = null,
  className = "",
}) {
  return (
    <article
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
      aria-label={title}
    >
      {/* ======================================================
          TITLE
          ====================================================== */}

      <header>
        <h2 className="mb-3 text-xl font-semibold text-slate-900">
          {title}
        </h2>
      </header>

      {/* ======================================================
          VALUE
          ====================================================== */}

      {value !== undefined &&
        value !== null && (
          <div className="mb-4 text-3xl font-bold text-blue-600">
            {value}
          </div>
        )}

      {/* ======================================================
          CONTENT
          ====================================================== */}

      {children && (
        <section className="text-[15px] text-slate-700">
          {children}
        </section>
      )}

      {/* ======================================================
          FOOTER
          ====================================================== */}

      {footer && (
        <footer className="mt-4 border-t border-slate-100 pt-4">
          {footer}
        </footer>
      )}
    </article>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};
/**
 * ============================================================
 * HoloTap Engineering
 *
 * Engineer: Raymond Newton (E5357171)
 * AI Engineering Assistant: Microsoft Copilot
 *
 * File: src/components/DashboardCard.jsx
 * Layer: Web UI
 * Component: DashboardCard
 * Version: 5.0.0
 *
 * Purpose:
 *   Reusable dashboard card for metrics, analytics,
 *   identity, payments, monitoring and administration.
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
      <header>
        <h2 className="mb-3 text-xl font-semibold text-slate-900">
          {title}
        </h2>
      </header>

      {value !== undefined && value !== null && (
        <div className="mb-4 text-3xl font-bold text-blue-600">
          {value}
        </div>
      )}

      {children && (
        <section className="text-[15px] text-slate-700">
          {children}
        </section>
      )}

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
/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 * AI assistant: Co-Pilot (2026)
 * filePath: apps/web/src/components/DashboardGrid.jsx
 * File: DashboardGrid.jsx
 * Layer: Web UI
 * Component: DashboardGrid
 * version 5.0.0 
 * Purpose:
 *   Provides a responsive dashboard grid for cards,
 *   analytics widgets, management panels, and future
 *   Flow 9 / Flow 10 dashboard components.
 *
 * Responsibilities:
 *   - Responsive layout management
 *   - Consistent spacing
 *   - Dashboard visual alignment
 *   - Reusable card container
 *
 * Revision:
 *   v5.0.0
 * ============================================================
 */

import PropTypes from "prop-types";

export default function DashboardGrid({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        ${className}
      `}
      role="grid"
    >
      {children}
    </div>
  );
}

DashboardGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
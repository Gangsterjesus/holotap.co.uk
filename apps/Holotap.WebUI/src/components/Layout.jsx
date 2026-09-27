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
 * File: src/components/Layout.jsx
 * Layer: Web UI
 * Component: Layout
 * Version: 5.1.0
 *
 * Purpose:
 *   Provides the reusable application layout wrapper for
 *   HoloTap public and platform pages.
 *
 * Responsibilities:
 *   - Render application page content
 *   - Provide consistent layout structure
 *   - Preserve responsive page positioning
 *   - Support accessible semantic structure
 *   - Remain independent from dashboard components
 *
 * Engineer ID: E5357171
 * ============================================================
 */

import PropTypes from "prop-types";

export default function Layout({
  children,
  className = "",
}) {
  return (
    <main
      className={`holotap-layout ${className}`.trim()}
    >
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 *
 * File: pageHeader.jsx pathway:web\src\components\PageHeader.jsx
 * Layer: Web UI
 * Component: pageHeader.jsx
 * Version: 5.0.0
 * iso 27001 aligned 
 * Copilot Engineering Statement:
 * ------------------------------------------------------------
 * This component has undergone architecture review,
 * scalability assessment, production-hardening review,
 * accessibility review, refactoring analysis, and
 * implementation assistance using Microsoft Copilot.
 *
 * HoloTap Engineering demonstrates practical real-world
 * AI-assisted software engineering where all output remains
 * subject to human review, testing, validation, approval,
 * and engineering oversight.
 *  * QoS Objectives:
 *   - Performance
 *   - Availability
 *   - Accessibility
 *
 * Security Objectives:
 *   - ISO 27001 Aligned
 *   - Trust First Design
 *   - Deterministic Behaviour
 *
 * Purpose:
 * ------------------------------------------------------------
 * 
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - ...
 * - ...
 * - ...
 *
 * Design Principles:
 * ------------------------------------------------------------
 * - Scalable
 * - Reusable
 * - Maintainable
 * - Accessible
 * - Enterprise Ready
 * - Future Proof
 *
 * ============================================================
 */
export default function PageHeader({
  title,
  subtitle,
  actions,
  titleClassName = "text-3xl font-semibold",
  subtitleClassName = "text-gray-600 text-lg mt-1",
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className={titleClassName}>
          {title}
        </h1>

        {subtitle && (
          <p className={subtitleClassName}>
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
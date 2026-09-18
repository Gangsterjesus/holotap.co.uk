/**
 * ============================================================
 *  HoloTap — Page Header Component
 *  File: src/components/PageHeader.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Provides a consistent header for all HoloTap pages,
 *    including title, optional subtitle, and optional actions.
 *
 *  Responsibilities:
 *    - Display page title
 *    - Display optional subtitle
 *    - Display optional action buttons or controls
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
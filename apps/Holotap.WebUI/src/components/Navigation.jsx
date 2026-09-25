/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 * AI: Microsoft Copilot (2026)
 * File: Navigation.jsx
 * FilePath: apps/web/src/components/Navigation.jsx
 * Layer: Web UI
 * Component: Navigation
 * Version: 5.0.0
 * ISO: 27001 Aligned
 * Copilot Engineering Statement:
 * ------------------------------------------------------------
 * This component has undergone architecture review,
 * scalability assessment, production-hardening review,
 * accessibility review, QoS review, and implementation
 * assistance using Microsoft Copilot.
 *
 * HoloTap Engineering demonstrates practical real-world
 * AI-assisted software engineering where all output remains
 * subject to human review, testing, validation,
 * approval, and engineering oversight.
 *
 * Purpose:
 * ------------------------------------------------------------
 * Central navigation router responsible for selecting
 * the appropriate navigation experience based upon
 * authenticated user role.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Load public navigation
 * - Load creator navigation
 * - Load administrator navigation
 * - Support future role expansion
 * - Support route-level code splitting
 * - Provide deterministic fallback rendering
 *
 * Design Principles:
 * ------------------------------------------------------------
 * - Scalable
 * - Stateless
 * - Deterministic
 * - Enterprise Ready
 * - Future Proof
 * - QoS Focused
 *
 * ============================================================
 */

import { lazy, Suspense } from "react";

const NavigationPublic = lazy(() =>
  import("./navigation/NavigationPublic.jsx")
);

const NavigationCreator = lazy(() =>
  import("./navigation/NavigationCreator.jsx")
);

const NavigationAdmin = lazy(() =>
  import("./navigation/NavigationAdmin.jsx")
);

/**
 * ============================================================
 * ROLE NAVIGATION MAP
 * ============================================================
 */

const ROLE_NAVIGATION = {
  public: NavigationPublic,
  creator: NavigationCreator,
  admin: NavigationAdmin,
};

/**
 * ============================================================
 * COMPONENT
 * ============================================================
 */

export default function Navigation({
  role = "public",
}) {
  const NavigationComponent =
    ROLE_NAVIGATION[role] ?? NavigationPublic;

  return (
    <Suspense
      fallback={
        <div
          className="p-4 text-sm text-slate-500"
          aria-label="Loading navigation"
        >
          Loading navigation...
        </div>
      }
    >
      <NavigationComponent />
    </Suspense>
  );
}
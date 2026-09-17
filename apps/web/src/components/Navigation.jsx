/**
 * ============================================================
 * HoloTap Engineering — Global Navigation Router
 * ============================================================
 *
 * File:
 *   src/components/Navigation.jsx
 *
 * Author:
 *   Raymond Newton
 *
 * Engineer ID:
 *   E5357171
 *
 * Project:
 *   HoloTap Identity & QR Security Platform
 *
 * Layer:
 *   web-ui
 *
 * Revision:
 *   v5
 *
 * Date:
 *   11 September 2026
 *
 * ------------------------------------------------------------
 * Purpose
 * ------------------------------------------------------------
 * Central navigation router responsible for selecting
 * the appropriate navigation experience based upon
 * authenticated user role.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * - Load public navigation
 * - Load creator navigation
 * - Load administrator navigation
 * - Support route-level code splitting
 * - Provide deterministic fallback rendering
 *
 * Architecture Rules
 * ------------------------------------------------------------
 * - Stateless component
 * - Deterministic rendering only
 * - Lazy loading for bundle optimisation
 * - No navigation business logic
 * - No hidden side effects
 *
 * Copyright
 * ------------------------------------------------------------
 * © 2026 HoloTap Technologies Ltd.
 * All Rights Reserved.
 * ============================================================
 */

import { lazy, Suspense } from "react";

/* ============================================================
   ROLE NAVIGATION MODULES
   ============================================================ */

const NavigationPublic = lazy(() =>
  import("./navigation/NavigationPublic.jsx")
);

const NavigationCreator = lazy(() =>
  import("./navigation/NavigationCreator.jsx")
);

const NavigationAdmin = lazy(() =>
  import("./navigation/NavigationAdmin.jsx")
);

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Navigation({
  role = "public",
}) {
  return (
    <Suspense fallback={<div />}>
      {role === "public" && (
        <NavigationPublic />
      )}

      {role === "creator" && (
        <NavigationCreator />
      )}

      {role === "admin" && (
        <NavigationAdmin />
      )}
    </Suspense>
  );
}
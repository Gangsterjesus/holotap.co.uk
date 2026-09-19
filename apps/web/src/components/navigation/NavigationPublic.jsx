/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 *
 * File: NavigationPublic.jsx
 * FilePath: apps/web/src/components/navigation/NavigationPublic.jsx
 * Layer: Web UI (Public)
 * Component: NavigationPublic
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
 * Provides public-facing navigation for onboarding,
 * verification, landing experiences, registration,
 * identity discovery, and future public workflows.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Render public navigation
 * - Support onboarding journeys
 * - Support verification journeys
 * - Support future public workflows
 * - Maintain consistent navigation styling
 * - Provide deterministic rendering
 *
 * Design Principles:
 * ------------------------------------------------------------
 * - Scalable
 * - Accessible
 * - Enterprise Ready
 * - Future Proof
 * - QoS Focused
 * - Deterministic
 *
 * ============================================================
 */

import { NavLink } from "react-router-dom";

const LINKS = Object.freeze([
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Onboarding",
    to: "/onboarding",
  },
  {
    label: "Verify",
    to: "/verify",
  },
]);

const ACTIVE_LINK_CLASS =
  "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition";

const INACTIVE_LINK_CLASS =
  "text-white hover:text-holotap-accent transition";

export default function NavigationPublic() {
  return (
    <nav
      aria-label="Public Navigation"
      className="
        w-full
        bg-holotap-primary
        px-6
        py-4
        text-white
        shadow-lg
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
        "
      >
        {/* ======================================================
            BRAND
            ====================================================== */}

        <div className="text-xl font-bold tracking-wide">
          HoloTap
        </div>

        {/* ======================================================
            PUBLIC NAVIGATION
            ====================================================== */}

        <ul className="flex flex-wrap gap-6 text-sm">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? ACTIVE_LINK_CLASS
                    : INACTIVE_LINK_CLASS
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
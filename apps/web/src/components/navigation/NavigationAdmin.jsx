/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 *
 * File: NavigationAdmin.jsx
 * FilePath: apps/web/src/components/navigation/NavigationAdmin.jsx
 * Layer: Web UI (Admin)
 * Component: NavigationAdmin
 * Version: 5.0.0
 * ISO: 27001 Aligned
 *
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
 * Provides administrative navigation for platform
 * management, identity services, audit systems,
 * merchant administration, registry operations,
 * billing services, and future governance workflows.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Render administrator navigation
 * - Support role-based route access
 * - Provide deterministic navigation rendering
 * - Support future administrative modules
 * - Maintain visual consistency
 *
 * Design Principles:
 * ------------------------------------------------------------
 * - Scalable
 * - Accessible
 * - Enterprise Ready
 * - QoS Focused
 * - Future Proof
 * - Deterministic
 *
 * ============================================================
 */

import { NavLink } from "react-router-dom";

const LINKS = Object.freeze([
  {
    label: "Admin Dashboard",
    to: "/admin",
  },
  {
    label: "Merchants",
    to: "/admin/merchants",
  },
  {
    label: "System Logs",
    to: "/admin/logs",
  },
  {
    label: "System Status",
    to: "/admin/system",
  },
  {
    label: "Organisations",
    to: "/admin/orgs",
  },
  {
    label: "Users",
    to: "/admin/users",
  },
]);

const ACTIVE_LINK_CLASS =
  "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition";

const INACTIVE_LINK_CLASS =
  "text-white hover:text-holotap-accent transition";

export default function NavigationAdmin() {
  return (
    <nav
      aria-label="Administrator Navigation"
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

        <div className="flex items-center gap-3">
          /icon.png

          <span className="font-semibold tracking-wide">
            HoloTap
          </span>
        </div>

        {/* ======================================================
            NAVIGATION LINKS
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

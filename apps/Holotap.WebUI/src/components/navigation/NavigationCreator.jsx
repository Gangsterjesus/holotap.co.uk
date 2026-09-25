/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 *
 * File: NavigationCreator.jsx
 * FilePath: apps/web/src/components/navigation/NavigationCreator.jsx
 * Layer: Web UI (Creator)
 * Component: NavigationCreator
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
 * Provides creator navigation for scheduling,
 * payments, identity services, Flow 6 operations,
 * and future creator workflows.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Render creator navigation
 * - Render Flow 6 identity navigation
 * - Support future creator workflows
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
import { useState } from "react";

const MAIN_LINKS = Object.freeze([
  {
    label: "Calendar",
    to: "/merchant",
  },
  {
    label: "Payments",
    to: "/payment/result",
  },
]);

const IDENTITY_LINKS = Object.freeze([
  {
    label: "Identity QR",
    to: "/qr/qr",
  },
  {
    label: "Signed Payload",
    to: "/qr/payload",
  },
  {
    label: "Verify Identity",
    to: "/qr/verify",
  },
]);

const ACTIVE_LINK_CLASS =
  "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition";

const INACTIVE_LINK_CLASS =
  "text-white hover:text-holotap-accent transition";

export default function NavigationCreator() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Creator Navigation"
      className="w-full bg-holotap-primary px-6 py-4 text-white shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* ======================================================
            BRAND
            ====================================================== */}

        <div className="text-xl font-bold tracking-wide">
          HoloTap
        </div>

        {/* ======================================================
            MAIN NAVIGATION
            ====================================================== */}

        <ul className="flex flex-wrap items-center gap-6 text-sm">
          {MAIN_LINKS.map((link) => (
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

          {/* ======================================================
              FLOW 6 IDENTITY
              ====================================================== */}

          <li className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() =>
                setOpen((previous) => !previous)
              }
              className="
                font-medium
                text-white
                transition
                hover:text-holotap-accent
              "
            >
              Identity ▾
            </button>

            {open && (
              <ul
                className="
                  absolute
                  z-50
                  mt-2
                  w-48
                  rounded
                  border
                  border-holotap-accent
                  bg-holotap-primary
                  py-2
                  shadow-lg
                "
              >
                {IDENTITY_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="
                        block
                        px-4
                        py-2
                        text-white
                        transition
                        hover:bg-holotap-accent
                      "
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
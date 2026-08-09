/**
 * ============================================================
 *  HoloTap — Creator Navigation Surface
 *  File: src/components/navigation/NavigationCreator.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v2.2 — Flow‑6 Identity Submenu
 * ============================================================
 */

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavigationCreator() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-holotap-primary text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <div className="text-xl font-bold tracking-wide">HoloTap</div>

        {/* Main Navigation */}
        <ul className="flex gap-6 text-sm flex-wrap items-center">

          {/* Flow‑4: Calendar */}
          <li>
            <NavLink
              to="/merchant"
              className={({ isActive }) =>
                isActive
                  ? "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition"
                  : "text-white hover:text-holotap-accent transition"
              }
            >
              Calendar
            </NavLink>
          </li>

          {/* Flow‑5: Payments */}
          <li>
            <NavLink
              to="/payment/result"
              className={({ isActive }) =>
                isActive
                  ? "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition"
                  : "text-white hover:text-holotap-accent transition"
              }
            >
              Payments
            </NavLink>
          </li>

          {/* Flow‑6: Identity (Dropdown) */}
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-white hover:text-holotap-accent transition font-medium"
            >
              Identity ▾
            </button>

            {open && (
              <ul className="absolute mt-2 bg-holotap-primary border border-holotap-accent rounded shadow-lg w-40 py-2 z-50">

                <li>
                  <NavLink
                    to="/qr/qr"
                    className="block px-4 py-2 text-white hover:bg-holotap-accent transition"
                  >
                    Identity QR
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/qr/payload"
                    className="block px-4 py-2 text-white hover:bg-holotap-accent transition"
                  >
                    Signed Payload
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/qr/verify"
                    className="block px-4 py-2 text-white hover:bg-holotap-accent transition"
                  >
                    Verify Identity
                  </NavLink>
                </li>

              </ul>
            )}
          </li>

        </ul>

      </div>
    </nav>
  );
}

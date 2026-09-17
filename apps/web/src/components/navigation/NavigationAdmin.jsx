/**
 * ============================================================
 *  HoloTap — Admin Navigation Surface
 *  File: src/components/navigation/NavigationAdmin.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (admin)
 *  Revision: v2 — Unified Architecture
 * ============================================================
 */

import { NavLink } from "react-router-dom";

const LINKS = [
  { label: "Admin Dashboard", to: "/admin" },
  { label: "Merchants", to: "/admin/merchants" },
  { label: "System Logs", to: "/admin/logs" },
  { label: "System Status", to: "/admin/system" },
  { label: "Organisations", to: "/admin/orgs" },
  { label: "Users", to: "/admin/users" },
];

export default function NavigationAdmin() {
  return (
    <nav className="w-full bg-holotap-primary text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="HoloTap" />
          <span className="font-semibold tracking-wide">HoloTap</span>
        </div>

        <ul className="flex gap-6 text-sm flex-wrap">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition"
                    : "text-white hover:text-holotap-accent transition"
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


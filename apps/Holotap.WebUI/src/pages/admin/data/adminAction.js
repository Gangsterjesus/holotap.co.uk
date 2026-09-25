/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 *
 * File: adminAction.js
 * Module: Admin Navigation Actions
 *
 * Purpose:
 *   Central definition of all Admin navigation actions.
 * ============================================================
 */

export const adminActions = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: "/admin/dashboard",
    variant: "primary",
  },
  {
    key: "users",
    label: "Users",
    route: "/admin/users",
    variant: "primary",
  },
  {
    key: "merchants",
    label: "Merchants",
    route: "/admin/merchants",
    variant: "primary",
  },
  {
    key: "organisations",
    label: "Organisations",
    route: "/admin/organisations",
    variant: "primary",
  },
  {
    key: "logs",
    label: "Audit Logs",
    route: "/admin/logs",
    variant: "primary",
  },
  {
    key: "refunds",
    label: "Refunds",
    route: "/admin/refunds",
    variant: "primary",
  },
  {
    key: "status",
    label: "System Status",
    route: "/admin/status",
    variant: "primary",
  },
  {
    key: "live",
    label: "Live Monitoring",
    route: "/admin/live",
    variant: "primary",
  },
  {
    key: "enquiries",
    label: "Enquiries",
    route: "/admin/enquiries",
    variant: "primary",
  },
];
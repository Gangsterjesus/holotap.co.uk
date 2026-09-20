/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 *
 * File: adminMetrics.js
 * Module: Admin Metrics Registry
 *
 * Purpose:
 *   Central source of truth for admin dashboard metrics.
 * ============================================================
 */
export const dashboardMetrics = [
  {
    key: "creators",
    title: "Total Creators",
    value: "0",
    trend: "+0%",
    severity: "healthy",
  },
  {
    key: "badges",
    title: "Active Badges",
    value: "0",
    trend: "+0%",
    severity: "healthy",
  },
  {
    key: "alerts",
    title: "System Alerts",
    value: "None",
    trend: "0",
    severity: "healthy",
  },
  {
    key: "payments",
    title: "Live Payments",
    value: "0",
    trend: "+0%",
    severity: "healthy",
  },
  {
    key: "refunds",
    title: "Pending Refunds",
    value: "0",
    trend: "+0%",
    severity: "warning",
  },
  {
    key: "status",
    title: "Platform Status",
    value: "Operational",
    trend: "99.98%",
    severity: "healthy",
  },
];

export const onboardingMetrics = [];
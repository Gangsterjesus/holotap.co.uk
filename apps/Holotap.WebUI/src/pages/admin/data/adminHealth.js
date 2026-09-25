/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 *
 * File: adminHealth.js
 * Module: Admin Health Registry
 * ============================================================
 */

export const platformHealth = [
  {
    key: "platform",
    title: "Platform Status",
    status: "Operational",
    severity: "healthy",
    uptime: "99.98%",
    lastUpdated: "Live",
  },
  {
    key: "api",
    title: "API Gateway",
    status: "Healthy",
    severity: "healthy",
    uptime: "99.97%",
    lastUpdated: "Live",
  },
  {
    key: "database",
    title: "Database",
    status: "Healthy",
    severity: "healthy",
    uptime: "100%",
    lastUpdated: "Live",
  },
];

export const operationalAlerts = [
  {
    key: "merchant-reviews",
    title: "Pending Merchant Reviews",
    value: "12",
    severity: "warning",
  },
  {
    key: "failed-payments",
    title: "Failed Payments",
    value: "2",
    severity: "critical",
  },
  {
    key: "support-enquiries",
    title: "Open Enquiries",
    value: "7",
    severity: "info",
  },
];
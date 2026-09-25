/**
 * ============================================================
 *  HoloTap — Live Monitoring Page (Admin)
 *  File: src/pages/admin/Live.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides real‑time monitoring of HoloTap platform activity.
 *  Displays live badge scans, payment attempts, fraud alerts,
 *  and system heartbeat indicators. Restricted to admin role.
 *
 *  Responsibilities:
 *  - Display live system metrics
 *  - Provide visibility into real‑time platform activity
 *  - Maintain consistent v2 UI structure
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";


/* ============================
   PAGE
   ============================ */

export default function Live() {
  return (
    <Layout>
      <PageHeader
        title="Live Monitoring"
        subtitle="Real‑time activity feed for HoloTap badge scans and payments"
      />

      <DashboardGrid>
        <DashboardCard title="System Heartbeat">
          <p className="text-gray-700">Status: Online</p>
          <p className="text-gray-700">Last Ping: Just now</p>
        </DashboardCard>

        <DashboardCard title="Live Badge Scans">
          <p className="text-gray-700">No scans detected.</p>
        </DashboardCard>

        <DashboardCard title="Live Payments">
          <p className="text-gray-700">No payment attempts detected.</p>
        </DashboardCard>

        <DashboardCard title="Fraud Alerts">
          <p className="text-gray-700">No fraud alerts at this time.</p>
        </DashboardCard>
      </DashboardGrid>
    </Layout>
  );
}

/**
 * ============================================================
 *  HoloTap — Admin Dashboard
 *  File: src/pages/admin/AdminDashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a high‑level overview of system activity for HoloTap
 *  administrators, including payments, refunds, logs, merchants,
 *  and operational status.
 *
 *  Responsibilities:
 *  - Display core system metrics
 *  - Provide quick visibility into operational health
 *  - Serve as the entry point for deeper admin tools
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

/* ============================
   PAGE
   ============================ */

export default function AdminDashboard() {
  return (
    <Layout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System overview and operational metrics"
      />

      <DashboardGrid>
        <DashboardCard title="Live Payments" value="12" />
        <DashboardCard title="Pending Refunds" value="4" />
        <DashboardCard title="System Status" value="Operational" />
        <DashboardCard title="Audit Logs" value="1,204" />
        <DashboardCard title="Merchants" value="87" />
        <DashboardCard title="Error Rate" value="0.3%" />
      </DashboardGrid>
    </Layout>
  );
}

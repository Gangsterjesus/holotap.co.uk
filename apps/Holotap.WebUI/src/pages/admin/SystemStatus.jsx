/**
 * ============================================================
 *  HoloTap — Admin Dashboard
 *  File: src/pages/admin/AdminDashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Provides administrators with a consolidated overview of
 *    platform activity, operational health, and system metrics.
 *
 *  Responsibilities:
 *    - Display key performance indicators
 *    - Surface operational status indicators
 *    - Act as the entry point for admin‑level tools
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";


/* ============================
   PAGE
   ============================ */

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  async function loadStats() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/dashboard");
      const data = await res.json();
      setStats(data);
    } catch {
      setStats({ error: "Unable to load dashboard metrics." });
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System overview and operational metrics for administrators"
      />

      <DashboardGrid>
        {/* Error state */}
        {stats && stats.error && (
          <DashboardCard title="Error Loading Metrics">
            <p className="text-red-600">{stats.error}</p>
          </DashboardCard>
        )}

        {/* Loading state */}
        {!stats && (
          <DashboardCard title="Loading Metrics…">
            <p className="text-gray-600">Fetching dashboard data…</p>
          </DashboardCard>
        )}

        {/* KPI Cards */}
        {stats && !stats.error && (
          <>
            <DashboardCard title="Live Payments" value={stats.livePayments ?? "—"} />
            <DashboardCard title="Pending Refunds" value={stats.pendingRefunds ?? "—"} />
            <DashboardCard title="System Status" value={stats.systemStatus ?? "—"} />
            <DashboardCard title="Audit Logs" value={stats.auditLogs ?? "—"} />
            <DashboardCard title="Merchants" value={stats.merchants ?? "—"} />
            <DashboardCard title="Error Rate" value={stats.errorRate ?? "—"} />
          </>
        )}
      </DashboardGrid>
    </Layout>
  );
}

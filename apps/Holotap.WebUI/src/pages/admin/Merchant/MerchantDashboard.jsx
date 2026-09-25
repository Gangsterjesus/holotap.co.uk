/**
 * ============================================================
 *  HoloTap — Merchant Dashboard
 *  File: src/pages/merchant/MerchantDashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a high‑level overview of merchant activity including
 *  revenue, payments, refunds, verification status, and QR status.
 *
 *  Responsibilities:
 *  - Display core merchant metrics
 *  - Provide quick visibility into business performance
 *  - Serve as the entry point for deeper merchant tools
 * ============================================================
 */

import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardGrid from "../../../components/DashboardGrid.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

/* ============================
   PAGE
   ============================ */

export default function MerchantDashboard() {
  return (
    <Layout>
      <PageHeader
        title="Merchant Dashboard"
        subtitle="Business overview and payment activity"
      />

      <DashboardGrid>
        <DashboardCard title="Total Revenue" value="£3,492.10" />
        <DashboardCard title="Payments Today" value="18" />
        <DashboardCard title="Refund Rate" value="0.4%" />
        <DashboardCard title="Verification Status" value="Verified" />
        <DashboardCard title="QR Code Status" value="Active" />
      </DashboardGrid>
    </Layout>
  );
}

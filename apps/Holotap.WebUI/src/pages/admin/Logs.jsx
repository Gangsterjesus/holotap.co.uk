/**
 * ============================================================
 *  HoloTap — System Logs Page (Admin)
 *  File: src/pages/admin/Logs.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays all system‑level logs including payment events,
 *  badge scans, identity updates, fraud alerts, and admin actions.
 *  This page is restricted to administrators only.
 *
 *  Responsibilities:
 *  - Provide filters for log categories
 *  - Display system event logs
 *  - Maintain consistent v2 UI structure
 * ============================================================
 */

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import Button from "../../components/Button.jsx";


/* ============================
   PAGE
   ============================ */

export default function Logs() {
  return (
    <Layout>
      <PageHeader
        title="System Logs"
        subtitle="View all recorded events across the HoloTap platform"
      />

      {/* Filters */}
      <div className="max-w-md mb-10 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Filters</h2>

        <select className="p-3 border rounded-lg text-[15px]">
          <option>All Events</option>
          <option>Payments</option>
          <option>Badge Scans</option>
          <option>Identity Updates</option>
          <option>Fraud Alerts</option>
          <option>Admin Actions</option>
        </select>

        <Button variant="primary">Apply Filter</Button>
      </div>

      {/* Logs List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Event Log</h2>
        <p className="text-gray-600">No logs available.</p>
      </div>
    </Layout>
  );
}

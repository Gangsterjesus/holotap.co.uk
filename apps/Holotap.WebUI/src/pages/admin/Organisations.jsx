/**
 * ============================================================
 *  HoloTap — Organisation Management (Admin)
 *  File: src/pages/admin/Organisations.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays all organisations registered on the HoloTap platform,
 *    including membership counts, identifiers, and operational status.
 *    Supports multi‑tenant administration for TM470.
 *
 *  Responsibilities:
 *    - Fetch organisation records from the admin API
 *    - Surface organisation identifiers and membership totals
 *    - Provide entry into deeper organisation‑level tools
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

export default function Organisations() {
  const [orgs, setOrgs] = useState(null);

  async function loadOrgs() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/organisations");
      const data = await res.json();
      setOrgs(data);
    } catch {
      setOrgs({ error: "Unable to load organisation data." });
    }
  }

  useEffect(() => {
    loadOrgs();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Organisations"
        subtitle="Multi‑tenant organisation directory for administrators"
      />

      <DashboardGrid>
        {/* Error state */}
        {orgs && orgs.error && (
          <DashboardCard title="Error Loading Organisations">
            <p className="text-red-600">{orgs.error}</p>
          </DashboardCard>
        )}

        {/* Loading state */}
        {!orgs && (
          <DashboardCard title="Loading Organisations…">
            <p className="text-gray-600">Fetching organisation records…</p>
          </DashboardCard>
        )}

        {/* Empty state */}
        {Array.isArray(orgs) && orgs.length === 0 && (
          <DashboardCard title="No Organisations Found">
            <p className="text-gray-600">No organisation records available.</p>
          </DashboardCard>
        )}

        {/* Organisation cards */}
        {Array.isArray(orgs) &&
          orgs.map((org) => (
            <DashboardCard key={org.id} title={org.name}>
              <p className="text-gray-700">
                Organisation ID: <strong>{org.id}</strong>
              </p>
              <p className="text-gray-700">
                Members: <strong>{org.members}</strong>
              </p>
            </DashboardCard>
          ))}
      </DashboardGrid>
    </Layout>
  );
}

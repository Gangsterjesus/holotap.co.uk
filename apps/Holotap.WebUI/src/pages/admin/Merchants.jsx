/**
 * ============================================================
 *  HoloTap — Merchant Directory
 *  File: src/pages/admin/Merchants.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *    Displays all merchants registered on the HoloTap platform,
 *    including identity, status, and operational metadata.
 *
 *  Module Responsibilities:
 *    - Fetch merchant records from the admin API
 *    - Surface merchant identifiers and status
 *    - Provide entry into deeper admin‑level merchant tools
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

export default function Merchants() {
  const [merchants, setMerchants] = useState([]);

  async function loadMerchants() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/merchants");
      const data = await res.json();
      setMerchants(data || []);
    } catch {
      setMerchants([]);
    }
  }

  useEffect(() => {
    loadMerchants();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Merchant Directory"
        subtitle="All merchants registered on the HoloTap platform"
      />

      <DashboardGrid>
        {merchants.length === 0 && (
          <DashboardCard title="No Merchants Found">
            <p className="text-gray-600">No merchant records available.</p>
          </DashboardCard>
        )}

        {merchants.map((m) => (
          <DashboardCard key={m.id} title={m.name}>
            <p className="text-gray-700">Merchant ID: {m.id}</p>
            <p className="text-gray-700">Status: {m.status}</p>
          </DashboardCard>
        ))}
      </DashboardGrid>
    </Layout>
  );
}

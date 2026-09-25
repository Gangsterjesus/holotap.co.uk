/**
 * ============================================================
 *  HoloTap — Payments Feed (Merchant)
 *  File: src/pages/merchant/PaymentsFeed.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays recent merchant payments, including amount, status,
 *    reference, and timestamp. Supports merchant‑level inspection.
 *
 *  Responsibilities:
 *    - Fetch payment records from the merchant API
 *    - Surface payment metadata
 *    - Provide clean, deterministic v2 UI
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

/* ============================
   PAGE
   ============================ */

export default function PaymentsFeed() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPayments() {
    try {
      const response = await fetch("http://192.168.1.205:3001/payments/list");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load payments");
      }

      setPayments(data.payments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Payments Feed"
        subtitle="Recent merchant payment activity"
      />

      {/* Loading */}
      {loading && (
        <DashboardCard title="Loading Payments…">
          <p className="text-gray-600">Fetching payment records…</p>
        </DashboardCard>
      )}

      {/* Error */}
      {error && (
        <DashboardCard title="Error Loading Payments">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Empty */}
      {!loading && !error && payments.length === 0 && (
        <DashboardCard title="No Payments Found">
          <p className="text-gray-600">No recent payment records available.</p>
        </DashboardCard>
      )}

      {/* Payments List */}
      {!loading && !error && payments.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">
                  £{payment.amount}
                </span>
                <span className="text-sm text-gray-700">{payment.status}</span>
              </div>

              <div className="flex flex-col text-gray-700 text-sm">
                <span>Ref: {payment.reference}</span>
                <span>{payment.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

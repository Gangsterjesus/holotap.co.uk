/**
 * ============================================================
 *  HoloTap — Payments Overview (Flow 5)
 *  File: src/pages/payments.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Displays the creator’s payment history including amounts,
 *    timestamps, session linkage, and payment status.
 *
 *  Responsibilities:
 *    - Fetch payment records
 *    - Display session-linked payment history
 *    - Provide deterministic v2 UI
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../services/api";

import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DashboardCard from "../components/DashboardCard.jsx";

export default function Payments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await getPayments();
        setPayments(res.payments || []);
      } catch (err) {
        console.error("Payments fetch error:", err);
        setError("Unable to load payments.");
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  return (
    <Layout
      title="Payments"
      subtitle="Your hologram badge payment history"
    >
      <PageHeader
        title="Payments"
        subtitle="Session-linked payment history"
        actions={null}
      />

      {/* Error */}
      {error && (
        <DashboardCard title="Error Loading Payments">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Loading */}
      {loading && (
        <DashboardCard title="Loading Payments…">
          <p className="text-gray-600">Fetching payment records…</p>
        </DashboardCard>
      )}

      {/* Empty */}
      {!loading && payments.length === 0 && (
        <DashboardCard title="No Payments Recorded">
          <p className="text-gray-600">You have no payment history yet.</p>
        </DashboardCard>
      )}

      {/* Payment List */}
      {!loading && payments.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {payments.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-5 bg-white shadow-sm"
            >
              <h2 className="text-xl font-semibold text-black">
                £{p.amount.toFixed(2)}
              </h2>

              <p className="text-gray-700 mt-1">
                Status: <strong>{p.status}</strong>
              </p>

              <p className="text-gray-700 mt-1">
                Session: <strong>{p.sessionId}</strong>
              </p>

              <p className="text-gray-700 mt-1">
                Date:{" "}
                <strong>{new Date(p.timestamp).toLocaleString()}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-3 bg-black text-white rounded-lg font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
}

/**
 * ============================================================
 *  HoloTap — QR Activation Result Screen (Merchant)
 *  File: src/pages/merchant/QRActivationResult.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays the result of a QR activation event.
 *    Shows success, failure, or pending states.
 *    Provides navigation back to QR Activation or Dashboard.
 *
 *  Responsibilities:
 *    - Fetch activation result
 *    - Display status + message
 *    - Provide navigation actions
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

/* ============================
   PAGE
   ============================ */

export default function QRActivationResult() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchResult() {
      try {
        const response = await fetch("http://192.168.1.205:3001/session/result");
        const data = await response.json();

        setStatus(data.status);
        setMessage(data.message);
      } catch {
        setStatus("error");
        setMessage("Unable to retrieve activation result.");
      }
    }

    fetchResult();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Activation Result"
        subtitle="Status of your QR payment session"
      />

      <DashboardCard title="QR Activation Status">
        {/* Success */}
        {status === "success" && (
          <p className="text-green-600 font-medium">{message}</p>
        )}

        {/* Error */}
        {status === "error" && (
          <p className="text-red-600 font-medium">{message}</p>
        )}

        {/* Pending */}
        {status === "pending" && (
          <p className="text-gray-700 font-medium">Waiting for activation…</p>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={() => (window.location.href = "/qr/activate")}
            className="px-5 py-3 bg-black text-white rounded-lg font-medium"
          >
            Generate New QR
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="px-5 py-3 bg-gray-200 text-black rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardCard>
    </Layout>
  );
}

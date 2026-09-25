/**
 * ============================================================
 *  HoloTap — QR Activation Screen (Merchant)
 *  File: src/pages/merchant/QRActivation.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Merchant-facing screen for generating secure QR payment sessions.
 *    Calls /session/create on HoloTapServer and renders QR code,
 *    session token, and live expiry countdown.
 *
 *  Responsibilities:
 *    - Generate QR session
 *    - Display QR code + token
 *    - Show countdown timer
 *    - Provide regeneration flow
 * ============================================================
 */

import { useState, useEffect } from "react";
import QRCode from "react-qrcode-svg";
import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

/* ============================
   PAGE
   ============================ */

export default function QRActivation() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [expires, setExpires] = useState(null);
  const [error, setError] = useState(null);

  async function generateQR() {
    try {
      setLoading(true);
      setError(null);
      setToken(null);

      const response = await fetch("http://192.168.1.205:3001/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId: "MERCHANT_123" })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate QR session");
      }

      setToken(data.token);
      setExpires(data.expiresIn ?? 30);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ============================
     Countdown Timer
     ============================ */
  useEffect(() => {
    if (!token || !expires) return;

    const interval = setInterval(() => {
      setExpires((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token, expires]);

  return (
    <Layout>
      <PageHeader
        title="QR Activation"
        subtitle="Generate a QR code to start a secure payment session"
      />

      {/* Loading */}
      {loading && (
        <DashboardCard title="Generating QR…">
          <p className="text-gray-600">Please wait…</p>
        </DashboardCard>
      )}

      {/* Error */}
      {error && (
        <DashboardCard title="Error Generating QR">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Generate Button */}
      {!token && !loading && (
        <button
          onClick={generateQR}
          className="px-5 py-3 bg-black text-white rounded-lg font-medium mt-4"
        >
          Generate QR
        </button>
      )}

      {/* QR Content */}
      {token && (
        <DashboardCard title="QR Session">
          <div className="flex flex-col items-center gap-4">

            <QRCode value={token} size={220} />

            <p className="text-gray-700 font-medium">Session Token:</p>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">
              {token}
            </code>

            <p
              className={
                expires > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {expires > 0
                ? `Expires in: ${expires}s`
                : "QR expired — generate a new one"}
            </p>

            {expires === 0 && (
              <button
                onClick={() => {
                  setToken(null);
                  setExpires(null);
                }}
                className="px-5 py-3 bg-black text-white rounded-lg font-medium"
              >
                Generate Another
              </button>
            )}
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}

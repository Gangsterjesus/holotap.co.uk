/**
 * ============================================================
 * HoloTap HERO v5.0.0 — QR Activation Result
 * ============================================================
 * File: src/pages/qr/QRActivationResult.jsx
 * Engineers: Raymond Newton (E5357171),
 *            Copilot Engineering Assistant
 * Layer: HERO WebUI
 * Revision: v5.0.0
 * Date: 28 October 2026
 *
 * © 2026 HoloTap Technologies Ltd.
 * All Rights Reserved.
 * ============================================================
 *
 * MODULE PURPOSE
 * ------------------------------------------------------------
 * Display the outcome of a Flow‑6 identity activation
 * and associated HERO payment session.
 *
 * MODULE RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Retrieve activation result
 * • Display verification status
 * • Display payment metadata
 * • Display expiry information
 * • Provide navigation actions
 * • Handle loading and failure states
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

export default function QRActivationResult() {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const response = await fetch("/session/result");
        const data = await response.json();

        setStatus(data?.status ?? "pending");
        setMessage(data?.message ?? "");

        setPaymentId(data?.paymentId ?? null);

        const expiry =
          data?.expiresAt &&
          !Number.isNaN(new Date(data.expiresAt).getTime())
            ? data.expiresAt
            : null;

        setExpiresAt(expiry);
      } catch {
        setStatus("error");
        setMessage(
          "Unable to retrieve activation result."
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchResult();
  }, []);

  const formattedExpiry = (() => {
    if (!expiresAt) {
      return null;
    }

    const date = new Date(expiresAt);

    if (Number.isNaN(date.getTime())) {
      return "Invalid expiry date";
    }

    return date.toLocaleString();
  })();

  return (
    <Layout>
      <PageHeader
        title="Activation Result"
        subtitle="Status of your HERO payment session"
      />

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {loading
          ? "Loading activation result"
          : `Activation status ${status}`}
      </div>

      <DashboardCard title="QR Activation Status">
        {loading && (
          <p className="text-gray-600">
            Loading activation result...
          </p>
        )}

        {!loading && status === "success" && (
          <p
            role="status"
            className="text-green-600 font-medium"
          >
            {message}
          </p>
        )}

        {!loading && status === "error" && (
          <p
            role="alert"
            className="text-red-600 font-medium"
          >
            {message}
          </p>
        )}

        {!loading && status === "pending" && (
          <p className="text-gray-700 font-medium">
            Waiting for activation...
          </p>
        )}

        {(paymentId || formattedExpiry) && (
          <div className="mt-6 bg-gray-50 border rounded-lg p-4">
            {paymentId && (
              <div className="mb-2">
                <span className="font-semibold">
                  Payment ID:
                </span>{" "}
                <code>{paymentId}</code>
              </div>
            )}

            {formattedExpiry && (
              <div>
                <span className="font-semibold">
                  Expires:
                </span>{" "}
                {formattedExpiry}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/qr/activate")
            }
            className="px-5 py-3 bg-black text-white rounded-lg font-medium"
          >
            Generate New QR
          </button>

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/dashboard")
            }
            className="px-5 py-3 bg-gray-200 text-black rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardCard>
    </Layout>
  );
}
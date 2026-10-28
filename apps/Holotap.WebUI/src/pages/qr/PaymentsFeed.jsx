/**
 * ============================================================
 * HoloTap HERO v5.0.0 — Merchant Payments Feed
 * ============================================================
 * File: src/pages/merchant/PaymentsFeed.jsx
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
 * Displays merchant payment activity for the HERO payment flow.
 *
 * MODULE RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Retrieve payment records
 * • Display payment metadata
 * • Display payment status
 * • Display payment identifiers
 * • Surface loading and error states
 * • Support manual refresh
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";

const STATUS_CLASSES = {
  PENDING: "text-yellow-600",
  AUTHORISED: "text-blue-600",
  SETTLED: "text-green-600",
  FAILED: "text-red-600",
  REFUNDED: "text-purple-600",
};

export default function PaymentsFeed() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPayments() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://192.168.1.205:3001/payments/list"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load payments"
        );
      }

      setPayments(
        Array.isArray(data?.payments)
          ? data.payments
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load payments"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPayments();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Payments Feed"
        subtitle="Recent HERO payment activity"
      />

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {loading
          ? "Loading payments"
          : error
            ? `Error loading payments: ${error}`
            : `${payments.length} payments loaded`}
      </div>

      <div className="mb-4">
        <button
          type="button"
          disabled={loading}
          onClick={loadPayments}
          aria-disabled={loading}
          className="
            px-4
            py-2
            rounded-lg
            bg-black
            text-white
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading && (
        <DashboardCard title="Loading Payments">
          <div role="status" aria-live="polite">
            Fetching payment records...
          </div>
        </DashboardCard>
      )}

      {error && (
        <DashboardCard title="Error Loading Payments">
          <div role="alert" className="text-red-600">
            {error}
          </div>
        </DashboardCard>
      )}

      {!loading && !error && payments.length === 0 && (
        <DashboardCard title="No Payments Found">
          <p className="text-gray-600">
            No recent payment records available.
          </p>
        </DashboardCard>
      )}

      {!loading && !error && payments.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {payments.map((payment) => {
            const statusClass =
              STATUS_CLASSES[payment.status] ??
              "text-gray-600";

            const timestamp =
              payment.timestamp &&
              !Number.isNaN(
                new Date(payment.timestamp).getTime()
              )
                ? new Date(
                    payment.timestamp
                  ).toLocaleString()
                : "Unknown timestamp";

            return (
              <div
                key={payment.paymentId || payment.id}
                className="
                  border
                  rounded-lg
                  p-4
                  shadow-sm
                  bg-white
                "
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg">
                    £{payment.amount}
                  </span>

                  <span
                    className={`text-sm font-medium ${statusClass}`}
                  >
                    {payment.status}
                  </span>
                </div>

                <div className="flex flex-col text-sm text-gray-700 gap-1">
                  <span>
                    Payment ID:{" "}
                    {payment.paymentId ??
                      payment.reference ??
                      "Unknown"}
                  </span>

                  <span>
                    Merchant:{" "}
                    {payment.merchantId ?? "Unknown"}
                  </span>

                  <span>
                    Timestamp: {timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
/**
 * ============================================================
 *  HoloTap — Payment Result (Flow 8.3)
 *  File: src/pages/payments/result.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 10 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Displays the final outcome of a payment lifecycle.
 *
 *  Responsibilities:
 *    - Fetch payment session by ID
 *    - Show status (SUCCESS / FAILED / PENDING)
 *    - Provide deterministic navigation back to dashboard/history
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

import { getPaymentSession } from "../../services/api";

export default function PaymentResult() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPayment() {
      try {
        const res = await getPaymentSession(paymentId);

        if (!res || !res.paymentId) {
          setError("PAYMENT_NOT_FOUND");
          setLoading(false);
          return;
        }

        setPayment(res);
        setLoading(false);
      } catch (err) {
        console.error("Payment result fetch error:", err);
        setError("NETWORK_ERROR");
        setLoading(false);
      }
    }

    loadPayment();
  }, [paymentId]);

  const renderStatusBanner = () => {
    if (!payment) return null;

    if (payment.status === "SUCCESS") {
      return (
        <p className="text-green-600 font-semibold">
          Payment completed successfully.
        </p>
      );
    }

    if (payment.status === "FAILED") {
      return (
        <p className="text-red-600 font-semibold">
          Payment failed. Please try again or contact support.
        </p>
      );
    }

    return (
      <p className="text-yellow-600 font-semibold">
        Payment is still pending. Please wait…
      </p>
    );
  };

  return (
    <Layout
      title="Payment Result"
      subtitle="Flow 8.3 — Payment Outcome"
    >
      <PageHeader
        title="Payment Result"
        subtitle="Final status of your payment lifecycle"
        actions={null}
      />

      {/* Loading */}
      {loading && (
        <DashboardCard title="Loading Payment Result…">
          <p className="text-gray-600">Fetching payment outcome…</p>
        </DashboardCard>
      )}

      {/* Error */}
      {error && (
        <DashboardCard title="Error">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Payment Result */}
      {payment && !loading && (
        <DashboardCard title="Payment Summary" value="">
          <div className="flex flex-col gap-2 text-gray-800">

            {renderStatusBanner()}

            <p>
              <strong>Amount:</strong> £{payment.amount.toFixed(2)}
            </p>

            <p>
              <strong>Merchant:</strong> {payment.merchant}
            </p>

            <p>
              <strong>Device:</strong> {payment.device}
            </p>

            <p>
              <strong>Session:</strong> {payment.sessionId}
            </p>

            <p>
              <strong>Payment ID:</strong> {payment.paymentId}
            </p>

            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(payment.timestamp).toLocaleString()}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/payments")}
                className="px-5 py-3 bg-black text-white rounded-lg font-medium"
              >
                View Payment History
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-3 bg-gray-800 text-white rounded-lg font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}

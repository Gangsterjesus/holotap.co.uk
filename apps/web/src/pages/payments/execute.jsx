/**
 * ============================================================
 *  HoloTap — Payment Execution (Flow 8.2)
 *  File: src/pages/payments/execute.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 10 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Executes a payment lifecycle after initialisation.
 *
 *  Responsibilities:
 *    - Fetch payment session
 *    - Display amount, merchant, device, identity metadata
 *    - Execute payment → redirect to Flow 8.3 (Result)
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

import { getPaymentSession, executePayment } from "../../services/api";

export default function PaymentExecute() {
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
        console.error("Payment fetch error:", err);
        setError("NETWORK_ERROR");
        setLoading(false);
      }
    }

    loadPayment();
  }, [paymentId]);

  async function handleExecute() {
    try {
      setLoading(true);

      const res = await executePayment(paymentId);

      if (!res || !res.status) {
        setError("PAYMENT_EXECUTION_FAILED");
        setLoading(false);
        return;
      }

      navigate(`/payments/result/${paymentId}`);
    } catch (err) {
      console.error("Payment execution error:", err);
      setError("NETWORK_ERROR");
      setLoading(false);
    }
  }

  return (
    <Layout
      title="Execute Payment"
      subtitle="Flow 8.2 — Payment Execution"
    >
      <PageHeader
        title="Execute Payment"
        subtitle="Identity-bound payment execution"
        actions={null}
      />

      {/* Loading */}
      {loading && (
        <DashboardCard title="Loading Payment…">
          <p className="text-gray-600">Fetching payment session…</p>
        </DashboardCard>
      )}

      {/* Error */}
      {error && (
        <DashboardCard title="Error">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Payment Details */}
      {payment && !loading && (
        <DashboardCard title="Payment Details" value="">
          <div className="flex flex-col gap-2 text-gray-800">

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
              <strong>Status:</strong> {payment.status}
            </p>

            <button
              onClick={handleExecute}
              className="mt-4 px-5 py-3 bg-black text-white rounded-lg font-medium"
            >
              Execute Payment
            </button>
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}

/**
 * ============================================================
 *  HoloTap — Payment Lifecycle Initialiser (Flow 8)
 *  File: src/pages/payments/start.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 10 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Initialises a new payment lifecycle using the injected
 *    identity session (Flow 6) and verified status (Flow 7).
 *
 *  Responsibilities:
 *    - Read SessionActor from sessionStore
 *    - Display merchant + device + identity metadata
 *    - Call backend initiatePayment() to create a payment session
 *    - Redirect to Flow 8.2 (Payment Execution)
 *
 *  Notes:
 *    - Deterministic architecture only
 *    - Later versions will include hologram binding + registry checks
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

import { getSessionValue } from "../../utils/session/sessionStore";
import { initiatePayment } from "../../services/api"; // backend hook

export default function PaymentStart() {
  const navigate = useNavigate();

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Load identity session (Flow 6 → Flow 7 → Flow 8)
   */
  useEffect(() => {
    const storedActor = getSessionValue("actor");

    if (!storedActor) {
      setError("NO_IDENTITY_SESSION");
      setLoading(false);
      return;
    }

    setActor(storedActor);
    setLoading(false);
  }, []);

  /**
   * Initialise payment lifecycle
   */
  async function handleStartPayment() {
    try {
      setLoading(true);

      const res = await initiatePayment({
        merchant: actor.merchant,
        device: actor.device,
        issuedAt: actor.issuedAt,
      });

      if (!res || !res.paymentId) {
        setError("PAYMENT_INIT_FAILED");
        setLoading(false);
        return;
      }

      // Flow 8.2 → Payment Execution
      navigate(`/payments/execute/${res.paymentId}`);
    } catch (err) {
      console.error("Payment init error:", err);
      setError("NETWORK_ERROR");
      setLoading(false);
    }
  }

  return (
    <Layout
      title="Start Payment"
      subtitle="Flow 8 — Payment Lifecycle Initialisation"
    >
      <PageHeader
        title="Start Payment"
        subtitle="Identity-bound payment initialisation"
        actions={null}
      />

      {/* Loading */}
      {loading && (
        <DashboardCard title="Preparing Payment…">
          <p className="text-gray-600">Initialising payment lifecycle…</p>
        </DashboardCard>
      )}

      {/* Error */}
      {error && (
        <DashboardCard title="Error">
          <p className="text-red-600">{error}</p>
        </DashboardCard>
      )}

      {/* Identity Session */}
      {actor && !loading && (
        <DashboardCard title="Identity Session" value="">
          <div className="flex flex-col gap-2 text-gray-800">

            <p>
              <strong>Merchant:</strong> {actor.merchant}
            </p>

            <p>
              <strong>Device:</strong> {actor.device}
            </p>

            <p>
              <strong>Issued At:</strong> {actor.issuedAt}
            </p>

            <p className="text-yellow-600 font-medium mt-2">
              Identity verified — ready to initialise payment.
            </p>

            <button
              onClick={handleStartPayment}
              className="mt-4 px-5 py-3 bg-black text-white rounded-lg font-medium"
            >
              Begin Payment Lifecycle
            </button>
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}

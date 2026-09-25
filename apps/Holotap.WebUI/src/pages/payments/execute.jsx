/**
 * ============================================================
 *  HoloTap Engineering — HERO Build
 * ============================================================
 *
 *  Component: Payment Execution
 *  Flow:      Flow 8.2
 *  File:      src/pages/payments/execute.jsx
 *  Version:   5.0.0
 *  Date:      25 September 2026
 *
 *  Authors:
 *    - Raymond Newton — Engineer E5357171
 *    - Microsoft Copilot — Engineering Assistant
 *
 *  Description:
 *    Security-hardened payment execution component responsible
 *    for retrieving, validating, presenting and executing an
 *    existing HoloTap payment session before routing the user
 *    to Flow 8.3 for the payment result.
 *
 *  Security Posture:
 *    - Defensive payment-session validation
 *    - Duplicate execution suppression
 *    - Explicit payment-state handling
 *    - Payment identifier validation
 *    - Minimal client-side information disclosure
 *    - Controlled production error handling
 *    - Defensive API-response validation
 *
 *  IMPORTANT:
 *    Client-side controls are defence-in-depth only.
 *
 *    Authentication, authorisation, idempotency, replay
 *    prevention, transaction integrity and authoritative
 *    payment-state enforcement MUST remain on the API/server
 *    security boundary.
 *
 * ============================================================
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

import {
  getPaymentSession,
  executePayment,
} from "../../services/api";

/**
 * States from which the UI permits an execution request.
 *
 * Keep this synchronised with the authoritative backend
 * payment state machine.
 */
const EXECUTABLE_STATUSES = new Set(["PENDING", "READY"]);

/**
 * Terminal successful states returned by the execution API.
 *
 * Adjust these names only to match the documented API contract.
 */
const SUCCESS_STATUSES = new Set(["COMPLETED", "SUCCEEDED"]);

/**
 * Conservative identifier validation.
 *
 * This is not an authorisation control. It prevents obviously
 * malformed route input from reaching the API.
 */
function isValidPaymentId(value) {
  return (
    typeof value === "string" &&
    value.length >= 8 &&
    value.length <= 128 &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}

/**
 * Validate the minimum session shape required by this page.
 */
function isValidPaymentSession(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.paymentId === "string" &&
    Number.isInteger(value.amountMinor) &&
    value.amountMinor >= 0 &&
    typeof value.currency === "string" &&
    /^[A-Z]{3}$/.test(value.currency) &&
    typeof value.merchant === "string" &&
    value.merchant.length > 0 &&
    typeof value.status === "string"
  );
}

/**
 * Format server-provided minor currency units.
 *
 * No payment calculation or rounding occurs here.
 */
function formatAmount(amountMinor, currency) {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
    }).format(amountMinor / 100);
  } catch {
    return "Unavailable";
  }
}

export default function PaymentExecute() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const executionLock = useRef(false);

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPayment() {
      setLoading(true);
      setError("");
      setPayment(null);

      if (!isValidPaymentId(paymentId)) {
        setError("INVALID_PAYMENT_REFERENCE");
        setLoading(false);
        return;
      }

      try {
        const response = await getPaymentSession(paymentId, {
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        if (!isValidPaymentSession(response)) {
          setError("PAYMENT_SESSION_INVALID");
          return;
        }

        /*
         * Prevent inconsistent server data from silently replacing
         * the route-bound payment identity.
         */
        if (response.paymentId !== paymentId) {
          setError("PAYMENT_REFERENCE_MISMATCH");
          return;
        }

        setPayment(response);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        /*
         * Do not dump complete API exceptions, tokens or response
         * objects into production browser logs.
         */
        if (import.meta.env.DEV) {
          console.error("Payment session request failed.");
        }

        setError("PAYMENT_SESSION_UNAVAILABLE");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPayment();

    return () => {
      controller.abort();
    };
  }, [paymentId]);

  async function handleExecute() {
    /*
     * Local duplicate-submit suppression.
     *
     * This does NOT replace server-side idempotency.
     */
    if (executionLock.current || executing) {
      return;
    }

    if (!payment || !isValidPaymentId(paymentId)) {
      setError("PAYMENT_NOT_AVAILABLE");
      return;
    }

    if (!EXECUTABLE_STATUSES.has(payment.status)) {
      setError("PAYMENT_NOT_EXECUTABLE");
      return;
    }

    executionLock.current = true;
    setExecuting(true);
    setError("");

    try {
      const response = await executePayment(paymentId);

      if (
        !response ||
        typeof response !== "object" ||
        typeof response.status !== "string"
      ) {
        setError("PAYMENT_EXECUTION_FAILED");
        return;
      }

      if (!SUCCESS_STATUSES.has(response.status)) {
        setError("PAYMENT_EXECUTION_FAILED");
        return;
      }

      navigate(`/payments/result/${encodeURIComponent(paymentId)}`, {
        replace: true,
      });
    } catch {
      if (import.meta.env.DEV) {
        console.error("Payment execution request failed.");
      }

      setError("PAYMENT_EXECUTION_FAILED");
    } finally {
      executionLock.current = false;
      setExecuting(false);
    }
  }

  const executable =
    payment &&
    EXECUTABLE_STATUSES.has(payment.status) &&
    !executing;

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

      {loading && (
        <DashboardCard title="Loading Payment…">
          <p className="text-gray-600" role="status">
            Fetching payment session…
          </p>
        </DashboardCard>
      )}

      {!loading && error && (
        <DashboardCard title="Payment unavailable">
          <p
            className="text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        </DashboardCard>
      )}

      {payment && !loading && (
        <DashboardCard title="Payment Details" value="">
          <div className="flex flex-col gap-2 text-gray-800">
            <p>
              <strong>Amount:</strong>{" "}
              {formatAmount(
                payment.amountMinor,
                payment.currency
              )}
            </p>

            <p>
              <strong>Merchant:</strong>{" "}
              {payment.merchant}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {payment.status}
            </p>

            <button
              type="button"
              onClick={handleExecute}
              disabled={!executable}
              aria-disabled={!executable}
              className="mt-4 px-5 py-3 bg-black text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {executing
                ? "Processing payment…"
                : "Execute Payment"}
            </button>
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}
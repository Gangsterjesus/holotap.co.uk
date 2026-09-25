/**
 * ============================================================
 *  HoloTap Engineering — HERO Secure Payment Execution
 *  File: src/pages/payments/execute.jsx
 *  Flow: 8.2 — Payment Execution
 *  Version: HERO v5.0.0
 *  Engineer ID: E5357171
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 September 2026
 * ============================================================
 *
 *  SECURITY CLASSIFICATION:
 *    Payment Execution Boundary
 *
 *  Purpose:
 *    Securely presents and initiates execution of an existing
 *    server-authorised payment session.
 *
 *  Security principles:
 *    - Server remains authoritative for payment state
 *    - No client-side authorization assumptions
 *    - Defensive API response validation
 *    - Duplicate submission protection
 *    - Explicit successful-state validation
 *    - Minimal error disclosure
 *    - Defensive monetary rendering
 *    - Safe navigation after successful execution
 *    - Unmounted-component state protection
 *
 *  IMPORTANT:
 *    Client-side controls are supplementary.
 *
 *    The backend MUST independently enforce:
 *      - Authentication
 *      - Payment/session authorization
 *      - Merchant ownership/binding
 *      - Session expiry
 *      - Valid payment-state transitions
 *      - Identity/device binding where applicable
 *      - Replay protection
 *      - Idempotent execution
 *      - Authoritative amount/currency validation
 *      - Security/audit logging
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

/* ============================================================
 * HERO Configuration
 * ============================================================
 */

const EXECUTABLE_PAYMENT_STATES = new Set([
  "INITIALISED",
  "INITIALIZED",
  "PENDING",
  "READY",
]);

const SUCCESSFUL_EXECUTION_STATES = new Set([
  "COMPLETED",
  "EXECUTED",
  "SUCCESS",
  "SUCCEEDED",
]);

const USER_ERRORS = Object.freeze({
  PAYMENT_NOT_FOUND: "Payment session could not be found.",
  PAYMENT_INVALID: "Payment session data is invalid.",
  PAYMENT_NOT_EXECUTABLE: "This payment cannot currently be executed.",
  PAYMENT_EXECUTION_FAILED: "Payment could not be completed.",
  NETWORK_ERROR: "Unable to communicate with the payment service.",
});

/* ============================================================
 * HERO Validation Helpers
 * ============================================================
 */

function isValidPaymentId(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= 128
  );
}

function normalizeStatus(value) {
  return typeof value === "string"
    ? value.trim().toUpperCase()
    : "";
}

function isValidPayment(payment) {
  if (!payment || typeof payment !== "object") {
    return false;
  }

  if (!isValidPaymentId(payment.paymentId)) {
    return false;
  }

  if (
    typeof payment.amount !== "number" ||
    !Number.isFinite(payment.amount) ||
    payment.amount < 0
  ) {
    return false;
  }

  if (typeof payment.status !== "string") {
    return false;
  }

  return true;
}

function formatAmount(amount) {
  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount)
  ) {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

function safeDisplay(value, fallback = "Unavailable") {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();

  return normalized || fallback;
}

/* ============================================================
 * PaymentExecute
 * ============================================================
 */

export default function PaymentExecute() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const executionLockRef = useRef(false);

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState("");

  /* ==========================================================
   * Flow 8.2 — Load Payment Session
   * ==========================================================
   */

  useEffect(() => {
    let active = true;

    async function loadPayment() {
      setLoading(true);
      setError("");
      setPayment(null);

      if (!isValidPaymentId(paymentId)) {
        if (active) {
          setError(USER_ERRORS.PAYMENT_NOT_FOUND);
          setLoading(false);
        }

        return;
      }

      try {
        const response = await getPaymentSession(paymentId);

        if (!active) {
          return;
        }

        if (!response) {
          setError(USER_ERRORS.PAYMENT_NOT_FOUND);
          return;
        }

        if (!isValidPayment(response)) {
          setError(USER_ERRORS.PAYMENT_INVALID);
          return;
        }

        /*
         * Defensive consistency check.
         *
         * The resource returned by the API must correspond to the
         * resource requested by this route.
         */
        if (response.paymentId !== paymentId) {
          setError(USER_ERRORS.PAYMENT_INVALID);
          return;
        }

        setPayment(response);
      } catch {
        if (active) {
          /*
           * HERO:
           * Do not expose raw service exceptions, response bodies,
           * credentials, payment metadata or provider details.
           *
           * Production security telemetry belongs in the controlled
           * application observability/audit layer.
           */
          setError(USER_ERRORS.NETWORK_ERROR);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPayment();

    return () => {
      active = false;
    };
  }, [paymentId]);

  /* ==========================================================
   * Flow 8.2 — Execute Payment
   * ==========================================================
   */

  async function handleExecute() {
    /*
     * Immediate synchronous execution lock.
     *
     * React state alone does not provide sufficient protection
     * against two rapid invocations occurring before rerender.
     */
    if (executionLockRef.current) {
      return;
    }

    if (!payment || !isValidPaymentId(paymentId)) {
      setError(USER_ERRORS.PAYMENT_INVALID);
      return;
    }

    const currentStatus = normalizeStatus(payment.status);

    /*
     * Client-side state validation improves UX only.
     *
     * The backend remains responsible for enforcing the actual
     * payment state machine.
     */
    if (!EXECUTABLE_PAYMENT_STATES.has(currentStatus)) {
      setError(USER_ERRORS.PAYMENT_NOT_EXECUTABLE);
      return;
    }

    executionLockRef.current = true;

    setExecuting(true);
    setError("");

    try {
      /*
       * SECURITY BOUNDARY:
       *
       * paymentId identifies the target payment only.
       * It MUST NOT itself constitute authorization.
       */
      const response = await executePayment(paymentId);

      const executionStatus = normalizeStatus(response?.status);

      if (!SUCCESSFUL_EXECUTION_STATES.has(executionStatus)) {
        setError(USER_ERRORS.PAYMENT_EXECUTION_FAILED);
        return;
      }

      /*
       * replace:true prevents the execution screen becoming the
       * normal back-navigation target after successful completion.
       */
      navigate(`/payments/result/${paymentId}`, {
        replace: true,
      });
    } catch {
      setError(USER_ERRORS.PAYMENT_EXECUTION_FAILED);
    } finally {
      executionLockRef.current = false;
      setExecuting(false);
    }
  }

  /* ==========================================================
   * Render State
   * ==========================================================
   */

  const paymentStatus = normalizeStatus(payment?.status);

  const canExecute =
    Boolean(payment) &&
    !loading &&
    !executing &&
    EXECUTABLE_PAYMENT_STATES.has(paymentStatus);

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

      {/* ======================================================
       * Loading State
       * ======================================================
       */}

      {loading && (
        <DashboardCard title="Loading Payment…">
          <p
            className="text-gray-600"
            role="status"
            aria-live="polite"
          >
            Fetching payment session…
          </p>
        </DashboardCard>
      )}

      {/* ======================================================
       * Error State
       * ======================================================
       */}

      {!loading && error && (
        <DashboardCard title="Payment Error">
          <p
            className="text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        </DashboardCard>
      )}

      {/* ======================================================
       * Payment Details
       * ======================================================
       */}

      {payment && !loading && (
        <DashboardCard title="Payment Details" value="">
          <div className="flex flex-col gap-2 text-gray-800">
            <p>
              <strong>Amount:</strong>{" "}
              {formatAmount(payment.amount)}
            </p>

            <p>
              <strong>Merchant:</strong>{" "}
              {safeDisplay(payment.merchant)}
            </p>

            {payment.device && (
              <p>
                <strong>Device:</strong>{" "}
                {safeDisplay(payment.device)}
              </p>
            )}

            <p>
              <strong>Status:</strong>{" "}
              {safeDisplay(paymentStatus)}
            </p>

            <button
              type="button"
              onClick={handleExecute}
              disabled={!canExecute}
              aria-disabled={!canExecute}
              className={[
                "mt-4 px-5 py-3 rounded-lg font-medium",
                "transition-colors",
                canExecute
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed",
              ].join(" ")}
            >
              {executing
                ? "Processing Payment…"
                : "Execute Payment"}
            </button>

            {!canExecute &&
              !executing &&
              !EXECUTABLE_PAYMENT_STATES.has(paymentStatus) && (
                <p
                  className="text-sm text-gray-600"
                  role="status"
                >
                  This payment is not available for execution.
                </p>
              )}
          </div>
        </DashboardCard>
      )}
    </Layout>
  );
}
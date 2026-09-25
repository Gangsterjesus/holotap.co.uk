/**
 * ============================================================
 *  HoloTap Engineering — HERO Payment Creation
 *  File: src/pages/payments/create.jsx
 *  Flow: 8.1 — Payment Creation
 *  Version: HERO v5.0.0
 *  Engineer ID: E5357171
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  SECURITY CLASSIFICATION:
 *    Payment Creation Boundary
 *
 *  Purpose:
 *    Creates a server-authorised payment session and transfers
 *    control to Flow 8.2 for payment execution.
 *
 *  Security Principles:
 *    - Backend remains authoritative
 *    - Defensive client validation
 *    - Duplicate submission protection
 *    - No client-generated payment identifiers
 *    - No trust in returned API data
 *    - Minimal error disclosure
 *    - Safe post-creation navigation
 *
 *  IMPORTANT:
 *    The backend MUST independently enforce:
 *      - Authentication
 *      - Merchant authorization
 *      - Tenant isolation
 *      - Amount/currency validation
 *      - Payment-session integrity
 *      - Idempotency
 *      - Replay protection
 *      - Rate limiting
 *      - Audit/security logging
 * ============================================================
 */

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";

import { initiatePayment } from "../../services/api";

/* ============================================================
 * HERO Configuration
 * ============================================================
 */

const CURRENCY = "GBP";

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 1000000;

const USER_ERRORS = Object.freeze({
  INVALID_AMOUNT: "Enter a valid payment amount.",
  CREATE_FAILED: "Payment session could not be created.",
  NETWORK_ERROR: "Unable to communicate with the payment service.",
});

/* ============================================================
 * HERO Validation
 * ============================================================
 */

function normalizeAmount(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const amount = Number(normalized);

  if (
    !Number.isFinite(amount) ||
    amount < MIN_AMOUNT ||
    amount > MAX_AMOUNT
  ) {
    return null;
  }

  return amount;
}

function isValidPaymentId(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= 128
  );
}

/* ============================================================
 * PAGE
 * ============================================================
 */

export default function PaymentCreate() {
  const navigate = useNavigate();

  const submissionLockRef = useRef(false);

  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* ==========================================================
   * Flow 8.1 — Create Payment
   * ==========================================================
   */

  async function handleSubmit(event) {
    event.preventDefault();

    if (submissionLockRef.current) {
      return;
    }

    setError("");

    const validatedAmount = normalizeAmount(amount);

    if (validatedAmount === null) {
      setError(USER_ERRORS.INVALID_AMOUNT);
      return;
    }

    submissionLockRef.current = true;
    setSubmitting(true);

    try {
      /*
       * HERO SECURITY BOUNDARY
       *
       * This request expresses the user's payment intent.
       * The server remains authoritative for the resulting
       * payment session and all security-sensitive metadata.
       */
const response = await initiatePayment({
  amount: validatedAmount,
  currency: CURRENCY,
});

      /*
       * Never navigate using an unvalidated identifier received
       * from an external/API trust boundary.
       */
      if (!isValidPaymentId(response?.paymentId)) {
        setError(USER_ERRORS.CREATE_FAILED);
        return;
      }

      /*
       * Flow 8.1
       *     ↓
       * Flow 8.2
       *
       * Payment execution receives only the server-issued ID.
       */
      navigate(
        `/payments/execute/${encodeURIComponent(
          response.paymentId
        )}`,
        {
          replace: true,
        }
      );
    } catch {
      /*
       * HERO:
       * Do not expose raw service exceptions, credentials,
       * tokens, provider responses or internal API details.
       */
      setError(USER_ERRORS.NETWORK_ERROR);
    } finally {
      submissionLockRef.current = false;
      setSubmitting(false);
    }
  }

  /* ==========================================================
   * Render
   * ==========================================================
   */

  return (
    <Layout
      title="Create Payment"
      subtitle="Flow 8.1 — Payment Creation"
    >
      <PageHeader
        title="Create Payment"
        subtitle="Create a secure merchant payment session"
        actions={null}
      />

      {error && (
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

      <DashboardCard title="Payment Details" value="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="payment-amount"
              className="font-medium text-gray-800"
            >
              Amount
            </label>

            <div className="flex items-center gap-2">
              <span
                className="text-gray-700"
                aria-hidden="true"
              >
                £
              </span>

              <input
                id="payment-amount"
                name="amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={amount}
                disabled={submitting}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="0.00"
                aria-describedby="payment-amount-help"
                className={[
                  "w-full rounded-lg border px-4 py-3",
                  "text-gray-900",
                  "focus:outline-none focus:ring-2",
                  "focus:ring-black",
                  submitting
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white",
                ].join(" ")}
              />
            </div>

            <p
              id="payment-amount-help"
              className="text-sm text-gray-600"
            >
              Enter the payment amount in GBP.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className={[
              "mt-2 px-5 py-3 rounded-lg font-medium",
              "transition-colors",
              submitting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800",
            ].join(" ")}
          >
            {submitting
              ? "Creating Payment…"
              : "Create Payment"}
          </button>
        </form>
      </DashboardCard>
    </Layout>
  );
}ls

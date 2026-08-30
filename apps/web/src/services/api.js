/**
 * =================================================================================================
 *  HOLOTAP — WEB API CLIENT (BROWSER-SAFE)
 *  File: src/services/api.js
 *  Date: 30/08/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Deterministic Web API Client — Unified Web & Mobile Architecture
 *
 *  Revision:
 *    v2.6 — Added Flow‑9.5 Registry Status Polling + Flow‑9.4 Result Surface Alignment
 *
 *  Flows:
 *    • Flow‑4 — QR Activation
 *    • Flow‑5 — Payments (Legacy)
 *    • Flow‑6 — Identity Session
 *    • Flow‑7 — Identity Verification
 *    • Flow‑8 — Payment Lifecycle
 *    • Flow‑9 — Registry Binding (Flow‑9.2 → 9.5)
 *
 *  Overview:
 *    Browser‑safe API layer for the HoloTap web client. Provides deterministic JSON responses using
 *    fetch(), ensuring stateless behaviour across all creator‑facing flows. This module defines the
 *    complete client‑side API contract surface for identity, payments, registry binding, and registry
 *    status polling (Flow‑9.5).
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

const BASE_URL = "/api";

/* ============================
   GENERIC REQUEST WRAPPER
   ============================ */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/* ============================
   PAYMENTS API (Flow 5)
   ============================ */

/**
 * Flow 5 — Legacy Payments Listing
 * GET /payments
 */
export async function getPayments() {
  return request("/payments");
}

/* ============================
   QR ACTIVATION API (Flow 4)
   ============================ */

/**
 * Flow 4 — QR Activation
 * POST /qr/activate
 */
export async function activateQR(payload) {
  return request("/qr/activate", {
    method: "POST",
    body: payload
  });
}

/* ============================
   SESSION API (Flow 6 → Flow 7)
   ============================ */

/**
 * Flow 6 — Identity Session Fetch
 * GET /session/:sessionId
 */
export async function getSession(sessionId) {
  return request(`/session/${sessionId}`);
}

/**
 * Flow 7 — Identity Verification
 * GET /session/verify/:sessionId
 */
export async function verifySession(sessionId) {
  return request(`/session/verify/${sessionId}`);
}

/* ============================
   PAYMENT LIFECYCLE API (Flow 8)
   ============================ */

/**
 * Flow 8.1 — Payment Initialiser
 * POST /payment/initiate
 */
export async function initiatePayment(payload) {
  return request("/payment/initiate", {
    method: "POST",
    body: payload
  });
}

/**
 * Flow 8.2 — Payment Execution Surface
 * GET /payment/session/:paymentId
 */
export async function getPaymentSession(paymentId) {
  return request(`/payment/session/${paymentId}`);
}

/**
 * Flow 8.2 → Flow 8.3 — Payment Execution
 * POST /payment/execute/:paymentId
 */
export async function executePayment(paymentId) {
  return request(`/payment/execute/${paymentId}`, {
    method: "POST"
  });
}

/* ============================
   REGISTRY API (Flow 9)
   ============================ */

/**
 * Flow 9.2 — Registry Binding Action
 * POST /registry/bind
 */
export async function bindRegistry(payload) {
  return request("/registry/bind", {
    method: "POST",
    body: payload
  });
}

/**
 * Flow 9.5 — Registry Status Surface (Polling)
 * GET /registry/status
 * Expected response:
 *   {
 *     ok: true,
 *     code: "REGISTRY_STATUS_OK",
 *     status: "idle" | "bound",
 *     lastBoundAt: "2026-08-30T08:00:00Z"
 *   }
 */
export async function getRegistryStatus() {
  return request("/registry/status");
}

/**
 * Flow 9.4 — Registry Result Surface (Latest Record)
 * GET /registry/result
 * Expected response:
 *   {
 *     ok: true,
 *     code: "REGISTRY_RESULT_SUCCESS",
 *     record: {
 *       sessionId,
 *       badgeId,
 *       device,
 *       merchant,
 *       status,
 *       timestamp
 *     }
 *   }
 */
export async function getRegistryResult() {
  return request("/registry/result");
}

/* ============================
   EXPORT (DETERMINISTIC)
   ============================ */
export const api = {
  // Flow 5
  getPayments,

  // Flow 4
  activateQR,

  // Flow 6 → 7
  getSession,
  verifySession,

  // Flow 8
  initiatePayment,
  getPaymentSession,
  executePayment,

  // Flow 9
  bindRegistry,
  getRegistryStatus,
  getRegistryResult,
};

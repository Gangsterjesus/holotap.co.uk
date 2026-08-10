/**
 * ============================================================
 *  HoloTap — Web API Client (Browser-Safe)
 *  File: src/services/api.js
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Deterministic, browser-safe API layer for the HoloTap web UI.
 *    All functions use fetch() and return JSON. No server-side
 *    modules or Node.js logic are used here.
 *
 *  Responsibilities:
 *    - Wrap HTTP requests
 *    - Provide predictable JSON responses
 *    - Maintain stateless v2 architecture
 * ============================================================
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
export async function getPayments() {
  return request("/payments");
}

/* ============================
   QR ACTIVATION API (Flow 4)
   ============================ */
export async function activateQR(payload) {
  return request("/qr/activate", {
    method: "POST",
    body: payload
  });
}

/* ============================
   SESSION API (Flow 6 → Flow 7)
   ============================ */
export async function getSession(sessionId) {
  return request(`/session/${sessionId}`);
}

export async function verifySession(sessionId) {
  return request(`/session/verify/${sessionId}`);
}

/* ============================
   PAYMENT LIFECYCLE API (Flow 8)
   ============================ */

/**
 * Flow 8.1 — Payment Initialiser
 */
export async function initiatePayment(payload) {
  return request("/payment/initiate", {
    method: "POST",
    body: payload
  });
}

/**
 * Flow 8.2 — Payment Execution Surface
 */
export async function getPaymentSession(paymentId) {
  return request(`/payment/session/${paymentId}`);
}

/**
 * Flow 8.2 → Flow 8.3 — Payment Execution
 */
export async function executePayment(paymentId) {
  return request(`/payment/execute/${paymentId}`, {
    method: "POST"
  });
}

/* ============================
   EXPORT (DETERMINISTIC)
   ============================ */
export const api = {
  getPayments,
  activateQR,
  getSession,
  verifySession,

  // Flow 8
  initiatePayment,
  getPaymentSession,
  executePayment,
};

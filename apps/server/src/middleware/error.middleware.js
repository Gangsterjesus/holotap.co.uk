/**
 * ============================================================
 *  HoloTapServer — Core Middleware
 *  Flow 12 — Error Handling Layer
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Centralised error middleware for HoloTapServer. This layer
 *  ensures deterministic error responses across all flows:
 *
 *      • Flow 6 — Identity
 *      • Flow 7 — Session
 *      • Flow 8 — Organisation
 *      • Flow 9 — Permissions
 *      • Flow 10 — Founder Override
 *      • Flow 11 — Actor Pipeline
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Capture thrown errors from any upstream middleware
 *  - Produce stable JSON error envelopes
 *  - Prevent stack trace leakage in production
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Deterministic output format
 * ============================================================
 */

function errorMiddleware(err, req, res, next) {
  // ------------------------------------------------------------
  // 1. Deterministic logging
  // ------------------------------------------------------------
  console.error("[Flow 12] Error Middleware:", {
    message: err?.message,
    name: err?.name,
    flow: req?.flow ?? null,
  });

  // ------------------------------------------------------------
  // 2. Stable error envelope
  // ------------------------------------------------------------
  const payload = {
    success: false,
    error: {
      name: err?.name || "Error",
      message: err?.message || "An unexpected error occurred",
    },
  };

  // ------------------------------------------------------------
  // 3. Prevent stack trace leakage in production
  // ------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    payload.error.stack = err?.stack || null;
  }

  // ------------------------------------------------------------
  // 4. Respond with deterministic structure
  // ------------------------------------------------------------
  res.status(err?.status || 500).json(payload);
}

module.exports = {
  errorMiddleware,
};

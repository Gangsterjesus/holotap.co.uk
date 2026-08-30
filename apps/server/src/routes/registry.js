

/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY BINDING ROUTES (EXPRESS)
 *  File: server/routes/registry.js
 *  Date: 30/08/2026 — version 2.6
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Binding — Backend API Contract Surface
 *
 *  Revision:
 *    v2.6 — Deterministic Binding + Ledger Write + Status + Result + History (Flow‑9.2 → Flow‑9.6)
 *
 *  Flows:
 *    • Flow‑6 — Identity Surfaces
 *    • Flow‑7 — Identity Verification
 *    • Flow‑8 — Payment Lifecycle
 *    • Flow‑9 — Registry Binding (Flow‑9.2 → 9.6)
 *
 *  Overview:
 *    Backend API routes for registry binding operations. Provides deterministic POST, GET(status),
 *    GET(result), and GET(history) endpoints for identity session, badge, device, and merchant
 *    context. Implements Flow‑9.6 ledger-backed registry storage for multi-record support.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import express from "express";
const router = express.Router();

/**
 * =================================================================================================
 *  Flow‑9.6 — Deterministic In‑Memory Registry Ledger
 * -------------------------------------------------------------------------------------------------
 *  Notes:
 *    • Multi-record support (ledger array)
 *    • Deterministic ordering (latest = last element)
 *    • Stateless result surface reads from ledger
 *    • Status surface reads from ledger
 *    • History surface exposes full ledger
 * =================================================================================================
 */
const ledger = [];

/**
 * -----------------------------------------------------------------------------------------------
 *  POST /api/registry/bind
 *  Description:
 *    Executes deterministic registry binding. Validates payload, constructs binding record,
 *    writes into Flow‑9.6 ledger, and returns deterministic JSON response.
 * -----------------------------------------------------------------------------------------------
 */
router.post("/bind", async (req, res) => {
  try {
    const { sessionId, badgeId, device, merchant } = req.body;

    // deterministic validation
    if (!sessionId || !badgeId || !device || !merchant) {
      return res.status(400).json({
        ok: false,
        code: "REGISTRY_BIND_INVALID",
        message: "Registry binding payload missing required fields.",
        fields: { sessionId, badgeId, device, merchant }
      });
    }

    // deterministic record
    const record = {
      status: "bound",
      sessionId,
      badgeId,
      device,
      merchant,
      timestamp: new Date().toISOString()
    };

    // Flow‑9.6 ledger write
    ledger.push(record);

    return res.json({
      ok: true,
      code: "REGISTRY_BIND_SUCCESS",
      record
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_BIND_EXCEPTION",
      message: err.message || "Registry binding failed."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 *  GET /api/registry/status
 *  Description:
 *    Returns deterministic registry status. Flow‑9.6 uses ledger-backed state.
 * -----------------------------------------------------------------------------------------------
 */
router.get("/status", async (req, res) => {
  try {
    const latest = ledger.length > 0 ? ledger[ledger.length - 1] : null;

    const status = {
      registry: latest ? "active" : "idle",
      lastBinding: latest,
      timestamp: new Date().toISOString()
    };

    return res.json({
      ok: true,
      code: "REGISTRY_STATUS_SUCCESS",
      status
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_STATUS_EXCEPTION",
      message: err.message || "Registry status retrieval failed."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 *  GET /api/registry/result
 *  Description:
 *    Returns the latest binding record from the Flow‑9.6 ledger.
 * -----------------------------------------------------------------------------------------------
 */
router.get("/result", async (req, res) => {
  try {
    if (ledger.length === 0) {
      return res.status(404).json({
        ok: false,
        code: "REGISTRY_RESULT_NOT_FOUND",
        message: "No registry result available."
      });
    }

    const latest = ledger[ledger.length - 1];

    return res.json({
      ok: true,
      code: "REGISTRY_RESULT_SUCCESS",
      record: latest
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_RESULT_EXCEPTION",
      message: err.message || "Unable to load registry result."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 *  GET /api/registry/history
 *  Description:
 *    Returns full Flow‑9.6 ledger history (multi-record support).
 * -----------------------------------------------------------------------------------------------
 */
router.get("/history", async (req, res) => {
  try {
    return res.json({
      ok: true,
      code: "REGISTRY_HISTORY_SUCCESS",
      records: ledger
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_HISTORY_EXCEPTION",
      message: err.message || "Unable to load registry history."
    });
  }
});

export default router;

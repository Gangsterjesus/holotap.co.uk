/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY ROUTES
 *  File: apps/server/src/routes/registry.js
 *
 *  Engineer:
 *    Raymond Newton (E5357171)
 *
 *  Purpose:
 *    Flow-9 Registry Binding API
 *
 *  Endpoints:
 *    POST   /api/registry/bind
 *    GET    /api/registry/status
 *    GET    /api/registry/result
 *    GET    /api/registry/history
 *
 *  Notes:
 *    Uses deterministic in-memory ledger storage.
 *    Designed for future repository and PostgreSQL migration.
 * =================================================================================================
 */

import express from "express";

const router = express.Router();

/**
 * Flow-9 Registry Ledger
 * Temporary in-memory storage.
 */
const ledger = [];

/**
 * Generate deterministic registry identifier
 */
function createRegistryId() {
  return `REG-${Date.now()}`;
}

/**
 * Validate registry binding payload
 */
function validateBindingPayload(payload) {
  const { sessionId, badgeId, device, merchant } = payload || {};

  if (!sessionId) return "sessionId";
  if (!badgeId) return "badgeId";
  if (!device) return "device";
  if (!merchant) return "merchant";

  return null;
}

/**
 * -----------------------------------------------------------------------------------------------
 * POST /api/registry/bind
 * -----------------------------------------------------------------------------------------------
 */
router.post("/bind", async (req, res) => {
  try {
    const missingField = validateBindingPayload(req.body);

    if (missingField) {
      return res.status(400).json({
        ok: false,
        code: "REGISTRY_BIND_INVALID",
        message: `${missingField} is required`
      });
    }

    const {
      sessionId,
      badgeId,
      device,
      merchant
    } = req.body;

    /**
     * Prevent duplicate active bindings
     */
    const existing = ledger.find(
      (record) =>
        record.sessionId === sessionId &&
        record.badgeId === badgeId
    );

    if (existing) {
      return res.status(409).json({
        ok: false,
        code: "REGISTRY_BIND_DUPLICATE",
        message: "Registry binding already exists.",
        record: existing
      });
    }

    const record = {
      registryId: createRegistryId(),
      sessionId,
      badgeId,
      device,
      merchant,
      status: "BOUND",
      timestamp: new Date().toISOString()
    };

    ledger.push(record);

    return res.status(200).json({
      ok: true,
      code: "REGISTRY_BIND_SUCCESS",
      record
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_BIND_EXCEPTION",
      message:
        error?.message || "Registry binding failed."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 * GET /api/registry/status
 * -----------------------------------------------------------------------------------------------
 */
router.get("/status", async (_req, res) => {
  try {
    const latest =
      ledger.length > 0
        ? ledger[ledger.length - 1]
        : null;

    return res.json({
      ok: true,
      code: "REGISTRY_STATUS_SUCCESS",
      status: {
        registry: latest ? "ACTIVE" : "IDLE",
        totalRecords: ledger.length,
        lastBinding: latest,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_STATUS_EXCEPTION",
      message:
        error?.message ||
        "Registry status retrieval failed."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 * GET /api/registry/result
 * -----------------------------------------------------------------------------------------------
 */
router.get("/result", async (_req, res) => {
  try {
    const latest =
      ledger.length > 0
        ? ledger[ledger.length - 1]
        : null;

    if (!latest) {
      return res.status(404).json({
        ok: false,
        code: "REGISTRY_RESULT_NOT_FOUND",
        message: "No registry result available."
      });
    }

    return res.json({
      ok: true,
      code: "REGISTRY_RESULT_SUCCESS",
      record: latest
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_RESULT_EXCEPTION",
      message:
        error?.message ||
        "Unable to load registry result."
    });
  }
});

/**
 * -----------------------------------------------------------------------------------------------
 * GET /api/registry/history
 * -----------------------------------------------------------------------------------------------
 */
router.get("/history", async (_req, res) => {
  try {
    return res.json({
      ok: true,
      code: "REGISTRY_HISTORY_SUCCESS",
      totalRecords: ledger.length,
      records: [...ledger].reverse()
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_HISTORY_EXCEPTION",
      message:
        error?.message ||
        "Unable to load registry history."
    });
  }
});

export default router;
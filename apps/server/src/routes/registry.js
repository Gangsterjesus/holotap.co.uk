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
 *  Architecture:
 *
 *    Routes
 *       ↓
 *    RegistryService
 *       ↓
 *    RegistryRepository
 *       ↓
 *    Ledger / Database
 *
 * =================================================================================================
 */

import express from "express";
import RegistryService from "../services/RegistryService.js";

const router = express.Router();

/**
 * -----------------------------------------------------------------------------------------------
 * Validate registry payload
 * -----------------------------------------------------------------------------------------------
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

    const result =
      RegistryService.createBinding(req.body);

    if (!result.ok) {
      return res.status(409).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "REGISTRY_BIND_EXCEPTION",
      message:
        error?.message ||
        "Registry binding failed."
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
    const status =
      RegistryService.getStatus();

    return res.json({
      ok: true,
      code: "REGISTRY_STATUS_SUCCESS",
      status
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
      RegistryService.getLatestBinding();

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
    const records =
      RegistryService.getHistory();

    return res.json({
      ok: true,
      code: "REGISTRY_HISTORY_SUCCESS",
      totalRecords: records.length,
      records
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
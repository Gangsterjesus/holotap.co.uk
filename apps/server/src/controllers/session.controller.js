/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Controller: Identity Session Controller
 * Path: apps/server/src/controllers/session.controller.js
 * Engineer: Raymond Newton 
 * Date: 2026-08-12
 *
 * Description:
 *   Controller responsible for creating and retrieving identity
 *   sessions. This module acts as the lifecycle engine for the
 *   session subsystem, delegating storage to the in‑memory
 *   session map and returning deterministic JSON responses.
 *
 * Architecture Notes:
 *   - Deterministic session IDs (crypto.randomUUID)
 *   - In‑memory session store (v2.4)
 *   - JSON‑safe responses
 *   - No persistence layer until ledger integration
 *
 * ============================================================
 */

import crypto from "crypto";

// ------------------------------------------------------------
// In‑memory session store
// Map<sessionId, sessionPayload>
// ------------------------------------------------------------
const sessions = new Map();

// ------------------------------------------------------------
// Utility: generate deterministic session IDs
// ------------------------------------------------------------
function generateSessionId() {
  return crypto.randomUUID();
}

// ------------------------------------------------------------
// Utility: success response
// ------------------------------------------------------------
function sendSuccess(res, status, message, data) {
  return res.status(status).json({
    success: true,
    message,
    data
  });
}

// ------------------------------------------------------------
// Utility: error response
// ------------------------------------------------------------
function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message
  });
}

// ------------------------------------------------------------
// CREATE SESSION
// ------------------------------------------------------------
export function createSession(req, res, next) {
  try {
    const { role, merchantId } = req.body;

    // Basic validation
    if (!role) {
      return sendError(res, 400, "Missing field: role");
    }

    // Generate deterministic session ID
    const sessionId = generateSessionId();

    // Construct session payload
    const session = {
      sessionId,
      role,
      merchantId: merchantId || null,
      createdAt: Date.now()
    };

    // Store session
    sessions.set(sessionId, session);

    console.log("[SESSION] Created:", sessionId);

    return sendSuccess(res, 201, "Session created", session);
  } catch (err) {
    console.error("[SESSION] Create error:", err);
    next(err);
  }
}

// ------------------------------------------------------------
// GET SESSION
// ------------------------------------------------------------
export function getSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    console.log("[SESSION] Fetch request:", sessionId);

    const session = sessions.get(sessionId);

    if (!session) {
      return sendError(res, 404, "Session not found");
    }

    return sendSuccess(res, 200, "Session retrieved", session);
  } catch (err) {
    console.error("[SESSION] Fetch error:", err);
    next(err);
  }
}

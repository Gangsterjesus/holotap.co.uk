/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Route: /api/session
 * Path: apps/server/src/routes/session.routes.js
 * Engineer: Raymond Newton (E5357171)
 * Date: 2026-08-12
 *
 * Description:
 *   Routing surface for identity session creation and retrieval.
 *   This file provides the deterministic HTTP entry point for
 *   the session subsystem, delegating business logic to
 *   session.controller.js.
 *
 * Architecture Notes:
 *   - Logging middleware for traceability
 *   - Controller handles lifecycle logic
 *   - Route handles HTTP surface + inbound validation
 *   - Deterministic JSON responses
 *
 * ============================================================
 */

import { Router } from "express";
import { createSession, getSession } from "../controllers/session.controller.js";

const router = Router();

/**
 * POST /
 * ------------------------------------------------------------
 * Creates a new identity session.
 * Logs inbound payload for traceability before passing control
 * to the controller.
 */
router.post(
  "/",
  (req, res, next) => {
    console.log("[SESSION] Create request:", req.body);
    next(); // Pass control to controller
  },
  createSession
);

/**
 * GET /:sessionId
 * ------------------------------------------------------------
 * Retrieves an existing identity session.
 * Logs inbound sessionId for traceability before passing control
 * to the controller.
 */
router.get(
  "/:sessionId",
  (req, res, next) => {
    console.log("[SESSION] Fetch request:", req.params.sessionId);
    next(); // Pass control to controller
  },
  getSession
);

export default router;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: status.router.ts
 * Subsystem: Flow 7 — Session Status Route
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 *
 * SECTION: Overview
 *   Exposes the Flow 7 session status endpoint. Fetches session state and returns
 *   the envelope consumed by the web Status Page (Flow 7 → Flow 8 transition).
 *
 * SECTION: Purpose
 *   • Provide a stable API surface for session status retrieval.
 *   • Integrate identity pipeline, correlation IDs, and security subsystem.
 *
 * SECTION: Scope
 *   • GET /api/session/:sessionId
 *   • Session lookup, validation, and status envelope formatting.
 *
 * SECTION: Stability Notes
 *   This route must never throw. All errors must be expressed as structured JSON.
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { Router } from "express";
import { getSessionStatusController } from "../../controllers/status/status.controller";

const router = Router();

// GET /api/session/:sessionId
router.get("/:sessionId", getSessionStatusController);

export default router;

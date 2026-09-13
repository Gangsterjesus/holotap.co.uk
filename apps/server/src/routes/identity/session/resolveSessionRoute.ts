/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Identity Session Module
  Engineer: R. Newton (E5357171)
  File: resolveSessionRoute.ts
  Subsystem: Flow‑10 Identity Session — Route Layer
  Date: 06 Sep 2026

  SECTION: Overview
    Provides the HTTP surface for resolving identity sessions. Accepts a
    sessionId, invokes the Flow‑10 session resolver, and returns a deterministic
    UnifiedSessionEnvelope for upstream identity propagation (Flow‑11).

  SECTION: Purpose
    • Resolve identity sessions deterministically.
    • Bind Flow‑10 session resolution to Express routing.
    • Ensure compatibility with Flow‑11 Unified Actor Pipeline.

  SECTION: Stability Notes
    • MUST remain backward‑compatible across all flows.
    • MUST NOT perform identity resolution directly — delegated to subsystem.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { Router } from "express";

import { resolveSession } from "../../../identity/session/resolveSession";

const router = Router();

/**
 * ROUTE: POST /identity/session/resolve
 * Body:
 *   {
 *     "sessionId": "string"
 *   }
 */
router.post("/", async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({
        success: false,
        error: "invalid_session_id",
        message: "sessionId is required and must be a string",
      });
    }

    const envelope = await resolveSession({ session_id: sessionId });

    return res.status(200).json(envelope);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "session_resolution_failed",
      message: err instanceof Error ? err.message : String(err),
    });
  }
});

export default router;


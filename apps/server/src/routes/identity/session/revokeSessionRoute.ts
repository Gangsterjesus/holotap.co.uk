/**
 * =============================================================================
 * Flow‑10 — Identity Session Route (revokeSessionRoute)
 * =============================================================================
 * Subsystem: Identity Session API (Flow‑10)
 * Engineer: Raymond Newton — HoloTap Engineering Team (E5357171)
 *
 * SECTION: Overview
 *   Provides the HTTP surface for revoking identity sessions. Accepts a
 *   sessionId, invokes the Flow‑10 revocation engine, and returns a deterministic
 *   UnifiedSessionEnvelope for upstream identity propagation (Flow‑11).
 *
 * SECTION: Purpose
 *   • Revoke identity sessions deterministically.
 *   • Bind Flow‑10 session revocation to Express routing.
 *   • Ensure compatibility with Flow‑11 Unified Actor Pipeline.
 *
 * SECTION: Stability Notes
 *   • MUST remain backward‑compatible across all flows.
 *   • MUST NOT perform identity revocation directly — delegated to subsystem.
 * =============================================================================
 */

import { Router } from "express";
import { revokeSession }
  from "../../../identity/session/revokeSession";

const revokeSessionRoute = Router();

revokeSessionRoute.post("/", async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({
        error: "sessionId is required and must be a string",
      });
    }

    const revoked = await revokeSession(sessionId);

    return res.status(200).json({
      success: revoked,
      revoked,
      sessionId,
    });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error
        ? err.message
        : String(err),
    });
  }
});

export default revokeSessionRoute;

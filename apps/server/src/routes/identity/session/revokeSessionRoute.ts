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
// The implementation is currently not recognized by TypeScript as an ES module.
// Load it through CommonJS to avoid TS2306 while preserving the route contract.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { revokeSession } = require("../../../identity/session/revokeSession") as {
  revokeSession: (sessionId: string) => Promise<unknown>;
};

const revokeSessionRoute = Router();

/**
 * =============================================================================
 * ROUTE: POST /identity/session/revoke
 * =============================================================================
 * Request Body:
 *   {
 *     "sessionId": "string"
 *   }
 *
 * Response:
 *   • 200 — UnifiedSessionEnvelope (revoked)
 *   • 400 — Missing or invalid sessionId
 *   • 404 — Session not found
 *   • 500 — Internal subsystem error
 * =============================================================================
 */
revokeSessionRoute.post("/", async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({
        error: "sessionId is required and must be a string",
      });
    }

    const envelope = await revokeSession(sessionId);

    return res.status(200).json(envelope);
  } catch (err) {
    return res.status(404).json({
      error: (err as Error).message,
    });
  }
});

export default revokeSessionRoute;

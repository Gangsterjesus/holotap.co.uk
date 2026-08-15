/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 7 — Session Header Guard (auth.middleware.js)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Enforces presence of a session identifier in the request.
 *  This middleware does not validate the session itself; it only
 *  ensures that downstream Flow 7 logic has a deterministic
 *  sessionId to work with.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Ensure x-session-id header is present
 *  - Bind req.sessionId for downstream resolvers
 *  - Maintain deterministic behaviour across flows
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure header validation only
 * ============================================================
 */

function requireSession(req, res, next) {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    console.warn("[Flow 7] Missing x-session-id");

    return res.status(401).json({
      success: false,
      message: "Missing session",
    });
  }

  console.log("[Flow 7] Session header OK:", sessionId);
  req.sessionId = sessionId;

  next();
}

module.exports = {
  requireSession,
};

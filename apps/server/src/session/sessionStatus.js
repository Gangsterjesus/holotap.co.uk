/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Module: Session Status Engine
 * Path: apps/server/src/session/sessionStatus.js
 * Engineer: Raymond Newton (E5357171)
 * Date: 2026-08-12
 *
 * Description:
 *   Provides deterministic session status reporting for
 *   dashboards, registry surfaces, and payment lifecycle.
 *
 * ============================================================
 */

import { getSession } from "./sessionStore.js";

/**
 * getSessionStatus
 * ------------------------------------------------------------
 * Returns session validity + expiry state.
 */
export function getSessionStatus(sessionId) {
  const session = getSession(sessionId);

  if (!session) {
    return {
      exists: false,
      valid: false,
      reason: "Session not found",
    };
  }

  const now = Date.now();

  return {
    exists: true,
    valid: session.expiresAt > now,
    expiresIn: session.expiresAt - now,
    identity: session.identity,
  };
}

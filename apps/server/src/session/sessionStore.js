/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Module: Identity Session Store
 * Path: apps/server/src/session/sessionStore.js
 * Engineer: Raymond Newton (E5357171)
 * Date: 2026-08-12
 *
 * Description:
 *   Core in-memory session store responsible for holding
 *   verified identity payloads during the lifecycle.
 *
 *   This module provides deterministic session storage,
 *   retrieval, expiry, and linkage to registry + payment
 *   subsystems.
 *
 * Architecture Notes:
 *   - Identity → Session → Registry → Payment
 *   - Append-safe writes
 *   - Deterministic JSON structures
 *   - No external persistence (v2.4)
 *
 * ============================================================
 */

const sessionStore = new Map(); 
// Map<sessionId, sessionPayload>

/**
 * createSession
 * ------------------------------------------------------------
 * Creates a new identity session entry.
 */
export function createSession(sessionId, payload) {
  // Store identity payload deterministically
  sessionStore.set(sessionId, {
    identity: payload,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 30, // 30 min expiry
  });

  return sessionStore.get(sessionId);
}

/**
 * getSession
 * ------------------------------------------------------------
 * Retrieves a session by ID.
 */
export function getSession(sessionId) {
  return sessionStore.get(sessionId) || null;
}

/**
 * expireSession
 * ------------------------------------------------------------
 * Removes expired sessions.
 */
export function expireSession() {
  const now = Date.now();

  for (const [id, session] of sessionStore.entries()) {
    if (session.expiresAt < now) {
      sessionStore.delete(id);
    }
  }
}

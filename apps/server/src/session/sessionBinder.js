/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Module: Session Binder
 * Path: apps/server/src/session/sessionBinder.js
 * Engineer: Raymond Newton (E5357171)
 * Date: 2026-08-12
 *
 * Description:
 *   Binds identity session data into registry + payment flows.
 *
 * ============================================================
 */

import { getSession } from "./sessionStore.js";

/**
 * bindToRegistry
 * ------------------------------------------------------------
 * Injects identity session into registry binding pipeline.
 */
export function bindToRegistry(sessionId, registryPayload) {
  const session = getSession(sessionId);

  if (!session) return null;

  return {
    ...registryPayload,
    identity: session.identity,
  };
}

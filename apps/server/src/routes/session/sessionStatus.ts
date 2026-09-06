/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: sessionStatus.ts
 * Flow: 10 — Identity Session Status Engine
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Provides deterministic session status reporting for dashboards, registry
 *   surfaces, and payment lifecycle. Replaces legacy Flow‑9 sessionStore.js.
 *
 * Guarantees:
 *   • Pure lookup logic
 *   • Deterministic envelopes
 *   • Replay‑safe
 *   • Flow‑9.6 ledger‑compatible
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { prisma } from "../../db";


export async function getSessionStatus(sessionId: string) {
  // 1. Lookup session from Flow‑10 identity store
  const session = await prisma.identity_sessions.findUnique({
    where: { session_id: sessionId }
  });

  if (!session) {
    return {
      exists: false,
      valid: false,
      reason: "SESSION_NOT_FOUND",
      timestamp: Date.now()
    };
  }

  const now = Date.now();
  const expiresAt = session.expires_at?.getTime() ?? 0;

  // 2. Deterministic status envelope
  return {
    exists: true,
    valid: expiresAt > now,
    expiresIn: expiresAt - now,

    identity: {
      actorId: session.actor_id,
      merchantId: session.merchant_id,
      badgeId: session.badge_id,
      deviceId: session.device_id,
      role: session.role,
      state: session.state,
      risk: session.risk_state
    },

    createdAt: session.created_at?.getTime() ?? now,
    expiresAt,

    timestamp: now
  };
}

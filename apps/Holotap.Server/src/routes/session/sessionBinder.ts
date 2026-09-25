/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: sessionBinder.ts
 * Flow: 10 — Identity Session Lifecycle
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Provides deterministic session lookup + binding for registry and payment flows.
 *   Replaces legacy Flow‑9 sessionStore.js injection logic.
 *
 * Guarantees:
 *   • Pure lookup logic
 *   • No mutations
 *   • Deterministic envelopes
 *   • Flow‑9.6 ledger‑compatible
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { prisma } from "../../db";


export async function bindToRegistry(sessionId: string, registryPayload: any) {
  // 1. Lookup session from Flow‑10 identity store
  const session = await prisma.identity_sessions.findUnique({
    where: { session_id: sessionId }
  });

  if (!session) return null;

  // 2. Deterministic identity envelope
  const identityEnvelope = {
    actorId: session.actor_id,
    badgeId: session.badge_id,
    merchantId: session.merchant_id,
    deviceId: session.device_id,
    role: session.role,
    state: session.state,
    risk: session.risk_state,
    createdAt: session.created_at,
    expiresAt: session.expires_at
  };

  // 3. Return merged registry payload (non‑mutating)
  return {
    ...registryPayload,
    identity: identityEnvelope
  };
}

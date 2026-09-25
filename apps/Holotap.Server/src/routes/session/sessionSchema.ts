/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: sessionSchema.ts
 * Flow: 10 — Identity Session Schema (TypeScript Edition)
 * Engineer: Raymond Newton (E5357171)
 * Date: 06 September 2026
 *
 * Overview:
 *   Defines the deterministic TypeScript schema for identity sessions used
 *   across Flow‑10 → Flow‑11 → Flow‑12 → Flow‑9.6 ledger pipelines.
 *
 * Notes:
 *   This schema mirrors the Prisma identity_sessions model and replaces the
 *   legacy Flow‑9 JSON schema.
 * ────────────────────────────────────────────────────────────────────────────────
 */

export interface IdentitySessionSchema {
  sessionId: string;
  actorId: string | null;
  merchantId: string | null;
  badgeId: string | null;
  deviceId: string | null;

  role: string | null;
  state: string | null;
  risk: string | null;

  createdAt: number;
  expiresAt: number;
}

export function toIdentitySessionSchema(dbSession: any): IdentitySessionSchema {
  return {
    sessionId: dbSession.session_id,
    actorId: dbSession.actor_id,
    merchantId: dbSession.merchant_id,
    badgeId: dbSession.badge_id,
    deviceId: dbSession.device_id,

    role: dbSession.role,
    state: dbSession.state,
    risk: dbSession.risk_state,

    createdAt: dbSession.created_at?.getTime() ?? Date.now(),
    expiresAt: dbSession.expires_at?.getTime() ?? Date.now()
  };
}

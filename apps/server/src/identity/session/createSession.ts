/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: createSession.ts
 * Flow: 10 — Identity Session Creation
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 */

import crypto from "crypto";
import { db } from "../../db";

export interface CreateSessionInput {
  actor_id: string;
  role?: string;
  badge_id?: string;
  device_id?: string;
  merchant_id?: string;
  source?: string;
}

export async function createSession(input: CreateSessionInput) {
  const session = {
    session_id: crypto.randomUUID(),
    actor_id: input.actor_id,
    badge_id: input.badge_id ?? null,
    device_id: input.device_id ?? null,
    merchant_id: input.merchant_id ?? null,

    role: input.role ?? "consumer",
    state: "active",
    risk_state: "low",

    created_at: new Date(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),

    source: input.source ?? "api",
    metadata: {},
  };

  await db.identitySessions.create(session);

  return session;
}
/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: createSession.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 10 — Identity Session Creation Service
 * Subsystem: Identity Session Store
 *
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 *
 * Purpose:
 *   Creates identity session records used throughout the
 *   HoloTap authentication, identity, payment and audit layers.
 *
 * Consumed By:
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit Infrastructure
 *   • Payment Services
 *   • Merchant Services
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import type {
  Prisma,
  PrismaClient,
  identity_sessions,
} from "@prisma/client";

const DEFAULT_STATE = "active";
const DEFAULT_RISK_STATE = "normal";
const DEFAULT_SOURCE = "flow-10";

export interface CreateSessionInput {
  sessionId: string;
  actorId: string;
  role: string | null;
  merchantId?: string | null;
  metadata?: Prisma.InputJsonValue | null;
  expiresAt: Date;
}

export async function createSession(
  prisma: PrismaClient,
  input: CreateSessionInput,
): Promise<identity_sessions> {
  if (!input.sessionId.trim()) {
    throw new Error("Flow 10: sessionId is required.");
  }

  if (!input.actorId.trim()) {
    throw new Error("Flow 10: actorId is required.");
  }

  return prisma.identity_sessions.create({
    data: {
      session_id: input.sessionId,
      actor_id: input.actorId,

      role: input.role,
      merchant_id: input.merchantId ?? null,

      state: DEFAULT_STATE,
      risk_state: DEFAULT_RISK_STATE,

      source: DEFAULT_SOURCE,

      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,

      created_at: new Date(),
      expires_at: input.expiresAt,
    },
  });
}
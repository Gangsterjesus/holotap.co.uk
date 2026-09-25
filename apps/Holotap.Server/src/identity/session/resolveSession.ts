/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: resolveSession.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 10 — Identity Session Resolution Service
 * Subsystem: Identity Session Store
 *
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 *
 * Purpose:
 *   Resolves active identity sessions for use throughout
 *   HoloTap identity, payment and audit flows.
 *
 * Consumed By:
 *   • Flow 7 Session Resolution
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit Infrastructure
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import { prisma } from "../../db";

export interface ResolveSessionInput {
  actorId?: string;
  sessionId?: string;
}

export async function resolveSession(
  input: ResolveSessionInput,
) {
  if (input.sessionId) {
    return prisma.identity_sessions.findUnique({
      where: {
        session_id: input.sessionId,
      },
    });
  }

  if (input.actorId) {
    return prisma.identity_sessions.findFirst({
      where: {
        actor_id: input.actorId,
        state: "active",
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  return null;
}
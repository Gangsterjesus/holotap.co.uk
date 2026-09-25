/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171
 *
 * File: resolveSession.ts
 * Module: Flow 7 Session Resolver
 *
 * Purpose:
 *   Resolve active actor sessions using deterministic
 *   lookup criteria against the canonical Prisma layer.
 *
 * Responsibilities:
 *   - Resolve active sessions
 *   - Enforce session activity constraints
 *   - Load actor relationships
 *   - Provide deterministic session objects
 *   - Maintain Prisma compatibility
 * ============================================================
 */
import { prisma } from "../db";

type IdentitySession = {
  session_id: string;
  actor_id: string;
  role: string;
  state: string;
  risk_state: string;
  created_at: Date;
  expires_at: Date;
  source: string;
  metadata: Record<string, unknown> | null;
};

export async function resolveSession(
  where: {
    id?: string;
    actor_id?: string;
  },
): Promise<IdentitySession | null> {
  if (!where) {
    return null;
  }

  const session = await prisma.sessions.findFirst({
    where: {
      ...where,
      expires_at: null,
    },
  });

  if (!session) {
    return null;
  }

  return {
    session_id: session.id,
    actor_id: session.actor_id,
    role: session.role,
    state: session.state as IdentitySession["state"],
    risk_state: "low",
    created_at: session.created_at,
    expires_at: session.expires_at ?? new Date(),
    source: "flow7",
    metadata:
      (session.metadata as Record<
        string,
        unknown
      > | null) ?? null,
  };
}
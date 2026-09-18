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

import type { Prisma } from "@prisma/client";
import { prisma } from "../db";

type ResolvedSession = Prisma.sessionsGetPayload<{
  include: {
    actor: true;
  };
}>;

export async function resolveSession(
  where: Prisma.sessionsWhereInput,
): Promise<ResolvedSession | null> {
  if (!where) {
    return null;
  }

  const session = await prisma.sessions.findFirst({
    where: {
      ...where,
      expires_at: null,
    },
    include: {
      actor: true,
    },
  });

  return session;
}
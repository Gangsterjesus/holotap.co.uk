/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 7 — Session Resolver
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 5.0.0
 *  Date: 15 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 7 resolves active actor sessions using deterministic
 *  lookup criteria against the canonical Prisma data layer.
 *
 *  This resolver acts as the primary session lookup mechanism
 *  for identity-aware backend flows and provides a stable,
 *  non-mutating access path to session records.
 *
 *  Consumed By:
 *  ------------------------------------------------------------
 *      • Flow 6  — Modern Actor Resolver
 *      • Flow 7  — Session Lifecycle
 *      • Flow 11 — Unified Actor Pipeline
 *      • Flow 12 — Identity Audit & Correlation
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *      • Resolve active sessions
 *      • Enforce session activity constraints
 *      • Load actor relations
 *      • Provide deterministic session objects
 *      • Maintain Prisma schema compatibility
 *
 *  Engineering Guarantees:
 *  ------------------------------------------------------------
 *      • Read-only operation
 *      • No destructive database actions
 *      • No schema mutations
 *      • No side effects
 * ============================================================
 */

import type { Prisma } from "@prisma/client";
import { prisma } from "../db";

export async function resolveSession(
  where: Prisma.sessionsWhereInput
): Promise<
  Prisma.sessionsGetPayload<{
    include: { actor: true };
  }> | null
> {
  // ------------------------------------------------------------
  // 1. Defensive guard
  // ------------------------------------------------------------
  if (!where) {
    return null;
  }

  // ------------------------------------------------------------
  // 2. Resolve active (non-expired) session
  // ------------------------------------------------------------
  const sessions = await prisma.sessions.findFirst({
    where: {
      ...where,
      expires_at: null,
    },
    include: {
      actor: true,
    },
  });

  // ------------------------------------------------------------
  // 3. Deterministic output
  // ------------------------------------------------------------
  return sessions ?? null;
}

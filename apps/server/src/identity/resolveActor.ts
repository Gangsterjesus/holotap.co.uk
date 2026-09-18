/**
 * ============================================================
 * HoloTapServer — Modern Actor Resolver
 * Flow 6 — Identity Resolution Layer
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.1.0
 * Date: 18 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 */

import type { Request } from "express";

import type { Actor } from "./actor";
import { resolveFounder } from "./resolveFounder";
import { resolveSession } from "./resolveSession";
import { resolveQrIdentity } from "./resolveQrIdentity";

interface ResolvedSession {
  actor_id: string | null;
  role?: string | null;
  created_at?: Date | null;
}

const ANONYMOUS_ACTOR: Actor = {
  id: null,
  type: "anonymous",
  method: "anonymous",
  role: null,
  issuedAt: null,
};

export async function resolveActor(
  req: Request,
): Promise<Actor> {
  try {
    /**
     * ------------------------------------------------------------
     * 1. Founder Identity
     * ------------------------------------------------------------
     */
    const founderKey = req.header("x-founder-key");

    if (founderKey) {
      const founder = resolveFounder(founderKey, req);

      if (founder) {
        return {
          id: "founder",
          type: "founder",
          method: "founder",
          role: "founder",
          issuedAt: Date.now(),
        };
      }
    }

    /**
     * ------------------------------------------------------------
     * 2. Session Identity
     * ------------------------------------------------------------
     */
    const sessionId = req.header("x-identity-session");

    if (sessionId) {
      const session = await resolveSession({
        id: sessionId,
      });

      if (session) {
        const resolved = session as ResolvedSession;

        return {
          id: resolved.actor_id,
          type: "session",
          method: "session",
          role: resolved.role ?? null,
          issuedAt:
            resolved.created_at?.getTime() ?? Date.now(),
        };
      }
    }

    /**
     * ------------------------------------------------------------
     * 3. QR Identity
     * ------------------------------------------------------------
     */
    const qrToken = req.header("x-qr-token");

    if (qrToken) {
      const actor = await resolveQrIdentity(qrToken);

      if (actor) {
        return actor;
      }
    }

    /**
     * ------------------------------------------------------------
     * 4. Anonymous Fallback
     * ------------------------------------------------------------
     */
    return ANONYMOUS_ACTOR;
  } catch (error) {
    console.error(
      "[Flow 6] resolveActor Error:",
      error,
    );

    return ANONYMOUS_ACTOR;
  }
}
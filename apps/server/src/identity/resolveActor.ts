/**
 * ============================================================
 * HoloTapServer — Identity Layer
 * Flow 6 — Modern Actor Resolver
 *
 * Engineer: Raymond Newton (E5357171)
 * ============================================================
 */

import type { Request } from "express";

import type { Actor } from "./actor";
import { resolveFounder } from "./resolveFounder";
import { resolveSession } from "./resolveSession";
import { resolveQrIdentity } from "./resolveQrIdentity";

export async function resolveActor(
  req: Request
): Promise<Actor> {
  try {
    // ------------------------------------------------------------
    // 1. Founder Identity
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // 2. Session Identity
    // ------------------------------------------------------------
    const sessionId = req.header("x-identity-session");

    if (sessionId) {
      const session = await resolveSession({
        session_id: sessionId,
      });

      if (session) {
        return {
          id: session.actor_id,
          type: "session",
          method: "session",
          role: session.role ?? null,
          issuedAt: session.created_at?.getTime() ?? null,
        };
      }
    }

    // ------------------------------------------------------------
    // 3. QR Identity
    // ------------------------------------------------------------
    const qrToken = req.header("x-qr-token");

    if (qrToken) {
      const actor = await resolveQrIdentity(qrToken);

      if (actor) {
        return actor;
      }
    }

    // ------------------------------------------------------------
    // 4. Anonymous Fallback
    // ------------------------------------------------------------
    return {
      id: null,
      type: "anonymous",
      method: "anonymous",
      role: null,
      issuedAt: null,
    };
  } catch (error) {
    console.error("[Flow 6] resolveActor Error:", error);

    return {
      id: null,
      type: "anonymous",
      method: "anonymous",
      role: null,
      issuedAt: null,
    };
  }
}
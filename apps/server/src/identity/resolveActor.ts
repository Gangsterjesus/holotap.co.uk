/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 6 — Modern Actor Resolver (identity/resolveActor.ts)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 6 resolves the primary Actor identity for every request.
 *  This resolver provides full support for:
 *
 *      • Founder identity (x-founder-key)
 *      • Session identity (x-identity-session)
 *      • QR identity (x-qr-token)
 *      • Anonymous identity (fallback)
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Produce a deterministic Actor object
 *  - Conform to identity/actor.ts interface
 *  - Guarantee stable identity propagation for Flows 7–11
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */

import { Actor } from "./actor";
import { resolveSession } from "./resolveSession";
import { resolveFounder } from "./resolveFounder";
import { resolveQrIdentity } from "./resolveQrIdentity";

export async function resolveActor(req: any): Promise<Actor> {
  try {
    // ------------------------------------------------------------
    // 1. Founder identity (highest priority)
    // ------------------------------------------------------------
    const founderKey = req.headers["x-founder-key"];
    if (founderKey) {
      const { isFounder } = resolveFounder(null, req);

      if (isFounder) {
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
    // 2. Session identity
    // ------------------------------------------------------------
    const sessionId = req.headers["x-identity-session"];
    if (sessionId) {
      const session = await resolveSession({ session_id: sessionId });

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
    // 3. QR identity
    // ------------------------------------------------------------
    const qrToken = req.headers["x-qr-token"];
    if (qrToken) {
      const qr = await resolveQrIdentity(qrToken);

      if (qr) {
        return qr; // Already conforms to Actor interface
      }
    }

    // ------------------------------------------------------------
    // 4. Anonymous identity (fallback)
    // ------------------------------------------------------------
    return {
      id: null,
      type: "anonymous",
      method: "anonymous",
      role: null,
      issuedAt: null,
    };
  } catch (err) {
    console.error("[Flow 6] resolveActor Error:", err);

    // Deterministic fallback
    return {
      id: null,
      type: "anonymous",
      method: "anonymous",
      role: null,
      issuedAt: null,
    };
  }
}

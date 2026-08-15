/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 6 — Identity Resolution Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  ------------------------------------------------------------
 *  Flow 6 resolves request‑level identity using deterministic
 *  header‑based authentication:
 *
 *      • Founder override (x-founder-key)
 *      • Identity session (x-identity-session)
 *      • QR token fallback (x-qr-token)
 *      • Anonymous identity
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Attach resolved actor identity to req.actor
 *  - Provide identityMethod for downstream flows
 *  - Maintain deterministic behaviour across releases
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */

import { resolveActorLegacy } from "../identity/resolveActorLegacy";

export async function identityMiddleware(req: any, res: any, next: any) {
  try {
    // ------------------------------------------------------------
    // 1. Resolve actor identity (Flow 6)
    // ------------------------------------------------------------
    const actor = await resolveActorLegacy(req);

    // ------------------------------------------------------------
    // 2. Bind identity to request
    // ------------------------------------------------------------
    req.actor = actor;
    req.identityMethod = actor?.method ?? "none";

    // ------------------------------------------------------------
    // 3. Continue pipeline
    // ------------------------------------------------------------
    next();
  } catch (err) {
    console.error("[Flow 6] Identity Middleware Error:", err);

    // Deterministic fallback
    req.actor = { type: "anonymous", id: null, method: "error" };
    req.identityMethod = "error";

    next();
  }
}

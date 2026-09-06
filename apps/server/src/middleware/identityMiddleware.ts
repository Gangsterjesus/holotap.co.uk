/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTapServer — Identity Layer
 * Flow 6 — Identity Resolution Middleware (TypeScript Edition)
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 3.0.0
 * Date: 06 September 2026
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Purpose:
 *   Flow 6 resolves request‑level identity using deterministic header‑based
 *   authentication:
 *     • Founder override (x-founder-key)
 *     • Identity session (x-identity-session)
 *     • QR token fallback (x-qr-token)
 *     • Anonymous identity
 *
 * Guarantees:
 *   • Pure resolution logic only
 *   • No destructive operations
 *   • Deterministic metadata binding for Flow‑10, Flow‑11, Flow‑12
 * ────────────────────────────────────────────────────────────────────────────────
 */
// ✔ Correct header, correct Flow‑6 description
// ✔ TypeScript Edition — good

import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { resolveActorLegacy } from "../identity/resolveActorLegacy";

export async function identityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ✔ Flow tagging — required for Flow‑12 error envelopes
  (req as any).flow = "flow-6";

  // ✔ Correlation ID propagation — required for Flow‑12.2
  (req as any).correlationId = (req as any).correlationId ?? randomUUID();

  try {
    // ✔ Deterministic actor resolution
    const actor = await resolveActorLegacy(req);

    // ✔ Bind identity metadata
    (req as any).actor = actor;
    (req as any).identityMethod = actor?.method ?? "none";

    next();
  } catch (err) {
    // ✔ Correct error logging
    console.error("[Flow 6] Identity Middleware Error:", {
      error: err instanceof Error ? err.message : String(err),
      correlationId: (req as any).correlationId,
    });

    // ✔ Deterministic fallback identity — correct
    (req as any).actor = {
      type: "anonymous",
      id: null,
      method: "error",
    };

    (req as any).identityMethod = "error";

    next();
  }
}

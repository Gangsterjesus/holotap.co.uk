/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTapServer — Identity Layer
 * Flow 10 — Founder Override Middleware (TypeScript Edition)
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 3.0.0
 * Date: 06 September 2026
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Overview:
 *   Flow 10 evaluates whether the authenticated actor is the founder.
 *   This layer provides deterministic override logic used by privileged
 *   operations across the platform.
 *
 * Guarantees:
 *   • Pure verification logic only
 *   • No destructive operations
 *   • Deterministic metadata binding for Flow‑11 + Flow‑12
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response, NextFunction } from "express";
import { resolveFounder } from "../identity/resolveFounder";

/**
 * founderMiddleware
 * -------------------------------------------------------------------------------
 * Evaluates founder override and binds req.isFounder.
 */
export function founderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Tag flow for debugging + Flow‑12 error envelopes
  (req as any).flow = "flow-10";

  const actor = (req as any).actor ?? null;

  // Deterministic founder evaluation
  const { isFounder } = resolveFounder(actor, req);

  (req as any).isFounder = isFounder;

  next();
}

/**
 * requireFounder
 * -------------------------------------------------------------------------------
 * Route guard for founder‑only operations.
 */
export function requireFounder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req as any).isFounder) {
    return res.status(403).json({
      ok: false,
      error: "FOUNDER_REQUIRED",
      meta: {
        flow: "flow-10",
        correlationId: (req as any)?.correlationId ?? null,
        sessionId: (req as any)?.sessionId ?? null,
        actorType: (req as any)?.actor?.type ?? null,
      },
    });
  }

  next();
}

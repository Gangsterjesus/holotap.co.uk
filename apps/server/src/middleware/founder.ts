/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 10 — Founder Override Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 10 evaluates whether the authenticated actor is the
 *  founder. This layer provides deterministic override logic
 *  used by privileged operations across the platform.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Consume actor identity from Flow 6
 *  - Evaluate founder secret headers
 *  - Bind req.isFounder for Flow 11 (Unified Actor Pipeline)
 *  - Provide requireFounder() guard for privileged routes
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure verification logic only
 * ============================================================
 */

import { Request, Response, NextFunction } from "express";
import { resolveFounder } from "../identity/resolveFounder";

/**
 * founderMiddleware
 * ------------------------------------------------------------
 * Evaluates founder override and binds req.isFounder.
 */
export function founderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const actor = (req as any).actor ?? null;

  // Deterministic founder evaluation
  const { isFounder } = resolveFounder(actor, req);

  (req as any).isFounder = isFounder;

  next();
}

/**
 * requireFounder
 * ------------------------------------------------------------
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
    });
  }

  next();
}

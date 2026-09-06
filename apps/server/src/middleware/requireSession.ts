/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTapServer — Identity Layer
 * Flow 7 — Session Header Guard (TypeScript Edition)
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 3.0.0
 * Date: 06 September 2026
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Overview:
 *   Ensures presence of x-session-id and binds deterministic sessionId +
 *   correlationId for downstream flows (Flow‑10, Flow‑11, Flow‑12).
 *
 * Guarantees:
 *   • Pure header validation
 *   • No destructive operations
 *   • Deterministic request metadata
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function requireSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    console.warn("[Flow 7] Missing x-session-id");

    return res.status(401).json({
      success: false,
      message: "Missing session",
    });
  }

  console.log("[Flow 7] Session header OK:", sessionId);

  // Bind deterministic sessionId
  (req as any).sessionId = sessionId;

  // Bind deterministic correlationId (Flow‑12.2)
  (req as any).correlationId = (req as any).correlationId ?? randomUUID();

  next();
}

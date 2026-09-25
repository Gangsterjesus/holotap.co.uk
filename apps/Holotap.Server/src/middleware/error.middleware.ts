/**
 * =============================================================================
 *  HoloTapServer — Core Middleware
 *  Flow 12 — Error Handling Layer (TypeScript Edition)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 3.1.0
 *  Date: 06 September 2026
 * =============================================================================
 *  PURPOSE:
 *    Centralised error middleware for HoloTapServer.
 *
 *  Responsibilities:
 *    • Capture thrown errors from any upstream middleware
 *    • Produce stable JSON error envelopes
 *    • Bind correlation + session metadata for deterministic debugging
 *    • Prevent stack trace leakage in production
 *
 *  Guarantees:
 *    • No destructive operations
 *    • No schema mutations
 *    • Deterministic output format
 * =============================================================================
 */

import type { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ---------------------------------------------------------------------------
  // 1. Deterministic logging (Flow‑12.3)
  // ---------------------------------------------------------------------------
  console.error("[Flow 12] Error Middleware:", {
    name: err?.name,
    message: err?.message,
    flow: (req as any)?.flow ?? null,
    correlationId: (req as any)?.correlationId ?? null,
    sessionId: (req as any)?.sessionId ?? null,
    actorType: (req as any)?.actor?.type ?? null,
  });

  // ---------------------------------------------------------------------------
  // 2. Stable error envelope (Flow‑12.3)
  // ---------------------------------------------------------------------------
  const payload: Record<string, any> = {
    success: false,
    error: {
      name: err?.name || "Error",
      message: err?.message || "An unexpected error occurred",
    },
    meta: {
      flow: (req as any)?.flow ?? null,
      correlationId: (req as any)?.correlationId ?? null,
      sessionId: (req as any)?.sessionId ?? null,
      actorType: (req as any)?.actor?.type ?? null,
    },
  };

  // ---------------------------------------------------------------------------
  // 3. Prevent stack trace leakage in production
  // ---------------------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    payload.error.stack = err?.stack || null;
  }

  // ---------------------------------------------------------------------------
  // 4. Respond with deterministic structure
  // ---------------------------------------------------------------------------
  res.status(err?.status || 500).json(payload);
}

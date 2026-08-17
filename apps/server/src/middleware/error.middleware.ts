/**
 * =============================================================================
 *  HoloTapServer — Core Middleware
 *  Flow 12 — Error Handling Layer
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 17 August 2026
 * =============================================================================
 *  PURPOSE:
 *  Centralised error middleware for HoloTapServer.
 *
 *  Responsibilities:
 *    • Capture thrown errors from any upstream middleware
 *    • Produce stable JSON error envelopes
 *    • Prevent stack trace leakage in production
 *
 *  Guarantees:
 *    • No destructive operations
 *    • No schema mutations
 *    • Deterministic output format
 * =============================================================================
 */

import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ---------------------------------------------------------------------------
  // 1. Deterministic logging
  // ---------------------------------------------------------------------------
  console.error("[Flow 12] Error Middleware:", {
    name: err?.name,
    message: err?.message,
    flow: (req as any)?.flow ?? null,
  });

  // ---------------------------------------------------------------------------
  // 2. Stable error envelope
  // ---------------------------------------------------------------------------
  const payload: Record<string, any> = {
    success: false,
    error: {
      name: err?.name || "Error",
      message: err?.message || "An unexpected error occurred",
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

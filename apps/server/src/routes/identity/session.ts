/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: session.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 7 — Session Binding Middleware
 * Subsystem: Identity Session Resolution
 *
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 *
 * Purpose:
 *   Resolves and binds the active identity session to the
 *   incoming request following successful identity resolution.
 *
 * Responsibilities:
 *   • Consume actor context from Flow 6
 *   • Resolve active sessions via Flow 10
 *   • Bind req.session
 *   • Bind req.state
 *   • Provide deterministic session context for downstream flows
 *
 * Consumed By:
 *   • Flow 8 Payment Preparation
 *   • Flow 9 Payment Services
 *   • Flow 10 Identity Services
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit Infrastructure
 *
 * Guarantees:
 *   • No state mutation
 *   • No session creation
 *   • No session revocation
 *   • Resolution only
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import type { Request, Response, NextFunction } from "express";

import { resolveSession } from "../../identity/session/resolveSession";
interface BoundActor {
  id?: string | null;
}

interface BoundSession {
  session_id: string;
  actor_id: string;
  role?: string | null;
  state?: string | null;
  risk_state?: string | null;
}

type SessionRequest = Request & {
  actor?: BoundActor;
  session?: BoundSession | null;
  state?: string | null;
};

export async function bindSession(
  req: SessionRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const actor = req.actor;

    if (!actor?.id) {
      req.session = null;
      req.state = null;

      next();
      return;
    }

    const session = await resolveSession({
      actorId: actor.id,
    });

    req.session = session as BoundSession | null;
    req.state = session?.state ?? null;

    next();
  } catch (error) {
    console.error("[Flow 7] Session Binding Error", {
      error,
      actorId: req.actor?.id ?? null,
    });

    req.session = null;
    req.state = null;

    next();
  }
}
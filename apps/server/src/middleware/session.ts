/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 7 — Session Binding Middleware (session.ts)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 7 resolves and attaches the active session for the
 *  authenticated actor. This middleware runs immediately after
 *  Flow 6 (Identity Resolution) and guarantees deterministic
 *  session context for all downstream flows.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Consume actor identity from Flow 6
 *  - Resolve active session via resolveSession()
 *  - Bind req.session and req.state
 *  - Provide stable session context for Flow 8–11
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */

import { Request, Response, NextFunction } from "express";
import { resolveSession } from "../identity/resolveSession";

/**
 * bindSession
 * ------------------------------------------------------------
 * Attaches Flow 7 session context to the request.
 *
 * Input:
 *   req.actor → Flow 6 identity
 *
 * Output:
 *   req.session → Flow 7 session record
 *   req.state   → session.state (deterministic)
 */
export async function bindSession(
  req: Request & { actor?: any; session?: any; state?: any },
  res: Response,
  next: NextFunction
) {
  try {
    // ------------------------------------------------------------
    // 1. Flow 6 must have produced an actor
    // ------------------------------------------------------------
    const actor = req.actor;

    if (!actor || !actor.id) {
      req.session = null;
      req.state = null;
      return next();
    }

    // ------------------------------------------------------------
    // 2. Resolve active session for this actor
    // ------------------------------------------------------------
    const session = await resolveSession({ actor_id: actor.id });

    // ------------------------------------------------------------
    // 3. Bind session + state to request
    // ------------------------------------------------------------
    req.session = session ?? null;
    req.state = session?.state ?? null;

    return next();
  } catch (err) {
    console.error("[Flow 7] Session Binder Error:", err);

    // ------------------------------------------------------------
    // 4. Deterministic fallback on error
    // ------------------------------------------------------------
    req.session = null;
    req.state = null;

    return next();
  }
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTapServer — Identity Layer
 * Flow 8 — Organisation Access Middleware (TypeScript Edition)
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Version: 3.0.0
 * Date: 06 September 2026
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Description:
 *   Flow 8 resolves organisation context for the authenticated actor.
 *   It binds:
 *      req.orgUser  → org_users record
 *      req.tenant   → org_tenants record
 *
 *   Permission resolution is handled by Flow 9 and must not be implemented here.
 *
 * Guarantees:
 *   • Pure resolution logic only
 *   • No destructive operations
 *   • Deterministic metadata binding for Flow‑11 + Flow‑12
 * ────────────────────────────────────────────────────────────────────────────────
 */

import type { Request, Response, NextFunction } from "express";
import { resolveOrg } from "../identity/resolveOrg";

export async function orgMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Tag flow for debugging + Flow‑12 error envelopes
  (req as any).flow = "flow-8";

  try {
    const actor = (req as any).actor;

    // ---------------------------------------------------------------------------
    // 1. No actor → no org context
    // ---------------------------------------------------------------------------
    if (!actor || !actor.id) {
      (req as any).orgUser = null;
      (req as any).tenant = null;
      return next();
    }

    // ---------------------------------------------------------------------------
    // 2. Resolve organisation context
    // ---------------------------------------------------------------------------
    const { orgUser, tenant } = await resolveOrg(actor);

    (req as any).orgUser = orgUser ?? null;
    (req as any).tenant = tenant ?? null;

    // ---------------------------------------------------------------------------
    // 3. Permissions are NOT resolved here (Flow 9)
    // ---------------------------------------------------------------------------
    // Flow 9 will attach:
    //   req.permissions = [...]
    // This middleware must NOT derive permissions.

    return next();
  } catch (err) {
    console.error("[Flow 8] Org Middleware Error:", {
      error: err instanceof Error ? err.message : String(err),
      correlationId: (req as any)?.correlationId ?? null,
      actorId: (req as any)?.actor?.id ?? null,
    });

    (req as any).orgUser = null;
    (req as any).tenant = null;

    return next();
  }
}

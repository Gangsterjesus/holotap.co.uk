/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 8 — Organisation Access Middleware
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 8 resolves organisation context for the authenticated
 *  actor. It binds:
 *
 *      req.orgUser  → org_users record
 *      req.tenant   → org_tenants record
 *
 *  Permission resolution is handled by Flow 9 and must not be
 *  implemented inside Flow 8.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Resolve org_user from actor.id
 *  - Resolve tenant from org_user.tenant relation
 *  - Bind deterministic organisation context
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 * ============================================================
 */

import { Request, Response, NextFunction } from "express";
import { resolveOrg } from "../identity/resolveOrg";

export async function orgMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const actor = (req as any).actor;

    // ------------------------------------------------------------
    // 1. No actor → no org context
    // ------------------------------------------------------------
    if (!actor || !actor.id) {
      (req as any).orgUser = null;
      (req as any).tenant = null;
      return next();
    }

    // ------------------------------------------------------------
    // 2. Resolve organisation context
    // ------------------------------------------------------------
    const { orgUser, tenant } = await resolveOrg(actor);

    (req as any).orgUser = orgUser ?? null;
    (req as any).tenant = tenant ?? null;

    // ------------------------------------------------------------
    // 3. Permissions are NOT resolved here (Flow 9)
    // ------------------------------------------------------------
    // Flow 9 will attach:
    //   req.permissions = [...]
    // This middleware must NOT derive permissions.

    return next();
  } catch (err) {
    console.error("[Flow 8] Org Middleware Error:", err);

    (req as any).orgUser = null;
    (req as any).tenant = null;

    return next();
  }
}

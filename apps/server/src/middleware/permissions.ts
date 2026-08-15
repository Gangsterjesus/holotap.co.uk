/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 9 — Deterministic Permission Resolver (permission.ts)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Overview:
 *  ------------------------------------------------------------
 *  Flow 9 produces a deterministic permission array for the
 *  authenticated actor. It consumes identity context from:
 *
 *      • Flow 6 — actor identity
 *      • Flow 7 — session lifecycle
 *      • Flow 8 — organisation resolution
 *
 *  This resolver is intentionally pure and contains no domain
 *  logic, no destructive operations, and no schema mutations.
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Collect roles from actor, session, and orgUser
 *  - Map roles → permissions deterministically
 *  - Deduplicate permission output
 *  - Provide stable permission array for Flow 11
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - Pure resolution logic only
 *  - Deterministic output across releases
 *  - No dependency on tenant correctness
 * ============================================================
 */

import { Request } from "express";

/**
 * resolvePermissions
 * ------------------------------------------------------------
 * Produces a deterministic permission array based on identity
 * context from upstream flows.
 *
 * Input:
 *   req.actor   → Flow 6 identity
 *   req.session → Flow 7 session
 *   req.orgUser → Flow 8 organisation user
 *
 * Output:
 *   string[] — stable permission identifiers
 */
export function resolvePermissions(req: Request): string[] {
  // ------------------------------------------------------------
  // 1. Extract identity context from request
  // ------------------------------------------------------------
  const actor = (req as any).actor ?? null;
  const session = (req as any).session ?? null;
  const orgUser = (req as any).orgUser ?? null;

  // ------------------------------------------------------------
  // 2. Collect raw roles from all upstream flows
  // ------------------------------------------------------------
  const rawRoles = [
    actor?.role ?? null,
    session?.role ?? null,
    orgUser?.role ?? null,
  ].filter(Boolean);

  // ------------------------------------------------------------
  // 3. Deterministic role → permission mapping
  // ------------------------------------------------------------
  const permissionMap: Record<string, string[]> = {
    founder: ["platform.admin", "tenant.admin", "merchant.admin"],
    admin: ["tenant.admin", "merchant.admin"],
    manager: ["merchant.write", "merchant.read"],
    staff: ["merchant.read"],
    mobile_user: ["tenant.read"],
    user: ["tenant.read"],
  };

  const permissions = new Set<string>();

  // ------------------------------------------------------------
  // 4. Map each role to its permission set
  // ------------------------------------------------------------
  for (const role of rawRoles) {
    const mapped = permissionMap[role];
    if (mapped) {
      mapped.forEach((p) => permissions.add(p));
    }
  }

  // ------------------------------------------------------------
  // 5. Deterministic output (deduplicated)
  // ------------------------------------------------------------
  return Array.from(permissions);
}

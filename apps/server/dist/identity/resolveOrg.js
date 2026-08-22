"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 8 — Organisation Access Resolver
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 8 resolves organisation context for an authenticated
 *  actor. It binds:
 *
 *      actor.id → org_users → org_tenants
 *
 *  This provides deterministic organisation context for:
 *      • Flow 9 — Permission Enforcement
 *      • Flow 10 — Founder Override Layer
 *      • Flow 11+ — Billing, Merchant Ops, Audit Trails
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Resolve org_users record for the actor
 *  - Resolve org_tenants record via tenant_id relation
 *  - Produce stable orgUser + tenant context object
 *
 *  Guarantees:
 *  ------------------------------------------------------------
 *  - No destructive operations
 *  - No schema mutations
 *  - Pure resolution logic only
 *
 * ============================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveOrg = resolveOrg;
const db_1 = require("../db");
/**
 * resolveOrg
 * ------------------------------------------------------------
 * Resolves organisation context for the authenticated actor.
 *
 * Input:
 *   actor: Flow 6 identity object containing actor.id
 *
 * Output:
 *   {
 *     orgUser: org_users | null,
 *     tenant: org_tenants | null
 *   }
 */
async function resolveOrg(actor) {
    // ------------------------------------------------------------
    // 1. Actor must exist
    // ------------------------------------------------------------
    if (!actor || !actor.id) {
        return { orgUser: null, tenant: null };
    }
    // ------------------------------------------------------------
    // 2. Resolve org_users entry for this actor
    // ------------------------------------------------------------
    const orgUser = await db_1.prisma.org_users.findUnique({
        where: { id: actor.id },
        include: {
            tenant: true, // Prisma relation → org_tenants
        },
    });
    if (!orgUser) {
        return { orgUser: null, tenant: null };
    }
    // ------------------------------------------------------------
    // 3. Tenant is already resolved via relation
    // ------------------------------------------------------------
    const tenant = orgUser.tenant ?? null;
    // ------------------------------------------------------------
    // 4. Output Contract
    // ------------------------------------------------------------
    return {
        orgUser,
        tenant,
    };
}

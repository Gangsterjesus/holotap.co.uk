"use strict";
/**
 * ============================================================
 *  HoloTapServer — Identity Layer
 *  Flow 7 — Session Resolver
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Description:
 *  ------------------------------------------------------------
 *  Flow 7 resolves active (non‑expired) actor sessions using
 *  deterministic criteria. This resolver is intentionally minimal
 *  and is consumed by:
 *
 *      • Flow 6 — Identity Layer
 *      • Flow 7 — Session Lifecycle
 *
 *  Responsibilities:
 *  ------------------------------------------------------------
 *  - Resolve active sessions (expires_at = null)
 *  - Provide typed session objects to identity flows
 *  - Maintain deterministic behaviour across releases
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
exports.resolveSession = resolveSession;
const db_1 = require("../db");
/**
 * resolveSession
 * ------------------------------------------------------------
 * Resolves an active session using the provided lookup criteria.
 *
 * Input:
 *   where: Partial<sessions> — lookup fields (e.g., actor_id)
 *
 * Output:
 *   sessions | null
 */
async function resolveSession(where) {
    // ------------------------------------------------------------
    // 1. Defensive guard — no lookup criteria
    // ------------------------------------------------------------
    if (!where)
        return null;
    // ------------------------------------------------------------
    // 2. Resolve active (non‑expired) session
    // ------------------------------------------------------------
    const session = await db_1.prisma.sessions.findFirst({
        where: {
            ...where,
            expires_at: null, // Active session only
        },
        include: {
            actor: true, // org_users relation
        },
    });
    // ------------------------------------------------------------
    // 3. Deterministic output
    // ------------------------------------------------------------
    return session ?? null;
}

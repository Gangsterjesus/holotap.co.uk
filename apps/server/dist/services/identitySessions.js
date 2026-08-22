"use strict";
/*
 * HoloTapServer — Identity Session Service
 * Flow 6 — Merchant Identity Layer
 * Engineer: Raymond Newton (E5357171)
 *
 * Description:
 * Deterministic creation of merchant identity sessions.
 * This service is invoked by Flow 6 (Identity Resolver) and
 * provides a stable interface for generating identity sessions
 * used in downstream flows (Flow 7: Session Resolver,
 * Flow 8: Org Access Layer, and Flow 9: Payment Lifecycle).
 *
 * Responsibilities:
 * - Create identity_sessions rows with strict field mapping
 * - Enforce schema correctness (role, merchantId, metadata, expires_at)
 * - Maintain separation from actor sessions (sessions model)
 * - Provide deterministic behaviour across all flows
 *
 * Guarantees:
 * - No domain logic
 * - No mutations outside identity_sessions
 * - No side effects beyond DB write
 * - No assumptions about Flow 7 or Flow 8
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentitySession = createIdentitySession;
async function createIdentitySession(prisma, { role, merchantId = null, metadata = null, expiresAt, }) {
    return prisma.identity_sessions.create({
        data: {
            role,
            merchantId,
            metadata,
            expires_at: expiresAt,
        },
    });
}

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

import { PrismaClient } from '@prisma/client';

export async function createIdentitySession(
  prisma: PrismaClient,
  {
    role,
    merchantId = null,
    metadata = null,
    expiresAt,
  }: {
    role: string;
    merchantId?: string | null;
    metadata?: any | null;
    expiresAt: Date;
  }
) {
  return prisma.identity_sessions.create({
    data: {
      role,
      merchantId,
      metadata,
      expires_at: expiresAt,
    },
  });
}

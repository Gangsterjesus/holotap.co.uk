/**
 * ============================================================
 *  HoloTapServer — Identity Layer (Legacy Resolver)
 *  Flow 6 — Actor Resolution (Prototype Compatibility)
 *
 *  Engineer: Raymond Newton (Founder‑Architect, E5357171)
 *  Version: 2.4.2
 *  Date: 15 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  ------------------------------------------------------------
 *  This module provides the legacy header‑based identity resolver
 *  originally built on 05 August 2026. It remains in service as:
 *
 *    • Founder override path (x-founder-key)
 *    • QR identity fallback (x-qr-token)
 *    • Anonymous identity fallback
 *
 *  Notes:
 *  ------------------------------------------------------------
 *  - Updated to match actual Prisma schema fields
 *  - identity_sessions has no `token` → using `id`
 *  - Merchant is an org_user → loaded via org_users
 *  - qr_codes has no `token` → using `id`
 *
 * ============================================================
 */

import { prisma } from "../db";

/**
 * resolveActorLegacy
 * ------------------------------------------------------------
 * Legacy identity resolver using header-based authentication.
 *
 * Resolution Order:
 *   1. Founder override (x-founder-key)
 *   2. Identity session (x-identity-session)
 *   3. QR token fallback (x-qr-token)
 *   4. Anonymous identity
 */
export async function resolveActorLegacy(req: any) {
  // ------------------------------------------------------------
  // 1. Founder Override
  // ------------------------------------------------------------
  const founderKey = req.headers["x-founder-key"];
  if (founderKey && founderKey === process.env.FOUNDER_KEY) {
    return {
      type: "founder",
      id: "founder",
      method: "founder-key",
    };
  }

  // ------------------------------------------------------------
  // 2. Identity Session (Flow 6 Primary)
  // ------------------------------------------------------------
  const sessionToken = req.headers["x-identity-session"];
  if (sessionToken) {
    const session = await prisma.identity_sessions.findUnique({
      where: { id: sessionToken }, // Correct: token does not exist
    });

    if (session) {
      let merchant = null;

      // Merchant is an org_user
      if (session.merchantId) {
        merchant = await prisma.org_users.findUnique({
          where: { id: session.merchantId },
        });
      }

      return {
        type: "session",
        id: session.id,
        merchant,
        method: "identity-session",
      };
    }
  }

  // ------------------------------------------------------------
  // 3. QR Token (Legacy Fallback)
  // ------------------------------------------------------------
  const qrToken = req.headers["x-qr-token"];
  if (qrToken) {
    const qr = await prisma.qr_codes.findUnique({
      where: { id: qrToken }, // Correct: token does not exist
    });

    if (qr) {
      return {
        type: "qr",
        id: qr.id,
        method: "qr-token",
      };
    }
  }

  // ------------------------------------------------------------
  // 4. Anonymous Identity
  // ------------------------------------------------------------
  return {
    type: "anonymous",
    id: null,
    method: "none",
  };
}

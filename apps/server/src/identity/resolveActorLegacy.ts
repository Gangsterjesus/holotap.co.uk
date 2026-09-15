/**
 * ============================================================================
 * HoloTapServer — Identity Layer (Legacy Resolver)
 * Flow 6 — Legacy Actor Resolution Compatibility Layer
 *
 * Engineer: Raymond Newton (Founder-Architect, E5357171)
 * Version: 5.0.0
 * Date: 15 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================================
 *
 * PURPOSE
 * ----------------------------------------------------------------------------
 * Provides backward-compatible header-based identity resolution for legacy
 * requests that have not yet migrated to the Unified Actor Pipeline.
 *
 * This resolver acts as a compatibility bridge between historical Flow 6
 * identity mechanisms and the modern Flow 11 Unified Actor architecture.
 *
 * RESOLUTION ORDER
 * ----------------------------------------------------------------------------
 * 1. Founder Override       (x-founder-key)
 * 2. Identity Session       (x-identity-session)
 * 3. QR Identity Fallback   (x-qr-token)
 * 4. Anonymous Identity
 *
 * FLOW INTEGRATION
 * ----------------------------------------------------------------------------
 * Consumed By:
 *   • Flow 6  - Legacy Identity Resolution
 *   • Flow 7  - Session Resolution
 *   • Flow 10 - Identity Session APIs
 *   • Flow 11 - Unified Actor Pipeline
 *
 * COMPATIBILITY NOTES
 * ----------------------------------------------------------------------------
 * This module remains operational to support legacy clients and migration
 * flows. New identity implementations should prefer the Unified Actor
 * Pipeline where possible.
 *
 * SCHEMA ALIGNMENT (v5)
 * ----------------------------------------------------------------------------
 * Updated to align with current Prisma schema:
 *
 *   identity_sessions
 *     • session_id
 *     • actor_id
 *     • merchant_id
 *
 *   qr_codes
 *     • id
 *
 *   org_users
 *     • id
 *
 * Legacy assumptions regarding:
 *   • token
 *   • merchantId
 *   • session.id
 *
 * have been removed in favour of generated Prisma model fields.
 *
 * ENGINEERING NOTES
 * ----------------------------------------------------------------------------
 * • Legacy compatibility layer only.
 * • Must remain deterministic.
 * • Must never throw on missing identity headers.
 * • Must always produce a valid actor envelope.
 * • Supports founder override for platform administration.
 * • Intended for progressive migration toward Flow 11+ identity services.
 *
 * CHANGE LOG
 * ----------------------------------------------------------------------------
 * v5.0.0
 *   • Rebuilt against generated Prisma v6 client.
 *   • Updated identity_sessions field mappings.
 *   • Removed obsolete token-based assumptions.
 *   • Added Flow 11 compatibility documentation.
 *   • Standardised engineering documentation format.
 * ============================================================================
 */
import { prisma } from "../db";

export async function resolveActorLegacy(req: any) {
  const founderKey = req.headers["x-founder-key"];

  if (
    founderKey &&
    founderKey === process.env.FOUNDER_KEY
  ) {
    return {
      type: "founder",
      id: "founder",
      method: "founder-key",
    };
  }

  // -------------------------------------------------------------------------
  // Identity Session
  // -------------------------------------------------------------------------
  const sessionToken = req.headers["x-identity-session"];

  if (typeof sessionToken === "string") {
    const session = await prisma.identity_sessions.findUnique({
      where: {
        session_id: sessionToken,
      },
    });

    if (session) {
      let merchant = null;

      if (session.merchant_id) {
        merchant = await prisma.org_users.findUnique({
          where: {
            id: session.merchant_id,
          },
        });
      }

      return {
        type: "session",
        id: session.actor_id,
        merchant,
        method: "identity-session",
      };
    }
  }

  // -------------------------------------------------------------------------
  // QR Identity Fallback
  // -------------------------------------------------------------------------
  const qrToken = req.headers["x-qr-token"];

  if (typeof qrToken === "string") {
    const qr = await prisma.qr_codes.findUnique({
      where: {
        id: qrToken,
      },
    });

    if (qr) {
      return {
        type: "qr",
        id: qr.id,
        method: "qr-token",
      };
    }
  }

  // -------------------------------------------------------------------------
  // Anonymous Identity
  // -------------------------------------------------------------------------
  return {
    type: "anonymous",
    id: null,
    method: "none",
  };
}
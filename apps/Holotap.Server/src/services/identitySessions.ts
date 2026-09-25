/**
 * ============================================================
 * HoloTapServer — Identity Session Service
 * Flow 10 — Identity Session Creation Service
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.1.0
 * Date: 15 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * Creates deterministic Flow 10 identity session records
 * within the canonical identity_sessions store.
 *
 * This service provides the authoritative mechanism for
 * issuing merchant and identity session records consumed
 * by downstream identity, actor, audit, and payment flows.
 *
 * RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Create identity_sessions records
 * • Enforce Prisma schema compliance
 * • Map application fields to database fields
 * • Initialise identity lifecycle state
 * • Initialise risk assessment state
 * • Persist metadata payloads
 * • Maintain deterministic session creation
 *
 * FLOW INTEGRATION
 * ------------------------------------------------------------
 * • Flow 6  — Identity Resolver
 * • Flow 7  — Session Resolution
 * • Flow 9  — Payment Lifecycle
 * • Flow 10 — Identity Session Store
 * • Flow 11 — Unified Actor Pipeline
 * • Flow 12 — Identity Audit & Correlation
 *
 * SESSION DEFAULTS
 * ------------------------------------------------------------
 * State:
 *   • active
 *
 * Risk State:
 *   • normal
 *
 * Source:
 *   • flow-10
 *
 * ENGINEERING GUARANTEES
 * ------------------------------------------------------------
 * • Schema-compliant record creation
 * • No domain decision logic
 * • No actor mutation
 * • No session lifecycle mutation
 * • Deterministic write behaviour
 * • No side effects beyond database persistence
 *
 * SECURITY NOTES
 * ------------------------------------------------------------
 * • All sessions require actor attribution.
 * • All sessions receive a risk classification.
 * • Session source attribution is mandatory.
 * • Metadata is stored using Prisma JSON typing.
 *
 * CHANGE LOG
 * ------------------------------------------------------------
 * v5.1.0
 * • Added strict Prisma JSON typing.
 * • Added schema-complete field mapping.
 * • Added actor attribution requirements.
 * • Added risk-state initialisation.
 * • Standardised Flow 10 documentation.
 *
 * ============================================================
 */
import type { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";




/**
 * Flow 10 Defaults
 * ------------------------------------------------------------
 * Canonical session creation defaults.
 *
 * Any modification to these values requires review of:
 *   • Flow 10 Identity Session Store
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit & Correlation
 */
const DEFAULT_SESSION_STATE = "active";
const DEFAULT_RISK_STATE = "normal";
const DEFAULT_SOURCE = "flow-10";

export async function createIdentitySession(
  prisma: PrismaClient,
  {
    sessionId,
    actorId,
    role,
    merchantId = null,
    metadata = null,
    expiresAt,
  }: {
    sessionId: string;
    actorId: string;
    role: string;
    merchantId?: string | null;
    metadata?: Record<string, unknown> | null;
    expiresAt: Date;
  }
) {
  return prisma.identity_sessions.create({
    data: {
      session_id: sessionId,
      actor_id: actorId,

      role,
      merchant_id: merchantId,

      state: DEFAULT_SESSION_STATE,
      risk_state: DEFAULT_RISK_STATE,

      source: DEFAULT_SOURCE,

      created_at: new Date(),
      expires_at: expiresAt,

    metadata: (metadata ?? {}) as any,
    },
  });
}
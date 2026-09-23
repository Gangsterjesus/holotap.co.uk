/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: sessionTypes.ts
 * FilePath: apps/server/src/identity/session/sessionTypes.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 10 — Identity Session Management
 * Subsystem: Identity Session Store
 * ISO 27001: 2026-09-20
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 *
 * Purpose:
 *   Canonical Flow 10 session contracts used throughout
 *   HoloTap identity, payment, audit and ledger flows.
 *
 * Consumed By:
 *   • createSession.ts
 *   • resolveSession.ts
 *   • revokeSession.ts
 *   • createSessionRoute.ts
 *   • resolveSessionRoute.ts
 *   • revokeSessionRoute.ts
 *   • Flow 7 Session Binding Middleware
 *   • Flow 11 Unified Actor Pipeline
 *   • Flow 12 Audit Infrastructure
 *
 * ISO 27001 Alignment:
 *   • Access Control
 *   • Identity & Authentication
 *   • Session Lifecycle Management
 *   • Auditability
 *   • Traceability
 *   • Information Security Monitoring
 *
 * Security Objectives:
 *   • Secure By Design
 *   • Defence In Depth
 *   • Least Privilege
 *   • Deterministic Session Handling
 *   • Identity First Security
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import type { Prisma } from "@prisma/client";

/**
 * =============================================================================
 * Session State Registry
 * =============================================================================
 */

export const SESSION_STATES = {
  ACTIVE: "active",
  IDLE: "idle",
  VERIFICATION_PENDING: "verification_pending",
  VERIFIED: "verified",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_COMPLETE: "payment_complete",
  REVOKED: "revoked",
  EXPIRED: "expired",
} as const;

export type SessionState =
  typeof SESSION_STATES[keyof typeof SESSION_STATES];

/**
 * =============================================================================
 * Risk Classification Registry
 * =============================================================================
 */

export const RISK_STATES = {
  NORMAL: "normal",
  ELEVATED: "elevated",
  RESTRICTED: "restricted",
  BLOCKED: "blocked",
} as const;

export type RiskState =
  typeof RISK_STATES[keyof typeof RISK_STATES];

/**
 * =============================================================================
 * Session Source Registry
 * =============================================================================
 */

export const SESSION_SOURCES = {
  FLOW_10: "flow-10",
  MOBILE: "mobile",
  MERCHANT: "merchant",
  FOUNDER: "founder",
  API: "api",
} as const;

export type SessionSource =
  typeof SESSION_SOURCES[keyof typeof SESSION_SOURCES];

/**
 * =============================================================================
 * Canonical Identity Session
 * =============================================================================
 */

export interface IdentitySession {
  session_id: string;

  actor_id: string;

  badge_id?: string | null;
  device_id?: string | null;
  merchant_id?: string | null;

  role?: string | null;

  state: SessionState;
  risk_state: RiskState;

  created_at: Date;
  expires_at: Date;

  source: SessionSource;

  correlation_id?: string | null;

  metadata?: Prisma.InputJsonValue | null;
}

/**
 * =============================================================================
 * Flow 10 Create Session Input
 * =============================================================================
 */

export interface CreateSessionInput {
  sessionId: string;
  actorId: string;

  role: string | null;

  merchantId?: string | null;

  expiresAt: Date;

}
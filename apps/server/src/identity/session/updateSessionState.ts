/**
 * =============================================================================
 * HoloTap Engineering Header
 * =============================================================================
 * File: sessionTypes.ts
 * Product: HoloTap Hero v5.0.0
 * Flow: 10 — Identity Session Management
 * Subsystem: Identity Session Store
 *
 * Engineer: Raymond Newton
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 20 September 2026
 *
 * Purpose:
 *   Provides the canonical type contracts for Flow 10 identity
 *   session lifecycle management across the HoloTap platform.
 *
 * Responsibilities:
 *   • Define identity session structures
 *   • Define session lifecycle states
 *   • Define risk classifications
 *   • Define service contracts
 *   • Support Flow 7 session binding
 *   • Support Flow 11 actor resolution
 *   • Support Flow 12 audit and correlation
 *
 * Consumed By:
 *   • createSession.ts
 *   • resolveSession.ts
 *   • revokeSession.ts
 *   • createSessionRoute.ts
 *   • resolveSessionRoute.ts
 *   • revokeSessionRoute.ts
 *   • session.ts
 *   • actorPipeline.ts
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
 *   • Identity First Architecture
 *   • Deterministic Session Control
 *
 * Status:
 *   Production Active
 * =============================================================================
 */

import type { Prisma } from "@prisma/client";

/**
 * ============================================================================
 * Session State Registry
 * ============================================================================
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
  (typeof SESSION_STATES)[keyof typeof SESSION_STATES];

/**
 * ============================================================================
 * Risk Classification Registry
 * ============================================================================
 */

export const RISK_STATES = {
  NORMAL: "normal",
  ELEVATED: "elevated",
  RESTRICTED: "restricted",
  BLOCKED: "blocked",
} as const;

export type RiskState =
  (typeof RISK_STATES)[keyof typeof RISK_STATES];

/**
 * ============================================================================
 * Session Source Registry
 * ============================================================================
 */

export const SESSION_SOURCES = {
  FLOW_10: "flow-10",
  API: "api",
  MOBILE: "mobile",
  MERCHANT: "merchant",
  FOUNDER: "founder",
} as const;

export type SessionSource =
  (typeof SESSION_SOURCES)[keyof typeof SESSION_SOURCES];

/**
 * ============================================================================
 * Canonical Identity Session
 * ============================================================================
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

  /**
   * Flow‑12 correlation support
   */
  correlation_id?: string | null;

  /**
   * Future internationalisation support
   */
  preferred_language?: string | null;
  preferred_currency?: string | null;

  metadata?: Prisma.InputJsonValue | null;
}

/**
 * ============================================================================
 * Flow 10 — Create Session Contract
 * ============================================================================
 */

export interface CreateSessionInput {
  sessionId: string;
  actorId: string;

  role: string | null;

  merchantId?: string | null;

  expiresAt: Date;

  metadata?: Prisma.InputJsonValue | null;
}

/**
 * ============================================================================
 * Flow 10 — Resolve Session Contract
 * ============================================================================
 */

export interface ResolveSessionInput {
  sessionId?: string;
  actorId?: string;
}

/**
 * ============================================================================
 * Flow 10 — Revoke Session Contract
 * ============================================================================
 */

export interface RevokeSessionInput {
  sessionId: string;
}

/**
 * ============================================================================
 * Session Preferences
 * ============================================================================
 */

export interface SessionPreferences {
  preferredLanguage?: string | null;
  preferredCurrency?: string | null;
}

/**
 * ============================================================================
 * Standard Service Result
 * ============================================================================
 */

export interface SessionResult {
  success: boolean;
  session?: IdentitySession | null;
  message?: string;
}
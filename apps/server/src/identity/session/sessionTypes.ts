/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: sessionTypes.ts
 * Flow: 10 — Identity Session Management
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 *
 * PURPOSE:
 *   Canonical type definitions for Flow‑10 identity session lifecycle.
 *
 * USED BY:
 *   • createSession.ts
 *   • resolveSession.ts
 *   • revokeSession.ts
 *   • createSessionRoute.ts
 *   • resolveSessionRoute.ts
 *   • revokeSessionRoute.ts
 *
 * =============================================================================
 */



export type SessionState =
  | "active"
  | "idle"
  | "verification_pending"
  | "verified"
  | "payment_pending"
  | "payment_complete"
  | "revoked"
  | "expired";

export interface IdentitySession {
  session_id: string;

  actor_id: string;

  badge_id?: string | null;
  device_id?: string | null;
  merchant_id?: string | null;

  role?: string | null;

  state: SessionState;
  risk_state: string;

  created_at: Date;
  expires_at: Date;

  source: string;

  metadata?: Record<string, unknown> | null;
}

/**
 * Flow‑10 Create Session
 */
export interface CreateSessionRequest {
  actor_id: string;

  badge_id?: string;
  device_id?: string;
  merchant_id?: string;

  role?: string;

  source: string;

  metadata?: Record<string, unknown>;
}

/**
 * Flow‑10 Resolve Session
 */
export interface ResolveSessionRequest {
  session_id: string;
}

/**
 * Flow‑10 Revoke Session
 */
export interface RevokeSessionRequest {
  session_id: string;
}

/**
 * Standard service result
 */
export interface SessionResult {
  success: boolean;
  session?: IdentitySession | null;
  message?: string;
}
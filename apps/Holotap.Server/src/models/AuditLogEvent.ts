/**
 * HoloTapServer
 * Audit Log Event Model
 *
 * Purpose:
 *  - Unified schema for security-sensitive events.
 *  - Aligned with NIST SP 800-92 (log management).
 */

export type AuditResult = 'success' | 'failure';

export interface AuditLogEvent {
  /** ISO-8601 timestamp of the event. */
  timestamp: Date;

  /** Tenant / organisation context. */
  tenantId?: string;

  /** User identifier, if applicable. */
  userId?: string;

  /** High-level action type (e.g. 'qr_activation', 'session_create'). */
  action: string;

  /** Origin of the request: 'web' | 'mobile' | 'server'. */
  origin?: 'web' | 'mobile' | 'server';

  /** Whether the action succeeded or failed. */
  result: AuditResult;

  /** Reason / error code for failure or status. */
  reason?: string;

  /** Optional correlation ID for tracing across services. */
  correlationId?: string;

  /** Arbitrary metadata (non-sensitive). */
  meta?: Record<string, unknown>;
}


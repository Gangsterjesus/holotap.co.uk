/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: actorPipeline.ts
 * Flow: 11 — Unified Actor Pipeline
 * Subsystem: Identity Resolution Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 Aug 2026
 * 
 * SECTION: Overview
 *   This file implements the Unified Actor Pipeline, responsible for merging all
 *   identity sources (Founder Override, Session Identity, QR Identity, Anonymous
 *   Fallback) into a single deterministic UnifiedActor object. This object is
 *   consumed by all backend routes and middleware.
 * 
 * SECTION: Purpose
 *   • Provide a single authoritative identity envelope for the entire backend.
 *   • Enforce deterministic precedence: founder → session → qr → anonymous.
 *   • Ensure identity metadata is merged consistently across all flows.
 *   • Prevent routing drift by guaranteeing a valid fallback actor.
 * 
 * SECTION: Scope
 *   • Identity precedence resolution.
 *   • Role propagation (superuser, merchant, consumer, anonymous).
 *   • Metadata merging (session_id, device, qr_token_id, ip, user_agent).
 *   • Compatibility with Flow 7 (Status) and Flow 8 (Payment Lifecycle).
 *   • Backend hardening alignment (severity matrix + disclosure policy).
 * 
 * SECTION: Stability Notes
 *   This pipeline must never throw. Identity resolution must remain deterministic
 *   under all routing conditions, including:
 *     – malformed QR envelopes
 *     – expired or missing sessions
 *     – missing metadata
 *     – anonymous access paths
 *   Anonymous fallback must always produce a valid UnifiedActor object.
 * 
 * SECTION: Routing Semantics
 *   All routes consume req.actor, populated by this pipeline. Downstream flows
 *   must treat UnifiedActor as authoritative for:
 *     – identity type
 *     – role
 *     – metadata
 *     – issuedAt timestamp
 *   No route may bypass this pipeline or construct identity manually.
 * 
 * SECTION: Engineering Notes
 *   • This file is part of the identity subsystem and must remain isolated from
 *     routing logic.
 *   • All identity sources must be validated before merging.
 *   • Future flows (Flow 13+) will extend metadata but must not alter precedence.
 * ────────────────────────────────────────────────────────────────────────────────
 */

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Types + Interfaces
// Description:
//   Defines the ActorType union and UnifiedActor interface used throughout the
//   identity subsystem. These types ensure deterministic identity envelopes for
//   all backend routes and middleware.
// ────────────────────────────────────────────────────────────────────────────────

export type ActorType = 'founder' | 'session' | 'qr' | 'anonymous'

export interface UnifiedActor {
  type: ActorType
  role: string | null
  issuedAt: number
  metadata: Record<string, unknown>
}

// These shapes should align with your existing identity sources.
// Adjust fields to match your actual implementations.

export interface FounderIdentity {
  id: string
  name: string
  metadata?: Record<string, unknown>
}

export interface SessionIdentity {
  id: string
  role?: string
  issuedAt: number
  sessionId: string
  metadata?: Record<string, unknown>
}

export interface QrIdentity {
  id: string
  role?: string
  issuedAt: number
  qrTokenId: string
  device?: string
  metadata?: Record<string, unknown>
}

export interface ActorPipelineContext {
  founder?: FounderIdentity | null
  session?: SessionIdentity | null
  qr?: QrIdentity | null
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Identity Precedence Order
// Description:
//   Identity resolution follows strict precedence:
//     1. Founder Override (superuser)
//     2. Session Identity (authenticated user)
//     3. QR Identity (scanned envelope)
//     4. Anonymous Fallback (no identity)
//   This ordering must never change, as downstream flows depend on it.
// ────────────────────────────────────────────────────────────────────────────────

const ACTOR_PRECEDENCE: ActorType[] = ['founder', 'session', 'qr', 'anonymous']

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Founder Identity Merge
// Description:
//   Highest‑priority identity source. Founder override produces a superuser actor
//   with full routing privileges. Metadata is passed through without modification.
// ────────────────────────────────────────────────────────────────────────────────

function resolveFounderActor(founder: FounderIdentity): UnifiedActor {
  return {
    type: 'founder',
    role: 'superuser',
    issuedAt: Date.now(),
    metadata: {
      founderId: founder.id,
      founderName: founder.name,
      ...(founder.metadata ?? {})
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Session Identity Merge
// Description:
//   Resolves identity from active session tokens. Session identity includes role,
//   issuedAt timestamp, and session metadata. This is the primary identity path
//   for authenticated users.
// ────────────────────────────────────────────────────────────────────────────────

function resolveSessionActor(session: SessionIdentity): UnifiedActor {
  return {
    type: 'session',
    role: session.role ?? null,
    issuedAt: session.issuedAt,
    metadata: {
      sessionId: session.sessionId,
      ...(session.metadata ?? {})
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: QR Identity Merge
// Description:
//   Identity derived from QR envelopes. QR identity is used for merchant/consumer
//   flows and must be validated before merging. Metadata includes qr_token_id,
//   device origin, and issuance timestamp.
// ────────────────────────────────────────────────────────────────────────────────

function resolveQrActor(qr: QrIdentity): UnifiedActor {
  return {
    type: 'qr',
    role: qr.role ?? null,
    issuedAt: qr.issuedAt,
    metadata: {
      qrTokenId: qr.qrTokenId,
      device: qr.device ?? null,
      ...(qr.metadata ?? {})
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Anonymous Fallback
// Description:
//   Deterministic fallback identity. This path must never throw and must always
//   produce a valid UnifiedActor object. Used for unauthenticated routes or when
//   identity sources are missing or invalid.
// ────────────────────────────────────────────────────────────────────────────────

function resolveAnonymousActor(): UnifiedActor {
  return {
    type: 'anonymous',
    role: null,
    issuedAt: Date.now(),
    metadata: {}
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: UnifiedActor Construction
// Description:
//   Constructs the final UnifiedActor object after precedence resolution. This
//   object is authoritative for all downstream flows (Flow 7 Status, Flow 8
//   Payment Lifecycle, middleware, logging, and routing).
// ────────────────────────────────────────────────────────────────────────────────

export function actorPipeline(ctx: ActorPipelineContext): UnifiedActor {
  // Founder override takes absolute precedence.
  if (ctx.founder) {
    return resolveFounderActor(ctx.founder)
  }

  // Session identity is the primary authenticated path.
  if (ctx.session) {
    return resolveSessionActor(ctx.session)
  }

  // QR identity is used for merchant/consumer flows.
  if (ctx.qr) {
    return resolveQrActor(ctx.qr)
  }

  // Deterministic anonymous fallback.
  return resolveAnonymousActor()
}

// ────────────────────────────────────────────────────────────────────────────────
// SECTION: Pipeline Export
// Description:
//   Exports the actorPipeline function for consumption by Express middleware,
//   Caddy routing, and all backend routes. No route may bypass this pipeline.
// ────────────────────────────────────────────────────────────────────────────────

// Example Express wiring (for reference only; keep actual wiring in middleware):
// 
// app.use((req, _res, next) => {
//   req.actor = actorPipeline({
//     founder: req.founderOverride,
//     session: req.sessionIdentity,
//     qr: req.qrIdentity
//   })
//   next()
// })

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * HoloTap Engineering Header
 * File: identityLogger.middleware.ts
 * Flow: 12 — Identity Logger + Middleware
 * Subsystem: Identity Resolution + Observability Layer
 * Engineer: Raymond Newton (E5357171)
 * Date: 22 August 2026
 * ────────────────────────────────────────────────────────────────────────────────
 */

import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";
import type { UnifiedActor } from "../types/UnifiedActor";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Correlation ID Generator
 * ────────────────────────────────────────────────────────────────────────────────
 */

function generateCorrelationId(): string {
  return `holotap-${Date.now()}-${randomUUID()}`;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Metadata Redaction Rules
 * ────────────────────────────────────────────────────────────────────────────────
 */

const REDACT_FIELDS = new Set([
  "sessionToken",
  "qrSignature",
  "privateKey",
  "founderSecret",
  "authToken"
]);

function redactMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (!REDACT_FIELDS.has(key)) safe[key] = value;
  }

  return safe;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Identity Logging Payload Builder
 * ────────────────────────────────────────────────────────────────────────────────
 */

function buildIdentityLog(actor: UnifiedActor, correlationId: string) {
  return {
    correlationId,
    actorType: actor.type,
    role: actor.role,
    issuedAt: actor.issuedAt ?? Date.now(),
    metadata: redactMetadata(actor.metadata ?? {})
  };
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * Identity Logger Middleware
 * ────────────────────────────────────────────────────────────────────────────────
 */

export default function identityLoggerMiddleware(
  req: Request & { actor?: UnifiedActor; correlationId?: string },
  _res: Response,
  next: NextFunction
) {
  try {
    const correlationId = generateCorrelationId();
    req.correlationId = correlationId;

    const actor: UnifiedActor = req.actor ?? {
      id: null,
      identityId: null,
      type: "anonymous",
      merchantId: null,
      role: null,
      metadata: {},
      session: null,
      orgUser: null,
      tenant: null,
      permissions: [],
      isFounder: false,
      issuedAt: Date.now()
    };

    const payload = buildIdentityLog(actor, correlationId);

    console.log("[IdentityLogger]", JSON.stringify(payload));

    next();
  } catch (err) {
    console.error("[IdentityLoggerError]", err);
    next();
  }
}

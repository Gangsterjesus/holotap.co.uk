/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY BINDER (Flow‑10 / Flow‑11 / Flow‑12)
 *  File: server/utils/registryBinder.ts
 *  Date: 06/09/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑10 Identity Session Binding
 *    Flow‑11 Actor Propagation
 *    Flow‑12 Correlation Logging
 *
 *  Overview:
 *    Modern deterministic binder for identity‑linked registry operations. Validates payloads,
 *    constructs typed binding envelopes, persists them via the ledger store, and returns a fully
 *    deterministic result surface.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import crypto from "crypto";
import { log } from "./logger";
import { saveBinding } from "./registryStore";

export interface RegistryBindingRecord {
  envelopeId: string;
  sessionId: string;
  badgeId: string;
  device: string;
  merchant: string;
  actorId?: string;
  correlationId?: string;
  status: "bound";
  timestamp: string;
}


/**
 * -----------------------------------------------------------------------------------------------
 *  Types
 * -----------------------------------------------------------------------------------------------
 */

export interface RegistryBindingPayload {
  sessionId: string;
  badgeId: string;
  device: string;
  merchant: string;
  actorId?: string;
  correlationId?: string;
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Utility: generateEnvelopeId
 * -----------------------------------------------------------------------------------------------
 */
function generateEnvelopeId(): string {
  return crypto.randomBytes(12).toString("base64url").substring(0, 12);
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Step 1 — Validate incoming payload
 * -----------------------------------------------------------------------------------------------
 */
function validatePayload(payload: RegistryBindingPayload): void {
  const required = ["sessionId", "badgeId", "device", "merchant"] as const;

  for (const field of required) {
    if (!payload[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Step 2 — Construct deterministic binding envelope
 * -----------------------------------------------------------------------------------------------
 */
function createBindingRecord(payload: RegistryBindingPayload): RegistryBindingRecord {
  return {
    envelopeId: generateEnvelopeId(),
    sessionId: payload.sessionId,
    badgeId: payload.badgeId,
    device: payload.device,
    merchant: payload.merchant,
    actorId: payload.actorId,
    correlationId: payload.correlationId,
    status: "bound",
    timestamp: new Date().toISOString()
  };
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Step 3 — Main binding engine (Flow‑10 / Flow‑11 / Flow‑12)
 * -----------------------------------------------------------------------------------------------
 */
export function bindRegistry(payload: RegistryBindingPayload): RegistryBindingRecord {
  // Validate
  validatePayload(payload);

  // Construct deterministic envelope
  const record = createBindingRecord(payload);

  // Persist
  saveBinding(record);

  // Log (Flow‑12)
  log("Registry binding completed", {
    correlationId: record.correlationId,
    actorId: record.actorId,
    sessionId: record.sessionId,
    envelopeId: record.envelopeId
  });

  return record;
}

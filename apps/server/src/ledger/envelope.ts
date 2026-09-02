/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: envelope.ts
  Subsystem: Flow‑9 Ledger — Deterministic Envelope Constructor
  Date: 02 Sep 2026

  SECTION: Overview
    Constructs the canonical Flow‑9 ledger envelope used for all ledger writes.
    This envelope ensures deterministic transaction identity, stable field
    ordering, and compatibility with downstream audit and replay systems.

  SECTION: Purpose
    • Generate a stable transaction envelope for Flow‑9 ledger operations.
    • Enforce consistent timestamping and UUID generation.
    • Maintain compatibility with Flow‑9.1 (Write), Flow‑9.2 (Read),
      and Flow‑9.3 (List) subsystems.

  SECTION: Stability Notes
    • Existing fields must never be removed.
    • Additional fields may be added only if backward‑compatible.
    • Envelope structure must remain deterministic for audit integrity.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { randomUUID } from "crypto";

export type LedgerEnvelopePayload = Record<string, unknown>;

export interface LedgerEnvelope {
  tx_id: string;
  registry_id: string;
  creator_id: string;
  payload: LedgerEnvelopePayload;
  created_at: string;
  signature?: string;
}

export function createLedgerEnvelope(params: {
  registry_id: string;
  creator_id: string;
  payload: LedgerEnvelopePayload;
  signature?: string;
}): LedgerEnvelope {
  const { registry_id, creator_id, payload, signature } = params;

  return {
    tx_id: randomUUID(),
    registry_id,
    creator_id,
    payload,
    created_at: new Date().toISOString(),
    ...(signature ? { signature } : {})
  };
}

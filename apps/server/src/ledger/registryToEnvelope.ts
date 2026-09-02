/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: registryToEnvelope.ts
  Subsystem: Flow‑9 Ledger — Registry → Envelope Binding
  Date: 02 Sep 2026

  SECTION: Overview
    Performs deterministic binding from a registry record into a canonical
    Flow‑9 ledger envelope. This function acts as the bridge between registry
    persistence and the ledger subsystem, ensuring structural integrity and
    stable field propagation.

  SECTION: Purpose
    • Convert registry records into valid Flow‑9 ledger envelopes.
    • Enforce strict schema validation using LedgerEnvelopeSchema.
    • Maintain compatibility with Flow‑9.1 (Write) and Flow‑9.2 (Read).

  SECTION: Stability Notes
    • Registry → envelope mapping must remain deterministic.
    • Envelope validation must remain strict and backward‑compatible.
    • Additional fields may be added only if they preserve envelope stability.
  ────────────────────────────────────────────────────────────────────────────────
*/


import { createLedgerEnvelope } from "./envelope";
import { LedgerEnvelope } from "./envelope";
import { LedgerEnvelopeSchema } from "./envelope.schema";

export interface RegistryRecord {
  id: string;
  creator_id: string;
  payload: Record<string, unknown>;
}

export function registryToEnvelope(record: RegistryRecord): LedgerEnvelope {
  const envelope = createLedgerEnvelope({
    registry_id: record.id,
    creator_id: record.creator_id,
    payload: record.payload
  });

  const parsed = LedgerEnvelopeSchema.safeParse(envelope);
  if (!parsed.success) {
    throw new Error("Invalid envelope generated from registry record");
  }

  return envelope;
}

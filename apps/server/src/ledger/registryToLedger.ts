
/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: registryToLedger.ts
  Subsystem: Flow‑9 Ledger — Registry → Envelope → Ledger Binding
  Date: 02 Sep 2026

  SECTION: Overview
    Provides the deterministic pipeline from a registry record into a fully
    persisted Flow‑9 ledger entry. This module binds the registry subsystem to
    the ledger subsystem, ensuring stable envelope construction and strict
    schema validation.

  SECTION: Purpose
    • Convert registry records into canonical Flow‑9 envelopes.
    • Persist envelopes using the deterministic ledger write surface.
    • Maintain compatibility with Flow‑9.1 (Write) and Flow‑9.3 (List).

  SECTION: Stability Notes
    • Pipeline semantics must remain deterministic for audit integrity.
    • Envelope validation must remain strict and backward‑compatible.
    • Additional fields may be added only if they preserve envelope stability.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { RegistryRecord } from "./registryToEnvelope";
import { registryToEnvelope } from "./registryToEnvelope";
import { writeLedgerEntry } from "./ledgerWrite";
import { LedgerEnvelope } from "./envelope";

export async function registryToLedger(record: RegistryRecord): Promise<LedgerEnvelope> {
  // Step 1: registry → envelope
  const envelope = registryToEnvelope(record);

  // Step 2: envelope → ledger write
  const written = await writeLedgerEntry(envelope);

  // Prisma returns DB shape; envelope is canonical shape
  return {
    tx_id: written.tx_id,
    registry_id: written.registry_id,
    creator_id: written.creator_id,
    payload: written.payload,
    created_at: written.created_at,
    signature: written.signature ?? undefined
  };
}



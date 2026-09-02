/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerWrite.ts
  Subsystem: Flow‑9 Ledger — Deterministic Write Surface
  Date: 02 Sep 2026

  SECTION: Overview
    Implements the deterministic write surface for Flow‑9 ledger envelopes.
    Validates incoming envelopes against the canonical Zod schema before
    committing them to persistent storage via Prisma.

  SECTION: Purpose
    • Perform strict schema validation using LedgerEnvelopeSchema.
    • Persist Flow‑9 envelopes with deterministic field ordering.
    • Maintain compatibility with Flow‑9.1 (Write) and downstream audit systems.

  SECTION: Stability Notes
    • Envelope validation must remain strict and backward‑compatible.
    • Database write semantics must remain deterministic for replay integrity.
    • Additional fields may be added only if they preserve envelope stability.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { PrismaClient } from "@prisma/client";
import { LedgerEnvelope } from "./envelope";
import { LedgerEnvelopeSchema } from "./envelope.schema";

const prisma = new PrismaClient();

export async function writeLedgerEntry(envelope: LedgerEnvelope) {
  const parsed = LedgerEnvelopeSchema.safeParse(envelope);
  if (!parsed.success) {
    throw new Error("Invalid ledger envelope");
  }

  return prisma.ledger.create({
    data: {
      tx_id: envelope.tx_id,
      registry_id: envelope.registry_id,
      creator_id: envelope.creator_id,
      payload: envelope.payload,
      created_at: envelope.created_at,
      signature: envelope.signature ?? null
    }
  });
}

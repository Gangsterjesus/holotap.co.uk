/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerRead.ts
  Subsystem: Flow‑9 Ledger — Deterministic Read Surface
  Date: 02 Sep 2026

  SECTION: Overview
    Provides the deterministic read surface for Flow‑9 ledger envelopes. This
    function retrieves a single ledger entry by tx_id and validates it against
    the canonical Zod schema to ensure structural integrity and replay safety.

  SECTION: Purpose
    • Retrieve a single ledger envelope by transaction ID.
    • Enforce strict schema validation using LedgerEnvelopeSchema.
    • Maintain compatibility with Flow‑9.2 (Read) and upstream Web‑UI consumers.

  SECTION: Stability Notes
    • Read semantics must remain deterministic for audit and replay integrity.
    • Envelope validation must remain strict and backward‑compatible.
    • Additional fields may be added only if they preserve envelope stability.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { PrismaClient } from "@prisma/client";
import { LedgerEnvelope } from "./envelope";
import { LedgerEnvelopeSchema } from "./envelope.schema";

const prisma = new PrismaClient();

export async function readLedgerEntry(tx_id: string): Promise<LedgerEnvelope | null> {
  const entry = await prisma.ledger.findUnique({
    where: { tx_id }
  });

  if (!entry) {
    return null;
  }

  const parsed = LedgerEnvelopeSchema.safeParse({
    tx_id: entry.tx_id,
    registry_id: entry.registry_id,
    creator_id: entry.creator_id,
    payload: entry.payload,
    created_at: entry.created_at.toISOString(),
    signature: entry.signature ?? undefined
  });

  if (!parsed.success) {
    throw new Error("Invalid ledger entry retrieved from database");
  }

  return parsed.data;
}

/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: envelope.schema.ts
  Subsystem: Flow‑9 Ledger — Deterministic Envelope Validation
  Date: 02 Sep 2026

  SECTION: Overview
    Zod schema defining the canonical Flow‑9 ledger envelope. This schema ensures
    deterministic validation of all ledger writes, reads, and list operations.

  SECTION: Purpose
    • Enforce strict structural integrity of ledger envelopes.
    • Guarantee stable field ordering and type safety across all flows.
    • Provide a single authoritative schema for Flow‑9.1, Flow‑9.2, and Flow‑9.3.

  SECTION: Stability Notes
    • Fields must never be removed once introduced.
    • Additional fields may be added only if backward‑compatible.
    • Schema must remain deterministic for replay protection and audit trails.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { z } from "zod";

export const LedgerEnvelopeSchema = z.object({
  tx_id: z.string(),
  registry_id: z.string(),
  creator_id: z.string(),
  payload: z.record(z.string(), z.unknown()),
  created_at: z.string(),
  signature: z.string().optional()
});

export type LedgerEnvelopeType = z.infer<typeof LedgerEnvelopeSchema>;


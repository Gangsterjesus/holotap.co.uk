/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerList.ts
  Subsystem: Flow‑9 Ledger — Paginated Listing Surface
  Date: 02 Sep 2026

  SECTION: Overview
    Implements deterministic paginated listing for Flow‑9 ledger entries.
    Provides optional filtering by creator_id and registry_id while ensuring
    strict envelope validation through the canonical Zod schema.

  SECTION: Purpose
    • Retrieve ledger entries in a deterministic, audit‑safe order.
    • Enforce Flow‑9 envelope integrity using LedgerEnvelopeSchema.
    • Maintain compatibility with Flow‑9.3 (List) and upstream Web‑UI consumers.

  SECTION: Stability Notes
    • Pagination defaults must remain stable for API compatibility.
    • Envelope validation must remain deterministic for replay protection.
    • Additional filters may be added only if backward‑compatible.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { PrismaClient } from "@prisma/client";
import { LedgerEnvelope } from "./envelope";
import { LedgerEnvelopeSchema } from "./envelope.schema";

const prisma = new PrismaClient();

export interface LedgerListParams {
  page?: number;
  pageSize?: number;
  creator_id?: string;
  registry_id?: string;
}

export async function listLedgerEntries(params: LedgerListParams): Promise<LedgerEnvelope[]> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  const where: Record<string, unknown> = {};

  if (params.creator_id) {
    where.creator_id = params.creator_id;
  }

  if (params.registry_id) {
    where.registry_id = params.registry_id;
  }

  const entries = await prisma.ledger.findMany({
    where,
    orderBy: { created_at: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return entries.map((entry: (typeof entries)[number]) => {
    const parsed = LedgerEnvelopeSchema.safeParse({
      tx_id: entry.tx_id,
      registry_id: entry.registry_id,
      creator_id: entry.creator_id,
      payload: entry.payload,
      created_at: entry.created_at.toISOString(),
      signature: entry.signature ?? undefined
    });

    if (!parsed.success) {
      throw new Error("Invalid ledger entry retrieved during listing");
    }

    return parsed.data;
  });
}

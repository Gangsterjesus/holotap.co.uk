/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerHandlers.ts
  Subsystem: Flow‑9 Ledger — Handler Layer
  Date: 02 Sep 2026

  SECTION: Overview
    Defines the deterministic handler layer for Flow‑9 ledger operations. These
    handlers form the execution surface for write, read, and list operations,
    bridging the API contract with the underlying ledger subsystem.

  SECTION: Purpose
    • Provide a stable handler interface for all ledger operations.
    • Ensure deterministic envelope propagation through the server runtime.
    • Maintain compatibility with Flow‑9.1 (Write), Flow‑9.2 (Read),
      and Flow‑9.3 (List) subsystems.

  SECTION: Stability Notes
    • Handler signatures must remain stable across all flows.
    • Response envelopes must remain deterministic for audit integrity.
    • Additional fields may be added only if backward‑compatible.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { Request, Response } from "../http";

import { writeLedgerEntry } from "./ledgerWrite";
import { readLedgerEntry } from "./ledgerRead";
import { listLedgerEntries } from "./ledgerList";
import {
  LedgerWriteRequest,
  LedgerReadRequest,
  LedgerListRequest
} from "./ledgerContract";

export async function ledgerWriteHandler(req: Request, res: Response) {
  const body = req.body as LedgerWriteRequest;

  try {
    const entry = await writeLedgerEntry({
      tx_id: "",
      created_at: new Date().toISOString(),
      registry_id: body.registry_id,
      creator_id: body.creator_id,
      payload: body.payload,
      signature: body.signature
    });

    return res.status(200).send({
      success: true,
      tx_id: entry.tx_id
    });
  } catch {
    return res.status(400).send({ success: false });
  }
}

export async function ledgerReadHandler(req: Request, res: Response) {
  const body = req.body as LedgerReadRequest;

  try {
    const entry = await readLedgerEntry(body.tx_id);

    return res.status(200).send({
      success: true,
      entry
    });
  } catch {
    return res.status(400).send({
      success: false,
      entry: null
    });
  }
}

export async function ledgerListHandler(req: Request, res: Response) {
  const body = req.body as LedgerListRequest;

  try {
    const entries = await listLedgerEntries({
      page: body.page,
      pageSize: body.pageSize,
      creator_id: body.creator_id,
      registry_id: body.registry_id
    });

    return res.status(200).send({
      success: true,
      entries
    });
  } catch {
    return res.status(400).send({
      success: false,
      entries: []
    });
  }
}

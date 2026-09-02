/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerRoutes.ts
  Subsystem: Flow‑9 Ledger — Route Surface (Express Adapter)
  Date: 02 Sep 2026

  SECTION: Overview
    Provides the Express‑based routing surface for Flow‑9 ledger operations.
    This adapter layer bridges external HTTP requests into the deterministic
    handler and envelope logic defined within the ledger subsystem.

  SECTION: Purpose
    • Expose Flow‑9 write, read, and list operations over HTTP.
    • Translate incoming request bodies into validated ledger contracts.
    • Maintain compatibility with upstream Web‑UI and mobile clients.

  SECTION: Stability Notes
    • Route signatures must remain stable for API compatibility.
    • Response envelopes must remain deterministic for audit integrity.
    • Express adapter may be replaced by the custom HoloTap runtime, but
      contract semantics must remain backward‑compatible.
  ────────────────────────────────────────────────────────────────────────────────
*/


import { Router } from "express";
import { writeLedgerEntry } from "./ledgerWrite";
import { readLedgerEntry } from "./ledgerRead";
import { listLedgerEntries } from "./ledgerList";
import {
  LedgerWriteRequest,
  LedgerReadRequest,
  LedgerListRequest
} from "./ledgerContract";

const router = Router();

router.post("/ledger/write", async (req, res) => {
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


    res.json({
      success: true,
      tx_id: entry.tx_id
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.post("/ledger/read", async (req, res) => {
  const body = req.body as LedgerReadRequest;

  try {
    const entry = await readLedgerEntry(body.tx_id);

    res.json({
      success: true,
      entry
    });
  } catch {
    res.status(400).json({ success: false, entry: null });
  }
});

router.post("/ledger/list", async (req, res) => {
  const body = req.body as LedgerListRequest;

  try {
    const entries = await listLedgerEntries({
      page: body.page,
      pageSize: body.pageSize,
      creator_id: body.creator_id,
      registry_id: body.registry_id
    });

    res.json({
      success: true,
      entries
    });
  } catch {
    res.status(400).json({ success: false, entries: [] });
  }
});

export default router;

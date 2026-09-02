/* 
  ────────────────────────────────────────────────────────────────────────────────
  HoloTap Engineering — Ledger Module
  Engineer: R. Newton (E5357171)
  File: ledgerContract.ts
  Subsystem: Flow‑9 Ledger — API Contract Surface
  Date: 02 Sep 2026

  SECTION: Overview
    Defines the deterministic API contract for all Flow‑9 ledger operations.
    These request/response interfaces form the stable boundary between the
    backend ledger subsystem and any upstream caller, including Web‑UI, mobile,
    and internal service layers.

  SECTION: Purpose
    • Provide a canonical contract for ledger write, read, and list operations.
    • Ensure strict type safety and deterministic envelope propagation.
    • Maintain compatibility with Flow‑9.1 (Write), Flow‑9.2 (Read),
      and Flow‑9.3 (List) subsystems.

  SECTION: Stability Notes
    • Existing fields must never be removed.
    • Additional fields may be added only if backward‑compatible.
    • Contract must remain stable for long‑term audit and replay integrity.
  ────────────────────────────────────────────────────────────────────────────────
*/

import { LedgerEnvelope } from "./envelope";

export interface LedgerWriteRequest {
  registry_id: string;
  creator_id: string;
  payload: Record<string, unknown>;
  signature?: string;
}

export interface LedgerWriteResponse {
  success: boolean;
  tx_id: string;
}

export interface LedgerReadRequest {
  tx_id: string;
}

export interface LedgerReadResponse {
  success: boolean;
  entry: LedgerEnvelope | null;
}

export interface LedgerListRequest {
  page?: number;
  pageSize?: number;
  creator_id?: string;
  registry_id?: string;
}

export interface LedgerListResponse {
  success: boolean;
  entries: LedgerEnvelope[];
}

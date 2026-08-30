/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY LEDGER MODULE (Flow‑9.6)
 *  File: apps/server/src/registryLedger.js
 *  Date: 30/08/2026 — version 2.6
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Ledger — Deterministic Multi‑Record Store
 *
 *  Revision:
 *    v2.6 — Deterministic Ledger Implementation (Flow‑9.6)
 *
 *  Overview:
 *    Provides deterministic multi‑record registry storage for Flow‑9.6. Supports record insertion,
 *    latest-record retrieval, full history retrieval, and session‑specific lookup. Prepares backend
 *    for Flow‑10 compliance surfaces and Flow‑14/15 heuristics.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

const ledger = [];

/**
 * Add a deterministic registry record
 */
export function addRecord(record) {
  ledger.push(record);
}

/**
 * Get latest registry record
 */
export function getLatest() {
  return ledger.length > 0 ? ledger[ledger.length - 1] : null;
}

/**
 * Get full ledger history
 */
export function getAll() {
  return ledger;
}

/**
 * Get records by sessionId
 */
export function getBySessionId(sessionId) {
  return ledger.filter(r => r.sessionId === sessionId);
}

export default {
  addRecord,
  getLatest,
  getAll,
  getBySessionId
};

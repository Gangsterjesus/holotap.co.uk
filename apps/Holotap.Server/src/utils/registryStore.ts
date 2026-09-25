/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY STORE (Flow‑9.6)
 *  File: server/utils/registryStore.ts
 *  Date: 06/09/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9.6 Ledger Store — Deterministic Multi‑Record Support
 *
 *  Overview:
 *    Typed in‑memory registry ledger. Supports deterministic binding writes, status reads, and
 *    lookup operations. This is the modern replacement for the Flow‑9 JS store.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

export interface RegistryBindingRecord {
  envelopeId: string;
  sessionId: string;
  badgeId: string;
  device: string;
  merchant: string;
  actorId?: string;
  correlationId?: string;
  status: "bound";
  timestamp: string;
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Internal Ledger Store (Flow‑9.6)
 *  Multi‑record support, deterministic ordering (latest = last element)
 * -----------------------------------------------------------------------------------------------
 */
const registryLedger: RegistryBindingRecord[] = [];

/**
 * -----------------------------------------------------------------------------------------------
 *  saveBinding — Persist deterministic binding envelope
 * -----------------------------------------------------------------------------------------------
 */
export function saveBinding(binding: RegistryBindingRecord): void {
  registryLedger.push(binding);
}

/**
 * -----------------------------------------------------------------------------------------------
 *  getBinding — Lookup by badgeId (latest match)
 * -----------------------------------------------------------------------------------------------
 */
export function getBinding(badgeId: string): RegistryBindingRecord | null {
  const matches = registryLedger.filter(r => r.badgeId === badgeId);
  return matches.length > 0 ? matches[matches.length - 1] : null;
}

/**
 * -----------------------------------------------------------------------------------------------
 *  getStatus — High‑level registry status surface
 * -----------------------------------------------------------------------------------------------
 */
export function getStatus() {
  const latest = registryLedger.length > 0
    ? registryLedger[registryLedger.length - 1]
    : null;

  return {
    registry: latest ? "active" : "idle",
    totalBindings: registryLedger.length,
    lastUpdated: latest ? latest.timestamp : null
  };
}

/**
 * -----------------------------------------------------------------------------------------------
 *  getHistory — Full ledger history (Flow‑9.6)
 * -----------------------------------------------------------------------------------------------
 */
export function getHistory(): RegistryBindingRecord[] {
  return [...registryLedger];
}

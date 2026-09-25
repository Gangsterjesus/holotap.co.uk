/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY STATUS ENGINE (Flow‑9.6 / Flow‑10 / Flow‑11 / Flow‑12)
 *  File: server/utils/registryStatus.ts
 *  Date: 06/09/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering (E5357171)
 *    • Copilot — Engineering Assistant
 *
 *  Overview:
 *    Typed deterministic registry status engine. Integrates with the Flow‑9.6 ledger store and
 *    provides high‑level operational state for identity‑linked registry surfaces.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import {
  getBinding,
  getStatus as getStoreStatus,
  RegistryBindingRecord
} from "./registryStore";

/**
 * -----------------------------------------------------------------------------------------------
 *  getRegistryStatus — Global registry status surface
 * -----------------------------------------------------------------------------------------------
 */
export function getRegistryStatus() {
  return getStoreStatus();
}

/**
 * -----------------------------------------------------------------------------------------------
 *  getRegistryRecord — Lookup binding record by badgeId
 * -----------------------------------------------------------------------------------------------
 */
export function getRegistryRecord(badgeId: string): RegistryBindingRecord | null {
  return getBinding(badgeId);
}

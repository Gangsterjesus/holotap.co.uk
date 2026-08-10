/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY STATUS ENGINE (UTILITY MODULE)
 *  File: server/utils/registryStatus.js
 *  Date: 11/08/2026
 *
 *  Engineering:
 *    • Raymond Newton — Lead Engineer, HoloTap Engineering
 *    • Copilot — Engineering Assistant
 *
 *  Module:
 *    Flow‑9 Registry Binding — Deterministic Status Engine
 *
 *  Revision:
 *    v1.0 — Initial status logic for Flow‑9 registry operations
 *
 *  Flows:
 *    • Flow‑6 — Identity Surfaces
 *    • Flow‑8 — Payment Lifecycle
 *    • Flow‑9 — Registry Binding
 *
 *  Overview:
 *    Provides deterministic registry status responses for Flow‑9.3. This module queries the
 *    registry store and returns high‑level operational state, including total bindings and
 *    last‑updated timestamps. In production, this will integrate with persistent ledger storage.
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

import { getBinding, getStatus as getStoreStatus } from "./registryStore.js";

/**
 * -----------------------------------------------------------------------------------------------
 *  Function: getRegistryStatus
 *  Description:
 *    Returns the global registry status object. This includes the number of bindings, registry
 *    activation state, and deterministic timestamps. Used by Flow‑9.3 to populate the registry
 *    result surface.
 * -----------------------------------------------------------------------------------------------
 */
export function getRegistryStatus() {
  return getStoreStatus();
}

/**
 * -----------------------------------------------------------------------------------------------
 *  Function: getRegistryRecord
 *  Description:
 *    Retrieves a specific registry binding record by badgeId. This powers the creator-facing
 *    registry result page (Flow‑9.3), allowing deterministic lookup of identity-linked registry
 *    bindings.
 *
 *  Parameters:
 *    - badgeId: String identifier for the creator badge
 * -----------------------------------------------------------------------------------------------
 */
export function getRegistryRecord(badgeId) {
  return getBinding(badgeId);
}

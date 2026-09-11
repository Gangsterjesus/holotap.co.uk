/**
 * =================================================================================================
 * HOLOTAP — REGISTRY SERVICE
 * File: apps/server/src/services/RegistryService.js
 *
 * Engineer:
 *   Raymond Newton (E5357171)
 *
 * Purpose:
 *   Flow-9 Registry business logic layer.
 *
 * Architecture:
 *
 *     Registry Routes
 *          ↓
 *     Registry Service
 *          ↓
 *     Registry Repository
 *          ↓
 *     Ledger / Database
 *
 * =================================================================================================
 */

import RegistryRepository from "../repositories/RegistryRepository.js";

/**
 * -------------------------------------------------------------------------------------------------
 * Generate Registry Identifier
 * -------------------------------------------------------------------------------------------------
 */
function createRegistryId() {
  return `REG-${Date.now()}`;
}

/**
 * -------------------------------------------------------------------------------------------------
 * Create Registry Binding
 * -------------------------------------------------------------------------------------------------
 */
function createBinding(payload) {
  const {
    sessionId,
    badgeId,
    device,
    merchant
  } = payload;

  const duplicate = RegistryRepository.findDuplicate(
    sessionId,
    badgeId
  );

  if (duplicate) {
    return {
      ok: false,
      code: "REGISTRY_BIND_DUPLICATE",
      message: "Registry binding already exists.",
      record: duplicate
    };
  }

  const record = {
    registryId: createRegistryId(),
    sessionId,
    badgeId,
    device,
    merchant,
    status: "BOUND",
    timestamp: new Date().toISOString()
  };

  RegistryRepository.create(record);

  return {
    ok: true,
    code: "REGISTRY_BIND_SUCCESS",
    record
  };
}

/**
 * -------------------------------------------------------------------------------------------------
 * Latest Registry Record
 * -------------------------------------------------------------------------------------------------
 */
function getLatestBinding() {
  return RegistryRepository.getLatest();
}

/**
 * -------------------------------------------------------------------------------------------------
 * Registry History
 * -------------------------------------------------------------------------------------------------
 */
function getHistory() {
  return RegistryRepository.getAll();
}

/**
 * -------------------------------------------------------------------------------------------------
 * Registry Status
 * -------------------------------------------------------------------------------------------------
 */
function getStatus() {
  const latest = RegistryRepository.getLatest();

  return {
    registry: latest ? "ACTIVE" : "IDLE",
    totalRecords: RegistryRepository.count(),
    lastBinding: latest,
    timestamp: new Date().toISOString()
  };
}

/**
 * -------------------------------------------------------------------------------------------------
 * Find By Registry ID
 * -------------------------------------------------------------------------------------------------
 */
function findByRegistryId(registryId) {
}
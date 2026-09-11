/**
 * =================================================================================================
 * HOLOTAP — REGISTRY REPOSITORY
 * File: apps/server/src/repositories/RegistryRepository.js
 *
 * Engineer:
 *   Raymond Newton (E5357171)
 *
 * Purpose:
 *   Flow-9 Registry Repository Layer
 *
 * Architecture:
 *
 *     Registry Routes
 *          ↓
 *     Registry Service
 *          ↓
 *     Registry Repository
 *          ↓
 *     In-Memory Ledger
 *          ↓
 *     Future PostgreSQL Ledger
 *
 * =================================================================================================
 */

const ledger = [];

/**
 * Create Registry Record
 */
function create(record) {
  ledger.push(record);
  return record;
}

/**
 * Get Latest Registry Record
 */
function getLatest() {
  if (ledger.length === 0) {
    return null;
  }

  return ledger[ledger.length - 1];
}

/**
 * Get Registry History
 */
function getAll() {
  return [...ledger].reverse();
}

/**
 * Count Registry Records
 */
function count() {
  return ledger.length;
}

/**
 * Find Record By Registry ID
 */
function findByRegistryId(registryId) {
  return (
    ledger.find(
      (record) => record.registryId === registryId
    ) || null
  );
}

/**
 * Find Records By Session ID
 */
function findBySessionId(sessionId) {
  return ledger.filter(
    (record) => record.sessionId === sessionId
  );
}

/**
 * Find Duplicate Binding
 */
function findDuplicate(sessionId, badgeId) {
  return (
    ledger.find(
      (record) =>
        record.sessionId === sessionId &&
        record.badgeId === badgeId
    ) || null
  );
}

/**
 * Clear Ledger
 * Testing Only
 */
function clear() {
  ledger.length = 0;
}

/**
 * Export Repository
 */
export default {
  create,
  getLatest,
  getAll,
  count,
  findByRegistryId,
  findBySessionId,
  findDuplicate,
  clear
};
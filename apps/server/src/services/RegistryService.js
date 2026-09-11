/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY REPOSITORY
 *  File: apps/server/src/repositories/RegistryRepository.js
 *
 *  Engineer:
 *    Raymond Newton (E5357171)
 *
 *  Purpose:
 *    Flow‑9 Registry Repository Layer
 *
 *  Overview:
 *    Provides deterministic repository operations for registry records.
 *    Abstracts storage implementation from route handlers.
 *
 *  Current Storage:
 *    In-memory ledger
 *
 *  Future Storage:
 *    PostgreSQL ledger
 *    registryLedger.pg.ts
 *
 *  Compliance:
 *    HoloTap Engineering Header Standard v1.0
 * =================================================================================================
 */

const ledger = [];

/**
 * ----*----------------------------------*----------------------------------*--------------------
 * Create Reg*stry Record
 * -------------------*----------------------------------*----------------------------------*-----
 */
function create(record) {
  ledger.push(record);

  return record;
}

/**
 * -----------------*----------------------------------*----------------------------------*-------
 * Get Latest Registry Rec*rd
 * ----------------------------*----------------------------------*-------------------------------
 */
function getLatest() {
  if (ledger.length === 0) {
    return null;
  }

  return ledger[ledger.length - 1];
}

/**
 * ------------------*----------------------------------*----------------------------------*------
 * Get All Registry Records* * -------------------------------*----------------------------------*----------------------------
 */
function getAll() {
  return [...ledger].reverse();
}

/**
 * ---------*----------------------------------*----------------------------------*---------------
 * Get Record Coun*
 * ------------------------------*----------------------------------*-----------------------------
 */
function count() {
  return ledger.length;
}

/**
 * -----------------*----------------------------------*----------------------------------*-------
 * Find By Registry Id
 * *----------------------------------*----------------------------------*------------------------
 */
function findByRegistryId(registryId) {
  return ledger.find(
    (record) => record.registryId === registryId
  );
}

/**
 * -------------------*----------------------------------*----------------------------------*-----
 * Find By Session Id
 * ---*----------------------------------*----------------------------------*---------------------
 */
function findBySessionId(sessionId) {
  return ledger.filter(
    (record) => record.sessionId === sessionId
  );
}

/**
 * ------------------------*----------------------------------*----------------------------------*
 * Check Duplicate Binding
 * ---*----------------------------------*----------------------------------*---------------------
 */
function findDuplicate(sessionId, badgeId) {
  return ledger.find(
    (record) =>
      record.sessionId === sessionId &&
      record.badgeId === badgeId
  );
}

/**
 * -----------------------------------------------------------------------------------------------
 * Clear Ledger (Testing Only)
 * -----------------------------------------------------------------------------------------------
 */
function clear() {
  ledger.length = 0;
}

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
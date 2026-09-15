/**
 * ============================================================
 * HoloTapServer — Registry Repository
 * Flow 9 — Registry Persistence Layer
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 15 September 2026
 * ============================================================
 */

export interface RegistryRecord {
  registryId: string;
  sessionId: string;
  badgeId: string;
  device?: string;
  merchant?: string;
  status: string;
  timestamp: string;
}

const ledger: RegistryRecord[] = [];

/**
 * Create Registry Record
 */
function create(record: RegistryRecord): RegistryRecord {
  ledger.push(record);
  return record;
}

/**
 * Get Latest Registry Record
 */
function getLatest(): RegistryRecord | null {
  if (ledger.length === 0) {
    return null;
  }

  return ledger[ledger.length - 1];
}

/**
 * Get Registry History
 */
function getAll(): RegistryRecord[] {
  return [...ledger].reverse();
}

/**
 * Count Registry Records
 */
function count(): number {
  return ledger.length;
}

/**
 * Find Record By Registry ID
 */
function findByRegistryId(
  registryId: string
): RegistryRecord | null {
  return (
    ledger.find(
      (record) => record.registryId === registryId
    ) ?? null
  );
}

/**
 * Find Records By Session ID
 */
function findBySessionId(
  sessionId: string
): RegistryRecord[] {
  return ledger.filter(
    (record) => record.sessionId === sessionId
  );
}

/**
 * Find Duplicate Binding
 */
function findDuplicate(
  sessionId: string,
  badgeId: string
): RegistryRecord | null {
  return (
    ledger.find(
      (record) =>
        record.sessionId === sessionId &&
        record.badgeId === badgeId
    ) ?? null
  );
}

/**
 * Clear Ledger
 * Testing Only
 */
function clear(): void {
  ledger.length = 0;
}

/**
 * Repository Export
 */
const RegistryRepository = {
  create,
  getLatest,
  getAll,
  count,
  findByRegistryId,
  findBySessionId,
  findDuplicate,
  clear,
};

export default RegistryRepository;
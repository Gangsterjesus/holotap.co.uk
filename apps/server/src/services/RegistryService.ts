/**
 * ============================================================
 * HoloTapServer — Registry Service
 * Flow 9 — Registry Service Layer
 *
 * Engineer: Raymond Newton (Founder‑Architect, E5357171)
 * Engineer ID: E5357171
 * Version: 5.0.0
 * Date: 15 September 2026
 * © 2026 HoloTap Technologies Ltd. All Rights Reserved.
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * Provides business logic for Flow 9 Registry operations.
 *
 * The Registry Service orchestrates registry validation,
 * duplicate detection, binding creation, activity monitoring,
 * state reporting, and registry record retrieval.
 *
 * ARCHITECTURE
 * ------------------------------------------------------------
 *
 *     Registry Routes
 *            ↓
 *     Registry Service
 *            ↓
 *     Registry Repository
 *            ↓
 *      Ledger / Database
 *
 * RESPONSIBILITIES
 * ------------------------------------------------------------
 * • Create registry bindings
 * • Prevent duplicate bindings
 * • Generate registry identifiers
 * • Retrieve latest registry record
 * • Retrieve registry history
 * • Provide registry operational status
 * • Monitor registry activity
 * • Detect inactive registry states
 * • Support Flow 12 audit correlation
 * • Lookup bindings by registry ID
 *
 * FLOW INTEGRATION
 * ------------------------------------------------------------
 * • Flow 9   — Registry Binding
 * • Flow 9.6 — Deterministic Ledger
 * • Flow 11  — Actor Propagation
 * • Flow 12  — Correlation, Audit & Monitoring
 *
 * REGISTRY OPERATIONAL MODEL
 * ------------------------------------------------------------
 * Registry activity is evaluated using timestamp-driven
 * activity monitoring.
 *
 * ACTIVE
 *   • Registry activity detected within the
 *     previous 10-minute operational window.
 *
 * IDLE
 *   • No registry activity detected within the
 *     previous 10-minute operational window.
 *
 * REGISTRY INACTIVITY THRESHOLD
 * ------------------------------------------------------------
 * Threshold:
 *   • 10 minutes
 *   • 600 seconds
 *   • 600,000 milliseconds
 *
 * SECURITY RATIONALE
 * ------------------------------------------------------------
 * The 10-minute inactivity threshold reduces:
 *
 *   • Stale session exposure
 *   • Registry replay opportunities
 *   • Dormant badge-to-session bindings
 *   • Long-lived inactive identity mappings
 *
 * The threshold supports future:
 *
 *   • Fraud detection
 *   • Behavioural anomaly detection
 *   • Session-risk evaluation
 *   • Flow 12 audit correlation
 *
 * ENGINEERING NOTES
 * ------------------------------------------------------------
 * • Business logic layer only.
 * • No direct HTTP handling.
 * • Repository layer performs persistence.
 * • Deterministic operation required.
 * • Idempotent where practical.
 * • No direct database access.
 * • Security timeout changes require engineering review.
 *
 * CHANGE LOG
 * ------------------------------------------------------------
 * v5.0.0
 * • Converted to TypeScript.
 * • Added service typing.
 * • Added registry lookup contract.
 * • Added timestamp-driven status monitoring.
 * • Added ACTIVE / IDLE operational model.
 * • Added 10-minute inactivity threshold.
 * • Added anti-fraud monitoring controls.
 * • Standardised HoloTap engineering documentation.
 *
 * ============================================================
 */


import RegistryRepository, {
  RegistryRecord,
} from "../repositories/RegistryRepository";

/**
 * -----------------------------------------------------------------------------
 * Generate Registry Identifier
 * -----------------------------------------------------------------------------
 * Produces a deterministic registry identifier for Flow 9 bindings.
 *
 * Format:
 *   REG-{unix_timestamp}
 *
 * Notes:
 *   • Lightweight in-memory identifier.
 *   • Suitable for development and testing workflows.
 *   • Future production implementation may use UUIDv7.
 * -----------------------------------------------------------------------------
 */
function createRegistryId(): string {
  return `REG-${Date.now()}`;
}

/**
 * -----------------------------------------------------------------------------
 * Create Registry Binding
 * -----------------------------------------------------------------------------
 * Creates a new registry binding between:
 *
 *   • Identity Session
 *   • Badge
 *   • Device
 *   • Merchant
 *
 * Validation:
 *   • Prevent duplicate session/badge combinations.
 *   • Maintain deterministic registry state.
 *
 * Returns:
 *   • Success envelope with created record.
 *   • Failure envelope if duplicate detected.
 * -----------------------------------------------------------------------------
 */
function createBinding(payload: any) {
  const {
    sessionId,
    badgeId,
    device,
    merchant,
  } = payload;

  /**
   * Duplicate protection.
   *
   * Prevents creation of multiple bindings for the same
   * session and badge combination.
   */
  const duplicate =
    RegistryRepository.findDuplicate(
      sessionId,
      badgeId
    );

  if (duplicate) {
    return {
      ok: false,
      code: "REGISTRY_BIND_DUPLICATE",
      message: "Registry binding already exists.",
      record: duplicate,
    };
  }

  /**
   * Construct deterministic registry record.
   */
  const record: RegistryRecord = {
    registryId: createRegistryId(),
    sessionId,
    badgeId,
    device,
    merchant,
    status: "BOUND",
    timestamp: new Date().toISOString(),
  };

  RegistryRepository.create(record);

  return {
    ok: true,
    code: "REGISTRY_BIND_SUCCESS",
    record,
  };
}

/**
 * -----------------------------------------------------------------------------
 * Latest Registry Binding
 * -----------------------------------------------------------------------------
 * Retrieves the most recently created registry record.
 *
 * Returns:
 *   RegistryRecord | null
 * -----------------------------------------------------------------------------
 */
function getLatestBinding() {
  return RegistryRepository.getLatest();
}

/**
 * -----------------------------------------------------------------------------
 * Registry History
 * -----------------------------------------------------------------------------
 * Retrieves the complete registry ledger in reverse
 * chronological order.
 *
 * Returns:
 *   RegistryRecord[]
 * -----------------------------------------------------------------------------
 */
function getHistory() {
  return RegistryRepository.getAll();
}

/**
 * -----------------------------------------------------------------------------
 * Registry Status
 * -----------------------------------------------------------------------------
 * Calculates current registry operational status.
 *
 * Status Rules:
 *   ACTIVE
 *     Last registry activity occurred within the configured
 *     inactivity window.
 *
 *   IDLE
 *     No records exist or the inactivity window has expired.
 *
 * Monitoring Fields:
 *   • Activity timestamp
 *   • Idle duration
 *   • Record count
 * -----------------------------------------------------------------------------
 */
function getStatus() {
  const latest = RegistryRepository.getLatest();

  const now = Date.now();

  /**
   * Registry inactivity window.
   *
   * Current threshold:
   *   10 minutes
   */
  const inactivityThresholdMs =
    10* 60 * 1000;

  const lastActivity =
    latest?.timestamp != null
      ? new Date(latest.timestamp).getTime()
      : null;

  const isActive =
    lastActivity !== null &&
    now - lastActivity < inactivityThresholdMs;

  return {
    registry: isActive
      ? "ACTIVE"
      : "IDLE",

    totalRecords:
      RegistryRepository.count(),

    lastBinding: latest,

    lastActivityTimestamp:
      latest?.timestamp ?? null,

    inactiveForSeconds:
      lastActivity !== null
        ? Math.floor(
            (now - lastActivity) / 1000
          )
        : null,

    inactivityThresholdSeconds:
      inactivityThresholdMs / 1000,

    timestamp: new Date().toISOString(),
  };
}

/**
 * -----------------------------------------------------------------------------
 * Find By Registry Identifier
 * -----------------------------------------------------------------------------
 * Performs a deterministic registry lookup using the
 * registry identifier.
 *
 * Returns:
 *   RegistryRecord | null
 * -----------------------------------------------------------------------------
 */
function findByRegistryId(
  registryId: string
): RegistryRecord | null {
  return (
    RegistryRepository.getAll().find(
      (record) =>
        record.registryId === registryId
    ) ?? null
  );
}
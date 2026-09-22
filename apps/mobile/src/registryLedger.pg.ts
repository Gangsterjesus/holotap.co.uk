/**
 * =================================================================================================
 * HOLOTAP ENGINEERING
 * =================================================================================================
 *
 * File:
 *   registryLedger.pg.ts
 *
 * Engineer:
 *   Raymond Newton (E5357171)
 *
 * Classification:
 *   Flow-09.6 Deterministic Ledger Persistence Layer
 *
 * Domain:
 *   Audit, Correlation, Identity and Registry Infrastructure
 *
 * Flow Coverage:
 *   Flow-09.6 Deterministic Ledger
 *   Flow-10 Identity Sessions
 *   Flow-11 Identity Propagation
 *   Flow-12 Audit & Correlation Infrastructure
 *
 * Purpose:
 *   Persists immutable ledger envelopes into PostgreSQL using Prisma.
 *
 * Responsibilities:
 *   • Ledger record persistence
 *   • Correlation tracking
 *   • Actor traceability
 *   • Session traceability
 *   • Flow replay support
 *   • Audit reconstruction
 *
 * Database Mapping:
 *   event           -> ledger_records.event_type
 *   sessionId       -> ledger_records.session_id
 *   correlationId   -> ledger_records.correlation_id
 *   actor           -> envelope.actor
 *   record payload  -> envelope JSON column
 *
 * Failure Impact:
 *   HIGH
 *
 * If unavailable:
 *   • Audit trail degraded
 *   • Correlation tracking degraded
 *   • Session traceability degraded
 *   • Replay capability degraded
 *
 * =================================================================================================
 */

type PrismaClient = {
  ledger_records: {
    create(args: {
      data: {
        flow: string;
        event_type: string;
        session_id: string | null;
        actor_type: string;
        actor_id: string | null;
        correlation_id: string;
        envelope: RegistryLedgerRecord;
      };
    }): Promise<unknown>;
  };
};

const prisma = new ((0, eval)(
  "require('@prisma/client').PrismaClient",
) as new () => PrismaClient)();

export interface RegistryLedgerRecord {
  flow: string;
  event: string;
  sessionId?: string | null;
  correlationId: string;

  actor?: {
    type?: string;
    sessionId?: string | null;
    merchantId?: string | null;
    consumerId?: string | null;
  } | null;

  [key: string]: unknown;
}

export async function addRecord(
  record: RegistryLedgerRecord,
) {
  return prisma.ledger_records.create({
    data: {
      flow: record.flow,
      event_type: record.event,
      session_id: record.sessionId ?? null,
      actor_type: record.actor?.type ?? "unknown",
      actor_id:
        record.actor?.sessionId ??
        record.actor?.merchantId ??
        record.actor?.consumerId ??
        null,
      correlation_id: record.correlationId,
      envelope: record,
    },
  });
}
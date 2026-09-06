import { prisma } from "./db";

export async function addRecord(record: any) {
  return prisma.ledger_records.create({
    data: {
      flow: record.flow,
      event_type: record.event,
      session_id: record.sessionId ?? null,
      actor_type: record.actor?.type ?? "unknown",
      actor_id: record.actor?.sessionId ?? record.actor?.merchantId ?? record.actor?.consumerId ?? null,
      correlation_id: record.correlationId,
      envelope: record,
    },
  });
}

export async function getLatest() {
  return prisma.ledger_records.findFirst({
    orderBy: { id: "desc" },
  });
}

export async function getAll() {
  return prisma.ledger_records.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getBySessionId(sessionId: string) {
  return prisma.ledger_records.findMany({
    where: { session_id: sessionId },
    orderBy: { id: "asc" },
  });
}

export async function getByActor(actorId: string) {
  return prisma.ledger_records.findMany({
    where: { actor_id: actorId },
    orderBy: { id: "asc" },
  });
}

export async function getByFlow(flow: string) {
  return prisma.ledger_records.findMany({
    where: { flow },
    orderBy: { id: "asc" },
  });
}

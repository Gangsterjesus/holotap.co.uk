/**
 * HoloTapServer
 * Audit Log Repository
 *
 * Purpose:
 *  - Persistence layer for audit events.
 *  - Backed by immutable storage (append-only).
 */

import { AuditLogEvent } from "../models/AuditLogEvent";
import { db } from "../db";

export async function writeAuditLog(
  event: AuditLogEvent
): Promise<void> {
  await db.auditLogs.insert(event);
}

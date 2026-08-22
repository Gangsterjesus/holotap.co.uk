"use strict";
/**
 * HoloTapServer
 * Audit Log Repository
 *
 * Purpose:
 *  - Persistence layer for audit events.
 *  - Backed by immutable storage (append-only).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAuditLog = writeAuditLog;
const db_1 = require("../db");
async function writeAuditLog(event) {
    await db_1.db.auditLogs.insert(event);
}

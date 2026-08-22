"use strict";
/**
 * HoloTapServer
 * Audit Log Service (Regulatory + Schema Enforcement)
 *
 * Purpose:
 *  - Enforce NIST SP 800‑92 compliant audit schema
 *  - Validate every audit event before writing
 *  - Maintain daily rotating forensic logs
 *
 * Author: Raymond Newton
 * Date: 24 July 2026
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = logEvent;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const auditSchema = {
    required: ['eventId', 'eventType', 'action', 'actor', 'status'],
    statusValues: ['success', 'failure']
};
function validateAuditEvent(event) {
    for (const field of auditSchema.required) {
        if (!event[field]) {
            throw new Error(`AuditEvent missing required field: ${field}`);
        }
    }
    if (!auditSchema.statusValues.includes(event.status)) {
        throw new Error(`Invalid status: ${event.status}`);
    }
}
const LOG_DIR = path_1.default.join(process.cwd(), 'logs');
if (!fs_1.default.existsSync(LOG_DIR))
    fs_1.default.mkdirSync(LOG_DIR);
function getDailyLogFile() {
    const date = new Date().toISOString().split('T')[0];
    return path_1.default.join(LOG_DIR, `audit-${date}.log`);
}
async function logEvent(event) {
    validateAuditEvent(event);
    const payload = {
        timestamp: new Date().toISOString(),
        system: 'HoloTapServer',
        severity: event.status === 'failure' ? 'warning' : 'info',
        ...event,
    };
    console.log('[AUDIT]', JSON.stringify(payload));
    fs_1.default.appendFileSync(getDailyLogFile(), JSON.stringify(payload) + '\n');
}

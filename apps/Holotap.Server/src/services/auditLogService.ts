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

import fs from 'fs';
import path from 'path';

export interface AuditEvent {
  eventId: string;
  eventType: string;
  action: string;
  actor: string;
  status: 'success' | 'failure';
  sourceIp?: string;
  tenantId?: string;
  reason?: string;
  meta?: Record<string, any>;
}

const auditSchema = {
  required: ['eventId', 'eventType', 'action', 'actor', 'status'],
  statusValues: ['success', 'failure']
};

function validateAuditEvent(event: AuditEvent): void {
  for (const field of auditSchema.required) {
    if (!event[field as keyof AuditEvent]) {
      throw new Error(`AuditEvent missing required field: ${field}`);
    }
  }

  if (!auditSchema.statusValues.includes(event.status)) {
    throw new Error(`Invalid status: ${event.status}`);
  }
}

const LOG_DIR = path.join(process.cwd(), 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

function getDailyLogFile(): string {
  const date = new Date().toISOString().split('T')[0];
  return path.join(LOG_DIR, `audit-${date}.log`);
}

export async function logEvent(event: AuditEvent): Promise<void> {
  validateAuditEvent(event);

  const payload = {
    timestamp: new Date().toISOString(),
    system: 'HoloTapServer',
    severity: event.status === 'failure' ? 'warning' : 'info',
    ...event,
  };

  console.log('[AUDIT]', JSON.stringify(payload));
  fs.appendFileSync(getDailyLogFile(), JSON.stringify(payload) + '\n');
}

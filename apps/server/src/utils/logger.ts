/**
 * HoloTap — Identity Logger (Flow‑12)
 * Engineer: Raymond Newton (E5357171)
 *
 * Guarantees:
 *  - Correlation‑safe logging
 *  - Actor‑aware (Flow‑11)
 *  - Session‑aware (Flow‑10)
 *  - Ledger‑aware (Flow‑9.6)
 */

export interface LogContext {
  correlationId?: string;
  actorId?: string;
  sessionId?: string;
  envelopeId?: string;
}

export function log(message: string, context: LogContext = {}): void {
  const parts: string[] = ["[HoloTap]"];

  if (context.correlationId) parts.push(`cid=${context.correlationId}`);
  if (context.actorId)       parts.push(`actor=${context.actorId}`);
  if (context.sessionId)     parts.push(`session=${context.sessionId}`);
  if (context.envelopeId)    parts.push(`env=${context.envelopeId}`);

  console.log(parts.join(" "), "-", message);
}

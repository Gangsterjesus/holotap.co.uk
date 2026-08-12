/**
 * ============================================================
 * HoloTap Engineering Header — v2.4
 * ------------------------------------------------------------
 * Module: Identity Session Schema
 * Path: apps/server/src/session/sessionSchema.js
 * Engineer: Raymond Newton (E5357171)
 * Date: 2026-08-12
 *
 * Description:
 *   Defines the deterministic JSON schema for identity sessions.
 *
 * ============================================================
 */

export const sessionSchema = {
  sessionId: "string",
  identity: {
    creatorId: "string",
    verified: "boolean",
    metadata: "object",
  },
  createdAt: "number",
  expiresAt: "number",
};

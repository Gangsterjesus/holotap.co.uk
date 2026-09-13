/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: resolveSession.ts
 * Flow: 10 — Identity Session Resolution
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 */

import { db } from "../../db";

export interface ResolveSessionQuery {
  session_id: string;
}

export async function resolveSession(
  query: ResolveSessionQuery
) {
  if (!query.session_id) {
    return null;
  }

  const session = await db.identitySessions.findOne({
    session_id: query.session_id,
  });

  if (!session) {
    return null;
  }

  if (session.state !== "active") {
    return null;
  }

  return session;
}
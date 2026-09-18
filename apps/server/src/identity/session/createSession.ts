/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: createSession.ts
 * Flow: 10 — Identity Session Creation
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 */



import { db } from "../../db";

export interface CreateSessionInput {
  actor_id: string;
  role: string | null;
  state?: string;
}

export async function createSession(
  input: CreateSessionInput
) {
  const session = {
    actor_id: input.actor_id,
    role: input.role ?? null,
    state: input.state ?? "pending",
    created_at: new Date(),
  };

  const createdSession =
    await db.identitySessions.create(session);

  return createdSession;
}
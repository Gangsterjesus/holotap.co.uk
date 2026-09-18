/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: updateSessionState.ts
 * Flow: 10 — Identity Session State Management
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 */

import { db } from "../../db";

export interface UpdateSessionStateInput {
  session_id: string;
  state: string;
}

export async function updateSessionState(
  input: UpdateSessionStateInput
) {
  const session = await db.identitySessions.findOne({
    session_id: input.session_id,
  });

  if (!session) {
    return null;
  }

  const updatedSession = {
    ...session,
    state: input.state,
  };

  await db.identitySessions.update(
    { session_id: input.session_id },
    { state: input.state }
  );

  return updatedSession;
}
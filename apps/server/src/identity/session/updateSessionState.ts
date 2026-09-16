/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: updateSessionState.ts
 * Flow: 10 — Identity Session State Management
 * Engineer: Raymond Newton (E5357171)
 * =============================================================================
 *
 * PURPOSE:
 *   Updates the state of an existing Flow‑10 session.
 *
 * RESPONSIBILITIES:
 *   • Locate session by ID
 *   • Update lifecycle state
 *   • Return updated session
 *   • Never throw unhandled exceptions
 *
 * =============================================================================
 */

import { prisma } from "../../db";

export interface UpdateSessionStateRequest {
  sessionId: string;
  state: string;
}

export async function updateSessionState(
  request: UpdateSessionStateRequest
) {
  try {
    const session = await prisma.sessions.update({
      where: {
        id: request.sessionId,
      },
      data: {
        state: request.state,
      },
    });

    return session;
  } catch (error) {
    console.error(
      "[Flow 10] updateSessionState Error:",
      error
    );

    return null;
  }
}
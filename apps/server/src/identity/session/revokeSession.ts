/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: revokeSession.ts
 * Flow: 10 — Identity Session Revocation
 * Engineer: Raymond Newton (E5357171)
 *
 * Purpose:
 *   Revokes an active identity session.
 *
 * Responsibilities:
 *   • Validate session existence
 *   • Revoke session state
 *   • Preserve auditability
 *   • Return deterministic success/failure response
 *
 * Flow Integration:
 *   • Flow 10 — Identity Sessions
 *   • Flow 11 — Actor Resolution
 *   • Flow 12 — Identity Logging
 *   • Flow 9.6 — Ledger Infrastructure
 * =============================================================================
 */

import { db } from "../../db";

export async function revokeSession(
  sessionId: string,
): Promise<boolean> {
  console.info(
    "[Flow 10] Session revocation requested",
    {
      sessionId,
    },
  );

  try {
    const session =
      await db.identitySessions.findOne({
        session_id: sessionId,
      });

    if (!session) {
      console.warn(
        "[Flow 10] Session not found",
        {
          sessionId,
        },
      );

      return false;
    }

    await db.identitySessions.update(
      {
        session_id: sessionId,
      },
      {
        state: "revoked",
      },
    );

    console.info(
      "[Flow 10] Session revoked successfully",
      {
        sessionId,
      },
    );

    return true;
  } catch (error) {
    console.error(
      "[Flow 10] Session revocation failed",
      {
        sessionId,
        error,
      },
    );

    return false;
  }
}
/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: revokeSession.ts
 * Flow: 10 — Identity Session Revocation
 * Engineer: Raymond Newton (E5357171)
 * Date: 13 September 2026
 * =============================================================================
 *
 * PURPOSE:
 *   Revokes an active identity session within the Flow‑10 identity layer.
 *
 * RESPONSIBILITIES:
 *   • Receive session ID
 *   • Locate identity session record
 *   • Remove or invalidate session
 *   • Return deterministic success/failure response
 *
 * FLOW INTEGRATION:
 *   • Flow 10 — Identity Session Management
 *   • Flow 11 — Actor Resolution
 *   • Flow 12 — Identity Logging
 *
 * ENGINEERING NOTES:
 *   • Must never throw unhandled exceptions
 *   • Must return boolean result
 *   • Safe for API route consumption
 *   • Emits diagnostic logging on failure
 *
 * =============================================================================
 */

import { prisma } from "../../db";

export async function revokeSession(
  sessionId: string
): Promise<boolean> {
  console.log(
    `[Flow 10] revokeSession requested for session ${sessionId}`
  );

  try {
    await prisma.sessions.delete({
      where: {
        id: sessionId,
      },
    });

    console.log(
      `[Flow 10] Session revoked successfully: ${sessionId}`
    );

    return true;
  } catch (error) {
    console.error(
      `[Flow 10] Failed to revoke session: ${sessionId}`,
      error
    );

    return false;
  }
}
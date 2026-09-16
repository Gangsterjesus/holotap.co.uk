/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: revokeSession.ts
 * Flow: 10 — Identity Session Resolution
 * Engineer: Raymond Newton (E5357171)
 * Layer: Identity / Session
 *
 * Purpose:
 *   Revokes an active identity session from the session store.
 *
 * Responsibilities:
 *   • Validate session identifier
 *   • Remove session record
 *   • Emit diagnostic logging
 *   • Return deterministic success/failure result
 * =============================================================================
 */
import { prisma } from "../../db";

/**
 * Revokes a session from persistent storage.
 *
 * @param sessionId Session identifier to revoke
 * @returns true if the session was deleted successfully
 */
export async function revokeSession(
  sessionId: string
): Promise<boolean> {

  /**
   * Engineering Trace
   * Helps correlate registry, identity and payment flows.
   */
  console.log("[Flow 10] revokeSession()", {
    sessionId,
    timestamp: new Date().toISOString(),
  });

  try {
    /**
     * Delete session using Prisma session delegate.
     */
    await prisma.sessions.delete({
      where: {
        id: sessionId,
      },
    });

    /**
     * Success audit log.
     */
    console.log("[Flow 10] Session revoked successfully", {
      sessionId,
    });

    return true;
  } catch (error) {
    /**
     * Failure audit log.
     * Captures Prisma and database exceptions for diagnostics.
     */
    console.error("[Flow 10] Session revocation failed", {
      sessionId,
      error,
    });

    return false;
  }
}
/**
 * =============================================================================
 * HoloTap Engineering Header
 * File: resolveSession.ts
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


  console.log("[Flow 10] revokeSession()", {
    sessionId,
    timestamp: new Date().toISOString(),
  });

  try {
   
    await prisma.sessions.delete({
      where: {
        id: sessionId,
      },
    });

  
    console.log("[Flow 10] Session revoked successfully", {
      sessionId,
    });

    return true;
  } catch (error) {
  


    console.error("[Flow 10] Session revocation failed", {
      sessionId,
      error,
    });

    return false;
  }
}
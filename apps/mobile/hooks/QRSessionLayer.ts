/**
 * =============================================================================
 * HOLOTAP MOBILE — QR SESSION LAYER v2.4 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          useQrSession.ts
 * Date:          17 August 2026
 * =============================================================================
 * PURPOSE:
 * Provides the mobile QR session context for:
 *   • Active QR session token
 *   • Session expiry metadata
 *   • Identity‑bound session availability
 *
 * SESSION LIFECYCLE:
 *   1. Merchant identity must be verified
 *   2. Load QR session payload from backend
 *   3. Expose session state to QR generation screen
 *   4. Provide safe fallback states when identity or session is unavailable
 *
 * VERSION NOTES:
 *   • v2.4: Updated engineering header + stability patches
 *   • Identity‑aware session loading
 *   • Strong TypeScript typing
 *   • Safe fallback states for QR generation
 *
 * FLOW ALIGNMENT:
 *   Flow 1 → Identity
 *   Flow 2 → QR Session (this layer)
 *   Flow 3 → QR Generation (generate-qrc.tsx)
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { useMerchantIdentity } from "./useMerchantIdentity";

/**
 * QR session payload returned by backend.
 * `active` determines whether QR generation is allowed.
 */
interface QRSessionPayload {
  active: boolean;
  sessionId?: string;
  expiresAt?: string;
}

/**
 * Main QR session hook.
 * Loads session once identity is verified and exposes:
 *   • session: QR session payload or null
 *   • loading: session loading state
 *   • error: session error state
 *   • identity: merchant identity payload
 */
export function useQrSession() {
  // Identity subsystem
  const { identity, loading: identityLoading, error: identityError } =
    useMerchantIdentity();

  // Session state
  const [session, setSession] = useState<QRSessionPayload | null>(null);

  // Loading + error flags
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Load QR session from backend.
   * Only runs when identity is verified.
   */
  useEffect(() => {
    async function loadSession() {
      // Identity not ready → no session
      if (
        identityLoading ||
        identityError ||
        !identity ||
        identity.status !== "verified"
      ) {
        setSession(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://api.holotap.co/merchant/qr-session");
        const json = await res.json();

        // Store session payload
        setSession(json);
      } catch {
        // Backend unreachable or payload invalid
        setError(true);
      } finally {
        // Session load complete (success or failure)
        setLoading(false);
      }
    }

    loadSession();
  }, [identity, identityLoading, identityError]);

  /**
   * Expose session subsystem:
   *   • session: QR session payload
   *   • loading: session loading state
   *   • error: session error state
   *   • identity: merchant identity payload
   */
  return { session, loading, error, identity };
}

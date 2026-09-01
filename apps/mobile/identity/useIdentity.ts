/**
 * ============================================================
 *  HoloTap Identity — React Hook (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 1 September 2026
 *  File: useIdentity.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Provides a unified identity state for the entire mobile app.
 *
 *  FEATURES:
 *    • Loads stored identity session (SecureStore)
 *    • Lazily builds identity envelopes
 *    • Sends identity envelopes to backend
 *    • Binds IdentityResponse to session
 *    • Exposes identity state + loading + error
 *    • Provides refreshIdentity() + clearIdentity()
 *
 *  USED BY:
 *    • QR‑Identity Scan Screen (Flow 6)
 *    • Payment Initialisation (Flow 7)
 *    • Payment Result (Flow 8)
 *    • Any authenticated backend call
 *
 * ============================================================
 */

import { useEffect, useState, useCallback } from "react";
import { buildIdentityEnvelope } from "./buildIdentityEnvelope";
import { validateIdentityEnvelope } from "./validateIdentityEnvelope";
import {
  bindIdentitySession,
  getIdentitySession,
  clearIdentitySession,
} from "./IdentityBinding";
import type { IdentityResponse } from "./IdentityResponse";

/**
 * Backend endpoint for identity resolution.
 * Replace with your actual backend URL.
 */
const IDENTITY_ENDPOINT = "https://api.holotap.co.uk/identity/resolve";

export function useIdentity() {
  const [identity, setIdentity] = useState<IdentityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load identity session from SecureStore on app launch.
   */
  useEffect(() => {
    (async () => {
      const session = await getIdentitySession();
      setIdentity(session);
      setLoading(false);
    })();
  }, []);

  /**
   * Refresh identity by sending a new envelope to backend.
   */
  const refreshIdentity = useCallback(
    async (payload: Record<string, unknown>) => {
      setLoading(true);
      setError(null);

      try {
        const envelope = await buildIdentityEnvelope(payload);

        if (!validateIdentityEnvelope(envelope)) {
          throw new Error("Invalid identity envelope");
        }

        const res = await fetch(IDENTITY_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(envelope),
        });

        if (!res.ok) {
          throw new Error(`Backend error: ${res.status}`);
        }

        const data = (await res.json()) as IdentityResponse;

        await bindIdentitySession(data);
        setIdentity(data);
      } catch (err: any) {
        setError(err.message ?? "Unknown identity error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Clear identity session completely.
   */
  const clearIdentity = useCallback(async () => {
    await clearIdentitySession();
    setIdentity(null);
  }, []);

  return {
    identity,
    loading,
    error,
    refreshIdentity,
    clearIdentity,
  };
}

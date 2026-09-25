/**
 * =============================================================================
 * HOLOTAP MOBILE — MERCHANT IDENTITY LAYER v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          useMerchantIdentity.ts
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides the mobile identity context for:
 *   • Merchant verification status
 *   • Merchant hologram identity
 *   • Merchant profile metadata
 *   • Identity‑bound UI states across dashboard + QR flows
 *
 * IDENTITY LIFECYCLE:
 *   1. Load merchant identity from backend
 *   2. Expose identity status (verified / pending / blocked)
 *   3. Provide identity metadata to downstream hooks (QR session, dashboard)
 *   4. Ensure safe fallback states when identity is unavailable
 *
 * VERSION NOTES:
 *   • v1: Initial mobile identity hook
 *   • Backend‑driven identity payload
 *   • Strong TypeScript typing
 *   • Safe fallback states for dashboard + QR session
 *
 * ROUTING (Expo Router v6):
 * Identity‑aware screens:
 *   "/merchant-dashboard"
 *   "/generate-qrc"
 *   "/live-payments"
 *   "/refund"
 *   "/settlement"
 *   "/settings"
 * =============================================================================
 */

import { useEffect, useState } from "react";

/**
 * Merchant identity payload returned by backend.
 * `status` determines whether merchant is allowed to generate QR sessions.
 */
interface MerchantIdentity {
  id: string;
  name: string;
  status: "verified" | "pending" | "blocked";
  hologramId?: string;
}

/**
 * Main merchant identity hook.
 * Loads identity once on mount and exposes:
 *   • identity: merchant identity payload or null
 *   • loading: identity loading state
 *   • error: identity error state
 */
export function useMerchantIdentity() {
  const [identity, setIdentity] = useState<MerchantIdentity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadIdentity() {
      try {
        const res = await fetch("https://api.holotap.co/merchant/identity");
        const json = await res.json();
        setIdentity(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadIdentity();
  }, []);

  return { identity, loading, error };
}


/**
 * =============================================================================
 * HOLOTAP MOBILE — API CLIENT v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          src/api.ts
 * Date:          04 September 2026
 * =============================================================================
 * PURPOSE:
 * Provides a typed, centralised API client for all mobile → server requests.
 * Replaces raw fetch calls with a stable, predictable interface using Apisauce.
 *
 * ARCHITECTURE NOTES:
 *   • Reads API_URL from environment (.env)
 *   • Ensures consistent headers across all requests
 *   • Forms the foundation for identity, ledger, registry, and session flows
 *   • Pure TypeScript, no UI, no Expo Router dependencies
 *
 * =============================================================================
 */

import { create } from "apisauce";

// Base URL from environment
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Create API client
export const api = create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: unified error handler
export function handleApiResponse(res: any) {
  if (!res.ok) {
    console.error("API Error:", res.problem, res.originalError);
    throw new Error(res.problem || "API request failed");
  }
  return res.data;
}

/**
 * ============================================================
 *  HoloTap Identity — Binding Layer (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: IdentityBinding.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Provides a single binding point for all identity exports.
 *  This allows the mobile app to import identity logic from
 *  one stable location without deep relative paths.
 *
 *  USED BY:
 *    • Flow 6 (Payment Initialisation)
 *    • Flow 7 (Payment Processing)
 *    • Flow 8 (Payment Result)
 *    • Encryption Layer
 *    • QR‑Code Logic
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Flat, deterministic, no generics
 *  - Pure TypeScript
 * ============================================================
 */

import * as SecureStore from "expo-secure-store";
import type { IdentityResponse } from "./IdentityResponse";

const SESSION_KEY = "holotap.identity.session";

export async function bindIdentitySession(res: IdentityResponse): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(res));
}

export async function getIdentitySession(): Promise<IdentityResponse | null> {
  const raw = await SecureStore.getItemAsync(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as IdentityResponse;
  } catch {
    return null;
  }
}

export async function clearIdentitySession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
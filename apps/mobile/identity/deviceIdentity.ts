/**
 * ============================================================
 *  HoloTap Identity — Device Identity Provider (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: deviceIdentity.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Provides a stable device identity string for HoloTap Mobile.
 *  This identity is attached to every identity envelope and
 *  encrypted payload during Flow 6 → Flow 7 → Flow 8.
 *
 *  NOTES:
 *  - Deterministic
 *  - Stateless
 *  - Mobile‑only identity layer
 *  - Replace with SecureStore implementation later
 * ============================================================
 */

/**
 * Returns a stable device identity string.
 * Replace with SecureStore-backed UUID when ready.
 */
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "holotap.identity.deviceId";

export async function getDeviceIdentity(): Promise<string> {
  const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (existing) return existing;

  const brand = Device.brand ?? "unknown-brand";
  const model = Device.modelName ?? "unknown-model";
  const os = Device.osVersion ?? "unknown-os";

  const derived = `${brand}-${model}-${os}`;

  await SecureStore.setItemAsync(DEVICE_ID_KEY, derived);

  return derived;
}
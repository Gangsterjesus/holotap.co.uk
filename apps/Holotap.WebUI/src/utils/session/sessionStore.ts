/**
 * -------------------------------------------------------------
 * File: sessionStore.ts
 * Project: HoloTap Web‑UI v2
 * Module: In‑Memory Session Store (Flow 6 → Flow 7 → Flow 8)
 *
 * Author: Raymond Newton (E5357171)
 * Date: 10 August 2026
 *
 * Description:
 *  - Minimal deterministic session store for identity propagation.
 *  - Stores actor chains, payment lifecycle state, and metadata.
 *  - Replaced later by secure backend session binding.
 * -------------------------------------------------------------
 */

const store: Record<string, any> = {};

/**
 * setSessionValue
 * -------------------------------------------------------------
 * Writes a value into the in‑memory session store.
 */
export function setSessionValue(key: string, value: any) {
  store[key] = value;
}

/**
 * getSessionValue
 * -------------------------------------------------------------
 * Retrieves a typed value from the session store.
 */
export function getSessionValue<T>(key: string): T | null {
  return store[key] ?? null;
}

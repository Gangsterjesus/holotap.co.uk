/**
 * ------------------------------------------------------------
 * HoloTap Web — Identity State Manager
 * Location: apps/web/src/auth/identity.ts
 * Engineer: Raymond Newton
 * Date: 26 July 2026
 *
 * Purpose:
 *   Unified identity store for Flow 6:
 *     - Magic Link identity
 *     - Passkey identity
 *
 *   Responsibilities:
 *     - Hold identity object in memory
 *     - Reactively expose identity to UI
 *     - Clear identity on logout
 *     - Sync with token stored by lib/api.ts
 * ------------------------------------------------------------
 */

import { loginPasskey, registerPasskey, verifyMagicLink } from "../lib/api";

let currentIdentity: any = null;

/**
 * ------------------------------------------------------------
 * Identity Getter
 * ------------------------------------------------------------
 */
export function getIdentity() {
  return currentIdentity;
}

/**
 * ------------------------------------------------------------
 * Identity Setter
 * ------------------------------------------------------------
 */
export function setIdentity(identity: any) {
  currentIdentity = identity;
}

/**
 * ------------------------------------------------------------
 * Magic Link Identity Flow
 * ------------------------------------------------------------
 */
export async function loginWithMagicLink(token: string) {
  const identity = await verifyMagicLink(token);
  setIdentity(identity);
  return identity;
}

/**
 * ------------------------------------------------------------
 * Passkey Registration Flow
 * ------------------------------------------------------------
 */
export async function registerWithPasskey() {
  // Step 1 — Create credential
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: new Uint8Array([1, 2, 3]), // placeholder until server provides challenge
      rp: { name: "HoloTap" },
      user: {
        id: new Uint8Array([1, 2, 3]),
        name: "holotap-user",
        displayName: "HoloTap User"
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }]
    }
  });

  // Step 2 — Send to server
  await registerPasskey(credential);
}

/**
 * ------------------------------------------------------------
 * Passkey Login Flow
 * ------------------------------------------------------------
 */
export async function loginWithPasskey() {
  // Step 1 — Get assertion
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: new Uint8Array([1, 2, 3]), // placeholder until server provides challenge
      allowCredentials: []
    }
  });

  // Step 2 — Send to server
  const identity = await loginPasskey(assertion);

  // Step 3 — Store identity
  setIdentity(identity);

  return identity;
}

/**
 * ------------------------------------------------------------
 * Logout
 * ------------------------------------------------------------
 */
export function logout() {
  currentIdentity = null;
  localStorage.removeItem("holotap_token");
}

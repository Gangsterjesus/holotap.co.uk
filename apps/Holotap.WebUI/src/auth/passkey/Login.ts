/**
 * ------------------------------------------------------------
 * HoloTap Web — Passkey Login (WebAuthn)
 * Location: apps/web/src/auth/passkey/Login.ts
 * Engineer: Raymond Newton
 * Date: 26 July 2026
 *
 * Purpose:
 *   Flow 6 — Passkey Login.
 *   Uses the simplified API:
 *     - navigator.credentials.get()
 *     - loginPasskey(assertion)
 * ------------------------------------------------------------
 */

import { loginPasskey } from "../../lib/api";

export async function login() {
  // Step 1 — Retrieve WebAuthn assertion
  const assertion = await navigator.credentials.get({
    publicKey: {
      // Your server must return this challenge in the login page
      challenge: new Uint8Array([1, 2, 3]), // placeholder
      allowCredentials: []
    }
  });

  // Step 2 — Send assertion to server
  return loginPasskey(assertion);
}

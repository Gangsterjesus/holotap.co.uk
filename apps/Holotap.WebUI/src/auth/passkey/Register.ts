/**
 * ============================================================
 *  HoloTap — Authentication: Passkey Registration
 *  File: src/auth/passkey/Register.ts
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 26 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Handles WebAuthn passkey registration flow for merchants and
 *    admins. Creates a new device‑bound credential for secure login.
 *
 *  Responsibilities:
 *    - Request WebAuthn registration challenge
 *    - Call navigator.credentials.create()
 *    - Send credential response to backend
 *    - Return registration result to caller
 * ============================================================
 */

export async function startPasskeyRegistration(email: string) {
  const res = await fetch("http://192.168.1.205:3001/auth/passkey/register/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to start passkey registration.");
  }

  return await res.json();
}

export async function finishPasskeyRegistration(credential: unknown) {
  const res = await fetch("http://192.168.1.205:3001/auth/passkey/register/finish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credential),
  });

  if (!res.ok) {
    throw new Error("Failed to complete passkey registration.");
  }

  return await res.json();
}

/**
 * High‑level wrapper:
 * Performs full passkey registration flow.
 */
export async function registerPasskey(email: string) {
  // Step 1: Get challenge from backend
  const challengeOptions = await startPasskeyRegistration(email);

  // Step 2: Convert challenge fields to correct binary format
  challengeOptions.publicKey.challenge = Uint8Array.from(
    atob(challengeOptions.publicKey.challenge),
    (c) => c.charCodeAt(0)
  );

  challengeOptions.publicKey.user.id = Uint8Array.from(
    atob(challengeOptions.publicKey.user.id),
    (c) => c.charCodeAt(0)
  );

  // Step 3: Browser creates credential
  const credential = (await navigator.credentials.create({
    publicKey: challengeOptions.publicKey,
  })) as PublicKeyCredential | null;

  if (!credential) {
    throw new Error("Passkey registration was cancelled or failed.");
  }

  // Step 4: Prepare credential for backend
  const attestationResponse = credential.response as AuthenticatorAttestationResponse;

  const credentialData = {
    id: credential.id,
    rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
    type: credential.type,
    response: {
      attestationObject: btoa(
        String.fromCharCode(...new Uint8Array(attestationResponse.attestationObject))
      ),
      clientDataJSON: btoa(
        String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))
      ),
    },
  };

  // Step 5: Send credential to backend
  return await finishPasskeyRegistration(credentialData);
}

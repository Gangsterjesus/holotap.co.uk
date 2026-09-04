/**
 * =============================================================================
 * HOLOTAP MOBILE — IDENTITY HANDSHAKE MODULE v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          src/identity.ts
 * Date:          04 September 2026
 * =============================================================================
 * PURPOSE:
 * Implements the mobile-side identity handshake for HoloTap. Responsible for
 * resolving QR-derived identity payloads against the backend identity resolver
 * and returning a trusted identity envelope for session establishment.
 *
 * IDENTITY HANDSHAKE FLOW:
 *   1. Mobile scans QR → extracts IdentityQrPayload
 *   2. Mobile sends payload to /identity/resolve
 *   3. Backend validates identity + nonce
 *   4. Backend issues IdentityEnvelope (trusted identity + session seed)
 *   5. Mobile stores envelope for subsequent ledger/session operations
 *
 * ARCHITECTURE NOTES:
 *   • Pure TypeScript module (no UI)
 *   • Uses centralised API client (apisauce)
 *   • Forms foundation for session, ledger, and payment flows
 *   • Deterministic error handling via handleApiResponse()
 *
 * =============================================================================
 */













// Identity payload from QR
export interface IdentityQrPayload {
  identityId: string;      // or registry key / customer id
  nonce: string;           // anti-replay
}

// Envelope returned by backend
export interface IdentityEnvelope {
  identityId: string;
  displayName: string;
  sessionId: string;
  issuedAt: string;
  expiresAt: string;
}

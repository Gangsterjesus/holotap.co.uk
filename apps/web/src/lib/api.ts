/**
 * ------------------------------------------------------------
 * HoloTap Web — Unified API Client
 * Engineer: Raymond Newton
 * Date: 26 July 2026
 *
 * Purpose:
 *   Single authoritative API wrapper for ALL HoloTapServer routes:
 *     - Flow 1: Activation
 *     - Flow 2: QR Validation
 *     - Flow 3: Session Start
 *     - Flow 4: Session Verify
 *     - Flow 6: Identity (Magic Link + Passkey + QR Identity)
 *
 * Notes:
 *   - Injects identity token automatically
 *   - Normalises server errors
 *   - Detects offline server conditions
 *   - Strongly typed responses for all routes
 *   - Includes simple HTTP helpers (GET / POST)
 * ------------------------------------------------------------
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ------------------------------------------------------------
 * SECTION: Token Helpers
 * ------------------------------------------------------------
 */
function getToken(): string | null {
  return localStorage.getItem("holotap_token");
}

function setToken(token: string) {
  localStorage.setItem("holotap_token", token);
}

function clearToken() {
  localStorage.removeItem("holotap_token");
}

/**
 * ------------------------------------------------------------
 * SECTION: Core API Wrapper
 * ------------------------------------------------------------
 */
export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${path}`;

  try {
    const token = getToken();

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const text = await res.text();

      // Token expired → clear + bubble error
      if (res.status === 401) {
        clearToken();
      }

      throw new Error(text || `Request failed: ${res.status}`);
    }

    return res.json() as Promise<T>;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Server unreachable. Check connection.");
    }
    throw err;
  }
}

/**
 * ------------------------------------------------------------
 * SECTION: HTTP Convenience Methods
 * Purpose:
 *   Simple GET / POST helpers for lightweight calls.
 * ------------------------------------------------------------
 */
(api as any).post = function <T>(path: string, body: any) {
  return api<T>(path, {
    method: "POST",
    body: JSON.stringify(body)
  });
};

(api as any).get = function <T>(path: string) {
  return api<T>(path, { method: "GET" });
};

/**
 * ------------------------------------------------------------
 * SECTION: Flow 1 — Activation
 * ------------------------------------------------------------
 */
export interface ActivationResponse {
  token: string;
  tenantId: string;
  expiresAt: string;
}

export const activate = (code: string) =>
  api<ActivationResponse>("/activate", {
    method: "POST",
    body: JSON.stringify({ code })
  });

/**
 * ------------------------------------------------------------
 * SECTION: Flow 2 — QR Validation
 * ------------------------------------------------------------
 */
export interface QRValidationResponse {
  valid: boolean;
  tokenId?: string;
  reason?: string;
}

export const validateQR = (qr: string) =>
  api<QRValidationResponse>("/qr/validate", {
    method: "POST",
    body: JSON.stringify({ qr })
  });

/**
 * ------------------------------------------------------------
 * SECTION: Flow 3 — Session Start
 * ------------------------------------------------------------
 */
export interface SessionStartResponse {
  sessionId: string;
  startedAt: string;
}

export const startSession = (tokenId: string) =>
  api<SessionStartResponse>("/session/start", {
    method: "POST",
    body: JSON.stringify({ tokenId })
  });

/**
 * ------------------------------------------------------------
 * SECTION: Flow 4 — Session Verify
 * ------------------------------------------------------------
 */
export interface SessionVerifyResponse {
  status: "pending" | "completed" | "expired";
  sessionId: string;
  updatedAt: string;
}

export const verifySession = (sessionId: string) =>
  api<SessionVerifyResponse>(`/session/verify?sessionId=${sessionId}`);

/**
 * ------------------------------------------------------------
 * SECTION: Flow 6 — Identity (Magic Link + Passkey)
 * ------------------------------------------------------------
 */

// Magic Link Request
export const requestMagicLink = (email: string) =>
  api<{ ok: boolean }>("/auth/magic-link/request", {
    method: "POST",
    body: JSON.stringify({ email })
  });

// Magic Link Verify
export const verifyMagicLink = async (token: string) => {
  const res = await api<{ token: string; identity: any }>(
    "/auth/magic-link/verify",
    {
      method: "POST",
      body: JSON.stringify({ token })
    }
  );

  setToken(res.token);
  return res.identity;
};

// Passkey Register
export const registerPasskey = (credential: any) =>
  api<{ ok: boolean }>("/auth/passkey/register", {
    method: "POST",
    body: JSON.stringify(credential)
  });

// Passkey Login
export const loginPasskey = async (assertion: any) => {
  const res = await api<{ token: string; identity: any }>(
    "/auth/passkey/login",
    {
      method: "POST",
      body: JSON.stringify(assertion)
    }
  );

  setToken(res.token);
  return res.identity;
};

/**
 * ------------------------------------------------------------
 * SECTION: Flow 6 — Identity QR (Generation + Verification)
 * ------------------------------------------------------------
 */

export interface QRGenerateResponse {
  qr: string;        // base64 PNG
  payload: string;   // signed identity payload (JSON string)
}

export const generateQR = () =>
  api<QRGenerateResponse>("/qr", {
    method: "POST",
    body: JSON.stringify({})
  });

export interface QRVerifyResponse {
  valid: boolean;
  uid?: string;
  reason?: string;
}

export const verifyQRIdentity = (payload: string) =>
  api<QRVerifyResponse>("/qr/verify", {
    method: "POST",
    body: JSON.stringify({ payload })
  });

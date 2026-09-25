/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/auth/session/session.ts
   Author: Raymond Newton
   Project: HoloTap Identity & QR Security Platform
   Layer: auth-core
   Revision: v2 — Unified Web & Mobile Architecture
   ------------------------------------------------------------
   Notes:
   - Deterministic session architecture
   - Zero side-effects beyond explicit state transitions
   - Merchant/admin role isolation
   - Sliding TTL window for secure session refresh
   - LocalStorage used as client-side session cache
   ============================================================ */

import { HoloTapSession } from "./session.types";
import { now, future } from "./session.utils";

// ------------------------------------------------------------
// Constants
// ------------------------------------------------------------

const SESSION_KEY = "ht_session";

// ------------------------------------------------------------
// Session Creation
// ------------------------------------------------------------

/**
 * Persist a new authenticated session.
 */
export function createSession(session: HoloTapSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// ------------------------------------------------------------
// Session Retrieval
// ------------------------------------------------------------

/**
 * Retrieve the current session from storage.
 */
export function getSession(): HoloTapSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as HoloTapSession;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// Session Validation
// ------------------------------------------------------------

/**
 * Check if the session exists and has not expired.
 */
export function isSessionValid(): boolean {
  const session = getSession();
  if (!session) return false;
  return now() < session.expiresAt;
}

// ------------------------------------------------------------
// Session Refresh
// ------------------------------------------------------------

/**
 * Extend session expiry using a sliding TTL window.
 */
export function refreshSession(ttlMs: number) {
  const session = getSession();
  if (!session) return;

  const updated: HoloTapSession = {
    ...session,
    expiresAt: future(ttlMs),
  };

  createSession(updated);
}

// ------------------------------------------------------------
// Session Destruction
// ------------------------------------------------------------

/**
 * Remove session from storage (logout).
 */
export function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

// ------------------------------------------------------------
// Role Routing
// ------------------------------------------------------------

/**
 * Suggest next route based on authenticated role.
 */
export function getRoleRoute(): string {
  const session = getSession();
  if (!session) return "/auth/login";

  return session.role === "admin"
    ? "/admin"
    : "/merchant/dashboard";
}

// ------------------------------------------------------------
// Auth Headers
// ------------------------------------------------------------

/**
 * Attach session token to API requests.
 */
export function authHeaders(): HeadersInit {
  const session = getSession();
  if (!session || !session.token) {
    return { "Content-Type": "application/json" };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`,
  };
}

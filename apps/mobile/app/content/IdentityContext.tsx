/*  
 * =====================================================================================
 *  HoloTap Engineering — Mobile Identity Layer
 * -------------------------------------------------------------------------------------
 *  File: IdentityContext.tsx
 *  Version: 2.4
 *  Engineer: E5357171 (R. Newton)
 *  Date: 20 Aug 2026
 *  Module: Identity Context (Flow 6 — Identity Injection)
 *
 *  Purpose:
 *      - Provide deterministic identity propagation across the mobile application
 *      - Maintain identity envelope after QR acquisition (Flow 6)
 *      - Ensure identity survives navigation, API calls, and session transitions
 *
 *  Notes:
 *      - IdentityProvider must wrap the entire application tree
 *      - IdentityPayload is strongly typed to prevent schema drift
 *      - All sections below are commented for engineering clarity
 * =====================================================================================
 */

import React, { createContext, useContext, useState, useMemo } from "react";

/* --------------------------------------------------------------------------
 *  Type: IdentityPayload
 *  Description:
 *      - Strongly typed identity envelope injected after QR scan
 *      - Mirrors backend identity schema for deterministic propagation
 * -------------------------------------------------------------------------- */
export interface IdentityPayload {
  id: string;
  type: "user" | "merchant";
  sessionId: string;
  issuedAt: number;
  device: "mobile" | "web";
}

/* --------------------------------------------------------------------------
 *  Interface: IdentityContextValue
 *  Description:
 *      - Defines the shape of the identity context
 *      - Provides read + write operations for identity envelope
 * -------------------------------------------------------------------------- */
interface IdentityContextValue {
  identity: IdentityPayload | null;
  setIdentity: (value: IdentityPayload | null) => void;
  clearIdentity: () => void;
}

/* --------------------------------------------------------------------------
 *  Context: IdentityContext
 *  Description:
 *      - Holds the identity envelope and associated actions
 *      - Throws if accessed outside IdentityProvider
 * -------------------------------------------------------------------------- */
const IdentityContext = createContext<IdentityContextValue | undefined>(undefined);

/* --------------------------------------------------------------------------
 *  Component: IdentityProvider
 *  Description:
 *      - Wraps the application and provides identity state
 *      - Uses useMemo for deterministic value stability
 * -------------------------------------------------------------------------- */
export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [identity, setIdentityState] = useState<IdentityPayload | null>(null);

  const setIdentity = (value: IdentityPayload | null) => {
    setIdentityState(value);
  };

  const clearIdentity = () => {
    setIdentityState(null);
  };

  const value = useMemo(
    () => ({
      identity,
      setIdentity,
      clearIdentity,
    }),
    [identity]
  );

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}

/* --------------------------------------------------------------------------
 *  Hook: useIdentity
 *  Description:
 *      - Returns the current identity envelope
 *      - Throws if used outside IdentityProvider
 * -------------------------------------------------------------------------- */
export function useIdentity() {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return ctx.identity;
}

/* --------------------------------------------------------------------------
 *  Hook: useIdentityActions
 *  Description:
 *      - Provides identity mutation operations
 *      - Used by QR scan, logout, and session reset flows
 * -------------------------------------------------------------------------- */
export function useIdentityActions() {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error("useIdentityActions must be used within an IdentityProvider");
  }
  return {
    setIdentity: ctx.setIdentity,
    clearIdentity: ctx.clearIdentity,
  };
}

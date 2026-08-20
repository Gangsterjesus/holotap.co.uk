/*  
 *  HoloTap Engineering — Identity Context  
 *  Engineer: E5357171  
 *  Module: Mobile Identity Layer  
 *  Flow: 6 — Identity Injection  
 *  Purpose: Deterministic identity propagation across mobile → web → backend  
 *  Notes: Context must survive navigation, QR scans, and API calls  
 */

import React, { createContext, useContext, useState, useMemo } from "react";
export type IdentityPayload = Record<string, unknown>;

interface IdentityContextValue {
  identity: IdentityPayload | null;
  setIdentity: (value: IdentityPayload | null) => void;
  clearIdentity: () => void;
}

const IdentityContext = createContext<IdentityContextValue | undefined>(undefined);

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

export function useIdentity() {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return ctx.identity;
}

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

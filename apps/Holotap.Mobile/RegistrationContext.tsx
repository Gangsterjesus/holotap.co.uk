/**
 * =============================================================================
 * HOLOTAP MOBILE - REGISTRATION CONTEXT
 * =============================================================================
 * File: apps/Holotap.Mobile/context/RegistrationContext.tsx
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / Registration Security
 * Revision: v5.0.0 - HERO Build
 * Date: 29 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provide shared registration state for the HoloTap Mobile application.
 *
 * Module Responsibilities
 * - Track whether registration has been confirmed.
 * - Expose confirmed registration state to the root gatekeeper.
 * - Allow register.tsx to confirm registration after server acceptance.
 * - Default application access to denied.
 *
 * Architecture Boundary
 * This context does not authenticate customers or validate registration.
 * Registration authority remains server-owned. This module only propagates
 * confirmed client registration state to the navigation security boundary.
 * =============================================================================
 */

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface RegistrationContextValue {
  isRegistered: boolean;
  confirmRegistration: () => void;
  clearRegistration: () => void;
}

const RegistrationContext =
  createContext<RegistrationContextValue | undefined>(undefined);

export function RegistrationProvider({
  children,
}: PropsWithChildren) {
  /*
   * SECURITY DEFAULT
   *
   * HoloTap remains locked until registration has been explicitly confirmed.
   */
  const [isRegistered, setIsRegistered] = useState(false);

  const value = useMemo<RegistrationContextValue>(
    () => ({
      isRegistered,

      confirmRegistration() {
        setIsRegistered(true);
      },

      clearRegistration() {
        setIsRegistered(false);
      },
    }),
    [isRegistered],
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration(): RegistrationContextValue {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistration must be used within RegistrationProvider.",
    );
  }

  return context;
}
/**
 * ============================================================
 *  HoloTap — Authentication & Role Context
 *  File: src/services/AuthContext.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides global authentication state and role management for
 *  the HoloTap web application. Enables role-aware routing and
 *  navigation (public, creator, admin).
 *
 *  Responsibilities:
 *  - Store current user object
 *  - Store current role
 *  - Provide login/logout functions
 *  - Expose context to all components
 * ============================================================
 */

import { createContext, useContext, useState } from "react";

/* ============================
   CONTEXT INITIALISATION
   ============================ */

const AuthContext = createContext(null);

/* ============================
   PROVIDER COMPONENT
   ============================ */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("public");

  /* ============================
     LOGIN FUNCTION
     ============================ */
  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
  };

  /* ============================
     LOGOUT FUNCTION
     ============================ */
  const logout = () => {
    setUser(null);
    setRole("public");
  };

  /* ============================
     CONTEXT VALUE
     ============================ */
  const value = {
    user,
    role,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ============================
   HOOK: USE AUTH
   ============================ */

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * ============================================================
 *  HoloTap — Protected Route Wrapper
 *  File: src/router/ProtectedRoute.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Wraps route elements and restricts access based on user role.
 *  Redirects unauthorized users to the public home page.
 *
 *  Usage:
 *    <Route
 *      path="/admin"
 *      element={
 *        <ProtectedRoute role="admin">
 *          <AdminHome />
 *        </ProtectedRoute>
 *      }
 *    />
 * ============================================================
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext.jsx";

/* ============================
   COMPONENT
   ============================ */

export default function ProtectedRoute({ role, children }) {
  const { role: currentRole } = useAuth();

  // If user does not have the required role → redirect
  if (currentRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Otherwise render the protected content
  return children;
}

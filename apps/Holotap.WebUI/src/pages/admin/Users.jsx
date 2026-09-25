/**
 * ============================================================
 *  HoloTap — User Directory (Admin)
 *  File: src/pages/admin/Users.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays all users registered on the HoloTap platform,
 *    including identity, role, and membership metadata.
 *
 *  Responsibilities:
 *    - Fetch user records from the admin API
 *    - Surface user identifiers, names, and roles
 *    - Provide entry into deeper user‑level tools
 * ============================================================
 */

import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import DashboardGrid from "../../components/DashboardGrid.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";


/* ============================
   PAGE
   ============================ */

export default function Users() {
  const [users, setUsers] = useState(null);

  async function loadUsers() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      setUsers({ error: "Unable to load user data." });
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Users"
        subtitle="Platform‑wide user directory for administrators"
      />

      <DashboardGrid>
        {/* Error state */}
        {users && users.error && (
          <DashboardCard title="Error Loading Users">
            <p className="text-red-600">{users.error}</p>
          </DashboardCard>
        )}

        {/* Loading state */}
        {!users && (
          <DashboardCard title="Loading Users…">
            <p className="text-gray-600">Fetching user records…</p>
          </DashboardCard>
        )}

        {/* Empty state */}
        {Array.isArray(users) && users.length === 0 && (
          <DashboardCard title="No Users Found">
            <p className="text-gray-600">No user records available.</p>
          </DashboardCard>
        )}

        {/* User cards */}
        {Array.isArray(users) &&
          users.map((user) => (
            <DashboardCard key={user.id} title={user.name}>
              <p className="text-gray-700">
                User ID: <strong>{user.id}</strong>
              </p>
              <p className="text-gray-700">
                Role: <strong>{user.role}</strong>
              </p>
            </DashboardCard>
          ))}
      </DashboardGrid>
    </Layout>
  );
}

/**
 * =============================================================================
 *  HoloTap Web — Badge Management (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/badges/index.tsx
 *  Module:        2 — Badge Management
 *  Date:          28 July 2026
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

/* ============================================================================
   Types
   ============================================================================ */

interface Badge {
  id: string;
  name: string;
  role: string;
  hologramStyle: string;
  active: boolean;
}

type NewBadge = Omit<Badge, "id">;

/* ============================================================================
   Component
   ============================================================================ */

export default function BadgesPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [badges, setBadges] = useState<Badge[]>([]);
  const [newBadge, setNewBadge] = useState<NewBadge>({
    name: "",
    role: "",
    hologramStyle: "",
    active: true,
  });

  /* ============================================================================
     Load badges
     ============================================================================ */

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/badges");
        const data: Badge[] = await res.json();
        setBadges(data);
      } catch (err) {
        setError("Failed to load badges");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ============================================================================
     Create badge
     ============================================================================ */

  async function createBadge() {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/badges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBadge),
      });

      if (!res.ok) throw new Error("Create failed");

      const updated: Badge[] = await res.json();
      setBadges(updated);

      setNewBadge({
        name: "",
        role: "",
        hologramStyle: "",
        active: true,
      });
    } catch (err) {
      setError("Failed to create badge");
    } finally {
      setSaving(false);
    }
  }

  /* ============================================================================
     Toggle active/inactive
     ============================================================================ */

  async function toggleBadge(id: string) {
    try {
      const res = await fetch(`/api/badges/${id}/toggle`, {
        method: "POST",
      });

      const updated: Badge[] = await res.json();
      setBadges(updated);
    } catch (err) {
      setError("Failed to update badge");
    }
  }

  /* ============================================================================
     Render
     ============================================================================ */

  if (loading) return <p>Loading badges…</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h1>Badge Management</h1>
      <p>Manage staff badges, hologram overlays, and role assignments.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Badge */}
      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
        <h2>Create New Badge</h2>

        <label>Name</label>
        <input
          type="text"
          value={newBadge.name}
          onChange={(e) =>
            setNewBadge({ ...newBadge, name: e.target.value })
          }
        />

        <label>Role</label>
        <select
          value={newBadge.role}
          onChange={(e) =>
            setNewBadge({ ...newBadge, role: e.target.value })
          }
        >
          <option value="">Select role</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="security">Security</option>
        </select>

        <label>Hologram Style</label>
        <select
          value={newBadge.hologramStyle}
          onChange={(e) =>
            setNewBadge({ ...newBadge, hologramStyle: e.target.value })
          }
        >
          <option value="">Select hologram</option>
          <option value="blue-glow">Blue Glow</option>
          <option value="purple-wave">Purple Wave</option>
          <option value="gold-shield">Gold Shield</option>
        </select>

        <button onClick={createBadge} disabled={saving}>
          {saving ? "Creating…" : "Create Badge"}
        </button>
      </div>

      {/* Badge List */}
      <div style={{ marginTop: 30 }}>
        <h2>Existing Badges</h2>

        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              background: badge.active ? "#e8ffe8" : "#ffe8e8",
            }}
          >
            <strong>{badge.name}</strong> — {badge.role}
            <br />
            Hologram: {badge.hologramStyle}
            <br />
            Status: {badge.active ? "Active" : "Inactive"}
            <br />
            <button onClick={() => toggleBadge(badge.id)}>
              {badge.active ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

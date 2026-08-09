/**
 * =============================================================================
 *  HoloTap Web — Organisation Identity (Enterprise Module)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          apps/web/src/pages/dashboard/identity/index.tsx
 *  Module:        1 — Organisation Identity
 *  Date:          28 July 2026
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function IdentityPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [org, setOrg] = useState({
    name: "",
    legalName: "",
    logoUrl: "",
    hologramStyle: "",
    merchantId: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });

  // Fetch organisation identity
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/org/identity");
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        setError("Failed to load organisation identity");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function save() {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/org/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(org),
      });

      if (!res.ok) throw new Error("Save failed");
    } catch (err) {
      setError("Failed to save organisation identity");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading organisation identity…</p>;

  return (
    <div style={{ maxWidth: 700 }}>
      <h1>Organisation Identity</h1>
      <p>Manage your organisation’s core identity, branding, and hologram profile.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: 20 }}>
        <label>Organisation Name</label>
        <input
          type="text"
          value={org.name}
          onChange={(e) => setOrg({ ...org, name: e.target.value })}
        />

        <label>Legal Name</label>
        <input
          type="text"
          value={org.legalName}
          onChange={(e) => setOrg({ ...org, legalName: e.target.value })}
        />

        <label>Logo URL</label>
        <input
          type="text"
          value={org.logoUrl}
          onChange={(e) => setOrg({ ...org, logoUrl: e.target.value })}
        />

        <label>Hologram Style</label>
        <select
          value={org.hologramStyle}
          onChange={(e) => setOrg({ ...org, hologramStyle: e.target.value })}
        >
          <option value="">Select hologram style</option>
          <option value="blue-glow">Blue Glow</option>
          <option value="purple-wave">Purple Wave</option>
          <option value="gold-shield">Gold Shield</option>
        </select>

        <label>Merchant ID</label>
        <input
          type="text"
          value={org.merchantId}
          onChange={(e) => setOrg({ ...org, merchantId: e.target.value })}
        />

        <label>Contact Email</label>
        <input
          type="text"
          value={org.contactEmail}
          onChange={(e) => setOrg({ ...org, contactEmail: e.target.value })}
        />

        <label>Contact Phone</label>
        <input
          type="text"
          value={org.contactPhone}
          onChange={(e) => setOrg({ ...org, contactPhone: e.target.value })}
        />

        <label>Address</label>
        <textarea
          value={org.address}
          onChange={(e) => setOrg({ ...org, address: e.target.value })}
        />

        <button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* ============================================================
          Flow‑6 Identity Tools (QR, Signed Payload, Verification)
          ============================================================ */}
      <div style={{ marginTop: 40 }}>
        <h2>Flow‑6 Identity Tools</h2>
        <p>Access QR identity utilities for debugging, verification, and payload inspection.</p>

        <ul style={{ marginTop: 20, listStyle: "none", paddingLeft: 0 }}>
          <li style={{ marginBottom: 10 }}>
            <NavLink to="/qr/qr">Generate Identity QR</NavLink>
          </li>
          <li style={{ marginBottom: 10 }}>
            <NavLink to="/qr/payload">Signed Payload Viewer</NavLink>
          </li>
          <li style={{ marginBottom: 10 }}>
            <NavLink to="/qr/verify">Verify Identity Payload</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

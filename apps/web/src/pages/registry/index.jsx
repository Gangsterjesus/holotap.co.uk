/**
 * ============================================================
 *  HoloTap — Registry Overview (Flow‑9.1)
 *  File: apps/web/src/pages/registry/index.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v1.0 — Flow‑9 Registry Scaffolding
 * ============================================================
 */

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RegistryOverview() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getRegistryStatus();
        setStatus(res);
      } catch (err) {
        console.error("Registry status error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6">Loading registry…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registry Overview</h1>

      <pre className="bg-gray-900 text-white p-4 rounded">
        {JSON.stringify(status, null, 2)}
      </pre>

      <a
        href="/registry/bind"
        className="mt-6 inline-block bg-holotap-accent text-white px-4 py-2 rounded"
      >
        Bind Registry
      </a>
    </div>
  );
}

/**
 * ============================================================
 *  HoloTap — Registry Result (Flow‑9.3)
 *  File: apps/web/src/pages/registry/result.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v1.0 — Flow‑9 Registry Scaffolding
 * ============================================================
 */

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RegistryResult() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getRegistryStatus();
        setResult(res);
      } catch (err) {
        setResult({ error: err.message });
      }
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registry Result</h1>

      <pre className="bg-gray-900 text-white p-4 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>

      <a
        href="/registry"
        className="mt-4 inline-block text-holotap-accent underline"
      >
        Back to Registry Overview
      </a>
    </div>
  );
}

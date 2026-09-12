/**
 * =================================================================================================
 *  HOLOTAP — REGISTRY BIND ACTION PAGE
 *  File: apps/web/src/pages/registry/bind.jsx
 *
 *  Engineer:
 *    Raymond Newton (E5357171)
 *
 *  Purpose:
 *    Flow-9 Registry Binding Surface
 *
 * =================================================================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function RegistryBind() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function buildPayload() {
    return {
      sessionId: "session-001",
      badgeId: "badge-creator-001",
      device: navigator.userAgent,
      merchant: "merchant-001"
    };
  }

  async function bindRegistry() {
    try {
      setLoading(true);

      const payload = buildPayload();

      await api.bindRegistry(payload);

      navigate("/registry/result");
    } catch (error) {
      console.error("Registry binding failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bind Registry
      </h1>

      <button
        onClick={bindRegistry}
        className="bg-holotap-accent text-white px-4 py-2 rounded"
      >
        {loading ? "Binding..." : "Bind Registry"}
      </button>
    </div>
  );
}
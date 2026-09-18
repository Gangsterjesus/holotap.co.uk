/**
 * ============================================================
 * HoloTap Engineering
 * Engineer Raymond Newton GangsterJesus (E5357171)
 * Date: 18/9/2026
 * File: apps/web/src/pages/registry/bind.jsx
 * Module: Flow 9 Registry Binding
 *
 * Purpose:
 *   Execute registry binding and route creators to the
 *   registry result surface following successful registry
 *   registration and ledger processing.
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import DashboardCard from "../../components/DashboardCard";
import { api } from "../../services/api";

export default function RegistryBind() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function buildPayload() {
    return {
      sessionId: "session-001",
      badgeId: "badge-creator-001",
      device: navigator.userAgent,
      merchant: "merchant-001",
    };
  }

  async function bindRegistry() {
    setLoading(true);
    setError(null);

    try {
      const payload = buildPayload();

      const response = await api.bindRegistry(payload);

      if (!response?.ok) {
        setError({
          code: response?.code || "REGISTRY_BIND_FAILED",
          message:
            response?.message ||
            "Unable to complete registry binding.",
        });

        return;
      }

      navigate("/registry/result");
    } catch (err) {
      console.error("Registry binding failed:", err);

      setError({
        code: "REGISTRY_BIND_EXCEPTION",
        message:
          err?.message ||
          "Unexpected registry binding error.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout
      title="Registry Binding"
      subtitle="Flow 9 Creator Registry Registration"
    >
      <div className="home-container">
        <section className="text-center mb-8">
          <div className="flex justify-center mb-6">
            /icon.png
          </div>

          <h1 className="home-title">
            Bind Creator Registry
          </h1>

          <p className="home-tagline">
            Register creator identity context,
            generate a deterministic registry event,
            and record a trusted ledger transaction.
          </p>
        </section>

        <section className="home-trust">
          <div className="home-trust-item">
            Registry
          </div>

          <div className="home-trust-item">
            Identity
          </div>

          <div className="home-trust-item">
            Ledger
          </div>

          <div className="home-trust-item">
            Trust
          </div>
        </section>

        <DashboardCard>
          <h3 className="feature-title">
            Registry Binding
          </h3>

          <p className="feature-text">
            Complete Flow 9 registry registration
            and persist creator identity metadata
            within the HoloTap trust infrastructure.
          </p>

          <div className="mt-6">
            <button
              onClick={bindRegistry}
              disabled={loading}
              className="bg-holotap-accent text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading
                ? "Binding..."
                : "Bind Registry"}
            </button>
          </div>
        </DashboardCard>

        {error && (
          <DashboardCard>
            <div className="bg-red-900 text-white p-4 rounded">
              <strong>{error.code}</strong>

              <p className="mt-2">
                {error.message}
              </p>
            </div>
          </DashboardCard>
        )}

        <DashboardCard>
          <h3 className="feature-title">
            Flow Status
          </h3>

          <p className="feature-text">
            Registry binding prepares creator
            identities for downstream result,
            status, and history surfaces.
          </p>
        </DashboardCard>
      </div>
    </Layout>
  );
}

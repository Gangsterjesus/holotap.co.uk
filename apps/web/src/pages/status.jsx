/**
 * ============================================================
 *  HoloTap Engineering — Session Status Page (Flow 7)
 *  File: src/pages/status.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 10 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Displays identity + session status after Flow 6 injection.
 *    Reads SessionActor from sessionStore.
 *    Polls session state → shows identity + hologram + readiness.
 *    Redirects to Flow 8 (payments) when ready.
 *
 *  Notes:
 *    - Deterministic architecture only
 *    - Uses ErrorBoundary, Layout, PageHeader, DashboardCard
 *    - Backend polling will replace local sessionStore later
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DashboardCard from "../components/DashboardCard.jsx";

import { getSessionValue } from "../utils/session/sessionStore";

export default function Status() {
  const navigate = useNavigate();

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Poll local session store every 1s.
   * Later: replace with backend session polling.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const storedActor = getSessionValue("actor");
      setActor(storedActor);
      setLoading(false);

      // Deterministic routing → Flow 8
      if (storedActor && storedActor.issuedAt) {
        navigate("/payments/start");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <ErrorBoundary>
      {() => (
        <Layout
          title="Session Status"
          subtitle="Flow 7 — Identity Session Heartbeat"
        >
          <PageHeader
            title="Session Status"
            subtitle="Identity verification and payment readiness"
            actions={null}
          />

          {/* Loading */}
          {loading && (
            <DashboardCard title="Loading Session…" value="">
              <p className="text-gray-600">Awaiting identity injection…</p>
            </DashboardCard>
          )}

          {/* No Actor */}
          {!loading && !actor && (
            <DashboardCard title="No Active Session" value="">
              <p className="text-red-600">
                No identity session found. Please rescan your QR code.
              </p>
            </DashboardCard>
          )}

          {/* Actor Details */}
          {actor && (
            <DashboardCard title="Identity Session" value="">
              <div className="flex flex-col gap-2 text-gray-800">

                <p>
                  <strong>Creator:</strong> {actor.creator}
                </p>

                <p>
                  <strong>Organisation:</strong> {actor.org}
                </p>

                <p>
                  <strong>Merchant:</strong> {actor.merchant}
                </p>

                <p>
                  <strong>Device:</strong> {actor.device}
                </p>

                <p>
                  <strong>Issued At:</strong> {actor.issuedAt}
                </p>

                <p className="text-yellow-600 font-medium mt-2">
                  Identity verified — preparing payment lifecycle…
                </p>

                <button
                  onClick={() => navigate("/payments/start")}
                  className="mt-4 px-5 py-3 bg-black text-white rounded-lg font-medium"
                >
                  Continue to Payment (Flow 8)
                </button>
              </div>
            </DashboardCard>
          )}
        </Layout>
      )}
    </ErrorBoundary>
  );
}

/**
 * ============================================================
 *  HoloTap — Creator Dashboard (Main Overview)
 *  File: src/pages/dashboard/Dashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    The main dashboard for creators after onboarding and verification.
 *    Displays high‑level metrics, recent activity, and quick actions.
 *
 *  Subsystem:
 *    Flow 7 — Creator Monitoring (Post‑Verification)
 *
 *  Notes:
 *    - Inline styles removed
 *    - Uses external CSS (dashboard.css)
 * ============================================================
 */

import { useEffect, useState } from "react";
import { verifySession } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [sessionStatus, setSessionStatus] = useState("pending");
  const [updatedAt, setUpdatedAt] = useState("");

  const sessionId = localStorage.getItem("holotap_sessionId");

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await verifySession(sessionId);
        setSessionStatus(res.status);
        setUpdatedAt(res.updatedAt);

        if (res.status === "completed" || res.status === "expired") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Creator Dashboard</h1>
      <p className="dashboard-subtitle">
        Your hologram badge activity and payment overview.
      </p>

      <div className="dashboard-metrics">
        <div className="dashboard-card">
          <h2>Session Status</h2>
          <p>{sessionStatus}</p>
        </div>

        <div className="dashboard-card">
          <h2>Last Updated</h2>
          <p>{updatedAt || "—"}</p>
        </div>

        <div className="dashboard-card">
          <h2>Verification Status</h2>
          <p>{sessionStatus === "completed" ? "Verified" : "Pending"}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <a href={`/payments/${sessionId}`} className="dashboard-button">View Payments</a>
        <a href="/identity" className="dashboard-button">Identity Settings</a>
        <a href={`/status/${sessionId}`} className="dashboard-button">Badge Status</a>

        {sessionStatus === "expired" && (
          <button
            className="dashboard-button"
            onClick={() => navigate("/scan")}
          >
            Restart Session
          </button>
        )}
      </div>

    </div>
  );
}

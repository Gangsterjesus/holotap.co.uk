/**
 * ============================================================
 *  HoloTap — Public Onboarding Page
 *  File: src/pages/public/Onboarding.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v5.1 — Isolated Onboarding Styling
 *  Date: 27 September 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *    Public onboarding entry point for the HoloTap platform.
 *
 *  Module Responsibilities:
 *    - Present the responsive HoloTap onboarding experience
 *    - Capture onboarding profile information
 *    - Surface identity and QR trust capabilities
 *    - Maintain isolated onboarding presentation
 * ============================================================
 */

import "../styles/onboarding.css";

export default function Onboarding() {
  return (
    <div className="onboarding-container">

      {/* ============================================================
          HERO
          ============================================================ */}

      <section className="onboarding-hero">
        <h2 className="onboarding-title">
          Create Your Identity.
        </h2>

        <p className="onboarding-tagline">
          Create a trusted HoloTap profile and gain
          access to identity verification, QR trust
          services, and secure organisational workflows.
        </p>
      </section>

      {/* ============================================================
          TRUST
          ============================================================ */}

      <section className="onboarding-trust">
        <div className="onboarding-trust-item">
          Identity Creation
        </div>

        <div className="onboarding-trust-item">
          Verification Ready
        </div>

        <div className="onboarding-trust-item">
          QR Enabled
        </div>

        <div className="onboarding-trust-item">
          Trust Services
        </div>
      </section>

      {/* ============================================================
          REGISTRATION
          ============================================================ */}

      <section className="onboarding-card">
        <h3 className="onboarding-card-title">
          Onboarding Registration
        </h3>

        <p className="onboarding-card-text">
          Complete your profile and begin using
          HoloTap identity verification services.
        </p>

        <form className="onboarding-form">

          <div className="onboarding-field">
            <label
              htmlFor="displayName"
              className="onboarding-label"
            >
              Display Name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Your public name"
              className="onboarding-input"
            />
          </div>

          <div className="onboarding-field">
            <label
              htmlFor="email"
              className="onboarding-label"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="onboarding-input"
            />
          </div>

          <div className="onboarding-field">
            <label
              htmlFor="profileType"
              className="onboarding-label"
            >
              Profile Type
            </label>

            <select
              id="profileType"
              name="profileType"
              className="onboarding-input"
            >
              <option>Merchant</option>
              <option>Business</option>
              <option>Organisation</option>
              <option>Private Operator</option>
            </select>
          </div>

          <div className="onboarding-actions">
            <button
              type="submit"
              className="onboarding-btn-primary"
            >
              Continue
            </button>

            <button
              type="button"
              className="onboarding-btn-secondary"
            >
              Cancel
            </button>
          </div>

        </form>
      </section>

      {/* ============================================================
          WHY HOLOTAP
          ============================================================ */}

      <section className="onboarding-card">
        <h3 className="onboarding-card-title">
          Why Join HoloTap
        </h3>

        <p className="onboarding-card-text">
          Create a secure digital identity,
          verify trust, manage access,
          support QR-based workflows,
          and participate in the HoloTap ecosystem.
        </p>
      </section>

      {/* ============================================================
          PLATFORM STATUS
          ============================================================ */}

      <section className="onboarding-card">
        <h3 className="onboarding-card-title">
          Platform Status
        </h3>

        <p className="onboarding-card-text">
          Identity Services: Operational
        </p>

        <p className="onboarding-card-text">
          QR Infrastructure: Operational
        </p>

        <p className="onboarding-card-text">
          Trust Services: Active
        </p>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}

      <section className="onboarding-section">
        <h2 className="onboarding-card-title">
          Ready To Continue?
        </h2>

        <p className="onboarding-description">
          Complete your onboarding profile and
          begin using trusted HoloTap identity
          and verification services.
        </p>
      </section>

    </div>
  );
}
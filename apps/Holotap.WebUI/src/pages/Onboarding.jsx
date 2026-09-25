/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/public/Onboarding.jsx
   Author: Raymond Newton
   Project: HoloTap Identity & QR Security Platform
   Layer: web-ui
   Revision: v5 — Unified Identity Architecture
   ------------------------------------------------------------
   Notes:
   - Deterministic architecture only
   - Zero template styling, zero boilerplate
   - Tailwind v4 CSS-first UI pipeline
   - Web UI must remain modular and stateless
   - Identity, QR, and organisation layers isolated
   - Explicit state transitions; no hidden side-effects
   ============================================================ */





import "../styles/onboarding.css";



export default function Onboarding() {
  return (
    <div className="home-container">

      <section className="text-center">

        <div className="flex justify-center mb-8">
          <div className="flex justify-center mb-8">
    <img
      src="/icon.png"
      alt="HoloTap Icon"
      className="w-24 h-24"
    />
  </div>
        </div>

        <h2 className="home-title">
          Create Your Identity.
        </h2>

        <p className="home-tagline">
          Create a trusted HoloTap profile and gain
          access to identity verification, QR trust
          services, and secure organisational workflows.
        </p>

      </section>

      <section className="home-trust">

        <div className="home-trust-item">
          Identity Creation
        </div>

        <div className="home-trust-item">
          Verification Ready
        </div>

        <div className="home-trust-item">
          QR Enabled
        </div>

        <div className="home-trust-item">
          Trust Services
        </div>

      </section>

      <section className="feature-card">

        <h3 className="feature-title">
          Onboarding Registration
        </h3>

        <p className="feature-text">
          Complete your profile and begin using
          HoloTap identity verification services.
        </p>

        <form className="mt-6 flex flex-col gap-6">

          <div className="flex flex-col">
            <label
              htmlFor="displayName"
              className="font-semibold text-gray-700 mb-2"
            >
              Display Name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Your public name"
              className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="profileType"
              className="font-semibold text-gray-700 mb-2"
            >
              Profile Type
            </label>

            <select
              id="profileType"
              name="profileType"
              className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
            >
              <option>Content Creator</option>
              <option>Merchant</option>
              <option>Performer</option>
              <option>Private Operator</option>
            </select>
          </div>

       <div className="home-actions">

  <button
    type="submit"
    className="btn-primary"
  >
    Continue
  </button>

  <button
    type="button"
    className="btn-secondary"
  >
    Cancel
  </button>

</div>

        </form>

      </section>

      <section className="feature-card">

        <h3 className="feature-title">
          Why Join HoloTap
        </h3>

        <p className="feature-text">
          Create a secure digital identity,
          verify trust, manage access,
          support QR-based workflows,
          and participate in the HoloTap ecosystem.
        </p>

      </section>

      <section className="feature-card">

        <h3 className="feature-title">
          Platform Status
        </h3>

        <p className="feature-text">
          Identity Services: Operational
        </p>

        <p className="feature-text">
          QR Infrastructure: Operational
        </p>

        <p className="feature-text">
          Trust Services: Active
        </p>

      </section>

      <section className="home-section">

        <h2 className="feature-title">
          Ready To Continue?
        </h2>

        <p className="home-description">
          Complete your onboarding profile and
          begin using trusted HoloTap identity
          and verification services.
        </p>

      </section>

    </div>
  );
}
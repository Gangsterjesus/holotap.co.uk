/**
 * ============================================================
 *  HoloTap Engineering — Badge Verification Page
 *  File: src/pages/Verify.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * 
 * /**
 * ------------------------------------------------------------
 * Engineering Backlog
 * ------------------------------------------------------------
 * [ ] Replace action button with Button.jsx component
 * [ ] Extract RegistryPayloadBuilder service
 * [ ] Replace hardcoded sessionId
 * [ ] Replace hardcoded badgeId
 * [ ] Replace hardcoded merchant
 * [ ] Bind live identity session
 * [ ] Add TrustBar component
 * [ ] Adopt Home.jsx layout system
 * [ ] Add loading card
 * [ ] Add success state
 * [ ] Add failure state
 * [ ] Add confirmation dialog
 * [ ] Add audit trail display
 * [ ] Add registry binding result preview
 * ------------------------------------------------------------
 
`
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ============================================================
 */

import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";

import "../styles/home.css";

export default function Verify() {
  return (
    <Layout
      title="Verify Badge"
      subtitle="Public badge authenticity verification"
    >
      <div className="home-container">

        <section className="text-center">

          <div className="flex justify-center mb-8">
            <img
              src="/holotap-logo.svg"
              alt="HoloTap"
            />

          </div>

          <PageHeader
            title="Verify A HoloTap Badge"
            subtitle="Validate identity, authenticity and trust using HoloTap verification services."
            titleClassName="home-title"
            subtitleClassName="home-tagline"
            actions={null}
          />

        </section>

        <section className="home-trust">

          <div className="home-trust-item"> //needs to be a component//
            Badge Verification
          </div>

          <div className="home-trust-item">
            QR Identity
          </div>

          <div className="home-trust-item">
            Trust Services
          </div>

          <div className="home-trust-item">
            Real-Time Validation
          </div>

        </section>

        <section className="feature-card">

          <h3 className="feature-title">
            Verify Badge
          </h3>

          <p className="feature-text">
            Enter a HoloTap badge code and verify
            that the badge is genuine before
            proceeding with identity or payment
            workflows.
          </p>

          <div className="mt-6">

            <label
              htmlFor="badgeCode"
              className="block text-gray-700 font-medium mb-2"
            >
              Badge Code
            </label>

            <input
              id="badgeCode"
              name="badgeCode"
              type="text"
              placeholder="Enter badge code (e.g. HT-49302)"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 shadow-sm"
            />

          </div>

          <div className="home-actions">

            <button
              type="button"
              className="btn-primary"
            >
              Verify Badge
            </button>

            <a
              href="/scan"
              className="btn-secondary" //needs to be a component// Engineering note: react:router dom link to scanner page//
            >
              Open Scanner
            </a>

          </div>

        </section>

        <section className="feature-card">

          <h3 className="feature-title">
            Why Verification Matters
          </h3>

          <p className="feature-text">
            Verification protects organisations,
            merchants, venues and operators from
            counterfeit identities and fraudulent
            access attempts.
          </p>

        </section>

        <section className="feature-card">

          <h3 className="feature-title">
            Platform Status
          </h3>

          <p className="feature-text">
            Badge Verification Services: Operational
          </p>

          <p className="feature-text">
            QR Infrastructure: Operational
          </p>

          <p className="feature-text">
            Trust Services: Active
          </p>

        </section>

      </div>
    </Layout>
  );
}
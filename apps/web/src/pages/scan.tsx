/**
 * ============================================================
 *  HoloTap Web — QR Scan Surface
 *  File: src/pages/scan.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Project: HoloTap Identity & QR Security Platform
 *  Layer: web-ui
 *  Module: Flow 6 Identity Resume
 *  Revision: v3 — Unified Identity Architecture
 *  ------------------------------------------------------------
 *  Purpose:
 *    Full-screen QR scanning interface for HoloTap identities.
 *
 *  Responsibilities:
 *    - Acquire QR payload
 *    - Validate QR identity record
 *    - Resume active identity session
 *    - Create session when required
 *    - Redirect to identity status view
 *
 *  Flow:
 *    QR Code
 *      ↓
 *    Validation
 *      ↓
 *    Identity Resolution
 *      ↓
 *    Session Resume
 *      ↓
 *    Status View
 *
 *  Security Model:
 *    - QR payload verification
 *    - Backend identity validation
 *    - Session-bound identity context
 *    - Explicit state transitions
 *    - No hidden side-effects
 *
 *  Dependencies:
 *    - html5-qrcode
 *    - validateQR()
 *    - startSession()
 *    - React Router
 * ============================================================
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { validateQR, startSession } from "../lib/api";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Layout from "../components/Layout.jsx";



export default function Scan() {
  const navigate = useNavigate();

  const scannerRef =
    useRef<Html5QrcodeScanner | null>(null);

  async function handleScanSuccess(decodedText: string) {
    try {
      const validated = await validateQR(decodedText);

      if (!validated.valid || !validated.tokenId) {
        alert(validated.reason || "Invalid QR code");
        return;
      }

      const session = await startSession(validated.tokenId);

      localStorage.setItem("holotap_sessionId", session.sessionId);

      navigate(`/status/${session.sessionId}`);
    } catch (err) {
      console.error("QR error:", err);
      alert("Invalid QR code. Please try again.");
    }
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText: string) => handleScanSuccess(decodedText),
      () => {}
    );

    return () => {
      scannerRef.current?.clear();
      scannerRef.current = null;
    };
  }, []);
return (
  <ErrorBoundary>
    <Layout
      title="QR Scan"
      subtitle="Scan a HoloTap QR code to resume or create a session"
    >
      <div className="home-container">

        <section className="text-center">

          <div className="flex justify-center mb-8">
            <img
              src="/icon.png"
              alt="HoloTap"
            />
          </div>

   <h2 className="home-title">
            Scan Every Identity.
          </h2>

          <p className="home-tagline">
            Validate identities, resume secure sessions,
            and access trusted HoloTap infrastructure
            through QR verification.
          </p>

        </section>

        <section className="home-trust">
          <div className="home-trust-item">
            QR Identity
          </div>

          <div className="home-trust-item">
            Session Resume
          </div>

          <div className="home-trust-item">
            Verification
          </div>

          <div className="home-trust-item">
            Trust Services
          </div>
        </section>

        <section className="feature-card">

          <h3 className="feature-title">
            QR Scanner
          </h3>

          <p className="feature-text">
            Scan a HoloTap QR code to validate identity
            and establish a secure session.
          </p>

          <div className="flex justify-center mt-6">
            <div
              id="qr-reader"
              className="w-[320px] h-[320px] bg-white rounded-xl shadow-md border"
            />
          </div>

        </section>

        <section className="feature-card">

          <h3 className="feature-title">
            Scanner Status
          </h3>

          <p className="feature-text">
            Camera ready and waiting for a valid
            HoloTap QR code.
          </p>

        </section>

      </div>
    </Layout>
  </ErrorBoundary>
);
}
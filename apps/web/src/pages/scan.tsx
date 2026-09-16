/**
 * ============================================================
 *  HoloTap Web — QR Scan Page (Flow 6)
 *  File: src/pages/scan.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 28 July 2026
 * ============================================================
 *
 *  Purpose:
 *    Full‑screen QR scanner for Flow 6.
 *    Validates QR → resumes/creates session → redirects to status page.
 *
 *  Subsystem:
 *    Flow 6 — QR → Validation → Session Resume
 * ============================================================
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { validateQR, startSession } from "../lib/api";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DashboardCard from "../components/DashboardCard.jsx";

export default function Scan() {
  const navigate = useNavigate();
  const scannerRef = useRef<any>(null);

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
    <PageHeader
      title="QR Scan"
      subtitle="Flow 6 — QR → Validation → Session Resume"
      actions={null}
    />

    <DashboardCard title="Scanner" value="">
      <div className="flex justify-center mt-4">
        <div
          id="qr-reader"
          className="w-[320px] h-[320px] border rounded-lg shadow-md bg-white"
        />
      </div>
    </DashboardCard>
  </Layout>
</ErrorBoundary>
  );

}
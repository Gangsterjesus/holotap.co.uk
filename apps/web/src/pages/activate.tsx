/**
 * ============================================================
 *  HoloTap — Activation Page (Flow 1)
 *  File: src/pages/activate.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    First step in the Web → Server pipeline.
 *    Allows user to enter activation code and receive token.
 *
 *  Responsibilities:
 *    - Capture activation code
 *    - Call activate() API
 *    - Store token in localStorage
 *    - Navigate to dashboard
 * ============================================================
 */
/**
 * ------------------------------------------------------------
 * HoloTap Web — Activation Page (Flow 1)
 * File: src/pages/activate.tsx
 * Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 * Date: 25 July 2026
 * ------------------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activate } from "../lib/api";

import { ErrorBoundary } from "../components/ErrorBoundary";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Activate() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");

  async function handleActivate(setError: (msg: string) => void) {
    try {
      const result = await activate(code);

      localStorage.setItem("holotap_token", result.token);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  }

  return ErrorBoundary({
    children: (setError) => (
      <Layout
        title="Activate HoloTap"
        subtitle="Enter your activation code to begin"
      >
        <PageHeader
          title="Activate HoloTap"
          subtitle="Enter your activation code to begin"
          actions={null}
        />

        <div className="max-w-md mx-auto flex flex-col gap-6 mt-6">
          <Input
            label="Activation Code"
            placeholder="Enter activation code"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}

            error={null}
          />

          <Button
            variant="primary"
            disabled={false}
            onClick={() => handleActivate(setError)}
          >
            Activate
          </Button>
        </div>
      </Layout>
    ),
  });
}
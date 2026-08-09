/**
 * ============================================================
 *  HoloTap Web — Error Boundary Component
 *  File: src/components/ErrorBoundary.tsx
 *  Engineers: Raymond Newton, Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  ------------------------------------------------------------
 *  Purpose:
 *    Provides a controlled UI surface for render‑level failures.
 *    Wraps all Web → UI components (Activation, QR, Session).
 *
 *  Subsystem:
 *    Web → UI Error Handling Layer
 *
 *  Notes:
 *    - Accepts normal JSX children (not render‑props)
 *    - Prevents UI crashes from bubbling
 *    - Deterministic behaviour; no hidden side-effects
 * ============================================================
 */

import React from "react";

/* ============================
   TYPES
   ============================ */

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/* ============================
   COMPONENT
   ============================ */

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /* ============================
     ERROR CAPTURE
     ============================ */
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info);
  }

  /* ============================
     RENDER
     ============================ */
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
          <strong>Error:</strong> Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

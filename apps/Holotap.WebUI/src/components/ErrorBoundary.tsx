/**
 * ============================================================
 * HoloTap Engineering
 * Engineer: Raymond Newton (E5357171)
 * Alias: GangsterJesus
 * AI Engineering Assistant: Microsoft Copilot (2026)
 *
 * Platform: HoloTap Hero v5
 *
 * File: ErrorBoundary.tsx
 * FilePath: apps/web/src/components/ErrorBoundary.tsx
 * Layer: Web UI
 * Component: ErrorBoundary
 * Version: 5.0.0
 * ISO: 27001 Aligned
 *
 * Purpose:
 * ------------------------------------------------------------
 * Provides controlled render-failure handling for Hero v5
 * components and prevents UI crashes from propagating through
 * the application.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Capture React render failures
 * - Provide deterministic fallback UI
 * - Improve application availability
 * - Support QoS objectives
 * - Improve operational resilience
 *
 * Quality Objectives:
 * ------------------------------------------------------------
 * - ISO 27001 Aligned
 * - QoS Focused
 * - Availability Focused
 * - Accessible
 * - Production Hardened
 * - Deterministic
 * - Future Proof
 *
 * ============================================================
 */

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error: Error,
    info: React.ErrorInfo,
  ): void {
    console.error(
      "[Hero v5] ErrorBoundary",
      error,
      info,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-red-300
            bg-red-50
            p-6
            text-red-700
          "
        >
          <h2 className="font-semibold">
            Service Unavailable
          </h2>

          <p className="mt-2">
            A component failed to render.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
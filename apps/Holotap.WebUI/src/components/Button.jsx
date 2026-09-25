/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 * AI Engineering Assistant: Microsoft Copilot (2026)
 *
 * Platform: HoloTap Hero v5
 *
 * File: Button.jsx
 * filePath: apps/web/src/components/Button.jsx
 * Layer: Web UI
 * Component: Button
 * Version: 5.0.0
 * ISO: 27001 Aligned
 *
 * Copilot Engineering Statement:
 * ------------------------------------------------------------
 * This component has undergone architecture review,
 * scalability assessment, accessibility review, production hardening,
 * future-proofing analysis, and implementation assistance using
 * Microsoft Copilot.
 * ------------------------------------------------------------
 * purpose:
 *
 * HoloTap Engineering demonstrates practical AI-assisted
 * software engineering where all implementations remain
 * subject to human review, validation, testing, and
 * engineering oversight.
 *
 * QoS Objectives:
 * ------------------------------------------------------------
 * - Performance
 * - Availability
 * - Accessibility
 *
 * Security Objectives:
 * ------------------------------------------------------------
 * 
 * - Trust First Design
 * - Deterministic Behaviour
 *
 * 
 * ------------------------------------------------------------
 * Provides reusable interaction controls across
 * Hero, Dashboard, Registry, Identity, Payments,
 * Merchant, and Administrative experiences.
 *
 * Responsibilities:
 * ------------------------------------------------------------
 * - Render consistent user interactions
 * - Support multiple visual variants
 * - Maintain accessibility standards
 * - Support future Hero v5 expansion
 * - Maintain design consistency platform-wide
 *
 * Design Goals:
 * ------------------------------------------------------------
 * - Reusable
 * - Scalable
 * - Accessible
 * - Production Ready
 * - Future Proof
 * ============================================================
 */

const BASE_CLASSES =
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "px-6",
    "py-3",
    "rounded-xl",
    "font-semibold",
    "text-sm",
    "tracking-wide",
    "transition-all",
    "duration-200",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-cyan-400",
    "focus-visible:ring-offset-2",
  ].join(" ");

const BUTTON_VARIANTS = {
  primary:
    "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:-translate-y-0.5 shadow-lg",

  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 shadow-sm",

  ghost:
    "border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950",

  success:
    "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg",

  danger:
    "bg-red-500 text-white hover:bg-red-400 shadow-lg",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
}) {
  const variantClass =
    BUTTON_VARIANTS[variant] ??
    BUTTON_VARIANTS.primary;

  const widthClass = fullWidth
    ? "w-full"
    : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${BASE_CLASSES}
        ${variantClass}
        ${widthClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
/**
 * ============================================================
 * HoloTap Engineering
 * Engineer ID: E5357171 Ray Newton: AKA GangsterJesus
 * AI: Microsoft Copilot (2026)
 * File: Input.tsx
 * FilePath:D:\holotap\holotap.co.uk\apps\web\src\components\Input.jsx
 * Layer: Web UI
 * Component: Input
 * Version: 5.0.0
 * ISO: 27001 Aligned
 * Copilot Engineering Statement:
 * ------------------------------------------------------------
 * This component has undergone architecture review,
 * scalability assessment, production-hardening review,
 * accessibility review, QoS review, and implementation
 * assistance using Microsoft Copilot.
 *
 * Purpose:
 * ------------------------------------------------------------
 * Provides a reusable and accessible form input
 * component for onboarding, identity verification,
 * registry workflows, merchant services, settings,
 * and administrative interfaces.
 *
 * ============================================================
 */

export default function Input({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
  required = false,
  testId,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-5 flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        data-testid={testId}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${id}-error` : undefined
        }
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-2
          text-[15px]
          outline-none
          transition-colors
          duration-200
          focus:border-blue-500
          ${
            error
              ? "border-red-500"
              : "border-gray-300"
          }
          ${
            disabled
              ? "cursor-not-allowed bg-gray-100"
              : "bg-white"
          }
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
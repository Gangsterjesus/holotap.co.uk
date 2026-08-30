// File: src/lib/useRegistryStatus.js
import { useEffect, useState } from "react";
import { api } from "../services/api";

/**
 * Flow‑9.5 — Registry Status Polling Hook
 */
export function useRegistryStatus(pollIntervalMs = 10000) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;

    async function load() {
      try {
        const res = await api.getRegistryStatus();

        if (!res || typeof res !== "object") {
          setError({
            code: "REGISTRY_STATUS_INVALID",
            message: "Registry status payload malformed.",
          });
          return;
        }

        setStatus(res);
        setError(null);
      } catch (err) {
        setError({
          code: "REGISTRY_STATUS_ERROR",
          message: err.message || "Unable to load registry status.",
        });
      }
    }

    load();
    timer = setInterval(load, pollIntervalMs);

    return () => timer && clearInterval(timer);
  }, [pollIntervalMs]);

  return { status, error };
}

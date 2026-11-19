
/**
 * =============================================================================
 * HOLOTAP MOBILE — API CLIENT v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton (E5357171)
 * Assistant:     Copilot Engineering Assistant
 * File:          src/api.ts
 * Date:          04 September 2026
 * =============================================================================
 * PURPOSE:
 * Provides a typed, centralised API client for all mobile → server requests.
 * Replaces raw fetch calls with a stable, predictable interface using Apisauce.
 *
 * ARCHITECTURE NOTES:
 *   • Reads API_URL from environment (.env)
 *   • Ensures consistent headers across all requests
 *   • Forms the foundation for identity, ledger, registry, and session flows
 *   • Pure TypeScript, no UI, no Expo Router dependencies
 *
 * =============================================================================
 */

// Base URL from environment
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiResponse<T = unknown> = {
  ok: boolean;
  data: T | null;
  problem: string | null;
  originalError: unknown;
  status: number | null;
};

type QueryParams = Record<string, string | number | boolean | null | undefined>;

async function request<T>(
  method: string,
  url: string,
  data?: unknown,
  params?: QueryParams,
): Promise<ApiResponse<T>> {
  const query = params
    ? Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&")
    : "";
  const fullUrl = `${BASE_URL ?? ""}${url}${query ? `${url.includes("?") ? "&" : "?"}${query}` : ""}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    });
    const responseData = response.status === 204 ? null : await response.json().catch(() => null);

    return {
      ok: response.ok,
      data: responseData as T | null,
      problem: response.ok ? null : `HTTP_${response.status}`,
      originalError: null,
      status: response.status,
    };
  } catch (error) {
    return { ok: false, data: null, problem: "NETWORK_ERROR", originalError: error, status: null };
  }
}

// Fetch-based API client; avoids requiring an external API-client package.
export const api = {
  get: <T = unknown>(url: string, params?: QueryParams) => request<T>("GET", url, undefined, params),
  delete: <T = unknown>(url: string, params?: QueryParams) => request<T>("DELETE", url, undefined, params),
  head: <T = unknown>(url: string, params?: QueryParams) => request<T>("HEAD", url, undefined, params),
  options: <T = unknown>(url: string, params?: QueryParams) => request<T>("OPTIONS", url, undefined, params),
  post: <T = unknown>(url: string, data?: unknown) => request<T>("POST", url, data),
  put: <T = unknown>(url: string, data?: unknown) => request<T>("PUT", url, data),
  patch: <T = unknown>(url: string, data?: unknown) => request<T>("PATCH", url, data),
};

// Optional: unified error handler
export function handleApiResponse(res: any) {
  if (!res.ok) {
    console.error("API Error:", res.problem, res.originalError);
    throw new Error(res.problem || "API request failed");
  }
  return res.data;
}

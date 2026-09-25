import { SERVER_URL } from "./config/server";

export async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${SERVER_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  });

  return res.json();
}

/**
 * =============================================================================
 * HOLOTAP MOBILE - API CLIENT
 * =============================================================================
 * File: apps/Holotap.Mobile/api/client.ts
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / API Transport
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Central transport layer for HoloTap Mobile.
 *
 * Module Responsibilities
 * - Provide GET and POST helpers.
 * - Centralise API URL configuration.
 * - Surface HTTP failures consistently.
 * - Keep transport logic outside screens.
 * =============================================================================
 */

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://192.168.1.173:4000/api";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function apiPost<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
}

export async function apiGet<T = unknown>(
  path: string,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  return parseResponse<T>(response);
}
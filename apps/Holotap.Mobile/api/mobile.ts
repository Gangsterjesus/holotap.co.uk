/**
 * =============================================================================
 * HOLOTAP MOBILE - MOBILE REGISTRATION API
 * =============================================================================
 * File: apps/Holotap.Mobile/api/mobile.ts
 * Engineers: Raymond Newton (E5357171)
 *            Copilot Engineering Assistant
 * Layer: Mobile / API
 * Revision: v5.0.0 - HERO Build
 * Date: 24 September 2026
 * Copyright (c) 2026 HoloTap Technologies Ltd.
 * =============================================================================
 *
 * Module Purpose
 * Provides the mobile registration API boundary for HoloTap Mobile.
 *
 * Module Responsibilities
 * - Define the mobile registration request payload.
 * - Submit registration requests through the shared API client.
 * - Keep HTTP transport concerns outside the registration screen.
 *
 * Architecture Boundary
 * Registration persistence, validation and identity authority remain
 * server-owned.
 * =============================================================================
 */

import { apiPost } from "./client";

export interface MobileRegistrationPayload {
  mobile_number: string;
  country_code: string;
  device_id: string;
  platform: string;
  push_token?: string;
}

export async function mobileRegister(
  payload: MobileRegistrationPayload,
) {
  return apiPost("/mobile/register", payload);
}
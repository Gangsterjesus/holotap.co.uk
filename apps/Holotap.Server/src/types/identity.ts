/* 
===========================================================
HoloTap Engineering — Identity Types
Engineer: E5357171 (R. Newton)
Date: 2026‑08‑31
Flow: 9.3 — Identity Bridge
File: apps/server/src/types/identity.ts
===========================================================
*/

export interface Flow9IdentityPayload {
  fullName: string;
  email: string;
  phone: string;
  qrCode: string;        // raw QR content
  id_qr_code: string;    // derived identity token
  timestamp: string;
}

/* 
===========================================================
HoloTap Engineering — HTTP Types
Engineer: E5357171 (R. Newton)
Date: 2026‑09‑02
Flow: Core Server Runtime
File: apps/server/src/types/http.ts
===========================================================
*/

export interface Request {
  body: any;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface Response {
  status(code: number): this;
  send(data: any): this;
}

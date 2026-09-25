/**
 * ============================================================
 *  HoloTap — Authentication: Session Types
 * ============================================================
 */

export type HoloTapRole = "merchant" | "admin";

export interface HoloTapSession {
  token: string;
  role: HoloTapRole;
  email: string;
  expiresAt: number;
}

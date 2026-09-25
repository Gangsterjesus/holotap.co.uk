/**
 * ============================================================
 *  HoloTap — Authentication: Session Utilities
 * ============================================================
 */

export function now(): number {
  return Date.now();
}

export function future(ms: number): number {
  return Date.now() + ms;
}

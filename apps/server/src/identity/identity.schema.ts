/*  
 *  HoloTap Engineering — Identity Schema  
 *  Engineer: E5357171  
 *  Module: Backend Identity Layer  
 *  Flow: 6 — Identity Injection  
 *  Purpose: Zod validation for identity payloads  
 */

export type IdentityPayload = {
  id: string;
  type: "user" | "merchant";
  sessionId: string;
  issuedAt: number;
  device: "mobile" | "web";
};

const isIdentityPayload = (value: unknown): value is IdentityPayload => {
  if (typeof value !== "object" || value === null) return false;

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.id === "string" &&
    (payload.type === "user" || payload.type === "merchant") &&
    typeof payload.sessionId === "string" &&
    typeof payload.issuedAt === "number" &&
    (payload.device === "mobile" || payload.device === "web")
  );
};

export const IdentityPayloadSchema = {
  parse(value: unknown): IdentityPayload {
    if (!isIdentityPayload(value)) {
      throw new Error("Invalid identity payload");
    }

    return value;
  },
  safeParse(value: unknown):
    | { success: true; data: IdentityPayload }
    | { success: false; error: Error } {
    return isIdentityPayload(value)
      ? { success: true, data: value }
      : { success: false, error: new Error("Invalid identity payload") };
  },
};

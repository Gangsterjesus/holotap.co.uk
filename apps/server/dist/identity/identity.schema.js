"use strict";
/*
 *  HoloTap Engineering — Identity Schema
 *  Engineer: E5357171
 *  Module: Backend Identity Layer
 *  Flow: 6 — Identity Injection
 *  Purpose: Zod validation for identity payloads
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityPayloadSchema = void 0;
const isIdentityPayload = (value) => {
    if (typeof value !== "object" || value === null)
        return false;
    const payload = value;
    return (typeof payload.id === "string" &&
        (payload.type === "user" || payload.type === "merchant") &&
        typeof payload.sessionId === "string" &&
        typeof payload.issuedAt === "number" &&
        (payload.device === "mobile" || payload.device === "web"));
};
exports.IdentityPayloadSchema = {
    parse(value) {
        if (!isIdentityPayload(value)) {
            throw new Error("Invalid identity payload");
        }
        return value;
    },
    safeParse(value) {
        return isIdentityPayload(value)
            ? { success: true, data: value }
            : { success: false, error: new Error("Invalid identity payload") };
    },
};

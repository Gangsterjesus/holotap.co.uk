import { FOUNDER_ID } from "../../config/founder";
import { features } from "../../config/features";
import type { Organisation } from "../../types/Organisation";

export function canAccessSecurityLayer(userId: string, org: Organisation | null) {
  if (userId === FOUNDER_ID && features.securityLayerEnabledForFounder) {
    return true;
  }

  if (!org) return false;

  return (
    features.securityLayerEnabledForTenants &&
    org.securityLayerEnabled &&
    org.licenceStatus === "active"
  );
}

import "express-serve-static-core";
import type { UnifiedActor } from "./UnifiedActor";

declare module "express-serve-static-core" {
  interface Request {
    actor?: UnifiedActor;
    correlationId?: string;
  }
}
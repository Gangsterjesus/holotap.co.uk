import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    correlationId?: string;

    actor?: {
      id?: string;
      role?: string;
      type?: string;
    };
  }
}

export {};

import { Request, Response, NextFunction } from "express";
import { resolveSession } from "../identity/resolveSession";

export async function bindSession(
  req: Request & { actor?: any; session?: any; state?: any },
  res: Response,
  next: NextFunction
) {
  try {
    const actor = req.actor;

    if (!actor) {
      req.session = null;
      req.state = null;
      return next();
    }

    const session = await resolveSession({ actor_id: actor.id });

    req.session = session;
    req.state = session?.state ?? null;

    return next();
  } catch (err) {
    console.error("Flow 7 Session Binder Error:", err);

    req.session = null;
    req.state = null;

    return next();
  }
}

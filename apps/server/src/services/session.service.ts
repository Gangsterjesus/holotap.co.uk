import { prisma } from "../db";

interface ResolveSessionArgs {
  actor_id: string;
}

export async function resolveSession(
  { actor_id }: ResolveSessionArgs
) {
  // Check if a session already exists for this actor
  let session = await prisma.sessions.findFirst({
    where: { actor_id },
  });

  // If not, create a new deterministic session
  if (!session) {
    session = await prisma.sessions.create({
      data: {
        actor_id,
        role:"user",
        state: "idle",
      },
    });
  }

  return session;
}
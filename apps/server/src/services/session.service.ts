import { prisma } from '../prisma';


export async function resolveSession({ actor_id }) {
  // Check if a session already exists for this actor
  let session = await prisma.sessions.findFirst({
    where: { actor_id },
  });

  // If not, create a new deterministic session
  if (!session) {
    session = await prisma.sessions.create({
      data: {
        actor_id,
        state: 'idle', // default Flow 7 state
      },
    });
  }

  return session;
}

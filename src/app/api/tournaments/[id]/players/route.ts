import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } } // Destructure `params` from the second argument
) {
  const { id } = params; // Access `id` after destructuring

  try {
    // Step 1: Fetch the tournament by UUID
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: id,
      },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    // Step 2: Fetch the profiles of the players in the tournament
    const playerProfiles = await prisma.profile.findMany({
      where: {
        id: {
          in: tournament.players, // Use the `players` array to filter profiles
        },
      },
    });

    return NextResponse.json(playerProfiles);
  } catch (error) {
    console.error('Error fetching tournament players:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
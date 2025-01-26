// app/api/tournaments/players/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tournamentId = searchParams.get('tournamentId');

  if (!tournamentId) {
    return NextResponse.json({ message: 'Tournament ID is required' }, { status: 400 });
  }

  try {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
      select: {
        players: true,
      },
    });

    if (tournament) {
      return NextResponse.json(tournament.players);
    } else {
      return NextResponse.json({ message: 'Tournament not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching tournament players:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { tournamentId, userId, isEnrolling } = await request.json();

  if (!tournamentId || !userId) {
    return NextResponse.json(
      { message: 'Tournament ID and User ID are required' },
      { status: 400 }
    );
  }

  try {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
      select: {
        players: true,
      },
    });

    if (!tournament) {
      return NextResponse.json({ message: 'Tournament not found' }, { status: 404 });
    }

    let updatedPlayers: string[];

    if (isEnrolling) {
      // Add the user to the players list if not already enrolled
      if (!tournament.players.includes(userId)) {
        updatedPlayers = [...tournament.players, userId];
      } else {
        updatedPlayers = tournament.players; // No change if already enrolled
      }
    } else {
      // Remove the user from the players list
      updatedPlayers = tournament.players.filter((player) => player !== userId);
    }

    // Update the tournament with the new players list
    await prisma.tournament.update({
      where: {
        id: tournamentId,
      },
      data: {
        players: updatedPlayers,
      },
    });

    return NextResponse.json({ message: 'Players list updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating tournament players:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
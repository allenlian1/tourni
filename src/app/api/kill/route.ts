import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid'); // Get the UUID from the query parameters

  if (!uuid) {
    return NextResponse.json({ message: 'UUID is required' }, { status: 400 });
  }

  try {
    // Fetch the profile using the UUID
    const profile = await prisma.profile.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!profile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
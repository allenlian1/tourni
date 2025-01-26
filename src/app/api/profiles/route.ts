import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email'); // Get the email from the query parameters

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const profile = await prisma.profile.findFirst({
      where: {
        email: email,
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
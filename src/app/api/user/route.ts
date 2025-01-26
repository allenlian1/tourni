import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await auth();

    const userData = await prisma.profile.findUnique({
        where: { 
            email: session?.user?.email! 
        },
    });

    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
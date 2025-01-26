import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const user = await prisma.profile.findUnique({
        where: { id: params.id },
      });
  
      return user 
      ? NextResponse.json({ data: user })
      : NextResponse.json({ error: "User not found" }, { status: 404 });
  
      return NextResponse.json({ data: user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
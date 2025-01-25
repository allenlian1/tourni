import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse> {
    console.log("in enroll");
    try {
        const allTournaments = await prisma.tournament.findMany();
        console.log("All Tournaments:", allTournaments);
        return NextResponse.json(allTournaments);
    } catch (err) {
        console.error("ERROR: ", err);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
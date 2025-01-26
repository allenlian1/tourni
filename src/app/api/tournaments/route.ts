import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    console.log("In tournament search");

    try {
        // Fetch tournaments from the database
        const tournaments = await prisma.tournament.findMany();
        console.log("Tournaments fetched:", JSON.stringify(tournaments, null, 2)); // Pretty-print the results

        if (!tournaments || tournaments.length === 0) {
            console.warn("No tournaments found in the database.");
        }

        return NextResponse.json(tournaments);
    } catch (err) {
        console.error("Error fetching tournaments:", err);
        return NextResponse.json(
            { error: "An error occurred while fetching tournaments" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    console.log("in tournament search");
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        console.log(query);

        const tournaments = await prisma.tournament.findMany({
            where: {
                name: {
                    contains: `${query}`,
                    mode: "insensitive"
                }
            },
        });
        console.log(JSON.stringify(tournaments));
        return NextResponse.json(tournaments);
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json(
            { error: "An error occurred while fetching profiles" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
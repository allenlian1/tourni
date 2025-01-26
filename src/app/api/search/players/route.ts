import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    console.log("in player search");
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || "";

        const filteredProfiles = await prisma.profile.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });

        console.log(filteredProfiles);
        return NextResponse.json({ filteredProfiles }, { status: 200 });
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
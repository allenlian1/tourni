import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    console.log("in search");
    try {
        const profiles = await prisma.profile.findMany({
            where: {
                name: {
                    contains: "richard",
                    mode: "insensitive"
                }
            },
        });
        return NextResponse.json(profiles);
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
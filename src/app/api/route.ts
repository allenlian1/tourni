import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Import the auth function

const prisma = new PrismaClient();

export async function GET(request: Request) {
    console.log("in player search");

    try {
        // Get the session
        const session = await auth();

        // Check if the session and user ID exist
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized: No session or user ID found" },
                { status: 401 }
            );
        }

        const query = session.user.id; // Use the session user ID
        console.log("Query:", query);

        // Fetch profiles from the database
        const profiles = await prisma.profile.findMany({
            where: {
                id: query, // No need to use template literals, as query is already a string
            },
        });

        console.log(JSON.stringify(profiles));
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
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const session = await auth();
    try {
        const email = session?.user?.email!;
        const name = session?.user?.name;
        let response;

        const filteredProfiles = await prisma.profile.findFirst({
            where: {
                email: {
                    contains: email,
                },
            },
        });

        if (!filteredProfiles) { //USER DOESN"T EXIST
           console.log("Registering new user...");

           response = await prisma.profile.create({
                data: {
                    email: email,
                    name: name,
                    elo: [500],
                }
           });

           console.log("DB RESPONSE: ", response);
        }

        console.log("Successfully registered new user!");
        return NextResponse.json({ response }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json(
            { error: "An error occurred while fetching profiles" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
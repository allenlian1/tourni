import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request){
    try {
        const { searchParams } = new URL(request.url);

        if (!searchParams.has('id')){
            console.error("Invalid Server Request")
            return NextResponse.json({error: "Invalid Server Request. Request must have an ID."}, {status: 400})
        }

        const tournament_id = searchParams.get('id');

        console.log("TOURN ID: ", tournament_id);

        const owner = await prisma.tournament.findUnique({
            where: {
                id: tournament_id!
            }
        })

        console.log("OWNER ", owner)

        return NextResponse.json({data: owner}, {status: 200});

    } catch (error){
        console.error("Internal Server Error.");
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}
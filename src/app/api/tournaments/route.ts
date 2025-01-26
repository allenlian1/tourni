import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    console.log("in tournaments");
    try {
        const tournament = await prisma.tournament.findMany();

        if (!tournament){
            console.error("No data returned")
            return NextResponse.json({error: "No data returned"}, {status: 404})
        }

        return NextResponse.json({data: tournament}, {status: 200});
    } catch (error) {
        console.error("Internal Server Error");
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request){
    try {
        const { searchParams } = new URL(request.url);
        let tournament;

        if (!searchParams.has('id')){
            tournament = await prisma.tournament.findMany({});
        } else {
            const id = searchParams.get('id');
            tournament = await prisma.tournament.findFirst({
                where:  {
                    id: {
                        equals: id!
                    }
                }
            });
        }

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
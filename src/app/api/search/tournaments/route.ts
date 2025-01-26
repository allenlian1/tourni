import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);

        if (!searchParams.has('id')){
            console.error("Invalid Server Request.")
            return NextResponse.json({error: "Invalid Server Request"}, {status: 401});
        }

        const id = searchParams.get('id');

        console.log("ID PARAM: ", id)

        const tournament = await prisma.tournament.findFirst({
            where: {
                id: {
                    equals: id ?? '',
                    // mode: "insensitive"
                }
            },
        });

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
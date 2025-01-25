"use client";

import { prisma } from "@/prisma";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const searchParams = useSearchParams();

        if (!searchParams.has('id')){
            console.error("Invalid Server Request.")
            return NextResponse.json({error: "Invalid Server Request"}, {status: 401});
        }

        const id = searchParams.get('id');

        const tournament = await prisma.tournament.findMany({
            where: {
                id: {
                    equals: id ?? '',
                    mode: "insensitive"
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
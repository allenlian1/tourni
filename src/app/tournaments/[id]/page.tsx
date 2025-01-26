"use client";
import { useEffect } from "react";

export default async function Tournament({
    params
} : {
    params: Promise<{ id: string }>
}) {

    
    useEffect(()=>{
        const fetchTournament = async () => {
            const id = (await params).id;
            const { data, error } = await fetch(`/api/search/tournaments?id=${id}`);
            const res = data.json();

            if (error) {
                console.error("Error: ", error.message);
                return;
            }

            if (!res || !data || !data[0]) {
                console.error("Error, no data returned");
                return;
            }

            console.log("DATA WORKED: ", res);

            // setInformation(res[0]);
        };

        fetchTournament();
    }, []);

    
    return (
        <div>
            <div className="m-4">
                <h2 className="flex justify-between items-center scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl mt-6 ml-4">
                    Tournament Name
                    </h2>
                <h2 className="flex justify-between items-center scroll-m-20 text-xl font-semibold tracking-tight lg:text-xl ml-4 text-gray-400">
                    Tournament Type
                </h2>
            </div>
    </div>    );
}


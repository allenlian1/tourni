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
        <div className="m-4">
            <h2>Testing</h2>
        </div>
    );
}
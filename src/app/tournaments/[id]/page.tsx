"use client";
import { useEffect, useState } from "react";

export default function Tournament({
  params,
}: {
  params: { id: string };
}) {
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/search/tournaments?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tournament data");
        }

        const data = await response.json();
        if (!data || !data[0]) {
          throw new Error("No data returned");
        }

        console.log("DATA WORKED: ", data[0]);
        setTournament(data[0]); // Set the fetched data to state
      } catch (err: any) {
        console.error("Error: ", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [params.id]); // Add params.id as a dependency

  if (loading) {
    return <div className="m-4">Loading...</div>;
  }

  if (error) {
    return <div className="m-4">Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <h2>Testing</h2>
      {tournament && (
        <div>
          <h3>{tournament.name}</h3>
          <p>Start Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
          <p>End Date: {new Date(tournament.end_date).toLocaleDateString()}</p>
          <p>Status: {tournament.status}</p>
          <p>Capacity: {tournament.capacity}</p>
        </div>
      )}
    </div>
  );
    
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
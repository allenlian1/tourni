"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TournamentTable } from "./tournament_bar";

interface TournamentData {
  id: string,
  capacity: number,
  players: string[],
  matches: string[],
  start_date: string,
  end_date: string,
  tournament_type: string,
  status: string | null,
  name: string
}

export default function Tournament({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [tournament, setTournament] = useState<TournamentData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const id = (await params).id;
        const response = await fetch(`/api/tournaments?id=${id}`);
        const res = await response.json();

        console.log("DATA WORKED: ", res);
        setTournament(res.data); // Set the fetched data to state
      } catch (err: any) {
        console.error("Error: ", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, []); // Add params.id as a dependency

  if (loading) {
    return <div className="m-4">Loading...</div>;
  }

  if (error) {
    return <div className="m-4">Error: {error}</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {tournament && (
        <div>
          <p>
            Name: {tournament.name}
          </p>
          <p>
            Start Date: {new Date(tournament.start_date).toLocaleDateString()}
          </p>
          <p>
            End Date: {new Date(tournament.end_date).toLocaleDateString()}
          </p>
          <p>
            Capacity: {tournament.capacity}
          </p>
        </div>
        )}
      <div className="flex-1 relative overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-auto">
          <TournamentTable />
        </div>
      </div>
    </div>
  );
}
"use client"; // Mark the entire page as a Client Component

import { useState, useEffect } from "react"; // Use hooks for state and effects
import { useRouter } from "next/navigation"; // Use the navigation hook
import NavBar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TournamentCard } from "@/components/tournamentCard";
import { tournament, status, tournament_types } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton"

// Extended type to include additional fields
type TournamentWithDetails = tournament & {
  sport: string;
  registrations: number;
};

// Calculate the status of a tournament based on its start and end dates
function calculateStatus(startDate: Date, endDate: Date): status {
  const now = new Date();
  if (now > endDate) return status.finished;
  if (now >= startDate && now <= endDate) return status.ongoing;
  return status.upcoming;
}

export default function TournamentsPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<TournamentWithDetails[]>([]); // State for tournaments
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(`/api/tournaments`);

        // if (!response.ok) {
        //   throw new Error("Failed to fetch tournaments");
        // }

        const data = await response.json();
        console.log("DATA DATA DATA DATA", data)

        const formattedTournaments = data.data.map((tournament: any) => ({
          ...tournament,
          start_date: new Date(tournament.start_date),
          end_date: new Date(tournament.end_date),
          status: calculateStatus(new Date(tournament.start_date), new Date(tournament.end_date)),
          sport: tournament.sport || "Badminton", // Default to "Unknown" if sport is not provided
          registrations: tournament.players?.length || 0, // Use players array length as registrations count
        }));

        setTournaments(formattedTournaments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []); // Empty dependency array ensures this runs only once on mount

  const statusOrder: Record<status, number> = {
    [status.ongoing]: 1,
    [status.upcoming]: 2,
    [status.finished]: 3,
  };

  // Sort tournaments by status and start date
  const sortedTournaments = [...tournaments].sort((a, b) => {
    const aStatus = a.status || status.upcoming;
    const bStatus = b.status || status.upcoming;

    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }

    const now = Date.now();
    const aStartDate = a.start_date ? a.start_date.getTime() : now;
    const bStartDate = b.start_date ? b.start_date.getTime() : now;

    return Math.abs(now - aStartDate) - Math.abs(now - bStartDate);
  });

  return (
    <div>
      <NavBar />
      <div className="p-4 sm:p-6 pb-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Tournaments</h1>
        <ScrollArea className="h-auto sm:h-[calc(100vh-160px)]">
          {isLoading ?
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

          : <div className="space-y-4 pr-0 sm:pr-0">
            {sortedTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                registrations={tournament.players?.length || 0}
                onClick={() => router.push(`/tournaments/${tournament.id}`)}
              />
            ))}
          </div>
}
        </ScrollArea>
      </div>
    </div>
  );
}
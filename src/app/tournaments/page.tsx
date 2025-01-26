"use client";
import NavBar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { tournaments, status, tournament_types } from "@prisma/client";
import { TournamentCard } from "@/components/tournamentCard";

// Extended type to include additional fields
type TournamentWithDetails = tournaments & {
  sport: string;
  registrations: number;
};

const generateMockTournaments = (): TournamentWithDetails[] => {
  const now = new Date();

  return Array.from({ length: 15 }).map((_, i) => {
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() + (i - 7));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);

    const status = calculateStatus(startDate, endDate);

    return {
      id: crypto.randomUUID(),
      capacity: 100,
      players: Array.from({ length: Math.floor(Math.random() * 50) + 50 }).map(
        () => crypto.randomUUID()
      ),
      matches: [],
      start_date: startDate,
      end_date: endDate,
      tournament_type: tournament_types.single_elimination,
      status,
      sport: "Badminton",
      registrations: Math.floor(Math.random() * 50) + 50,
    };
  });
};

function calculateStatus(startDate: Date, endDate: Date): status {
  const now = new Date();
  if (now > endDate) return status.finished;
  if (now >= startDate && now <= endDate) return status.ongoing;
  return status.upcoming;
}

export default function TournamentsPage() {
  const router = useRouter();
  const tournaments = generateMockTournaments();

  const statusOrder: Record<status, number> = {
    [status.ongoing]: 1,
    [status.upcoming]: 2,
    [status.finished]: 3,
  };

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
          <div className="space-y-4 pr-0 sm:pr-0">
            {sortedTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onClick={() => router.push(`/tournaments/${tournament.id}`)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

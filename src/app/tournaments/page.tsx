"use client";
import NavBar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { tournament, status, tournament_types } from "@prisma/client"; // Import Prisma types

// Extended type to include additional fields
type TournamentWithDetails = tournament & {
  sport: string;
  registrations: number;
};

// Mock data generator
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
      tournament_type: tournament_types.single_elimination, // Use Prisma-generated enum
      status, // Use Prisma-generated enum
      sport: "Badminton",
      registrations: Math.floor(Math.random() * 50) + 50,
    };
  });
};

// Helper function to calculate tournament status
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
    const aStatus = a.status || status.upcoming; // Default to 'upcoming' if null
    const bStatus = b.status || status.upcoming; // Default to 'upcoming' if null

    // Sort priority: Ongoing > Upcoming > Finished
    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }

    // For same status, sort by proximity to start date
    const now = Date.now();
    const aStartDate = a.start_date ? a.start_date.getTime() : now; // Default to now if null
    const bStartDate = b.start_date ? b.start_date.getTime() : now; // Default to now if null

    return Math.abs(now - aStartDate) - Math.abs(now - bStartDate);
  });

  return (
    <div>
      <NavBar /> {/* Add the NavBar here */}
      <div className="p-4 sm:p-6 pb-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Tournaments</h1>
        <ScrollArea className="h-auto sm:h-[calc(100vh-160px)]">
          <div className="space-y-4 pr-0 sm:pr-4">
            {sortedTournaments.map((tournament) => (
              <Card
                key={tournament.id}
                onClick={() => router.push(`/tournaments/${tournament.id}`)}
                className="cursor-pointer transition-all hover:bg-muted/50 p-0" // Remove padding here
              >
                <div className="flex flex-col sm:flex-row items-start">
                  {/* Tournament Image */}
                  <div className="relative w-full sm:w-56 h-32 sm:h-28 flex-shrink-0 rounded-t-md sm:rounded-l-md sm:rounded-t-none overflow-hidden"> {/* Rounded left edges */}
                    <Image
                      src="/badminton-banner.png"
                      alt="Tournament banner"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Tournament Details */}
                  <div className="p-4 sm:p-6 flex-1"> {/* Add padding here for the details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        {tournament.tournament_type} Tournament
                      </h2>
                      <Badge variant={tournament.status === status.ongoing ? "default" : "secondary"}>
                        {tournament.status}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/badminton-icon.svg"
                          alt="Sport icon"
                          width={20}
                          height={20}
                        />
                        <span>{tournament.sport}</span>
                      </div>

                      <span className="hidden sm:block">•</span>

                      <span>
                        {tournament.start_date ? tournament.start_date.toLocaleDateString() : null} -{" "}
                        {tournament.end_date ? tournament.end_date.toLocaleDateString() : null}
                      </span>

                      <span className="hidden sm:block">•</span>

                      <span>
                        {tournament.players.length}/{tournament.capacity} 
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
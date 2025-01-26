import { tournament, status } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { User } from "next-auth";
import { Card } from "@/components/ui/card";

interface TournamentCardProps {
  tournament: tournament,
  registrations: number,
  onClick: () => void
}

export function TournamentCard({ tournament, registrations, onClick }: TournamentCardProps) {
  console.log("Tournament Card Props:", { tournament, registrations }); // Add this line
  // console.log("TOURNAMENT: ", tournament.name)
    return (
      <Card
        onClick={onClick}
        className="sm:h-32 h-auto cursor-pointer transition-all hover:bg-muted/50 p-0 mb-4"
      >
        <div className="flex flex-col sm:flex-row w-full">
          {/* Tournament Image */}
          <div className="relative w-full sm:w-56 h-32 sm:h-32 flex-shrink-0 rounded-t-md sm:rounded-l-md sm:rounded-r-none overflow-hidden">
            <Image
              src="/badminton-banner.png"
              alt="Tournament banner"
              fill
              className="object-cover"
            />
          </div>
  
          {/* Tournament Details */}
          <div className="p-4 sm:p-6 flex-1">
            

          <div className="flex items-center justify-between">
            {/* Tournament Name */}
            <h2 className="text-base sm:text-lg font-semibold text-white truncate">
              {tournament.name}
            </h2>

            {/* Badge aligned to the right */}
            <Badge
              variant={tournament.status === status.ongoing ? "default" : "secondary"}
              className="ml-auto"
            >
              {tournament.status}
            </Badge>
          </div>         
  
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image
                  src="/badminton-icon.svg"
                  alt="Sport icon"
                  width={20}
                  height={20}
                />
                {/* <span>{tournament.sport}</span> */}
              </div>
  
              <span className="hidden sm:block">•</span>
  
              <span>
                {tournament.start_date?.toLocaleDateString()} -{" "}
                {tournament.end_date?.toLocaleDateString()}
              </span>
  
              <span className="hidden sm:block">•</span>
  
              <span>
                {tournament.players.length}/{tournament.capacity}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

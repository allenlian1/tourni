"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar components

// Mock type for search results
type SearchResult = {
  id: string;
  name: string;
  type: "player" | "tournament";
  sport: string;
  image?: string; 
  start_date?: Date;
  end_date?: Date;
  status?: string;
  capacity?: number;
  players?: string[];
};

import { ELOCard, CardProps } from "@/components/playerCard";

export function Slider() {
  const router = useRouter();
  const [profileInput, setProfileInput] = useState("");
  const [tournamentInput, setTournamentInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [eloCards, setEloCards] = useState<CardProps[]>([]); 

  const handleProfileInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const response = await fetch(`/api/search/players?q=${profileInput}`);
        const data = await response.json();

        const profiles = data.filteredProfiles.map((profile: any) => ({
          user: profile.name,
          elo: profile.elo[profile.elo.length - 1],
          w: "w-4/5",
          h: "h-100",
          isKillCard: false 
        }));
        
        setEloCards(profiles);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
  };

  const handleTournamentInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const response = await fetch(`/api/search/tournaments?q=${tournamentInput}`);
        const data = await response.json();
        console.log(data);

        const tournaments = data.map((tournament: any) => ({
          id: tournament.id,
          name: tournament.name,
          type: "tournament",
          sport: tournament.sport || "Unknown",
          start_date: tournament.start_date ? new Date(tournament.start_date) : null,
          end_date: tournament.end_date ? new Date(tournament.end_date) : null,
          status: tournament.status || "Unknown",
          capacity: tournament.capacity || 0,
          players: tournament.players || [],
        }));
  
        setSearchResults(tournaments);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
  };
  

  return (
    <Tabs defaultValue="players" className="w-full max-w-[1600px] mx-auto px-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
      </TabsList>

      <TabsContent value="players">
        <Card>
          <CardContent className="p-0 pt-0">
            <div className="space-y-1 p-4">
              <Input
                id="input_profile"
                value={profileInput}
                onChange={(e) => setProfileInput(e.target.value)}
                onKeyDown={handleProfileInputKeyDown}
                placeholder="Search for players here"
                className="p-3"
              />
            </div>
            <div className="space-y-4">
              {eloCards.map((props, index) => (
                <ELOCard key={index} {...props} />
              ))}
            </div>
          </CardContent>
        </Card>
        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          <div className="space-y-4 pr-0 sm:pr-4">
            {searchResults
              .filter((result) => result.type === "player")
              .map((result) => (
                <Card
                  key={result.id}
                  onClick={() => router.push(`/players/${result.id}`)}
                  className="cursor-pointer transition-all hover:bg-muted/50 p-0"
                >
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="p-4 sm:p-6 flex-shrink-0">
                        <Avatar className="h-16 w-16 rounded-lg">
                          <AvatarImage src={result.image} alt={result.name} />
                          <AvatarFallback className="rounded-lg">
                            {result.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold">
                          {result.name}
                        </h2>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/badminton-icon.svg"
                            alt="Sport icon"
                            width={20}
                            height={20}
                          />
                          <span>{result.sport}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="tournaments">
        <Card>
          <CardContent className="p-0 pt-0">
            <div className="space-y-1 p-4">
              <Input
                id="input_tournament"
                value={tournamentInput}
                onChange={(e) => setTournamentInput(e.target.value)}
                onKeyDown={handleTournamentInputKeyDown}
                placeholder="Search for tournaments here"
                className="p-3"
              />
            </div>
          </CardContent>
        </Card>
        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          <div className="space-y-4 pr-0 sm:pr-4">
            {searchResults
              .filter((result) => result.type === "tournament")
              .map((result) => (
                <Card
                  key={result.id}
                  onClick={() => router.push(`/tournaments/${result.id}`)}
                  className="cursor-pointer transition-all hover:bg-muted/50 p-0"
                >
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="relative w-full sm:w-56 h-32 sm:h-28 flex-shrink-0 rounded-t-md sm:rounded-l-md sm:rounded-t-none overflow-hidden">
                      <Image
                        src="/badminton-banner.png"
                        alt="Tournament banner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold">
                          {result.name}
                        </h2>
                        <Badge variant={result.status === "ongoing" ? "default" : "secondary"}>
                          {result.status}
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
                          <span>{result.sport}</span>
                        </div>
                        <span className="hidden sm:block">•</span>
                        <span>
                          {result.start_date?.toLocaleDateString()} -{" "}
                          {result.end_date?.toLocaleDateString()}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span>
                          {result.players?.length}/{result.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
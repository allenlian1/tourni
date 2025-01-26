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

export function Slider() {
  const router = useRouter();
  const [profileInput, setProfileInput] = useState("");
  const [tournamentInput, setTournamentInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleProfileInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const data = await fetch(`/api/search/players?q=${profileInput}`);
      const results = await data.json();
      setSearchResults(results.map((result: any) => ({
        id: result.id,
        name: result.name,
        type: "player",
        sport: result.sport,
      })));
    }
  };

  const handleTournamentInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const data = await fetch(`/api/search/tournaments?q=${tournamentInput}`);
      const results = await data.json();
      setSearchResults(results.map((result: any) => ({
        id: result.id,
        name: result.name,
        type: "tournament",
        sport: result.sport,
        start_date: new Date(result.start_date),
        end_date: new Date(result.end_date),
        status: result.status,
        capacity: result.capacity,
        players: result.players,
      })));
    }
  };

  return (
    <Tabs defaultValue="players" className="w-[600px]">
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
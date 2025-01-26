"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ELOCard, CardProps } from "@/components/playerCard";

export function Slider() {
  const [profileInput, setProfileInput] = useState("");
  const [tournamentInput, setTournamentInput] = useState("");
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
      const data = await fetch(`/api/search/tournaments?q=${tournamentInput}`);
      const tournament = await data.json();
    }
  };

  return (
    <Tabs defaultValue="profiles" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
      </TabsList>

      <TabsContent value="players">
        <Card>
          <CardDescription>Search for profiles here.</CardDescription>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                id="input_profile"
                value={profileInput}
                onChange={(e) => setProfileInput(e.target.value)}
                onKeyDown={handleProfileInputKeyDown}
              />
            </div>
            <div className="space-y-4">
              {eloCards.map((props, index) => (
                <ELOCard key={index} {...props} />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tournaments">
        <Card>
          <CardDescription>Search for tournaments here.</CardDescription>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                id="input_tournament"
                value={tournamentInput} // Bind the input value to state
                onChange={(e) => setTournamentInput(e.target.value)} // Update state on change
                onKeyDown={handleTournamentInputKeyDown} // Handle Enter key press
              />
            </div>

          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
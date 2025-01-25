"use client"; // Ensure this is at the top of the file
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function Slider() {
  // State to store the input values
  const [profileInput, setProfileInput] = useState("");
  const [tournamentInput, setTournamentInput] = useState("");
  const [results, setResults] = useState();

  const handleProfileInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const data = await fetch(`/api/search?q=${profileInput}`);
      const profile = await data.json();
    }
  };

  const handleTournamentInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const data = await fetch(`/api/search?q=${tournamentInput}`);
      const tournament = await data.json();
    }
  };

  return (
    <Tabs defaultValue="profiles" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
      </TabsList>
      <TabsContent value="profiles">
        <Card>
          <CardDescription>Search for profiles here.</CardDescription>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <Input
              id="input_profile"
              value={profileInput}
              onChange={(e) => setProfileInput(e.target.value)} // Update state on change
              onKeyDown={handleProfileInputKeyDown}
            />
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
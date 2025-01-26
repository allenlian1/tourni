'use client'; // Mark this as a Client Component

import { Button } from "@/components/ui/button";
import { ELOCard } from "@/components/playerCard";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Player {
  id: string;
  name: string | null;
  elo: number[];
  email: string;
  image?: string | null;
}

export function PlayerSection() {
  const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment
  const [players, setPlayers] = useState<Player[]>([]); // State to store players
  const params = useParams();
  const tournamentId = params.id as string; // Extract the `id` from the URL
  const { data: session, status } = useSession();
  const email = session?.user?.email; // Get the user's email from the session

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`/api/tournaments/${tournamentId}/players`);
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        console.log("daaata: ", data);
        setPlayers(data); // Update the players state
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
  
    fetchPlayers();
  }, [tournamentId]);

  const handleEnrollClick = async () => {
    const newEnrollmentState = !isEnrolled; // Toggle the state
    setIsEnrolled(newEnrollmentState); // Update the state

    if (!email) {
      console.error('User email is missing');
      return;
    }

    try {
      // Step 1: Fetch the user's profile ID using their email
      const profileResponse = await fetch(`/api/profiles?email=${email}`);
      if (!profileResponse.ok) {
        console.error('Failed to fetch profile');
        return;
      }
      const profile = await profileResponse.json();
      const userId = profile.id; // Extract the user's profile ID

      // Step 2: Update the tournament's players list
      const response = await fetch('/api/tournaments/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournamentId,
          userId,
          isEnrolling: newEnrollmentState,
        }),
      });

      if (response.ok) {
        console.log('Enrollment status updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to update enrollment status:', errorData);
        setIsEnrolled(isEnrolled); // Revert the state if the request fails
      }
    } catch (error) {
      console.error('Error updating enrollment status:', error);
      setIsEnrolled(isEnrolled); // Revert the state if there's an error
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="m-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
            Players
          </h1>
          <Button
            type="button"
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                isEnrolled ? "bg-[#2F7D33] hover:bg-[#859874]" : "bg-primary hover:bg-primary/90"
            } h-10 px-4 py-2`}
            onClick={handleEnrollClick}
          >
            {isEnrolled ? "Enrolled" : "Enroll"}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {players.map((player) => (
            <ELOCard
              key={player.id}
              user={player.name || "User"} // Handle null name
              elo={player.elo?.length > 0 ? player.elo[0] : 1500} // Handle empty elo array
              w={"w-full"}
              h={"h-50"}
              isKillCard={true}
            />
          ))}
        </div>
        <div className="pt-4 pb-20"></div>
      </div>
    </div>
  );
}
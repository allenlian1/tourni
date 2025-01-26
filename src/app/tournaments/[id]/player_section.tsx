'use client'; // Mark this as a Client Component

import { Button } from "@/components/ui/button";
import { ELOCard } from "@/components/playerCard";
import React, { useState } from "react";
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function PlayerSection() {
  const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment
  const params = useParams();
  const tournamentId = params.id as string; // Extract the `id` from the URL
  const { data: session, status } = useSession();
  const email = session?.user?.email; // Get the user's email from the session

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
          <ELOCard user={"h"} elo={1500} w={"w-full"} h={"h-50"} isKillCard={true} />
          <ELOCard user={"h"} elo={1000} w={"w-full"} h={"h-50"} isKillCard={true} />
          <ELOCard user={"h"} elo={2000} w={"w-full"} h={"h-50"} isKillCard={true} />
          <ELOCard user={"h"} elo={100} w={"w-full"} h={"h-50"} isKillCard={true} />
          <ELOCard user={"h"} elo={1300} w={"w-full"} h={"h-50"} isKillCard={true} />
          <ELOCard user={"h"} elo={1100} w={"w-full"} h={"h-50"} isKillCard={true} />
        </div>
        <div className="pt-4 pb-20"></div>
      </div>
    </div>
  );
}
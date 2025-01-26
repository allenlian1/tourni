"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ELOCard } from "@/components/playerCard";
import { profile } from "@prisma/client";
import { logout } from "@/lib/actions/auth";

export default function AccountPage() {
  const { data: session, status } = useSession(); // Get the user's session
  const [userData, setUserData] = useState<profile | null>(null); // State to store user data
  const [killProfiles, setKillProfiles] = useState<profile[]>([]); // State to store profiles of kill cards
  const [isLoading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    // Only fetch data if the session is available and contains the user's email
    if (status === "authenticated" && session?.user?.email) {
      const fetchData = async () => {
        try {
          // Step 1: Fetch the user's profile data using their email
          const profileResponse = await fetch(`/api/profiles?email=${encodeURIComponent(session?.user?.email)}`);
          if (!profileResponse.ok) {
            throw new Error("Failed to fetch profile");
          }
          const profileData = await profileResponse.json();
          console.log("Profile data:", profileData);

          setUserData(profileData); // Update the state with the fetched data

          // Step 2: Fetch profiles for each email in the kill array
          const killProfilePromises = profileData.cards.map(async (email: string) => {
            const cardResponse = await fetch(`/api/profiles?email=${encodeURIComponent(email)}`);
            if (!cardResponse.ok) {
              throw new Error(`Failed to fetch profile for email: ${email}`);
            }
            return cardResponse.json();
          });

          const killProfiles = await Promise.all(killProfilePromises);
          setKillProfiles(killProfiles); // Update the state with the fetched kill profiles
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchData();
    } else if (status === "unauthenticated") {
      // Redirect to login if the user is not authenticated
      router.push("/login");
    } else {
      setLoading(false); // Set loading to false if no session is available
    }
  }, [session, status, router]); // Re-run effect when session or status changes

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading state
  }

  if (!userData) {
    return <div>No user data found.</div>; // Handle case where no data is fetched
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-svh text-white">
      <NavBar />
      <div>
        <h1 className="flex justify-center pt-10">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userData.image || "null"} alt="User Avatar" />
            <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </h1>
        <div className="flex justify-center scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl mt-4">
          {userData.name || "Unknown User"}
        </div>
        <div className="flex justify-center scroll-m-20 text-medium font-semibold tracking-tight text-gray-500 lg:text-3xl mt-1">
          {userData.email}
        </div>

        <ELOCard
          user={userData.name || "User"}
          elo={userData.elo?.length > 0 ? userData.elo[0] : 1500} // Handle undefined or empty elo array
          w={"w-1/2"}
          h={"h-full"}
        />

        <div className="m-6">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
            Kills
          </h1>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {killProfiles.length > 0 ? (
              killProfiles.map((profile, index) => (
                <ELOCard
                  key={index}
                  user={profile.name || "User"} // Use the profile's name
                  elo={profile.elo?.length > 0 ? profile.elo[0] : 1500} // Use the profile's elo
                  w={"w-full"}
                  h={"h-50"}
                  isKillCard={true}
                />
              ))
            ) : (
              <p className="text-gray-500">No cards found.</p> // Fallback message for empty cards
            )}
          </div>
        </div>
        <div className="flex justify-center pt-4 pb-20">
          <Button
            className="bg-white text-muted hover:bg-muted hover:text-white"
            variant="destructive"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
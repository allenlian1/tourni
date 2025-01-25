"use server";
import { auth } from "@/auth";
import Dashboard from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

export default async function Home() {
  const session = await auth();
  const matches = [
    { date: "Jan 26, 2025", team1: "Team A", team2: "Team B", time: "5:00 PM" },
    { date: "Jan 27, 2025", team1: "Team A", team2: "Team C", time: "6:30 PM" },
    { date: "Jan 28, 2025", team1: "Team A", team2: "Team D", time: "8:00 PM" },];
    const playerStats = { name: "Player 1", matchesPlayed: 10, matchesWon: 7, matchesLost: 3, elo: 1500 };

  if (!session?.user){
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center gap-2 self-center font-medium">
            <img
              src="crown-white.png"
              alt="Tourni Logo"
              className="h-6 w-6 rounded-md object-cover"
            />
            tourni
          </a>
          <LoginForm />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          <Dashboard user={session.user}/> 
          {/* Replace ^ with {children} */}
          <section>
                <h2 className="m-6 text-2xl font-bold mb-4">Upcoming Matches</h2>
                <div className="m-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.map((match, index) => (
                        <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                            <p className="text-sm text-gray-400">{match.date}</p>
                            <h3 className="text-lg font-semibold">{match.team1} vs {match.team2}</h3>
                            <p className="text-sm text-gray-400">{match.time}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="m-6 text-2xl font-bold mb-4">Your Stats</h2>
                <div className="m-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Matches Played</h3>
                        <p className="text-sm text-gray-400">{playerStats.matchesPlayed}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Matches Won</h3>
                        <p className="text-sm text-gray-400">{playerStats.matchesWon}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Matches Lost</h3>
                        <p className="text-sm text-gray-400">{playerStats.matchesLost}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Elo</h3>
                        <p className="text-sm text-gray-400">{playerStats.elo}</p>
                    </div>
                </div>
            </section>
          <NavBar user={session.user} />
        </h1>
      </div>
    );
  }
}
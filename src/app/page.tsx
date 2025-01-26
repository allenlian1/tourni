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
    { date: "Jan 26, 2025", team1: "Chargers", team2: "Hawks", time: "5:00 PM" },
    { date: "Jan 27, 2025", team1: "Raiders", team2: "Rebels", time: "6:30 PM" },
    { date: "Jan 28, 2025", team1: "Lions", team2: "Spartans", time: "8:00 PM" },
  ];
  const playerStats = { 
    name: session?.user?.name, 
    matchesPlayed: 11, 
    matchesWon: 7, 
    matchesLost: 3, 
    elo: 1500 
  };

  if (!session?.user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center gap-2 self-center font-medium text-white hover:text-gray-300 transition-colors">
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
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-svh text-white">
        <NavBar user={session.user} />
        <div className="container mx-auto p-6">
          <Dashboard user={session.user} />
          <section className="my-8">
            <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold">{match.team1} vs {match.team2}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-400">{match.date}</p>
                    <p className="text-sm text-gray-400">{match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="my-8">
            <h2 className="text-3xl font-bold mb-6">Your Stats</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Played</h3>
                <p className="text-sm text-gray-400">{playerStats.matchesPlayed}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Won</h3>
                <p className="text-sm text-gray-400">{playerStats.matchesWon}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Lost</h3>
                <p className="text-sm text-gray-400">{playerStats.matchesLost}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Elo</h3>
                <p className="text-sm text-gray-400">{playerStats.elo}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
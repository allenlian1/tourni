"use server";
import { auth } from "@/auth";
import Dashboard from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

export default async function Home() {
  const session = await auth();

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
          <NavBar user={session.user} />
        </h1>
      </div>
    );
  }
}
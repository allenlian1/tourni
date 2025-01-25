"use client";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

export default function Home() {
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
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          You are Not Signed In
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

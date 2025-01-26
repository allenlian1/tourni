"use client";
import Bracket from "@/temp_bracket";
import NavBar from "@/components/navbar";

export default function SearchPage() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar /> 
      <div className="flex-1 relative overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-auto">
          <Bracket />
        </div>
      </div>
    </div>
  );
}
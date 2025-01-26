"use client";
import { Slider } from "@/components/ui/slider";


export default function SearchPage() {
    return (
      <div className="w-full flex-col justify-center items-center">
        <div className="w-11/12 flex flex-col justify-center items-center pt-4 pl-4">
          <h1 className="w-full text-align-left text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Search
          </h1>
          <Slider />
        </div>
      </div>
    );
  }
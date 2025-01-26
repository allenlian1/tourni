"use client";
import { Slider } from "@/app/search/search_bar";


export default function SearchPage() {
    return (
      <div className="w-full flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-svh text-white">
        <div className="w-11/12 flex flex-col justify-center items-center pt-4 pl-4">
          <h1 className="w-full text-align-left text-2xl sm:text-3xl font-bold pb-4 sm:pb-6">
            Search
          </h1>
          <Slider />
        </div>
      </div>
    );
  }
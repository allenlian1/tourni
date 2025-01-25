"use client";
import { Slider } from "@/components/ui/slider";


export default function EnrollPage() {
    return (
      <div className="w-full flex-col justify-center items-center">
        <div className="w-11/12 flex flex-col justify-center items-center">
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl">
            Search
          </h1>
          <Slider />
        </div>
      </div>
    );
  }
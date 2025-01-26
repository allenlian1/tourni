"use client";
import Bracket from "@/bracket_test";


export default function BracketsPage() {
    console.log("hello world");
    return (
      <div className="w-full flex-col justify-center items-center">
        <div className="w-11/12 flex flex-col justify-center items-center pt-4 pl-4">
          <Bracket/>
        </div>
      </div>
    );
  }
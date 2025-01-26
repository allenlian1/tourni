"use client";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { logout } from "@/lib/actions/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ELOCard } from "@/components/playerCard";
import { User } from "@auth/core/types";
import { profile } from "@prisma/client";

export default function AccountPage() {
  const [userData, setUserData] = useState<profile>();
  const [isLoading, setLoading] = useState<boolean>(true);
 
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user`);
        const res = await response.json();
    
        console.log("DATA BEING DISPLAYED", res.data)
    
        setUserData(res.data);
        setLoading(false);
    
      } catch (error) {
        console.error(error);
        return;
      }
    }

    fetchData();
  }, []);

    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-svh text-white">
        {isLoading
        ?<></>
        : <div>
        <h1 className="flex justify-center pt-10">
          <Avatar className="h-16 w-16">
            {/* <AvatarImage src={session?.user?.image!} alt="@shadcn" /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </h1>
        <div className=" flex justify-center scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl mt-4">
          {/* {session?.user?.name} */}
          {userData!.name}
        </div>
        <div className=" flex justify-center scroll-m-20 text-medium font-semibold tracking-tight text-gray-500 lg:text-3xl mt-1">
          {/* {session?.user?.email} */}
        </div>

        <ELOCard user={"Ramil"} elo={1500} w={"w-1/2"} h={"h-full"}/>

        <div className="m-6">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
            Kills
          </h1>

          <div className="grid grid-cols-3 gap-4 mt-4">
          {userData!.cards.map((card)=>
          <ELOCard user={card} elo={1500} w={"w-full"} h={"h-50"} isKillCard={true}/>)}
          </div>
        </div>
        <div className="flex justify-center pt-4 pb-20">
          <Button className="bg-white text-muted hover:bg-muted hover:text-white" variant="destructive" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
}
      </div>
    );
  }
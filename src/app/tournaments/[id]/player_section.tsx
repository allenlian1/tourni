import { Button } from "@/components/ui/button"
import { ELOCard } from "@/components/playerCard";

export function PlayerSection() {
    return (
        <div className="h-screen flex flex-col">
            <div className="m-6 flex-1">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
                        Players
                    </h1>
                    <Button className="ml-4">Enroll</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <ELOCard user={"h"} elo={1500} w={"w-full"} h={"h-50"} isKillCard={true}/>
                    <ELOCard user={"h"} elo={1000} w={"w-full"} h={"h-50"} isKillCard={true}/>
                    <ELOCard user={"h"} elo={2000} w={"w-full"} h={"h-50"} isKillCard={true}/>
                    <ELOCard user={"h"} elo={100} w={"w-full"} h={"h-50"} isKillCard={true}/>
                    <ELOCard user={"h"} elo={1300} w={"w-full"} h={"h-50"} isKillCard={true}/>
                    <ELOCard user={"h"} elo={1100} w={"w-full"} h={"h-50"} isKillCard={true}/>
                </div>
                <div className="pt-4 pb-20">
                </div>
            </div>
        </div>
    )
}
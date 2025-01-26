import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardProps {
    user: User
}

export default function Dashboard({ user } : DashboardProps){
    return (
        <div>
            <div className="flex justify-between items-center scroll-m-20 text-xl font-semibold tracking-tight lg:text-3xl mt-6 m-4">
                <span>Welcome to tourni!</span>
                <Avatar className="h-12 w-12 ml-2 rounded-lg text-3xl">
                    <AvatarImage src={user?.image!} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
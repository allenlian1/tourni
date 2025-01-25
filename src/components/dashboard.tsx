import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardProps {
    user: User
}

export default function Dashboard({ user } : DashboardProps){
    return (
        <div>
            <div>
                Welcome back, {user.name} <br/>
                {user.email}
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image!} alt={user.name!} />
                    <AvatarFallback className="rounded-lg"></AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
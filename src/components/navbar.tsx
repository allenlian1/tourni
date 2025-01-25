import { User } from "next-auth"
import { HomeIcon, PlusCircle, Search, Settings } from "lucide-react";

interface NavBarProps {
    user: User
}

const btns = [ 
    {
        icon: HomeIcon,
        title: "Home"
    },
    {
        icon: Search,
        title: "Search",
    },
    {
        icon: PlusCircle,
        title: "Enroll"
    },
    {
        icon: Settings,
        title: "Settings"
    }
]

export default function NavBar( { user } : NavBarProps){
    return (
        <div className="w-full flex flex-row justify-center items-center">
            <div className="fixed bottom-3 h-14 w-screen bg-muted rounded-lg">
                <div className="flex flex-row justify-between items-center mx-5">
                    {
                        btns.map((navItem)=> {
                            return <div key={navItem.title} className="flex flex-col justify-center items-center gap-y-2">
                                <navItem.icon className="h-4"/>
                                <p className="text-muted-foreground text-sm">
                                    {navItem.title}
                                </p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}
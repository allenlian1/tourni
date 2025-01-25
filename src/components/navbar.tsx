"use client"; // Mark this as a Client Component

import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { CalendarCheck2, HomeIcon, PlusCircle, Search, Settings } from "lucide-react";

interface NavBarProps {
  user?: User;
}

const btns = [
  {
    icon: HomeIcon,
    title: "Home",
    route: "/",
  },
  {
    icon: CalendarCheck2,
    title: "Tournaments",
    route: "/tournaments",
  },
  {
    icon: Search,
    title: "Search",
    route: "/search",
  },
  {
    icon: Settings,
    title: "Account",
    route: "/account",
  },
];

export default function NavBar({ user }: NavBarProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 h-16 bg-muted">
      <div className="flex flex-row justify-between items-center h-full mx-5">
        {btns.map((navItem) => (
          <div
            key={navItem.title}
            onClick={() => router.push(navItem.route)}
            className="flex flex-col justify-center items-center gap-y-1 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <navItem.icon className="h-4" />
            <p className="text-muted-foreground text-sm">{navItem.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
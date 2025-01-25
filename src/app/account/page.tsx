import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { logout } from "@/lib/actions/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default async function AccountPage() {
  const session = await auth();
    return (
      <div>
        <h1 className="flex justify-center mt-10">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session?.user?.image!} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </h1>
        <div className=" flex justify-center scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl mt-4">
          {session?.user?.name}
        </div>
        <div className=" flex justify-center scroll-m-20 text-medium font-semibold tracking-tight text-gray-500 lg:text-3xl mt-1">
          {session?.user?.email}
        </div>
        <div className="flex justify-center mt-4">
          <img
            src="playerCard.png"
            alt="Player Card"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-white text-muted hover:bg-muted hover:text-white" variant="destructive" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
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
import { ELOCard } from "@/components/playerCard";

export default async function AccountPage() {

  const session = await auth();
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-svh text-white"></div>
    );
}
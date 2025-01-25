"use client"; // Mark this as a Client Component

import NavBar from "@/components/navbar";
import { User } from "next-auth";

interface NavBarWrapperProps {
  user: User;
}

export default function NavBarWrapper({ user }: NavBarWrapperProps) {
  return <NavBar user={user} />;
}
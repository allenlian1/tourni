// import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// const prisma = new PrismaClient();
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Google],
    // adapter: PrismaAdapter(prisma)
});
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/prisma";

// const prisma = new PrismaClient();
export const { auth, handlers, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [Google],
});
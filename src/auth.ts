import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// const prisma = new PrismaClient();
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Google],
})
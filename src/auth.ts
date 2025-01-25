// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/prisma"
// import Google from "@auth/core/providers/google"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [Google],
// })

import NextAuth from "next-auth"
import Google from "@auth/core/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google],
})
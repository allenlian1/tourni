"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
    await signIn("google", { redirectTo: '/api/register' });
}

export const logout = async () => {
    await signOut({ redirectTo: '/' })
}
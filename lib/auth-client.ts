import { createAuthClient } from "better-auth/react";

// Gunakan URL relatif untuk menghindari masalah CORS
// Ini akan selalu mengarah ke origin yang sama dengan aplikasi
export const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
} = authClient;
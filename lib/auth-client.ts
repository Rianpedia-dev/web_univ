import { createAuthClient } from "better-auth/react";

// Gunakan URL relatif untuk menghindari masalah CORS
// Ini akan selalu mengarah ke origin yang sama dengan aplikasi
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000"),
    fetchOptions: {
        onError: async (context) => {
            // Log error untuk debugging
            console.warn('Auth error:', context.error?.message);

            // Jika error "User not found", berarti session cookie invalid
            // Biarkan error ini lewat (tidak throw), client akan handle dengan session = null
            if (context.error?.message?.includes('User not found')) {
                console.warn('Session cookie invalid, user not found in database');
                // Tidak throw error - biarkan session menjadi null
                return;
            }
        },
    },
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
} = authClient;
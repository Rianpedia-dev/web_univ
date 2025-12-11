import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

// Fungsi untuk mendapatkan session pengguna
export async function getCurrentUser() {
  try {
    // Dapatkan cookie dari server component
    const cookieStore = cookies();
    const cookieString = cookieStore.toString();

    // Gunakan API auth langsung untuk mendapatkan session
    const session = await auth.api.getSession({
      headers: {
        cookie: cookieString,
      },
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Fungsi untuk mengecek apakah pengguna adalah admin
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Fungsi untuk mengecek role pengguna
export async function hasRole(role: string): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.role === role;
  } catch (error) {
    console.error(`Error checking role ${role}:`, error);
    return false;
  }
}

// Fungsi helper untuk role
export const ROLES = {
  PUBLIC: "public",
  ADMIN: "admin",
} as const;

export type UserRole = keyof typeof ROLES;
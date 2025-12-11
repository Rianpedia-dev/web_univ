import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Fungsi middleware untuk proteksi route berdasarkan role
export async function withRoleProtection(
  req: NextRequest,
  roles: string[] = ["admin"],
  locale: string = "id"
) {
  // Ambil session dari request
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  // Jika tidak ada session, redirect ke login
  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
  }

  // Jika pengguna tidak memiliki role yang diperlukan
  const userRole = session.user?.role || "public";
  if (!roles.includes(userRole)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return null; // Tidak ada proteksi
}

// Fungsi proteksi untuk route admin
export async function adminOnly(
  req: NextRequest,
  locale: string = "id"
) {
  return withRoleProtection(req, ["admin"], locale);
}
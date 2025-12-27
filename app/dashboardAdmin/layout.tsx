import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

import "@/app/dashboardAdmin/theme.css"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Jika tidak ada session, redirect ke halaman sign-in
  if (!session) {
    redirect("/sign-in")
  }

  // Cek apakah user memiliki role admin
  // Jika bukan admin, redirect ke halaman utama
  if (session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
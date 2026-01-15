import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

import "@/app/dashboardAdmin/theme.css"

export default async function DashboardAdminStaffLayout({
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

    // Cek apakah user memiliki role adminstaff
    // Jika bukan adminstaff, redirect berdasarkan role
    if (session.user.role !== "adminstaff") {
        if (session.user.role === "admin") {
            redirect("/dashboardAdmin")
        }
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    )
}

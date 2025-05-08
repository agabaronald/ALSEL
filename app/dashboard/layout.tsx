import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { UserSidebar } from "@/components/dashboard/user-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}


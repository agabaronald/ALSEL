import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ShoppingBag, Heart, MessageSquare } from "lucide-react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import prisma from "@/lib/db"
import { UserActivity } from "@/components/dashboard/user-activity"
import { RecentMessages } from "@/components/dashboard/recent-messages"

export default async function UserDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  // Fetch user data
  const userId = session.user.id

  const activeListings = await prisma.product.count({
    where: {
      sellerId: userId,
      status: "active",
    },
  })

  const soldListings = await prisma.product.count({
    where: {
      sellerId: userId,
      status: "sold",
    },
  })

  const savedItems = await prisma.savedProduct.count({
    where: {
      userId,
    },
  })

  const unreadMessages = await prisma.message.count({
    where: {
      receiverId: userId,
      isRead: false,
    },
  })

  // Calculate total sales (in a real app, this would come from transactions)
  const totalSales = 1250.75

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">${totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <ShoppingBag className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{activeListings}</div>
                <p className="text-xs text-muted-foreground">{soldListings} items sold</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                <Heart className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{savedItems}</div>
                <p className="text-xs text-muted-foreground">Items you're interested in</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{unreadMessages}</div>
                <p className="text-xs text-muted-foreground">
                  {unreadMessages > 0 ? "Waiting for your response" : "All caught up!"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-gold-200 dark:border-gold-800">
              <CardHeader>
                <CardTitle>Activity</CardTitle>
                <CardDescription>Your recent marketplace activity</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UserActivity userId={userId} />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-gold-200 dark:border-gold-800">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Your latest conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentMessages userId={userId} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed statistics about your marketplace activity.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Analytics content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Your recent actions and notifications.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Activity log will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


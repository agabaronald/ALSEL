import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/admin/overview"
import { RecentSales } from "@/components/admin/recent-sales"
import { DollarSign, Users, ShoppingBag, AlertTriangle } from "lucide-react"
import prisma from "@/lib/db"

export default async function AdminDashboard() {
  // Fetch dashboard data
  const userCount = await prisma.user.count()
  const productCount = await prisma.product.count()
  const activeProductCount = await prisma.product.count({
    where: { status: "active" },
  })
  const reportCount = await prisma.report.count({
    where: { status: "pending" },
  })

  // Calculate total sales value (in a real app, this would come from transactions)
  const totalSalesValue = 12580.5

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">${totalSalesValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                <Users className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{userCount}</div>
                <p className="text-xs text-muted-foreground">+180 new users this week</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <ShoppingBag className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{activeProductCount}</div>
                <p className="text-xs text-muted-foreground">{productCount} total listings</p>
              </CardContent>
            </Card>
            <Card className="border-gold-200 dark:border-gold-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">{reportCount}</div>
                <p className="text-xs text-muted-foreground">
                  {reportCount > 0 ? "Requires attention" : "No pending reports"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-gold-200 dark:border-gold-800">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-gold-200 dark:border-gold-800">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics and statistics about your marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Analytics content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and manage user reports.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Reports content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


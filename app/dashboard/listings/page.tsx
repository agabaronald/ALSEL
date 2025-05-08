import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { Plus, Edit, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from "@/lib/db"

export default async function UserListingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const userId = session.user.id

  // Fetch user's products
  const products = await prisma.product.findMany({
    where: {
      sellerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const activeProducts = products.filter((p) => p.status === "active")
  const soldProducts = products.filter((p) => p.status === "sold")
  const inactiveProducts = products.filter((p) => p.status !== "active" && p.status !== "sold")

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Listings</h2>
        <Button asChild className="bg-gold-500 hover:bg-gold-600 text-black">
          <Link href="/sell">
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeProducts.length})</TabsTrigger>
          <TabsTrigger value="sold">Sold ({soldProducts.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveProducts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
              <CardDescription>Manage your currently active listings.</CardDescription>
            </CardHeader>
            <CardContent>
              {activeProducts.length > 0 ? (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Product
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Views</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Likes</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Listed</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {activeProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                  <Image
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium line-clamp-1">{product.title}</p>
                                  <p className="text-xs text-muted-foreground">{product.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle font-medium text-gold-500">${product.price.toFixed(2)}</td>
                            <td className="p-4 align-middle">{product.views}</td>
                            <td className="p-4 align-middle">{product.likes}</td>
                            <td className="p-4 align-middle">{new Date(product.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/product/${product.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View listing
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/edit/${product.id}`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit listing
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Mark as sold</DropdownMenuItem>
                                  <DropdownMenuItem>Deactivate listing</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-muted-foreground">You don't have any active listings</p>
                  <Button asChild className="bg-gold-500 hover:bg-gold-600 text-black">
                    <Link href="/sell">
                      <Plus className="mr-2 h-4 w-4" />
                      Create a Listing
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sold" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Sold Items</CardTitle>
              <CardDescription>Items you've successfully sold.</CardDescription>
            </CardHeader>
            <CardContent>
              {soldProducts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {soldProducts.map((product) => (
                    <div key={product.id} className="relative overflow-hidden rounded-lg border bg-background">
                      <div className="relative aspect-square">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Badge className="bg-green-500 text-white">SOLD</Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="font-semibold text-gold-500">${product.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(product.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">You haven't sold any items yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card className="border-gold-200 dark:border-gold-800">
            <CardHeader>
              <CardTitle>Inactive Listings</CardTitle>
              <CardDescription>Listings that are currently not visible to buyers.</CardDescription>
            </CardHeader>
            <CardContent>
              {inactiveProducts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {inactiveProducts.map((product) => (
                    <div key={product.id} className="overflow-hidden rounded-lg border bg-background/50">
                      <div className="relative aspect-square">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover opacity-50"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="font-semibold text-gold-500">${product.price.toFixed(2)}</p>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Reactivate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">You don't have any inactive listings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


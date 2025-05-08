import Image from "next/image"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"

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
import prisma from "@/lib/db"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      seller: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button className="bg-gold-500 hover:bg-gold-600 text-black">Add Product</Button>
      </div>

      <Card className="border-gold-200 dark:border-gold-800">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>Manage your marketplace products.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Seller</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Listed</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {products.map((product) => (
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
                      <td className="p-4 align-middle">
                        <Badge variant="outline">
                          {product.category}
                          {product.subcategory && ` / ${product.subcategory}`}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{product.seller.name}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {product.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800 dark:text-green-100">
                            Active
                          </Badge>
                        ) : product.status === "sold" ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-800 dark:text-blue-100">
                            Sold
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800 dark:text-red-100"
                          >
                            Inactive
                          </Badge>
                        )}
                      </td>
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {product.status === "active" ? (
                              <DropdownMenuItem>Mark as sold</DropdownMenuItem>
                            ) : product.status === "sold" ? (
                              <DropdownMenuItem>Mark as active</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Restore product</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


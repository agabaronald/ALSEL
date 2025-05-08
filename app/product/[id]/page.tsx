import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, Share2, Flag, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductCard } from "@/components/product-card"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  // This would normally come from a database
  const product = {
    id,
    title: "iPhone 13 Pro Max - 256GB - Pacific Blue - Like New",
    price: 899,
    description:
      "Selling my iPhone 13 Pro Max. It's in excellent condition, only used for 6 months. Comes with original box, charger, and a free case. Battery health is at 98%. No scratches or dents. Reason for selling: upgraded to newer model.",
    condition: "Like New",
    location: "Singapore",
    category: "Electronics",
    subcategory: "Mobile Phones",
    brand: "Apple",
    postedAt: "2 days ago",
    views: 156,
    likes: 24,
    images: [
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Side",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Back",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Box",
    ],
    seller: {
      id: "user123",
      name: "John Doe",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      responseRate: "98%",
      responseTime: "Within an hour",
      memberSince: "Jan 2020",
      verified: true,
      listings: 42,
    },
  }

  // Similar products (would normally be fetched based on category/tags)
  const similarProducts = Array.from({ length: 6 }).map((_, i) => ({
    id: `similar-${i}`,
    title: `Similar iPhone ${i + 1}`,
    price: Math.floor(Math.random() * 300) + 700,
    location: "Singapore",
    image: `/placeholder.svg?height=300&width=300&text=Similar+${i + 1}`,
    liked: i % 3 === 0,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button - Mobile */}
      <div className="sticky top-0 z-10 border-b bg-white p-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" />
          Back to listings
        </Link>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Images */}
          <div className="lg:col-span-2">
            {/* Back button - Desktop */}
            <div className="mb-4 hidden lg:block">
              <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-gold-500">
                <ChevronLeft className="h-4 w-4" />
                Back to listings
              </Link>
            </div>

            {/* Main Image */}
            <div className="mb-4 overflow-hidden rounded-lg bg-white">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="mb-8 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 border-transparent hover:border-rose-500"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Product Details - Mobile */}
            <div className="mb-6 rounded-lg border bg-white p-4 lg:hidden">
              <h1 className="text-xl font-bold">{product.title}</h1>
              <p className="mt-2 text-2xl font-bold text-gold-500">${product.price.toFixed(2)}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{product.condition}</span>
                <span>•</span>
                <span>{product.postedAt}</span>
                <span>•</span>
                <span>{product.views} views</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Description</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed">{product.description}</p>

              <Separator className="my-6" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Condition</h3>
                  <p className="text-sm">{product.condition}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Category</h3>
                  <p className="text-sm">
                    {product.category} &gt; {product.subcategory}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Brand</h3>
                  <p className="text-sm">{product.brand}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="text-sm">{product.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Details - Desktop */}
            <div className="hidden rounded-lg border bg-white p-6 lg:block">
              <h1 className="text-xl font-bold">{product.title}</h1>
              <p className="mt-2 text-3xl font-bold text-gold-500">${product.price.toFixed(2)}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{product.condition}</span>
                <span>•</span>
                <span>{product.postedAt}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{product.views} views</span>
                <span>•</span>
                <span>{product.likes} likes</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-lg border bg-white p-6">
              <div className="grid gap-3">
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black">Chat with Seller</Button>
                <Button variant="outline" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share2 className="h-4 w-4" />
                    <span className="ml-2">Share</span>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Flag className="h-4 w-4" />
                    <span className="ml-2">Report</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                  <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{product.seller.name}</h3>
                    {product.seller.verified && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Member since {product.seller.memberSince}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-medium">{product.seller.responseRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-medium">{product.seller.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">⭐ {product.seller.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Listings</span>
                  <span className="font-medium">{product.seller.listings}</span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat Now
                </Button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="rounded-lg border bg-white p-6">
              <h3 className="mb-3 font-semibold">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-gold-500">•</span>
                  <span>Meet in a safe, public place</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-gold-500">•</span>
                  <span>Check the item before paying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-gold-500">•</span>
                  <span>Pay only after receiving the item</span>
                </li>
              </ul>
              <Link href="/safety" className="mt-3 block text-sm font-medium text-gold-500 hover:underline">
                Learn more
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold">Similar Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                location={product.location}
                image={product.image}
                liked={product.liked}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


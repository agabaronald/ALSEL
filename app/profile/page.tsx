import Link from "next/link"
import { Settings, Package, Heart, Star, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"

// Mock user data
const user = {
  id: "user123",
  name: "John Doe",
  username: "@johndoe",
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
  bio: "Selling preloved items in great condition. Fast responder, reliable seller.",
  location: "Singapore",
  memberSince: "Jan 2020",
  responseRate: "98%",
  responseTime: "Within an hour",
  lastActive: "2 hours ago",
  verified: true,
  followers: 124,
  following: 56,
  ratings: {
    average: 4.8,
    count: 152,
    breakdown: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
  },
}

// Mock listings data
const listings = Array.from({ length: 8 }).map((_, i) => ({
  id: `listing-${i}`,
  title: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 200) + 10,
  location: "Singapore",
  image: `/placeholder.svg?height=300&width=300&text=Product+${i + 1}`,
  liked: i % 3 === 0,
  sold: i % 5 === 0,
}))

// Mock saved items
const savedItems = Array.from({ length: 4 }).map((_, i) => ({
  id: `saved-${i}`,
  title: `Saved Item ${i + 1}`,
  price: Math.floor(Math.random() * 200) + 10,
  location: "Singapore",
  image: `/placeholder.svg?height=300&width=300&text=Saved+${i + 1}`,
  liked: true,
}))

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg border bg-white p-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.verified && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>{user.location}</span>
                <span>Member since {user.memberSince}</span>
                <span>Last active {user.lastActive}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Button className="bg-gold-500 hover:bg-gold-600 text-black">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{user.followers}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span> following
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold-100 p-2 text-gold-600">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seller Rating</p>
                  <p className="font-semibold">
                    {user.ratings.average} ({user.ratings.count} reviews)
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold-100 p-2 text-gold-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="font-semibold">{user.responseRate}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold-100 p-2 text-gold-600">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="font-semibold">{user.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My Listings</h2>
              <Link href="/sell" className="text-sm font-medium text-gold-500 hover:underline">
                + Add New Listing
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {listings
                .filter((item) => !item.sold)
                .map((product) => (
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
          </TabsContent>

          <TabsContent value="sold" className="space-y-6">
            <h2 className="text-xl font-bold">Sold Items</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {listings
                .filter((item) => item.sold)
                .map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      location={product.location}
                      image={product.image}
                      liked={product.liked}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="rounded bg-white px-3 py-1 text-sm font-bold uppercase">Sold</span>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-xl font-bold">Saved Items</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {savedItems.map((product) => (
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
          </TabsContent>
        </Tabs>

        {/* Reviews Section */}
        <div className="mt-8 rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Reviews</h2>
            <Link href="/reviews" className="text-sm font-medium text-gold-500 hover:underline">
              View All
              <ChevronRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">{user.ratings.average}</div>
                <div className="flex-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(user.ratings.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {user.ratings.count} reviews</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {user.ratings.breakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <div className="w-8 text-sm">{item.stars} ★</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full bg-yellow-400" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <div className="w-8 text-right text-sm">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Sample Reviews */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=AS" alt="Alex Smith" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Smith</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  Great seller! Item was exactly as described and shipping was fast. Would definitely buy from again.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=ML" alt="Mary Lee" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mary Lee</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  Smooth transaction. The seller was responsive and the item was in good condition as advertised.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


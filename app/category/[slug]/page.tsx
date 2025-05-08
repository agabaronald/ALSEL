import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Mock categories data
const categories = {
  electronics: {
    name: "Electronics",
    icon: "📱",
    description: "Browse the latest gadgets and tech products from trusted sellers.",
    subcategories: ["Mobile Phones", "Computers & Laptops", "Tablets", "Audio", "Cameras", "Accessories", "Wearables"],
  },
  fashion: {
    name: "Fashion",
    icon: "👕",
    description: "Discover trendy clothing, shoes, and accessories for all styles and budgets.",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Bags & Wallets",
      "Jewelry & Accessories",
      "Watches",
      "Luxury",
    ],
  },
  "home-living": {
    name: "Home & Living",
    icon: "🏠",
    description: "Find furniture, decor, and everything you need to make your house a home.",
    subcategories: [
      "Furniture",
      "Home Decor",
      "Kitchenware",
      "Appliances",
      "Bedding",
      "Lighting",
      "Storage & Organization",
    ],
  },
  "toys-games": {
    name: "Toys & Games",
    icon: "🎮",
    description: "Explore a wide selection of toys, games, and collectibles for all ages.",
    subcategories: ["Toys", "Board Games", "Video Games", "Gaming Consoles", "Collectibles", "Hobbies & DIY"],
  },
}

// Mock products data
const generateProducts = (count: number, category: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${i}`,
    title: `${category} Item ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 10,
    location: "Singapore",
    image: `/placeholder.svg?height=300&width=300&text=${category}+${i + 1}`,
    liked: i % 3 === 0,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const category = categories[slug as keyof typeof categories] || {
    name: "Category",
    icon: "📦",
    description: "Browse items in this category",
    subcategories: [],
  }

  const products = generateProducts(24, category.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <Link href="/categories" className="mb-4 flex items-center gap-2 text-sm font-medium hover:text-gold-500">
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-3xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg border bg-white p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Subcategory:</span>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="All Subcategories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {category.subcategories.map((subcat) => (
                    <SelectItem key={subcat} value={subcat.toLowerCase().replace(/\s+/g, "-")}>
                      {subcat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Price:</span>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-50">$0 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200+">$200+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Condition:</span>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Any Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Condition</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select defaultValue="recent">
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Recently Listed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Listed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="ml-auto">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
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

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            3
          </Button>
          <span className="mx-1">...</span>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            10
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


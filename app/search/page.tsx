"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock categories for filter
const categories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Living" },
  { id: "toys", name: "Toys & Games" },
]

// Mock price ranges
const priceRanges = [
  { id: "all", name: "Any Price" },
  { id: "0-50", name: "$0 - $50" },
  { id: "50-100", name: "$50 - $100" },
  { id: "100-200", name: "$100 - $200" },
  { id: "200+", name: "$200+" },
]

// Mock conditions
const conditions = [
  { id: "all", name: "Any Condition" },
  { id: "new", name: "New" },
  { id: "like-new", name: "Like New" },
  { id: "good", name: "Good" },
  { id: "fair", name: "Fair" },
]

// Mock sort options
const sortOptions = [
  { id: "recent", name: "Recently Listed" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "popular", name: "Most Popular" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [selectedSort, setSelectedSort] = useState("recent")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build query params
        const params = new URLSearchParams()

        if (query) {
          params.append("search", query)
        }

        if (selectedCategory !== "all") {
          params.append("category", selectedCategory)
        }

        if (selectedPrice !== "all") {
          const [min, max] = selectedPrice.split("-")
          if (min) params.append("minPrice", min)
          if (max) params.append("maxPrice", max)
        }

        if (selectedCondition !== "all") {
          params.append("condition", selectedCondition)
        }

        params.append("sort", selectedSort)

        const response = await fetch(`/api/products?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query, selectedCategory, selectedPrice, selectedCondition, selectedSort])

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setSelectedPrice("all")
    setSelectedCondition("all")
    setSelectedSort("recent")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold-500">ALSEL</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{query ? `Search results for "${query}"` : "Browse all items"}</h1>
          <div className="mt-4">
            <SearchBar initialQuery={query} className="max-w-2xl" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg border bg-white p-4 dark:bg-gray-800">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Price:</span>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Condition:</span>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Any Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id}>
                      {condition.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Recently Listed" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="ml-auto" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-4">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-muted-foreground">
                {products.length} {products.length === 1 ? "result" : "results"} found
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                    image={product.images[0]}
                    liked={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


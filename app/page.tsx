import Link from "next/link"
import Image from "next/image"
import { Search, Menu, Bell, Heart, User, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CategoryCarousel } from "@/components/category-carousel"
import { ProductCard } from "@/components/product-card"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <>

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gold-50 py-6 dark:bg-gray-900 md:py-12">
          <div className="container px-4">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Buy and sell with the ALSEL community
                </h1>
                <p className="text-muted-foreground md:text-lg">
                  Join millions of users buying and selling preloved items in your area.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black">
                    Start Selling
                  </Button>
                  <Button size="lg" variant="outline">
                    Browse Items
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[250px] w-full max-w-[400px] md:h-[300px]">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Marketplace"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="container px-4">
            <h2 className="mb-6 text-2xl font-bold">Browse Categories</h2>
            <CategoryCarousel />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8">
          <div className="container px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link href="/featured" className="text-sm font-medium text-gold-500 hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCard
                  key={i}
                  id={`product-${i}`}
                  title={`Product ${i + 1}`}
                  price={Math.floor(Math.random() * 200) + 10}
                  location="Singapore"
                  image={`/placeholder.svg?height=300&width=300&text=Product+${i + 1}`}
                  liked={i % 3 === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-8">
          <div className="container px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recently Added</h2>
              <Link href="/recent" className="text-sm font-medium text-gold-500 hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCard
                  key={i}
                  id={`recent-${i}`}
                  title={`Recent Item ${i + 1}`}
                  price={Math.floor(Math.random() * 100) + 5}
                  location="Singapore"
                  image={`/placeholder.svg?height=300&width=300&text=Recent+${i + 1}`}
                  liked={i % 4 === 0}
                  isNew={true}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background lg:hidden">
        <div className="grid h-16 grid-cols-5">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 text-gold-500">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Menu className="h-5 w-5" />
            <span className="text-xs">Categories</span>
          </Link>
          <Link href="/sell" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-black">
              <span className="text-lg font-bold">+</span>
            </div>
          </Link>
          <Link href="/saved" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Saved</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>

    </>
  )
}


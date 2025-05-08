"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const categories = [
  { name: "Electronics", icon: "📱", slug: "electronics" },
  { name: "Fashion", icon: "👕", slug: "fashion" },
  { name: "Home & Living", icon: "🏠", slug: "home-living" },
  { name: "Toys & Games", icon: "🎮", slug: "toys-games" },
  { name: "Sports", icon: "⚽", slug: "sports" },
  { name: "Books", icon: "📚", slug: "books" },
  { name: "Beauty", icon: "💄", slug: "beauty" },
  { name: "Vehicles", icon: "🚗", slug: "vehicles" },
  { name: "Collectibles", icon: "🏆", slug: "collectibles" },
  { name: "Jobs", icon: "💼", slug: "jobs" },
  { name: "Services", icon: "🔧", slug: "services" },
  { name: "Property", icon: "🏢", slug: "property" },
]

export function CategoryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { current } = containerRef
      const scrollAmount = direction === "left" ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {!isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}
      <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={cn(
              "flex min-w-[100px] flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors hover:bg-gold-50",
              isMobile ? "min-w-[80px]" : "min-w-[120px]",
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-2xl">
              {category.icon}
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
      {!isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}
    </div>
  )
}


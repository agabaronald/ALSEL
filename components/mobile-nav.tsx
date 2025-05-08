"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Living", slug: "home-living" },
  { name: "Toys & Games", slug: "toys-games" },
  { name: "Sports", slug: "sports" },
  { name: "Books", slug: "books" },
  { name: "Beauty", slug: "beauty" },
  { name: "Vehicles", slug: "vehicles" },
  { name: "Collectibles", slug: "collectibles" },
  { name: "Jobs", slug: "jobs" },
  { name: "Services", slug: "services" },
  { name: "Property", slug: "property" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Account</h3>
            <nav className="space-y-2">
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href="/listings"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                My Listings
              </Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Support</h3>
            <nav className="space-y-2">
              <Link
                href="/help"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Help Center
              </Link>
              <Link
                href="/safety"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Safety Tips
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


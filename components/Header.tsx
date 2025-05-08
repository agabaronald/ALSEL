import Link from "next/link"
import Image from "next/image"
import { Search, Menu, Bell, Heart } from "lucide-react"

import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden border-b bg-background lg:block">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/placeholder.svg?height=32&width=32" alt="ALSEL" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-gold-500">ALSEL</span>
            </Link>
            <div className="relative w-[400px]">
              <SearchBar />
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/sell" className="text-sm font-medium hover:text-gold-500">
              Sell
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-gold-500">
              Categories
            </Link>
            <Link href="/saved" className="text-sm font-medium hover:text-gold-500">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/notifications" className="text-sm font-medium hover:text-gold-500">
              <Bell className="h-5 w-5" />
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-gold-500">
              Chat
            </Link>
            <UserNav />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="border-b bg-background lg:hidden">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-7 w-7">
                <Image src="/placeholder.svg?height=28&width=28" alt="ALSEL" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold text-gold-500">ALSEL</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="container px-4 py-2">
          <SearchBar />
        </div>
      </header>
    </>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  title: string
  price: number
  location: string
  image: string
  liked?: boolean
  isNew?: boolean
}

export function ProductCard({ id, title, price, location, image, liked = false, isNew = false }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View product</span>
      </Link>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {isNew && (
          <div className="absolute left-2 top-2 rounded bg-gold-500 px-2 py-1 text-xs font-medium text-black">New</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full bg-white/80 text-gold-500 backdrop-blur-sm hover:bg-white hover:text-gold-600"
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <p className="font-semibold text-gold-500">${price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  )
}


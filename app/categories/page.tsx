import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Mock categories data
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    subcategories: [
      { id: "phones", name: "Mobile Phones" },
      { id: "computers", name: "Computers & Laptops" },
      { id: "tablets", name: "Tablets" },
      { id: "audio", name: "Audio" },
      { id: "cameras", name: "Cameras" },
      { id: "accessories", name: "Accessories" },
      { id: "wearables", name: "Wearables" },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👕",
    subcategories: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "bags", name: "Bags & Wallets" },
      { id: "jewelry", name: "Jewelry & Accessories" },
      { id: "watches", name: "Watches" },
      { id: "luxury", name: "Luxury" },
    ],
  },
  {
    id: "home",
    name: "Home & Living",
    icon: "🏠",
    subcategories: [
      { id: "furniture", name: "Furniture" },
      { id: "decor", name: "Home Decor" },
      { id: "kitchenware", name: "Kitchenware" },
      { id: "appliances", name: "Appliances" },
      { id: "bedding", name: "Bedding" },
      { id: "lighting", name: "Lighting" },
      { id: "storage", name: "Storage & Organization" },
    ],
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: "🎮",
    subcategories: [
      { id: "toys", name: "Toys" },
      { id: "games", name: "Board Games" },
      { id: "videogames", name: "Video Games" },
      { id: "consoles", name: "Gaming Consoles" },
      { id: "collectibles", name: "Collectibles" },
      { id: "hobbies", name: "Hobbies & DIY" },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    icon: "⚽",
    subcategories: [
      { id: "apparel", name: "Sports Apparel" },
      { id: "equipment", name: "Sports Equipment" },
      { id: "outdoors", name: "Outdoor Recreation" },
      { id: "fitness", name: "Fitness & Gym" },
      { id: "bicycles", name: "Bicycles" },
      { id: "water", name: "Water Sports" },
    ],
  },
  {
    id: "books",
    name: "Books & Stationery",
    icon: "📚",
    subcategories: [
      { id: "fiction", name: "Fiction" },
      { id: "nonfiction", name: "Non-Fiction" },
      { id: "textbooks", name: "Textbooks" },
      { id: "magazines", name: "Magazines" },
      { id: "stationery", name: "Stationery" },
      { id: "art", name: "Art Supplies" },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "💄",
    subcategories: [
      { id: "skincare", name: "Skincare" },
      { id: "makeup", name: "Makeup" },
      { id: "haircare", name: "Haircare" },
      { id: "fragrance", name: "Fragrance" },
      { id: "tools", name: "Beauty Tools" },
      { id: "personal", name: "Personal Care" },
    ],
  },
  {
    id: "vehicles",
    name: "Vehicles",
    icon: "🚗",
    subcategories: [
      { id: "cars", name: "Cars" },
      { id: "motorcycles", name: "Motorcycles" },
      { id: "parts", name: "Vehicle Parts & Accessories" },
      { id: "bicycles", name: "Bicycles" },
      { id: "other", name: "Other Vehicles" },
    ],
  },
]

export default function CategoriesPage() {
  return (

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Browse Categories</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 text-2xl">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>

              <ul className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link
                      href={`/category/${category.id}/${subcategory.id}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-gold-50 dark:hover:bg-gold-900/20"
                    >
                      <span>{subcategory.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/category/${category.id}`}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/20"
                  >
                    <span>View All {category.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
  )
}


import { NextResponse } from "next/server"

// Mock product database
const products = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB - Pacific Blue",
    description: "Excellent condition, only used for 6 months. Comes with original box and accessories.",
    price: 899,
    category: "electronics",
    subcategory: "Phones",
    condition: "Like New",
    location: "Singapore",
    sellerId: "1",
    images: [
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Side",
    ],
    createdAt: new Date().toISOString(),
    views: 156,
    likes: 24,
  },
  {
    id: "2",
    title: "Nike Air Jordan 1 - Size 10 - Chicago",
    description: "Brand new in box, never worn. Limited edition colorway.",
    price: 350,
    category: "fashion",
    subcategory: "Shoes",
    condition: "New",
    location: "Singapore",
    sellerId: "2",
    images: [
      "/placeholder.svg?height=600&width=600&text=Air+Jordan+1",
      "/placeholder.svg?height=600&width=600&text=Air+Jordan+1+Side",
    ],
    createdAt: new Date().toISOString(),
    views: 89,
    likes: 12,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Get filters from query params
    const category = searchParams.get("category")
    const subcategory = searchParams.get("subcategory")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const condition = searchParams.get("condition")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "recent"

    // Apply filters
    let filteredProducts = [...products]

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    if (subcategory) {
      filteredProducts = filteredProducts.filter((p) => p.subcategory === subcategory)
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price >= Number(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price <= Number(maxPrice))
    }

    if (condition) {
      filteredProducts = filteredProducts.filter((p) => p.condition === condition)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) => p.title.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    if (sort === "recent") {
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sort === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else if (sort === "popular") {
      filteredProducts.sort((a, b) => b.views - a.views)
    }

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error("Products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "category",
      "subcategory",
      "condition",
      "location",
      "sellerId",
    ]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new product
    const newProduct = {
      id: String(products.length + 1),
      ...productData,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    }

    // Add to our mock database
    products.push(newProduct)

    return NextResponse.json({
      success: true,
      product: newProduct,
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


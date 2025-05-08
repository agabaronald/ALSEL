import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/lib/db"

export async function GET() {
  try {
    // Check if we already have users to avoid duplicate seeding
    const userCount = await prisma.user.count()

    if (userCount > 0) {
      return NextResponse.json({ message: "Database already seeded" })
    }

    // Create admin user
    const adminPassword = await hash("admin123", 10)
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@alsel.com",
        password: adminPassword,
        avatar: "/placeholder.svg?height=100&width=100&text=Admin",
        isAdmin: true,
        isVerified: true,
        location: "Singapore",
      },
    })

    // Create regular users
    const password = await hash("password123", 10)

    const john = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password,
        avatar: "/placeholder.svg?height=100&width=100&text=JD",
        bio: "Selling preloved items in great condition. Fast responder, reliable seller.",
        location: "Singapore",
        isVerified: true,
      },
    })

    const jane = await prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        password,
        avatar: "/placeholder.svg?height=100&width=100&text=JS",
        bio: "Love finding great deals and selling items I no longer need.",
        location: "Singapore",
        isVerified: true,
      },
    })

    // Create products
    const iphone = await prisma.product.create({
      data: {
        title: "iPhone 13 Pro Max - 256GB - Pacific Blue",
        description: "Excellent condition, only used for 6 months. Comes with original box and accessories.",
        price: 899,
        category: "electronics",
        subcategory: "Phones",
        condition: "Like New",
        location: "Singapore",
        sellerId: john.id,
        images: [
          "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro",
          "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Side",
        ],
        views: 156,
        likes: 24,
      },
    })

    const nike = await prisma.product.create({
      data: {
        title: "Nike Air Jordan 1 - Size 10 - Chicago",
        description: "Brand new in box, never worn. Limited edition colorway.",
        price: 350,
        category: "fashion",
        subcategory: "Shoes",
        condition: "New",
        location: "Singapore",
        sellerId: jane.id,
        images: [
          "/placeholder.svg?height=600&width=600&text=Air+Jordan+1",
          "/placeholder.svg?height=600&width=600&text=Air+Jordan+1+Side",
        ],
        views: 89,
        likes: 12,
      },
    })

    // Create more products
    const products = [
      {
        title: "Sony WH-1000XM4 Wireless Headphones",
        description: "Premium noise-cancelling headphones. Used for 3 months, in perfect condition.",
        price: 249,
        category: "electronics",
        subcategory: "Audio",
        condition: "Like New",
        location: "Singapore",
        sellerId: john.id,
        images: [
          "/placeholder.svg?height=600&width=600&text=Sony+Headphones",
          "/placeholder.svg?height=600&width=600&text=Sony+Headphones+Case",
        ],
      },
      {
        title: "IKEA MALM Desk - White",
        description: "Minimalist desk in good condition. Some minor scratches on the surface.",
        price: 80,
        category: "home",
        subcategory: "Furniture",
        condition: "Good",
        location: "Singapore",
        sellerId: jane.id,
        images: [
          "/placeholder.svg?height=600&width=600&text=IKEA+Desk",
          "/placeholder.svg?height=600&width=600&text=IKEA+Desk+Side",
        ],
      },
      {
        title: "PlayStation 5 Digital Edition",
        description: "Barely used PS5 Digital Edition. Comes with controller and original packaging.",
        price: 450,
        category: "electronics",
        subcategory: "Gaming",
        condition: "Like New",
        location: "Singapore",
        sellerId: john.id,
        images: [
          "/placeholder.svg?height=600&width=600&text=PS5",
          "/placeholder.svg?height=600&width=600&text=PS5+Box",
        ],
      },
    ]

    for (const product of products) {
      await prisma.product.create({
        data: product,
      })
    }

    // Create messages
    const messages = [
      {
        text: "Hi, is this still available?",
        senderId: jane.id,
        receiverId: john.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "Yes, it's still available!",
        senderId: john.id,
        receiverId: jane.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "Great! What's the lowest you can go?",
        senderId: jane.id,
        receiverId: john.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "I can do $850, it's practically new and comes with all accessories.",
        senderId: john.id,
        receiverId: jane.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "Would you consider $800?",
        senderId: jane.id,
        receiverId: john.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "I can meet you at $825, that's the best I can do.",
        senderId: john.id,
        receiverId: jane.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
      {
        text: "Deal! When and where can we meet?",
        senderId: jane.id,
        receiverId: john.id,
        chatId: "chat1",
        productId: iphone.id,
        isRead: true,
      },
    ]

    for (const message of messages) {
      await prisma.message.create({
        data: message,
      })
    }

    // Create reviews
    const reviews = [
      {
        rating: 5,
        comment: "Great seller! Item was exactly as described and shipping was fast.",
        reviewerId: jane.id,
        revieweeId: john.id,
        productId: iphone.id,
      },
      {
        rating: 4,
        comment: "Good transaction. The item was in good condition as advertised.",
        reviewerId: john.id,
        revieweeId: jane.id,
        productId: nike.id,
      },
    ]

    for (const review of reviews) {
      await prisma.review.create({
        data: review,
      })
    }

    // Create saved products
    await prisma.savedProduct.create({
      data: {
        userId: john.id,
        productId: nike.id,
      },
    })

    await prisma.savedProduct.create({
      data: {
        userId: jane.id,
        productId: iphone.id,
      },
    })

    return NextResponse.json({
      message: "Database seeded successfully",
      admin,
      users: [john, jane],
      products: [iphone, nike, ...products],
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}


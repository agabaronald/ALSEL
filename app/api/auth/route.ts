import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100&text=JS",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json()

    if (action === "login") {
      const user = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // In a real app, you would create a session or JWT token here
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      })
    } else if (action === "register") {
      // Check if user already exists
      const existingUser = users.find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
      }

      // In a real app, you would hash the password and store the user in a database
      const newUser = {
        id: String(users.length + 1),
        name: email.split("@")[0], // Just use the part before @ as name for demo
        email,
        password,
        avatar: `/placeholder.svg?height=100&width=100&text=${email.charAt(0).toUpperCase()}`,
      }

      // Add to our mock database
      users.push(newUser)

      const { password: _, ...userWithoutPassword } = newUser
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


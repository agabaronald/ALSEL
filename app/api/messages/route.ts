import { NextResponse } from "next/server"

// Mock messages database
const messages = [
  {
    id: "1",
    chatId: "chat1",
    senderId: "2", // Jane
    receiverId: "1", // John
    text: "Hi, is this still available?",
    timestamp: "2023-07-15T10:30:00Z",
    isRead: true,
  },
  {
    id: "2",
    chatId: "chat1",
    senderId: "1", // John
    receiverId: "2", // Jane
    text: "Yes, it's still available!",
    timestamp: "2023-07-15T10:32:00Z",
    isRead: true,
  },
  {
    id: "3",
    chatId: "chat1",
    senderId: "2", // Jane
    receiverId: "1", // John
    text: "Great! What's the lowest you can go?",
    timestamp: "2023-07-15T10:33:00Z",
    isRead: true,
  },
  {
    id: "4",
    chatId: "chat1",
    senderId: "1", // John
    receiverId: "2", // Jane
    text: "I can do $850, it's practically new and comes with all accessories.",
    timestamp: "2023-07-15T10:35:00Z",
    isRead: true,
  },
  {
    id: "5",
    chatId: "chat1",
    senderId: "2", // Jane
    receiverId: "1", // John
    text: "Would you consider $800?",
    timestamp: "2023-07-15T10:40:00Z",
    isRead: true,
  },
  {
    id: "6",
    chatId: "chat1",
    senderId: "1", // John
    receiverId: "2", // Jane
    text: "I can meet you at $825, that's the best I can do.",
    timestamp: "2023-07-15T10:42:00Z",
    isRead: true,
  },
  {
    id: "7",
    chatId: "chat1",
    senderId: "2", // Jane
    receiverId: "1", // John
    text: "Deal! When and where can we meet?",
    timestamp: "2023-07-15T10:45:00Z",
    isRead: true,
  },
]

// Mock chats database
const chats = [
  {
    id: "chat1",
    participants: ["1", "2"], // John and Jane
    productId: "1", // iPhone
    lastMessageId: "7",
    createdAt: "2023-07-15T10:30:00Z",
    updatedAt: "2023-07-15T10:45:00Z",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")
    const userId = searchParams.get("userId")

    if (chatId) {
      // Get messages for a specific chat
      const chatMessages = messages.filter((m) => m.chatId === chatId)
      return NextResponse.json(chatMessages)
    } else if (userId) {
      // Get all chats for a user
      const userChats = chats.filter((c) => c.participants.includes(userId))

      // Enhance chats with last message and other participant info
      const enhancedChats = userChats.map((chat) => {
        const lastMessage = messages.find((m) => m.id === chat.lastMessageId)
        const otherParticipantId = chat.participants.find((p) => p !== userId)

        // In a real app, you would fetch this from a users database
        const otherParticipant = {
          id: otherParticipantId,
          name: otherParticipantId === "1" ? "John Doe" : "Jane Smith",
          avatar: `/placeholder.svg?height=40&width=40&text=${otherParticipantId === "1" ? "JD" : "JS"}`,
          online: Math.random() > 0.5, // Random online status for demo
          lastSeen: "2 hours ago",
        }

        // In a real app, you would fetch this from a products database
        const product = {
          id: "1",
          title: "iPhone 13 Pro Max",
          price: 899,
          image: "/placeholder.svg?height=60&width=60&text=iPhone",
        }

        return {
          ...chat,
          lastMessage,
          otherParticipant,
          product,
          unreadCount: messages.filter((m) => m.chatId === chat.id && m.receiverId === userId && !m.isRead).length,
        }
      })

      return NextResponse.json(enhancedChats)
    }

    return NextResponse.json({ error: "Missing chatId or userId parameter" }, { status: 400 })
  } catch (error) {
    console.error("Messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const messageData = await request.json()

    // Validate required fields
    const requiredFields = ["chatId", "senderId", "receiverId", "text"]
    for (const field of requiredFields) {
      if (!messageData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new message
    const newMessage = {
      id: String(messages.length + 1),
      ...messageData,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    // Add to our mock database
    messages.push(newMessage)

    // Update the chat's last message
    const chat = chats.find((c) => c.id === messageData.chatId)
    if (chat) {
      chat.lastMessageId = newMessage.id
      chat.updatedAt = newMessage.timestamp
    } else {
      // Create a new chat if it doesn't exist
      const newChat = {
        id: messageData.chatId,
        participants: [messageData.senderId, messageData.receiverId],
        productId: messageData.productId || "unknown",
        lastMessageId: newMessage.id,
        createdAt: newMessage.timestamp,
        updatedAt: newMessage.timestamp,
      }
      chats.push(newChat)
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
    })
  } catch (error) {
    console.error("Send message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Send, MoreVertical, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data for chats
const chats = [
  {
    id: "chat1",
    user: {
      id: "user1",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      online: true,
      lastSeen: "Just now",
    },
    lastMessage: {
      text: "Is this still available?",
      time: "10:30 AM",
      isRead: true,
      isFromMe: false,
    },
    product: {
      id: "product1",
      title: "iPhone 13 Pro Max",
      price: 899,
      image: "/placeholder.svg?height=60&width=60&text=iPhone",
    },
    unreadCount: 0,
  },
  {
    id: "chat2",
    user: {
      id: "user2",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      online: false,
      lastSeen: "2 hours ago",
    },
    lastMessage: {
      text: "Can you do $50?",
      time: "Yesterday",
      isRead: true,
      isFromMe: false,
    },
    product: {
      id: "product2",
      title: "Nike Air Jordan 1",
      price: 120,
      image: "/placeholder.svg?height=60&width=60&text=Nike",
    },
    unreadCount: 0,
  },
  {
    id: "chat3",
    user: {
      id: "user3",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      online: false,
      lastSeen: "3 days ago",
    },
    lastMessage: {
      text: "Great! I'll meet you tomorrow at 3pm.",
      time: "Mon",
      isRead: false,
      isFromMe: true,
    },
    product: {
      id: "product3",
      title: "Sony WH-1000XM4",
      price: 249,
      image: "/placeholder.svg?height=60&width=60&text=Sony",
    },
    unreadCount: 2,
  },
]

// Mock messages for the active chat
const messages = [
  {
    id: "msg1",
    text: "Hi, is this still available?",
    time: "10:30 AM",
    isFromMe: false,
  },
  {
    id: "msg2",
    text: "Yes, it's still available!",
    time: "10:32 AM",
    isFromMe: true,
  },
  {
    id: "msg3",
    text: "Great! What's the lowest you can go?",
    time: "10:33 AM",
    isFromMe: false,
  },
  {
    id: "msg4",
    text: "I can do $850, it's practically new and comes with all accessories.",
    time: "10:35 AM",
    isFromMe: true,
  },
  {
    id: "msg5",
    text: "Would you consider $800?",
    time: "10:40 AM",
    isFromMe: false,
  },
  {
    id: "msg6",
    text: "I can meet you at $825, that's the best I can do.",
    time: "10:42 AM",
    isFromMe: true,
  },
  {
    id: "msg7",
    text: "Deal! When and where can we meet?",
    time: "10:45 AM",
    isFromMe: false,
  },
]

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(chats[0])
  const [messageInput, setMessageInput] = useState("")
  const [showChatList, setShowChatList] = useState(true)
  const isMobile = useMobile()

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const handleChatSelect = (chat: (typeof chats)[0]) => {
    setActiveChat(chat)
    if (isMobile) {
      setShowChatList(false)
    }
  }

  const handleBackToList = () => {
    setShowChatList(true)
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image src="/placeholder.svg?height=32&width=32" alt="ALSEL" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-gold-500">ALSEL</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              Help
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        {(!isMobile || showChatList) && (
          <div className="w-full border-r md:w-80 lg:w-96">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search messages" className="pl-10 pr-4" />
              </div>
            </div>
            <div className="overflow-y-auto" style={{ height: "calc(100vh - 160px)" }}>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
                    activeChat.id === chat.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                        <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.user.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{chat.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.lastMessage.time}</span>
                      </div>
                      <p
                        className={`truncate text-sm ${
                          !chat.lastMessage.isRead && !chat.lastMessage.isFromMe
                            ? "font-semibold text-black"
                            : "text-muted-foreground"
                        }`}
                      >
                        {chat.lastMessage.isFromMe ? "You: " : ""}
                        {chat.lastMessage.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-md">
                          <Image
                            src={chat.product.image || "/placeholder.svg"}
                            alt={chat.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate text-xs text-muted-foreground">{chat.product.title}</span>
                      </div>
                    </div>
                    {chat.unreadCount > 0 && (
                      <Badge className="ml-2 bg-gold-500 hover:bg-gold-600 text-black">{chat.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Window */}
        {(!isMobile || !showChatList) && activeChat && (
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button variant="ghost" size="icon" onClick={handleBackToList}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeChat.user.avatar} alt={activeChat.user.name} />
                  <AvatarFallback>{activeChat.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeChat.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeChat.user.online ? "Online" : activeChat.user.lastSeen}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-b bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image
                    src={activeChat.product.image || "/placeholder.svg"}
                    alt={activeChat.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{activeChat.product.title}</h3>
                  <p className="text-sm font-semibold text-gold-500">${activeChat.product.price.toFixed(2)}</p>
                </div>
                <div className="ml-auto">
                  <Link href={`/product/${activeChat.product.id}`}>
                    <Button variant="outline" size="sm">
                      View Listing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4" style={{ height: "calc(100vh - 240px)" }}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.isFromMe ? "bg-gold-500 text-black" : "bg-background text-foreground shadow-sm"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`mt-1 text-right text-xs ${
                          message.isFromMe ? "text-black/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t bg-white p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-black">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


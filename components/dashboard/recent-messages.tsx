import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import prisma from "@/lib/db"

export async function RecentMessages({ userId }: { userId: string }) {
  // Fetch recent messages
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  // Group messages by chat
  const chatMessages = messages.reduce(
    (acc, message) => {
      const otherUser = message.senderId === userId ? message.receiver : message.sender

      if (!acc[message.chatId]) {
        acc[message.chatId] = {
          chatId: message.chatId,
          otherUser,
          lastMessage: message,
        }
      }

      return acc
    },
    {} as Record<string, any>,
  )

  const recentChats = Object.values(chatMessages)

  return (
    <div className="space-y-4">
      {recentChats.length > 0 ? (
        recentChats.map((chat: any) => (
          <Link
            key={chat.chatId}
            href={`/chat?id=${chat.chatId}`}
            className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-muted"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={chat.otherUser.avatar || ""} alt={chat.otherUser.name} />
              <AvatarFallback>{chat.otherUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{chat.otherUser.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {chat.lastMessage.senderId === userId ? "You: " : ""}
                {chat.lastMessage.text}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(chat.lastMessage.createdAt).toLocaleDateString()}
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-sm text-muted-foreground">No recent messages</p>
      )}

      <div className="pt-2 text-center">
        <Link href="/chat" className="text-sm font-medium text-gold-500 hover:underline">
          View all messages
        </Link>
      </div>
    </div>
  )
}


"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data - in a real app, this would come from the database
const data = [
  {
    name: "Mon",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Tue",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Wed",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Thu",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Fri",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Sat",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Sun",
    views: Math.floor(Math.random() * 50) + 10,
    messages: Math.floor(Math.random() * 10) + 1,
  },
]

export function UserActivity({ userId }: { userId: string }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
          }}
        />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="stroke-gold-500 dark:stroke-gold-400"
        />
        <Line
          type="monotone"
          dataKey="messages"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="stroke-blue-500 dark:stroke-blue-400"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}


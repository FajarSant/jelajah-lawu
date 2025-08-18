"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const messages = [
  { user: "Andi", text: "Is the Bali trip available?", time: "2h ago" },
  { user: "Siti", text: "How much for Lombok package?", time: "5h ago" },
];

export function Messages() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="border rounded-lg p-2 hover:bg-gray-50">
            <p className="text-sm font-semibold">{msg.user}</p>
            <p className="text-xs text-muted-foreground">{msg.text}</p>
            <span className="text-xs text-gray-400">{msg.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

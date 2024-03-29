import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";

const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
  if (!message) return;
  for (const user of users.values()) {
    user.send(senderId ? `[${senderId}]: ${message}` : message);
  }
}

export async function chat(ws: WebSocket): Promise<void> {
  const rand = Math.floor(Math.random() * Math.floor(10000000));
  const userId = rand.toString();
  // Register user connection
  users.set(userId, ws);
  broadcast(`User ${userId} connected`);

  // Wait for new messages
  for await (const event of ws) {
    const message = typeof event === "string" ? event : "";

    broadcast(message, userId);

    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(userId);
      broadcast(`User ${userId} disconnected`);
      break;
    }
  }
}

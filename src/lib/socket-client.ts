import { io, Socket } from 'socket.io-client';

const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

class SocketManager {
  private sockets: Map<string, Socket> = new Map();

  connectNamespace(namespace: string): Socket {
    const existing = this.sockets.get(namespace);
    if (existing) return existing;

    const socket = io(`${WS_BASE_URL}${namespace}`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.sockets.set(namespace, socket);
    return socket;
  }

  disconnectAll() {
    this.sockets.forEach((socket) => socket.disconnect());
    this.sockets.clear();
  }
}

export const socketManager = new SocketManager();

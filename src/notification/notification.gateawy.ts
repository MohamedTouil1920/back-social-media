import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(userId: number, type: string, data: any) {
    this.server.to(`user-${userId}`).emit('notification', { type, data });
  }

  handleUserConnection(client: any, userId: number) {
    client.join(`user-${userId}`);
    console.log(`User ${userId} joined room`);
  }
}

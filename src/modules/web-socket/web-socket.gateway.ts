import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized!');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(client.id);
    this.server.to(client.id).emit('message', 'you connected successfully');
  }

  handleDisconnect(client: any) {
    console.log(client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string) {
    client.join(roomName);
  }
}

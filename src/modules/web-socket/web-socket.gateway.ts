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
import { UpdateUserDto } from '../user/dto';

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

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.userService.change(
      { socketId: client.id } as UpdateUserDto,
      client.handshake.query.userId as string,
    );
    this.server.to(client.id).emit('message', 'you connected successfully');
  }

  handleDisconnect(client: any) {
    console.log(client.id + ' disconnected');
  }

  @SubscribeMessage('send-message')
  async SendMessage(@MessageBody() id: string) {
    const message = await this.messageService.getOne(id);
    //...
    const toUser = await this.userService.getOne(message.to.id);
    const fromUser = await this.userService.getOne(message.from.id);
    //...
    const inComingCount =
      await this.messageService.getInboxUnViewedMessagesCount(message.to.id);
    //...
    this.server.to(toUser.socketId).emit('in-box', message);
    this.server.to(fromUser.socketId).emit('sending-message', message);
    this.server.to(toUser.socketId).emit('in-box-count', inComingCount);
  }

  @SubscribeMessage('update-incoming-count')
  async updateIncomingCount(client: Socket, id: string) {
    const inComingCount =
      await this.messageService.getInboxUnViewedMessagesCount(id);
    this.server.to(client.id).emit('in-box-count', inComingCount);
  }
}

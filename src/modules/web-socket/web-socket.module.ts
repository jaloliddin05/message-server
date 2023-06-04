import { Module } from '@nestjs/common';
import { ChatGateway } from './web-socket.gateway';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
@Module({
  imports: [UserModule, MessageModule],
  providers: [ChatGateway],
})
export class ChatSocketModule {}

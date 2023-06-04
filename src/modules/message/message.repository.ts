import { Repository } from 'typeorm';

import { Message } from './message.entity';

export class MessageRepository extends Repository<Message> {}

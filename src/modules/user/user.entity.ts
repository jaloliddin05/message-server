import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Column({ type: 'text', nullable: true })
  socketId: string;

  @OneToMany(() => Message, (message) => message.from)
  sendedMessages: Message[];

  @OneToMany(() => Message, (message) => message.to)
  inComingMessages: Message[];
}

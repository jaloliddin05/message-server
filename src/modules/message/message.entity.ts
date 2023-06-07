import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({ type: 'boolean', default: false })
  isViewed: boolean = false;

  @Column({ type: 'boolean', default: false })
  isFromTagged: boolean = false;

  @Column({ type: 'boolean', default: false })
  isToTagged: boolean = false;

  @ManyToOne(() => User, (user) => user.sendedMessages)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User, (user) => user.inComingMessages)
  @JoinColumn()
  to: User;
}

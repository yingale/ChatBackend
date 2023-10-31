import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column()
  content: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: false })
  is_group_message: boolean;

  @Column({ default: 0 })
  groupId: number;
}

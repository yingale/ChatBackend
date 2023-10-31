import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => Group, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

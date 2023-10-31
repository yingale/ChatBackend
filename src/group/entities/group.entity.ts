import { GroupMember } from 'src/group-member/entities/group-member.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  group_name: string;

  @OneToMany(() => GroupMember, (member) => member.group)
  members: GroupMember[];
}

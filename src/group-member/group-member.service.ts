import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GroupMember } from './entities/group-member.entity';

@Injectable()
export class GroupMemberService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly groupMemberRepository: Repository<GroupMember>,
  ) {}
  async addMemberToGroup(
    groupId: number,
    userId: number,
  ): Promise<GroupMember> {
    const groupMember = new GroupMember();
    const group = new Group(); // Create a Group instance
    group.id = groupId; // Assign the group ID
    const sender = new User(); // Create a User instance
    sender.id = userId; // Assign the user ID
    groupMember.group = group; // Assign the Group instance
    groupMember.sender = sender; // Assign the User instance
    return this.groupMemberRepository.save(groupMember);
  }

  async removeMemberFromGroup(groupId: number, userId: number): Promise<void> {
    await this.groupMemberRepository.delete({
      group: { id: groupId },
      sender: { id: userId },
    });
  }

  async listGroupMembers(groupId: number): Promise<User[]> {
    const members = await this.groupMemberRepository.find({
      where: { group: { id: groupId } },
      relations: ['user'],
    });

    return members.map((member) => member.sender);
  }
}

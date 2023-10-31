import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GroupMemberService } from './group-member.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { User } from 'src/user/entities/user.entity';
import { GroupMember } from './entities/group-member.entity';

@Controller('group-member')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}
  @Post(':groupId/members')
  async addMemberToGroup(
    @Param('groupId') groupId: number,
    @Body() createGroupMemberDto: CreateGroupMemberDto,
  ): Promise<GroupMember> {
    return this.groupMemberService.addMemberToGroup(
      groupId,
      createGroupMemberDto.userId,
    );
  }

  @Delete(':groupId/members/:userId')
  async removeMemberFromGroup(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ): Promise<void> {
    return this.groupMemberService.removeMemberFromGroup(groupId, userId);
  }

  @Get(':groupId/members')
  async listGroupMembers(@Param('groupId') groupId: number): Promise<User[]> {
    return this.groupMemberService.listGroupMembers(groupId);
  }
}

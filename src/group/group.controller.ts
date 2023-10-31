import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';

// group.controller.ts
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createGroupDto.groupName);
  }

  @Get()
  findAll() {
    return this.groupService.findAllGroups();
  }
}

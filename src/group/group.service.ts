import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(groupName: string): Promise<Group> {
    const group = new Group();
    group.group_name = groupName;
    return this.groupRepository.save(group);
  }
  findAllGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }
}

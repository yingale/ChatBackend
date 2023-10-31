import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from 'src/group-member/entities/group-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupService, GroupMember],
  controllers: [GroupController],
})
export class GroupModule {}

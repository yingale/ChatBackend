import { Module } from '@nestjs/common';
import { GroupMemberService } from './group-member.service';
import { GroupMemberController } from './group-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // You should use TypeOrmModule to work with entities
import { GroupMember } from './entities/group-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMember])], // Import the entity using TypeOrmModule
  controllers: [GroupMemberController],
  providers: [GroupMemberService],
})
export class GroupMemberModule {}

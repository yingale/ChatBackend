import { IsInt } from 'class-validator';

export class CreateGroupMemberDto {
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;
}

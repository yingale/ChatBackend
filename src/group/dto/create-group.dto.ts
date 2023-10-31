import { IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Length(1, 255, {
    message: 'Group name must be between 1 and 255 characters',
  })
  groupName: string;
}

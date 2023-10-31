import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { GroupModule } from './group/group.module';
import { Group } from './group/entities/group.entity';
import { GroupMemberModule } from './group-member/group-member.module';
import { GroupMember } from './group-member/entities/group-member.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      entities: [User, Message, Group, GroupMember],
      database: 'dripshop',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'abcdedfghu', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
    MessageModule,
    GroupModule,
    GroupMemberModule,
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService],
})
export class AppModule {}

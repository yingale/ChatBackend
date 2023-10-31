/* eslint-disable @typescript-eslint/no-unused-vars */
// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByUsername(email);
    console.log(user);
    if (!user) {
      return null;
    }

    // You'll need to implement password validation logic here
    try {
      const isValidPassword = await this.validatePassword(
        password,
        user.password,
      );
      console.log(isValidPassword);

      if (!isValidPassword) {
        return null;
      }
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
        username: user.username,
        uid: user.id,
      };
    } catch (error) {
      console.error(error); // Handle any errors
    }
  }

  private async validatePassword(
    enteredPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    const isCorrect = bcrypt.compare(enteredPassword, userPassword);
    return isCorrect;
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}

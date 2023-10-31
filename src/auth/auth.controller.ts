// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const token = await this.authService.login(
      credentials.email,
      credentials.password,
    );

    if (!token) {
      return { message: 'Invalid credentials' };
    }

    return token;
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}

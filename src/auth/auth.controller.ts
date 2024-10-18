// auth.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
               private readonly userservice: UsersService
  ) {}
// local Authentification
@UseGuards(LocalAuthGuard)
@Post("register")
register(@Body() registerDto : RegisterDto){
    return this.authService.register(registerDto);
}
  @Post('login')
  async login(@Body() loginDto: LoginDto ) {
    return this.authService.login(loginDto); // req.user est fourni par LocalStrategy
  }

  // Google Authentication
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {
    // Google redirection handler
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }

  // GitHub Authentication
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth(): void {
    // GitHub redirection handler
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}

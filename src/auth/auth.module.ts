import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { GoogleStrategy } from '../strategy/google.strategy';
import { GithubStrategy } from '../strategy/github.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { UserModule } from '../user/user.module'; // UserModule import
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
    forwardRef(() => UserModule), // Use forwardRef here to resolve circular dependency
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, LocalStrategy],
  exports: [ AuthService], // Make sure AuthService is exported if used elsewhere
})
export class AuthModule {}

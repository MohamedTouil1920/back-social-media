// auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../user/user.service';

import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ResetUserPasswordDto } from './dto/rest-user-password';

@Injectable()
export class AuthService {
  userService: any;

  
  constructor(
    private readonly usersService: UsersService,
    
    private readonly jwtService: JwtService,
  ) 
  {console.log('UsersService:', usersService); }
  async register({ fullName, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user)
    if (user) {
      throw new BadRequestException("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.create({ fullName, email, password: hashedPassword });
    return {
      "message": "User created successfully"
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user)
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }
    const payload = { email: user.email}
    const token = await this.jwtService.signAsync(payload)
    return {
      token: token,
      email: user.email
  }
}
async verifyResetPasswordToken({ token }: { token: string }) {
  try {
    const existingUser = await this.userService.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    if (existingUser.isResettingPassword === false) {
      throw new Error(
        "Aucune demande de réinitialisation de mot de passe n'est en cours.",
      );
    }

    return {
      error: false,
      message: 'Le token est valide et peut être utilisé.',
    };
    // return this.authenticateUser({
    //   userId: existingUser.id,
    // });
  } catch (error) {
    return { error: true, message: error.message };
  }
}

async resetUserPassword({
  resetPasswordDto,
}: {
  resetPasswordDto: ResetUserPasswordDto;
}) {
  try {
    const { password, token } = resetPasswordDto;
    const existingUser = await this.userService.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    if (existingUser.isResettingPassword === false) {
      throw new Error(
        "Aucune demande de réinitialisation de mot de passe n'est en cours.",
      );
    }

    const hashedPassword = await this.hashPassword({
      password,
    });
    await this.userService.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        isResettingPassword: false,
        password: hashedPassword,
      },
    });

    return {
      error: false,
      message: 'Votre mot de passe a bien été changé.',
    };
    // return this.authenticateUser({
    //   userId: existingUser.id,
    // });
  } catch (error) {
    return { error: true, message: error.message };
  }
}
  hashPassword(arg0: { password: string; }) {
    throw new Error('Method not implemented.');
  }
}

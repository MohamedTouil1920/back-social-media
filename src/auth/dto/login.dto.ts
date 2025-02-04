import { Transform } from '@nestjs/class-transformer';

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
    @MinLength(8)
    @Transform(({ value })=> value.trim())
    password:string;
}
  
import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from '../dto/login.dto';
import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';
import { Transform } from '@nestjs/class-transformer';

export class RegisterDto{
    @IsString()
    @MinLength(1)
    firstName:string;
    @IsString()
    @MinLength(1)
    LastName:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @Transform(({ value })=> value.trim())
    password:string;
}
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class CreateUserDto {
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
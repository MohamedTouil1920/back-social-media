import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    author:string;
    @IsNotEmpty()
    @IsString()
    mediaUrl?: string; // Ajout du mediaUrl
  
    @IsNotEmpty()
    @IsString()
    mediaType?: string; // Ajout du mediaType
}

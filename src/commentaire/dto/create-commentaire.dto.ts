import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaireDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  
  @IsNotEmpty()
  @IsString()
  mediaUrl?: string; // Ajout du mediaUrl

  @IsNotEmpty()
  @IsString()
  author:string;

  @IsNotEmpty()
  @IsString()
  mediaType?: string; // Ajout du mediaType
}
